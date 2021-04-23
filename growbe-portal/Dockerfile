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
COPY . .


FROM base as test_base

# Install chrome for protractor tests
USER root
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update && apt-get install -yq google-chrome-stable xvfb procps
RUN apt clean
RUN rm -rf /var/lib/apt/lists/*


FROM test_base as test_unit

USER node
# TODO: Run lint after all files have been linted to the proper config
#RUN npm run lint
RUN npm run ut:ci


#FROM test_base as test_e2e
#RUN npm run e2e

# Stage build
FROM base AS prod

RUN npm run build -- --prod

# Stage release
FROM nginx:alpine AS release

####Stage 1, Build Nginx backend
FROM nginx:alpine
COPY --from=build /app/dist/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
