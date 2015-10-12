'use strict';

$(() => {
    if (!$.support.pjax) return;

    const $document = $(document),
        $body = $(document.body);
    // Manifest: route class name first
    let previosRoute = $body.prop('class').split(' ')[0];

    function handler(event) {
        let $this = $(this),
            containerSelector = $this.data('pjax'),
            saveCurrentUrl = $this.data('pjax-save-url') == '',
            scrollTo = $this.data('pjax-scroll'),
            container = containerSelector
                ? $(containerSelector)
                : $this.closest('[data-pjax-container]'),
            isLink = $this[0].tagName.toUpperCase() == 'A';

        const fn = isLink
            ? 'click'
            : 'submit';

        if (!isLink) {
            $this.find('[type=submit]').prop('disabled', true);
        }

        $.pjax[fn](event, {
            push: !saveCurrentUrl,
            container: container,
            scrollTo: scrollTo,
            timeout: 3000
        });

        container.one('pjax:end', (event, options) => {
            if (options.status == 401) {
                location.href = '/';
                event.stopPropagation();
                return false;
            }

            $this.find('[type=submit]').prop('disabled', false);

            const routeName = $('#route-name').html() || 'null';
            $body.removeClass(previosRoute).addClass(routeName);
            $document.trigger(`pjax:end:${routeName}`, arguments);

            previosRoute = routeName;
        });
    }

    $document.on('click', 'a', handler);
    $document.on('submit', 'form', handler);

});
