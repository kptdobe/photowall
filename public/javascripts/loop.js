$(function() {
    var IMAGE_CONTAINER_SELECTOR = '.images_container';

    var sequence = function() {
        var container = $(IMAGE_CONTAINER_SELECTOR);
        var images = container.children();
        var active = container.children(':visible');
        var isFirstTime = active.length === 0;
        var nextItem;
        if (isFirstTime) {
            // init
            nextItem = images.first();
        } else {
            nextItem = active.next();
            if ( nextItem.length === 0) {
                // last
                nextItem = images.first();
            }
        }

        var nextNextItem = nextItem.next();
        if ( nextNextItem.length === 0) {
            // first
            nextNextItem = images.first();
        }

        var prepare = function(item) {
            var url = item[0].dataset.path;
            item.css('background-image', 'url("' + url + '")');
        };

        var show = function(item) {
            item.slideDown(500);
        };

        var hide = function(item, callback) {
            item.fadeOut(500, function() {
                callback.call();
                item.css('background-image', 'url("")');
            });
        };

        // transition
        if (isFirstTime) {
            prepare(nextItem);
            prepare(nextNextItem);
            show(nextItem);
            delete container;
            delete images;
            delete active;
            delete nextItem;
        } else {
            hide(active, function() {
                show(nextItem);
                prepare(nextNextItem);
                delete container;
                delete images;
                delete active;
                delete nextItem;
            });
        }
    };

    sequence();
    window.setInterval(sequence, 5000);

});