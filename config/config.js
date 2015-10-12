const path = require('path');

const env = require('./env.json');

const defaults = {
    rootPath: path.join(__dirname, '..'),
    env: process.env.NODE_ENV || 'dev'
};

export default Object.assign({}, defaults, env);
