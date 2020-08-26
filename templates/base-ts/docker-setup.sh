#!/bin/sh
gnome-terminal -e "
bash -c \"

docker stop base-ts-container;
docker rm base-ts-container;
docker rmi base-ts-image;

docker build --tag base-ts-image -f Dockerfile .;
docker run --publish 8080:8080 --restart always --detach --name base-ts-container base-ts-image;

docker ps -a;

exec bash\"
"

#.dockerignore must be at context root

#To use the container with nginx load balancing, remove the --publish(port forward from host)...
#...and replace the current container IP address in the nginx.conf file