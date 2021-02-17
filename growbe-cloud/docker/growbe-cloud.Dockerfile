FROM node:10-slim

VOLUME /ASSET_DIR
VOLUME /STORAGE_DIR

ARG GITHUB_ACCESS_TOKEN

# Make sure the access token is supplied
RUN test -n "$GITHUB_ACCESS_TOKEN"
ENV GITHUB_ACCESS_TOKEN=$GITHUB_ACCESS_TOKEN

# Set to a non-root built-in user `node`
USER node

# Create app directory (with user `node`)
RUN mkdir -p /home/node/app

WORKDIR /home/node/app

RUN echo "@berlingoqc:registry=https://npm.pkg.github.com/" > .npmrc
RUN echo "@growbe2:registry=https://npm.pkg.github.com/" >> .npmrc
RUN echo "//npm.pkg.github.com/:_authToken=$GITHUB_ACCESS_TOKEN" >> .npmrc
#
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY --chown=node package*.json ./

# Make new relic not build the native metrics package
# TODO: Make sure the image doesn't build if one isn't available
RUN npm install

# Bundle app source code
COPY --chown=node . .

RUN npm run build

# Bind to all network interfaces so that it can be mapped to the host OS
ENV HOST=$HOST PORT=$PORT TZ=$TZ

ENV NODE_ENV=$NODE_ENV
ENV DB_URL=${DB_URL}
ENV MONGO_URL=${MONGO_URL}
ENV MQTT_ENDPONT=${MQTT_ENDPONT}
ENV STORAGE_DIR='/STORAGE_DIR'

ENV ASSET_DIR="/ASSET_DIR"

EXPOSE $PORT
