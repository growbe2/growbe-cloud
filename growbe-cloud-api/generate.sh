


# Use spec.json file from growbe-cloud

openapi-generator-cli generate -g typescript-angular -i ../growbe-cloud/spec.json --skip-validate-spec -o ./angular/projects/growbe-cloud-api/src/lib/cloud/ && \
cd ./angular && npx ng build growbe-cloud-api --prod && cp -r ./dist/growbe-cloud-api ../../growbe-portal/dist/