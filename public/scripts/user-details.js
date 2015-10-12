'use strict';

$(() => {

    const $document = $(document);

    $document.on('pjax:end:user-details', () => {
        $('#already-viewed').removeClass('hide');
    });

});
