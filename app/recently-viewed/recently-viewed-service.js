export default (app) => {

    app.use((req, res, next) => {

        const sess = req.session;
        const maxLength = 20;

        res.recentlyViewed = {
            get() {
                return sess.recentlyViewed || [];
            },
            add(id) {
                if (!sess.recentlyViewed) {
                    sess.recentlyViewed = [];
                }

                const index = sess.recentlyViewed.indexOf(id);
                if (index != -1) {
                    sess.recentlyViewed.splice(index, 1);
                }

                else if (sess.recentlyViewed.length >= maxLength) {
                    sess.recentlyViewed.splice(maxLength, 1);
                }

                sess.recentlyViewed.unshift(id);
            }
        };

        res.locals.recentlyViewed = res.recentlyViewed.get;

        next();
    });

};
