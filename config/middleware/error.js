export default (app) => {

    app.use((err, req, res, next) => {
        // treat as 404
        if (err.message
            && (~err.message.indexOf('not found')
            || (~err.message.indexOf('Cast to ObjectId failed')))) {
            return next();
        }
        /*eslint no-console: 0*/
        console.error(err.stack);
        // error page
        res.locals.routeName = 'error500';
        res.locals.pageTitle = 'Error 500';
        res.status(500).render('errors/error-500');
    });

    // assume 404 since no middleware responded
    app.use((req, res) => {
        res.locals.routeName = 'error404';
        res.locals.pageTitle = 'Error 404';
        res.status(404).render('errors/error-404');
    });

};
