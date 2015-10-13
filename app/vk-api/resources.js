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

    request(params, additionalUrl, resInterceptor) {
        const url = this.getUrl(params, additionalUrl);

        debug('=> (GET) %s', url);

        let request = superagent
            .get(url)
            .timeout(6000)
            .set('Accept', 'application/json');
        if (process.env.BROWSER) {
            request.jsonp();
        }

        const promise = new Promise((resolve, reject) => {
            try {
                request.end((err, res) => {
                    debug('<= (%s) %s', res && res.status, url);
                    err ? reject(err) : resolve(res);
                })
                .send();
            }
            catch (e) {
                reject(e);
            }
        }).then(resInterceptor);

        promise.abort = () => {
            request.abort();
        };

        return promise;
    }

}
