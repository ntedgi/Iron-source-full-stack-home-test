const pg = require('pg');
const logger = require('../logger/WinstonLogger');

const pgconfig = {
  user: process.env.DATA_BASE_USER,
  database: process.env.DATA_BASE_NAME,
  password: process.env.DATA_BASE_PASSWORD,
  host: process.env.DATA_BASE_HOST,
  port: process.env.DATA_BASE_PORT,
};

logger.info(`DB | Connection Settings: ${JSON.stringify(pgconfig)}`);

const pool = new pg.Pool(pgconfig);

pool.on('connect', () => {
  logger.info('DB | new client connection establish.');
});

pool.on('error', err => {
  logger.error(`idle client error, ${err.message} | ${err.stack}`);
});

pool.connect(err => {
  if (err) {
    logger.error(`PostgreSQL input: ${err}`);
  } else logger.info('DB | connection establish.');
});

const executeQuery = async(sql, data) => {
  logger.debug(`sqlToDB() sql: ${sql} | data: ${data}`);
  try {
    const result = await pool.query(sql, data);
    return result;
  } catch (error) {
    logger.error(error.message);
  }
};

module.exports = {
  executeQuery,
};
