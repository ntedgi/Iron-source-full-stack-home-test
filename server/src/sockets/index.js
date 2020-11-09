const socket = require('socket.io');
const chatHandler = require('./handlers/chatHandler');

const {
  CONNECTION,
  LEAVE_ROOM,
  JOIN_ROOM,
  MESSAGE,
  DISCONNECT,
} = require('./consts');


const createSocket = server => {
  const io = socket(server);
  io.on(CONNECTION, socket => {
    chatHandler.newUserConnection(socket);
    socket.on(LEAVE_ROOM, data => chatHandler.userLeaveChatRoom(io, socket, data));
    socket.on(JOIN_ROOM, data => chatHandler.userJoinChatRoom(io, socket, data));
    socket.on(MESSAGE, msg => chatHandler.userSendMessage(socket, msg));
    socket.on(DISCONNECT, () => chatHandler.disconnect(socket));
  });
};

module.exports = {
  createSocket,
};
