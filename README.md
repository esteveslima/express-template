<div style="display: inline">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/220px-Node.js_logo.svg.png" width="auto" height="64px">
  <img src="https://expressjs.com/images/express-facebook-share.png" width="auto" height="64px">
</div>

# Express template 

This project try to illustrate some usual structures, features and applications examples to serve as future consultation and template for new projects.

<br/><br/>
## Project environmennt


<br/><img src="https://upload.wikimedia.org/wikipedia/en/thumb/e/e3/ESLint_logo.svg/128px-ESLint_logo.svg.png" width="auto" height="32px">

- [Eslint] - Dev-dependency Linter(Airbnb) for code standardization (vscode extension should also be installed) 

  Configure linter in root folder to apply to all subdirectories, which are services that doesn't need this package
  ```npm
  npm init
  npm install eslint --save-dev
  npx eslint --init
  ```
  Setup a .vscode folder with settings.json like in `.vscode/settings.json` for autoformatting.
  
  Can also setup eslint as default formatter in `VS Code settings -> formatter`.
  
<br/><img src="https://user-images.githubusercontent.com/674621/71187801-14e60a80-2280-11ea-94c9-e56576f76baf.png" width="auto" height="32px">

- [VS Code debug] - With Nodemon

  Setup a .vscode folder with configuration like in `.vscode/launch.json` should enable the debug mode in VS Code to be attached to a running process defined with `--inspect` in package.json scripts alongside nodemon. In this project, starting the server with `npm run dev` should enable nodemon and the inspector, on which can be attached the debug mode by clicking the play button in VS Code debug tab.


<br/><img src="https://miro.medium.com/max/3416/1*Txf8ugHH_MlHPM8JU6hT5w.jpeg" width="auto" height="32px">

- [Postman] - For testing requests
  
  - Saving environment and collections
  - Environment and Collection can be easily imported for testing or documentation purposes.  
  - Environment setup with common variables(like hosts/token).
  - Authorization setup in headers configuration and automatically saved in the environment with the use of scripts in stratetic requests(like login/logout).

    - ~~***TODO***~~: Find a way to do load/stress testing on server using postman or any other tool.



