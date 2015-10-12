import UserApi from '../vk-api/user';

export default (req, res, next) => {

    UserApi.randPretty('photo_50,online').then((users) => {

        res.locals.routeName = 'user-pretty-list';
        res.locals.pageTitle = 'Pretty girls';

        res.render('user-pretty-list/user-pretty-list', {
            users: users
        });

    }, (err) => {
        next(err);
    });
};
