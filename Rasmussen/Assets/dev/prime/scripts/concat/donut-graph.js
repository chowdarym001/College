$(function () {

    // Developed by IceMaD, marcduboc.fr, https://github.com/MarcDuboc/qtpie

    // Thanks to Anders Grimsrud for the base : http://codepen.io/agrimsrud/pen/EmCoa
    // Borrowed from: https://codepen.io/IceMaD/pen/iKGEq

    donutGraph = {

        init: function (options) {

            var defaultOptions = {
                id: '.graph-donut.is-clickable.with-legend',
                defaultMsg: '',
                radius: 70,
                list: true,
                hover: true
            }
            options = $.extend({}, defaultOptions, options);

            // Draw paths
            base = 0;
            $paths = $(options.id).find('path');
            $paths.each(function (index, el) {
                deg = 3.61 * $(this).attr('data-pie');
                // 3.61 instead of 3.6 to fix little svg render bug
                donutGraph.draw({
                    slice: $(this),
                    degree: deg,
                    base: base
                });
                base += parseInt(deg);
            });

            // Inside
            $(options.id).find('circle').attr('r', options.radius);
            $(options.id).find('div').append('<div class="graph-donut__label">' + options.defaultMsg + '</div>').find('circle').css('fill', $('body').css('background-color'));

            // Hover events
            if (options.hover) {
                $paths.hover(function (event) {
                    $current = $(this);
                    $inside = $current.parent().parent().find('.graph-donut__label')

                    $inside.stop().fadeOut(200, function () {
                        $inside
                            .css('color', $current.css('fill'))
                            .html($current.attr('data-desc'))
                            .fadeIn(200);
                    });
                }, function () {
                    $current = $(this);
                    $inside = $current.parent().parent().find('.graph-donut__label')

                    $inside.stop().fadeOut(200, function () {
                        $inside
                            .removeAttr('style')
                            .html(options.defaultMsg)
                            .fadeIn(200);
                    });
                    $(this)
                });
            };

            // List generation (bootstrap style)
            if (options.list) {
                var list = '';
                $paths.each(function (index, el) {
                    list += '<li><span class="graph-legend__dot" style="background-color:' + $(this).css('fill') + ';"></span><span class="graph-legend__label">' + $(this).attr('data-desc') + '</span></li>';
                });
                $(options.id).append('<div class="graph-legend"><h4 class="graph-legend__title">Graph Legend</h4><ul class="graph-legend__list">' + list + '</ul></div>');
            };

            // Display at the dn
            $(options.id).show();
        },

        draw: function (options) {

            var defaultOptions = {
                slice: null,
                degree: 0,
                base: 0
            };
            options = $.extend({}, defaultOptions, options);

            var rayon = (options.degree * Math.PI / 180),
                x = Math.sin(rayon) * 100,
                y = Math.cos(rayon) * -100,
                mid = (options.degree > 180) ? 1 : 0,
                anim = 'M 0 0 v -100 A 100 100 1 ' + mid + ' 1 ' + x + ' ' + y + ' z';
            options.slice.attr('d', anim).attr('transform', 'translate(100, 100) rotate(' + base + ')');
        }
    }
    donutGraph.init({
        id: '.graph-donut.is-clickable.with-legend',
        defaultMsg: '',
        radius: 70,
        list: true,
        hover: true
    });
    donutGraph.init({
        id: '.graph-donut.is-clickable.no-legend',
        defaultMsg: '',
        radius: 70,
        list: false,
        hover: true
    });
    donutGraph.init({
        id: '.graph-donut.is-unclickable.no-legend',
        defaultMsg: '',
        radius: 70,
        list: false,
        hover: false
    });
    donutGraph.init({
        id: '.graph-donut.is-unclickable.with-legend',
        defaultMsg: '',
        radius: 70,
        list: true,
        hover: false
    });
});
