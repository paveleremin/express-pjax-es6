// Register babel to have ES6 support on the server
require('babel/register');

const express = require('express');

const app = express();

app.set('env', process.env.NODE_ENV || 'development');
app.set('host', process.env.HOST || 'localhost');
app.set('port', process.env.PORT || 3000);

// Bootstrap application settings
require('./config/express')(app);

// Services
require('./app/recently-viewed/recently-viewed-service')(app);

// Bootstrap routes
require('./config/routes')(app);

app.listen(app.get('port'), app.get('host'));

/*eslint no-console: 0*/
console.log(
    'Express %s server listening on http://%s:%s',
    app.get('env'),
    app.get('host'),
    app.get('port')
);

module.exports = app;
