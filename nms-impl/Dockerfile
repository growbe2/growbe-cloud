# Check out https://hub.docker.com/_/node to select a new base image
FROM node:10-slim

RUN apt update && apt install -y wget
RUN wget https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-amd64-static.tar.xz \
    && tar xvf ./ffmpeg-release-amd64-static.tar.xz \
    && cp ./ffmpeg-5.0.1-amd64-static/ffmpeg /usr/bin/

# Set to a non-root built-in user `node`
USER node


# Create app directory (with user `node`)
RUN mkdir -p /home/node/app/media

VOLUME [ "/home/node/app/media" ]

WORKDIR /home/node/app

COPY --chown=node package*.json ./

RUN npm ci

# Bundle app source code
COPY --chown=node . .

EXPOSE 1935
EXPOSE 8000

CMD [ "node", "./index.js"]
