// DOM Ready
$(function () {
    var el, newPoint, newPlace, offset, offsetMultiply;

    // Select all range inputs, watch for change
    $("input[type='range'], .form__input--range").change(function () {

            // Cache this for efficiency
            el = $(this);

            // Measure width of range input
            width = el.width();

            // Figure out placement percentage between left and right of input
            newPoint = (el.val() - el.attr("min")) / (el.attr("max") - el.attr("min"));

            // Value to get pointer to line up better
            offset = 0;
            offsetMultiply = 8.5;

            // Prevent bubble from going beyond left or right (unsupported browsers)
            if (newPoint < 0) {
                newPlace = 0;
            } else if (newPoint > 1) {
                newPlace = width;
            } else {
                newPlace = width * newPoint + offset;
                offset -= newPoint;
            }

            // Move bubble
            el.next("output").css({
                left: newPlace,
                marginLeft: offset * offsetMultiply + "%"
            }).text(el.val());
        })
        // Fake a change to position bubble at page load
        .trigger('change');
});
