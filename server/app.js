require('dotenv').config({path: './.env.development'});
const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const logger = require('./src/services/logger');
const usersRouter = require('./src/routes/users');
const roomsRouter = require('./src/routes/rooms');
const app = express();
const server = http.Server(app);
const socketSetup = require('./src/sockets');

const port = process.env.APP_PORT;
const serverName = process.env.APP_NAME;

socketSetup.createSocket(server);

app.use(bodyParser.json());

app.use('/api/users', usersRouter);
app.use('/api/rooms', roomsRouter);

app.use((req, res, next) => {
  logger.info(`${serverName} |  ${req.url}  ${req.method} -- ${new Date()}`);
  next();
});

server.listen(port, async() => {
  logger.info(`${serverName} | started , server listening on port: ${port}`);
});
