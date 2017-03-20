const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const handlebars = require('handlebars');
const io = require('socket.io')(server);
const { h } = require('preact');
const render = require('preact-render-to-string');
const { readFile } = require('./utils');
const index = require('../front/index');
const PORT = 8080;

express.static('../front/static');

app.get('/', (req, res) => {
  res.send(index({
    css: ['/static/style.css'],
    lazyCss: ['/static/style.css'],
    scripts: ['/static/build.js'],
    content: render(<App/>)
  }));
});

io.on('connection', socker => {
  console.log('[INFO] User connected.');
});

server.listen(PORT, _ => {
  console.log(`Preact-Messenger is waiting for you on port ${PORT}`);
})
