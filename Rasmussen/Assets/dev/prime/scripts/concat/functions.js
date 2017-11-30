/*jslint browser: true*/
/*global $, jQuery*/

/**
 * Toolkit JavaScript
 */

(function (window, $) {
    "use strict";

    $(function () {
        var
            accordionPlusContent = $(".accordion-plus .accordion-plus__content"),
            accordionPlusPanels = $(".accordion-plus .accordion-plus__panel"),

            accordionChevronContent = $(".accordion-chevron .accordion-chevron__content"),
            accordionChevronPanels = $(".accordion-chevron .accordion-chevron__panel"),

            accordionExpander = $(".accordion-expander"),
            accordionQuadPanel = $(".accordion-quadrant"),
            accordionQuadPanelContents = $(".accordion-quadrant__content"),

            credentailOverviewHeadlineLvl2 = $(".credential-overview__headline--lvl-2"),
            credentailOverviewHeadlineLvl2Height = $(".credential-overview__headline--lvl-2").outerHeight(),
            credentialOverviewList = $(".credential-overview__list"),
            coloredClickBoxesItems = $(".colored-click-boxes__link"),

            disclaimerFullContentToggle = $(".js-disclaimer-accordion__toggle"),
            disclaimerFullContent = $(".disclaimer-accordion"),

            flipCard = $(".flip__card"),

            formLabelsInlined = $(".form-label--inlined, .form__label--inlined"),

            globalFooterMulticolumnToggle = $("#js-footer-disclaimers__toggle"),
            globalFooterMulticolumnDisclaimers = $(".footer-disclaimers"),

            globalFooterDisclosureToggle = $(".js-footer-disclosure-toggle"),
            globalFooterDisclosureContents = $(".global-footer__disclosures-content"),

            globalHeader = $(".global-header"),
            globalNav = $(".global-nav"),
            globalNavCTA = $(".global-nav__button"),
            globalNavLevel1Item = $(".global-nav__level1-item"),
            globalNavLevel1Link = $(".global-nav__level1-link"),
            globalNavLevel1NoChildrenLink = $(".global-nav__level1-item > .global-nav__level1-link"),
            globalNavLevel1WithChildrenLink = $(".global-nav__level1-item.has-children > .global-nav__level1-link"),
            globalNavSubmenu = $(".global-nav__submenu"),
            globalNavToggle = $(".js-nav-toggle"),
            globalSearchClose = $('.utility-search__close'),
            globalSearchForm = $('.utility-search'),
            globalSearchToggle = $('.js-search-toggle'),

            mainContents = $(".main-contents"),

            matchHeightMaintainScroll = $.fn.matchHeight._maintainScroll = true,
            matchHeightRecalculate = jQuery.fn.matchHeight._update(),

            megaMenuColumnAlpha = $(".mega-menu__multicolumn--alpha"),
            megaMenuColumnBeta = $(".mega-menu__multicolumn--beta"),
            megaMenuColumnBetaDefaultHeight = $(".mega-menu__multicolumn--beta").outerHeight(),
            megaMenuColumnGamma = $(".mega-menu__multicolumn--gamma"),
            megaMenuColumnDegrees = $(".mega-menu__multicolumn--degrees"),
            megaMenuColumnPrograms = $(".mega-menu__multicolumn--programs"),
            megaMenuItemActive = $("mega-menu__item--active"),
            megaMenuItemLevel1 = $(".mega-menu__item--level1"),
            megaMenuItemLevel2 = $(".mega-menu__item--level2"),
            megaMenuItemLevel3 = $(".mega-menu__item--level3"),
            megaMenuLinkActive = $("mega-menu__link--active"),
            megaMenuLinkChildless = $(".mega-menu__link--childless"),
            megaMenuLinkLevel1 = $(".mega-menu__link--level1"),
            megaMenuLinkLevel2 = $(".mega-menu__link--level2"),
            megaMenuLinkLevel3 = $(".mega-menu__link--level3"),
            megaMenuSubmenu = $(".mega-menu__submenu"),
            megaMenuSubmenuDefaultHeight = $(".mega-menu__submenu").height(),
            megaMenuToggleClose = $(".mega-menu__toggle--close"),

            pageWrapper = $(".page-wrapper"),

            smoothScroll = $('.js-smooth-scroll');

        function stickyHeader() {
            // make global header sticky
            globalHeader.addClass("global-header--sticky");
        }

        function toggleSubMenus() {
            // If global nav level 1 does not have children links
            if (!$('.global-nav__level1-item').hasClass('has-children')) {
                // upon clicking link, closes sidebar nav
                globalNavLevel1NoChildrenLink.unbind().on('click', function (e) {
                    // prevents link from going to new page
                    // 3.6.17: allow nav links w/o children to be linked
                    // e.preventDefault();

                    // close sidebar nav by removing classes
                    pageWrapper.removeClass("page-wrapper--active");
                    globalNav.removeClass("global-nav--opened");
                    globalNavToggle.removeClass("menu-burger--active");

                    // if link is anchored to in-page section, takes you to that section
                    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
                        var target = $(this.hash);
                        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                        if (target.length) {
                            $('html,body').animate({
                                scrollTop: (target.offset().top - globalHeader.outerHeight())
                            }, 1000);
                            return false;
                        }
                    }
                });
            } else {
                // Clicking nav level 1 button
                globalNavLevel1WithChildrenLink.unbind().on("click", function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    // Toggle the class active to unfocused buttons
                    $(this).toggleClass('global-nav__level1-link--current');

                    // Slide up the sub nav
                    globalNavSubmenu.slideUp("fast");

                    // remove active class from this link's siblings
                    $(this).parents(globalNavLevel1Item).find((globalNavLevel1Link).not($(this))).removeClass("global-nav__level1-link--current");

                    // slide down subnav
                    $(this).next(globalNavSubmenu).slideDown("fast");

                });
            }
        }

        function toggleGlobalNav() {
            if (($(window).width() > 960) && !($(".global-nav").hasClass("global-nav--large-screens"))) {
                // if window is bigger than 960 and global-nav does NOT have class global-nav--large-screens
                pageWrapper.removeClass("page-wrapper--active");
                globalNav.css("margin-top", "0");
                toggleSubMenus();
            } else {
                globalNavToggle.unbind().on("click", function (e) {
                    e.preventDefault();

                    // toggle sidebar nav
                    pageWrapper.toggleClass("page-wrapper--active");
                    $(this).toggleClass("menu-burger--active");
                    globalNav.toggleClass("global-nav--opened").show();
                    if (globalNav.hasClass("global-nav--opened")) {
                        globalNav.css("margin-top", globalHeader.outerHeight());
                    }
                });
                globalNavCTA.unbind().on("click", function (e) {
                    e.preventDefault();

                    // close sidebar nav by removing classes
                    pageWrapper.removeClass("page-wrapper--active");
                    globalNav.removeClass("global-nav--opened");
                    globalNavToggle.removeClass("menu-burger--active");

                    // if link is anchored to in-page section, takes you to that section
                    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
                        var target = $(this.hash);
                        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                        if (target.length) {
                            $('html,body').animate({
                                scrollTop: (target.offset().top - globalHeader.outerHeight())
                            }, 1000);
                            return false;
                        }
                    }
                });
                toggleSubMenus();
            }
        }

        function toggleGlobalSearch() {
            // Clicking on search icon in utility nav
            globalSearchToggle.unbind().on("click", function (e) {
                e.preventDefault();
                e.stopPropagation();
                // show/hide utility nav search form
                globalSearchForm.slideToggle('fast');
            });

            // clicking on x in utility search
            globalSearchClose.unbind().on("click", function (e) {
                globalSearchForm.slideUp("fast");
            });


        }

        function toggleFullWidthHeaderBranding() {
            if (($(window).width() < 1100) && $(".offcanvas-nav").length) {
                // small screens experience
                // if less than 1100bp and has offcanvas-nav, add brand-toggle-container--full, header-brand--col11
                $(".header-brand").addClass("header-brand--col11");
                $(".brand-toggle-container").addClass("brand-toggle-container--full");

            } else if (($(window).width() > 1100) || !$(".offcanvas-nav").length || $(".section-mega-menu").length) {
                // large screens experience
                // if larger than 110bp, or doesnt have offcanvas-nav, or doesnt have mega-menu, remove full width brand-toggle-container--full, header-brand--col11
                $(".header-brand").removeClass("header-brand--col11");
                $(".brand-toggle-container").removeClass("brand-toggle-container--full");
            }
        }

        function toggleMmenu() {
            if ($(window).width() < 1100) {
                // show mmenu only for small screens, up to 1100px
                var API = $("#offcanvas-nav--mmenu").mmenu({
                    extensions: [
                        "fx-panels-slide-0",
                        "fx-listitems-slide",
                        "multiline"
                    ],
                    keyboardNavigation: {
                        enable: true
                    },
                    navbar: {
                        title: ''
                    },
                    navbars: [{
                        content: '<a class="offcanvas-nav__close"><i class="fa fa-times"></i></a>',
                        position: "top"
                    }, {
                        // second navbar options
                    }],
                    offCanvas: {
                        position: "right",
                        zposition: "front"
                    },
                    setSelected: {
                        hover: true
                    }
                }).data("mmenu");
                $(".js-nav-toggle--mmenu").on("click", function (e) {
                    e.preventDefault();
                    API.open();
                });
                $(".offcanvas-nav__close").on("click", function (e) {
                    e.preventDefault();
                    API.close();
                });
            }
        }

        function expandMegaMenuSubmenu(clickedElement) {
            var megaMenuExpandingHeight = $(clickedElement).parent(megaMenuItemLevel2).find(megaMenuColumnBeta).outerHeight();
            //console.log("expandSubmenu = " + megaMenuExpandingHeight);

            var hasLooped = false;
            // run function only once
            if (!hasLooped) {
                if (megaMenuExpandingHeight > megaMenuSubmenuDefaultHeight) {
                    // if mega-menu__multicolumn--beta is taller than mega-menu__submenu default height
                    megaMenuSubmenu.outerHeight(megaMenuExpandingHeight);
                } else if (megaMenuExpandingHeight < megaMenuSubmenuDefaultHeight) {
                    // if mega-menu__multicolumn--beta is shorter than default mega-menu__submenu, make mega-menu__submenu height of mega-menu__multicolum--alpha
                    megaMenuSubmenu.css("height", "auto");
                }
                hasLooped = true;
            }
        }

        //        function expandMegaMenuSubmenuDefault(megaMenuMulticolumn) {
        //            var megaMenuExpandingHeightDefault = $(".mega-menu__item--level2 > .mega-menu__multicolumn--beta").outerHeight();
        //            console.log("expandSubmenuDefault = " + megaMenuExpandingHeightDefault);
        //
        //            //var hasLooped = false;
        //            // run function only once
        //            //if (!hasLooped) {
        //            if (megaMenuExpandingHeightDefault > megaMenuSubmenuDefaultHeight) {
        //                // if mega-menu__multicolumn--beta is taller than mega-menu__submenu default height
        //                megaMenuSubmenu.outerHeight(megaMenuExpandingHeightDefault);
        //            } else if (megaMenuExpandingHeightDefault < megaMenuSubmenuDefaultHeight) {
        //                // if mega-menu__multicolumn--beta is shorter than default mega-menu__submenu, make mega-menu__submenu height of mega-menu__multicolum--alpha
        //                megaMenuSubmenu.css("height", "auto");
        //            }
        //            //hasLooped = true;
        //            //}
        //        }

        function megaMenuShowDefaults() {
            // show mega menu default sub menus
            var megaMenuFirstItemLevel2BetaColumn = $(".mega-menu__item--level2:first-child .mega-menu__multicolumn--beta"),
                megaMenuFirstItemLevel2BetaColumnHeight = $(".mega-menu__item--level2:first-child.mega-menu__item--active .mega-menu__multicolumn--beta").outerHeight(),
                megaMenuAreasOfStudyColumnBetaHeight = 444;

            // for each mega-menu__multicolum that has descendants
            $(".mega-menu__multicolumn--alpha.mega-menu__multicolumn--descendants").each(function () {
                // add active class to first mega-menu__item in list
                $(this).find(".mega-menu__item--level2:first-child").addClass("mega-menu__item--active");

                // show menu first item's middle column
                $(this).find(megaMenuFirstItemLevel2BetaColumn).fadeIn("fast");

                // dynamically adjust height of closest mega-menu__submenu to fit mega-menu__multicolumn--beta
                //$(this).parents(".mega-menu__submenu").fadeIn("fast", "swing", expandMegaMenuSubmenuDefault(this));
                //$(this).parent(".mega-menu__item--level1.mega-menu__item--active > .mega-menu__submenu").fadeIn("fast", "swing", expandMegaMenuSubmenuDefault(this));
                //                $(this).closest(".mega-menu__submenu").css({
                //                    "background": "orange",
                //                    "border": "10px solid green"
                //                });

                $(".mega-menu__item--level1:first-child .mega-menu__submenu").css("height", megaMenuFirstItemLevel2BetaColumnHeight + "px")

                //expandMegaMenuSubmenuDefault(this);
            });
        }

        //        function hideMegaMenuSubmenuWhenHeaderHides() {
        //            // if global-header is in up position, slide up mega-menu__submenu
        //            setInterval(function () {
        //                if ($(".global-header").hasClass("global-header--up")) {
        //                    megaMenuItemLevel1.removeClass("mega-menu__item--active");
        //                    megaMenuLinkLevel1.removeClass("mega-menu__link--active");
        //                    megaMenuSubmenu.slideUp("fast");
        //                }
        //            }, 250);
        //        }

        function toggleMegaMenu() {

            megaMenuLinkLevel1.unbind().on("click", function (e) {
                e.preventDefault();
                e.stopPropagation();

                // toggle active class, toggle mega menu submenu
                $(this).toggleClass("mega-menu__link--active").parent(megaMenuItemLevel1).toggleClass("mega-menu__item--active").find(megaMenuSubmenu).slideToggle("fast").attr("aria-hidden", "false");;

                // remove active class from this element's parents' siblings
                $(this).parent(megaMenuItemLevel1).siblings().removeClass("mega-menu__item--active").find(megaMenuLinkLevel1).removeClass("mega-menu__link--active");

                // slideUp other submenus
                $(this).parent(megaMenuItemLevel1).siblings().find(megaMenuSubmenu).slideUp("fast").attr("aria-hidden", "true");
            });

            megaMenuShowDefaults();

            megaMenuLinkLevel2.unbind().on("click", function (e) {
                e.preventDefault();
                e.stopPropagation();

                // toggle active class, toggle mega menu submenu center column
                $(this).toggleClass("mega-menu__link--active").parent(megaMenuItemLevel2).toggleClass("mega-menu__item--active").find(megaMenuColumnBeta).fadeToggle("fast", "swing", expandMegaMenuSubmenu(this));


                // remove active link class from this siblings' links
                $(this).parent(megaMenuItemLevel2).find(megaMenuLinkLevel2).removeClass("mega-menu__link--active");

                // remove active class from this element's parents' siblings, fade out mega menu right column
                $(this).parent(megaMenuItemLevel2).siblings().removeClass("mega-menu__item--active").find(megaMenuColumnBeta).fadeOut("fast");
            });

            // close mega menu submenu when click X close link
            megaMenuToggleClose.unbind().on("click", function (e) {
                e.preventDefault();

                megaMenuSubmenu.slideUp("fast");
            });

            // unbind childless links from preventing default action
            megaMenuLinkChildless.unbind("click");

            //hideMegaMenuSubmenuWhenHeaderHides();
        }

        // Measures the fixed Sticky-Header, Pushes content down.
        function heroPush() {
            if ($(window).width() < 640) {
                mainContents.addClass("main-contents--pushed");
            } else {
                mainContents.removeClass().css("margin-top", globalHeader.outerHeight());
            }
        }

        function checkPageWidows() {
            /*! jquery-horunge v0.0.7 - 2015-02-27 -- https://github.com/davidpaulsson/horunge.js */
            ! function (a) {
                "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? module.exports = a(require("jquery")) : a(jQuery)
            }(function (a) {
                "use strict";
                a.fn.horunge = function (b) {
                    var c = a.extend({
                        words: 2
                    }, b);
                    return this.each(function () {
                        var b = a.trim(a(this)
                                .html())
                            .split(" ");
                        if (b.length > 2) {
                            var d = b.slice(-c.words)
                                .join("&nbsp");
                            b.splice(b.length - c.words, c.words, d), a(this)
                                .html(b.join(" "))
                        }
                    })
                }
            });
        }

        function royalSlider() {
            $(".royalSlider").royalSlider({
                arrowsNav: false,
                autoHeight: true,
                controlNavigation: 'thumbnails',
                loop: true,
                keyboardNavEnabled: true
            });

            var slider = $(".royalSlider");
            slider.prepend(slider.find(".rsNav"));
        }

        function flickityFBPosts() {
            $('.flickity-carousel.fb-post').flickity({
                // options
                cellAlign: 'left',
                cellSelector: '.flickity-carousel__cell',
                contain: true,
                pageDots: false,
                prevNextButtons: false,
                setGallerySize: true
            });
        }

        function careerPathFlickity() {
            $('.flickity-carousel.career-path__steps').flickity({
                cellAlign: 'left',
                cellSelector: '.flickity-carousel__cell',
                contain: true,
                pageDots: false,
                prevNextButtons: false,
                setGallerySize: true
            });

            $(".career-path__bar").unbind().on("click", function (e) {
                e.stopPropagation();
                e.preventDefault();
                $(this).toggleClass("career-path__bar--selected").parents(".career-path__step").find(".career-path__tooltip").slideToggle("fast");
            });

            matchHeightMaintainScroll
            setTimeout(function () {
                $(".career-path__label").matchHeight();
            }, 1);
        }

        function flickityVideoCarousel() {
            $(".flickity-carousel.video-carousel").flickity({
                // options
                //adaptiveHeight: true,
                cellAlign: 'center',
                cellSelector: '.flickity-carousel__cell',
                contain: true,
                pageDots: true,
                prevNextButtons: true,
                setGallerySize: true,
                //wrapAround: true
            })
        }

        function slickVideoCarousel() {
            $('.slick-carousel.video-carousel').slick({
                adaptiveHeight: true,
                dots: true,
                infinite: false,
                slidesToShow: 1,
                speed: 300
            });
        }

        function accordionPlus() {
            // accordions with plus/minus
            accordionPlusPanels.unbind().on("click", function (e) {
                e.preventDefault();

                var accordionPanelActive = $(this).attr("rel");
                $("#" + accordionPanelActive).slideToggle("fast");

                // allows multiple accordions to open at once; better ux for mobile
                $(this).toggleClass("accordion-plus__panel--active");

            });
        }

        function pushCredentialOverviewList() {
            if ($(window).width() >= 1300) {
                credentialOverviewList.css("padding-top", credentailOverviewHeadlineLvl2Height);
            }
        }

        function accordionChevron() {
            // accordions with chevrons
            accordionChevronPanels.unbind().on("click", function (e) {
                e.preventDefault();

                var accordionChevronActive = $(this).attr("rel");
                $("#" + accordionChevronActive).slideToggle("fast");

                // allows multiple accordions to open at once; better ux for mobile
                $(this).toggleClass("accordion-chevron__panel--active");

            });
        }

        function admissionsEDUAccortabsDefault() {
            var accorTabDefault = $(".accortabs__item[rel=admissions-audience02]"),
                accorTabContentDefault = $(".accortabs__content#admissions-audience02");

            if ($(window).width() >= 960) {
                accorTabDefault.addClass("accortabs__item--active");
                accorTabContentDefault.addClass("accortabs__content--active");
            }
        }

        //        function accordionExpander() {
        //            this = accordionExpander;
        //            if this.parents(accordionQuadPanel).hasClass('is-active') {
        //                this.text('see less');
        //            } else {
        //                this.text('see more');
        //            }
        //        }

        // Preferred Campus by State
        function showLocations() {
            var locField = $("#preferred-campus"),
                locOption = locField.children("option");
            // Hide All Image Set"s if "Find Your State" is Selected
            if (locOption.eq(0).is(":selected")) {
                $(".imageset--3").hide();
            }
            // Change Visibility Depending on Select Option Value"s
            locField.change(function () {
                $(".imageset--3").hide();
                $("#" + $(this).val()).show();
            });
        }

        function inviewSection() {
            $('.section').on('inview', function (event, isInView) {
                if (isInView) {
                    // element is now visible in the viewport
                    $(this).addClass("section--inview")
                } else {
                    // element has gone out of viewport
                    $(this).removeClass("section--inview")
                }
            });
        }

        // ALL MATCH HEIGHT FUNCTIONS BELOW
        //        function matchHeightMmenuElements() {
        //            matchHeightMaintainScroll
        //            setTimeout(function () {
        //                $(".mm-title, .mm-navbar, .mm-btn").matchHeight();
        //            }, 1);
        //
        //            // var mmNavbarHeight = $('.mm-navbar').outerHeight();
        //            // setTimeout(function() {
        //            // 	$('.offcanvas-nav .mm-listview').css('margin-top', mmNavbarHeight);
        //            // }, 1);
        //            //
        //            // mmNavbarHeight.bind("mmNavbarHeightChange", function() {
        //            // 	alert('mm-nav height has changed');
        //            // });
        //            //
        //            // $('.offcanvas-nav .mm-listview > li > a').on("click", function() {
        //            // 	mmNavbarHeight.trigger("mmNavbarHeightChange");
        //            // });
        //        }



        function matchHeightAreasOfStudy() {
            matchHeightMaintainScroll
            if ($(window).width() >= 760) {
                setTimeout(function () {
                    $(".areas-study__grid--equal .areas-study__card").matchHeight();
                }, 1);
            }
        }

        function matchHeightValueProps() {
            matchHeightMaintainScroll
            setTimeout(function () {
                $(".uvp__card").matchHeight();
                $(".uvp__header").matchHeight();
                $(".uvp__title, .uvp__headline h1").matchHeight();
                $(".uvp__text, .uvp__copy p").matchHeight();
            }, 1);
        }

        function matchHeightDuoAngledFullCards() {
            matchHeightMaintainScroll
            if ($(window).width() >= 960) {
                setTimeout(function () {
                    $(".duo-angled-full__card").matchHeight();
                    $(".angled-2panel-full__panel, .angled-2panel-full__content").matchHeight();
                }, 1);
            }

        }

        function matchHeightValueProps3ColFull() {
            matchHeightMaintainScroll
            setTimeout(function () {
                $(".uvp-3col-full__headline--lvl-3").matchHeight();
                $(".uvp-3col-full__text").matchHeight();
            }, 1);
        }

        function matchHeightCategoryCards() {
            matchHeightMaintainScroll
            setTimeout(function () {
                $(".multi-panels__card").matchHeight();
                $(".multi-panels__banner").matchHeight();
                $(".multi-panels__text").matchHeight();
            }, 1);
        }

        function matchHeightProgramCards() {
            matchHeightMaintainScroll
            setTimeout(function () {
                $(".program-card__banner, .program-card__details").matchHeight();
                if ($(window).width() >= 640) {
                    $(".program-card-basic__item").matchHeight();
                }
            }, 1);
        }

        function matchHeightGlanceColumns() {
            matchHeightMaintainScroll
            setTimeout(function () {
                $(".glance__content, .glance__stats").matchHeight();
            }, 1);
        }

        function matchHeightColumns() {
            matchHeightMaintainScroll
            setTimeout(function () {
                $(".columns .column__item").matchHeight();
                $(".columns .heading").matchHeight();
                $(".columns p").matchHeight();
                $(".columns .cta-inline").matchHeight();
            }, 1);
        }

        function matchHeightAccordionQuadPanels() {
            matchHeightMaintainScroll
            setTimeout(function () {
                accordionQuadPanel.matchHeight();
            }, 1);

            $(".accordion-quadrant .accordion-plus__panel").unbind().on("click", function (e) {
                e.preventDefault();

                var accordionPanelActive = $(this).attr("rel");
                $("#" + accordionPanelActive).slideToggle("medium");

                // allows multiple accordions to open at once; better ux for mobile
                $(this).toggleClass("accordion-plus__panel--active");

                setInterval(function () {
                    $.fn.matchHeight._update($(this).parents(".accordion-quadrant"));
                }, 75);
            });

            //accordionQuadPanelContents.addClass("blur");
        }

        function matchHeightQuadrantBoxes() {
            if ($(window).width() >= 760) {
                matchHeightMaintainScroll
                setTimeout(function () {
                    $(".quadrant-boxes__item").matchHeight();
                    $(".quadrant-boxes__headline--lvl-1").matchHeight();
                }, 1);
            }
        }

        function matchHeightBCELabels() {
            matchHeightMaintainScroll
            setTimeout(function () {
                $(".bachelor-completer-estimator .group-sliders .form__label--tooltip").matchHeight();
            }, 1);
        }

        function matchHeightImagesetItems() {
            matchHeightMaintainScroll
            setTimeout(function () {
                $(".imageset__item").matchHeight();
            }, 1);
        }

        function matchHeightTestimonial() {
            matchHeightMaintainScroll
            setTimeout(function () {
                $(".testimonial__card").matchHeight();
                $(".testimonial__banner").matchHeight();
                $(".testimonial__title").matchHeight();
                $(".testimonial__text").matchHeight();
            }, 1);
        }

        function matchHeightColoredClickBoxes() {
            matchHeightMaintainScroll
            setTimeout(function () {
                coloredClickBoxesItems.matchHeight();
            }, 1);
        }

        function inlineLabels() {
            formLabelsInlined.addClass("form-label--inlined").inFieldLabels();
        }

//        function masonryTomsTiles() {
//            $(".masonry-tiles").masonry({
//                // order cells horizontally, then vertically
//                horizontalOrder: true,
//                // named cell to use
//                itemSelector: ".masonry-tiles__cell",
//                // use percentages for responsive layouts
//                percentPosition: true
//            });
//            $('.masonry').masonry({
//                itemSelector: '.masonry-item',
//                gutter: 0,
//                horizontalOrder: true,
//                percentPosition: true
//            });
//        }



        function flipCards() {
            matchHeightMaintainScroll
            setTimeout(function () {
                $(".flip__image, .flip__copy").matchHeight();
            }, 1);
            $(".flip__card").flip({
                back: '.flip__copy',
                front: '.flip__image'
            });
        }

        function toggleDisclaimerFull() {
            disclaimerFullContentToggle.unbind().on("click", function (e) {
                e.preventDefault();
                $(this).toggleClass('disclaimer-accordion__toggle--expanded');
                if ($(this).hasClass('disclaimer-accordion__toggle--expanded')) {
                    $(this).text('Click to Collapse (-)');
                } else {
                    $(this).text('Click to Expand (+)');
                }
                disclaimerFullContent.toggleClass("disclaimer-accordion--opened");
                if (disclaimerFullContent.hasClass('disclaimer-accordion--opened')) {
                    disclaimerFullContent.slideDown("fast")
                } else {
                    disclaimerFullContent.slideUp("fast")
                }
            });
        }

        function toggleFooterDisclosures() {
            globalFooterDisclosureToggle.unbind().on("click", function (e) {
                e.preventDefault();
                globalFooterDisclosureContents.toggleClass("global-footer__disclosures-content--opened").slideToggle("fast");
            });
        }

        function toggleMulticolumnFooterDisclaimers() {
            globalFooterMulticolumnToggle.unbind().on("click", function (e) {
                e.preventDefault();
                if (globalFooterMulticolumnToggle.text() === "Disclaimers (+)") {
                    globalFooterMulticolumnToggle.text("Disclaimers (-)")
                } else if (globalFooterMulticolumnToggle.text() === "Disclaimers (-)") {
                    globalFooterMulticolumnToggle.text("Disclaimers (+)")
                }

                globalFooterMulticolumnDisclaimers.toggleClass("footer-disclaimers--opened").slideToggle("fast");
                // change footer disclaimers toggle text +/-
                //                (globalFooterMulticolumnToggle.text() === "Disclaimers (+)") ? globalFooterMulticolumnToggle.text("Disclaimers (-)"): globalFooterMulticolumnToggle.text("Disclaimers (+)");
                //                globalFooterMulticolumnDisclaimers.toggleClass("footer-disclaimers--opened").slideToggle("fast");
            });
        }

        function repositionGlobalFooterMulticolumnDisclaimers() {
            if ($(window).width() >= 760) {
                // place disclaimers after footer social icons, 960bp and larger
                globalFooterMulticolumnDisclaimers.detach().appendTo(".global-footer--multicolumn");
            } else if (($(window).width() >= 640) && ($(window).width() < 760)) {
                // place disclaimers after footer metadata, between 640bp, 960bp
                globalFooterMulticolumnDisclaimers.detach().insertAfter(".footer-column--metadata");
            } else {
                // place disclaimers after footer disclaimers toggle, smaller than 480
                globalFooterMulticolumnDisclaimers.detach().appendTo(".footer-column--metadata .list--metadata");
            }
        }

        stickyHeader();

        toggleGlobalNav();
        toggleFullWidthHeaderBranding();
        toggleMmenu();
        toggleMegaMenu();
        //matchHeightMmenuElements();
        toggleGlobalSearch();

        heroPush();

        checkPageWidows();

        royalSlider();
        careerPathFlickity();
        flickityFBPosts();
        flickityVideoCarousel();
        slickVideoCarousel();
        pushCredentialOverviewList();

        accordionPlus();
        accordionChevron();
        admissionsEDUAccortabsDefault();
        //accordionExpander();

        inviewSection();
        showLocations();

        matchHeightAreasOfStudy();
        matchHeightCategoryCards();
        matchHeightValueProps();
        matchHeightDuoAngledFullCards();
        matchHeightValueProps3ColFull();
        matchHeightProgramCards();
        matchHeightGlanceColumns();
        matchHeightColumns();
        matchHeightAccordionQuadPanels();
        matchHeightQuadrantBoxes();
        matchHeightBCELabels();
        matchHeightImagesetItems();
        matchHeightTestimonial();
        matchHeightColoredClickBoxes();

        inlineLabels();
        //masonryTomsTiles();
        flipCards();

        toggleDisclaimerFull();
        toggleFooterDisclosures();
        toggleMulticolumnFooterDisclaimers();
        repositionGlobalFooterMulticolumnDisclaimers();

        // on window resize, do these
        $(window).on("resize", function () {
            toggleGlobalNav();
            toggleFullWidthHeaderBranding();
            toggleMmenu();
            toggleMegaMenu();
            //matchHeightMmenuElements();

            toggleGlobalSearch();

            checkPageWidows();

            royalSlider();
            careerPathFlickity();
            flickityFBPosts();
            flickityVideoCarousel();
            slickVideoCarousel();
            pushCredentialOverviewList();

            accordionPlus();
            accordionChevron();
            admissionsEDUAccortabsDefault();
            //accordionExpander();

            inviewSection();
            showLocations();

            matchHeightAreasOfStudy();
            matchHeightCategoryCards();
            matchHeightValueProps();
            matchHeightDuoAngledFullCards();
            matchHeightValueProps3ColFull();
            matchHeightProgramCards();
            matchHeightGlanceColumns();
            matchHeightColumns();
            matchHeightAccordionQuadPanels();
            matchHeightQuadrantBoxes();
            matchHeightColoredClickBoxes();
            matchHeightBCELabels();
            matchHeightImagesetItems();
            matchHeightTestimonial();

            inlineLabels();
            //masonryTomsTiles();
            flipCards();

            toggleDisclaimerFull();
            toggleFooterDisclosures();
            toggleMulticolumnFooterDisclaimers();
            repositionGlobalFooterMulticolumnDisclaimers();
        });

        // on window scroll, do these
        $(window).scroll(function (e) {

        });
        // on window load, do these
        $(window).load(function (e) {

        });
    });
})(window, jQuery);

