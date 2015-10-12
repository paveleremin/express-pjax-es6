import config from '../config';
import csrf from 'csurf';

export default (app) => {

    if (config.env == 'test') return;

    app.use(csrf());

    // add data to view
    app.use((req, res, next) => {
        res.locals.csrf_token = req.csrfToken();
        next();
    });

};
