const logger = require('../logger/WinstonLogger');

const {
  CONNECTION,
  DISCONNECT,
  JOIN_ROOM,
  MESSAGE,
} = require('./consts');

const lsocket = message => logger.info(`Socket | ${message}`);

const ChatRoomHandler = io => {
  io.on(CONNECTION, socket => {
    socket.on(JOIN_ROOM, data => {
      lsocket(`user join to : ${data.roomName} room`);
    });
    lsocket(`new user connected : ${socket.id}`);
    socket.on(DISCONNECT, () => {
      lsocket(`user disconnect : ${socket.id}`);
    });
    socket.on(MESSAGE, data => {
      lsocket(`user ${data.user.name} sends ${data.message} `);
      socket.to(data.room).emit(MESSAGE, data.message);
    });

  });
};


module.exports = {
  ChatRoomHandler,
};
