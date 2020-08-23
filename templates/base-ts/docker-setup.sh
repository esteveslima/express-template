#!/bin/sh
gnome-terminal -e "
bash -c \"

docker stop base-js-container;
docker rm base-js-container;
docker rmi base-js-image;

docker build --tag base-js-image -f Dockerfile .;
docker run --publish 8080:8080 --restart always --detach --name base-js-container base-js-image;

docker ps -a;

exec bash\"
"

#.dockerignore must be at context root

#To use the container with nginx load balancing, remove the --publish(port forward from host)...
#...and replace the current container IP address in the nginx.conf file