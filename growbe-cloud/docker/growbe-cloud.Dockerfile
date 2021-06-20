# Check out https://hub.docker.com/_/node to select a new base image
FROM node:14-slim

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
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY --chown=node package*.json ./

RUN npm ci

# Bundle app source code
COPY --chown=node . .

RUN npm run build
# Bind to all network interfaces so that it can be mapped to the host OS
ENV HOST=$HOST PORT=$PORT TZ=$TZ

ENV NODE_ENV=$NODE_ENV
ENV DB_URL=${DB_URL}
ENV MONGO_URL=${MONGO_URL}
ENV MQTT_ENDPONT=${MQTT_ENDPONT}
ENV NMS_TOKEN=${NMS_TOKEN}
ENV NMS_API_USERNAME=${NMS_API_USERNAME}
ENV NMS_API_PASSWORD=${NMS_API_PASSWORD}
ENV NMS_API_URL=${NMS_API_URL}

EXPOSE ${PORT}

CMD [ "node" ]
