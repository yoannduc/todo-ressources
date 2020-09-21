FROM node:14.9-alpine as build-api

# Install node_modules
COPY package.json yarn.lock /tmp/
WORKDIR /tmp
RUN yarn && mkdir -p /usr/src/app && cp -a /tmp/node_modules /usr/src/app

#####

FROM node:14.9-alpine

# Set a working directory
WORKDIR /usr/src/app

# Install psql cli
RUN apk --update --no-cache add postgresql-client=12.4-r0 && \
	rm -rf /var/lib/apt/lists/* && \
	rm -rf /var/cache/apk/*

COPY --from=build-api /usr/src/app/ /usr/src/app

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]
