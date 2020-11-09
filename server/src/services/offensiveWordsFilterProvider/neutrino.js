const fetch = require('node-fetch');
const logger = require('../logger');
const filterServiceConfig = {
  'user-id': process.env.NEUTRINO_API_USER_ID,
  'api-key': process.env.NEUTRINO_API_API_KEY,
};
const filterEndPoint = 'https://neutrinoapi.net/bad-word-filter';
const minimumWordLengthToTestWithApi = 3;

const clean = async text => {
  if (text.length > minimumWordLengthToTestWithApi) {
    try {
      const body = {content: text, ...filterServiceConfig};
      const response = await fetch(filterEndPoint, {
        method: 'post',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'},
      }).then(res => res.json()).catch(e => {
        logger.error(e);
        return text;
      });
      let cleanText = text;
      response['bad-words-list'].forEach(badWord => {
        const regex = new RegExp(badWord, 'gi');
        cleanText = cleanText.replace(regex, '*'.repeat(badWord.length));
      });
      return cleanText;
    } catch (e) {
      logger.error(e);
    }
  }
  return text;
};


module.exports = {
  clean,
};
