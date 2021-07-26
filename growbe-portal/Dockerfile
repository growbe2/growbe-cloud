# Stage base
FROM docker.pkg.github.com/growbe2/growbe-cloud/ng-test:latest as base

WORKDIR /app
COPY package*.json ./

RUN npm ci

FROM base as source

COPY . .

# prebuild the library
RUN npx ng build dashboard

FROM source as test_unit

# TODO: Run lint after all files have been linted to the proper config
#RUN npm run lint
#RUN npm run ut:ci

#FROM test_base as test_e2e
#RUN npm run e2e

# Stage build
FROM source AS prod

RUN npm run build -- --prod

# Stage release
FROM nginx:alpine AS release

COPY --from=prod /app/dist/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
