# Use the official image as a parent image.
FROM node:current

# Set the working directory.
WORKDIR /home/node/service

# Copy from your host to your current location.
COPY . .

# Run the command inside your image filesystem.
RUN npm install --only=production

# Add metadata to the image to describe which port the container is listening on at runtime.
EXPOSE 8080

# Run the specified command within the container.
CMD [ "npm", "start" ]
