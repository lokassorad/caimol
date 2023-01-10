// @Common

var common = {
    cachedScript: function( url, options ) { // https://api.jquery.com/jquery.getscript/

        // Allow user to set any option except for dataType, cache, and url
        options = $.extend( options || {}, {
            dataType: "script",
            cache: true,
            url: url
        });

        // Use $.ajax() since it is more flexible than $.getScript
        // Return the jqXHR object so we can chain callbacks
        return $.ajax( options );
    },
    timer: null,
    delay: function( handler, delay ) {
        function handlerProxy() {
            return ( typeof handler === "string" ? instance[ handler ] : handler )
                .apply( instance, arguments );
        }
        var instance = this;
        return setTimeout( handlerProxy, delay || 0 );
    },
}

// @Core

//

// @Layout

var fixedNavigatonBehaviour = function () {

    var html = $('html'), nav = $('.l-navtop');

    if(!nav.length > 0) return;

    var navTop = nav.offset().top;

    function stickyNavigation() {

        if (window.scrollY >= navTop) {
            // nav offsetHeight = height of nav
            //html.css('padding-top', nav.outerHeight() );
            html.addClass('fixed-nav');
        } else {
            //html.css('padding-top', 0 );
            html.removeClass('fixed-nav');
        }
    }

    $(window).on('scroll', stickyNavigation);
}

var defaultLayoutBehaviour = function(){

    // Global
    var l_mainObject = $('.l-main'), l_footerObject = $('.l-footer'),
        l_mainContentObject = $('.l-main-content'), l_mainNavtObject = $('.l-main-nav'),
        viewportHeight, viewportWidth, is_mobile , is_desktop;


    // Methods
    var mobileBehaviour = function(){
        if( !$('html').hasClass('is_mobile -portrait') ) $('html').addClass('is_mobile -portrait');
        l_mainContentObject.css('min-height',  viewportHeight - l_mainNavtObject.outerHeight() );
    }
    var mobileLandscapeBehaviour = function(){
        if( !$('html').hasClass('is_mobile -portrait') ) $('html').addClass('is_mobile -landscape');
        resetBehaviour();
    }
    var desktopBehaviour = function(){
        if( !$('html').hasClass('is_desktop') ) $('html').addClass('is_desktop');
        l_mainObject.css('min-height',  viewportHeight - l_footerObject.outerHeight());
    }
    var resetBehaviour = function(){
        $('html').removeClass('is_mobile -portrait -landscape is_desktop');
        l_mainContentObject.removeAttr('style');
        l_mainObject.removeAttr('style');
    }
    var init = function() {

        // Reset
        resetBehaviour();

        // Detect media
        viewportHeight = window.innerHeight, viewportWidth = window.innerWidth,
        is_mobile = ( viewportWidth < 640 ) , is_desktop = ( viewportWidth > 640 ) && ( viewportHeight >= 480 ) ;

        if( is_mobile ) {

            if( window.scrollY > 0 ) return; // Fixed height on scroll (avoid flexbox space-between increase height when navtop is fixed)
            mobileBehaviour();
        } else if ( is_desktop ) {
            desktopBehaviour();
        } else {

            // Mobile Landscape
            if( window.scrollY > 0 ) return; // Fixed height on scroll (avoid flexbox space-between increase height when navtop is fixed)
            mobileLandscapeBehaviour();
        }
    }

    // Starter
    init();

    // Window Events
    var resizeTimer;
    $(window).on('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {

            // Run code here, resizing has "stopped"
            init();
            //console.log('resize stopped')

        }, 250);
    });
    var scrollTimer;
    $(window).on('scroll', function () {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(function() {

            if( window.scrollY > 0 ) return; // Fixed height on scroll (avoid flexbox space-between increase height when navtop is fixed)

            if( $('.l-less-content').length > 0 ) return;
            init();
            //console.log(window.scrollY, 'scroll stopped');

        }, 250);
    });

}

