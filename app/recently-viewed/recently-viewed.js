import UserApi from '../vk-api/user';

export default (req, res, next) => {

    const ids = res.recentlyViewed.get();
    if (!ids.length) {
        res.redirect('/');
        return;
    }

    UserApi.query(ids, 'photo_50,online').then((users) => {

        res.render('recently-viewed/recently-viewed', {
            users: users
        });

    }, (err) => {
        next(err);
    });
};
