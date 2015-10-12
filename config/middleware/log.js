import winston from 'winston';
import morgan from 'morgan';

export default (app) => {

    // don't log during tests
    if (app.get('env') == 'test') return;

    let log = 'development';

    // Use winston on production
    if (app.get('env') == 'production') {
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
