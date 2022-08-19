#! /bin/bash

mkdir -p ./helm/charts
helm pull oci://ghcr.io/growbe2/growbe-cloud-chart --destination ./helm/charts/
helm upgrade growbe-cloud ./helm --install --wait --atomic $@