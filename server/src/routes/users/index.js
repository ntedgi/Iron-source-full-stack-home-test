const express = require('express');
const logger = require('../../services/logger/WinstonLogger');

const router = express.Router();

const users = require('../../models/users');

const {
  INTERNAL_SERVER_ERROR,
} = require('../consts');

router.post('/signin', async(req, res) => {
  const {email} = req.body;
  users
    .getUserByEmail(email)
    .then(response => {
      if (response && response.length > 0) {
        const {nick_name} = response[0];
        res.send({'status': 200, data: {nickName: nick_name}});
      } else
        res.send({'status': 403, errorMessage: 'User not Found'});
    })
    .catch(e => {
      logger.error(e.message);
      res.send({status: 500, data: INTERNAL_SERVER_ERROR});
    });
});

router.post('/signup', async(req, res) => {
  const {email, name} = req.body;
  users
    .createUser(email, name)
    .then(response => {
      if (response)
        res.send({'status': 200});
      else
        res.send({'status': 409, errorMessage: 'conflict user name or email already used!'});
    })
    .catch(e => {
      logger.error(e.message);
      res.send({status: 500, INTERNAL_SERVER_ERROR});
    });
});

module.exports = router;
