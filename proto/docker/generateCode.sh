#!/bin/bash

IN_PATH=$1
OUT_PATH_C=$2
OUT_PATH_TS=$3


echo 'IN PATH' $IN_PATH
echo 'OUT PATH' $OUT_PATH_C

cd $IN_PATH

#echo 'Generating C'

#for i in *.proto
#do
# name=`basename ${i} .proto`
# protoc -o ${name}.pb                         ${i}
# python3 /nanopb/generator/nanopb_generator.py ${name}.pb

# rm ${name}.pb
# mv ${name}.pb.c out/
# mv ${name}.pb.h out/
#done

echo 'Generating KT'

mkdir -p ./out/kotlin
for i in *.proto
do
    protoc -I=. --java_out=./out/kotlin --kotlin_out=./out/kotlin ${i}
done

echo 'Generating TS'

/npm/node_modules/.bin/pbjs -t static-module -w default -o growbe.js *.proto
/npm/node_modules/.bin/pbts -o growbe.d.ts growbe.js


mv *.d.ts *.js out/
cp package.json out/

npm run setversion