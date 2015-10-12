import Error from './middleware/error';

import UserDetails from '../app/user-details/user-details';
import UserList from '../app/user-list/user-list';
import UserPrettyList from '../app/user-pretty-list/user-pretty-list';
import RecentlyViewed from '../app/recently-viewed/recently-viewed';

export default (app) => {

    app.get('/', UserList);
    app.get('/pretty', UserPrettyList);
    app.get('/recently-viewed', RecentlyViewed);
    app.get('/users/:id', UserDetails);

    // Handle errors
    Error(app);
};