// @Objects

// @Components

var navbarStepComponent = function() {

    var hook = $('.navbar-step'), item = '.navbar-item', empty = 0, navbar = {};

    if (!hook.length > 0) return;

    navbar.init = function (){
        var navItems = hook.find(item)
        navItems.each(function () {
            empty += $(this).find('button, p, h1').length
        });
        if( !empty > 0 ) $('.l-navtop').addClass('-empty')
    }

    navbar.init();
}

var stepProgressLineComponent = function () {

    var stepProgress = {};

    var keyClassName = '.progress-steps',
        progressBar = document.querySelectorAll( keyClassName ),
        progressBarArr = Array.prototype.slice.call(progressBar),
        current, prevSibling, fill,
        screenReaders = {
            'es': {
                'past': 'Completado: ',
                'current': 'Actual: '
            },
            'ca': {
                'past': 'Completat: ',
                'current': 'Actual: '
            },
            'en': {
                'past': 'Completed: ',
                'current': 'Current: '
            }
        };

    stepProgress.onLoad = function () {

        if( !progressBar.length > 0 ) return;

        progressBarArr.forEach(function (element) {
            stepProgress.setDOMElements(element);
        });
    },
        stepProgress.setDOMElements = function (e) {

            current = e.querySelector('.-current');
            if( current !== null ) {

                // Pasos completados
                prevSibling = current.previousElementSibling;
                while( prevSibling !== null ){
                    prevSibling.className += ' -past';
                    stepProgress.setAccesibilityLabels(prevSibling);
                    prevSibling = prevSibling.previousElementSibling;
                }

                if( current.nextElementSibling ) { // No es el ultimo elemento
                    stepProgress.setAccesibilityLabels(current);
                    fill = document.createElement('span');
                    fill.className = '-fill';
                    current.appendChild(fill);
                    stepProgress.showProgress();
                } else { stepProgress.setAccesibilityLabels(current); }
            }
        },
        stepProgress.setAccesibilityLabels = function (e) {

            if( e !== null && e !== undefined ) { // Elemento existe en el DOM (Fallback para comprobar que 'pasos completados existen en el DOM ).

                var language = document.querySelector('html').getAttribute('lang'), classes, text;

                classes = e.className, text = classes.substring(classes.indexOf(" -") + 2, classes.length ) ;

                var label = document.createElement('span');
                label.className = 'visuallyhidden';
                label.innerText = screenReaders[language][text];

                e.insertBefore(label, e.firstElementChild);
            }
        },
        stepProgress.showProgress = function () {
            var elem = current.querySelector('.-fill');
            var percent = parseFloat( current.getAttribute('data-progress') ) ;
            var ancho = parseFloat( current.offsetWidth - 12 );
            var max = Math.ceil( ancho * (percent / 100) );
            var width = 1;
            var id = setInterval(frame, 10);

            elem.style.maxWidth = max + 'px';
            function frame() {
                if ( width >= percent ) {
                    clearInterval(id);
                } else {
                    width++;
                    elem.style.width = width + '%';
                }
            }

            window.addEventListener('resize', stepProgress.updateProgress);
        },
        stepProgress.updateProgress = function(){
            var elem = current.querySelector('.-fill');
            var percent = parseFloat( current.getAttribute('data-progress') ) ;
            var ancho = parseFloat( current.offsetWidth - 12 );
            var max = Math.ceil( ancho * (percent / 100) );
            elem.style.maxWidth = max + 'px';
        }


    stepProgress.onLoad();
}

/**
 * @Carousel
 *
 *
 */

