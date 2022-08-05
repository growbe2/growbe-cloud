FROM ubuntu:20.04 as base

ARG DEBIAN_FRONTEND=noninteractive

RUN apt update && apt install -yq postgresql-client

FROM ghcr.io/growbe2/growbe-cloud/growbe-cloud:${VERSION}
COPY --from=base /usr/ /usr/
COPY --from=base /lib/x86_64-linux-gnu/libcrypt.so.1 /lib/x86_64-linux-gnu/
COPY --from=base /lib/x86_64-linux-gnu/libm.so.6 /lib/x86_64-linux-gnu/

COPY ./docker/migrate.sh ./

RUN mkdir -p transactional
COPY ./envs ./transactional/
COPY ./*.sql ./transactional/
COPY ./*.sh ./transactional/

CMD ["./migrate.sh"]