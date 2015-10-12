import moment from 'moment';
import Promise from 'bluebird';

import UserApi from '../vk-api/user';

const bDate = (bdate) => {
    if (!bdate) {
        return '?';
    }
    if (bdate.split('.').length == 2) {
        return moment(bdate, 'D.M').format('MMMM D');
    }
    const bDateMoment = moment(bdate, 'D.M.YYYY');
    const age = moment().diff(bDateMoment, 'years');
    return bDateMoment.format('MMMM D, YYYY')+` (age ${age})`;
};

export default (req, res, next) => {
    const { id } = req.params;

    const promises = {
        friends: UserApi.friends(id, {
            order: 'random',
            fields: 'photo_50'
        })
    };

    if (req.pjax == '#friends-list') {
        promises.friends.then((friends) => {
            res.render('user-details/user-details-friends', {
                friends: friends
            });
        });
        return;
    }

    promises.user = UserApi.get(id, 'photo_200,bdate,online,last_seen,counters,bdate,status');
    promises.photos = UserApi.photos(id);
    Promise.props(promises).then((result) => {

        const { user, friends, photos } = result;

        // additional view data
        user.lastSeen = moment.utc(user.last_seen.time * 1000).format('LLL');
        user.bDate = bDate(user.bdate);

        res.locals.routeName = 'user-details';
        res.locals.pageTitle = `Users details: ${user.first_name} ${user.last_name}`;
        res.locals.pageDescription = user.status;

        res.recentlyViewed.add(id);

        res.render('user-details/user-details', {
            user: user,
            friends: friends,
            photos: photos
        });
    }, (err) => {
        next(err);
    });
};
