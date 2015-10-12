import UserApi from '../vk-api/user';

export default (req, res, next) => {

    UserApi.rand('photo_50,online').then((users) => {

        res.locals.routeName = 'user-list';
        res.locals.pageTitle = 'Users';

        res.render('user-list/user-list', {
            users: users
        });

    }, (err) => {
        next(err);
    });
};
