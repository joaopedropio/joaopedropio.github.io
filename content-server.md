Content Server
=====================

What is the Content Server?
---------------------

The Content Server just make the task of get the NGINX up and running with docker-composer in a easier way.

What do you mean by "makes it easier to docker-compose"?
---------------------

NGINX is a http server very fast and lightweight. That's nice, everyone is happy. But it's a pain in the a** to configure. NGINX there is no built in solution to work with Environment Variables.
All the services of the Social Networks Project is designed to be run as a docker container, preferably with docker-compose. Docker-compose configures the services with Environmnet Variables and that is a good thing: the image does not have to know the configurations used, the docker environment does.
This project makes the dirty job to configure the NGINX before running it.

But how the configuration process is done anyways?
---------------------

Let's see a little bit of the nginx.conf file:

```
location = /auth {
    internal;
    proxy_pass              ${CONTENT_AUTH_URL};
    proxy_http_version      1.1;
    proxy_pass_request_body off;
    proxy_set_header        Content-Length "";
    proxy_set_header        X-Original-URI $request_uri;
}
```

As you can see at the "proxy_pass" line, there is a placeholder for the CONTENT_AUTH_URL environment variable. "But you just said that NGINX does't support environment variables! Are nuts?!". Calm down, I'll get there.

**This is where the magic happens.**

Let's see the DockerFile:
```
FROM nginx:alpine
WORKDIR /etc/nginx
RUN rm -v nginx.conf
COPY nginx.conf nginx.conf
CMD envsubst \$NGINX_PORT\$CONTENT_PATH\$CONTENT_AUTH_URL < nginx.conf > nginx.conf && exec nginx -g 'daemon off;'
```

The last line is THE line. The envsubst is a Linux Command Line Program that searches in a file or the standart input for the environment variables requested and substitute them by the host environment variables values.

Let's see the docker-compose.yml file (that's the last file, I swear):
```
services:
  content_server:
    image: joaopio/content-server
    ports:
      - 4000:80
    environment:
      - NGINX_PORT=80
      - CONTENT_PATH=/wwwroot
      - CONTENT_AUTH_URL=http://content_authorizator
```

At the docker-compose.yml file we provide the variables we need to configure the container. Then, at the startup of the container, we substitute the variables in the nginx.conf file, copy it to the respected folder and at last, but no least, the container start running with the filled nginx.conf file.

**REMEMBER: all of the commands of the Dockerfile runs at image build time, EXCEPT the CMD. The CMD command runs at container initialization time! And that is why this trick works ;)**