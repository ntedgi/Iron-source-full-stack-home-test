const logger = require('../../services/logger');
const {getChatMessagesByRoomName, saveMessage} = require('../../models/massages');
const offensiveWordsFilter = require('../../services/offensiveWordsFilterProvider').getOffensiveWordFilter();

const {
  MESSAGE,
  GET_USERS_LIST,
  GET_MESSAGES_HISTORY,
} = require('../consts');

const serverInfo = {
  connectedUsers: {},
};


const getChatRoomOnlineUsers = (io, roomName) => {
  try {
    return Object.keys(io.sockets.adapter.rooms[roomName].sockets).map(e => serverInfo.connectedUsers[e]);
  } catch (e) {
    return [];
  }
};


const userJoinChatRoom = (io, socket, data) => {
  const {roomName, nickName} = data;
  serverInfo.connectedUsers[socket.id] = nickName;
  socket.join(roomName);
  const userList = getChatRoomOnlineUsers(io, roomName);
  socket.emit(GET_USERS_LIST, userList);
  socket.to(roomName).emit(GET_USERS_LIST, userList);
  getChatMessagesByRoomName(roomName).then(data => {
    socket.emit(GET_MESSAGES_HISTORY, data);
  });
  socketInfo(`user join to : ${roomName} room`);
};

const userLeaveChatRoom = (io, socket, data) => {
  const {roomName} = data;
  socket.leave(roomName);
  const userList = getChatRoomOnlineUsers(io, roomName);
  socket.to(roomName).emit(GET_USERS_LIST, userList);
  socketInfo(`user disconnect : ${socket.id} | leave room ${roomName}`);
};

const disconnect = socket => {
  socketInfo(`socket id  ${socket.id} disconnect.`);

};

const newUserConnection = socket => {
  socketInfo(`new user connected : ${socket.id}`);
};

const userSendMessage = async(socket, data) => {
  const {room, message, user} = data;
  const massageWithoutBadWords = await offensiveWordsFilter.clean(message);
  saveMessage(room, massageWithoutBadWords, user).then(response => {
    socketInfo(`user  ${user} sends ${massageWithoutBadWords} in room: ${room} [ ${socket.id} ]`);
    socket.to(room).emit(MESSAGE, response);
    socket.emit(MESSAGE, response);
  });
};

const socketInfo = message => logger.info(`Socket | ${message}`);


module.exports = {
  userSendMessage,
  userJoinChatRoom,
  userLeaveChatRoom,
  disconnect,
  newUserConnection,
};
