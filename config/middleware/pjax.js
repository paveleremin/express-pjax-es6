const cheerio = require('cheerio');

export default (app) => {
    app.use((req, res, next) => {

        if (!req.xhr || !req.header('x-pjax') || !req.header('x-pjax-container')) {
            next();
            return;
        }

        const origin = res.render;

        res.render = (template, locals, cb) => {

            req.pjax = req.header('x-pjax');

            const allLocals = Object.assign({}, res.locals, locals);
            app.render(template, allLocals, (err, html) => {
                if (err) return next(err);

                const $ = cheerio.load(html);
                const data = $(req.header('x-pjax-container')).html();

                if (!data) {
                    origin(template, locals, cb);
                    return;
                }

                const title = $('title').text();
                res.type('html');
                res.write(`<title>${title}</title>${data}`);
                res.end();
            });
        };

        next();
    });
};
