import superagent from 'superagent';

import debug from './../../config/debug';

export default class  {
    constructor() {
        this.url = 'http://api.vk.com/method';
    }

    getUrl(params = {}, additionUrl = '') {
        params.v = '5.37';
        params.lang = 'en';

        const queryParams = {};
        let url = this.url + additionUrl,
            newUrl;

        for (const key in params) {
            newUrl = url.replace(new RegExp(`:${key}`, 'g'), params[key]);
            if (params[key] && newUrl == url) {
                queryParams[key] = params[key];
            }
        }

        for (const key in queryParams) {
            url += `&${key}=${queryParams[key]}`;
        }

        url = url.replace('&', '?');
        url = url.replace(/\/:[A-z]+/g, '');
        url = url.replace(/\/{2,}$/g, '');

        return url;
    }

    request(params, additionalUrl) {
        const url = this.getUrl(params, additionalUrl);

        debug('Resource GET request to %s', url);

        return new Promise((resolve, reject) => {
            try {
                const request = superagent
                    .get(url)
                    .timeout(6000)
                    .send()
                    .set('Accept', 'application/json');
                if (process.env.BROWSER) {
                    request.jsonp();
                }
                request
                    .set('Accept', 'application/json')
                    .end((err, res) => {
                        debug('Received response %s from %s', res && res.status, url);
                        err ? reject(err) : resolve(res);
                    });

                return request;
            }
            catch (e) {
                reject(e);
            }
        });
    }

}
