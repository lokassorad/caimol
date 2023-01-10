/* Globals */
var loadedMenu = false;

function prebuscador(json){
	//do nothing
}
/* Renderizar videos en el Prebuscador */
var renderMustacheVideo = function(elem) {
	var video = $(elem).find('.video-gsa-meta');
	var containerId = $(elem).attr("id");
	if (video.length == 0) {
		log('no mustache videos found!');
		return;
	}
	log('will render video: ', containerId);
	renderNEOVideo(video, containerId);
};

/* Comprobar soporte para flex, y ejecutar polyfill */
function checkFlexibility() {
    if (!Modernizr.flexboxtweener && !Modernizr.flexbox) {
        flexibility(document.documentElement);
    }
}

/* Temporizador para resize */
var waitForFinalEvent = (function () {
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

/* Recuperar parametros desde un string */
getParameter = function(xParameter, rawParameter) {

	var Parameters = rawParameter.split('&');
	for (var i = 0; i < Parameters.length; i++) {
		var ParametersName = Parameters[i].split('=');
		if (ParametersName[0].toLowerCase() == xParameter.toLowerCase()) {
			return ParametersName[1];
		}
	}
};

/* iFrame Call me now */

function iframeVideoAgente(){
	var cmn = $('.cmn-layer[data-layer-target]');
	function hideCmn(elem){
		elem.closest('.cmn-sticky').hide();
	}
	if (cmn.length > 0) {
		cmn.each(function(){
		    /* Iframe generation and parameters automation */

			var elem = $(this);
			var elemSrc = elem.attr('data-layer-target');
			var elemHash = '';
			if (elemSrc.indexOf('#') > -1) {
				elemHash = elemSrc.substring(elemSrc.indexOf('#'));
				elemSrc = elemSrc.replace(elemHash,'');
			}
			if (elemSrc.indexOf('?') > 0) {
				var elemSearch = elemSrc.substring(elemSrc.indexOf('?') + 1);
				elemSrc = elemSrc.replace(elemSearch,'').replace('?','');
				if(getParameter('prod',elemSearch) != undefined ) {
					if(getParameter('pos',elemSearch)== undefined) {
						elemSearch = elemSearch + '&pos=D';
					}
					if(getParameter('serv',elemSearch)== undefined) {
						elemSearch = elemSearch + '&serv=1';
					}
					if(getParameter('origen',elemSearch)== undefined) {
						if(getParameter('origen',document.location.search)!= undefined){
							elemSearch = elemSearch + '&origen=' + getParameter('origen',document.location.search);
						} else if (Cookies.get('origen') != undefined) {
							elemSearch = elemSearch + '&origen=' + Cookies.get('origen');
						} else {
							//var origen = document.location.href.substring(document.location.href.lastIndexOf('/')+1,document.location.href.indexOf('_'));
							//elemSearch = elemSearch + '&origen=' + origen;
						}
					}
					elemSrc = elemSrc + '?' + elemSearch + elemHash;
					var elemIframe = '<iframe allowtransparency="true" scrolling="no" src="'+elemSrc+'"></iframe>';
					elem.html(elemIframe);
				} else {
					//Mostramos bottom_sticky aunque no lleve parametro "prod"
					//hideCmn(elem);
				}
			} else {
				//Mostramos bottom_sticky aunque no lleve parametros
				//hideCmn(elem);
			}

		    /* External link generation and behavior, including onClickSC */
			/*
            var elem = $(this);
            var elemSrc = elem.attr('data-layer-target');
            var elemLinks = elem.closest('.cmn-sticky').find('a');
            elemLinks.attr('href',elemSrc).removeAttr('role').attr('target','_blank');
            if (typeof onClickSC != 'undefined' && typeof s.pageName != 'undefined') {
                var scParam = 'AbrirCMN-'+s.pageName;
                elemLinks.on('click',function(){
                    onClickSC(scParam);
                })
            }
            */
		})
	}
}

/* Añadir class al HTML indicando si la pagina esta cargada */
function classPageLoaded(){
    $('html').addClass('page-loaded');
}
/* Añadir class al HTML indicando si el DOM está listo */
function classPageDomReady(){
    $('html').addClass('page-ready');
}
/* Si hay elementos dentro de la region de sticky footer (CTA, CMN), ponemos class a page wrapper para gestionar margen */
function stickyCheck(){
    if($('.bottom_sticky').children().length) {
        $('.page-wrapper').addClass('mg-bt')
    }
}

/* Escala de grises en carruseles */
function greyThumbs() {
	if (!Modernizr.cssfilters && $('.carousel-thumb').length > 0) {
		$('.carousel-item .carousel-thumb img').gray();
	}
}

/* Funcion de adaptacion de tablas a responsive dentro de cuerpo central de pagina */
function tableResponsive(){
    var tables = $('.main').find('table');
    tables.each(function(){
        var table = $(this);
        table.addClass('table').wrap('<div class="table-responsive n-table"></div>');
        if(table.closest('.table-responsive') !== null  && table.closest('.table-responsive').responsiveTable !== undefined){
	        table.closest('.table-responsive').responsiveTable({
	            addFocusBtn: false,
	            stickyTableHeader: false
	        });
        }
    })
}
/* Placeholder de campo de busqueda de footer en IE8/IE9 */
function footerSearchPlaceholder(){
    if (!Modernizr.placeholder) {
        var footerOffice = $('#office-footer');
        var footerOfficePlaceholder = footerOffice.attr('placeholder');
        footerOffice.attr('value',footerOfficePlaceholder);
        footerOffice.on('focus', function(){
            if($(this).val() == footerOfficePlaceholder) {
                $(this).val('');
            }
        });
        footerOffice.on('blur', function(){
            if(footerOffice.val() == '') {
                footerOffice.val(footerOfficePlaceholder)
            }
        });
    }
}

/* Placeholder de lolopo en header */
var lolopoPlaceholder = function(){
    if (!Modernizr.placeholder) {
        var lLogin = $('#lineaabierta-login');
        var lLoginPlaceholder = lLogin.attr('placeholder');
        lLogin.attr('value',lLoginPlaceholder);
        lLogin.on('focus', function(){
            if($(this).val() == lLoginPlaceholder) {
                $(this).val('');
            }
        });
        lLogin.on('blur', function(){
            if(lLogin.val() == '') {
                lLogin.val(lLoginPlaceholder)
            }
        });
        var lPass = $('#lineaabierta-pin');
        var lPassPlaceholder = lPass.attr('placeholder');
        lPass.attr('value',lPassPlaceholder).attr('type','text');
        lPass.on('focus', function(){
            if($(this).val() == lPassPlaceholder) {
                $(this).val('').attr('type','password');
            }
        });
        lPass.on('blur', function(){
            if(lPass.val() == '') {
                lPass.val(lPassPlaceholder).attr('type','text')
            }
        });
    }
};

/* Slider Home */
var initSliderHome = function(isRestart){
	$('.hm-slider').on('init', function(event, slick) {
		updateSlickArrowTitles(slick);
		updateSlickButtonTitles();
	});

	$('.hm-slider-list').slick({
		lazyLoad: 'ondemand',
        autoplay: true,
		autoplaySpeed: 5000,
		dots: true,
		fade: true,
		pauseOnDotsHover: true,
		appendArrows: $('.hm-slider-controls'),
		prevArrow: '<a class="slick-prev" role="button" href="javascript:void(0)" title="Diapositiva anterior"><img src="/deployedfiles/common/R2016/Estaticos/images/icons/hm-slider-arrow-left.png" alt=""><span class="sr-only">Diapositiva anterior</span></a>',
		nextArrow: '<a class="slick-next" role="button" href="javascript:void(0)" title="Diapositiva siguiente"><img src="/deployedfiles/common/R2016/Estaticos/images/icons/hm-slider-arrow-right.png" alt=""><span class="sr-only">Diapositiva siguiente</span></a>',
		appendDots: $('.hm-slider-b-items')
	});

	if (!isRestart){
		$('.hm-slider-b-play').find('a').on('click', function(){
			var control = $(this);
			var slider = control.closest('.hm-slider').find('.hm-slider-list');
			if(control.hasClass('paused')){
				slider.slick('slickPlay');
				control.removeClass('paused');
			} else {
				slider.slick('slickPause');
				control.addClass('paused');
			}
		});
	}

	doSliderCleanUp();
	addSliderKeyboardEvents();

	var slideAlreadyOpen = [];

	$('.hm-slider').on('afterChange', function(event, slick, direction) {
		updateSlickArrowTitles(slick);
		initOmOnSliderChange(slideAlreadyOpen, direction);
	});
	
	if(isMobile()){
		closAllMinisterialOrderSliderLessTheFirst(200);
	}

	waitTimeToCloseMinisterialOrderSlider(0);
	slideAlreadyOpen.push(0);

};

/* Logical for Ministerial Orders on slier change */
function initOmOnSliderChange(slideAlreadyOpen, direction){
	if(isMobile()){
			closAllMinisterialOrderSliderWithDuration(200);
	}
	else {
		if($.inArray(direction, slideAlreadyOpen) === -1){
			waitTimeToCloseMinisterialOrderSlider(direction);	
			slideAlreadyOpen.push(direction);
		}
	}
}

/* Abrir CMB */
function openCMN() {
	var stickyCta = $('.cmn-sticky');
	stickyCta.find('a').on('click', function(){
	    /* Mientras el CMN funcione como enlace, no queremos que abra nada, por lo que comentamos esta línea */
		
	    stickyCta.find('.cmn-layer').toggleClass('open');
	    
	})
}

/* Dropdowns FAQS en resultados de busqueda */
function faqsDropdowns() {
	$('.s-item-answer-open').on('click', function(){
		var faq = $(this);
		faq.siblings('.s-item-answer-box').slideToggle();
	})
}

/* Desplegable filtros buscador */
function searchFilters(){
	$('.search-filter-button').find('a').on('click', function(){
		if($(window).width() >= 768) {
			var button = $(this);
			button.toggleClass('active');
			button.closest('.search-filter-button').siblings('.search-filters-list').slideToggle();
		}

	});
	$(document).on('click', function(ev){
		if ($('.search-filters').length > 0 &&
			$('.search-filters-list').is(':visible') &&
			($(ev.target).parents(".search-filters").length == 0 &&
			$(ev.target).parents(".search-mobile-open-trigger").length == 0)) {
			$('.search-filters-list').slideUp();
		}
	});
	$('.search-mobile-close').find('a').on('click', function(){
		$(this).closest('.search-filters').slideUp();
	});
	$('.search-mobile-open-trigger').find('a').on('click', function(){
		var filters = $('.search-filters');
		if (filters.length > 0) {
			filters.slideDown();
		}
	});
}

/* Mostrar Overlay */
function showOverlay(overlayClass){
	$("#panels-overlay").show();
	if (overlayClass){
		$(".page-wrapper").addClass("overlay-" + overlayClass);
	}
}
function hideOverlay(overlayClass){
	$("#panels-overlay").fadeOut();
	if (overlayClass){
		$(".page-wrapper").removeClass("overlay-" + overlayClass);
	}
}

/******************* D2 TABS ***************************/
function testTabsWidth(){
	$.each($(".tabs-group"), function(idx, obj){
		var tabWidthSum = 0;
		$.each($(obj).find(".tabs-item"), function(idx, obj){
			tabWidthSum += $(obj).outerWidth(true);
		});
		var tabItemsWidth = $(obj).find(".tabs-items-list").outerWidth(true);
		if (tabWidthSum > tabItemsWidth){
			$(obj).find(".tabs-items-list").addClass("tabs-navigation").removeClass("tabs-no-navigation");
		} else {
			$(obj).find(".tabs-items-list").addClass("tabs-no-navigation").removeClass("tabs-navigation");
		}
	});
}
function tabsOpener(tab){
	var $this = tab.closest('.tab-opener');
	var showId = $this.attr("data-target");
	$this.closest(".tabs-group").find(".tabs-content").hide();
	$this.closest(".tabs-group").find(".tabs-content[data-target-id='" + showId + "']").show().find("img[data-src]").trigger("unveil");
	$this.closest(".tabs-group").find('.tabs-item-title-active').removeClass('tabs-item-title-active');
	if (!$this.find(".tabs-item-title").hasClass(' tabs-item-title-active')) {
		$this.find(".tabs-item-title").addClass(' tabs-item-title-active');
	}

	if ($this.siblings(".expanded")){
		$this.siblings(".expanded").addClass("expanding");
		$this.siblings(".expanded").find(".tab-dropdown-open").slideUp(function(){
			$this.siblings(".expanding").find(".tab-dropdown-open").removeClass("tab-dropdown-open");
			$this.siblings(".expanding").removeClass('expanding');
		});
		$this.siblings(".expanded").removeClass("expanded");
	}
	moveTabElementToFullView($this);
}
function tabsSearchOpener(tab){
	var $this = tab.closest('.tab-opener');
	var showId = $this.attr("data-target");
	$this.closest(".column").find(".search-result-block").hide();
	$this.closest(".column").find(".search-result-block[data-target-id='" + showId + "']").show().find("img[data-src]").trigger("unveil");
	$this.closest(".column").find('.tabs-item-title-active').removeClass('tabs-item-title-active');
	if (!$this.find(".tabs-item-title").hasClass(' tabs-item-title-active')) {
		$this.find(".tabs-item-title").addClass(' tabs-item-title-active');
	}
	moveTabElementToFullView($this);
}

function moveTabElementToFullView(element){
	var $target = element;
	if($target.length > 0) {
		var parentLeftPosition = $target.closest('.tabs-items-wrap').offset().left;
		var parentRightPosition = ($(window).width() - (parentLeftPosition + $target.closest('.tabs-items-wrap').outerWidth()));
		var moveTargetContainer = function() {
		var elementLeftPosition = $target.offset().left;
		var elementRightPosition = ($(window).width() - (elementLeftPosition + $target.outerWidth()));

		var rightArrow = $target.closest(".tabs-group").find(".tabs-arrow-right a");
		var rightArrowWidth = rightArrow.is(":visible") ? rightArrow.outerWidth() : 0;
		var leftArrow = $target.closest(".tabs-group").find(".tabs-arrow-left a");
		var leftArrowWidth = leftArrow.is(":visible") ? leftArrow.outerWidth() : 0;

		if (parentRightPosition+rightArrowWidth > elementRightPosition){
			if($target.closest(".tabs-group").find(".tabs-arrow-right:visible").length > 0){
				if(elementRightPosition < 0 || (elementLeftPosition-$target.closest('.tabs-items-list').outerWidth()+leftArrowWidth<parentLeftPosition)){
					var arrow = $target.parents(".tabs-group").find(".tabs-arrow-right a").closest('.tabs-items-list');
					slideTabs(arrow, (elementLeftPosition) - (parentRightPosition+rightArrowWidth));
				}
				else {
					$target.parents(".tabs-group").find(".tabs-arrow-right a").click();
					window.setTimeout(moveTargetContainer, 400);
				}
				}
		} else if (parentLeftPosition + leftArrowWidth > elementLeftPosition ){
				if($target.parents(".tabs-navigation").find(".tabs-arrow-left:visible").length > 0){
					if(elementLeftPosition < 0 || (elementRightPosition+$target.closest('.tabs-items-list').outerWidth()+rightArrowWidth>parentRightPosition)){
						var arrow = $target.parents(".tabs-group").find(".tabs-arrow-left a").closest('.tabs-items-list');
						slideTabs(arrow, (parentLeftPosition + leftArrowWidth)*-1 + elementLeftPosition);
					}
					else {
						$target.parents(".tabs-group").find(".tabs-arrow-left a").click();
						window.setTimeout(moveTargetContainer, 400);
					}
				}
			}
		};
	moveTargetContainer();
	}
}

function tabsHeight() {
	$('.tabs-items').each(function(){
		var tabs = $(this);
		var tabH = 0;
		var tabItems = tabs.find('.tabs-item');
		tabItems.each(function(){
			if($(this).outerHeight(true) > tabH) {
				tabH = $(this).outerHeight(true);
			}
		});
		tabItems.height(tabH);
	})
}
function slideTabs(tabs, amount) {
	var tabSc = tabs.find('.tabs-items-wrap');
	var leftS = tabSc.scrollLeft() + amount;
	tabSc.animate({
		scrollLeft: leftS
	}, 400);
}
function tabsEvents() {
	$('.tabs-group').not('.search-tabs').find('.tabs-item.tab-opener').children('a').on('click', function(e){
		var $this = $(this);
		if($this.children('.tabs-item-title-active').length !== 0) {
			e.preventDefault();
			return ;
		}

		tabsOpener($this);
	});
	$('.tabs-group.search-tabs').find('.tabs-item.tab-opener').children('a').on('click', function(){
		tabsSearchOpener($(this));
	});
	$('.tabs-items-wrap').on('scroll',function(){
		var tabs = $(this);
		var tabsSc = tabs.scrollLeft();
		var tabsLast = tabs.find('.tabs-item:last-child');
		var tabLeft = tabs.closest('.tabs-items-list').find('.tabs-arrow-left');
		var tabRight = tabs.closest('.tabs-items-list').find('.tabs-arrow-right');
		if(tabsSc <= 0) {
			tabLeft.fadeOut();
		} else {
			tabLeft.fadeIn();
		}
		var tabsLimit = tabs.width();
		var lastItemLimit = tabsLast.offset().left - tabs.offset().left + tabsLast.outerWidth();
		if (lastItemLimit - 5 < tabsLimit) {
			tabRight.fadeOut();
		} else {
			tabRight.fadeIn();
		}
	});

	$('.tabs-arrow-left').find('a').on('click', function(e){
		e.preventDefault();
		var arrow = $(this).closest('.tabs-items-list');

		slideTabs(arrow, (-1 * arrow.outerWidth()));

	});
	$('.tabs-arrow-right').find('a').on('click', function(e){
		e.preventDefault();
		var arrow = $(this).closest('.tabs-items-list');
		slideTabs(arrow,arrow.outerWidth());
	})
}

/***************** G1 Carrusel **********************/
function testCarouselWidth(){
	$.each($(".carousel-group"), function(idx, obj){
		var slideWidthSum = 0;
		$.each($(obj).find(".carousel-item"), function(idx, obj){
			slideWidthSum += $(obj).outerWidth(true);
		});
		var slideItemsWidth = $(obj).find(".carousel-items-list").outerWidth(true);
		if (slideWidthSum > slideItemsWidth){
			$(obj).find(".carousel-items-list").addClass("carousel-navigation").removeClass("carousel-no-navigation");
		} else {
			$(obj).find(".carousel-items-list").addClass("carousel-no-navigation").removeClass("carousel-navigation");
		}
	});
}
function carouselOpener(item){
	var $this = item;
	var showId = $this.closest('.carousel-item').attr("data-target");
	$this.closest('.carousel-items').find(".active").removeClass("active");
	$this.closest('.carousel-item').addClass("active");
	$this.closest(".carousel-group").find(".carousel-content").hide();
	$this.closest(".carousel-group").find(".carousel-content[data-target-id='" + showId + "']").fadeIn();
}
function moveCarouselElementToFullView(element){
	var $target = element;
	var parentLeftPosition = $target.closest('.carousel-items-wrap').offset().left;
	var parentRightPosition = ($(window).width() - (parentLeftPosition + $target.closest('.carousel-items-wrap').outerWidth()));
	var moveTargetContainer = function() {
		var elementLeftPosition = $target.offset().left;
		var elementRightPosition = ($(window).width() - (elementLeftPosition + $target.outerWidth()));
		var rightArrowWidth = $target.closest(".carousel-group").find(".carousel-arrow-right a").outerWidth();
		var leftArrowWidth = $target.closest(".carousel-group").find(".carousel-arrow-left a").outerWidth();
		if (parentRightPosition+rightArrowWidth > elementRightPosition && $target.closest(".carousel-group").find(".carousel-arrow-right:visible").length > 0){
			$target.parents(".carousel-group").find(".carousel-arrow-right a").click();
			window.setTimeout(moveTargetContainer, 400);
		}
		if (parentLeftPosition + leftArrowWidth > elementLeftPosition && $target.parents(".carousel-navigation").find(".carousel-arrow-left:visible").length > 0){
			$target.parents(".carousel-group").find(".carousel-arrow-left a").click();
			window.setTimeout(moveTargetContainer, 400);
		}
	};
	moveTargetContainer();
}
function slideCarousel(slides, amount) {
	var slideSc = slides.find('.carousel-items-wrap');
	var leftS = slideSc.scrollLeft() + amount;
	slideSc.animate({
		scrollLeft: leftS
	}, 400);
}
function carouselEvents() {
	$('.carousel-item').not('.carousel-item-external').find('a').on('click', function() {
		carouselOpener($(this));
	});
	$('.carousel-items-wrap').on('scroll',function(){
		var slides = $(this);
		var slidesSc = slides.scrollLeft();
		var slidesLast = slides.find('.carousel-item:last-child');
		var slideLeft = slides.closest('.carousel-items-list').find('.carousel-arrow-left');
		var slideRight = slides.closest('.carousel-items-list').find('.carousel-arrow-right');
		if(slidesSc <= 0) {
			slideLeft.fadeOut();
		} else {
			slideLeft.fadeIn();
		}
		var slideLimit = slides.width();
		var lastItemLimit = slidesLast.offset().left - slides.offset().left + slidesLast.outerWidth();
		if (lastItemLimit - 5 < slideLimit) {
			slideRight.fadeOut();
		} else {
			slideRight.fadeIn();
		}
	});
	$('.carousel-arrow-left').find('a').on('click', function(){
		var arrow = $(this).closest('.carousel-items-list');
		slideCarousel(arrow,-200);
	});
	$('.carousel-arrow-right').find('a').on('click', function(){
		var arrow = $(this).closest('.carousel-items-list');
		slideCarousel(arrow,200);
	})
}
/***************** E1 Dropdowns **********************/

function dropdownOpener(dropdown){
	var $this = dropdown;
	$this.toggleClass("active");
	$this.closest('.dropdown-title').siblings(".dropdown-content").slideToggle();
}
function dropdownEvents() {
	$('.dropdown-group').find('.dropdown-title').find('a').on('click', function() {
		dropdownOpener($(this));
	});
}

/****************** B4 Gallery ***********************/

function galleryInit() {
	if ($().slick){

		$('.gallery-items').each(function(){
			var gal = $(this);
			gal.slick({
				dots: false,
				infinite: true,
				variableWidth: false,
				centerMode: true,
				centerPadding: '0px',
				speed: 300,
				slidesToShow: 1,
				slidesToScroll: 1,
				prevArrow: gal.closest('.gallery-group').find(".gallery-arrow-left"),
				nextArrow: gal.closest('.gallery-group').find(".gallery-arrow-right"),
				accessibility: false
			}).on('beforeChange',function(event, slick, currentSlide, nextSlide){

				// Disabled: See #62841 (allow infinite mode)
				/*
				if (nextSlide == 0) {
					gal.closest('.gallery-items-list').addClass('gallery-first').removeClass('gallery-last').find('.gallery-arrow-left').fadeOut().siblings('.gallery-arrow-right').fadeIn();
				} else if (nextSlide == $(this).find('.gallery-item').length - 1) {
					gal.closest('.gallery-items-list').addClass('gallery-last').removeClass('gallery-first').find('.gallery-arrow-right').fadeOut().siblings('.gallery-arrow-left').fadeIn();
				} else {
					gal.closest('.gallery-items-list').removeClass('gallery-first').removeClass('gallery-last').find('.gallery-arrow-left').fadeIn().siblings('.gallery-arrow-right').fadeIn();
				}
				*/

				var itemDataId = gal.find('.gallery-item').eq(nextSlide).attr("data-id");
				if (typeof itemDataId !== typeof undefined && itemDataId !== false && itemDataId){
					window.location.hash = itemDataId;
				}

				galleryUpdateKeyboardNav(gal, currentSlide, "before");

			}).on('afterChange', function(event, slick, currentSlide) {
				// Disabled See #62841
				// galleryUpdateKeyboardNav(gal, currentSlide, "after");
			});

			// Disabled: See #62841
			// .closest('.gallery-items-list').find('.gallery-arrow-left').fadeOut(10);

			galleryPrepareKeyboard(gal);
		})
	}
	$(".gallery-item-zoom").find('a').on('click', function(e){
		e.preventDefault();
		if (!$(this).closest(".gallery-item").hasClass("slick-current")){
			return ;
		}
		var targetImg = $(this).attr("href");
		$.colorbox({href:targetImg, className: "imageZoom"});
	});
}

function galleryPrepareKeyboard(elem) {
	// adds play handler to video-only gallery items
	elem.find(".gallery-item-video").not(":has(>a)").append("<a href='javascript:void(0)' class='gallery-video-play-handler'/>");

	// remove keyboard controls from iframes
	elem.find("iframe").attr("tabindex","-1");

	// disable keyboard on unselected elements
	elem.find("a").attr("tabindex","-1");

	// disables left arrow
	elem.closest('.gallery-items-list').find('.gallery-arrow-left > a').removeAttr("tabindex");

	// adds keyboard controls to first item
	var firstItem = elem.find('.gallery-item').eq(0);
	if(firstItem.hasClass("gallery-item-image")) {
		firstItem.find("a").removeAttr("tabindex");
	}
	else if(firstItem.hasClass("gallery-item-video")) {
		firstItem.children("a").removeAttr("tabindex");
	}

	// adds listeners to auto-navigate gallery on tab
	$(window).on("keydown", function(evt) {
		if(evt.which == 9) {
			if(elem.closest('.gallery-items-list').find('.gallery-arrow-left > a:focus').length > 0 && evt.shiftKey) {
				elem.closest('.gallery-items-list').find('.gallery-arrow-left > a').click();
			}
			else if(elem.closest('.gallery-items-list').find('.gallery-arrow-right > a:focus').length > 0 && !evt.shiftKey) {
				elem.closest('.gallery-items-list').find('.gallery-arrow-right > a').click();
			}
		}
	});

}

function galleryUpdateKeyboardNav(elem, idx, eventType) {

	if(eventType == "before") {

		// removes keyboard controls from previous gallery item
		var currentItem = elem.find('.gallery-item').eq(idx);
		if(currentItem.hasClass("gallery-item-image")) {
			currentItem.find("a").attr("tabindex","-1");
		}
		else if(currentItem.hasClass("gallery-item-video")) {
			currentItem.children("a").attr("tabindex","-1");
		}

		// enables keyboard control on gallery arrows if needed
		if(idx == 0) {
			elem.closest('.gallery-items-list').find('.gallery-arrow-left > a').removeAttr("tabindex");
		}
		if(idx == elem.find('.gallery-item').length - 1) {
			elem.closest('.gallery-items-list').find('.gallery-arrow-right > a').removeAttr("tabindex");
		}

	}

	if(eventType == "after") {

		// adds keyboard controls to next gallery item
		var nextItem = elem.find('.gallery-item').eq(idx);
		if(nextItem.hasClass("gallery-item-image")) {
			nextItem.find("a").removeAttr("tabindex").focus();
		}
		else if(nextItem.hasClass("gallery-item-video")) {
			nextItem.children("a").removeAttr("tabindex").focus();
		}

		// disables keyboard control on gallery arrows if needed
		if(idx == 0) {
			elem.closest('.gallery-items-list').find('.gallery-arrow-left > a').attr("tabindex","-1");
		}
		if(idx == elem.find('.gallery-item').length - 1) {
			elem.closest('.gallery-items-list').find('.gallery-arrow-right > a').attr("tabindex","-1");
		}
	}

}

/** video controls */
function getVideoType(elem) {
	var videoElem = $(elem).closest('.gallery-item-video').find('.video-inline');

	var brightcoveElem = videoElem.find('.BrightcoveExperience'),
		brightcoveV2Elem = videoElem.find('.neo-brightcove_v2-video'),
	 	youtubeElem = videoElem.find('.neo-youtube-video');

	if (brightcoveElem.length > 0) {
		return 'brightcove';
	} else if (brightcoveV2Elem.length > 0) {
		return 'brightcove_v2';
	} else if (youtubeElem.length > 0) {
		return 'youtube';
	} else {
		return '';
	}
}

function controlVideo(elem, action) {
	var videoType = getVideoType(elem);

	if (videoType === 'brightcove') {
		controlBrightcove(elem, action);
	} else if (videoType === 'brightcove_v2') {
		controlBrightcoveV2(elem, action);
	} else if (videoType === 'youtube') {
		controlYoutube(elem, action);
	} else {
		log('Specified video type is not valid');
	}
}

function controlBrightcove(elem, action) {
	var videoId = getBrightcoveVideoId(elem);

	if (action === 'play') {
		brightcovePlay(videoId);
	} else if (action === 'pause') {
		brightcovePause(videoId);
	} else {
		log('Invalid action: ', action);
	}
}

function controlBrightcoveV2(elem, action) {
	var videoId = getBrightcoveV2VideoId(elem);

	if (action === 'play') {
		brightcoveV2Play(videoId);
	} else if (action === 'pause') {
		brightcoveV2Pause(videoId);
	} else {
		log('Invalid action: ', action);
	}
}

function controlYoutube(elem, action) {
	var videoId = getYoutubeVideoId(elem);

	if (action === 'play') {
		youtubePlay(videoId);
	} else if (action === 'pause') {
		youtubePause(videoId);
	} else {
		log('Invalid action: ', action);
	}
}

// brightcove
function getBrightcoveVideoId(elem) {
	return $(elem)
		.closest('.gallery-item-video')
		.find('.gallery-video object')
		.attr('id');
}

function getBrightcovePlayer(videoId) {
	var player = brightcove.getExperience(videoId);

    return player.getModule(APIModules.VIDEO_PLAYER);
}

function brightcovePlay(videoId) {
	getBrightcovePlayer(videoId).play();
}

function brightcovePause(videoId) {
	getBrightcovePlayer(videoId).pause();
}


// brightcove v2
function getBrightcoveV2VideoId(elem) {
	return $(elem)
		.closest('.gallery-item-video')
		.find('.gallery-video video')
		.attr('id');
}

function getBrightcoveV2Player(videoId) {
	return videojs(videoId);
}

function brightcoveV2Play(videoId) {
	getBrightcoveV2Player(videoId).play();
}

function brightcoveV2Pause(videoId) {
	getBrightcoveV2Player(videoId).pause();
}


// youtube
function getYoutubeVideoId(elem) {
	return $(elem)
		.closest('.gallery-item-video')
		.find('.gallery-video iframe')
		.attr('id');
}

function getYoutubePlayer(videoId) {
	var player = null;
	if (youtubeVideos && youtubeVideos.hasOwnProperty(videoId)) {
		player = youtubeVideos[videoId];
	}
	return player;
}

function youtubePlay(videoId) {
	getYoutubePlayer(videoId).playVideo();
}

function youtubePause(videoId) {
	getYoutubePlayer(videoId).pauseVideo();
}


function videoInit() {
	$('.gallery-group').on('click','.gallery-item-video > a',function(){
		$(this).closest('.gallery-item-video').addClass('gallery-item-playing');
		$('html').addClass('inner-video-playing');
        $(this).closest('.gallery-group').addClass('gallery-group-playing');

        controlVideo(this, 'play');
	}).on('click','.gallery-item-video-close > a',function(){
		$(this).closest('.gallery-item-video').removeClass('gallery-item-playing');
        $(this).closest('.gallery-group').removeClass('gallery-group-playing');
        $('html').removeClass('inner-video-playing');

         controlVideo(this, 'pause');
    });
}

/******************* Anchors *************************/
function groupAnchorInit(){
	var hash = window.location.hash.substring(1);
	var hashScrolled = false;
	$('.tabs-arrow-left').hide();
	$('.carousel-arrow-left').hide();
	$('[class*="-group"]').not('.menu-linkgroup').not('.submenu-linkgroup').each(function(){
		var group = $(this);
		if (hash && group.find("[data-id='" + hash + "']").length) {
			var $target = group.find("[data-id='" + hash + "']");
			if (!hashScrolled) {
				var elementPosition = $target.offset().top;
				$("img[data-src]").trigger("unveil");
				hashScrolled = true;
				var waitElementFix = function(){
					var newPosition = $target.offset().top;
					if (newPosition != elementPosition){
						elementPosition = newPosition;
						window.setTimeout(waitElementFix, 200);
					}else{
						activateItemGroup($target, group);
						$('html, body').animate({
							scrollTop: $target.offset().top - 50}, 1000
						);
					}
				};
				// We test every 200ms if the element position has been fixed. This is useful for very long (vertically wise) pages.
				window.setTimeout(waitElementFix, 200);
			} else {
				activateItemGroup($target, group);
			}
		} else {
			activateFirstItemGroup(group);
		}
	});
}
function activateItemGroup(item, type) {
	if(type.hasClass('gallery-group')){
		item.closest('.gallery-items').slick('slickGoTo',item.index());
	} else {
		if (item.hasClass('carousel-item-external')) {
			item.addClass('active');
		} else {
			if (type.hasClass('tabs-group') && !type.hasClass('search-tabs')) {tabsOpener(item.children('a'))}
			if (type.hasClass('tabs-group') && type.hasClass('search-tabs')) {tabsSearchOpener(item.children('a'))}
			if (type.hasClass('dropdown-group')) {dropdownOpener(item.children('a'))}
			if (type.hasClass('carousel-group')) {carouselOpener(item.children('a'))}
		}
		if (item.closest(".tabs-navigation").length > 0){
			moveTabElementToFullView(item);
		} else if (item.closest(".carousel-navigation").length > 0){
			moveCarouselElementToFullView(item);
		}
	}
}
function activateFirstItemGroup(group) {
	if (group.hasClass('tabs-group') && !group.hasClass('search-tabs')) {
		tabsOpener(group.find('.tabs-item.tab-opener').eq(0).children('a'));
	} else if (group.hasClass('tabs-group') && group.hasClass('search-tabs')) {
		tabsSearchOpener(group.find('.tabs-item.tab-opener').eq(0).children('a'));
	} else if (group.hasClass('carousel-group')) {
		carouselOpener(group.find('.carousel-item').not('.carousel-item-external').eq(0).children('a'));
	}
}
function hashUpdate(){
	$(window).on('click', function(ev){
		if ($(ev.target).parents("[data-id]").length > 0){
			var itemDataId = $(ev.target).parents("[data-id]").attr("data-id");
			if (typeof itemDataId !== typeof undefined && itemDataId !== false && itemDataId){
				window.location.hash = itemDataId;
			}
		} else {
			var attr = $(this).attr('data-id');
			if (typeof attr !== typeof undefined && attr !== false && attr) {
				window.location.hash = attr;
			}
		}
	});
}

/******************* Horizontal drag scroll *****************/
function horizontalScroll(){
	var x,y,top,left,down,elemScroll;

	$(".tabs-items-wrap, .carousel-items-wrap").on('mousedown', function(e){
		e.preventDefault();
		down = true;
		elemScroll = $(this);
		x = e.pageX;
		y = e.pageY;
		top = $(this).scrollTop();
		left = $(this).scrollLeft();
	});
	$("body").on('mousemove', function(e){
		if(down){
			var newX = e.pageX;
			var newY = e.pageY;
			elemScroll.scrollTop(top - newY + y);
			elemScroll.scrollLeft(left - newX + x);
		}
	}).on('mouseup', function(e){
		if(down) {
			e.preventDefault();
			down = false;
		}
	});
}

/************** COLORBOX CLOSING & CENTERING ***************/
function colorboxCloseEvents(){
    var cbox = $('#colorbox');
	$('.video-inline').each(function(){
		var videoContainer = $(this);
		var videoItem = $(this).find('object, iframe');
		videoContainer.css('padding-bottom', videoItem.attr('height') / videoItem.attr('width') * 100 + '%');
	});
	cbox.on("keydown", function() {
		if($(cbox).is(":focus")) {
			$("#colorbox #cboxClose" ).focus();
		}
	});
    cbox.on('click','#cboxLoadedContent',function(e){
        e.stopPropagation();
	});
    cbox.on('click', function(){
        $.colorbox.close();
	})
}

/************** STICKY HEADER !Deprecated #78277 ******************************/
var stickyH, stickyOffset, cookieH, winW;
function stickyHeader(elem) {
		if (elem.scrollTop() >= stickyOffset) {
			$('.page-wrapper').addClass('sticky-nav');
			$('#page').css('margin-top',stickyH + stickyOffset - cookieH);
		}
		else {
			$('.page-wrapper').removeClass('sticky-nav');
			$('#page').css('margin-top',0);
		}
}
function recalcSticky(){
	winW = $(window).width();
	$('#page').attr('margin-top',0);
	var sticky = $('.header-bottom');
	var stickyMobile = $('#header-bottom-middle-center-col');
	var cookie = $('.cookies-region');
	stickyH = sticky.outerHeight(true);
	cookieH = cookie.outerHeight(true);
	if (winW < 992) {
		if(!!$('#page').offset() && !!$('#page').offset().top){
			stickyOffset = $('#page').offset().top - stickyMobile.outerHeight(true);
			stickyH = stickyMobile.outerHeight(true);
		}
	} else {
		stickyOffset = $('.header-topbar').outerHeight(true) + cookie.outerHeight(true);
		stickyH = sticky.outerHeight(true);
	}
}

/* Links with layer class open colorbox*/
function layerLinksInit(){
	$('.layer').colorbox({
		iframe:true,
		fastIframe:false,
		className:'lo-layer',
		width: '100%',
		height: '100%',
		maxWidth: '725px',
		maxHeight: '90%',
		transition: 'fade',
		opacity: '0.4',
		onComplete: function(opts) {
			window.stop();
		}
	});
}

function log(msg){
	if(console){
		console.log(msg);
    }
}
/************** LLAMADAS **************************/
/* DOM Ready*/
function domReady(){
    classPageDomReady();
    stickyCheck();
    footerSearchPlaceholder();
    lolopoPlaceholder();
    // slider must be initialized after personalization
	//initSliderHome();

	testTabsWidth();
	testCarouselWidth();
	tabsHeight();

	dropdownEvents();
	tabsEvents();
	carouselEvents();
	galleryInit();
	videoInit();
	layerLinksInit();

	groupAnchorInit();
	hashUpdate();
	greyThumbs();
	openCMN();
	faqsDropdowns();
	searchFilters();
	horizontalScroll();
	colorboxCloseEvents();
	recalcSticky();
	iframeVideoAgente();
	// stickyHeader($(window)); !Deprecated #78277

	showActiveItensMenu();
	onPromotionClick();
	waitTimeToCloseMinisterialOrder(2000);
	
}

/*#61317 show active item menu */
function showActiveItensMenu(){
	var activeItensMenu = $('li.tabs-item.tabs-dropdown.active,li.tabs-item.single-link.active');
	moveTabElementToFullView(activeItensMenu);
}

/* Window Load */
function windowLoad(){
    checkFlexibility();
    classPageLoaded();
    tableResponsive();
}

/* Resize de Pagina */
function windowResize(){
	waitForFinalEvent(function(){
		testTabsWidth();
		testCarouselWidth();
		tabsHeight();
		recalcSticky();
		// stickyHeader($(window)); !Deprecated #78277
	}, 200, "resize");
}

/* Scroll de Pagina */
function windowScroll() {
	// stickyHeader($(window)); !Deprecated #78277
}

function doSliderCleanUp() {
	var count = $(".hm-slider-list").slick("getSlick").slideCount;
	if(typeof count !== undefined){
		if(count === 1){
			$('.hm-slider-b-play').remove();
		}
	}
}

function addSliderKeyboardEvents() {

	var count = $(".hm-slider-list").slick("getSlick").slideCount;
	if(typeof count !== undefined && count > 1){

		$("#header a[href]:visible:last").on("keydown", function(evt) {
			if($(window).width() > 991) {
				if(evt.which == 9) {
					if(!evt.shiftKey) {
						$(".main-promo a.slick-prev").focus();
						evt.preventDefault();
					}
				}
			}
		});

		$(".main-promo a.slick-prev").on("keydown", function(evt) {
			if(evt.which == 9) {
				if(evt.shiftKey) {
					$(window).scrollTop(0);
					$("#header a[href]:visible:last").focus();
					evt.preventDefault();
				}
				else {
					$(".main-promo .hm-slide a").focus();
					evt.preventDefault();
				}
			}
		});

		$(".main-promo .hm-slide a").on("keydown", function(evt) {
			if($(window).width() > 991) {
				if(evt.which == 9) {
					if(evt.shiftKey) {
						$(".main-promo a.slick-prev").focus();
						evt.preventDefault();
					}
					else {
						$(".main-promo a.slick-next").focus();
						evt.preventDefault();
					}
				}
			}
		});

		$(".main-promo a.slick-next").on("keydown", function(evt) {
			if(evt.which == 9) {
				if(evt.shiftKey) {
					$(".main-promo .hm-slide a").focus();
					evt.preventDefault();
				}
				else {
					$(".hm-slider .slick-dots button:first").focus();
					evt.preventDefault();
				}
			}
		});

		$(".hm-slider .slick-dots button:first").on("keydown", function(evt) {
			if($(window).width() > 991) {
				if(evt.which == 9) {
					if(evt.shiftKey) {
						$(".main-promo a.slick-next").focus();
						evt.preventDefault();
					}
				}
			}
		});

		$(".main-promo .hm-slider-b-play a").on("keydown", function(evt) {
			if(evt.which == 9) {
				if($(window).width() <= 991) {
					if(evt.shiftKey) {
						$(".main-promo .hm-slide.slick-active a").focus();
						evt.preventDefault();
					}
				}
			}
		});

		$(".main-promo a.slick-arrow").on("keydown", function(evt) {
			if(evt.which == 37) {
				$(".main-promo a.slick-prev").click();
			}
			else if(evt.which == 39) {
				$(".main-promo a.slick-next").click();
			}
		});

	}
}

function updateSlickArrowTitles(slick) {
	var prevSlider = slick.currentSlide - 1;
	var nextSlider = slick.currentSlide + 1;

	if(prevSlider < 0) {
		prevSlider = slick.slideCount - 1;
	}

	if(nextSlider >= slick.slideCount) {
		nextSlider = 0;
	}

	var prevTitle = $(".hm-slider .hm-slide[data-slick-index=" + prevSlider + "] a").attr("title");
	var nextTitle = $(".hm-slider .hm-slide[data-slick-index=" + nextSlider + "] a").attr("title");

	$(".main-promo a.slick-prev").attr("title", prevTitle);
	$(".main-promo a.slick-next").attr("title", nextTitle);
}

function updateSlickButtonTitles() {
	$(".hm-slider .slick-dots button").each(function(index, element) {
		var title = $(".hm-slider .hm-slide[data-slick-index=" + index + "] a").attr("title");
		$(element).attr("title", title);
	});
}

$(document).ready(function(){
    domReady();
});
$(window).on('load',function(){
    windowLoad();
});
$(window).on('resize', function(){
    windowResize();
});
$(window).on('scroll', function(){
	windowScroll();
});


$(window).on('load',function(){

	/*******************************************************/
	/** Gestión de menú principal/ #56864 START **/
	/*******************************************************/


	//doMenuPanel();


	/******************************************************/
	/** Gestión de menú principal / #56864 END  **/
	/*****************************************************/


	/************************************************/
	/** Panel de cotización / #56764 START **/
	/************************************************/

	//doQuotePanel();

	var doQuoteSnippet =  (function(){
		/**
		 Retrieves the HTML from .html-snippet elements with data-target attributes.
		 **/
		var selector = ".cotizacion .html-snippet[data-target]";

		if (!$(selector).attr("data-target")) {
			return ;
		}

		var targetData = $(selector).attr("data-target");

		$.get(targetData, function(data){
			$(selector).html(data);
		}).fail(function(e) {
			log("Could not load html snippet target");
			log(e);
		});

	})();


	/**********************************************/
	/** Panel de cotización / #56764 END  **/
	/**********************************************/






	/*****************************************************/
	/**  #56715 / Lazy load de imágenes START **/
	/*****************************************************/
	var doImgLazyLoad =  (function(){


		//$(window).on('load', function () {

		if ($().unveil){
			$("img[data-src]").unveil(100, function() {
				$(this).on('load',function() {
					$(this).addClass('lazy-loaded');
				});
			});
		}
		//});
	})();

	/**************************************************/
	/**  #56715 / Lazy load de imágenes END **/
	/**************************************************/

});


$(document).ready(function(){


		var panelLoadFunction = function(obj, showOnLoad, loadCallback){
			$(".freeContent.panels").slideDown();
			$(".freeContent.panels>.loading").show();


			/**
				Function used to fetch the contents of a panel. It is used on both lazy and document ready loading of panels.
				It retrieves the data from the data-panel-target attribute and appends it to the .freeContent.panels element, wrapped in a div with the  id fetched from the data-target attribute.
			**/
			var targetPanel = $($(obj).attr("href"));
			var targetContent = $(obj).attr("data-panel-target");

			var holderElement = $(obj).attr("data-panel");
			holderElement = holderElement.indexOf("#") == 0 ? holderElement.substr(1) : holderElement; // Tests if starts with #

			var thisPanel;
			if ($("#" + holderElement).length){
				thisPanel = $("#" + holderElement);
			}else{
				thisPanel = $("<div />");
				thisPanel.attr("id", holderElement);
				$(".freeContent.panels").append(thisPanel);
			}

			if (typeof targetContent !== typeof undefined && targetContent !== false) {
				$.get(targetContent, function(data){
					data = data.replace(/rel="stylesheet"/g, '');  // REMOVE DELETE MOCK :: Removing Associated Styles from the data (using ajax.jsp from old site that includes conflicting styles).
					data = data.replace("var timestamp = new Date().valueOf() $(this)", "var timestamp = new Date().valueOf(); $(this)");
					thisPanel.html(data);

					if (showOnLoad){
						thisPanel.slideDown();
					}
					if (loadCallback && typeof loadCallback == 'function'){
						loadCallback();
					}

					$(".freeContent.panels>.loading").hide();
				}).fail(function(e) {
					log("Could not load data-panel-target.");
					log(e);
				});
			}
		};


		var doMenuPanel = function(){
			/**
				Sets the « loading of panels, activated on the document ready event, of elements with data-panel-target attribute
			**/

			if (loadedMenu){
				return ;
			}

			loadedMenu = true;

			var tabs = [];
			$.each($(".menuToggle .menu-tab-links span.menu-tab-link"), function(idx, obj){

				var thisTab = { idx: idx };

				thisTab.title = $(obj).attr("data-attr-name");

				var url = $(obj).attr("data-attr-href") + "&ajax=1";
				if(!!url && url.indexOf(".html")!=-1){url = $(obj).attr("data-attr-href");}
				thisTab.href = url;
				thisTab.generatedId = $(obj).attr("data-attr-genId");
				thisTab.image = $(obj).attr("data-attr-image");
				tabs.push(thisTab);
			});


			var thisPanel = $("<div />");
			thisPanel.attr("id", "panel-menu");
			$(".freeContent.panels").append(thisPanel);

			var resultsTemplate = $("#menu-panel-template").html();
			var panelMenu = $("#panel-menu");

			if(!!resultsTemplate && !!panelMenu){
	            if(typeof Mustache != "undefined") {
	                var html = Mustache.render( resultsTemplate, {tabs: tabs } ) ;
	                panelMenu.html(html);
	            }

				$.each(tabs, function(idx, obj){
					$.get(obj.href, function(data){
						data = data.replace("var timestamp = new Date().valueOf() $(this)", "var timestamp = new Date().valueOf(); $(this)");
						$("#panel-menu .tabs-contents .tabs-content[data-target-id='content-" + idx + "']").append(data);
					});
				});

				$("#panel-menu .tabs-items .tabs-item:eq(1) .tabs-item-title").addClass("tabs-item-title-active");
				$("#panel-menu .tabs-contents .tabs-content:eq(1)").show();
				$("#panel-menu .tabs-items .tabs-item:eq(1) .tabs-item-title").closest("li").attr("aria-selected", "true");

				$("#panel-menu li.tab-opener").on('click', function(ev){
					var thisTarget = $(this).attr("data-target");

					$(this).parents(".tabs-group").find(".tabs-content").hide();
					$(this).parents(".tabs-group").find(".tabs-content[data-target-id=" + thisTarget + "]").show();
					$("#panel-menu img").unveil(100, function() {
						$(this).on('load',function() {
							$(this).addClass('lazy-loaded');
						});
					});
					$(this).siblings().attr('aria-selected', false);
					$(this).attr('aria-selected', true);

					$(this).siblings(".tab-opener").find(".tabs-item-title-active").removeClass("tabs-item-title-active");
					$(this).find(".tabs-item-title").addClass("tabs-item-title-active");

					$(this).parents(".tabs-group").find(".tabs-content[data-target-id=" + thisTarget + "] a:visible:first").focus();
				});
			}
		};

		var doQuotePanel = function(){
			/**
				Sets the lazy loading of panels, activated on the click event of elements with data-panel-target attribute
			**/

			$(".cotizacion [data-panel-target]").on('click', function(){
				var panelId = $(this).attr("data-panel");
				panelId = (panelId.indexOf("#") == 0 ? panelId : "#" + panelId);
				if ($(panelId).length == 0){ // Only loads panel if it wasn't loaded before
					panelLoadFunction(this, true, function() {
						$(panelId + " a:visible:first").focus();
					});
				}
			});

		};

		// Window load extraído

		$(".menuToggle .menuOpen [data-panel-target]").on('click', function(){
			doMenuPanel();
		});

		var doModals =  (function(){
			/**
				Prepares colorboxes (modals) based on elements classes.
			**/
			if (!$.colorbox){
				return; // No colorbox defined
			}

			$(".simple_modal").colorbox({
				rel:'simple_modal',
				scrolling:'false',
				transition:"none",
				opacity:0.9,
				width:"100%",
				height:"100%"
			});

			$(".video-modal").colorbox({
				iframe:true,
				innerWidth:1024,
				innerHeight:768,
			});

			$(".lt.apl.tarjetas .iframe ").colorbox({
				iframe:true,
				width:"100%",
				height:"100%",
				innerWidth:700,
				innerHeight:768,
                className:'apl_tarjetas'
			});

			$(".iframe-modal").colorbox({
				iframe:true,
				opacity:0.3,
				innerWidth:700,
				innerHeight:768,
			});
		})();


		var doLinkGroupEvents =  (function(){
			/**
				Toggles the link-group-dropdown visibility when clicking a link-group-head.
				Ex.: Info Corporativa
			**/
			$('.link-group-head').on({
				'click': function () {
					if ($(this).siblings(".link-group-dropdown:visible").length == 0){
						$(this).find("a").attr("aria-expanded", "true");
						showOverlay('tooltip');
						$(this).siblings(".link-group-dropdown").slideDown();
					}else{
						$(this).find("a").attr("aria-expanded", "false");
						$(this).siblings(".link-group-dropdown").slideUp();
						closeAllPanels();
					}
				}
			 });

			$(".link-group-head").on("keydown", function(evt) {
				if(evt.which == 27) {
					$(this).siblings(".link-group-dropdown").slideUp();
					closeAllPanels();
				}
			});

		})();


		var doHideLinkGroups =  (function(ev){
			/**
				Hides all .link-group-dropdowns on window scroll and when clicking anywhere outside a .link-group.
			**/
			$(document).on('click', function(ev){
				if ($(ev.target).parents(".link-group").length == 0){
					$(".link-group-dropdown").hide();
				}
			});
		})();






		/********************************************/
		/**  Enlaces Menú / #56758 START **/
		/******************************************/


		var hideMenu = function(){
			$(".menuToggle .menuClose").hide();
			$(".menuToggle .menuOpen").show();

			$(".freeContent.panels").find("#panel-menu").slideUp();
			$(".freeContent.panels").slideUp();
		};

		var hideMenuMobile = function(){
			if ($(".hm-slider-list.slick-initialized") && !$(".hm-slider-b-play a").hasClass("paused")){
				$(".slick-slide:not(.slick-active)").width(0);
				$(".slick-slide.slick-active").width($(window).width());
				$(".slick-slide.slick-active").css("left", "0px");
			}
			if(!$(".freeContent.panels").find("#panel-menu").hasClass("closing")) {
				$(".freeContent.panels").find("#panel-menu").addClass("closing").animate({'left':'-100%'},400, function() {

					$(".menuToggle .menuClose").hide();
					$(".menuToggle .menuOpen").show();

					$(".freeContent.panels").find("#panel-menu").removeClass("closing").css('display','none');
					$(".freeContent.panels").css('display','none');
					closeAllPanels();
				});
				$(".freeContent.page").css('display','block').animate({'left':'0px'},400, function() {
					$(".freeContent.page");
				});
			}
		};

		var isShowingMenu = function(){
			return $(".freeContent.panels:visible").length > 0 && $(".freeContent.panels #panel-menu:visible").length > 0;
		};

		var closeAllPanels = function(){
			if (isShowingMenu()){
				hideMenu();
			}

			$(".panel-expanded").removeClass("panel-expanded");
			setAllAttribute($(".cotizacion").find("a"), "aria-expanded", "false");

			$(".mobile-link-open:visible").siblings(".mobile-layer:visible").slideUp();
			setAllAttribute($(".mobile-link-open").find("a"), "aria-expanded", "false");
			setAllAttribute($(".mobile-link-open").find("a"), "aria-haspopup", "false");

			// Hides link groups dropdowns
			$(".link-group-dropdown").hide();
			setAllAttribute($(".link-group .link-group-head").find("a"), "aria-expanded", "false");

			// Hides open panels
			$(".freeContent.panels").children("div:visible").slideUp();
			$(".freeContent.panels").slideUp();
			setAllAttribute($(".menuToggle > .menuOpen").find("a"), "aria-expanded", "false");
			setAllAttribute($(".menuToggle > .menuOpen").find("a"), "aria-haspopup", "false");

			// Hides overlay
			$("#panels-overlay").fadeOut();

			// Removes page-wrapper overlay classes
			$(".page-wrapper").removeClass (function (index, css) {
				return (css.match (/(^|\s)overlay-\S+/g) || []).join(' ');
			});
		};

		function setAllAttribute(selector, attribute, value){
			if(selector !== undefined && selector.length > 0){
				if(selector.length > 1){
					var i;
					for(i=0; i< selector.length; i++){
						updateSelectorAttribute($(selector[i]), attribute, value);
					}
				}
				else {
					updateSelectorAttribute(selector, attribute, value);
				}
			}
		}

		var toggleMenu = function(action){

			action = action == null ? ($(".menuOpen:visible").length > 0 ? 'close' : 'show') : action;

			if (action == 'show'){
				var $e = $(".menuOpen");

				var holderElement = $e.find("a[data-panel]").attr("data-panel");
				holderElement = holderElement.indexOf("#") == 0 ? holderElement.substr(1) : holderElement; // Tests if starts with #

				updateSelectorAttribute($e.find("a"), "aria-expanded", "true");
				updateSelectorAttribute($e.find("a"), "aria-haspopup", "true");

				if($(window).width() < 991) {

					if(!$(".freeContent.panels").find("#" + holderElement).hasClass("opening")) {

						if ($(".freeContent.panels div:visible").length > 0){
							$(".freeContent.panels>div").hide();
							$(".panel-expanded").removeClass("panel-expanded");
						}

						$(".freeContent.panels").css('display','block');
						$(".freeContent.panels").find("#" + holderElement).addClass("opening").css('display','block').animate({'left':'0px'},400, function() {
							$e.hide();
							$e.siblings(".menuClose").show();

							$(".freeContent.panels").find("#" + holderElement).removeClass("opening");
							$(".freeContent.panels").find("#" + holderElement + " .tabs-items-scroll a:first").focus();
						});
						$(".freeContent.page").animate({'left':'100%'},400, function() {
							$(".freeContent.page").css('display','none');
						});
					}

					var vwHeight=$(window).height();
					var headerHeight = $("#header").height();
					//Calculamos la altura de la fila de botones hazte cliente-linea abierta
					var lineaAbiertaHeight = $("#hc-header-mobile-link").height();
					$(".freeContent.panels").height(vwHeight - headerHeight + lineaAbiertaHeight);

					$(".freeContent.panels").addClass("mb-open");
					$("html").addClass("no-scroll");
				}else {
					$e.hide();
					$e.siblings(".menuClose").show();

					if ($(".freeContent.panels div:visible").length > 0){
						$(".freeContent.panels>div").hide();
						$(".panel-expanded").removeClass("panel-expanded");
					}

					$(".freeContent.panels").find("#" + holderElement).show();
					$(".freeContent.panels").slideDown();
					$(".freeContent.panels").find("#" + holderElement + " .tabs-items-scroll a:first").focus();
				}


				showOverlay('panel');
				$("#header").addClass("menu-open");

				$("#panel-menu img").unveil(100, function() {
					$(this).on('load',function() {
						$(this).addClass('lazy-loaded');
					});
				});
			}

			if (action == 'close'){
				var $e = $(".menuClose");

				var holderElement = $e.siblings(".menuOpen").find("a").attr("data-panel");
				holderElement = holderElement.indexOf("#") == 0 ? holderElement.substr(1) : holderElement; // Tests if starts with #

				updateSelectorAttribute($e.find("a"), "aria-expanded", "false");
				updateSelectorAttribute($e.find("a"), "aria-haspopup", "false");

				if($(window).width() < 991) {
					hideMenuMobile();
				}
				else {
					hideMenu();
					closeAllPanels();
				}
				$(".freeContent.panels").removeClass("mb-open");
				$("html").removeClass("no-scroll");
				$("#header").removeClass("menu-open");
			}

			if($( document ).width()<=993) {
				$('.menu-linkgroup-heading').on('click', function () {
					if ($(this).parent().find(".menu-linkgroup-links").css("display")=="block"){
						$(this).removeClass("active");
						$(this).parent().find(".menu-linkgroup-links").slideUp();
					}
					else{
						$(".menu-linkgroup-links").css("display","none");
						$(".menu-linkgroup-heading").removeClass("active");
						$(this).addClass("active");
						$(this).parent().find(".menu-linkgroup-links").slideDown();
					}

				})
			}

			if($(window).width() < 992){
				$("#panel-menu").attr("aria-labelledby", "modalTitle");
			}
			else {
				$("#panel-menu").removeAttr("aria-labelledby");
			}
		};


		$(".menuOpen").on('click', function(ev){
			toggleMenu('show');
		});

		$(".menuClose").on('click', function(ev){
			toggleMenu('close');
		});

		$("#panels-overlay").on('click', function(){
			closeAllPanels();
		});


		/****************************************/
		/** Enlaces Menú / #56758 END **/
		/***************************************/

		/******************************************/
		/**  Search menu trigger / ##56759 START **/
		/****************************************/


		$("header .menuSearch").on('click', function(){
			if($(this).hasClass("open")){
				$(this).removeClass("open");
				toggleSearchMenu("close");
				toggleMenu("show");
			}else{
				$(this).addClass("open");
				toggleSearchMenu("show");
			}
		});


		var toggleSearchMenu = function(action){
			$(".freeContent.panels").hide();
			action = action == null ? ($(".search-trigger.menuSearchOpen:visible").length > 0 ? 'close' : 'show') : action;
			if (action == 'show'){
				$("#header").removeClass("menu-open");
				$("#header").addClass("search-open");
				$("#search-field").focus();
			}

			if (action == 'close'){
				$("#header").removeClass("search-open");
				$("#header").addClass("menu-open");
				toggleMenu('show');
			}
		};

		/******************************************/
		/**  Search trigger / ##56759 END **/
		/****************************************/

		/******************************************/
		/**  Menú interior / #56766 START **/
		/****************************************/
		var doInnerMenuEvents = (function(){
			$(".tabs-dropdown").children('a').on('click', function(ev){
				var $this = $(this);
				$this.closest('.tabs-items').find(".expanded").removeClass("expanded");
				if ($this.siblings(".tab-dropdown.tab-dropdown-open").length > 0){
					$this.closest('.tabs-dropdown').addClass('expanding');
					$this.siblings(".tab-dropdown").slideUp(function(){
						$this.closest('.tabs-items').find(".expanding").removeClass('expanding');
						$this.closest('.tabs-items').find(".tab-dropdown-open").removeClass('tab-dropdown-open');
					});
				} else {
					$this.closest('.tabs-items').find(".tab-dropdown").hide();
					$this.closest('.tabs-items').find(".tab-dropdown-open").removeClass('tab-dropdown-open');
					$this.siblings('.tab-dropdown').slideDown(function(){
						$this.siblings(".tab-dropdown").addClass('tab-dropdown-open');
						$this.siblings(".tab-dropdown").find("a:visible:first").focus();
					});
					$this.closest('.tabs-dropdown').addClass("expanded");
				}

				moveTabElementToFullView($this.closest('li.tabs-item.tabs-dropdown'));
			});

			$(".tabs-items .tabs-item.single-link").children('a').on('click', function(ev){
				var $this = $(this);
				var $tabItem = $this.parent(".single-link");
				if ($tabItem.siblings(".expanded").length > 0){
					var $expanded = $tabItem.siblings(".expanded");
					$expanded.addClass('expanding');
					$expanded.find(".tab-dropdown").slideUp(function(){
						$expanded.removeClass('expanding');
						$expanded.find(".tab-dropdown-open").removeClass('tab-dropdown-open');
					});
					$expanded.removeClass("expanded");
					$expanded.removeClass("active");
				}
			});


			$(".main-title.full-width").find('a').on('click', function(ev){
			   $(ev.target).parents(".main-title").siblings(".submenu-linkgroup").slideToggle();
			   $(ev.target).parents(".main-title").toggleClass("expanded");
			});
		})();

		/**************************************/
		/** Menú interior / #56766 END **/
		/*************************************/

		/**********************************************************/
		/**  Grupo de enlaces de footer / #56767 START **/
		/*********************************************************/
		var doFooterMenuEvents =  (function(){


			$(".footer .link-group-title a").on('click', function(e){

				if ($(this).parents(".col-links").find(".link-group-links:not(:visible)").length == 0){
					return ;
				}

				if ($(this).closest('.link-group-title').siblings(".link-group-links:visible").length > 0){
					e.preventDefault();
					$(this).removeClass('expanded').closest('.link-group-title').siblings(".link-group-links").slideUp();
				}else{
					e.preventDefault();
					$(this).parent().parent().siblings("div").find(".link-group-links").slideUp();
					$(this).addClass('expanded').closest('.link-group-title').siblings(".link-group-links").slideDown().find("img[data-src]").trigger("unveil");
				}
			});

		})();
		/******************************************************/
		/** Grupo de enlaces de footer / #56767 END **/
		/******************************************************/



		/******************************************************/
		/**  Enlaces Top / #56753 START **/
		/******************************************************/
		var doTopLinksEvents =  (function(){
			$(".mobile-link-open").on('click', function(ev){
				var thisTarget = $(ev.target).hasClass("mobile-link-open") ? $(ev.target) : $(ev.target).parents(".mobile-link-open");

				if (thisTarget.siblings(".mobile-layer:visible").length == 0){
					showOverlay('tooltip');
					thisTarget.siblings(".mobile-layer").slideDown(400, function(evt) {
						$(this).find(".links-group-panel-links a:first").focus();
					});

					updateSelectorAttribute(thisTarget.find("a"), "aria-expanded", "true");
					updateSelectorAttribute(thisTarget.find("a"), "aria-haspopup", "true");

				}else{
					thisTarget.siblings(".mobile-layer").slideUp();
					closeAllPanels();

					updateSelectorAttribute(thisTarget.find("a"), "aria-expanded", "false");
					updateSelectorAttribute(thisTarget.find("a"), "aria-haspopup", "false");
				}

			});

			$(".mobile-layer .mobile-layer-header a.close").on('click', function(ev){
				$(window).scrollTop(0);
				$(ev.target).parents(".mobile-layer").slideUp();
				closeAllPanels();
			});

			if (typeof neoCurrentBreadcrumb !== 'undefined') {
				if (neoCurrentBreadcrumb && neoCurrentBreadcrumb.length > 0 && $(".header-top .channel-link-" + neoCurrentBreadcrumb[0]).length > 0){
					$(".header-top .channel-link-" + neoCurrentBreadcrumb[0] + " a").addClass("current");

					//if(neoCurrentBreadcrumb.length == 2){
						$(".header-top .channel-link-" + neoCurrentBreadcrumb[1] + " a").addClass("current");
					//}
					if(neoCurrentBreadcrumb.length == 3){
						$(".header-top .channel-link-" + neoCurrentBreadcrumb[2] + " a").addClass("current");
					}
				}
			}

		})();




		/****************************************************/
		/** Enlaces Top / #56753 END **/
		/****************************************************/


		/******************************************************/
		/**  Buscador en cabecera / #56759 START **/
		/******************************************************/


		$("div.search-group[id]").each(function(idx){
			var friendly=$(this).attr("id");
			if(friendly != undefined && friendly != ""){
				$.get(NeoSearch.autoFetchLink[friendly], function(dataSuggestion){
						var suggestions = $(dataSuggestion).find("#suggestions");
						if(!NeoSearch.suggestions){
							NeoSearch.suggestions =  [];
						}
						NeoSearch.suggestions[friendly]=suggestions;
					}).fail(function(e) {
						log("Could not load presearch link content.");
						log(e);
					});
			}
		});

		var doSearchFormEvents =  (function(){
			var lastSearch;

			/* Prebuscador header */
			var applyPreSearchTemplate = function(data, hasResults, target, friendlyID ){

				var searchGroupDiv = $(target).closest(".search-group");
				var suggestedResultsDiv = $(searchGroupDiv).find(".presearch-results .ps-block.ps-suggested-results");
				var presearchResults = $(searchGroupDiv).find(".presearch-results");
				var templateForResults = $(searchGroupDiv).parent().find(".presearch-component script[type='text/x-template']");
				var bannerOfficesDiv = $(searchGroupDiv).find(".ps-offices-banner");
				var searchQuery = removeNotAllowedCharacters($(target).val());

				if(!hasResults && friendlyID){
					data = $.extend(data,  {defaultSuggestions: NeoSearch.defaultSuggestions[friendlyID]});
				}

				if (hasResults)
				{
					// por defecto SIEMPRE se pintan las sugerencias en modo invisible
					if(NeoSearch.suggestions && NeoSearch.suggestions[friendlyID]){
						var suggestions = $(NeoSearch.suggestions[friendlyID]);
						NeoSearch.oldAutoFetchLink = NeoSearch.autoFetchLink[friendlyID];
						if(filterSuggestions(searchQuery,suggestions)){
							$(suggestions).show();
							data.resultData = $.extend(data.resultData,  {widget: suggestions.html()});
						}
					}

					//unencode videos
					if(data.resultData.products != undefined){
						$.each(data.resultData.products.items, function(i, v) {
					        var unencodeStr = v.video;
							unencodeStr = $("<div/>").html(unencodeStr).text();
							v.video=unencodeStr;


					    });
					}
					if(data.resultData.videos != undefined){
						$.each(data.resultData.videos.items, function(i, v) {
					        var unencodeStr = v.video;
							unencodeStr = $("<div/>").html(unencodeStr).text();
							v.video=unencodeStr;


					    });
					}

				}


				// comprobar keyword para banner de oficinas, si no cumple o hay oficinas se muestra el resto de la busqueda
				if(showOfficesBanner(searchQuery,friendlyID) && data.resultData != undefined && data.resultData.oficinas == undefined){
					$(bannerOfficesDiv).show();
				}else{

					var html = Mustache.render( $(templateForResults).html(), {data: data } ) ;
					$(presearchResults).prepend(html);

					$("div[id=mustache-video-products-0]").each(function() {renderMustacheVideo(this);});
					$("div[id^=mustache-videos-video]").each(function() {renderMustacheVideo(this);});

					$( ".video-gsa-meta" ).on( "click", function() {
						if(!$(this).hasClass("oneTime")) {
							$(this).addClass("oneTime");
							var type = "Videos";
							registerOmnitureByType(type,this);
						}
					});

					addOmnitureEventsToResults();

				}
			};

			function filterSuggestions(pattern,target){
				var keywordsList =  $(target).find("#suggestion-keywords-filter");
				if(keywordsList == null || keywordsList.html() == undefined || pattern == null) return false;
				var keywordsArray = keywordsList.html().split(',');
				pattern=pattern.toLowerCase();
			    pattern=removeAccents(pattern);
				for (i = 0; i < keywordsArray.length; i++) {
				    keyword = $.trim(keywordsArray[i]).toLowerCase();
				    if(pattern.indexOf(keyword) !== -1){
				    	return true;
				    }
				}
				return false;
			}

			function showOfficesBanner(pattern,friendlyID){
				if(NeoSearch.bannerOfficeKeywords == undefined || NeoSearch.bannerOfficeKeywords[friendlyID] == undefined) return false;
				var keywordsList =  NeoSearch.bannerOfficeKeywords[friendlyID][0];
				if(keywordsList == null ||  pattern == null) return false;
				var keywordsArray = keywordsList.split(',');
			    pattern=pattern.toLowerCase();
			    pattern=removeAccents(pattern);
				for (i = 0; i < keywordsArray.length; i++) {
				    keyword = $.trim(keywordsArray[i]).toLowerCase();
				    if(pattern.indexOf(keyword) !== -1){
				    	return true;
				    }
				}
				return false;
			}

			var removeAccents = (function() {
			  var translate_re = /[áàéèíìóòúù]/g;
			  var translate = {
			    "á": "a", "à": "a", "é": "e","è": "e","í": "i","ì": "i","ó": "o","ò": "o","ú": "u","ù": "u"
			  };
			  return function(s) {
			    return ( s.replace(translate_re, function(match) {
			      return translate[match];
			    }) );
			  }
			})();

			function clearResults(target,searchGroupDiv){
				var loadingDiv = $(searchGroupDiv).find(".ps-searching");
				var noMoreResultsDiv = $(searchGroupDiv).find(".ps-more-results");
				var bannerOfficesDiv = $(searchGroupDiv).find(".ps-offices-banner");

				$(loadingDiv).hide();
				$(noMoreResultsDiv).hide();
				$(bannerOfficesDiv).hide();

				$(target).empty();
				$(target).append(loadingDiv);
				$(target).append(noMoreResultsDiv);
				$(target).append(bannerOfficesDiv);

				$(searchGroupDiv).find(".search-result").css("border","");


			}
			
			//Remove not allowed characters on search
			function removeNotAllowedCharacters(string){
				var notAllowedCharacters =  /['"]/g;
				return string.replace(notAllowedCharacters, '');
			}
			
			/*
			 * Function doPreSearch (doShowDefaultSuggestions, target)
			 *
			 * 	Call the service JSONP for results and parse it into the HTML.
			 *
			 * 	- doShowDefaultSuggestions: boolean flag to show default suggestions or not
			 *  - target: element which fires the event (onclick, focus, onkeyup)
			 *
			 */

			var doPreSearch = function(doShowDefaultSuggestions, target){

				var searchGroupDiv = $(target).closest(".search-group");
				var loadingDiv = $(searchGroupDiv).find(".ps-searching");
				var noMoreResultsDiv = $(searchGroupDiv).find(".ps-more-results");
				var preSearchDiv = $(searchGroupDiv).find(".presearch-results");
				var bannerOfficesDiv = $(searchGroupDiv).find(".ps-offices-banner");
				var friendlyID = $(searchGroupDiv).attr("id");

				$(loadingDiv).hide();

				var searchQuery = removeNotAllowedCharacters($(target).val());

				//If the search is the same than last search, then do nothing
				if (searchQuery != null && searchQuery.length > 0 && searchQuery == lastSearch){
					return ;
				}
				// Otherwise,proceed with the search
				lastSearch = searchQuery;

				//clean previous search result keeping up the loading, nomore divs
				clearResults(preSearchDiv,searchGroupDiv);

				if (searchQuery == null || searchQuery.length < 4){
					// only shows suggestions if the search field is empty
					if (doShowDefaultSuggestions && (searchQuery == null || searchQuery == "")){
						applyPreSearchTemplate({ },false,target,friendlyID);
					}else{// caso menos de 4 caraceters, se muestra el no hay resultados
						$(searchGroupDiv).find(".search-result").css("border", "0px");
					}
					return;
				}
				//Starts with preloading layer
				$(loadingDiv).show();
				$.ajax({
					url: NeoSearch.presearchUrl + "?q=" + searchQuery,
					dataType: "jsonp",
					jsonp: 'prebuscador',
					jsonpCallback: 'prebuscador',
					contentType: "text/javascript",
					error: function(err){
						$(loadingDiv).hide();
						$(noMoreResultsDiv).show();
						log(err);
					},
					success: function(json){
						//clean previous search result keeping up the loading, nomore divs
						clearResults(preSearchDiv,searchGroupDiv);
						if(json != undefined && json != ''){
							var resultData = NeoSearch.processPresearchJson(json);
							applyPreSearchTemplate({ resultData: resultData }, true, target, friendlyID);
							// comprobacion si solo tenemos videos, no se muestran resultados
							if(resultData.products == undefined &&  resultData.faqs == undefined && resultData.oficinas == undefined && resultData.maybe == undefined && resultData.widget == undefined && resultData.videos != undefined )
								$(noMoreResultsDiv).show();
					 	}else{
					 		$(noMoreResultsDiv).show();
							console.log("Presearch returns zero results");
						}
					}
				});
			};
			
			$('[id*="prebuscador"]').find(".search").find("form").on('submit', function () {
				var searchInput = $('[id*="prebuscador"]').find(".search").find("form").find("#search-field");
				searchInput.val(removeNotAllowedCharacters(searchInput.val()));
			});

			$(".search-group .search form").on('click', function(){
			   $(this).find(".search-field").focus();
			});

			$(".search-field").on('focus', function(ev){
				var $target = $(ev.target).parent();
				if ($target.find("form:visible").length == 0){

					$target.find("form").show();
					$target.find("form").removeClass("blurred");
					$target.find("form #search-field").focus();

					doPreSearch(true,ev.target);


					$target.parents(".search-group").find(".search-result").slideDown();
				}
			});

			var mouseOnResults = false;
			$(".search-result").on('mousedown', function(ev){
				log("mousedown search");
				ev.preventDefault();
			});

			$(".search-result").on('mouseenter', function(){
				mouseOnResults = true;
			}).on('mouseleave', function(){
				mouseOnResults = false;
			});

			$(".search-result").on('blur', function(){

				ev.preventDefault();
				$(this).slideUp();
			});

			$(window).on('click', function(ev){
				if ($(ev.target).parents(".search-group").length > 0){
					return;
				}
				if (!mouseOnResults && $(".search-result:visible").length > 0){
					$(".search-result").slideUp();
				}
			});

			$(".search-field").on('blur', function(ev){
				if (mouseOnResults){
					return ;
				}
				ev.preventDefault();
				$(ev.target).parents(".search-group").find(".search-result").slideUp();
			});

			var delay = (function(){
				  var timer = 0;
				  return function(callback, ms){
				    clearTimeout (timer);
				    timer = setTimeout(callback, ms);
				  };
			})();

			$(".search-field").on('keyup', function(ev){
				$(ev.target).closest("presearch-component");
				 delay(function(){
					 doPreSearch(false,ev.target);
				    }, 250 );
			});
		})();


		/****************************************************/
		/** Buscador en cabecera / #56759 END **/
		/****************************************************/




		/******************************************************/
		/**  Desplegable de idiomas / #56756 START **/
		/******************************************************/
		var doLanguageLinks =  (function(){

			$("#desplegable-idiomas .links-group-panel-links>ul:eq(0)").on('click', function(ev){
				// ev.preventDefault();
				$(ev.target).parents(".links-group-panel-links").find("ul:not(:eq(0))").toggle();
			});

			var currentLang = $("html").attr("lang");
			$("#desplegable-idiomas").find("ul li a[hreflang^=" + currentLang + "]").addClass("active");

		})();
		/******************************************************/
		/**  Desplegable de idiomas / #56756 END **/
		/******************************************************/




		/******************************************************/
		/**  XX - xxxxxx / #xxxxx START **/
		/******************************************************/
		var doTemplate =  (function(){
			/**

			**/
		})();
		/****************************************************/
		/** XX - xxxxxx / #xxxx END **/
		/****************************************************/





		$(".cotizacion a").on('click', function(ev){

			var cotizacionA = $(ev.target);
			if(!cotizacionA.is("a[data-panel]")) {
				cotizacionA = $(ev.target).parents("a[data-panel]")
			}
			var cotizacionButton = cotizacionA.find(">span>span");
			var holderElement = cotizacionA.attr("data-panel");
			holderElement = holderElement.indexOf("#") == 0 ? holderElement.substr(1) : holderElement; // Tests if starts with #
			if (cotizacionButton.hasClass("panel-expanded")){

				// Hide Panel
				cotizacionButton.removeClass("panel-expanded");
				$(".freeContent.panels").find("#" + holderElement).slideUp();
				$(".freeContent.panels").slideUp();
				cotizacionA.attr("aria-expanded", "false");
				closeAllPanels();
			}else{
				// Show Panel

				if (isShowingMenu()){
					hideMenu();
				}

				cotizacionButton.addClass("panel-expanded");

				$(".freeContent.panels").find("#" + holderElement).show();
				$(".freeContent.panels").slideDown();

				$(".freeContent.panels").find("#" + holderElement + " a:visible:first").focus();
				cotizacionA.attr("aria-expanded", "true");
				showOverlay('panel');
			}
		});





		/******************************************************/
		/**  PORTAL-4772T3 / #59954 - Omniture Prebuscador START **/
		/******************************************************/

		function addOmnitureEventsToResults(){
			$(".presearch-results .ps-block").on("click", "a",function(){
				var type;
				var parentClass = $(this).parent().parent().parent().parent();
				if($(parentClass).hasClass("ps-products")){
					type = "Comercial";
				}else if($(parentClass).hasClass("ps-faqs")){
					type = "Faqs";
				}else if($(parentClass).hasClass("ps-offices-results")){
					type="Oficinas";
				}
				registerOmnitureByType(type,this);
				return true;
			});
		}

		function registerOmnitureByType(type,element){

			var keyword = $("#search-field").val();
			var position = $(element).parent().index();
			var title = $(element).attr("title");
			if(title == undefined || title === "") title="sin titulo";
			log("type:"+type+", keyword:"+keyword+", position:"+position+", title:"+title);

			s=s_gi(s_account);
			s.linkTrackVars="eVar20,prop20,eVar21,prop21,eVar23,prop23,eVar51,prop51,eVar68,prop68, events";
			s.linkTrackEvents="event23";
			s.eVar20=keyword;
			s.prop20=s.eVar20;
			s.prop21="Pre-Buscador";
			s.eVar21=s.prop21;
			s.eVar23=position;
			s.prop23=s.eVar23;
			s.eVar51=title;
			s.prop51=s.eVar51;
			s.eVar68=type;
			s.prop68=s.eVar68;
			s.events="event23";
			s.tl(this,'o','Click resultado '+type);
		}
		/******************************************************/
		/**  PORTAL-4772T3 / #59954 - Omniture Prebuscador END **/
		/******************************************************/


		/******************************************************/
		/**  Desplegables revision foco / #60696 START **/
		/******************************************************/

		// event listeners to close menus with keyboard navigation
		$("#desplegable-idiomas").on("keydown", function(evt) {
			var closeMenu = false;

			if(evt.which == 9) {
				// on mobile, cycle through the menu
				if($(window).width() < 991) {
					if(evt.shiftKey) {
						if($("#desplegable-idiomas .mobile-layer-header>a").is(":focus")) {
							$("#desplegable-idiomas li>a:last").focus();
							evt.preventDefault();
						}
					}
					else {
						if($("#desplegable-idiomas li>a:last").is(":focus")) {
							$("#desplegable-idiomas .mobile-layer-header>a").focus();
							evt.preventDefault();
						}
					}
				}
				// on desktop, close the menu when tabbing out
				else {
					// actions with shift+tab
					if(evt.shiftKey) {
						closeMenu = closeMenu
							|| $("#desplegable-idiomas li>a:first").is(":focus")
							|| $("#desplegable-idiomas>.mobile-link-open>a").is(":focus")
					}
					// actions with tab
					else {
						closeMenu = closeMenu
							|| $("#desplegable-idiomas li>a:last").is(":focus")
					}
				}
			}
			else if(evt.which == 27) {
				closeMenu = true;
			}

			if(closeMenu) {
				$("#desplegable-idiomas .mobile-layer").slideUp();
				closeAllPanels();
			}

		});
		$("#desplegable-idiomas").next().on("keydown", function(evt) {
			var closeMenu = false;

			if(evt.which == 9) {
				// actions with shift+tab
				if(evt.shiftKey) {
					closeMenu = closeMenu
						|| $("#desplegable-idiomas").next().find("li>a:first").is(":focus")
						|| $("#desplegable-idiomas").next().find(">div>a").is(":focus");
				}
				// actions with tab
				else {
					closeMenu = closeMenu
						|| $("#desplegable-idiomas").next().find("li>a:last").is(":focus");
				}
			}
			else if(evt.which == 27) {
				closeMenu = true;
			}

			if(closeMenu) {
				$("#desplegable-idiomas").next().find(".mobile-link-open").slideUp();
				closeAllPanels();
			}

		});

		/******************************************************/
		/**  Desplegables revision foco / #60696 END         **/
		/******************************************************/

		/******************************************************/
		/**  Foco menu home / #60699 START      			 **/
		/******************************************************/

		$(".freeContent.panels").on("keydown", function(evt) {
			if(evt.which == 9) {
				if(evt.shiftKey) {
					if($("#panel-menu .tabs-items a:visible:first").is(":focus")) {
						if($(window).width() < 991) {
							$(".menuClose a").focus();
							evt.preventDefault();
						}
					}
				}
				else {
					if($("#panel-cotizacion a:visible:last").is(":focus")) {
						$(".cotizacion a").focus();
						evt.preventDefault();
					}
					else if($("#panel-menu .tabs-items a:visible:last").is(":focus")) {
						if($(window).width() < 991) {
							$(".menuSearch:visible").focus();
						}
						else {
							$(".menuClose a").focus();
						}
						evt.preventDefault();
					}
					else if($("#panel-menu a[href]:visible:last").is(":focus")) {
						var dataTargetId = $("#panel-menu a[href]:visible:last").parents(".tabs-content").attr("data-target-id");
						var tab = $("#panel-menu .tab-opener[data-target=" + dataTargetId + "]");
						if(tab.next().length > 0) {
							tab.next().find("a").focus();
						}
						else {
							if($(window).width() < 991) {
								$(".menuSearch:visible").focus();
							}
							else {
								$(".menuClose a").focus();
							}
						}
						evt.preventDefault();
					}
				}
			}
			else if(evt.which == 27) {
				if($("#panel-menu").is(":visible")) {
					$(".menuClose a").focus().click();
				}
				else if($("#panel-cotizacion").is(":visible")) {
					$(".cotizacion a").focus().click();
				}
			}
		});

		/******************************************************/
		/**  Foco menu home / #60699 END   				     **/
		/******************************************************/

		/******************************************************/
		/**  Menu Tabs revision foco / #60698 START			 **/
		/******************************************************/

		$(".tabs-group").on("keydown", function(evt) {
			if ($(this).find(".tab-dropdown.tab-dropdown-open").length > 0 && $(window).width() > 992) {
				var closeMenu = false;
				if(evt.which == 9) {
					if(!evt.shiftKey) {
						if($(this).find(".tab-dropdown a:visible:last").is(":focus")) {
							closeMenu = true;
						}
					}
					else if(evt.shiftKey) {
						if($(this).find(".tab-dropdown a:visible:first").is(":focus")) {
							closeMenu = true;
						}
					}
				}
				else if(evt.which == 27) {
					closeMenu = true;
				}
				if(closeMenu) {
					$(this).find(".tab-dropdown").slideUp();
					$(this).find(".tabs-dropdown.expanded").removeClass("expanded");
					$(this).find(".tab-dropdown-open").removeClass("tab-dropdown-open");
				}
			}
		});

		/******************************************************/
		/**  Menu Tabs revision foco / #60698 END			 **/
		/******************************************************/


		/******************************************************/
		/**  Cierre de menús / #60747 START			 **/
		/******************************************************/

		$("a.close").on('click', function(ev){
			var $e = $(this);
			$e.closest('.tabs-item').find('.tabs-item-title:first').closest('a').click();
		});

		/******************************************************/
		/**  Cierre de menús / #60747 END			 **/
		/******************************************************/

		/******************************************************/
		/**  Indicador de scroll / #59925 START				 **/
		/******************************************************/

		function setScrollItemVisibility() {
			var showScroll = typeof neoShowScroll === "undefined" || neoShowScroll;
			var isDesktop = $(window).width() > 991;

			if(showScroll && isDesktop) {
				$("body").append("<div id='scrollIcon' class='scroll-icon'><span></span></div>");
				$(window).on("scroll", function() {
					$("#scrollIcon").hide();
				});
				$(window).on("resize", function() {
					var isMobile = $(window).width() <= 991;
					if(isMobile) {
						$("#scrollIcon").hide();
					}
				});
			}
		}

		setScrollItemVisibility();

		/******************************************************/
		/**  Indicador de scroll / #59925 END				 **/
		/******************************************************/

		/******************************************************/
		/**  Panels en movil Foco / #61130 START			 **/
		/******************************************************/

		$(".menuClose").on("keydown", function(evt) {
			if($(window).width() < 991) {
				if(evt.which == 9) {
					if(evt.shiftKey) {
						$("#header .menuSearch").focus();
					}
					else {
						$("#panel-menu .tabs-items-scroll a:first").focus();
					}
					evt.preventDefault();
				}
			}
			else {
				if(evt.which == 9) {
					if(evt.shiftKey) {
						$("#panel-menu .tabs-items-scroll a:last").focus();
					}
					else {
						$("#panel-menu .tabs-item-title-active").parents("a:first").focus();
					}
					evt.preventDefault();
				}
			}
		});

		$("#panel-menu .tabs-items-scroll a:first").on("keydown", function(evt) {
			if($(window).width() < 991) {
				if(evt.which == 9) {
					if(evt.shiftKey) {
						$(".menuClose a").focus();
						evt.preventDefault();
					}
				}
			}
		});

		// event listener for Particulares menu
		$("#links-top").on("keydown", function(evt) {
			if($(window).width() < 991) {
				// on mobile, tabs cycle through the menu
				if(evt.which == 9) {
					if(evt.shiftKey) {
						if($("#links-top .mobile-layer-header>a").is(":focus")) {
							$("#links-top li>a:last").focus();
							evt.preventDefault();
						}
					}
					else {
						if($("#links-top li>a:last").is(":focus")) {
							$("#links-top .mobile-layer-header>a").focus();
							evt.preventDefault();
						}
					}
				}
				else if(evt.which == 27) {
					$("#links-top").find(".mobile-layer").slideUp();
					closeAllPanels();
				}
			}
		});

		$("#header .menuSearch").on("keydown", function(evt) {
			if($(window).width() < 991) {
				// behaviour when on search screen
				if($(this).hasClass("open")) {
					if(evt.which == 9) {
						if(evt.shiftKey) {
							// focus "buscar" button
							$("#header .search input[type='submit']").focus();
							evt.preventDefault();
						}
						else {
							// focus search area
							$("#header .search input[type='search']").focus();
							evt.preventDefault();
						}
					}
					else if(evt.which == 27) {
						$(this).click();
					}
				}
				// behaviour when on main menu screen
				else {
					if(evt.which == 9) {
						if(evt.shiftKey) {
							$("#panel-menu .tabs-items a:visible:last").focus();
							evt.preventDefault();
						}
						else {
							$(".menuClose a").focus();
							evt.preventDefault();
						}
					}
					else if(evt.which == 27) {
						$(".menuClose a").focus().click();
					}
				}
			}
		});

		$("#header .search input[type='search']").on("keydown", function(evt) {
			if($(window).width() < 991) {
				if(evt.which == 9) {
					if(evt.shiftKey) {
						$("#header .menuSearch").focus();
						evt.preventDefault();
					}
					else {
						if($(".search-result a[href]:visible").length > 0) {
							$(".search-result a[href]:visible:first").focus();
						}
						else {
							$("#header .search input[type='submit']").focus();
						}
						evt.preventDefault();

					}
				}
				else if(evt.which == 27) {
					$("#header .menuSearch").focus().click();
				}
			}
		});

		$("#header .search input[type='submit']").on("keydown", function(evt) {
			if($(window).width() < 991) {
				if(evt.which == 9) {
					if(evt.shiftKey) {
						if($(".search-result a[href]:visible").length > 0) {
							$(".search-result a[href]:visible:last").focus();
						}
						else {
							$("#header .search input[type='search']").focus();
						}
						evt.preventDefault();
					}
					else {
						$("#header .menuSearch").focus();
						evt.preventDefault();
					}
				}
				else if(evt.which == 27) {
					$("#header .menuSearch").focus().click();
				}
			}
		});

		$("#header .search-result").on("keydown", function(evt) {
		   if($(window).width() < 991) {
				if(evt.which == 9) {
					if(evt.shiftKey) {
						if($(".search-result a[href]:visible:first").is(":focus")) {
							$("#header .search input[type='search']").focus();
							evt.preventDefault();
						}
					}
					else {
						if($(".search-result a[href]:visible:last").is(":focus")) {
							$("#header .search input[type='submit']").focus();
							evt.preventDefault();
						}
					}
				}
				else if(evt.which == 27) {
					$("#header .menuSearch").focus().click();
				}
			}
		});

		/******************************************************/
		/**  Panels en movil Foco / #61130 END				 **/
		/******************************************************/

		/******************************************************/
		/**  Foco LOLOPO / #61437 START						 **/
		/******************************************************/

		$(".secureAccess").on("keydown", function(evt) {
			if ($(window).width() > 992) {
				if(evt.which == 9) {
					if(!evt.shiftKey) {
						$("#lineaabierta-login").focus();
						evt.preventDefault();
					}
				}
			}
		});

		$("#lineaabierta-login").on("keydown", function(evt) {
			if ($(window).width() > 992) {
				if(evt.which == 9) {
					if(evt.shiftKey) {
						$(".secureAccess").focus();
						evt.preventDefault();
					}
				}
			}
		});

		/******************************************************/
		/**  Foco LOLOPO / #61437 END						 **/
		/******************************************************/

		/*****************************************************************/
		/**  Iexplorer + Placeholder de Identificación / #61570 START	**/
		/*****************************************************************/

		// Fix to placeholder behaviour on IE10 and IE11
		if(/(Trident.*rv[ :]*11\.)|(MSIE\s10\.)/.test(navigator.userAgent)) {

			$("#lineaabierta-login").on("focus", function(evt) {
				if($("#lineaabierta-login").val() == "") {
					$("label[for=lineaabierta-login]").addClass("lineaabierta-placeholder-ie");
				}
			});

			$("#lineaabierta-login").on("blur", function(evt) {
				$("label[for=lineaabierta-login]").removeClass("lineaabierta-placeholder-ie");
			});

			$("#lineaabierta-login").on("keydown", function(evt) {
				if($("#lineaabierta-login").val() == "") {
					$("label[for=lineaabierta-login]").addClass("lineaabierta-placeholder-ie");
				}
				else {
					$("label[for=lineaabierta-login]").removeClass("lineaabierta-placeholder-ie");
				}
			});

			$("#lineaabierta-login").on("keyup", function(evt) {
				if($("#lineaabierta-login").val() == "") {
					$("label[for=lineaabierta-login]").addClass("lineaabierta-placeholder-ie");
				}
				else {
					$("label[for=lineaabierta-login]").removeClass("lineaabierta-placeholder-ie");
				}
			});

			$("#lineaabierta-pin").on("focus", function(evt) {
				if($("#lineaabierta-pin").val() == "") {
					$("label[for=lineaabierta-pin]").addClass("lineaabierta-placeholder-ie");
				}
			});

			$("#lineaabierta-pin").on("blur", function(evt) {
				$("label[for=lineaabierta-pin]").removeClass("lineaabierta-placeholder-ie");
			});

			$("#lineaabierta-pin").on("keydown", function(evt) {
				if($("#lineaabierta-pin").val() == "") {
					$("label[for=lineaabierta-pin]").addClass("lineaabierta-placeholder-ie");
				}
				else {
					$("label[for=lineaabierta-pin]").removeClass("lineaabierta-placeholder-ie");
				}
			});

			$("#lineaabierta-pin").on("keyup", function(evt) {
				if($("#lineaabierta-pin").val() == "") {
					$("label[for=lineaabierta-pin]").addClass("lineaabierta-placeholder-ie");
				}
				else {
					$("label[for=lineaabierta-pin]").removeClass("lineaabierta-placeholder-ie");
				}
			});

		}

		/*****************************************************************/
		/**  Iexplorer + Placeholder de Identificación / #61570 END		**/
		/*****************************************************************/


});


/******************************************************/
/**  Scroll Icon / #61567 START		        	     **/
/******************************************************/
	$(document).ready(function () {
		 function scroll_icon(event) {
			$('html, body').animate({ scrollTop: $('#scrollIcon').offset().top - 120 }, 500);
			return false;
		 }
		 $('#scrollIcon').on('click', scroll_icon);
	});

	$(document).ready(function() {
		if ($("body").height() <= $(window).height())
			$('#scrollIcon').hide();
	});
/******************************************************/
/**  Scroll Icon / #61567 END    		        	 **/
/******************************************************/

/******************************************************/
/**  Cierre Accion CABK / #61574 START     	         **/
/******************************************************/
	$('.container-fluid.header-bottom').on("click", function() {
		closeCotizacionPanel();
	});

	$('.container-fluid.bg-grey.header-top').on("click", function() {
		closeCotizacionPanel();
	});

	$(window).on("scroll", function() {
		closeCotizacionPanel();
	});

	function closeCotizacionPanel(){
		$(".panel-expanded").removeClass("panel-expanded");
		$("#panel-cotizacion").slideUp();
		$('#panels-overlay').hide();
	}
/******************************************************/
/**  Cierre Accion CABK / #61574 END     	         **/
/******************************************************/


/*************************************************************/
/**  iPad: descuadre imágenes de las Subhomes / #62579 END  **/
/*************************************************************/
function setEqualHeight(selector, triggerOnInput) {
	var elements = $(selector);
	elements.css("height", "auto");
	var max = Number.NEGATIVE_INFINITY;
	$.each(elements, function(index, item) {
		if ($(item).height() > max) {
			max = $(item).height()
		}
	});
	$(selector).css("height", max + "px");
	$(selector).css("marginBottom", "5px");

	if (!!triggerOnInput) {
		$(document).on("input", selector, function() {
			setEqualHeight(selector, false)
		})
	}

	$(window).on('resize', function() {
		setEqualHeight(selector, false)
	})
}
if(navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/Windows Phone/i))
	setEqualHeight('.tabs-contents li.sh-highlight', '');

/************************************************************/
/**  iPad: descuadre imágenes de las Subhomes / #62579 END **/
/************************************************************/

/************************************************************/
/**  #Ticket 62880 / START **/
/************************************************************/

function changeAttributeValue(selector, attribute, value){
	selector.attr(attribute, value);
}

function selectAttributeExists(selector, attribute){
	return selector.attr(attribute)!== undefined && selector.attr(attribute) !== null && selector.attr(attribute).length > 0;
}

function updateSelectorAttribute(selector, attribute, value){
	if(selectAttributeExists(selector, attribute)){
		changeAttributeValue(selector, attribute, value);
	}
}

/************************************************************/
/**  #Ticket 62880 / END **/
/************************************************************/

/************************************************************/
/**  Titular ventanas modales - Accesibilidad # START      **/
/************************************************************/
$(document).ready(function () {
	if($(window).width() < 992){
		$(".mobile-layer").attr("aria-labelledby", "modalTitle");
	}
	else {
		$(".mobile-layer").removeAttr("aria-labelledby");
	}
});
/************************************************************/
/**  Titular ventanas modales - Accesibilidad # END     **/
/************************************************************/

/************************************************************/
/**  Ticket #63074 START      **/
/************************************************************/
if (typeof window.isMobile === 'undefined') {
	function isMobile(){
		pc= navigator.userAgent.match(/(Windows\ NT|\(Macintosh)/i);
		tablet=!(pc)&&(navigator.userAgent.match(/Android\ 3\.|\(Windows\ NT|\(Macintosh|Playbook|Pad|Tab|xoom|sch-i[89]|SM-T[0-9]|GT-P[0-9]|Nexus 1[0-9]|Nexus [7-9]|Kindle|Android .* Chrome\/[\.0-9]* [^M]/i));
		mobile=!(pc)&&!(tablet)&&((/(Android\ [12456789]\.|mobile|phone|ipod|meego|blackberry|midp|pocket|symbian)/i).test(navigator.userAgent));		
		return mobile;		
	}
}
if (typeof window.replaceAlternativeDeviceLinks === 'undefined') {
	function replaceAlternativeDeviceLinks() {
	  if (!isMobile()) {
		  if (typeof devAlts != 'undefined' && devAlts != null) {
			  for (var key in devAlts) {
				  if($("#"+key).length === 1 && $("#"+key).is("a")){
					  $("#"+key).attr('href',devAlts[key]);
				  }
			  }
		  }
	  }
	}
}
$(document).ready(function(){
	replaceAlternativeDeviceLinks();
});
/************************************************************/
/**  Ticket #63074 END     **/
/************************************************************/

/************************************************************/
/**  Enlaces footer añadir role para lector de pantalla    **/
/************************************************************/
$(document).ready(function () {
	if($(window).width() > 992){
		$("#footer .link-group-title a").attr("role", "presentation");
	}
	else {
		$("#footer .link-group-title a").removeAttr("role");
	}
});
/************************************************************/
/**  Enlaces footer añadir role para lector de pantalla  END **/
/************************************************************/

/************************************************************/
/**  Añadir imagenes estaticas para alto contraste   **/
/************************************************************/
$(document).ready(function () {
	$('#desplegable-idiomas .mobile-link-open').prepend('<img src="/deployedfiles/common/R2016/Estaticos/images/icons/icon-world.png" alt=""/>');
	$('#hc-header-link .link-group-head a').prepend('<img src="/deployedfiles/common/R2016/Estaticos/images/icons/icon_hc.png" alt=""/>');

	$('#desplegable-idiomas .mobile-link-open a').append('<img src="/deployedfiles/common/R2016/Estaticos/images/arrow-dropdown-down.png" alt=""/>');
	$('.header-top .link-group:first .link-group-head a').append('<img src="/deployedfiles/common/R2016/Estaticos/images/arrow-dropdown-down.png" alt=""/>');

	$(".cotizacion a").on('click', function() {
		if ($('.cotizacion .html-snippet span:first').hasClass("panel-expanded")) {
			$('.cotizacion .html-snippet span img').attr("src", "/deployedfiles/common/R2016/Estaticos/images/arrow-dropdown-up.png")
		} else {
			$('.cotizacion .html-snippet span img').attr("src", "/deployedfiles/common/R2016/Estaticos/images/arrow-dropdown-down.png")
		}
	});

	$('.hm-slider-b-play a').append('<img src="/deployedfiles/common/R2016/Estaticos/images/icons/hm-slider-pause.png" alt=""/>');
	$(".hm-slider-b-play a").on('click', function() {
		if ($(this).hasClass("paused")) {
			$('.hm-slider-b-play a img').attr("src", "/deployedfiles/common/R2016/Estaticos/images/icons/hm-slider-pause.png")
		} else {
			$('.hm-slider-b-play a img').attr("src", "/deployedfiles/common/R2016/Estaticos/images/icons/play.png")
		}
	});
});

$(document).ready(function() {
	setTimeout(function() {
		$('.cotizacion .html-snippet span:first').append('<img src="/deployedfiles/common/R2016/Estaticos/images/arrow-dropdown-down.png" alt=""/>')
	},1000);
});
/************************************************************/
/**  Añadir imagenes estaticas para alto contraste END  **/
/************************************************************/

/************************************************************/
/**  Ticket #63033 START                                   **/
/************************************************************/
$(document).ready(function(){
    //find the current context and set the correct li to active
    var menuCtx = $('input[name="menuContext"]');
    var link = $("#" + menuCtx.val()).parent("li");
    link.addClass("active");

    //if it's a level 2 li also mark parent li as active
    link.closest('.tabs-dropdown').addClass('active');
});
/************************************************************/
/**  Ticket #63033 END                                     **/
/************************************************************/

/************************************************************/
/**  Ticket #65605 - Cookie Boton Linea Abierta START      **/
/************************************************************/
$(document).ready(function(){
    $("header #lineaabierta").on('click', function(){
    	Cookies.set("blo","blo", {expires : 30, secure : true, path: '/'});
    });
    $("header #lineaAbiertaEntrar").on('click', function(){
    	Cookies.set("blo","blo", {expires : 30, secure : true, path: '/'});
    });
});

/************************************************************/
/**  Ticket #65605 - Cookie Boton Linea Abierta END        **/
/************************************************************/


function scrollToElement(selector, time, verticalOffset) {
    time = typeof(time) != 'undefined' ? time : 1000;
    verticalOffset = typeof(verticalOffset) != 'undefined' ? verticalOffset : 0;
    element = $(selector);

    if(element.length > 0){
        scrollElementBody(selector, element, time, verticalOffset);
    }
}
function isOnTop(element){
    var headDiv = document.getElementById('header');
    var headHight = 0;
    if(headDiv !== null){
        headHight = headDiv.offsetHeight;
    }
    return document.body.scrollTop === (element.offset().top - headHight) ;
}
function scrollElementBody(selector, element, time, verticalOffset){
    offset = element.offset();
    var headDiv = document.getElementById('header');
    var headHight = 0;
    if(headDiv !== null){
        headHight = headDiv.offsetHeight;
    }

    offsetTop = offset.top + verticalOffset - headHight;
    $('html, body').animate({
        scrollTop: offsetTop
    }, time);
}
/************************************************************/
/**  Ticket #59926 - Bloque Promoción  START   **/
/************************************************************/

function onPromotionClick() {
    $('.banner-promotion').find('a').on('click', function () {
        var click = $(this);
        if (click.closest('.banner-promotion') !== undefined && click.closest('.banner-promotion') !== null) {
            var datId = click.closest('.banner-promotion').attr("data-id");
            if (datId !== undefined && datId !== null) {
                scrollToElement($('#' + datId));
            }
        }
    });
}
/************************************************************/
/**  Ticket #59926 - Bloque Promoción END    **/
/************************************************************/


/************************************************************/
/**  Ticket #65742 - DV Ordenes ministeriales  START   **/
/************************************************************/

function closeMinisterialOrderDiv(){
	var activeDiv = $('.om-group.dropdown > .om-home-boton.active');
	if(activeDiv !== undefined && activeDiv !== null){
		clickMinisterialOrder(activeDiv);
	}
}

function waitTimeToCloseMinisterialOrder(timeToWait){
	setTimeout(function () {
		closeMinisterialOrderDiv();
	}, timeToWait);
}

function clickMinisterialOrder(selector){
	 if($(selector).hasClass("active")){
		 $(selector).siblings(".om-content").slideUp(function(){
  			$(selector).siblings(".om-content").removeClass("active");
			$(selector).removeClass("active");			 
		 });	
    }else{
	   	 $(selector).siblings(".om-content").slideDown(function(){
		   	 $(selector).siblings(".om-content").addClass("active");
		   	 $(selector).addClass("active");
		 });
    }
}

function waitTimeToCloseMinisterialOrderSlider(position){
	setTimeout(function () {
		closeMinisterialOrderSlider(position);
	}, 3000);
}

function closeMinisterialOrderSlider(position, duration){
	var slide = $($('.hm-slider-list').find('.hm-slide')[position]);
	if(slide.find(".om-home-boton").hasClass('active')){
			slide.find(".om-content").slideUp(duration, function(){
   				slide.find(".om-content").removeClass("active");
			  	slide.find('.om-home-boton.active').removeClass("active");

});
	}
}

function closeMinisterialOrderSliderWithDuration(position, duration){
	if(duration === null || duration === undefined){
		duration = 400;
	}	
	closeMinisterialOrderSlider(position, duration);
}

function closAllMinisterialOrderSlider(duration){
	var slide = $($('.hm-slider-list').find('.hm-slide'));
	slide.find(".om-content").slideUp(duration, function(){
   		slide.find(".om-content").removeClass("active");
	 	slide.find('.om-home-boton.active').removeClass("active"); 
	});
}


function closAllMinisterialOrderSliderWithDuration(duration){
	if(duration === null || duration === undefined){
		duration = 400;
	}	
	closAllMinisterialOrderSlider(duration);
}

function closAllMinisterialOrderSliderLessTheFirst(duration){
	var slider = $($('.hm-slider-list').find('.hm-slide'));
	var sliderSize = slider.length, i;

	for(i=1; i < sliderSize; i++){
		closeMinisterialOrderSliderWithDuration(i, duration);
	}
}

/************************************************************/
/**  Ticket #65742 - DV Ordenes ministeriales  END   **/
/************************************************************/

/************************************************************/
/**  Ticket #66063 - DV Interstitial  START   **/
/************************************************************/

function closeInsterstitial (id){
	var selector = $("#" +id);
	if(selector !== null && selector !== undefined){
		var pauseBtn = selector.find('.vid-container').find('button[title="Pause"]');
		if(pauseBtn !== null && pauseBtn !== undefined){
			pauseBtn.click();
		}
		selector.hide();	
	}
}

/************************************************************/
/**  Ticket #66063 - DV Interstitial  END   **/
/************************************************************/


/************************************************************/
/**  DV boton flotante Imagen  START   **/
/************************************************************/

$(document).ready(function(){
    $(".button-float .button-close").on('click', function(){
       $(".button-float .button-image").hide().addClass('puti');
       $(".button-float .button-text").hide();
       $(".button-float .button-close").hide();
    });

});


$(window).on('scroll', function(){
     if($(window).width() >= 768) {
		 if ( $(".banner").length > 0 ) {

			 var windowHeight = $(window).scrollTop();
			 var muestraboton = $(".banner").offset().top - 150;

			 if(windowHeight >= muestraboton){
				 $('.button-float').slideDown(500);
			 }else{
				 $('.button-float').slideUp(500);
			 }
		 }
      }
});
/************************************************************/
/**  DV boton flotante Imagen  END   **/
/************************************************************/


