#! /bin/bash

export WD="${API_CLIENT_DIRECTORY:-/tmp/growbe-api}"

function env_folder { echo "$WD/environments" }
function col_folder { echo "$WD/collections" }
function ctx_folder { echo "$WD/globals" }

function inner_body {
        jq --null-input --arg key $1 --arg value $2 '{"key": $key, "value": $value, "enabled": true}'
}

function for_entry {
        for i in $@; do
                text=$i
                text2=${text#*=}
                text1=${text%"=$text2"}
                echo $(inner_body $text1 $text2)
        done
}

function generate_global_file {

        OUTPUT_FILE=$1; shift;

        ENTRIES=$(for_entry "$@" | jq -n '[inputs]')

        read -r -d '' LOL <<- EOM
        {
	"id": "b666b77a-ed48-426d-870f-f457a5eeddbb",
	"values": $ENTRIES,
	"name": "growbe-cloud Globals",
	"_postman_variable_scope": "globals",
	"_postman_exported_at": "2022-12-30T22:16:45.748Z",
	"_postman_exported_using": "Postman/9.0.2"
}
EOM

        echo $LOL | jq > `ctx_folder`/$OUTPUT_FILE.json
}


function nman {
        ENVIRONMENT=$1
        GLOBAL=$2
        COLLECTION=$3
        FOLDER=$4

        newman run --color off -e `env_folder`/$ENVIRONMENT.json -g `ctx_folder`/$GLOBAL.json --export-globals `ctx_folder`/$GLOBAL.json --folder $FOLDER -r @growbe2/output `col_folder`/$COLLECTION.json

}
