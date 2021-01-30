FROM    ubuntu:20.04

VOLUME /PROTO
VOLUME /PROTO-OUT-C
VOLUME /PROTO-OUT-TS

ARG DEBIAN_FRONTEND=noninteractive

RUN     apt update && apt upgrade -y
RUN     apt install -y git python3 python3-pip protobuf-compiler wget nodejs npm
RUN     pip3 install protobuf grpcio-tools

WORKDIR /nanopb/
RUN     wget "https://jpa.kapsi.fi/nanopb/download/nanopb-0.4.4-linux-x86.tar.gz"
RUN     tar xvf ./nanopb-0.4.4-linux-x86.tar.gz
RUN     cp -r ./nanopb-0.4.4-linux-x86/generator ./

WORKDIR /npm
RUN     npm install protobuf-typescript

WORKDIR /
ADD     generateCode.sh generateCode.sh
RUN     chmod 700 /generateCode.sh
CMD     ["/generateCode.sh", "/PROTO", "/PROTO-OUT"]
