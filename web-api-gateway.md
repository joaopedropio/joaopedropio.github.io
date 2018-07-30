Web API Gateway
=====================

What is the Web API Gateway?
---------------------
The Web API Gateway redirects all the http traffic from the clients to the respected API's.

What's the point?!
---------------------
The Web API gateway acts like a wall that isolates the Social Network Services from the Internet.
"Well", you would say, "You want to expose your services to the world but you put a wall right in front of them. What's the point?!". There a lot of reasons to do this, but the best reason is [DRY principle](https://pt.wikipedia.org/wiki/Don%27t_repeat_yourself). Let's see why:

* Security
Imagine that, if all of the services were exposed open to the internet, their inner communication, would be open too. That would need to implement authentication and authorization to each one of the API's. That's a lot of work. So the ideia is to isolate them from the internet and let them communicate freely behind the wall, with no one sniffing the communication. The clients just need to authenticate on the Gateway.

* Service discovery
The project has a lot of services. If the clients of these API's need to store each of the Ip's or DNS's of them, that would be tough. If in the future we decide that we need to change the service's host infrastructure, all the clients should update their references to the services. The API Gateway helps with that. If the clients point to our Gateway, they don't have to change, just the Gateway. 

* Caching
There is no need to always contact the API's for the same information. We implement caching on the Gateway and the API's just have to serve new information. Implementing cache on the Gateway also helps by preventing that each one of the services implement their own.