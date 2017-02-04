$(function() {
    var IMAGE_CONTAINER_SELECTOR = '.images_container';
    var container = $(IMAGE_CONTAINER_SELECTOR);
    var duration = container.get(0).dataset.duration || 5;

    var sequence = function() {

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
            item.addClass('on').animate({top: 0}, 1000);
        };

        var transition = function(current, next, callback) {
            next.addClass('on');
            current.animate({top: 1000}, 1000, function() {
                $(this).removeClass('on').css('top', '').css('background-image', '');
                callback.call();
            });
            show(next);
        };

        // transition
        if (isFirstTime) {
            prepare(nextItem);
            prepare(nextNextItem);
            show(nextItem);
        } else {
            transition(active, nextItem, function() {
                prepare(nextNextItem);
            });
        }
    };

    sequence();
    window.setInterval(sequence, duration * 1000);

});