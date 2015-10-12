'use strict';

$(() => {
    if (!$.support.pjax) return;

    const $document = $(document);

    /*global NProgress*/
    NProgress.configure({showSpinner: false});
    $document.on('pjax:start', () => {
        NProgress.start();
    });
    $document.on('pjax:end', () => {
        NProgress.done();
    });

});
