const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const handlebars = require('handlebars');
const io = require('socket.io')(server);
const { h } = require('preact');
const render = require('preact-render-to-string');
const { readFile } = require('./utils');
const index = require('../front/index.hbs');
const App = require('components/app');
const PORT = 8080;

app.use(express.static('/static/', '../../dist'));

app.get('/', (req, res) => {
  res.send(index({
    css: ['/static/css/style.css'],
    lazyCss: ['/static/css/style.css'],
    scripts: ['/static/js/app.bundle.js'],
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

  // Déconnection
  socket.on('disconnect', _ => {
    console.log('[INFO] User disconnected.');
  })

});

server.listen(PORT, _ => {
  console.log(`Preact-Messenger is waiting for you on port ${PORT}`);
})
