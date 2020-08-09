#!/bin/sh
gnome-terminal -e "
bash -c \"

docker stop nginx-customized-container;
docker rm nginx-customized-container;
docker rmi nginx-customized-image;

docker build --tag nginx-customized-image .;
docker run --publish 8080:80 --restart on-failure:10 --detach --name nginx-customized-container nginx-customized-image;

docker ps -a;

exec bash\"
"