<br/><br/>
## Template services

  <br/>
  
  - ~~***TODO***~~: 
    - Provide examples of unit testing with [mocha], [chai] and [sinon] as dev dependencies packages
    - Define a helper file inside config(maybe .env?) to map external urls to variables, making things easy in multiple containers and future configurations 

  <br/><br/>
  - **base-service**: This service contains only basic functionalities and another projects/examples should extend it's structure.
  
    - ***Contain simple examples***: simple examples covering routing and controllers(upload and email examples, in addition to errors demonstration);    
    - ***HTTPS Structure***: Structure provided, ~~but not in use~~, alongside http server at `index.js`;
      - ~~***TODO***~~: Understand better the generation of valid ssl certificates(self signed certificates using letsencrypt).
    - ***Decoupled packages***: they are simply imported and used, all it's configurations are made within a proper file at `/src/helpers/`;
    - ***Loader structure***: a more modular way to import and setup modules at `/src/loaders/`, which are imported at `index.js` before setup servers and start listening;
    - ***3 layer architecture***: clear separation of routing, business logic in controllers and data access in dao with their models. Middlewares added to provide request adjust and validation;
    - ***Router construction***: express router demonstration with subrouters at `/src/api/routes/`, with server status check and custom not found response;
    - ***Nodemon***: [nodemon] dev-dependency which can be used with vscode debug configuring `package.json` scripts.dev with `--inspect`. ~~Also configured to modify node_env=development for testing in scripts.dev~~;
    - ***Environment variables***: setup with [dotenv] package at file `/src/helpers/env/dotenv.js`, template configuration file at `/src/config/.env`. Enables configuration of ports, node_env, logging, email credentials, etc. The configuration file ***should not be commited with sensitive information***;    
    - ***Loggers***: [morgan] package at `/src/helpers/log/morgan.js` responsible for logging requests and [winston] package at `/src/helpers/log/winston.js` responsible for another kinds of logging. Logs can be enabled/disabled at .env configuration file
    - ***Centralized error handling***: file handler `/src/helpers/error/error-handler.js` put at the bottom of node call stack that handles possible errors, tracing errors for debugging using the package [stack-trace] at `/src/helpers/error/stack-trace.js` and logging with winston;
    - ***Standartized errors***: possibility to structure error responses at file `/src/helpers/error/structure/error-codes.js` and call them manually. Also possible to test unexpected errors at file `/src/helpers/error/structure/error-response.js` in runtime and build a proper error response;
    - ***Easy async handling***: drying code with async handler at file `/src/helpers/async/async-handler.js` dispensing the use of try/catch blocks in async functions at files like `/src/api/controllers/*`. Using function at `/src/helpers/async/wrap-async.js` it's possible to wrap async handler in every function within file;
    - ***Security***: few packages like [cors], [helmet], [hpp], [express-rate-limit], [xss-clean] to apply some security with headers or as middleware at file `/src/helpers/security/*`;
      - ~~***TODO***~~: Understand better these security headers for proper integration with front-end applications and servers like Nginx.
    - ***Email template***: simple email example using [nodemailer] at `/src/helpers/email/nodemailer.js` which can be improved to send customized html emails with dynamic data;
    - ***Upload template***: simple upload example using [formidable] at `/src/helpers/upload/formidable.js` which can be improved to support multiple files in custom directories. Currently able to validate uploaded files names and MIMEs, separating them as accepted or rejected;  
    
  
  
  <br/><br/>
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/MongoDB_Logo.svg/220px-MongoDB_Logo.svg.png" width="auto" height="32px">

  - **user-service-mongoose**: Example service using ***MongoDB*** alongside [mongoose] for user data manipulation, authentication and authorization.
  
    - ***Middlewares usage demonstration***: usability example of middlewares for request handling at `/src/api/middlewares/*`;
    - ***Dao usage demonstration***: usability of dao at `/src/database/dao/*`, which should only access the ODM/ORM model to manipulate/search data and leave business logic to the controllers;
    - ***Easy dao logger***: dao functions in dao files wrapped in logger with the help of a IFFE at `/src/helpers/log/wrap-logger.js` built to work with winston logger;
    - ***Mongodb connection with mongoose***: connection example at `/src/loaders/mongoose/mongoose.js`, which also could connect to a local mongodb;
    - ***Mongoose model***: mongoose user model at `/src/models/*` with useful examples for validation using regex and data transforming. Schema middleware example used for password encryption using [bcrypt] before storing in database. Schema methods definition example used for validate incoming passwords, encrypting them and comparing;
    - ***Custom mongoose errors handling***: testing unexpected mongoose errors at `/src/helpers/error/structure/error-response.js` and providing proper reponses with new registred errors at `/src/helpers/error/structure/error-codes.js` that are modified to provide dynamic feedback of with which field/value the error was triggered;
    - ***Mongo input sanitize***: added package [express-mongo-sanitize] that provides extra security for mongoose, disabling inputs with forbidden characters;
    - ***Authentication/Authorization using tokens***: auth made with [jsonwebtoken] package at `/src/helpers/auth/jwt.js` using configuration at `/src/config/.env` file. The authentication is made through login/logout function in controller file `/src/api/controllers/auth.js` and authorization is required in every route that not contains the `/public/` keyword at `/src/api/routes/router.js`. Postman auth requests automatically stores authorization tokens for future private requests;
    - ***Cookie integration***: package [cookie-parser] that enables login/logout to generates/removes cookies with authorization token, at file `/src/helpers/parser/cookie-parser.js` used in `/src/api/controllers/auth.js` login/logout functions;
    - ***Restore user password example***: functionality that sends an email to user containing a token that can be used to restore user's missing password. The implemented approach in `forgot password` and `restore password` functions at file `/src/api/controllers/auth.js` dont use any extra field in the database, instead it generates a token with user's email in the payload with a secret that is composed by the client ip and email(could be improved through encryption and other strategies), that way the token can only be used for that specific email for the designed user(ip address) within expiration time.;
    - ***Simple user data manipulation***: simple crud functions for user data and user utilities at `/src/api/controllers/user.js`;
    - ***Picture upload example***: Simple picture upload example that validates file type and assign it to a username when uploaded which also can be downloaded, at file `/src/api/controllers/user.js`;
    
  
  
  
  <br/><br/>
  - ~~***TODOS***~~:

    - **product-service-mongoose**: Example service using ***MongoDB*** alongside [mongoose] for product data manipulation, illustrating more complex mongoose queries and schemas relationships, using configuration for a ***Typescript*** project.
    
    - **chat-service-mongoose-socketio**: Example service using ***Redis***([redis]) and [socket.io] illustrating a realtime chat with websockets.
    
    - **user-service-sequelize**: Example service using ***MySQL*** alongside [sequelize] for user data manipulation in a simple structured database with relationships, in a multi level authentication and authorization(using [passport] auth0 or Oauth2 strategy) level.

  


