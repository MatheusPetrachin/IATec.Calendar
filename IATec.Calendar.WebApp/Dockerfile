# Adjust NODE_VERSION as desired
ARG NODE_VERSION=20.18.0
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Vite"

# Vite app lives here
WORKDIR /app

# Set development environment for local setup
ENV NODE_ENV="development"

# Install build dependencies
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy application code
COPY . .

# Development stage
FROM base as dev

# Set development environment
ENV NODE_ENV=development

# Expose the Vite dev server port
EXPOSE 3000

# Command to run the dev server
CMD ["yarn", "dev"]

# Build stage (for production)
FROM base as build

# Build the application
RUN yarn build

# Production stage with nginx (for deploy)
FROM nginx:alpine

# Copy built application from build stage
COPY --from=build /app/dist/iatec.calendar.web-app/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the production server port
EXPOSE 80

# Start the nginx server
CMD ["nginx", "-g", "daemon off;"]
