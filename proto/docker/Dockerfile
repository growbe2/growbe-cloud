FROM    ubuntu:20.04

VOLUME /PROTO
VOLUME /PROTO-OUT-C
VOLUME /PROTO-OUT-TS

ARG DEBIAN_FRONTEND=noninteractive

RUN     apt update && apt upgrade -y
RUN     apt install -y git curl nodejs npm unzip
#RUN     pip3 install protobuf grpcio-tools

RUN PROTOC_VERSION=$(curl -s "https://api.github.com/repos/protocolbuffers/protobuf/releases/latest" | grep -Po '"tag_name": "v\K[0-9.]+') && \
    curl -Lo protoc.zip "https://github.com/protocolbuffers/protobuf/releases/latest/download/protoc-${PROTOC_VERSION}-linux-x86_64.zip" && \
    unzip -q protoc.zip bin/protoc -d /usr/local && \
    chmod a+x /usr/local/bin/protoc

#WORKDIR /nanopb/
#RUN     wget "https://jpa.kapsi.fi/nanopb/download/nanopb-0.4.4-linux-x86.tar.gz"
#RUN     tar xvf ./nanopb-0.4.4-linux-x86.tar.gz
#RUN     cp -r ./nanopb-0.4.4-linux-x86/generator ./

WORKDIR /npm
RUN     npm install protobuf-typescript

WORKDIR /
ADD     generateCode.sh generateCode.sh
RUN     chmod 700 /generateCode.sh
CMD     ["/generateCode.sh", "/PROTO", "/PROTO-OUT"]
