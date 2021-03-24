#! /bin/bash

(cd growbe-cloud && npm run openapi-spec spec.json) && (cd growbe-cloud-api && ./generate.sh)