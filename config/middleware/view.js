import config from '../config';
import twig from 'twig';

export default (app) => {

    // View path depends on env
    const viewPath = config.env == 'prod'
        ? 'build/views'
        : 'app';

    app.set('views', `${config.rootPath}/${viewPath}`);

    // Twig templating engine settings
    if (config.env == 'dev' || config.env == 'test') {
        app.set('twig options', {
            strict_variables: true
        });
        twig.cache(false);
    }

    app.set('view engine', 'html');
    app.engine('html', twig.__express);

    app.use((req, res, next) => {

        function activeClassName(link, className = 'active') {
            if (link == '/') {
                return req.url == '/' ? className : '';
            }
            return req.url.indexOf(link) != -1 ? className : '';
        }

        res.locals.activeClassName = activeClassName;
        res.locals.activeClass = (link, className) => {
            const activeClassName = activeClassName(link, className);
            return activeClassName ? ` class="${activeClassName}"` : '';
        };
        res.env = config.env;

        next();

    });

};
