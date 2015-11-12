export default (app) => {

    app.use((req, res, next) => {

        const sess = req.session;
        const maxLength = 20;

        res.recentlyViewed = {
            get() {
                return sess.recentlyViewed || [];
            },

            add(id) {
                let recentlyViewed = this.get();

                const index = recentlyViewed.indexOf(id);
                if (index != -1) {
                    recentlyViewed.splice(index, 1);
                }

                else if (recentlyViewed.length >= maxLength) {
                    recentlyViewed.splice(maxLength, 1);
                }

                recentlyViewed.unshift(id);

                sess.recentlyViewed = recentlyViewed;
            }
        };

        res.locals.recentlyViewed = res.recentlyViewed.get;

        next();
    });

};
