/* Src: https://github.com/tonipinel/object-fit-polyfill */
/* Use: <img src="image.jpg" data-object-fit="cover"> */
/*! object-fit-polyfill - 2015-11-04 */
! function(window, document) { "use strict";
    var supports = function() {
            var div = document.createElement("div"),
                vendors = "Khtml Ms O Moz Webkit".split(" "),
                len = vendors.length;
            return function(prop) {
                if (prop in div.style) return !0;
                for (prop = prop.replace(/^[a-z]/, function(val) {
                        return val.toUpperCase() }); len--;)
                    if (vendors[len] + prop in div.style) return !0;
                return !1 } }(),
        copyComputedStyle = function(from, to) {
            var computed_style_object = !1;
            if (computed_style_object = from.currentStyle || document.defaultView.getComputedStyle(from, null), !computed_style_object) return null;
            var stylePropertyValid = function(name, value) {
                return "undefined" != typeof value && "object" != typeof value && "function" != typeof value && value.length > 0 && value != parseInt(value) };
            for (var property in computed_style_object) stylePropertyValid(property, computed_style_object[property]) && (to.style[property] = computed_style_object[property]) };
    if (supports("object-fit") === !1)
        for (var oDiv, sSource, oImages = document.querySelectorAll("[data-object-fit]"), nKey = 0; nKey < oImages.length; nKey++) {
            switch (oDiv = document.createElement("div"), sSource = oImages[nKey].getAttribute("data-src-retina") ? oImages[nKey].getAttribute("data-src-retina") : oImages[nKey].getAttribute("data-src") ? oImages[nKey].getAttribute("data-src") : oImages[nKey].src, copyComputedStyle(oImages[nKey], oDiv), oDiv.style.display = "block", oDiv.style.backgroundImage = "url(" + sSource + ")", oDiv.style.backgroundPosition = "center center", oDiv.style.className = oImages[nKey].className, oDiv.style.backgroundRepeat = "no-repeat", oImages[nKey].getAttribute("data-object-fit")) {
                case "cover":
                    oDiv.style.backgroundSize = "cover";
                    break;
                case "contain":
                    oDiv.style.backgroundSize = "contain";
                    break;
                case "fill":
                    oDiv.style.backgroundSize = "100% 100%";
                    break;
                case "none":
                    oDiv.style.backgroundSize = "auto" }
            oImages[nKey].parentNode.replaceChild(oDiv, oImages[nKey]) } }(window, document);