// Clicking anywhere outside of global nav closes submenu
$(document).click(function () {
    function clickOutsideDesktopMenu() {
        if ($(window).width() > 960) {
            if ($(".global-nav__submenu").is(":visible")) {
                $(".global-nav__submenu").slideUp("fast");
            }
        }
        //        if ($(window).width() >= 1100) {
        //            if ($(".mega-menu__submenu").is(":visible")) {
        //                $(".mega-menu__submenu").slideUp("fast");
        //                $(".mega-menu__link--level1").removeClass("mega-menu__link--active")
        //            }
        //        }
    }

    clickOutsideDesktopMenu();
});

// These two functions smoothScrollingWithOffset, expandAccorTabAndSetToTopOfScreen
// must stay outside of the self-invoking jquery code to work.
// Used for EDU in-nav page links "Take me to"
function smoothScrollingWithOffset(smoothScrollLink, offset) {
    //var globalHeader = $('.global-header');
    if (smoothScrollLink.length) {
        $('html,body').animate({
            //scrollTop: (smoothScrollLink.offset().top - globalHeader.outerHeight() - offset)
            scrollTop: (smoothScrollLink.offset().top - offset)
        }, 1000);
        return false;
    }
}

function expandAccorTabAndSetToTopOfScreen(accorTabToExpandId) {
    var accorTabToExpand = $("#" + accorTabToExpandId);

    if ($(window).width() >= 960) {

        // add active class to corresponding tab; remove active class from siblings
        $(".accortabs__item[rel^='" + accorTabToExpandId + "']").addClass("accortabs__item--active").siblings().removeClass("accortabs__item--active");

        // remove active class from current tab's content siblings, fade out
        accorTabToExpand.siblings().fadeOut("fast").removeClass("accortabs__content--active");

        // fade in, scroll to and add active class to clicked tab's content
        accorTabToExpand.fadeIn("fast", function () {

            // if accortabs is in horizontal mode
            if ($('.accortabs').hasClass('accortabs--horizontal')) {
                // 45 is offset value
                smoothScrollingWithOffset(accorTabToExpand, 45);
            } else {
                //if accortabs is in vertical mode
                // no offset value
                smoothScrollingWithOffset(accorTabToExpand, 0);
            }

        }).addClass("accortabs__content--active");

    } else {
        // add active class to corresponding accordion; remove active class from siblings
        $(".accortabs__expander[rel^='" + accorTabToExpandId + "']").toggleClass("accortabs__expander--active");

        if (accorTabToExpand.hasClass("accortabs__content--active")) {

            //going to remove the active class, so do not scroll
            accorTabToExpand.slideToggle("fast").removeClass("accortabs__content--active");
        } else {

            //going to add the active class, so scroll to the newly opened tab
            accorTabToExpand.slideToggle("fast", function () {
                // 45 is offset value
                smoothScrollingWithOffset(accorTabToExpand, 45);
            }).addClass("accortabs__content--active");
        }
    }
}

//smoothScrollingWithOffset();
expandAccorTabAndSetToTopOfScreen();