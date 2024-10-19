import express, { Request, Response } from "express";
import { lucia } from "./lib/auth";
import cookieParser from "cookie-parser";
import Dotenv from "dotenv";
import { validateSession } from "./lib/validate";
Dotenv.config();

// Create a simple Express server
const app = express();
const port = 5005;

// Serve the static HTML file for the dashboard
// app.use(express.static("public"));
app.use(cookieParser());
// Endpoint for validating requests
app.post("/validate", async (req, res) => {
  try {
    const sessionId = req.headers.authorization.split(" ")[1];

    const { session, user } = await validateSession(sessionId);
    if (!session) {
      return res.status(401).json({ error: "Invalid session" });
    }

    console.log("Session is valid:", session);
    console.log("User data:", user);

    // Return a success response
    res.status(200).json({ session, user });
  } catch (error) {
    console.error("Error validating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Start the Express server
const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
