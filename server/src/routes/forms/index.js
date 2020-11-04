const express = require('express');
const logger = require('../../services/logger/WinstonLogger');

const router = express.Router();

const forms = require('../../models/forms');

const errorMessage = 'Internal Server Error';
router.get('/', async(req, res) => {
  try {
    const result = await forms.getForms();
    res.send({ status: 200, data: result });
  } catch (e) {
    logger.error(e.message);
    res.send({ status: 500, data: errorMessage });
  }
});

router.get('/:id', async(req, res) => {
  try {
    const { id } = req.params;
    const result = await forms.getFormById(id);
    res.send({ status: 200, data: result });
  } catch (e) {
    logger.error(e.message);
    res.send({ status: 500, data: errorMessage });
  }
});

router.post('/', async(req, res) => {
  const { name, fields } = req.body;
  forms
    .createForm(name, fields)
    .then(res.send({ status: 200 }))
    .catch(e => {
      logger.error(e.message);
      res.send({ status: 500, data: errorMessage });
    });
});

router.post('/submit', (req, res) => {
  const { id, fields } = req.body;
  forms
    .submitForm(id, fields)
    .then(res.send({ status: 200 }))
    .catch(e => {
      logger.error(e.message);
      res.send({ status: 500, data: errorMessage });
    });
});

router.get('/submit/:id', async(req, res) => {
  try {
    const { id } = req.params;
    const result = await forms.getFormSubmitsById(id);
    res.send({ status: 200, data: result });
  } catch (e) {
    logger.error(e.message);
    res.send({ status: 500, data: errorMessage });
  }
});

module.exports = router;
