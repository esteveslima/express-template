docker build -t esteveslima/base-js:latest -t esteveslima/base-js:$GIT_SHA -f templates/base-js/Dockerfile templates/base-js        
docker push esteveslima/base-js:latest
docker push esteveslima/base-js:$GIT_SHA
docker build -t esteveslima/base-ts:latest -t esteveslima/base-ts:$GIT_SHA -f templates/base-ts/Dockerfile templates/base-ts        
docker push esteveslima/base-ts:latest
docker push esteveslima/base-ts:$GIT_SHA
docker build -t esteveslima/user-mongoose:latest -t esteveslima/user-mongoose:$GIT_SHA -f templates/user-mongoose/Dockerfile templates/user-mongoose        
docker push esteveslima/user-mongoose:latest
docker push esteveslima/user-mongoose:$GIT_SHA

kubectl apply -f deployments/k8s --recursive

kubectl set image deployments/base-js-deployment base-js=esteveslima/base-js:$GIT_SHA
kubectl set image deployments/base-ts-deployment base-ts=esteveslima/base-ts:$GIT_SHA
kubectl set image deployments/user-mongoose-deployment user-mongoose=esteveslima/user-mongoose:$GIT_SHA
