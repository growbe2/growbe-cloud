# Stage base
FROM node:latest as base

WORKDIR /app
COPY package*.json ./

ARG GITHUB_ACCESS_TOKEN
# Make sure the argument is supplied
RUN test -n "$GITHUB_ACCESS_TOKEN"
ENV GITHUB_ACCESS_TOKEN=$GITHUB_ACCESS_TOKEN

RUN echo "@berlingoqc:registry=https://npm.pkg.github.com/" > .npmrc
RUN echo "@growbe2:registry=https://npm.pkg.github.com/" >> .npmrc
RUN echo "//npm.pkg.github.com/:_authToken=$GITHUB_ACCESS_TOKEN" >> .npmrc

RUN npm ci


FROM base as test_base

# Install chrome for protractor tests

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update && apt-get install -yq google-chrome-stable xvfb procps
RUN apt clean
RUN rm -rf /var/lib/apt/lists/*

RUN rm -rf package*.json
