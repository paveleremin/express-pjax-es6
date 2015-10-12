import csrf from 'csurf';

export default (app) => {

    if (app.get('env') == 'test') return;

    app.use(csrf());

    // add data to view
    app.use((req, res, next) => {
        res.locals.csrf_token = req.csrfToken();
        next();
    });

};
