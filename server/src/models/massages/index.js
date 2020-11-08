const dbHandler = require('../../services/db/PostgresHandler');

const chatRoomHistoryTable = 'room_history';

const saveMessage = (roomName, message, sender) => {
  const query = `INSERT INTO ${chatRoomHistoryTable} (room_name,message,sender) VALUES($1, $2,$3) RETURNING  message, sender ,timestamp`;
  return dbHandler.executeQuery(query, [roomName, message, sender]).then(e => e.rows[0]);
};

const getChatMessagesByRoomName = roomName => {
  const selectFieldsQuery = `SELECT  message, sender ,timestamp from ${chatRoomHistoryTable} where  room_name = ($1) order by timestamp`;
  return dbHandler.executeQuery(selectFieldsQuery, [roomName]).then(e => e.rows);
};

module.exports = {
  getChatMessagesByRoomName,
  saveMessage,
};
