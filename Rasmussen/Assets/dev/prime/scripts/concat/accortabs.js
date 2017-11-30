/*jslint browser: true*/
/*global $, jQuery*/

(function (window, $) {
    "use strict";

    function accorTabsLargeScreenBehavior() {
        /* if in tab mode */
        $(".accortabs .accortabs__item").unbind().click(function (e) {
            e.preventDefault();

            $(".accortabs__content").hide();
            var accortabsActiveTab = $(this).attr("rel");
            $("#" + accortabsActiveTab).fadeIn();

            $(".accortabs .accortabs__item").not(this).removeClass("accortabs__item--active");
            $(this).addClass("accortabs__item--active");

            $(".accortabs__title").removeClass("accortabs__title--active");
            $(".accortabs__title[rel^='" + accortabsActiveTab + "']").addClass("accortabs__title--active");
        });
    }

    function accorTabsSmallScreenBehavior() {
        /* if in accordion mode */
        $(".accortabs__title").unbind().on("click", function (e) {
            e.preventDefault();
            /*
            // allows only one accordion to open at any time
            $(".accortabs__content").slideUp("fast");
            var accortabsActiveAccordion = $(this).attr("rel");
            $("#" + accortabsActiveAccordion).slideDown("fast");

            $(".accortabs__title").removeClass("accortabs__title--active");
            $(this).addClass("accortabs__title--active");

            $(".accortabs .accortabs__item").removeClass("accortabs__item--active");
            $(".accortabs .accortabs__item[rel^='" + accortabsActiveAccordion + "']").toggleClass("accortabs__item--active");
            */

            // allows multiple accordions to open at once; better ux for mobile
            var accortabsActiveAccordion = $(this).attr("rel");
            $("#" + accortabsActiveAccordion).slideToggle("fast");

            $(this).toggleClass("accortabs__title--active");

            $(".accortabs .accortabs__item[rel^='" + accortabsActiveAccordion + "']").toggleClass("accortabs__item--active");
        });
    }

    function accorTabs() {
        // http://www.entheosweb.com/tutorials/css/tabs.asp
        // http://codepen.io/kazmeyer/pen/lzqhf    
        $(".accortabs__content").hide();
        $(".accortabs__content--default").show();

        if ($(window).width() >= 960) {
            accorTabsLargeScreenBehavior();
        } else {
            accorTabsSmallScreenBehavior();
        }
    }

    function admissionsEDUSidebarNavLinkTriggerAccortabs() {
        $(".sidebar-nav--admissions .sidebar-nav__item:nth-child(1) .sidebar-nav__link").unbind().on("click", function () {
            if ($(window).width() >= 960) {
                $(".accortabs__item:nth-of-type(1)").toggleClass("accortabs__item--active").siblings().removeClass("accortabs__item--active");
                $(".accortabs__content:nth-of-type(1)").fadeIn("fast").toggleClass("accortabs__content--active").siblings().fadeOut("fast").removeClass("accortabs__content--active");
            } else {
                $(".accortabs__title:nth-of-type(1)").toggleClass("accortabs__title--active");
                $(".accortabs__content:nth-of-type(1)").slideToggle("fast").toggleClass("accortabs__content--active");
            }
        });

        $(".sidebar-nav--admissions .sidebar-nav__item:nth-child(2) .sidebar-nav__link").unbind().on("click", function () {
            if ($(window).width() >= 960) {
                $(".accortabs__item:nth-of-type(2)").toggleClass("accortabs__item--active").siblings().removeClass("accortabs__item--active");
                $(".accortabs__content:nth-of-type(2)").fadeIn("fast").toggleClass("accortabs__content--active").siblings().fadeOut("fast").removeClass("accortabs__content--active");
            } else {
                $(".accortabs__title:nth-of-type(2)").toggleClass("accortabs__title--active");
                $(".accortabs__content:nth-of-type(2)").slideToggle("fast").toggleClass("accortabs__content--active");
            }
        });

        $(".sidebar-nav--admissions .sidebar-nav__item:nth-child(3) .sidebar-nav__link").unbind().on("click", function () {
            if ($(window).width() >= 960) {
                $(".accortabs__item:nth-of-type(3)").toggleClass("accortabs__item--active").siblings().removeClass("accortabs__item--active");
                $(".accortabs__content:nth-of-type(3)").fadeIn("fast").toggleClass("accortabs__content--active").siblings().fadeOut("fast").removeClass("accortabs__content--active");
            } else {
                $(".accortabs__title:nth-of-type(3)").toggleClass("accortabs__title--active");
                $(".accortabs__content:nth-of-type(3)").slideToggle("fast").toggleClass("accortabs__content--active");
            }
        });

        $(".sidebar-nav--admissions .sidebar-nav__item:nth-child(4) .sidebar-nav__link").unbind().on("click", function () {
            if ($(window).width() >= 960) {
                $(".accortabs__item:nth-of-type(4)").toggleClass("accortabs__item--active").siblings().removeClass("accortabs__item--active");
                $(".accortabs__content:nth-of-type(4)").fadeIn("fast").toggleClass("accortabs__content--active").siblings().fadeOut("fast").removeClass("accortabs__content--active");
            } else {
                $(".accortabs__title:nth-of-type(4)").toggleClass("accortabs__title--active");
                $(".accortabs__content:nth-of-type(4)").slideToggle("fast").toggleClass("accortabs__content--active");
            }
        });
    }

    accorTabs();
    admissionsEDUSidebarNavLinkTriggerAccortabs();
    // on window resize, do these
    $(window).on("resize", function () {
        accorTabs();
        admissionsEDUSidebarNavLinkTriggerAccortabs();
    });
})(window, jQuery);
