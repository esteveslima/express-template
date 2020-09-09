docker build -t esteveslima/base-js-image:latest -t esteveslima/base-js-image:$GIT_SHA -f templates/base-js/Dockerfile templates/base-js        
docker push esteveslima/base-js-image:latest
docker push esteveslima/base-js-image:$GIT_SHA
docker build -t esteveslima/base-ts-image:latest -t esteveslima/base-ts-image:$GIT_SHA -f templates/base-ts/Dockerfile templates/base-ts        
docker push esteveslima/base-ts-image:latest
docker push esteveslima/base-ts-image:$GIT_SHA
docker build -t esteveslima/user-mongoose-image:latest -t esteveslima/user-mongoose-image:$GIT_SHA -f templates/user-mongoose/Dockerfile templates/user-mongoose        
docker push esteveslima/user-mongoose-image:latest
docker push esteveslima/user-mongoose-image:$GIT_SHA

kubectl apply -f deployments/k8s --recursive

kubectl set image deployments/base-js-deployment base-js-container=esteveslima/base-js-image:$GIT_SHA
kubectl set image deployments/base-ts-deployment base-ts-container=esteveslima/base-ts-image:$GIT_SHA
kubectl set image deployments/user-mongoose-deployment user-mongoose-container=esteveslima/user-mongoose-image:$GIT_SHA
