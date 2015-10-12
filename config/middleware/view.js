import twig from 'twig';
import url from 'url';

import config from '../config';

export default (app) => {

    // View path depends on env
    const viewPath = app.get('env') == 'production'
        ? 'build/views'
        : 'app';

    app.set('views', `${config.rootPath}/${viewPath}`);

    // Twig templating engine settings
    if (app.get('env') == 'development' || app.get('env') == 'test') {
        app.set('twig options', {
            strict_variables: true
        });
        twig.cache(false);
    }

    app.set('view engine', 'html');
    app.engine('html', twig.__express);

    app.use((req, res, next) => {

        res.locals.activeClass = (link, className = 'active') => {
            const pathName = url.parse(req.url).pathname;
            if (link == '/') {
                return pathName == '/' ? className : '';
            }
            return pathName.indexOf(link) != -1 ? className : '';
        };

        next();

    });

};
