# Use the official Node.js image
FROM node:20.17.0

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port the app runs on (if needed)
EXPOSE 8080

# Command to run the application
CMD ["npm", "start"]
