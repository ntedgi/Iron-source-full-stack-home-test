const neutrinoTextCleaner = require('./neutrino');
const Filter = require('bad-words');

const getOffensiveWordFilter = () => {
  const type = process.env.OFFENSIVE_WORDS_FILTER;
  switch (type) {
    case 'neutrino':
      return neutrinoTextCleaner;
    default:
      return new Filter();
  }
};
module.exports = {
  getOffensiveWordFilter,
};
