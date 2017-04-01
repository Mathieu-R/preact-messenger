import http from 'http';
import express from 'express';
import dotenv from 'dotenv'
import handlebars from 'handlebars';
import socketio from 'socket.io';
import mongoose from 'mongoose';
import session from 'express-session';
import connectRedis from 'connect-redis';
import {h} from 'preact';
import render from 'preact-render-to-string';
import {readFile} from './utils';
import index from '../front/index.hbs';
import {getMessages, postMessage} from './controllers/messages';
//import App from '../front/static/js/components/app';

dotenv.config(); // init dotenv
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const RedisStore = connectRedis(session);
const production = process.env.NODE_ENV === 'production';
const PORT = 8080;
const DBURL = process.env.DBURL;

mongoose.Promise = global.Promise;
mongoose.connect(DBURL);

const users = [];
const sessionConfig = {
  store: new RedisStore(),
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: true
}

app.use(session(sessionConfig));

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
  return new Promise((resolve, reject) => {
    const userExists = users.find(user => user.name === userToConnect.name);
    if (userExists) {
      reject("Désolé mais ce nom d'utilisateur existe déjà");
    }
    resolve();
  })
}

io.on('connection', async socket => {
  console.log(users);
  // Envoi les utilisateurs au nouveau client
  users.forEach(user => socket.emit('user', user));
  const messages = await getMessages();
  messages.forEach(message => socket.emit('message', message));

  //  Nouvel utilisateur
  socket.on('user', user => {
    checkUser(user)
      .then(() => {
        socket.me = user; // me
        users.push(user); // add user
        io.emit('user', user); // emit user
      })
      .catch(message => { // user does not exist
        socket.emit("user:alreadyExists", message);
      })
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
