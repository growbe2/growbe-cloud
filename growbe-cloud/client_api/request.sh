#! /bin/bash
#
export WD="${API_CLIENT_DIRECTORY:-/tmp/growbe-api}"
export ENVIRONMENT="${ENVIRONMENT:-growbe-dev}"

function env_folder { 
        echo "$WD/environments"
}
function col_folder { 
        echo "$WD/collections"
}
function ctx_folder {
        echo "$WD/globals"
}

function set_global_file_name {
        echo "$1" > "$WD/globals/current"
}


function get_global_file_name {
        FILE="$WD/globals/current"
        if [[ ! -e $FILE ]]; then
                set_global_file_name globals
        fi

        cat "$WD/globals/current"
}

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
        FILE=`ctx_folder`/`get_global_file_name`.json

       echo $LOL | jq > `ctx_folder`/`get_global_file_name`.json
}

function add_context_file {
        KEY=$1
        VALUE=$2
        FILE=`ctx_folder`/`get_global_file_name`.json 
        cat $FILE | jq --argjson groupInfo "$(inner_body $KEY $VALUE)" '.values += [$groupInfo]' > $FILE
}

function display_context {
        cat `ctx_folder`/`get_global_file_name`.json | jq -r '(["KEY","VALUE"] | (.,map(length*"-"))), (.values | .[] | [.key , .value]) | @tsv' | column -ts $'\t'
}

function nman {
        COLLECTION=$1
        FOLDER=$2

        newman run --color off -e `env_folder`/growbe-dev.json -g `ctx_folder`/`get_global_file_name`.json --export-globals `ctx_folder`/`get_global_file_name`.json --folder $FOLDER -r @growbe2/output `col_folder`/$COLLECTION.json

}

function display_module_config {
    nman GROWBE-API Module | jq -r '.config | to_entries[] | [.key, .actorOwnerId, .value.manual | tostring] | @tsv'
}



subcommand=$1
shift
case $subcommand in
    "global")
            generate_global_file globals;;
    "display")
            display_context;;
    "set-growbe")
            add_context_file MAINBOARD_ID $1;;
    "set-module")
            add_context_file MODULE_ID $1;;
    "get-module")
            nman GROWBE-API Module;;
    "get-module-config")
            display_module_config;;
    "set-module-config")
            nman GROWBE-API Growbe_Module_Config_Set;;
    "modules")
            nman GROWBE-API Growbe_Modules;;
    "growbes")
            nman GROWBE-API Growbes;;
    "login-user")
            nman SSO Login;;
    *)
        echo "not supported"
        ;;
esac
