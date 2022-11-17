#! /bin/bash

helm repo add growbe-cloud-helm https://github.com/growbe2/growbe-cloud-helm/releases/download/latest/
helm dependency build ./helm
helm upgrade growbe-cloud ./helm --install --wait --atomic $@
