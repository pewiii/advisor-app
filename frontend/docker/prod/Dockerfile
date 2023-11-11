FROM node:18


# Set the working directory in the container
WORKDIR /app

# ARG PORT
# ARG API_URL
# ARG TEST_VAR
# ENV PORT=$PORT
# ENV VITE_APP_API_URL=$API_URL
# ENV VITE_APP_TEST_VAR=$TEST_VAR

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port your application will run on
EXPOSE 3000

# Command to start your Node.js application
CMD [ "npm", "run", "build" ]