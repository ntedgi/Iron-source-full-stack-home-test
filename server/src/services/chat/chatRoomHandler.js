const logger = require('../logger/WinstonLogger');
const {getChatMessagesByRoomName, saveMessage} = require('../../models/massages');
const {
  CONNECTION,
  DISCONNECT,
  JOIN_ROOM,
  MESSAGE,
  GET_USERS_LIST,
  GET_MESSAGES_HISTORY,

} = require('./consts');

const connectedUsers = {};

const getChatRoomOnlineUsers = (clients, roomName, nickName) => {
  const socketIds = Object.keys(clients.sockets).filter(e => Object.keys(clients.sockets[e].rooms).includes(roomName));
  const userList = socketIds.map(e => connectedUsers[e]);
  userList.push(nickName);
  return userList;

};


const ChatRoomHandler = io => {
  io.on(CONNECTION, socket => {
    lsocket(`new user connected : ${socket.id}`);
    socket.on(JOIN_ROOM, data => {
      const {roomName, nickName} = data;
      connectedUsers[socket.id] = nickName;
      socket.join(roomName);
      const userList = getChatRoomOnlineUsers(io.sockets, roomName, nickName);
      socket.emit(GET_USERS_LIST, userList);
      socket.to(roomName).emit(GET_USERS_LIST, userList);
      getChatMessagesByRoomName(roomName).then(data => {
        socket.emit(GET_MESSAGES_HISTORY, data);
      });
      lsocket(`user join to : ${roomName} room`);
    });
    socket.on(DISCONNECT, data => {
      const {roomName} = data;
      socket.leave(roomName);
      lsocket(`user disconnect : ${socket.id} | leave room ${roomName}`);
    });
    socket.on(MESSAGE, data => {
      const {room, message, user} = data;
      saveMessage(room, message, user).then(response => {
        lsocket(`user  ${user} sends ${message} in room: ${room} [ ${socket.id} ]`);
        socket.to(room).emit(MESSAGE, data);
      });

    });
  });
};


const lsocket = message => logger.info(`Socket | ${message}`);


module.exports = {
  ChatRoomHandler,
};