var carouselComponent = function () {

    /**
     * -------------------------------------
     * Constants
     * -------------------------------------
     */

    var screenSizes = {
        SMALL: 640,
        MEDIUM: 768,
        LARGE: 1200
    }

    var selector = {
        CAROUSEL      : '.carousel',
        WALKTHROUGH   : '.carousel-walkthrough',
        CURRENT       : '.current',
        CURRENT_SLIDE : '.current.carousel_slide',
        INNER         : '.carousel_inner',
        SLIDE         : '.carousel_slide',
        CONTROLS      : '.carousel_control',
        NEXT          : '.carousel_control.-next',
        PREV          : '.carousel_control.-prev',
        INDICATORS    : '.carousel_indicators'
    }

    var className = {
        CAROUSEL    : 'carousel',
        WALKTHROUGH : 'carousel-walkthrough',
        CURRENT     : 'current'
    }

    var data = {
        NAV       : 'data-nav',
        TARGET    : 'data-target',
        SLIDE     : 'data-slide',
        LABEL     : 'data-label',
        END_LABEL : 'data-end-label'
    }

    // Global
    var carousel = {}, carouselQuery, carouselArr, carouselControls, carouselIndicators, carouselIndicatorsCurrent,
        viewportHeight, viewportWidth, is_mobile, is_desktop, prev, next, slidesArr, slideActive, slideActiveIndex, slideToIndex,
        currentSlideEvent, lastSlideEvent, navEndLabel;

    // Methods
    carousel.onLoad = function () {
        carouselQuery = document.querySelectorAll( selector.WALKTHROUGH );
        carouselArr = Array.prototype.slice.call(carouselQuery);

        if( !carouselQuery.length > 0 ) return;

        carousel.polyfills();
        carouselArr.forEach(function (element) {
            carousel.getDataConfig(element);
            carousel.indicatorsNavigation(element);
            carousel.controlsNavigation(element);
            carousel.init(element);
        });
        carousel.navigationEndLabel();
    },
    carousel.polyfills = function() {
        utils.classListPolyfill();
        utils.closestPolyfill();
        utils.customEventPolyfill();
    },
    carousel.emitCustomEvent = function(e, name, bubbling){
        // Create a new event
        var event = new CustomEvent(name, {
            bubbles: bubbling !== undefined ? bubbling : true,
            cancelable: true,
            detail: {
                eventName: name,
                origin: e
            }
        });

        // Dispatch the event
        e.dispatchEvent(event);
    },
    carousel.getDataConfig = function (e) {

        // DATA RIDE by type
        if ( e.classList.contains( className.WALKTHROUGH  ) ) {
            carousel.walkthrough(e);
        }

        // DATA NAV by type
        if ( e.getAttribute(data.NAV) === 'ltr' ) {
            carousel.leftToRightNavigation(e);
        } else if ( e.getAttribute(data.NAV) === 'rtl' ){
            carousel.rightToLeftNavigation(e);
        } else {} // Both directions
    },
    carousel.leftToRightNavigation = function (e) {

        // Override 'control-prev'
        prev = e.querySelector(selector.PREV);
        if( prev == null ) return;
        utils.setAttributes(prev, {'aria-hidden': 'true', 'hidden': ''});

    },
    carousel.rightToLeftNavigation = function (e) {

        // Override 'control-next'
        next = e.querySelector(selector.NEXT);
        if( prev == null ) return;
        utils.setAttributes(next, {'aria-hidden': 'true', 'hidden': ''});

    },
    carousel.viewportMeasure = function () {
        viewportHeight = window.innerHeight, viewportWidth = window.innerWidth;
    },
    carousel.walkthrough = function (e) {

        // 1. Layout mobile behaviour
        var resetLayoutBehaviour = function (e) {
                e.querySelector( selector.INNER ).removeAttribute('style');
            },
            mobileBehaviour = function(e) {

                // Navigation position control
                var header, main, main_content, carousel_track, subtraction;

                header = document.querySelector('header.header').clientHeight,
                    main = document.querySelector('#main.main').clientHeight,
                    main_content = document.querySelector('.l-main-content').clientHeight,
                    carousel_track = e.querySelector('.carousel_inner').clientHeight,
                    subtraction = main_content - ( header + main );

                if( (header + main) < main_content) {
                    e.querySelector( selector.INNER ).style.minHeight = (carousel_track + subtraction ) + 'px';
                }
            },
            detectMedia = function(){
                carousel.viewportMeasure()
                is_mobile = ( viewportWidth < screenSizes.SMALL ), is_desktop = ( viewportWidth > 640 ) && ( viewportHeight >= 480 );

                // Reset
                resetLayoutBehaviour(e);

                if( is_mobile ) {
                    mobileBehaviour(e);
                }
            }
        window.addEventListener('resize', function () {
            waitForFinalEvent(function(){
                detectMedia();
            }, 250, "resize");
        });
        window.addEventListener('scroll', function () {
            waitForFinalEvent(function(){
                if( window.scrollY > 0 ) return;
                detectMedia();
            }, 250, "resize");
        });
        detectMedia();

        // 3. Walkthrough behaviour - only last slide

    },
    carousel.slideTransition = function (slidesArr, slideCurrentIndex, slideNewIndex) {
        if( slideCurrentIndex < slideNewIndex ) {
            slidesArr[slideNewIndex].classList.add('current-item-next');
            setTimeout(function(){
                slidesArr[slideNewIndex].classList.remove('current-item-next');
            }, 600);
        } else {
            slidesArr[slideNewIndex].classList.add('current-item-prev');
            setTimeout(function(){
                slidesArr[slideNewIndex].classList.remove('current-item-prev');
            }, 600);
        }

    },
    carousel.toSlide = function (element, slidesArr, slideCurrent, slideNewIndex){
        slideCurrent.classList.remove('current');
        slidesArr[slideNewIndex].classList.add('current');
        carousel.currentSlideCustomEvent ( element, slidesArr.length - 1, utils.getElementIndexInArr(slidesArr[slideNewIndex], 0, slidesArr) );

        // Emit the event
        document.dispatchEvent(currentSlideEvent);
    },
    carousel.indicatorsNavigation = function(e){
        carouselIndicators = Array.prototype.slice.call( e.querySelectorAll(selector.INDICATORS + ' button') );
        carouselIndicators.forEach(function (indicator) {
            indicator.addEventListener('click', function (evt) {
                var _this = evt.target, _parent = _this.closest( selector.CAROUSEL );
                slidesArr = Array.prototype.slice.call( _parent.querySelectorAll(selector.SLIDE) );
                slideActive = _parent.querySelector(selector.CURRENT_SLIDE);
                slideActiveIndex = utils.getElementIndexInArr(slideActive, 0, slidesArr);

                slideToIndex = this.getAttribute('data-slide-to');

                if (slideActiveIndex === slideToIndex) return ;

                if (slideToIndex > slidesArr.length - 1 || slideToIndex < 0) return;

                carousel.slideTransition (slidesArr, slideActiveIndex, slideToIndex)
                setTimeout(function(){
                    carousel.toSlide (_parent, slidesArr, slideActive, slideToIndex);
                }, 300)

                // Update indicators
                carouselIndicators = _parent.querySelectorAll( selector.INDICATORS + ' button' );
                carouselIndicatorsCurrent = _parent.querySelector( selector.INDICATORS + ' .current' );
                carouselIndicatorsCurrent.classList.remove('current');
                carouselIndicators[slideToIndex].classList.add('current');


                evt.stopPropagation();
            });
        });
    },
    carousel.controlsNavigation = function (e) {
        carouselControls = Array.prototype.slice.call( e.querySelectorAll(selector.CONTROLS + ':not([hidden])') );
        carouselControls.forEach(function (control) {
            control.addEventListener('click', function (evt) {
                evt.stopPropagation();

                var _this = evt.target, target = document.querySelector( _this.getAttribute(data.TARGET) );
                slidesArr = Array.prototype.slice.call( target.querySelectorAll(selector.SLIDE) );
                slideActive = target.querySelector(selector.CURRENT_SLIDE);
                slideActiveIndex = utils.getElementIndexInArr(slideActive, 0, slidesArr);

                if( _this.getAttribute(data.SLIDE) === 'next' ) {
                    if( slideActive.nextElementSibling ) { // No es el ultimo elemento
                        carousel.slideTransition (slidesArr, slideActiveIndex, slideActiveIndex+= + 1)
                        //slideActiveIndex++
                        setTimeout(function(){
                            carousel.toSlide (e, slidesArr, slideActive, slideActiveIndex);
                        }, 300)
                    } else {
                        // Último elemento
                    }
                }
                else if ( _this.getAttribute(data.SLIDE) === 'prev' ) {
                    if( slideActive.previousElementSibling ) { // No es el primer elemento
                        --slideActiveIndex
                        carousel.toSlide (e, slidesArr, slideActive, slideActiveIndex);
                    } else {
                        // Primer elemento
                    }
                }

                // Update indicators
                carouselIndicators = e.querySelectorAll( selector.INDICATORS + ' button' );
                carouselIndicatorsCurrent = e.querySelector( selector.INDICATORS + ' .current' );
                carouselIndicatorsCurrent.classList.remove('current');
                carouselIndicators[slideActiveIndex].classList.add('current');
            })
        });
    },
    carousel.currentSlideCustomEvent = function (carousel, childrenLength, currentIndex){

        // Current slide event declaration
        if( currentSlideEvent == undefined && typeof currentSlideEvent !== 'object' ) {
            currentSlideEvent = new CustomEvent('current-slide', {
                bubbles: true,
                cancelable: true,
                detail: {
                    carousel: carousel,
                    childrenLength: childrenLength,
                    currentIndex: currentIndex
                }
            });
        } else {
            currentSlideEvent['detail']['carousel'] = carousel;
            currentSlideEvent['detail']['childrenLength'] = childrenLength;
            currentSlideEvent['detail']['currentIndex'] = currentIndex;
        }
    },
    carousel.lastSlideCustomEvent = function (carousel) {

        // Last slide event declaration
        lastSlideEvent = new CustomEvent('last-slide', {
            bubbles: true,
            cancelable: true,
            detail: {
                origin: carousel
            }
        });
        // Emit the event
        carousel.dispatchEvent(lastSlideEvent);
    },
    carousel.navigationEndLabel = function () {

        // Current slide Listener
        document.addEventListener('current-slide', function (event) {

            // DATA END toggle label
            navEndLabel = event.detail.carousel.querySelector( '[' + data.END_LABEL +  ']');
            if( navEndLabel != null ) {
                if( event.detail.currentIndex == event.detail.childrenLength ) {
                    navEndLabel.innerHTML = navEndLabel.getAttribute( data.END_LABEL );
                    // Emit 'last-slide' event 
                    carousel.lastSlideCustomEvent(event.detail.carousel);
                } else {
                    // If user get back from last to previous slides
                    if( lastSlideEvent !== undefined && typeof lastSlideEvent == 'object' ) {
                        // Remove 'last-slide' listener from carousel
                        (event.detail.carousel).removeEventListener('last-slide', function(){}, false)

                        // Emit 'exit-last-slide' event
                        carousel.emitCustomEvent(event.detail.carousel, 'exit-last-slide', false);
                    }
                    if ( navEndLabel.getAttribute( data.LABEL ) == navEndLabel.innerHTML ) return;
                    navEndLabel.innerHTML = navEndLabel.getAttribute( data.LABEL )
                }
            }
        });
    }
    carousel.init = function (e) {
        e.querySelector( selector.INDICATORS + ' button' ).classList.add('current');
        e.querySelector( selector.SLIDE ).classList.add('current');
    }

    carousel.onLoad();

}

