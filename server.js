const express = require('express');
const http = require('http');
const path = require('path');
var jsonServer = require('json-server');
const app = express();
app.use(express.static(path.join(__dirname,'dist')));
app.use((req, res, next) => {
	res.append('Access-Control-Allow-Origin', ['*']);
	res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.append('Access-Control-Allow-Headers', 'Content-Type');
	next();
});
app.use('/api', jsonServer.router('db.json'));
app.get('*', (req,res) => res.sendFile(path.join(__dirname, 'dist/index.html')));
const port = process.env.PORT || 4444;
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log(`Running server | Listening to port ${port}`));