<br/><br/>
## Deployment features

<br/><img src="https://media-exp1.licdn.com/dms/image/C560BAQEyEAwtp40d0A/company-logo_200_200/0?e=2159024400&v=beta&t=EPJvNJlim1cjQJvPU9LF62pYVDT9k9sWml6OrrYPrhA" width="auto" height="64px">

 - [Docker] - Services containerization (vscode extension should also be installed)
 
  Each service has a `Dockerfile` and `Dockerfile.dev` with a few configurations to create a node js container image and copy the server inside of it,for production and development consecutivelly(`.dev` is useful for automatic changes and testing).
  
  A `.dockerignore` is also set to filter files copied to the container.
  
  The files are configured to build a standalone server.

  To speed up the build process and illustrate, each service also has a bash script that stop/remove any existing image/container and build/run it with a few configurations like forward publishing port to host, autorestarting and running in background.

  docker common CLI:
  ```bash
  build image: 	                docker build --tag <image-name:tag> --file <dockerfilePath/Dockerfile> <projectRootPath>      //.dockerignore must be at context root
  snapshot container img:         docker commit <containerId> <image-name:tag>
  run img container:		docker run [options] --name <container-name> <image-name:tag> [optional cmd override]
    options:  --publish <host_port>:<container_port>                          ->  forward host port to container port
              --restart <always/unless-stopped/on-failure>                    ->  restart policy
              --detach                                                        ->  run container in background
              --volume <absolute/$(pwd) hostPath>:<container absolutePath>:ro ->  use volumes to share host dir as readonly in the container      
              --volume <container absolutePath>                               ->  blacklists container folder, preventing volume changes from above option
  
  start/stop container:		docker <start/stop> <container-name>
  
  list images:			docker images
  list containers:	        docker ps --all
  
  remove image:		        docker rmi <image-name:tag>
  remove all images:		docker rmi -f $(docker images -a - q)
  remove container:		docker rm <container-name>      
  remove all containers:		docker rm -vf $(docker ps -a -q)
  remove stopped containers:      docker system prune -a

  container logs:                 docker logs <container-name>
  execute command in container:	docker exec --privileged -it <container-name> <command>
  explore running container:	docker exec -it <container-name> /bin/bash
  copy container file:		docker cp <containerId>:/from/root/file/path /host/path/target      
  get container ip:		docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <container-name>
  
  login/logout hub/server:     docker login/logout
  tag img before push:        docker tag <image-name:tag> <username/image-name:tag>
  push image do hub/server:     docker push <username/image-name:tag>
  ```
      
  <br/>
  
  Building multiple containers may be hard, so a [docker-compose] is required to handle this kind of situation.
  
  Inside `services/_deployments` folder there is a `docker-compose.yml` file describing the construction of each service within this project for production. 
  
  Also has a `docker-compose.dev.yml` describing the same construction but for development(the difference is that `.dev` file configures a volume to share host source folder to the container and make automatic changes when update files and restart server with nodemon)
  
  In this example the services doesn't have any connection, but containers built with this file **share the same network**, hence this solution is **only viable for not-distributed** containers/network. For distributed containers/network see Kubernetes below.
  
  docker-compose common CLI:
  ```bash
  *if [<services>] not provided, all services declared in docker-compose file will be affected by the following commands
  **if out of docker-compose file context or with multiple files, it should specify including --file before docker-compose command.
  compose commands general options(before commands):   
    --file <dockerComposefilePath/docker-compose.yml>   ->  specify docker-compose file
    --project-name <name>                               ->  
    --log-level <level>                                 ->  
    
  
  
  commands:
  
  parallel build:                     docker-compose build --parallel
  build and run compose containers:   docker-compose up [options] [<services>]
    options:  --build       ->  build images
              --detach      ->  run on background

  start/stop compose containers:      docker-compose <start/stop> [<services>]
  pause/unpause compose containers:   docker-compose <pause/unpause> [<services>]
  restart compose containers:         docker-compose restart [<services>]
  
  list all compose containers:        docker-compose ps --all
  stop and remove everything:         docker-compose down --rmi all --volumes --remove-orphans && docker volume prune

  execute command in container:       docker-compose exec --privileged <service> <command>
  containers logs:                    docker-compose logs --tail="10" [<services>]            // last 10 lines of each service
  display running processes           docker-compose top
  
  login/logout hub/server:            docker login/logout
  push compose images:                docker-compose push [<services>]              //services within compose file must have username tagged
  ```
  
  Due to the current lack of support for automatic restarting on container's unhealthy status, to perform this feature it's being used an extra container https://hub.docker.com/r/willfarrell/autoheal/
  
  
  docker reference: https://docs.docker.com/reference/

