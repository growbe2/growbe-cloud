# Configuration of a kubernetes server with microk8s


```bash
sudo snap install microk8s --classic
sudo usermod -a -G microk8s $USER
microk8s enable dashboard dns storage ingress prometheus openfaas
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
# Create certificate, fetch them from the certbot folder
kubectl create secret tls tls-growbedev --key ./cloud.growbe.ca/privkey.pem --cert ./cloud.growbe.ca/fullchain.pem

# Add cred for docker for openfaas
kubectl create secret docker-registry dockerhub \     
    -n openfaas-fn \
    --docker-username=berlingoqc --docker-server=ghcr.io \
    --docker-password=PASSWORD \
    --docker-email=william95quintalwilliam@outlook.com



# Configure openfaas
kubectl port-forward -n openfaas svc/gateway 8080:8080 &
export OPENFAAS_URL=http://127.0.0.1:8080
export PASSWORD=$(kubectl -n openfaas get secret basic-auth -o jsonpath="{.data.basic-auth-password}" | base64 --decode)
echo -n $PASSWORD | faas-cli login -g $OPENFAAS_URL -u admin --password-stdin
```