/**
 * @Selector de archivos
 *
 * Primera versión del componente, incluye las funciones:
 * - Variante 'Selector de archivos con elementos de control relacionados'
 * - Accesibilidad AA
 *
 */

var fileSelectorComponent = function () {

    // Global
    var fileSelector = {}; fileSelector.options = {}; fileSelector.utils = {};

    fileSelector.utils = {
        file: {
            name: function ( str ) {
                return str.split(/(\\|\/)/g).pop();
            },
            containsAFile: function ( element ) {
                return ( $(element).val() !== '' && String.prototype.trim.call( $(element).val() ).length );
            }
        },
        getLocalLanguage: function () {
            return window.navigator.browserLanguage || window.navigator.userLanguage || window.navigator.language;
        },
        getKeyMatch: function ( object, value ) {
            var ret = Object.keys(object).filter( function ( key ) { return value.match(key) } );
            return ret[0];
        },
        getLabel: function ( path, translate, key ) {
            var language = fileSelector.utils.getLocalLanguage(), match = fileSelector.utils.getKeyMatch(translate, language);
            return match !== undefined ? translate[match][key] : path[key];
        },
        delay: function( handler, delay ) {
            function handlerProxy() {
                return ( typeof handler === "string" ? instance[ handler ] : handler )
                    .apply( instance, arguments );
            }
            var instance = this;
            return setTimeout( handlerProxy, delay || 0 );
        },
        truncateName: function( label, string ){
            var characterWidth = 13, labeloffsetWidth = 229, maxNumberOfCharacters = Math.ceil( labeloffsetWidth / characterWidth ),
                ext = string.substr(string.lastIndexOf('.') + 1, string.length).toLowerCase(),
                fileName = (string).split(/(\\|\/)/g).pop().toLowerCase();
            var newName = fileName.replace('.' + ext, '');
            if(newName.length <= maxNumberOfCharacters){ return fileName }
            newName = newName.substr(0, maxNumberOfCharacters) + ( fileName.length > maxNumberOfCharacters ? '[...]' : '');
            return newName + '.' + ext;
        }
    }
    fileSelector.options = {
        clearSelectionElement: {
            translateTo: {
                es: {
                    label: 'Eliminar el archivo seleccionado'
                },
                ca: {
                    label: 'Eliminar l\'arxiu seleccionat'
                }
            },
            label: "Delete the file selected"
        },
        messages: {
            translateTo: {
                es : {
                    activation: "El selector para 'subir documentos PDF' ha sido habilitado.",
                    selected: "Archivo seleccionado, ",
                    notSelected: "Tu selección previa ha sido eliminada. Ningún archivo seleccionado."
                },
                ca : {
                    activation: "El selector per a 'pujar documents PDF' ha estat habilitat.",
                    selected: "Arxiu seleccionat, ",
                    notSelected: "La teva selecció prèvia ha estat eliminada. Cap arxiu seleccionat."
                }
            },
            activation: "The selector for 'upload PDF documents' has been enabled.",
            selected: "Selected file, ",
            notSelected: "Your previous selection has been removed. No file selected.",
            status: function( key ) {

                return fileSelector.utils.getLabel(
                    fileSelector.options.messages,
                    fileSelector.options.messages.translateTo, key);
            }
        }
    }
    fileSelector.liveRegionTimer = null;
    fileSelector.liveRegion = function () {
        $( "<div>", {
            role: "status",
            "aria-live": "assertive",
            "aria-relevant": "additions",
            "aria-atomic": "true",
            id: "messages",
            class: "sr-only"
        } ).appendTo( "body" );
    }

    // Core
    fileSelector.create = function () {
        if( !$('.frm-file').length > 0 ) return;

        $('.frm-file').each( function () {
            fileSelector.helperElements( this );
            fileSelector.clearSearchButton( this );
            fileSelector.on( this, $(this).find( "input:file" ) );
            fileSelector.ariaControls( $(this).find( "input:file" ) );
        });

        fileSelector.liveRegion();
    }
    fileSelector.helperElements = function ( element ) {
        var valueHolder = $( "<span />", {
            class: 'h-value hidden',
            'aria-hidden': 'true'
        });
        $(element).find('label').append( valueHolder );
    }
    fileSelector.clearSearchButton = function ( element ) {

        var clearSelectionElement = fileSelector.options.clearSelectionElement,
            translateTo = clearSelectionElement.translateTo,
            clearSelectionText = fileSelector.utils.getLabel(clearSelectionElement, translateTo, 'label');

        clearSelectionElement.element = $( "<button />", {
            type: 'button',
            class: 'input-reset',
            html : '<span class="sr-only">' + clearSelectionText + '</span>'
        });
        $(element).find('.input-mask').append( clearSelectionElement.element );
    }
    fileSelector.ariaControls = function ( inputElement ){

        var controls = $(document).find( "[aria-controls=" + $( inputElement ).prop('id') + "]" ), current = null, message;

        $(controls).each( function() {

            if ( $(this).prop('type') === 'radio' ) {

                $(this).on('change', function() {

                    // When first control is checked - Enable related input file
                    if ( $( inputElement ).prop('disabled') ) {
                        $( inputElement ).prop('disabled', false );

                        // Get message for liveRegion
                        message = fileSelector.options.messages.status( 'activation' );

                    } else { message = null; }  // Reset message

                    // When related controls update ( radio-group for document type ) reset document selected previously.
                    if( current !== $(this).prop( "id" ) ){

                        // Not announce on first ckecked
                        if( current !== null && fileSelector.utils.file.containsAFile( inputElement ) ) {

                            // Reset input
                            fileSelector.reset( inputElement );

                            // Get message for liveRegion
                            message = fileSelector.options.messages.status( 'notSelected' );
                        }

                        // Set current option:checked
                        current = $(this).prop( "id" );
                    }

                    if( message !== null ) {

                        // Announce the input 'status' in the liveRegion
                        clearTimeout( fileSelector.liveRegionTimer );
                        fileSelector.liveRegionTimer = fileSelector.utils.delay( function() {
                            $("#messages").html( $( "<div>" ).text( message ) );
                        }, 100 );

                    }

                });
            }
        });
    }
    fileSelector.reset = function( inputElement ){

        // Crossbrowser clear property value
        $( inputElement ).wrap('<form>').closest('form').get(0).reset();
        $( inputElement ).unwrap();

        // Selected file text
        $( inputElement ).next( 'label' ).find('.h-value').addClass( 'hidden' ).text('');

        // Placeholder text
        $( inputElement ).next( 'label' ).find('.h-placeholder').removeClass('hidden');

        // Reset validation states
        $( inputElement ).removeClass('error valid');

        // liveRegion
        $("#messages").html('');
    }
    fileSelector.response = function ( inputElement ) {

        var containsAFile = fileSelector.utils.file.containsAFile( inputElement ), message, inputPlaceHolder, inputPlaceHolderText;

        if( containsAFile ) {

            inputPlaceHolder = $( inputElement ).next( 'label' ).find('.h-placeholder');

            // Show file name in 'h-value' holder
            inputPlaceHolderText = fileSelector.utils.truncateName(inputPlaceHolder.get(0), $( inputElement ).val() );
            $( inputElement ).next( 'label' ).find( '.h-value' ).removeClass(' hidden' ).text( inputPlaceHolderText );

            // Hide input placeholder text
            $( inputElement ).next( 'label' ).find('.h-placeholder').addClass( 'hidden' );

            // Selected file message
            message =  fileSelector.options.messages.status( 'selected' );
            message += fileSelector.utils.file.name( $( inputElement ).val() );

            $( inputElement ).trigger('focus');

        } else {

            // Chrome Issue: Cancel button in upload file dialog, removes previously choosen file.
            fileSelector.reset( inputElement );

            message = fileSelector.options.messages.status( 'notSelected' );

            $( inputElement ).trigger('focus');
        }

        // Announce the 'selection'/'no selection' in the liveRegion
        clearTimeout( fileSelector.liveRegionTimer );
        fileSelector.liveRegionTimer = fileSelector.utils.delay( function() {
            $("#messages").html( $( "<div>" ).text( message ) );
        }, 100 );
    }
    fileSelector.on = function ( element, inputElement ) {

        $( element ).on( {

            click: function( evt ){

                if( $(evt.target).hasClass( 'input-reset' ) ) {

                    // Document selection process restarting
                    fileSelector.reset( inputElement );
                    $( inputElement ).trigger('focus');
                }
            }
        } );

        $( inputElement ).on( {

            change: function(){

                fileSelector.response( inputElement )
            }
        } );
    }

    fileSelector.create();

}

