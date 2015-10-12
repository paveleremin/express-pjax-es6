import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import multer from 'multer';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';

export default (app) => {

    // bodyParser should be above methodOverride
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(multer());
    app.use(methodOverride((req) => {
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
            // look in urlencoded POST bodies and delete it
            let method = req.body._method;
            delete req.body._method;
            return method;
        }
    }));

    // CookieParser should be above session
    app.use(cookieParser());
    app.use(cookieSession({secret: 'secret'}));

};
