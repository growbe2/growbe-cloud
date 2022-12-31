#! /bin/bash
#
#

export SCRIPTPATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"

export POSTMAN_API_KEY="$POSTMAN_API"

export API_URL="https://api.getpostman.com"

export WORKSPACE="e69b6eea-55eb-44ba-9cb7-bbe997875093"

export COLLECTION_SSO_API="3084204-bf18ed61-8eb6-496b-828d-93d2bc107c64"
export COLLECTION_CLOUD_API="3084204-565a28bd-0b8b-4b18-a40d-910d88c1c3f8"
export COLLECTION_MAINBOARD_API="3084204-37c52bab-1e5b-450f-bffe-d8e0039c2e69"

export WD="${API_CLIENT_DIRECTORY:-/tmp/growbe-api}"

function env_folder { 
        echo "$WD/environments"
}
function col_folder { 
        echo "$WD/collections"
}
function ctx_folder { 
        echo "$WD/globals"
}

function header_api_key {
 echo "x-api-key: ${POSTMAN_API_KEY}"
}

function wcurl {
        curl -s -H "$(header_api_key)" "$@"
}


function get_workspace {
        wcurl "$API_URL/workspaces/$WORKSPACE"
}

function get_collection {
        wcurl "$API_URL/collections/$1"
}

function get_environment {
        wcurl "$API_URL/environments/$1"
}

function download {
        declare input=$(</dev/stdin);
        OUTPUT_FILE=$1

        echo $input | jq > $OUTPUT_FILE
}

function download_collection {
        COLLECTION_ID=$1
        OUTPUT_FILE=$2

        echo "fetch $OUTPUT_FILE collection"

        get_collection $COLLECTION_ID | download $WD/collections/$OUTPUT_FILE
}

function download_environment {
        ENVIRONMENT_ID=$1
        OUTPUT_FILE=$2

        echo "fetch $OUTPUT_FILE environment"

        get_environment $ENVIRONMENT_ID | download $WD/environments/$OUTPUT_FILE
}

function download_workspace {

        WORKSPACE_DATA=$(get_workspace $1)

        mkdir -p $WD
        mkdir -p $WD/{collections,environments,globals}

        echo $WORKSPACE_DATA | download $WD/workspace.json

        echo $WORKSPACE_DATA | jq -r '.workspace.collections| .[] | [.id, .name, .uid] | @tsv' |
                while IFS=$'\t' read -r id name uid; do
                        download_collection $id $name.json
                done

        echo $WORKSPACE_DATA | jq -r '.workspace.environments| .[] | [.id, .name, .uid] | @tsv' |
                while IFS=$'\t' read -r id name uid; do
                        download_environment $id $name.json
                done
}

download_workspace $WORKSPACE

