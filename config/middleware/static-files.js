import path from 'path';
import express  from 'express';
import favicon from 'serve-favicon';

import config from '../config';

export default (app) => {

    if (config.env == 'development') {
        // favicon
        app.use(favicon(path.resolve(config.rootPath, 'public', 'favicon.ico')));
        // static files
        app.use('/public', express.static(path.join(config.rootPath, 'public')));
        app.use('/img', express.static(path.join(config.rootPath, 'public', 'img')));
        app.use(express.static(path.join(config.rootPath, '.tmp')));
        app.use('/bower_components', express.static(path.join(config.rootPath, 'bower_components')));
        app.use('/node_modules', express.static(path.join(config.rootPath, 'node_modules')));
    }
    else {
        // favicon
        app.use(favicon(path.resolve(config.rootPath, 'build', 'public', 'favicon.ico')));
        // static files
        app.use(express.static(path.join(config.rootPath, 'build', 'public')));
    }

};
