Content Manager WEB
=====================

What is the Content Manager WEB?
---------------------

The Content Manager WEB is the front end application that enables us to manage the contents of the Social Network Site. We can insert the movies and series metadata with it. The application uses React JS. But there is a problem :(

What is the problem with React JS?
---------------------

The problem is not the React JS per se. The problem appears when we need to deploy the application with docker.

When developing, our application runs on a server. To deploy, the source code is bundled in a way that makes it easier to the browser to download the application and run, since the application runs on the client side. And that's a problem. 

Since we want to define the API's endpoint at container creation time we need the application to be able to read these variables. The application is static. It's done. The files are ready to go. There's no way to read our variables.

So... there is no way to set the endpoints by environment variables?
---------------------

Calm down. There is a way. Linux is our friend now :)

This the configuration file; 
```
const domain = process.env.BFF_DOMAIN || '${BFF_DOMAIN}';
const port = process.env.BFF_PORT || '5000';

export const url = `http://${domain}:${port}`;
```

... the DockerFile:
```
FROM node:dubnium-alpine AS build-env
WORKDIR /
COPY . .
RUN npm install --production && npm run build

FROM nginx:alpine
WORKDIR /etc/nginx/site/static/js
COPY --from=build-env /build /etc/nginx/site
COPY nginx.conf /etc/nginx/nginx.conf
CMD export REACT_FILE=$(ls main.*.js) && \
    envsubst \$BFF_DOMAIN < $REACT_FILE > temp.txt && \
    rm $REACT_FILE && \
    mv temp.txt $REACT_FILE && \
    exec nginx -g 'daemon off;'
```

And docker-compose file:
```
...
  contentmanagerweb:
    image: joaopio/content-manager-web
    depends_on:
      - contentmanagerbff
      - contentapi
      - mysql
    environment:
      - BFF_DOMAIN=socialmovie.minivps.info
    networks:
      - contentmanagernetwork
    ports:
      - "8088:80"
...
```

**This is where the magic happens.**

The last line of the Dockerfile is THE line. The envsubst is a Linux Command Line Program that searches in a file or the standart input for the environment variables requested and substitute them by the host environment variables values.

At the docker-compose.yml file we provide the variables we need to configure the container. Then, at the startup of the container, we:
- search for the file that contains the variables (in this case, it's the main.some_hash_here.chunk.js 
- sustitute the '${BFF_DOMAIN}' with the value provided by the docker-compose (which is "socialmovie.minivps.info")
- output it to temp.txt
- exclude the original file
- rename temp.txt to the original file name
- and starts nginx

**REMEMBER: all of the commands of the Dockerfile runs at image build time, EXCEPT the CMD. The CMD command runs at container initialization time! And that is why this trick works ;)**