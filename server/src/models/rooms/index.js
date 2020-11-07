const dbHandler = require('../../services/db/PostgresHandler');

const chatRoomTable = 'rooms';

const createChatRoom = async(roomName, creator) => {
  const userFound = await chatRoomExists(roomName);
  let userCreated = false;
  if (!userFound) {
    const query = `INSERT INTO ${chatRoomTable}(email, nick_name) VALUES($1, $2)`;
    const values = [roomName, creator];
    await dbHandler.executeQuery(query, values);
    userCreated = true;
  }
  return userCreated;
};

const getAllAvailableChatRooms = async() => {
  const selectFieldsQuery = `SELECT * from ${chatRoomTable}`;
  const data = await dbHandler.executeQuery(selectFieldsQuery, []);
  if (data && data.rows) {
    return data.rows.map(e => ({name: e['room_name'], usersCount: 0}));
  }
  return [];
};

const getChatRoomByName = async roomName => {
  const selectFieldsQuery = `SELECT * from ${chatRoomTable} where nick_name = ($1)`;
  const form = await dbHandler.executeQuery(selectFieldsQuery, [roomName]);
  return form.rows;
};


const chatRoomExists = async nickName => {
  const user = await getChatRoomByName(nickName);
  return !(user === undefined || user.length === 0);
};


module.exports = {
  getAllAvailableChatRooms,
  createChatRoom,
};
