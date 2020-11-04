require("dotenv").config({ path: "./.env.production" });

const bodyParser = require("body-parser");
const express = require("express");
const logger = require("./src/services/logger/WinstonLogger");
const formsRouter = require("./src/routes/forms");
const port = process.env.APP_PORT;
const serverName = process.env.APP_NAME;

const app = express();

app.use((req, res, next) => {
  logger.info(`${serverName} |  ${req.url}  ${req.method} -- ${new Date()}`);
  next();
});

app.use(bodyParser.json());

app.use("/api/forms", formsRouter);

app.listen(port, () => {
  logger.info(`${serverName} | started , server listening on port: ${port}`);
});
