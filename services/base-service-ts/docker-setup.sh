#!/bin/sh
gnome-terminal -e "
bash -c \"

docker stop base-service-container;
docker rm base-service-container;
docker rmi base-service-image;

docker build --tag base-service-image -f Dockerfile .;
docker run --publish 8080:8080 --restart always --detach --name base-service-container base-service-image;

docker ps -a;

exec bash\"
"

#.dockerignore must be at context root

#To use the container with nginx load balancing, remove the --publish(port forward from host)...
#...and replace the current container IP address in the nginx.conf file