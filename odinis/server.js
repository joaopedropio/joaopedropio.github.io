const http = require('http');
const fs = require('fs').promises;

const requestListener = function (req, res) {
  console.log(req.url)
  if (req.url == "/odinis") {
    fs.readFile(__dirname + "/index.html")
    .then(contents => {
      res.setHeader("Content-Type", "text/html")
      res.writeHead(200)
      res.end(contents)
    })
    .catch(err => {
      res.writeHead(500)
      res.end(err)
      return
    })
    return
  }
  if (req.url == "/odinis/index.js") {
    fs.readFile(__dirname + "/index.js")
    .then(contents => {
      res.setHeader("Content-Type", "text/javascript")
      res.writeHead(200)
      res.end(contents)
    })
    .catch(err => {
      res.writeHead(500)
      res.end(err)
      return
    })
    return
  }
}

const server = http.createServer(requestListener);
server.listen(8080);