// @Customs
var matchHeightElements = function(){

    // Global
    var groups = {}, QUERY,
        selector = {
        ITEM: '[data-match-item]'
    };

    // Methods
    var navigatorSupport = function() {
        /** Polyfills */
        if( !Element.prototype.closest ) utils.closestPolyfill();
        if( !window.matchMedia ) utils.matchMediaPolyfill();
    },
    findElements = function(){
    QUERY = document.querySelectorAll(selector.ITEM);

    if (!QUERY.length > 0 ) return;

    navigatorSupport();

    // elemsArr = Array.prototype.slice.call( document.querySelectorAll('[data-match-item]') );
    // var elemsArr_ = [].map.call(document.querySelectorAll('[data-match-item]'), function(obj) { return obj; });
    setElementsGroup( Array.prototype.slice.call( QUERY ) );
    },
    setElementsGroup = function(arr){
        // Local vars
        var _this, group, parent;

        arr.forEach(function(e){
            _this = e;
            group = _this.getAttribute('data-match-item');
            parent =  _this.closest('[data-match-group]')

            if( parent ) {
                group = parent.getAttribute('data-match-group') + '-' + group;
            }
            groups[group] = (groups[group] || []).concat(e);
        });
    },
    isEnabled = function(g){
        if(!g) return false;

        var enable, disable, media;

        enable = g[0].closest('[data-match-enable]'), disable = g[0].closest('[data-match-disable]');
        if(enable) {
            media = enable.getAttribute('data-match-enable');
            return window.matchMedia(media).matches;
        }
        if(disable) {
            media = disable.getAttribute('data-match-disable');
            return window.matchMedia(media).matches;
        }

        // Enable by default
        return true;
    },
    matchElements = function(arr){
        var e = arr.reduce( (function(arr, e) {
            return e.style.height = "",
                Math.max(arr, e.offsetHeight)
        }), 0);

        arr.forEach((function(a) {
            return a.style.minHeight = "".concat(e, "px")
        }));
    },
    update = function(g){

        var groups = getElementsGroup(g);

        for (var n in groups) {
            var r = groups[n];
            isEnabled(r) ? matchElements(r) : r.forEach(function(t) {
                return t.style.minHeight = ""
            });
        }
    },
    reset = function(){
        findElements();
        update();
    },
    getElementsGroup = function(group){
        // By default, find all groups
        if( !group ) return groups;

        // Otherwise, search for specific groups
        if (typeof group === 'string' && groups[group]) {
            return groups[group]
        }

        // Otherwise, fallback to an empty object
        return {};
    }

    // Init
    reset();

    // Then update on every resize
    window.addEventListener('resize', function(){ update(); } );
}


//**-- DOCUMENT / WINDOW EVENTS --*/

$(document).ready(function(){
    
    if( $('.neo-preview-page, .vgn-ext-region').length > 0 ) return; // Avoid this function in preview

    // @Layout
    fixedNavigatonBehaviour();
    defaultLayoutBehaviour();

    // @Components
    navbarStepComponent();
    stepProgressLineComponent();
    carouselComponent();
    fileSelectorComponent();

    // Customs
    matchHeightElements();

    
});

//== @OnResize

//== @OnScroll



