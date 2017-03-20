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
/** @jsx h */

express.static('/static/', '../front/static');

app.get('/', (req, res) => {
  res.send(index({
    css: ['/static/style.css'],
    lazyCss: ['/static/style.css'],
    scripts: ['/static/build.js'],
    content: render(<App/>)
  }));
});

io.on('connection', socket => {
  console.log('[INFO] User connected.');
  const users = [];

  // Envoi les utilisateurs au nouveau client
  socket.emit('user', user);

  //  Nouvel utilisateur
  socket.on('user', user => {
    users.push(user);
    io.emit('user', user);
  });

  // Nouveau message
  socket.on('message', message => {
    io.emit('message', message);
  });

});

server.listen(PORT, _ => {
  console.log(`Preact-Messenger is waiting for you on port ${PORT}`);
})
