const logger = require('../logger/WinstonLogger');
const {getChatMessagesByRoomName, saveMessage} = require('../../models/massages');
const {formatText} = require('../offensiveWordsFilter');

const {
  CONNECTION,
  LEAVE_ROOM,
  JOIN_ROOM,
  MESSAGE,
  GET_USERS_LIST,
  GET_MESSAGES_HISTORY,
  DISCONNECT,

} = require('./consts');

const connectedUsers = {};

const getChatRoomOnlineUsers = (io, roomName) => {
  try {
    const users = Object.keys(io.sockets.adapter.rooms[roomName].sockets).map(e => connectedUsers[e]);
    return users;
  } catch (e) {
    return [];
  }
};


const chatRoomHandler = io => {
  io.on(CONNECTION, socket => {
    lsocket(`new user connected : ${socket.id}`);
    socket.on(JOIN_ROOM, data => {
      const {roomName, nickName} = data;
      connectedUsers[socket.id] = nickName;
      socket.join(roomName);
      const userList = getChatRoomOnlineUsers(io, roomName);
      socket.emit(GET_USERS_LIST, userList);
      socket.to(roomName).emit(GET_USERS_LIST, userList);
      getChatMessagesByRoomName(roomName).then(data => {
        socket.emit(GET_MESSAGES_HISTORY, data);
      });
      lsocket(`user join to : ${roomName} room`);
    });
    socket.on(LEAVE_ROOM, data => {
      const {roomName} = data;
      socket.leave(roomName);
      const userList = getChatRoomOnlineUsers(io, roomName);
      socket.to(roomName).emit(GET_USERS_LIST, userList);
      lsocket(`user disconnect : ${socket.id} | leave room ${roomName}`);
    });
    socket.on(DISCONNECT, () => {
      lsocket(`socket id  ${socket.id} disconnect.`);
    });
    socket.on(MESSAGE, async data => {
      const {room, message, user} = data;
      const massageWithoutBadWords = await formatText(message);
      saveMessage(room, massageWithoutBadWords, user).then(response => {
        lsocket(`user  ${user} sends ${massageWithoutBadWords} in room: ${room} [ ${socket.id} ]`);
        socket.to(room).emit(MESSAGE, response);
        socket.emit(MESSAGE, response);
      });

    });
  });
};


const lsocket = message => logger.info(`Socket | ${message}`);


module.exports = {
  chatRoomHandler,
};
