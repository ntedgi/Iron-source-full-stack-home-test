const dbHandler = require('../../services/db/PostgresHandler');

const chatRoomHistoryTable = 'room_history';

const saveMessage = async(roomName, message, sender) => {
  const query = `INSERT INTO ${chatRoomHistoryTable} (room_name,message,sender) VALUES($1, $2,$3)`;
  const values = [roomName, message, sender];
  await dbHandler.executeQuery(query, values);
};

const getChatMessagesByRoomName = roomName => {
  const selectFieldsQuery = `SELECT * from ${chatRoomHistoryTable} where  room_name = ($1)`;
  return dbHandler.executeQuery(selectFieldsQuery, [roomName]).then(e => e.rows);

};


module.exports = {
  getChatMessagesByRoomName,
  saveMessage,
};
