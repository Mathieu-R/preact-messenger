import http from 'http';
import express from 'express';
import handlebars from 'handlebars';
import socketio from 'socket.io';
import { h } from 'preact';
import render from 'preact-render-to-string';
import { readFile } from './utils';
import index from '../front/index.hbs';
import App from 'components/app';

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const PORT = 8080;

app.use(express.static('/static/', '../../dist'));

app.get('/', (req, res) => {
  res.send(index({
    css: ['/static/css/style.css'],
    lazyCss: ['/static/css/style.css'],
    scripts: ['/static/app.bundle.js', '/static/vendor.bundle.js'],
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
