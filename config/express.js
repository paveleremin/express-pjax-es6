import compression from 'compression';

import StaticFiles from './middleware/static-files';
import Log from './middleware/log';
import View from './middleware/view';
import Parser from './middleware/parser';
import Pjax from './middleware/pjax';
import Crlf from './middleware/crlf';

export default (app) => {

    // Compression middleware (should be placed before express.static)
    app.use(compression({
        threshold: 512
    }));

    // Static files
    StaticFiles(app);

    // Logging
    Log(app);

    // Parse
    Parser(app);

    // View
    View(app);

    // PJAX
    Pjax(app);

    // CSRF
    Crlf(app);

};
