# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first for better cache management
COPY package*.json ./

# Install dependencies
RUN npm install prisma

RUN npm install

# Copy the rest of the application code
COPY . .

RUN npx prisma generate --schema .app/src/prisma/schema.prisma 
# Run build script
RUN npm run build

# Expose the app's port
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "start"]
