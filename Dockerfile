# Use Node.js as the base image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy only package files
COPY package*.json ./

# Set npm registry and timeout
RUN npm config set registry https://mirror-npm.runflare.com \
    && npm config set fetch-retry-mintimeout 20000 \
    && npm config set fetch-retry-maxtimeout 120000

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the development port
EXPOSE 5173

# Run Vite development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
