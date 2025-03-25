# Use Node.js Alpine for a lightweight image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the application
COPY . .

# Generate Prisma client
RUN npx prisma generate --schema src/prisma/schema.prisma

# Build the application
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "dist/main"]
