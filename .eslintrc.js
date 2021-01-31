const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'));

module.exports = {
  env: {
    browser: true,
    jest: true,
  },
  extends: ['airbnb', 'react-app', 'prettier', 'prettier/react'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error', prettierOptions],
    camelcase: [
      'error',
      {
        ignoreDestructuring: true,
        allow: ['^nsp_|^cssi_|^wgs_|^rdfs_|^skos_|^foaf_'],
      },
    ],
  },
};
