import http from 'http';
import express from 'express';
import handlebars from 'handlebars';
import socketio from 'socket.io';
import mongoose from 'mongoose';
import {h} from 'preact';
import render from 'preact-render-to-string';
import {readFile} from './utils';
import index from '../front/index.hbs';
import {getMessages, postMessage} from './controllers/messages';
//import App from '../front/static/js/components/app';

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const production = process.env.NODE_ENV === 'production';
const PORT = 8080;
const DBURL = 'mongodb://localhost:27017/preact-messenger';

mongoose.Promise = global.Promise;
mongoose.connect(DBURL);

const users = [];

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

function processDate(date) {
  const hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  const minutes = date.getMinutes();
  return `${hours}h${minutes}`;
}

function checkUser(userToConnect) {
  const userExists = users.find(user => user.name === userToConnect.name);
  if (userExists) {
    Promise.resolve(true);
  }
  Promise.resolve(false);
}

io.on('connection', async socket => {
  // Envoi les utilisateurs au nouveau client
  users.forEach(user => socket.emit('user', user));
  const messages = await getMessages;
  messages.forEach(message => socket.emit('message', message));

  //  Nouvel utilisateur
  socket.on('user', async user => {
    const userExists = await checkUser(user);
    if (userExists) {
      socket.emit("user:alreadyExists", "Désolé mais ce nom d'utilisateur existe déjà")
      return;
    }
    socket.me = user;
    users.push(user);
    io.emit('user', user);
  });

  // Nouveau message
  socket.on('message', async message => {
    message.time = processDate(new Date());
    io.emit('message', message);
    await postMessage(message);
  });

  // Déconnection
  socket.on('disconnect', () => {
    users.splice(users.indexOf(socket.me), 1);
    //console.log(`[INFO] ${socket.me.name} disconnected.`);
  })

});

server.listen(PORT, () => {
  console.log(`[API] running on port ${PORT}`);
})
