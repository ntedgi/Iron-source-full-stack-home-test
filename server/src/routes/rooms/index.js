const express = require('express');
const logger = require('../../services/logger/WinstonLogger');
const router = express.Router();
const rooms = require('../../models/rooms');

const {
  INTERNAL_SERVER_ERROR,
} = require('../consts');

router.get('/', async(req, res) => {
  rooms
    .getAllAvailableChatRooms()
    .then(response => {
      if (response && response.length > 0) {
        const {nick_name} = response[0];
        res.send({'status': 200, data: {nickName: nick_name}});
      }
    })
    .catch(e => {
      logger.error(e.message);
      res.send({status: 500, data: INTERNAL_SERVER_ERROR});
    });
});

router.post('/', async(req, res) => {
  const {name, nickName} = req.body;
  rooms.createChatRoom(name, nickName)
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