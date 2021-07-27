# Stage base
FROM node:latest as base

WORKDIR /app
COPY package*.json ./

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
