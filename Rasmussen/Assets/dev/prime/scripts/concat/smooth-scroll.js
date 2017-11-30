/*jslint browser: true*/
/*global $, jQuery*/

(function (window, $) {
    "use strict";

    $(function () {
        var smoothScroll = $('.js-smooth-scroll'),
            smoothScrollSidebar = $('.js-smooth-scroll-sidebar'),
            globalHeader = $('.global-header');

        function smoothScrolling() {
            smoothScroll.click(function (e) {
                e.preventDefault();
                if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    if (target.length) {
                        $('html,body').animate({
                            //scrollTop: (target.offset().top - globalHeader.outerHeight())
                            scrollTop: target.offset().top
                        }, 1000);
                        return false;
                    }
                }
            });
        }
        
        function smoothScrollingSidebar() {
            smoothScrollSidebar.click(function (e) {
                e.preventDefault();
                if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    if (target.length) {
                        $('html,body').animate({
                            scrollTop: (target.offset().top - globalHeader.outerHeight() - 45)
                        }, 1000);
                        return false;
                    }
                }
            });
        }
        
        smoothScrolling();
        smoothScrollingSidebar();
    });

})(window, jQuery);
