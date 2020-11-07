const dbHandler = require('../../services/db/PostgresHandler');

const usersTable = 'users';

const createUser = async(email, nick_name) => {
  const userFound = await userExists(email, nick_name);
  let userCreated = false;
  if (!userFound) {
    const query = `INSERT INTO ${usersTable}(email, nick_name) VALUES($1, $2)`;
    const values = [email, nick_name];
    await dbHandler.executeQuery(query, values);
    userCreated = true;
  }
  return userCreated;
};

const getUserByEmail = async email => {
  const selectFieldsQuery = `SELECT * from ${usersTable} where email = ($1)`;
  const form = await dbHandler.executeQuery(selectFieldsQuery, [email]);
  return form.rows;
};

const getUserByNickName = async nickName => {
  const selectFieldsQuery = `SELECT * from ${usersTable} where nick_name = ($1)`;
  const form = await dbHandler.executeQuery(selectFieldsQuery, [nickName]);
  return form.rows;
};

const emailExist = async email => {
  const user = await getUserByEmail(email);
  return !(user === undefined || user.length === 0);
};
const nickNameExist = async nickName => {
  const user = await getUserByNickName(nickName);
  return !(user === undefined || user.length === 0);
};

const userExists = async(email, nickName) => {
  const [userFound, nickNameFound] = await Promise.all([emailExist(email), nickNameExist(nickName)]);
  return userFound || nickNameFound;
};

module.exports = {
  createUser,
  getUserByEmail
};
