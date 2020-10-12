# From a tagged node-alpine image named "build-api"
FROM node:14.9-alpine as build-api

# Copy package.json + yarn.lock from the local machine to the /tmp folder
COPY package.json yarn.lock /tmp/
# Use /tmp as workdir
WORKDIR /tmp
# Install node_modules
RUN yarn && \
# Create working directory
	mkdir -p /usr/src/app && \
# Copy node modules previously installed to the working directory
	cp -a /tmp/node_modules /usr/src/app

#####

# From a tagged version of node-alpine that will be our final image
FROM node:14.9-alpine

# Set a working directory
WORKDIR /usr/src/app

# Install psql cli
RUN apk --update --no-cache add postgresql-client=12.4-r0 && \
# Remove all non necessary cache caused by the apk add command
	rm -rf /var/lib/apt/lists/* && \
	rm -rf /var/cache/apk/*

# Copy node modules built in previous step from previous step image
COPY --from=build-api /usr/src/app/ /usr/src/app

# Copy all files from the current local machine working directory to the image working directory
COPY . .

# Expose a port. This is a good practice for images that will be accessed by a port (like an API image)
EXPOSE 3000

# Define a startup command. All images should have either a CMD or ENTRYPOINT command so it runs with just a run (if it is not the case, a run without manual command will fail)
CMD ["yarn", "start"]
