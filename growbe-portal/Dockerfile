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

FROM base as source

COPY . .

# prebuild the library
RUN npx ng build dashboard

# Stage build
FROM source AS prod

RUN npm run build -- --configuration production

# Stage release
FROM nginx:alpine AS release

COPY --from=prod /app/dist/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
