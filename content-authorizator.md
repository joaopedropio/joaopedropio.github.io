Content Authorizator
=====================

What is the Content Authorizator?
---------------------

The Content Authorizator is responsible for authorizing registered clients to consume media from the Content Service.

A deep dive...
---------------------

The point of the Content service is to provide... well... content like video, audio and photos to the users of the site. We do that by storing all that static files behind NGINX. The users just need to know the path of the file and access the Content Service. However, we do not want that content open to everyone on the internet. So that is where the Content Authorizator comes in. To be possible to the user to get the files from the Content Service, he/she needs an authorization to do so. 

This is how the it works:

![](content-authorizator-flowchart.png)

  1. The client resquests a file. The HTTP request needs a Authorization header with it respected value. 
  2. The NGINX instance get the request and redirects it to the Authorizator Service. 
  3. The Authorizator checks the authoriztion's header value. It searches on the list. If the respected authorization value is found, it responds with a 200 OK HTTP status code. If not, it responds with a 403 Forbidden.
  4. If NGINX receives a 200, it returns the requested file. If it receives 403, it responds with a 403 HTTP Status code to the client.

**Today, there is not an api to provide this authorization token.**