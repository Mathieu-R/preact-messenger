import http from 'http';
import express from 'express';
import handlebars from 'handlebars';
import socketio from 'socket.io';
import { h } from 'preact';
import render from 'preact-render-to-string';
import { readFile } from './utils';
import index from '../front/index.hbs';
//import App from '../front/static/js/components/app';

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const production = process.env.NODE_ENV === 'production';
const PORT = 8080;

//app.use(express.static('/static/', '../../dist'));

/*app.get('/', (req, res) => {
  // server-side-rendering preact components - in production (when assets are built)
  res.send(index({
    css: ['/static/style.css'],
    lazyCss: ['/static/style.css'],
    scripts: ['/static/app.bundle.js', '/static/vendor.bundle.js'],
    content: render(<App/>)
  }));
});*/

io.on('connection', socket => {
  const users = [];

  // Envoi les utilisateurs au nouveau client
  users.forEach(user => socket.emit('user', user));

  //  Nouvel utilisateur
  socket.on('user', user => {
    console.log(user);
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
  console.log(`[API] running on port ${PORT}`);
})
