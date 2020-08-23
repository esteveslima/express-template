#!/bin/sh
gnome-terminal -e "
bash -c \"

docker stop user-service-mongoose-container;
docker rm user-service-mongoose-container;
docker rmi user-service-mongoose-image;

docker build --tag user-service-mongoose-image -f Dockerfile .;
docker run --publish 8080:8080 --restart always --detach --name user-service-mongoose-container user-service-mongoose-image;

docker ps -a;

exec bash\"
"

#.dockerignore must be at context root

#To use the container with nginx load balancing, remove the --publish(port forward from host)...
#...and replace the current container IP address in the nginx.conf file