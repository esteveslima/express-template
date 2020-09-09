# Rename this file to match the script called by .travis.yml file

# Build using docker-compose(?)
# Build and push each container individually, saving latest tag for deployment and GIT_SHA for registration
docker build -t <container_name>:latest -t <container_name>:$GIT_SHA -f <dockerfile_file_path> <context>        #   container_name in format user/container-name
docker push <container_name>:latest
docker push <container_name>:$GIT_SHA
# ...

# Run kubectl commands normally to apply all files inside k8s directory
kubectl apply -f <k8s_folder_path> --recursive

# Imperativelly modify each deployment image due they don't update images with same name('latest' tag)
kubectl set image deployments/<object_metadata_name> <container_name_matchLabels>=<container_name_pushed_to_hub>:$GIT_SHA
# ...