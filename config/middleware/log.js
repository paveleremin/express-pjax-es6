import config from '../config';
import winston from 'winston';
import morgan from 'morgan';

export default (app) => {

    // don't log during tests
    if (config.env == 'test') return;

    let log = 'development';

    // Use winston on production
    if (config.env == 'production') {
        log = {
            stream: {
                write: (message) => {
                    winston.info(message);
                }
            }
        };
    }

    app.use(morgan('combined', log));

};
