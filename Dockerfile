# syntax=docker/dockerfile:1

# Base image with Node version 22.9.0 (using Alpine for a smaller image size)
ARG NODE_VERSION=22.9.0
FROM node:${NODE_VERSION}-alpine

# Use production node environment by default.
ENV NODE_ENV development

# Set working directory
WORKDIR /usr/src/app/server

# Install all dependencies (including dev dependencies)
COPY server/package*.json ./
RUN npm install

# Install ts-node globally to run TypeScript files directly
RUN npm install -g ts-node typescript

# Copy the rest of the source files
COPY server/ .

# Expose the port that the application listens on
EXPOSE 3000

# Run the TypeScript application using ts-node
CMD ["ts-node", "src/index.ts"]
