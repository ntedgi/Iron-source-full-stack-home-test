require('dotenv').config({path: './.env.development'});
const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const logger = require('./src/services/logger/WinstonLogger');
const usersRouter = require('./src/routes/users');
const roomsRouter = require('./src/routes/rooms');
const {ChatRoomHandler} = require('./src/services/chat/ChatRoomHandler');
const app = express();
const server = http.Server(app);
const socket = require('socket.io');
const socketHandler = socket(server);
ChatRoomHandler(socketHandler);

const port = process.env.APP_PORT;
const serverName = process.env.APP_NAME;

app.use(bodyParser.json());

app.use('/api/users', usersRouter);
app.use('/api/rooms', roomsRouter);

app.use((req, res, next) => {
  logger.info(`${serverName} |  ${req.url}  ${req.method} -- ${new Date()}`);
  next();
});

server.listen(port, () => {
  logger.info(`${serverName} | started , server listening on port: ${port}`);
});
