const { createLogger, format, transports } = require('winston');

const { combine, timestamp, printf } = format;

const loggerFormat = printf(
  info => `${info.timestamp} | ${info.level}: ${info.message}`
);

const logger = createLogger({
  level: process.env.LOGGER_LEVEL,
  format: combine(format.colorize(), timestamp(), loggerFormat),
  transports: [new transports.Console()],
});

module.exports = logger;
