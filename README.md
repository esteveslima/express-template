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
    
    - **user-service-sequelize**: Example service using ***MySQL*** alongside [sequelize] for user data manipulation in a simple structured database with relationships, authentication and authorization(using [passport] auth0 or Oauth2 strategy).

  


<br/><br/>
## Deployment features

<br/><img src="https://kubernetes.io/images/favicon.png" width="auto" height="64px">

 - [Kubernetes] - ~~***TODO***~~

<br/><img src="https://media-exp1.licdn.com/dms/image/C560BAQEyEAwtp40d0A/company-logo_200_200/0?e=2159024400&v=beta&t=EPJvNJlim1cjQJvPU9LF62pYVDT9k9sWml6OrrYPrhA" width="auto" height="64px">

 - [Docker] - Services containerization (vscode extension should also be installed)
 
      Each service has a `Dockerfile` and `.dockerignore` with a few configurations to create a node js container image and deploy the server inside of it.

      To speed up the build process, each service also has a bash script that stop/remove any existing image/container and build/run it with a few configurations like forward publishing port to host, autorestarting and running in background.

      Docker common commands:
      ```bash
      build image: 			docker build --tag <image-tag-name> .
      run image container:		docker run --publish <host_port>:<container_port> --restart always --detach --name <container-name> <image-tag-name>
      
      start container:		docker start <container-name>
      stop container:		        docker stop <container-name>
      
      list images:			docker images
      list containers:	        docker ps -a
      
      remove image:		        docker rmi <imageId>
      remove container:		docker rm <container-name>

      explore running container:	docker exec -t -i <container-name> /bin/bash
      copy container file:		docker cp <containerId>:/from/root/file/path /host/path/target
      share host dir as readonly:	docker run… -v <absolute/path>:<container/path>:ro --name...
      get container ip:		docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <container-name>
      ```

      
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
[Docker]: <https://www.docker.com/>
[Nginx]: <https://www.nginx.com/>
