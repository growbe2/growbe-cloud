# Configuration of a kubernetes server with microk8s


```bash

sudo snap install microk8s --classic

sudo usermod -a -G microk8s $USER

microk8s enable dashboard dns storage ingress

# Copy to your machine to start working on the cluster
microk8s config > .cluster_config

# Add this to your locale .zshrc or bashrc
alias kubectl='kubectl --kubeconfig=/home/wq/.cluster_config'
alias kubectl_dashboard='kubectl port-forward -n kube-system service/kubernetes-dashboard 10443:443'
alias kubectl_dashboard_token='kubectl -n kube-system describe secret $(kubectl -n kube-system get secret | grep default-token | cut -d " " -f1)'
[[ /usr/local/bin/kubectl ]] && source <(kubectl completion zsh)



# Setup git hub registery
# do a docker login in ghrc.io and add your config file to k8s as a secret
kubectl create secret generic ghcr \    --from-file=.dockerconfigjson=config.json \
    --type=kubernetes.io/dockerconfigjson

# Create certificate
 openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ./key_http -out ./cert_http -subj "/CN=growbe.dev/O=growbe" -addext "subjectAltName=DNS:growbe.dev,DNS:cloud.growbe.dev,DNS:api.growbe.dev,DNS:broker.growbe.dev,DNS:auth.growbe.dev"

kubectl create secret tls tls-growbedev --key ./key_http --cert ./cert_http



```