- ~~***TODO***~~:

  - find a way to handle sensitive data and configure containers in configuration files more easily
  
  - find a way to configure ssh into containers


<br/><img src="https://kubernetes.io/images/favicon.png" width="auto" height="64px">

 - [Kubernetes] - Containers Orchestration (vscode extension should also be installed)
 
 
  Testing is made using [minikube] and a [Virtual Machine], hence localhost it's not accessible and the application should be accessed through `minikube ip`.   
 
  pods        -> conjunto de containers fortemente conectados(parametros imutaveis portanto inviaveis em prod) => constantemente sendo atualizadas/substituidas
  deployment  -> capaz de criar pods, especificar replicas, template e outras especicações possibilitando alteração dos parametros dos pods(deletando/atualizando)

  service     -> capaz de fazer a ligação automatica do exterior aos pods criados(que estão sendo sempre recriados e tem ips modificados constantemente)

  [kubectl]

  Fazendo uma abordagem descritiva, os objetos são criados/modificados através de um arquivo de configuração `.yml` pelo comando `kubectl apply -f <file>`
  
  kubectl apply -f <pathTo Folder/ConfigFile.yml>

  kubectl [command] [object-type] [<object-names>]
    - commands:   get ... -o wide
                  describe
                  logs
                  delete
    - types:      pods
                  services
  
  kubectl logs
  kubectl exec -it <pod-name> /bin/bash
  
  imperative cleanup:
  kubectl delete deployments --all
  kubectl delete services --all
  kubectl delete pods --all
  kubectl delete daemonset --all
  
  referências:  https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#get
                https://kubernetes.io/docs/reference/kubectl/overview/

  
  Ferramenta util para exploração e teste:
  redireciona o docker local para o docker da VM no terminal fazendo os comandos docker serem referentes aos containeres da VM : eval $(minikube docker-env)
  
  Gambiarra para atualizar a imagem do deployment utilizando uma abordagem imperativa com o comando abaixo(pode ser necessario deletar o cache de images usando o eval acima).
  Os containeres quando criados devem fornecer um versionamento unico na tag(--tag tag:123version123...)
  kubectl set image deployment/<object-type> <container-name> = <fullImageNameTagWithVersion>
  
  
  
  
      
      
