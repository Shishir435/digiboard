# Use Node.js 22 as the base image
FROM node:22

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and pnpm-lock.yaml files to the working directory
COPY package.json pnpm-lock.yaml ./

# Install pnpm 9.4.0
RUN npm install -g pnpm@9.4.0

# Install dependencies
RUN pnpm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Next.js application
RUN pnpm build

# Expose port 3000 for the app
EXPOSE 3000

# Command to run the application
CMD ["pnpm", "start"]
