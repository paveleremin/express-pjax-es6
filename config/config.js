import path from 'path';

const env = require('./env.json');

const defaults = {
    rootPath: path.join(__dirname, '..')
};

export default Object.assign({}, defaults, env);