<br/><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Nginx_logo.svg/220px-Nginx_logo.svg.png" width="auto" height="32px">      
 
 - [Nginx] - Load balance / Reverse proxy server
       
      `nginx` folder has a Dockerfile configuration that creates a nginx image and copies the `nginx/nginx.conf` inside the container with the desired configuration.
      
      For load balancing, each service container has to remove the `--publish` option from `docker run` and provide the container IP address to the upstream servers in `nginx/nginx.conf` file.

      - ~~***TODO***~~: 
        - Understand better nginx configurations for reverse proxy,load balancing and headers setup.
        - API gateway setup with nginx.



<br/><br/>
## Miscelaneous utilities

- Changing git repository to ssh
  ```bash
  ssh-keygen -t ed25519 -C "<label:email?>"
  ```
  copy the generated .ssh/key.pub into git account
  ```bash
  git remote set-url origin <ssh_url>
  ```
  
- Forwarding local port to a server local port using ssh:

  ```bash
  ssh -L 127.0.0.1:LOCAL_PORT:127.0.0.1:REMOTE_PORT <remoteuser@hostaddress> -N
  ```
  
  If the forwarded port is already in use, find the running process with the following and kill it
  ```bash
  sudo netstat -apn|grep -w PORT
  ```
  
- Self-signed ssl certification(~~not valid yet: search for letsencrypt~~):
  
  ```bash
    openssl req -newkey rsa:4096 \
            -x509 \
            -sha256 \
            -days 3650 \
            -nodes \
            -out certificate.crt \
            -keyout certificate.key \
            -subj "/C=BR/ST=STATE/L=LOCALITY/O=ORG_NAME/OU=ORG_UNITY/CN=DOMAIN"
  ```
 *subj is optional and its used to create directly without typing every field*
 

  
[Eslint]: <https://eslint.org/>
[VS Code debug]: <https://code.visualstudio.com/docs/editor/debugging>
[Postman]: <https://www.postman.com/>

[mocha]:<https://mochajs.org/>
[chai]:<https://www.chaijs.com/>
[sinon]:<https://sinonjs.org/>
[dotenv]:<https://www.npmjs.com/package/dotenv>
[morgan]:<https://www.npmjs.com/package/morgan>
[winston]:<https://www.npmjs.com/package/winston>
[nodemon]:<https://www.npmjs.com/package/nodemon>
[stack-trace]:<https://www.npmjs.com/package/stack-trace>
[cors]:<https://www.npmjs.com/package/cors>
[helmet]:<https://www.npmjs.com/package/helmet>
[hpp]:<https://www.npmjs.com/package/hpp>
[express-rate-limit]:<https://www.npmjs.com/package/express-rate-limit>
[xss-clean]:<https://www.npmjs.com/package/xss-clean>
[nodemailer]:<https://www.npmjs.com/package/nodemailer>
[formidable]:<https://www.npmjs.com/package/formidable>

[express-mongo-sanitize]:<https://www.npmjs.com/package/express-mongo-sanitize>
[mongoose]:<https://www.npmjs.com/package/mongoose>
[bcrypt]:<https://www.npmjs.com/package/bcrypt>
[cookie-parser]:<https://www.npmjs.com/package/cookie-parser>
[jsonwebtoken]:<https://www.npmjs.com/package/jsonwebtoken>

[sequelize]:<https://www.npmjs.com/package/sequelize>
[passport]:<http://www.passportjs.org/>

[redis]: <https://www.npmjs.com/package/redis>
[socket.io]:<https://socket.io/>

[Kubernetes]: <https://kubernetes.io/pt/>
[kubectl]: <https://kubernetes.io/docs/reference/kubectl/overview/>
[minikube]: <https://kubernetes.io/docs/setup/learning-environment/minikube/>
[Virtual Machine]: <https://www.virtualbox.org/wiki/Linux_Downloads>
[Docker]: <https://www.docker.com/>
[docker-compose]: <https://docs.docker.com/compose/>
[Nginx]: <https://www.nginx.com/>
