'use strict';

$(() => {

    /*global Modernizr*/
    if (Modernizr.fontface) return;

    let l = document.createElement('link');
    l.type = 'text/css';
    l.rel = 'stylesheet';
    l.href = '/styles/font-awesome-legacy.css';
    document.getElementsByTagName('head')[0].appendChild(l);

    function renderIcons() {
        $('.fa').each((i, el) => {
            // manifest, second class must be name of icon
            // <i class="fa fa-youtube ..."></i>
            $(el).removeClass('fa-fw');
        });
    }

    renderIcons();
    $(document).on('pjax:success', () => {
        renderIcons();
    });
});
