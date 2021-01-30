#### Stage 0, Build Angular frontend
FROM node:latest as build
WORKDIR /app
COPY package.json package.json

ARG GITHUB_ACCESS_TOKEN
# Make sure the argument is supplied
RUN test -n "$GITHUB_ACCESS_TOKEN"
ENV GITHUB_ACCESS_TOKEN=$GITHUB_ACCESS_TOKEN

RUN echo "@berlingoqc:registry=https://npm.pkg.github.com/" > .npmrc
RUN echo "@growbe2:registry=https://npm.pkg.github.com/" > .npmrc
RUN echo "//npm.pkg.github.com/:_authToken=$GITHUB_ACCESS_TOKEN" >> .npmrc

RUN npm install --force
COPY . .
RUN npm run build -- --configuration production

####Stage 1, Build Nginx backend
FROM nginx:alpine
COPY --from=build /app/dist/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
