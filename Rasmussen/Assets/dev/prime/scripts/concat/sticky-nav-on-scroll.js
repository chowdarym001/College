// Hide Header/Nav on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var siteNav = $('.global-header');
var navbarHeight = $('.global-header').outerHeight();

siteNav.addClass('global-header--down');

$(window).scroll(function (event) {
    didScroll = true;
});

setInterval(function () {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {

    var st = $(this).scrollTop();

    // Make sure they scroll more than delta
    if (Math.abs(lastScrollTop - st) <= delta)
        return;

    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight) {
        // Scroll Down
        siteNav.removeClass('global-header--down').addClass('global-header--up');
    } else {
        // Scroll Up
        if (st + $(window).height() < $(document).height()) {
            siteNav.removeClass('global-header--up').addClass('global-header--down');
        }
    }
    lastScrollTop = st;
}
