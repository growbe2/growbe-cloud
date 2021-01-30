#! /bin/bash

rm -rf ./out && mkdir out
docker run -v $(pwd):/PROTO -v $(pwd)/out/:/OUT_PATH_C protoc
