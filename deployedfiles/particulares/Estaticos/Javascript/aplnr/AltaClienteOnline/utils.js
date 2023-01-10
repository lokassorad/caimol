
var utils = {}

/**
 * Polyfills
 */

utils.closestPolyfill = function(){
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector ||
            Element.prototype.webkitMatchesSelector;
    }

    if (!Element.prototype.closest) {
        Element.prototype.closest = function(s) {
            var el = this;

            do {
                if (el.matches(s)) return el;
                el = el.parentElement || el.parentNode;
            } while (el !== null && el.nodeType === 1);
            return null;
        };
    }
}
utils.matchMediaPolyfill = function () {
    /*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. MIT license */

    window.matchMedia || (window.matchMedia = function() {
        "use strict";

        // For browsers that support matchMedium api such as IE 9 and webkit
        var styleMedia = (window.styleMedia || window.media);

        // For those that don't support matchMedium
        if (!styleMedia) {
            var style       = document.createElement('style'),
                script      = document.getElementsByTagName('script')[0],
                info        = null;

            style.type  = 'text/css';
            style.id    = 'matchmediajs-test';

            if (!script) {
                document.head.appendChild(style);
            } else {
                script.parentNode.insertBefore(style, script);
            }

            // 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
            info = ('getComputedStyle' in window) && window.getComputedStyle(style, null) || style.currentStyle;

            styleMedia = {
                matchMedium: function(media) {
                    var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';

                    // 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
                    if (style.styleSheet) {
                        style.styleSheet.cssText = text;
                    } else {
                        style.textContent = text;
                    }

                    // Test if media query is true or false
                    return info.width === '1px';
                }
            };
        }

        return function(media) {
            return {
                matches: styleMedia.matchMedium(media || 'all'),
                media: media || 'all'
            };
        };
    }());
}
utils.toggleAttributePolyfill =function () {

    if (!Element.prototype.toggleAttribute) {
        Element.prototype.toggleAttribute = function (name, force) {
            if (force !== void 0) force = !!force

            if (this.hasAttribute(name)) {
                if (force) return true;

                this.removeAttribute(name);
                return false;
            }
            if (force === false) return false;

            this.setAttribute(name, "");
            return true;
        };
    }

    console.log(Element.prototype.toggleAttribute)
}
utils.classListPolyfill = function () {

    /*
    * classList.js: Cross-browser full element.classList implementation.
    * 1.1.20170427
    *
    * By Eli Grey, http://eligrey.com
    * License: Dedicated to the public domain.
    *   See https://github.com/eligrey/classList.js/blob/master/LICENSE.md
    */

    /*global self, document, DOMException */

    /*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */

    if ("document" in self) {

        // Full polyfill for browsers with no classList support
        // Including IE < Edge missing SVGElement.classList
        if (!("classList" in document.createElement("_"))
            || document.createElementNS && !("classList" in document.createElementNS("http://www.w3.org/2000/svg", "g"))) {

            (function (view) {

                "use strict";

                if (!('Element' in view)) return;

                var
                    classListProp = "classList"
                    , protoProp = "prototype"
                    , elemCtrProto = view.Element[protoProp]
                    , objCtr = Object
                    , strTrim = String[protoProp].trim || function () {
                        return this.replace(/^\s+|\s+$/g, "");
                    }
                    , arrIndexOf = Array[protoProp].indexOf || function (item) {
                        var
                            i = 0
                            , len = this.length
                        ;
                        for (; i < len; i++) {
                            if (i in this && this[i] === item) {
                                return i;
                            }
                        }
                        return -1;
                    }
                    // Vendors: please allow content code to instantiate DOMExceptions
                    , DOMEx = function (type, message) {
                        this.name = type;
                        this.code = DOMException[type];
                        this.message = message;
                    }
                    , checkTokenAndGetIndex = function (classList, token) {
                        if (token === "") {
                            throw new DOMEx(
                                "SYNTAX_ERR"
                                , "An invalid or illegal string was specified"
                            );
                        }
                        if (/\s/.test(token)) {
                            throw new DOMEx(
                                "INVALID_CHARACTER_ERR"
                                , "String contains an invalid character"
                            );
                        }
                        return arrIndexOf.call(classList, token);
                    }
                    , ClassList = function (elem) {
                        var
                            trimmedClasses = strTrim.call(elem.getAttribute("class") || "")
                            , classes = trimmedClasses ? trimmedClasses.split(/\s+/) : []
                            , i = 0
                            , len = classes.length
                        ;
                        for (; i < len; i++) {
                            this.push(classes[i]);
                        }
                        this._updateClassName = function () {
                            elem.setAttribute("class", this.toString());
                        };
                    }
                    , classListProto = ClassList[protoProp] = []
                    , classListGetter = function () {
                        return new ClassList(this);
                    }
                ;
                // Most DOMException implementations don't allow calling DOMException's toString()
                // on non-DOMExceptions. Error's toString() is sufficient here.
                DOMEx[protoProp] = Error[protoProp];
                classListProto.item = function (i) {
                    return this[i] || null;
                };
                classListProto.contains = function (token) {
                    token += "";
                    return checkTokenAndGetIndex(this, token) !== -1;
                };
                classListProto.add = function () {
                    var
                        tokens = arguments
                        , i = 0
                        , l = tokens.length
                        , token
                        , updated = false
                    ;
                    do {
                        token = tokens[i] + "";
                        if (checkTokenAndGetIndex(this, token) === -1) {
                            this.push(token);
                            updated = true;
                        }
                    }
                    while (++i < l);

                    if (updated) {
                        this._updateClassName();
                    }
                };
                classListProto.remove = function () {
                    var
                        tokens = arguments
                        , i = 0
                        , l = tokens.length
                        , token
                        , updated = false
                        , index
                    ;
                    do {
                        token = tokens[i] + "";
                        index = checkTokenAndGetIndex(this, token);
                        while (index !== -1) {
                            this.splice(index, 1);
                            updated = true;
                            index = checkTokenAndGetIndex(this, token);
                        }
                    }
                    while (++i < l);

                    if (updated) {
                        this._updateClassName();
                    }
                };
                classListProto.toggle = function (token, force) {
                    token += "";

                    var
                        result = this.contains(token)
                        , method = result ?
                        force !== true && "remove"
                        :
                        force !== false && "add"
                    ;

                    if (method) {
                        this[method](token);
                    }

                    if (force === true || force === false) {
                        return force;
                    } else {
                        return !result;
                    }
                };
                classListProto.toString = function () {
                    return this.join(" ");
                };

                if (objCtr.defineProperty) {
                    var classListPropDesc = {
                        get: classListGetter
                        , enumerable: true
                        , configurable: true
                    };
                    try {
                        objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
                    } catch (ex) { // IE 8 doesn't support enumerable:true
                        // adding undefined to fight this issue https://github.com/eligrey/classList.js/issues/36
                        // modernie IE8-MSW7 machine has IE8 8.0.6001.18702 and is affected
                        if (ex.number === undefined || ex.number === -0x7FF5EC54) {
                            classListPropDesc.enumerable = false;
                            objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
                        }
                    }
                } else if (objCtr[protoProp].__defineGetter__) {
                    elemCtrProto.__defineGetter__(classListProp, classListGetter);
                }

            }(self));

        }

        // There is full or partial native classList support, so just check if we need
        // to normalize the add/remove and toggle APIs.

        (function () {
            "use strict";

            var testElement = document.createElement("_");

            testElement.classList.add("c1", "c2");

            // Polyfill for IE 10/11 and Firefox <26, where classList.add and
            // classList.remove exist but support only one argument at a time.
            if (!testElement.classList.contains("c2")) {
                var createMethod = function (method) {
                    var original = DOMTokenList.prototype[method];

                    DOMTokenList.prototype[method] = function (token) {
                        var i, len = arguments.length;

                        for (i = 0; i < len; i++) {
                            token = arguments[i];
                            original.call(this, token);
                        }
                    };
                };
                createMethod('add');
                createMethod('remove');
            }

            testElement.classList.toggle("c3", false);

            // Polyfill for IE 10 and Firefox <24, where classList.toggle does not
            // support the second argument.
            if (testElement.classList.contains("c3")) {
                var _toggle = DOMTokenList.prototype.toggle;

                DOMTokenList.prototype.toggle = function (token, force) {
                    if (1 in arguments && !this.contains(token) === !force) {
                        return force;
                    } else {
                        return _toggle.call(this, token);
                    }
                };

            }

            testElement = null;
        }());

    }
}
utils.closestPolyfill = function () {
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector ||
            Element.prototype.webkitMatchesSelector;
    }

    if (!Element.prototype.closest) {
        Element.prototype.closest = function (s) {
            var el = this;

            do {
                if (el.matches(s)) return el;
                el = el.parentElement || el.parentNode;
            } while (el !== null && el.nodeType === 1);
            return null;
        };
    }
}
utils.customEventPolyfill = function (){
    /**
     * CustomEvent() polyfill
     * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
     */
    (function () {

        if (typeof window.CustomEvent === "function") return false;

        function CustomEvent(event, params) {
            params = params || { bubbles: false, cancelable: false, detail: undefined };
            var evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt;
        }

        CustomEvent.prototype = window.Event.prototype;

        window.CustomEvent = CustomEvent;
    })();
}

/**
 * Events
 */

utils.waitForFinalEvent = (function () {
    var timers = {};
    return function (callback, ms, uniqueId) {
        if (!uniqueId) {
            uniqueId = "resizeTimer";
        }
        if (timers[uniqueId]) {
            clearTimeout(timers[uniqueId]);
        }
        timers[uniqueId] = setTimeout(callback, ms);
    };
})();

/**
 * {callbackfuntion} [callBackFunctionOnResizing]
 * {time} [200]
 * {id} [resize]
 */

// @Example
// window.addEventListener('resize', function(){
//     utils.waitForFinalEvent(function(){

//         callBackFunctionOnResizing();

//     }, 200, 'resize');
// });

/**
 * Helpers
 */

utils.setAttributes = function(el, attrs) {
    for(var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
},
utils.getElementIndexInArr = function(obj, start, arr) {
    for (var i = (start || 0), j = arr.length; i < j; i++) {
        if (arr[i] === obj) { return i; }
    }
    return -1;
};

