import {lucia} from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { db } from "./prisma.js";

const luciaInstance = lucia({
  adapter: new PrismaAdapter(db.session, db.user),
  getSessionAttributes: async (att) => {
    return {
      id: att?.id,
    };
  },
  sessionCookie: {
    expires: false,
  },
  getUserAttributes: (attributes) => {
    return {
      id: attributes.id,
      role: attributes.role,
      email: attributes.email,
    };
  },
  DatabaseUserAttributes: {
    id: "string",
    email: "string",
    role: "string",
  },
});

export default luciaInstance;
