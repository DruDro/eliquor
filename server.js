const jsonServer = require('json-server');
const path = require('path');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname,'src/db.json'));
const middlewares = jsonServer.defaults();
const port = 3000;

server.use(middlewares);
server.use(router);

server.listen(port);

module.exports = port; 