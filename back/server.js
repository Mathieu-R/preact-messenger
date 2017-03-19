const http = require('http');
const express = require('express');
const handlebars = require('handlebars');
const io = require('socket.io');
const { h } = require('preact');
const render = require('render-to-string');
const { readFile } = require('./utils');
const index = require('../front/index');
const PORT = 8080;

app.get('/', (req, res) => {
  res.send(index, {
    css: ['/dist/style.css'],
    lazycss: ['/dist/style.css'],
    content: render(<App/>)
  });
});

io.on('connection', socker => {
  console.log('[INFO] User connected.');
});

http.createServer(app).listen(PORT, _ => {
  console.log(`Preact-Messenger is waiting for you on port ${PORT}`);
})
