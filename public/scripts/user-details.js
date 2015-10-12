'use strict';

$(() => {

    const $document = $(document);

    $document.on('pjax:end:user-details', () => {
        $('#recently-viewed').removeClass('hide');
    });

});
