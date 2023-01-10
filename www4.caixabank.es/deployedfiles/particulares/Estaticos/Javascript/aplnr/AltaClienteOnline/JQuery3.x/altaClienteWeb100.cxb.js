/*******************************
 *    @General
 ********************************/

/* Variables globales */
var curS = 0,
	closeButton = false;

/* Funcion para comprobar cambio de breakpoint, devuelve false si no lo hay, o el valor del breakpoint si lo hay */
function checkWidth() {
	var winW = $( window.parent.document.body ).width();
	var bpD = 900;
	var bpT = 640;
	var curW;
	if(winW <= bpT) {
		curW = 1;
	} else if (winW <= bpD) {
		curW = 2;
	} else {
		curW = 3;
	}
	if (curW != curS) {
		curS = curW;
		return curS;
	} else {
		return false;
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

function log(msg){
	if(console){
		console.log(msg);
	}
};

function preventDefault(event){
	event.preventDefault ? event.preventDefault() : (event.returnValue = false);
}

function stopPropagation(event){
	event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
}

// Extraer cadena
function toSlug(text) {
	return text.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
}

// Funcion para cabecera de pagina
function fixStickyNavHeader() {
	var stickyNavHeader = $('.page-wrapper.sticky-nav #header, .page-wrapper.mg-bt.sticky-nav #page');

	if ($(window).scrollTop() > 110) {
		stickyNavHeader.addClass('header-fixed');
	}
	else{
		stickyNavHeader.removeClass('header-fixed');
	}
}

// Funcion para scroll vertical
function scrollToElement(scrollTarget, time){
	var stickyNavHeaderHeight = 0;
	curS > 1 ? stickyNavHeaderHeight = 220 : stickyNavHeaderHeight = 100
	$('html, body').animate({
		scrollTop: ($( scrollTarget ).offset().top - stickyNavHeaderHeight)
	}, time, function(){ });
}

// Funcion para saber si existe un valor de tipo string
function isEmpty(value) {
	return typeof value == 'string' && !value.trim() || typeof value == 'undefined' || value === null;
}

/********************************
 *    @Formularios
 ********************************/

// Personalizacion de input, select
$(function() {
	if (typeof $.fn.customForm != "undefined"){
		if( $('form').length > 0 ){
			$('form').customForm();
		}
	}
});

// Primer elemento recibe el foco
function firstFocus(){
	if($('input, textarea, select').length > 0) {
		$('input, textarea, select').eq(0).trigger( "focus");
	}
}

// Habilitar estado activo para elementos check y radio en la carga inicial
function enableInputChecked(){
	if( !$('input:checked').length > 0 ){ return false; }
	
	$('input:checked').each(function(){
		 if( $(this).hasClass('cform') ){
		    $(this).prop('checked', false).attr('checked', false).prev( '.' + toSlug( $(this).attr('name') ) ).trigger('click');
		}
	});
}

// Elemento es de tipo radio
function isRadio(element){
	return element.get(0).type == 'radio';
}

// Elemento input checkbox/radio esta activado
function inputIsChecked(objecto){
	return $( objecto ).is(':checked');
}

// Deshabilitar elementos label para el cambio de estado
function inputLabelTriggerDisabled(){
	inputLabel = $('label').not(".boton_examinar label, .captura label");

	/* Es necesario mantener la funcionalidad nativa del label para accesibilidad,
	 en su defecto ponemos cursor: text
	 inputLabel.hover(
	 function() {
	 $( this ).css('cursor', 'text');
	 }, function() {
	 $( this ).removeAttr('style');
	 }
	 );	*/

	$('.captura label').on('click',function(e){
		if( $(this).closest('.button').hasClass('disabled') ){
			e.preventDefault();
			e.stopPropagation();
		}
	});
}

// Deshabilitar default option on select
function selectDefaultOptionDisabled(){
	if( $( "select" ).length > 0 ){
		$( "select" ).on( "focusin", function( event ) {
			$(this).find('option[value=""]').attr('disabled', true);
		});
		$( "select" ).on( "focusout", function( event ) {
			//$(this).find('option[disabled]').removeAttr('disabled'); // JQuery 3.x : jQuery.fn.removeAttr no longer sets boolean properties: disabled
			$(this).find('option[disabled]').attr('disabled', false);
		});
	}
}

// Funcion para la navegacion accesible entre elementos input - analizar con mas calma, hace cosas raras con los desplegables
function customInputClick() {
	// if( $('.custom-form-radio, .custom-form-checkbox').hasClass('.custom-form-focused') ){
	// 	$("label[for='" + $(this).next('input').attr('id') + "']").trigger( "focus");
	// }

	$('.custom-form-radio, .custom-form-checkbox').on( "click", function(){
		$("label[for='" + $(this).next('input').attr('id') + "']").trigger( "focus");
	});

}

// Funcion para control de error en elementos custom // Deprecated: Interfiere con la validación inline de viewnext
function customFormError(){
	var customElement = "select.cform";
	$(customElement).blur(function() {
		var activeElement = $(this),
			fakeElement = activeElement.prev( '.custom-form-select[id*="' + activeElement.attr('id') + '"]' );
		setTimeout(function(){
			if( activeElement.hasClass('error') ){
				fakeElement.addClass('error').removeClass('valid');
			}
			else if( activeElement.hasClass('valid') ){
				fakeElement.addClass('valid').removeClass('error');
			}
			else {
				fakeElement.removeClass('error valid');
			}
		}, 600);
	});
}

// Funcion para el control del envio de datos previa visualizacion de colorbox
function submitFormController(show){
    /* Show modal and submit form */
    $(document).on( 'cbox_complete', function(){
        setTimeout(function(){
            enviar();                    
        }, 1500);
    });
    //document.getElementById(show).trigger("click"); // JQuery 3.x trigger bugfix
	$(document.getElementById(show)).trigger("click");
}

// Funcion para el control de la visualización de el componente campo opcional
function optionalFormFieldHandler (){
	if( !$('.c-optional-field').length > 0 ){
		return;
	}
	var keyClassName = '.c-optional-field',
		prefix = '__',
		buttonClassName = keyClassName + prefix + 'toggle',
		isCollapse = 'has-collapse', toggleClassNames;

	$(keyClassName).on('click', buttonClassName, function () {
		if ( $(this).closest(keyClassName).hasClass( isCollapse ) ) {
			toggleClassNames = $(this).data("toggle-classnames")

			$(this).attr('aria-expanded', function(i, value) {
				return value == 'true' ? false : true;
			});

			$(this).text() == $(this).data("text-pressed")
				? $(this).text($(this).data("text"))
				: $(this).text($(this).data("text-pressed"));

			$(this).toggleClass( toggleClassNames );
			$(this).closest(keyClassName).toggleClass("is-expanded");
			
			// Reset elements when user hide optional field
			if( !$(this).closest(keyClassName).hasClass("is-expanded") ){
				$(this).closest(keyClassName).find(':text, textarea').val("");
				$(this).closest(keyClassName).find(':radio, :checkbox').attr('checked', false);
				//$(this).closest(keyClassName).find(':selected').removeAttr('selected');
				$(this).closest(keyClassName).find(':selected').attr('selected', false);
			};
			
			// Accesibility
			fieldset = $(this).data("target");
			$(fieldset).prop('disabled', function(i, value) {
				return value == true ? false : true;
			});
		}
	});

}

/********************************
 *    @Desplegables
 ********************************/

function basicSlideDown(targetName){
	var targetObject;
	$('.' + targetName).length > 0 ? targetObject = $('.' + targetName) : targetObject = $('#' + targetName);

	targetObject.find('.dropdown-content').slideToggle().removeClass('dropdown-content');
}

function expandedAttrToggle(objecto){
	objecto.attr("aria-expanded", function(_, val){
		return val == "false" ? "true" : "false"
	});
}

function dropdownContent(dataTarget){
	$( "[aria-labelledby='" + dataTarget + "']" ).slideToggle();
}

function dropDownInputRadio(){
	// Despliegue de contenidos radio pre activado
	var checked = $('.switch-two input[data-toggle="dropdown-toggle"]:checked');
	if( checked.length > 0 ){
		checked.each(function(){
			expandedAttrToggle( $(this) );
			dropdownContent( $(this).attr("data-target") );

			// Only mobile < 640
			if (curS == 1) {
				// review #70557
				scrollToElement( $( ".mobile-capture [aria-labelledby='" + $(this).attr("data-target")  + "']" ) , 900);
			}
		});
	}

	// Control de cambio
	$('.switch-two input[data-toggle="dropdown-toggle"]').on("change", function() {
		// Cerrar resto de elementos abiertos
		$(this).closest('.switch-two').find('input[data-toggle="dropdown-toggle"]').not($(this)).each(function(){
			// 1 - Cerrar hijos desplegados
			var panelClosed = $( "[aria-labelledby='" + $(this).attr("data-target") + "']" ),
				childNodes = $(panelClosed).find('[data-toggle="dropdown-toggle"][aria-expanded="true"]');

			childNodes.each(function(index, childNode){
				expandedAttrToggle( $(childNode) );
				dropdownContent( $(childNode).attr("data-target") );
			});
			// 2 - Reset ultimo hijo activado - dropDownButtonLink()
			ddl_relatedTarget = undefined;
			// 3 - Cerrar panel padre
			expandedAttrToggle( $(this) );
			dropdownContent( $(this).attr("data-target") );
		});
		// Abrir panel seleccionado
		var activeObject = $(this);
		setTimeout(function(){
			expandedAttrToggle( activeObject );
			dropdownContent( activeObject.attr("data-target") );

			// Only mobile < 640
			if (curS == 1) {
				// review #70557
				scrollToElement( $( ".mobile-capture [aria-labelledby='" + activeObject.attr("data-target")  + "']" ) , 900);

			}

		}, 600);

	});
}

function dropDownButtonLink(){
	// Global vars
	ddl_relatedTarget = undefined;
	// Local vars
	var time = 600;

	$('a[data-toggle="dropdown-toggle"]').on('ontouchstart click', function(event){
		event.preventDefault();

		// Agrupacion desplegables - efecto acordeon
		if( $('#' + $(this).attr('data-parent')).attr('role') == "dropdown-list" ) {
			var eventTarget = $(this);
			//Mostrar elemento activo
			if( eventTarget.attr( "aria-expanded" ) == "false" ){
				// Ocultar elemento anterior
				if( ddl_relatedTarget !== undefined && ddl_relatedTarget.length > 0 ){
					expandedAttrToggle( ddl_relatedTarget );
					dropdownContent( ddl_relatedTarget.attr("data-target") );
					time = 600;
				}
				else{
					// Primera vez sin retardo
					time = 0;
				}
				setTimeout(function(){
					expandedAttrToggle( eventTarget );
					dropdownContent( eventTarget.attr("data-target") );
					ddl_relatedTarget = eventTarget;
				}, time);
			}
			else{
				// ELEMENTO YA DESPLEGADO
				return false;
			}
		}
		// Elemento individual - efecto toggle
		else {
			//Mostrar/ocultar capa
			expandedAttrToggle( $(this) );
			dropdownContent( $(this).attr("data-target") );
		}

	});
}

function dropDownSingleInputCheckBox(){
	$('input:checkbox[data-toggle="dropdown-toggle"]').on("change", function() {
		//Mostrar/ocultar capa
		var checked= $( this ).is(':checked'),
			dataTarget = $( this ).attr("data-target");

		if ( checked == true ) {
			$( ".dropdown-content[aria-labelledby='" + dataTarget + "']" ).slideDown();
		} else {
			$( ".dropdown-content[aria-labelledby='" + dataTarget + "']" ).slideUp();
		}
		expandedAttrToggle( $(this) );
	});
}

function basicDropDownBootstrapBased(){ // Guidelines 2020
	if( !$('.dropdown').length > 0 ) {
		return;
	}
	$('.dropdown').each(function (i, element) {
		if( $(this).find('.dropdown-toggle').length > 0 ){
			$(element).on('click', '.dropdown-toggle', function () {
				expandedAttrToggle( $(this) );
				dropdownContent( $(this).attr("id") );
			});
		}
	});
}

/**************************************************
 *    @Funciones auxiliares Crea tu perfil
 **************************************************/

/** Deprecated Change Request #92060 

// Funcion para control de opciones relacionadas checkboxes/radio
function relatedOptionsGroup(){
	var component = '.related-options-group',
		resetOptionSelected = function(category){
			var relatedOptions = $(component).find('input[related-option="'+ $(category).attr('id') +'"]');
			relatedOptions.each(function(){
				$(this).attr("checked", false);
				$(this).siblings("span").removeClass("custom-form-checked");
				$(this).siblings("span").removeClass("custom-form-focused");
			});
		},
		toggleInputElement = function(object){
			$( object ).prev( '.' + toSlug( $( object ).attr('name') ) ).trigger('click');
		};

	if( $(component).length > 0 ){

		$('#confirmarIncentivo .custom-form-radio').on('click', function(){
			var _this = $( this );

			// Reset form radio group
			$(".nomina").closest(".related-options-group").find('input:radio:checked').prev("span.custom-form-radio").trigger("click");
			// setTimeout(function(){
			//  var formRadioGroup = $(".nomina").closest(".related-options-group").find('input:radio');
			//  formRadioGroup.each(function(){
			//  $(this).attr("checked", false);
			//  $(this).siblings("span").removeClass("custom-form-checked");
			//  $(this).siblings("span").removeClass("custom-form-focused");
			//  });
			//  }, 150);

			if( _this.hasClass( 'custom-form-checked custom-form-focused' ) ){
				// Set equivalent "form radio"
				var equivalentFormRadio = $(".nomina").closest(".related-options-group").find("input[value=" + _this.next().val() + "]");
				$( equivalentFormRadio ).prev("span.custom-form-radio").trigger("click");
				// setTimeout(function(){
				//  $( equivalentFormRadio ).attr("checked", true);
				//  $( equivalentFormRadio ).siblings("span").addClass("custom-form-checked");
				//  $( equivalentFormRadio ).siblings("span").addClass("custom-form-focused");
				//  }, 200);
			}

			// Toggle continue buttons
			setTimeout(function(){
				var numeroRegalosSeleccionados = $('.productos > .nomina ~ div ul span.custom-form-checked').length;
				if( numeroRegalosSeleccionados != 0) {
					// Habilita el boton "Seleccionar y continuar" y deshabilita el enlace "Continuar sin producto"
					$("#confirmarIncentivo .button").removeClass("disabled");
					$("#confirmarIncentivo p > a.close-cb").parent().addClass("disabled");
				}
				else {
					// Deshabilita el boton "Seleccionar y continuar" y habilita el enlace "Continuar sin producto"
					$("#confirmarIncentivo .button").addClass("disabled");
					$("#confirmarIncentivo p > a.close-cb").parent().removeClass("disabled");
				}
			}, 200 );
		});

		// Control de opciones relacionadas
		$(component).find('input').on("change", function(){
			if ( isRadio( $(this) ) ) {
				// radio activo
				if( inputIsChecked( $(this) ) == true ){
					var categoryElement = $('#' + $(this).attr('related-option'));
					if( inputIsChecked(categoryElement) !== true  ){
						toggleInputElement(categoryElement)
					}
				}
			}
			else {
				if( inputIsChecked( $(this) ) == true){
					// Activar primer incentivo en caso de que solo exista un producto
					var relatedOptions = $(this).closest( component ).find('input[related-option="'+ $(this).attr('id') +'"]');
					if( relatedOptions.length == 1 && !inputIsChecked( relatedOptions ) ){
						relatedOptions.trigger('click');
					}
				}
				else{
					// Reset block
					resetOptionSelected($(this))
				}
			}
		});

		// Mostrar modal incetivos
		$('#creaTuPerfil .productos.related-options-group .producto-input label a').on('click', function(){
			event.preventDefault();
			event.stopPropagation();
			$('#creaTuPerfil .productos.related-options-group .nomina a.info').trigger('click');
		});
		$('#creaTuPerfil .productos.related-options-group .producto-input label a').on('keydown', function(event){
			if( event.keyCode == 13 ){
				$('#creaTuPerfil .productos.related-options-group .nomina a.info').trigger('click');
			}
		});

		// Eventos modal selecciona incentivo
		$(document).on( 'cbox_complete', function () {
			setTimeout(function () {
				$('#confirmarIncentivo').closest('#colorbox').find('#cboxClose').on('click', function () {
					// Reset form checked radio group
					$('#confirmarIncentivo').find('input:radio:checked').attr("checked", false).prev("span.custom-form-radio").removeClass("custom-form-checked custom-form-focused");
				});
			},10);
		});

	}
}

 End */


/**************************************************
 *    @Funciones auxiliares Datos de contacto
 **************************************************/

function addCountrySelectionAsDefaultOption() {
	/**
	 * Por defecto se considera que todos los select comienzan con una opción vacía para literal placeholder
	 * 1. value empty + value = ES (selección predefinida)
	 * 2. value empty + value = 660 || AF (selección no predefinida)
	 *
	 * */


	$('select[data-default-option-group]').each(function(i, selector) {
		$(selector).on("change", function() {

			if( $(selector).children("option:selected").val() === '011' ) return;

			$('[data-default-option-item="'+ $(selector).attr('data-default-option-group') +'"]').each(function(i, item) {

				$( $(item).find('[data-default-option="true"]') ).remove();

				// Predefined option value
				var firstChild = $(item).children('option:first-child'), secondChild = $(firstChild).next(),
				currentDefaultOption = $(selector).children("option:selected").clone();
				$(currentDefaultOption).attr('data-default-option', true);

				if( $(item).children('option:first-child').val() === '' && secondChild.val() === 'ES' ) {
					$(secondChild).after( currentDefaultOption );
				} else if ( $(item).children('option:first-child').val() === '' && ( secondChild.val() === 'AF' || secondChild.val() === 'AF' ) ) {
					$(firstChild).after( currentDefaultOption );
					$(secondChild).before( '<option value="">-----------------</option>' );
				}
			})

		});
	});
}


/**************************************************
 *    @Funciones auxiliares Capturar documentacion
 **************************************************/

// Funcion para visualizar el panel activo en la validacion en remoto
function expandActiveAccordionPanel(){
	// Wait until block capture are enabled...
	$('.capture_document:visible').each(function(i, accordion){
		var activeAccordionButton = $( accordion ).find('button.accordion-trigger:visible:not([disabled])');
		if( activeAccordionButton.length == 1 ){ // La opcion de "Hacer foto desde movil" esta deshabilitada
			var ariaControls = activeAccordionButton.attr('aria-controls'),
				activeAccordionPanel = $( '#' + ariaControls ).find('.dropdown_content[style*="display: block;"]');
			if( activeAccordionPanel ){
				activeAccordionButton.trigger('click');
			}
		}
	});
}


// Funcion para dar soporte a IE
var aux_$addPropertie = function(object, prop, value ){
	var isIE = !!( (navigator.userAgent.match(/Trident/) && navigator.userAgent.match(/rv[ :]11/)) || navigator.userAgent.match(/MSIE 10.0/) || navigator.userAgent.match(/MSIE 9.0/)  );
	if (isIE == true) {
		object.attr( prop, value );
	}
	else{
		object.prop( prop, value );
	}
}


// @Interaction Patterns
var uin_pattern_radioGroupMenuDropdown = function (){
	$('.radio_group--menu').each(function (i, radioGroup) {
		// Despliegue de contenidos radio pre activado
		var optionChecked = $(radioGroup).find('input:radio[data-toggle="dropdown"]:checked');
		if (optionChecked.length > 0) {
			optionChecked.prop('checked', false);
			setTimeout(function () {
				if( optionChecked.siblings('span.custom-form-radio').length > 0 ){
					optionChecked.siblings('span.custom-form-radio').trigger('click')
				} else {
					optionChecked.closest('label').trigger('click')
				}
			}, 10);

			// CBK Custom function : disabled radio not checked
			$(radioGroup).find('input:radio[data-toggle="dropdown"]:not([checked])').prop('disabled', true).closest('label').addClass('disabled');

			// Only mobile < 640
			if (curS == 1) {
				// review #70557
				setTimeout(function(){
					$('#fromComputerMobile_head-button').trigger('click');
					scrollToElement( $( ".document_selector.switch-two" ) , 900, 120);
				}, 10)
			}
		}

		// Events listener
		$(radioGroup).find('[data-toggle="dropdown"]').on('change', function (event) {
		    event.stopImmediatePropagation();
			var _this = $(event.target),
				currentOptionChecked = $(radioGroup).find('input:radio[data-toggle="dropdown"]:checked'),
				currentOptionCheckedTarget = currentOptionChecked.attr('id'),
				//radioGroupContent = $('.radio_group--content:not(.disabled)[data-related="' + _this.closest('.radio_group--menu').attr('id') + '"]');
				radioGroupContent = $('.capture_document:visible').find('.radio_group--content:not(.disabled)[data-related="' + _this.closest('.radio_group--menu').attr('id') + '"]'); // JQuery Migration

			// When option selected...
			if( _this.is( currentOptionChecked ) ){
				setTimeout(function(){
					// When Custom form plugin finished...
					var timeOut = radioGroupContent.find('.dropdown_content').attr('style') != undefined  ? 600 : 0,
						optionNotChecked = $(radioGroup).find('input:radio[data-toggle="dropdown"]:not([checked])').attr('id');

					/* Reset prev activated content*/
					if( radioGroupContent.find('[data-related="' + optionNotChecked + '"]').attr('style') != undefined ){
						radioGroupContent.find('[data-related="' + optionNotChecked + '"]').animate({
							height: [0, "swing"],
							opacity: [0, "swing"]
						}, {
							duration: 400,
							easing: "swing",
							complete: function () {
								// Animation complete
								setTimeout(function () {
									radioGroupContent.find('[data-related="' + optionNotChecked + '"]').css('display','none') ;
								}, timeOut);
							}
						});
					}

					// Show selected content
					setTimeout(function () {
						if( radioGroupContent.find('[data-related="' + currentOptionCheckedTarget + '"]').css( 'opacity' ) == 0 ){
							radioGroupContent.find('[data-related="' + currentOptionCheckedTarget + '"]').css({ height:'', opacity:'' })
						}
						radioGroupContent.find('[data-related="' + currentOptionCheckedTarget + '"]').delay(300).slideDown();
						// Check if page its reloaded
						radioGroupContent.find('[data-related="' + currentOptionCheckedTarget + '"]').promise().done(function() {
							// Only for > 640
							if (curS > 1) {
								expandActiveAccordionPanel();
							}
						});
					}, timeOut);

				}, 50);

			}

		});

	});
}

var uin_pattern_accordion = function () {

	$('.accordion:visible').each(function (i, accordion) {
		// Aux
		var allowMultiple = $('.accordion').attr('data-allow-multiple') == true,
			allowToggle = (allowMultiple) ? allowMultiple : $('.accordion').attr('data-allow-toggle') == true;

		// Events
		$(accordion).on('click', function (event) {
			var _this = $(event.target);

			if (_this.hasClass('button--title')) {
				_this = $(event.target.parentElement);
			}

			if ( _this.hasClass('accordion-trigger') && _this.attr("disabled") != 'disabled' ) {

				// Check if the current toggle is expanded.
				var expanded = _this.attr('expanded') == true,
					expandedPanelButton = $(accordion).find('[aria-expanded="true"]');

				// without allowMultiple, close the open accordion
				if ( !allowMultiple && expandedPanelButton.length > 0 && !expandedPanelButton.is(_this) ) {
					// Hide the accordion section.
					$('#' + expandedPanelButton.attr('aria-controls')).slideUp(function () {
						// Animation complete.
						// $(this).prop('hidden', true);
						aux_$addPropertie( $(this), 'hidden', true )
					});
				}

				if (expanded == false) {
					//  Show the accordion section.
					// $( '#' + _this.attr('aria-controls') ).prop('hidden', false).slideDown();
					aux_$addPropertie( $( '#' + _this.attr('aria-controls') ), 'hidden', false )
					$( '#' + _this.attr('aria-controls') ).slideDown();

				} else if (allowToggle && isExpanded) {
					//  Hide the accordion section.
					$('#' + _this.attr('aria-controls') ).slideUp(function () {
						// Animation complete.
						// $(this).prop('hidden', true);
						aux_$addPropertie( $(this), 'hidden', true )
					});
				}

				// Bubble canceling
				event.stopPropagation();
				event.preventDefault();
			}

		});

	});
}

// @Accessibility Patterns
var acc_pattern_accordion = function () {
	$('.accordion:visible').each(function (i, accordion) {
		// Aux
		var allowMultiple = $(accordion).attr('data-allow-multiple') == true,
			allowToggle = (allowMultiple) ? allowMultiple : $('.accordion').attr('data-allow-toggle') == true;

		// Events
		$(accordion).on('click', function (event) {
			var _this = $(event.target);

			if (_this.hasClass('button--title')) {
				_this = $(event.target.parentElement);
			}

			if ( _this.hasClass('accordion-trigger') && _this.attr("disabled") != 'disabled' ) {
				// Check if the current toggle is expanded.
				var expanded = _this.attr('expanded') == true,
					expandedPanelButton = $(accordion).find('[aria-expanded="true"]');


				// without allowMultiple, close the open accordion
				if ( !allowMultiple && expandedPanelButton.length > 0 && !expandedPanelButton.is(_this) ) {
					// Set the expanded state on the triggering element
					expandedPanelButton.attr('aria-expanded', 'false');
					/*  Hide the accordion section.
					 Note: this action its generated from interaction function "uin_pattern_accordion" */
					// When toggling is not allowed, clean up disabled state
					if (!allowToggle) {
						expandedPanelButton.removeAttr('aria-disabled');
					}
				}

				if (expanded == false) {
					// Set the expanded state on the triggering element
					_this.attr('aria-expanded', 'true');
					/*  Show the accordion section.
					 Note: this action its generated from interaction function "uin_pattern_accordion" */
					// If toggling is not allowed, set disabled state on trigger
					if (!allowToggle) {
						_this.attr('aria-disabled', 'true');
					}
				} else if (allowToggle && isExpanded) {
					// Set the expanded state on the triggering element
					_this.attr('aria-expanded', 'false');
					/*  Hide the accordion section.
					 Note: this action its generated from interaction function "uin_pattern_accordion" */
				}

				// Bubble canceling
				event.stopPropagation();
				event.preventDefault();

			}

		});

		$(accordion).on('keydown', function (event) {
			var _this = $(event.target),
				key = event.which.toString(),
				ctrlModifier = (event.ctrlKey && key.match(/33|34/)),
				listButtons = $(accordion).find('*:not([hidden]) .accordion-trigger');

			if (_this.hasClass('button--title')) {
				_this = $(event.target.parentElement);
			}

			if ( _this.hasClass('accordion-trigger') && _this.attr("disabled") != 'disabled' ) {

				if (key.match(/38|40/) || ctrlModifier) {
					var index = listButtons.index(_this);
					var direction = (key.match(/34|40/)) ? 1 : -1;
					var length = listButtons.length;
					var newIndex = (index + length + direction) % length;

					$(listButtons.get(newIndex)).trigger( "focus");

					event.preventDefault();
				} else if (key.match(/35|36/)) {
					// 35 = End, 36 = Home keyboard operations
					switch (key) {
						// Go to first accordion
						case '36':
							$(listButtons.get(0)).trigger( "focus");
							break;
						// Go to last accordion
						case '35':
							$(listButtons.get(listButtons.length - 1)).trigger( "focus");
							break;
					}

					event.preventDefault();
				}
			} else if (ctrlModifier) {
				var listPanels = $(accordion).find('.accordion-panel:not(.disabled)');
				// Control + Page Up/ Page Down keyboard operations
				// Catches events that happen inside of panels
				listPanels.each(function (index, panel) {
					if ($.contains(panel, _this[0])) {
						$(listButtons.get(index)).trigger( "focus");
						event.preventDefault();
					}
				});
			}

		});

	});
}

// Funcion para dar soporte a IE - botones input file
function inputFileHiddenButton(){
	var isIE = !!( (navigator.userAgent.match(/Trident/) && navigator.userAgent.match(/rv[ :]11/)) || navigator.userAgent.match(/MSIE 10.0/) || navigator.userAgent.match(/MSIE 9.0/)  );
	if (isIE == true) {

		$('.inputfile--hidden + label').on('click', function (event) {
			// event.preventDefault();
		});
		$('.inputfile--hidden + label').on('keydown', function (event) {
			var _this = $(event.target),
				key = event.which.toString();
			if ( key.match(/13|32/) ) {
				_this.prev('input[type="file"]').trigger('click');
			}
		});
	}
}

// Funcion para dar soporte a IE11 - botones input file
function inputFileButton(){
	var isIE11 = !!(navigator.userAgent.match(/Trident/) && navigator.userAgent.match(/rv[ :]11/));
	if (isIE11 == true) {
		$('.button label > a, .boton_examinar label > a').on( "click", function(e){
			e.preventDefault();
			$('#' + $(this).closest('label').attr('for')).trigger('click');
		});
	}
}

/**************************************************
 *    @Funciones auxiliares Finalidad de la cuenta
 **************************************************/

// Funcion desplegar contenido segunda actividad
function desplegableActividad_(object, value){
	var contentGroup = "#" + $(object).attr("data-target"),
		contentTarget = "#" + value
	time = 0;

	if( !(isEmpty(value)) && $(contentGroup).find(contentTarget).length > 0 ){

		if( $(contentGroup).children( "div:visible" ).length > 0 ){
			$(contentGroup).children( "div:visible" ).not(contentTarget).slideUp(900);
			time = 750;
		}
		else {
			$(contentGroup).children( "div" ).css("display", "none");
			time= 150
		}
		setTimeout(function(){
			$(contentTarget).closest(".dropdown-content").css("display", "block");
			$(contentTarget).slideDown(900);
			setTimeout(function(){
				scrollToElement(contentGroup, 900);

			},300);
		},time);
	}
	else {
		$(contentGroup).children( "div:visible" ).slideUp(900);
		$(contentTarget).closest(".dropdown-content").removeAttr("style");
	}
}

function desplegableActividad(object, value){
	// [HOLABANK FORM] VARIATION
	if( $('.hbk-form').length > 0 ){
		// Common content
		var c = $('.common-content');
		( c.length > 0 && c.hasClass('d-n') ) ? c.slideDown('slow').removeClass('d-n') : false;

		// Specific content: Second activity switcher
		value === 'estudiante' ?
			$('#secondActivity').addClass('d-n') :
			$('#secondActivity').removeClass('d-n')
	}
	
	// Ocultar pregunta ingreso con el valor estudiante
	if( $( "[data-hidden='secondActivity']" ).length > 0 ) {
		// Specific content: Second activity switcher
		value === 'estudiante' ?
			$('#secondActivity').addClass('d-n') :
			$('#secondActivity').removeClass('d-n')
	}
	// if( $('#AltaclienteCaixaBankCreaTuPerfil').length > 0 ){
	// 	// Common content
	// 	var c = $('.c-option-group--inline');
	// 	( c.length > 0 && c.hasClass('d-n') ) ? c.slideDown('slow').removeClass('d-n') : false;

	// 	// Specific content: Second activity switcher
	// 	value === 'estudiante' ?
	// 		$('.segundoIngresotitle').addClass('d-n') :
	// 		$('.segundoIngresotitle').removeClass('d-n')
	// }

	// ALL FORMS
	var contentGroup = "#" + $(object).attr("data-target"),
		contentTarget = "#" + value,
		time = function(){
			var minRange = 350,
				maxRange = 1200,
				i = ( $(contentTarget).height() / $(window).height() ).toFixed(2),
				v = 0;

			parseInt(i * minRange + minRange) < maxRange ? v = parseInt(i * minRange + minRange) : v = maxRange;
			return v;
		},
		slideDown = function(){
			$(contentTarget).slideDown( time(), function() {
				// Animation complete.
			});
		}

	if( !(isEmpty(value)) && $(contentGroup).find(contentTarget).length > 0 ){

		if( $(contentGroup).children( "div:visible" ).length > 0 ){
			$(contentGroup).children( "div:visible" ).not(contentTarget).slideUp(900, function(){
				// Animation complete.
				slideDown();
			});
		}
		else {
			$(contentGroup).children( "div" ).css("display", "none");
			$(contentTarget).closest(".dropdown-content").css("display", "block");
			slideDown();
			setTimeout(function(){
				scrollToElement(contentGroup, 900);
			},350);
		}
	}
	else {
		$(contentGroup).children( "div:visible" ).slideUp(600);
		$(contentTarget).closest(".dropdown-content").removeAttr("style");
	}
}

function desplegableActividadInit(){
	$('select[id*="actividadlaboral"]').each(function(index){
		var selectedOption = $( this).find("option:selected").not('.empty-option');
		if( !(isEmpty( selectedOption.val())) ){
			desplegableActividad( $( this), selectedOption.val() );
		}
	});
}

// Funcion desplegar contenido radio buttons
function desplegableRadio(){
	var inputList = $('input.dropdown');
	if( !inputList.length > 0 ){
		return;
	}
	inputList.each(function(index, element) {
		// Despliegue de contenidos radio
		$(element).on("change", function(evt) {
			evt.stopImmediatePropagation();
			evt.stopPropagation();
			//Mostrar/ocultar capa
			var inputName = $( this ).attr("name"),
				dataTarget = $( 'input[name="' + inputName + '"]').attr("data-target");
			if( $(this).attr('value') == 'S' || $(this).attr('value') == 'si' ) {
				$( ".dropdown-content[id='" + dataTarget + "']" ).slideDown('slow');
			} else {
				$( ".dropdown-content[id='" + dataTarget + "']" ).slideUp('slow');
			}
		});
		// Elemento con estado checked en la carga de pagina
		if( inputIsChecked( $(element) ) ){
			$(element).trigger('change')
		}
	});
}

function dropdownGroup() {
	var	keyClassName = '.dropdown-group', module = {};

	if( !$(keyClassName).length > 0 ) return;

	module.utils = {

		getElementType: function( element ) {
			return element.type || element.tagName;
		}
	}

	module.init = function() {
		module.bind();

		$(keyClassName).find('.dropdown-toggle').each( function( i, item ) {
			module.eventListeners( item );
		});
	}
	module.bind = function () {
		$( document ).on('toggle:element', function(evt, element) {
			var type = module.utils.getElementType( element );

			if( type === 'radio') {
				module.toggleRadio( element );
				return;
			}
			if( type === 'checkbox') {
				module.toggleCheckbox( element );
				return;
			}
			if( type === 'button' || type === 'A') {
				module.toggleButton( element );
			}
		})
	}
	module.eventListeners = function ( element ) {
		var toggleElement = function() {
			$( document ).trigger('toggle:element', [element]);
		};

		$( element ).on({
			click: function () {
				toggleElement();
			}
		});

		if( $( element ).prop('checked') ) $( element ).trigger('toggle:element', [element]);
	}
	module.toggleRadio = function ( element ){
		var triggerIdentifier = element.id,
			triggerDataTarget = $( element ).attr('data-target'),
			openDropdown = $( element ).closest( '.dropdown-group' ).find( '.dropdown-content.is-open' ),
			openDropdownIdentifier = openDropdown.prop('id'),
			existOpenDropdown = openDropdown.length > 0;

		// If element data-target attribute exist and contains an identifier
		if( triggerDataTarget !== undefined ) {

			// If there is opened content
			if( existOpenDropdown) {

				// Checkpoint: Avoid dropdown when double click is fired on same trigger element
				var openDropdownTrigger = $( openDropdown ).data('trigger').id;

				if( triggerIdentifier !==  openDropdownTrigger ) {

					// Checkpoint: Trigger element data-target contains a different target value?
					if( triggerDataTarget !== '#' + openDropdownIdentifier ) {

						$( openDropdown ).on( "dropdown:toggle", function() {

							$( triggerDataTarget )
								.slideDown('slow', function() {
									$( this ).addClass(' is-open ');
									$( openDropdown ).off( "dropdown:toggle", function() {});
								})
								// Update previous associated data with current trigger identifier
								.data('trigger',{
									id: element.id,
								});
						});

						$( openDropdown ).slideUp('slow', function() {
							$( this ).removeClass(' is-open ').trigger( 'dropdown:toggle' );
						});

					}
					else {
						// Different radios for same content ( already is visible )
						$( triggerDataTarget )
							// Update previous associated data with current trigger identifier
							.data('trigger',{
								id: element.id,
							});
					}
				}
				else {
					return;
				}
			}
			else {

				$( triggerDataTarget )
					.slideDown('slow', function() {
						$( this ).addClass(' is-open ');
					})
					// Store the 'current trigger' identifier as associated data
					.data('trigger',{
						id: element.id,
					});
			}
		}

		// If radio has not data-target identifier
		else {

			// Close current visible dropdown content
			if( existOpenDropdown) {

				$( openDropdown ).slideUp('slow', function() {
					$( this ).removeClass(' is-open ');
				});

			}
		}
	}
	module.toggleCheckbox = function ( element ){
		var dropdown = $( element ).attr('data-target');
		$( dropdown ).slideToggle('slow');
	}
	module.toggleButton = function ( element ){
		var dropdown = $( element ).attr('data-target'),
			siblings = $( element ).closest( '.dropdown-group' ).find( '.dropdown-content' ).not( $(dropdown) );

		$( siblings ).each( function( i, sibling ) {
			$( sibling ).hide()
		})
		$( dropdown ).show()

	}
	module.init();
}

// Funcion desplegar codigo CNAE
function desplegableCNAE(){
	// Buscar codigo CNAE
	$("a[id*='buscarCnae']").on('click', function(e) {
		e.preventDefault();
		//Mostrar/ocultar capa
		$(this).closest(".cajetin").find("div[id*='verMas']:first").slideToggle();
	});
}

//Funcin anadir paises en transferencias extranjero
function addPais(){
	//define template
	var template = $('.slide-trib .desplegablePais').clone();

	//define counter
	var sectionsCount = 1;

	//add new section
	$('body').on('click', '.linkMasPaises', function() {

		//increment
		sectionsCount++;

		if (sectionsCount <= 5) {
			/*Para evitar duplicar los tags de personalizacion, clonar la seccion eliminando los tags de customForm ya que al asignar el plugin a los input el plugin genera esta etiqueta.*/
			var section = template.clone().find(".custom-form-select").remove().end();

			//loop through each input
			section.find(':input').each(function(){

				//set id to store the updated section number
				var newId = this.id + sectionsCount,
					newName = this.name + sectionsCount;

				//update for label
				$(this).closest(".field").find("label").attr('for', newId);

				//update id
				this.id = newId;
				this.name = newName;

				// Update for custom form span - Ya no es necesario!
				// var customId = $(this).siblings( "span.custom-form-select" ).attr('id') + sectionsCount;
				// $(this).siblings( "span.custom-form-select" ).attr('id', customId);


			}).end();

			//inject new section and asignate customForm for enable input personalitation
			section.insertAfter( $('.desplegablePais:last') ).hide().slideDown().customForm();
			if(sectionsCount == 5){$('.desplegablePais:last .linkMasPaises').hide();}
			return false;

		}

	});
}

//Funcion anadir paises en renta fuera de Espana
function addBlockCountry(){
	//define template
	var template = $('.slide-trib .form-group').clone();

	//define counter
	var sectionsCount = 1;

	//add new section
	$('body').on('click', '.linkVerMasPaises', function() {

		//increment
		sectionsCount++;

		if (sectionsCount <= 5) {
			/*Para evitar duplicar los tags de personalizacion, clonar la seccion eliminando los tags de customForm ya que al asignar el plugin a los input el plugin genera esta etiqueta.*/
			var section = template.clone().find(".custom-form-select").remove().end();

			//loop through each input
			section.find(':input').each(function(){

				//set id to store the updated section number
				var newId = this.id + sectionsCount,
					newName = this.name + sectionsCount;

				//update for label
				$(this).closest(".field").find("label").attr('for', newId);

				//update id
				this.id = newId;
				this.name = newName;

				// Update for custom form span - Ya no es necesario!
				// var customId = $(this).siblings( "span.custom-form-select" ).attr('id') + sectionsCount;
				// $(this).siblings( "span.custom-form-select" ).attr('id', customId);


			}).end();

			//inject new section and asignate customForm for enable input personalitation
			section.insertAfter( $('.slide-trib .form-group:last') ).hide().slideDown().customForm();
			if(sectionsCount == 5){$('.form-group:last .linkVerMasPaises').hide();}
			return false;

		}

	});
}

// Funcion checkboxes actividades
function actividadesDropdownContent(){
	var textareaDisplayToggle = function(objecto){
		if( objecto.attr("id") == "otras" || objecto.attr("id") == "otras_actividades" ) {
			if( inputIsChecked(objecto) ){
				$(".otrasActividades:hidden").slideDown('slow');
			}
			else {
				$(".otrasActividades:visible").slideUp('slow');
			}
		}
	}

	if( $(".actividades input:checkbox:checked") ){
		$(".actividades input:checkbox:checked").each(function(){
			textareaDisplayToggle($(this));
		});
	}
	$(".actividades .custom-form-checkbox, .actividades input:checkbox, .actividades input:checkbox + label ").on( "click", function(){
		var checkbox = $(this).parent().find('input:checkbox');
		textareaDisplayToggle(checkbox);
	});
}

// Funcion toggle collapse content
function toggleCollapseRelatedContent() {
	var collapseElements = $('[data-toggle="collapse"]') ;
	if(!$(collapseElements).length > 0 ){
		return;
	}
	collapseElements.each( function(index, element) {
		var type = element.type;
		if( type === 'checkbox') {
			$(element).on('change', function(evt){
				var t = $( $(this).attr('data-target') );
				if( t.length > 0 ) {
					inputIsChecked( $(this) ) ? t.slideDown('slow') : t.slideUp('slow');
				}
			});
		}
		if( type === 'radio') {
			var collapsibleRadioOnGroupHandler = function(e,n){
				var radioGroupList = $( "input[name='" + n + "']" ).not( e )
				if( radioGroupList.length > 0 ){
					radioGroupList.each(function(i, radio) {
						var t = $( $(e).attr('data-target') );
						$(radio).on('change', function(evt){
							if( inputIsChecked( $(this) ) ){
								if( t.length > 0 && t.is(':visible') ) {
									t.slideUp('slow');
								}
							}
						});
					});
				}
			}
			$(element).on('change', function(evt){
				var t = $( $(this).attr('data-target') );
				if( t.length > 0 && inputIsChecked( $(this) ) ) {
					 t.slideDown('slow', function() {
						collapsibleRadioOnGroupHandler( $(evt.currentTarget), $(evt.currentTarget).attr('name') );
					 });
				}
			});
			// Elements checked on page load
			if( inputIsChecked( $(element) ) ){
				$(element).trigger('change')
			}
		}
		if( type === 'button' ){
			$(element).on('click', function(evt){
				var t = $( $(this).attr('data-target') );
				if( t.length > 0 ) {
					t.is( ":hidden" )  ? t.slideDown('slow') : t.slideUp('slow');
				}
			});
		}
	});
}

// Funcion toggle dropdown content
function toggleDropdownRelatedContent() {
	var dropdownElements = $('[data-toggle="dropdown"]') ;
	if(!$(dropdownElements).length > 0 ){
		return;
	}

	dropdownElements.each( function(index, element) {
		var type = element.type, duration = $(element).attr('data-duration');
		duration = ( duration !== undefined && typeof duration === 'string') ? duration : 'fast';
		if( type === 'checkbox') {
			$(element).on('change', function(evt){
				var t = $( $(this).attr('data-target') );
				if( t.length > 0 ) {
					inputIsChecked( $(this) ) ? t.fadeIn('slow') : t.fadeOut('slow');
				}
			});
		}
		if( type === 'radio') {
			var dropdownRadioOnGroupHandler = function(e,n){
				var radioGroupList = $( "input[name='" + n + "']" ).not( e )
				if( radioGroupList.length > 0 ){
					radioGroupList.each(function(i, radio) {
						var t = $( $(e).attr('data-target') );
						$(radio).on('change', function(evt){
							if( inputIsChecked( $(this) ) ){
								if( t.length > 0 && t.is(':visible') ) {
									t.fadeOut('slow');
								}
							}
						});
					});
				}
			}
			$(element).on('change', function(evt){
				var t = $( $(this).attr('data-target') );
				if( t.length > 0 && inputIsChecked( $(this) ) ) {
					t.fadeIn('slow', function() {
						dropdownRadioOnGroupHandler( $(evt.currentTarget), $(evt.currentTarget).attr('name') );
					});
				}
			});
			// Elements checked on page load
			if( inputIsChecked( $(element) ) ){
				$(element).trigger('change')
			}
		}
		if( type === 'button' ){
			$(element).on('click', function(evt){
				var t = $( $(this).attr('data-target') );
				if( t.length > 0 ) {
					if( t.is( ":hidden" ) ) {
						t.fadeIn( duration, function() {
							// Animation complete
							t.trigger('opened');
						});
					} else {
						t.fadeOut( duration, function() {
							// Animation complete
							t.trigger('closed');
						});
					}
				}
			});
		}
	});
}

// Funciones auxiliares para 'Country Tax Component [FLUJO HOLABANK]'
function getLastChildElementKey(e){
	var keyClassName = e, keyString, keyNumber;
	if( document.querySelector(keyClassName).childElementCount > 0 ){
		keyString = document.querySelector(keyClassName).lastElementChild.id,
		keyNumber = parseInt(keyString.match(/\d+$/)[0], 10);
	} else {
		keyNumber = 0;
	}
	return keyNumber;
}
function getDocumentLang(){
	var langPrefixes = ['es', 'ca', 'en'], URLPrefixes = ['_es', '_ca', '_en'], documentLang = document.documentElement.lang, url = document.location.href, lang;

	// Loop through each lang prefix
	langPrefixes.forEach(function (str, index) {
		if (str === documentLang) {
			lang = str;
			return;
		}
	});

	if( lang == undefined ) {
		// Loop through each lang prefix
		URLPrefixes.forEach(function (prefix, index) {
			if ( url.indexOf( prefix ) > -1 ) {
				lang = langPrefixes[index];
				return;
			}
		});
	}

	return lang;
}
function addSummaryItem(){
	// Get values for DOM
	var selectCountry = document.getElementById('otherCountryAdd'),
		selectedCountryIndex = selectCountry.selectedIndex,
		selectedCountryText = titleCase( selectCountry.options[selectCountry.selectedIndex].text ),
		countryTaxInput = document.getElementById('otherCountryAddTIN'),
		countryTaxInputVal = countryTaxInput.value;

	// Create HTML string with placeholder text
	var Html_template, newHtml, container = '.c-country-tax--incoming', addSummaryItemCounter = getLastChildElementKey(container), counter = ++addSummaryItemCounter,
		key = 'countryTaxItem' + counter, cboxKeyClassName = '.c-country-tax__modal', cboxPrefixMod = '--TIN',
		cboxHtml = '<a class="cbox-close ml5 align-middle" href="'+ $(cboxKeyClassName + cboxPrefixMod).attr('href') +'" target="_self"><img class="m0auto d-inb" src="/deployedfiles/particulares/Estaticos/Imagenes/apl/AltaClienteOnline/ic_info.png" name="vgn_ext_templ_rewrite?vgnextoid=864ffb38fd929510VgnVCM2000001938f70aSTFL&amp;vgnextmgmtpath=/deployedfiles/vgn_ext_templ_rewrite" alt="" vgn_ext_params="type=image/png" width="22" height="22"></a>';

	Html_template = {
		es: '<div class="c-country-tax" id="%key%"><div class="c-country-tax__box"><div class="c-country-tax__entry"><div class="c-country-tax__summary"><div class="l-grid-row"><div class="l-grid-col c-country-tax__item"><div class="l-grid-row"><div class="l-grid-col"><p><strong>País</strong></p><p class="c-country-tax__country">%country%</p></div><div class="l-grid-col"><p><strong>TIN (Identificación del Contribuyente)</strong></p><p class="c-country-tax__tin">%taxNumber%</p></div></div></div><div class="l-grid-col c-country-tax__buttons"><div class="h-100"><div class="align-vertical-center"><button type="button" class="button-icon icon icon-md icon-pencil js-edit" data-target="#countryTaxDetail%id%"><span class="button-icon__label sr-only">Editar</span></button><button type="button" class="button-icon icon icon-md icon-trash hidden-xs js-delete"><span class="button-icon__label sr-only">Borrar</span></button></div></div></div></div></div><div class="c-country-tax__detail d-n"><div class="frm-group"><div class="frm-select__container"><label for="countryTaxAdded%id%">¿En qué país?</label><select name="countryTaxAdded%id%" id="countryTaxAdded%id%" class="frm-select"></select></div></div><div class="frm-group mb40"><div class="frm-select__container"><label for="countryTaxAddedTIN%id%" class="m0 align-middle">Introduce el TIN</label>%info% <input type="text" name="countryTaxAddedTIN%id%" id="countryTaxAddedTIN%id%"></div></div><div class="c-country-tax__buttons"><button type="button" class="button--md button-link icon icon-md icon-trash js-delete"><span class="button-link__label">Borrar</span></button><button type="button" class="button button--md blue btn-checkmark fr js-confirm"><span class="button__label">Confirmar</span></button></div></div></div></div></div>',
		en: '<div class="c-country-tax" id="%key%"><div class="c-country-tax__box"><div class="c-country-tax__entry"><div class="c-country-tax__summary"><div class="l-grid-row"><div class="l-grid-col c-country-tax__item"><div class="l-grid-row"><div class="l-grid-col"><p><strong>Country</strong></p><p class="c-country-tax__country">%country%</p></div><div class="l-grid-col"><p><strong>TIN (Tax Identifier)</strong></p><p class="c-country-tax__tin">%taxNumber%</p></div></div></div><div class="l-grid-col c-country-tax__buttons"><div class="h-100"><div class="align-vertical-center"><button type="button" class="button-icon icon icon-md icon-pencil js-edit" data-target="#countryTaxDetail%id%"><span class="button-icon__label sr-only">Edit</span></button><button type="button" class="button-icon icon icon-md icon-trash hidden-xs js-delete"><span class="button-icon__label sr-only">Delete</span></button></div></div></div></div></div><div class="c-country-tax__detail d-n"><div class="frm-group"><div class="frm-select__container"><label for="countryTaxAdded%id%">In which country do you have tax obligations?</label><select name="countryTaxAdded%id%" id="countryTaxAdded%id%" class="frm-select"></select></div></div><div class="frm-group mb40"><div class="frm-select__container"><label for="countryTaxAddedTIN%id%" class="m0 align-middle">Enter the Taxpayer Indetification Number (TIN)</label>%info% <input type="text" name="countryTaxAddedTIN%id%" id="countryTaxAddedTIN%id%"></div></div><div class="c-country-tax__buttons"><button type="button" class="button--md button-link icon icon-md icon-trash js-delete"><span class="button-link__label">Delete</span></button><button type="button" class="button button--md blue btn-checkmark fr js-confirm"><span class="button__label">Confirm</span></button></div></div></div></div></div>',
		ca: '<div class="c-country-tax" id="%key%"><div class="c-country-tax__box"><div class="c-country-tax__entry"><div class="c-country-tax__summary"><div class="l-grid-row"><div class="l-grid-col c-country-tax__item"><div class="l-grid-row"><div class="l-grid-col"><p><strong>País</strong></p><p class="c-country-tax__country">%country%</p></div><div class="l-grid-col"><p><strong>TIN (identificador fiscal)</strong></p><p class="c-country-tax__tin">%taxNumber%</p></div></div></div><div class="l-grid-col c-country-tax__buttons"><div class="h-100"><div class="align-vertical-center"><button type="button" class="button-icon icon icon-md icon-pencil js-edit" data-target="#countryTaxDetail%id%"><span class="button-icon__label sr-only">Edit</span></button><button type="button" class="button-icon icon icon-md icon-trash hidden-xs js-delete"><span class="button-icon__label sr-only">Eliminar</span></button></div></div></div></div></div><div class="c-country-tax__detail d-n"><div class="frm-group"><div class="frm-select__container"><label for="countryTaxAdded%id%">A quin país?</label><select name="countryTaxAdded%id%" id="countryTaxAdded%id%" class="frm-select"></select></div></div><div class="frm-group mb40"><div class="frm-select__container"><label for="countryTaxAddedTIN%id%" class="m0 align-middle">Introdueix el TIN</label>%info% <input type="text" name="countryTaxAddedTIN%id%" id="countryTaxAddedTIN%id%"></div></div><div class="c-country-tax__buttons"><button type="button" class="button--md button-link icon icon-md icon-trash js-delete"><span class="button-link__label">Eliminar</span></button><button type="button" class="button button--md blue btn-checkmark fr js-confirm"><span class="button__label">Confirmar</span></button></div></div></div></div></div>'
	}

	var lang = getDocumentLang();

	if( Html_template[lang] == undefined ) lang = 'es'; // Avoid bug for local languages (navigator translating extension)

	// Replace the placeholder text with some actual data
	newHtml = Html_template[lang].replace(/%id%/g, counter); // Regex for multiples ocurrences
	newHtml = newHtml.replace('%key%', key);
	newHtml = newHtml.replace('%country%', selectedCountryText);
	newHtml = newHtml.replace('%taxNumber%', countryTaxInputVal);
	newHtml = newHtml.replace('%info%', cboxHtml);

	// Insert the HTML into the DOM
	document.querySelector(container).insertAdjacentHTML('beforeend', newHtml);

	// Select Options by language
	var optionsList = [].slice.call(selectCountry.options), // NodeList to array [https://davidwalsh.name/nodelist-array]
		select = document.getElementById('countryTaxAdded' + counter);
	optionsList.forEach(function(currentValue, index, array) {
		select.options[select.options.length] = new Option(optionsList[index].text, optionsList[index].value);
	});

	// Set user values on new country added form elements
	document.getElementById('countryTaxAdded' + counter).selectedIndex = selectedCountryIndex;
	document.getElementById('countryTaxAddedTIN' + counter).value = countryTaxInputVal;
	
	// Enable colorbox plugin...
	$('#' + key + ' .cbox-close').colorbox({
		iframe:true,
		transition: "none",
		className:'cbox-close',
		width: '100%',
		height: '100%',
		closeButton: true,
		onComplete: function(opts) {
		},
		onCleanup: function(){
		}
	});

	// Reset 'add country' form elements
	resetAddCountryFormElements();
}
function titleCase(str) {
	return str.toLowerCase().split(' ').map(function(word) {
		return (word.charAt(0).toUpperCase() + word.slice(1));
	}).join(' ');
}
function updateSummaryItem(e){
	var keyClassName = '.c-country-tax',
		prefix = '__',
		countryLabel = 'country', taxNumberLabel = 'tin',
		optionSelectedText = titleCase( $(e).find('select option:selected').html() ),
		inputTINValue = $(e).find('input:text').val();

	$(e).find(keyClassName + prefix + countryLabel).html(optionSelectedText);
	$(e).find(keyClassName + prefix + taxNumberLabel).html(inputTINValue);
}
function resetAddCountryFormElements(){
	var selectCountry = document.getElementById('otherCountryAdd'),
		countryTaxInput = document.getElementById('otherCountryAddTIN');
	// Reset 'add country' form elements
	selectCountry.selectedIndex = 0;
	countryTaxInput.value = "";
}

// Country Tax Component [FLUJO HOLABANK]
function countryTaxComponentHandler(){
	if( !$('.c-country-tax').length > 0 ){
		return;
	}
	var keyClassName = '.c-country-tax',
		prefix = '__',
		summaryClassName = keyClassName + prefix + 'summary',
		detailClassName = keyClassName + prefix + 'detail',
		addCountryClassName = keyClassName + '--add',
		countryItemsClassName = keyClassName + '--incoming',
		deleteTaxDetailsModal = '#deleteTaxDetails',
		currentTarget, openElement, closeElement,
		toggleElementsVisibility = function(e, state, duration){
			var duration = duration || 'fast',
				parent = $(e).closest(keyClassName),
				openElementClassName = state === 'open' ? detailClassName : summaryClassName,
				closeElementClassName = state === 'close' ? detailClassName : summaryClassName;

			openElement = $(parent).find(openElementClassName);
			closeElement = $(parent).find(closeElementClassName);

			closeElement.animate({
				opacity: [ "toggle", "swing" ]
			}, duration,function() {
				// Animation complete
				openElement.animate({
					opacity: [ "toggle", "swing" ]
				}, duration);
			});
		}

	// Delegate events for DOM dynamic content
	$('#otherCountryTax').on('click', 'button', function(evt) {
		currentTarget = $( evt.currentTarget );
		if( currentTarget.hasClass('js-add') ){
			$( $(this).attr('data-target') ).on( "opened", function(evt) {
				currentTarget.prop('disabled', true);
			});
		}
	});
	// Country summary and detail events
	$(countryItemsClassName).on('click', 'button', function(evt) {
		currentTarget = $( evt.currentTarget );
		if( currentTarget.hasClass('js-edit') ){
			toggleElementsVisibility(currentTarget, 'open');
		}
		if( currentTarget.hasClass('js-delete') ){
			// Current entry
			var currentEntry = $(currentTarget).closest(keyClassName);
			// Delete confirm modal events
			$(document).on( 'cbox_complete', function(){
				setTimeout(function(){
					$(deleteTaxDetailsModal).on('click', '.js-delete-confirm', function() {
						currentEntry.fadeOut('fast', function(){
							// Animation completed
							$(this).remove();
						});
						$.colorbox.close();
					});
				}, 200);
			});
			inlineContentCBoxLoad('deleteTaxDetails');
		}
		if( currentTarget.hasClass('js-confirm') ){
			// Update values
			updateSummaryItem( $(currentTarget).closest(keyClassName) );
			// Close
			toggleElementsVisibility(currentTarget, 'close');
		}
	})
	// Add country events
	$(addCountryClassName).on('click', 'button', function(evt) {
		currentTarget = $( evt.currentTarget );
		if( currentTarget.hasClass('js-cancel') ){
			var b = $( $(this).closest(addCountryClassName) ).find('.js-add');
			$( $(this).attr('data-target') ).on( "closed", function(evt) {
				b.prop('disabled', false);
			});
			resetAddCountryFormElements();
		}
		if( currentTarget.hasClass('js-confirm') ){
			// Close add country form
			var parent = $(currentTarget).closest(keyClassName);
			var t = $(parent).find('.js-cancel').attr('data-target');
			$(t).fadeOut( 'fast', function() {
				// Animation complete
				$(this).trigger('closed');
			});
			// Add country button state
			var b = $( $(currentTarget).closest(addCountryClassName) ).find('.js-add');
			$(t).on( "closed", function(evt) {
				b.prop('disabled', false);
			});
			// Create country/tax summary
			setTimeout(function() {
				addSummaryItem();
			},200);
		}
	})
}

// Country Tax Component - Holabank variant
function countryTaxHBKComponentHandler(){
	if( !$('.hbk-form .c-country-tax').length > 0 ){
		return;
	}
	var keyClassName = '.c-country-tax',
		deleteTaxDetailsModal = '#deleteTaxDetails',
		currentTarget;

	// Country detail events
	$('.hbk-form #otherCountryTax').on('click', 'button', function(evt) {
		currentTarget = $( evt.currentTarget );
		if( currentTarget.hasClass('js-delete') ){
			// Current entry
			var currentEntry = $(currentTarget).closest(keyClassName);
			// Delete confirm modal events
			$(document).bind('cbox_complete', function(){
				setTimeout(function(){
					$(deleteTaxDetailsModal).on('click', '.js-delete-confirm', function() {
						currentEntry.fadeOut('fast', function(){
							// Animation completed
							$(this).remove();
						});
						$.colorbox.close();
					});
				}, 200);
			});
			inlineContentCBoxLoad('deleteTaxDetails');
		}
	});
}

/**************************************************
 *    @Funciones auxiliares Confirma tu identidad
 **************************************************/

//pagina seleccion de videollamada o cuenta bancaria
function comboCheckInt(){
	var videoLlamada = $(".hightlight-two-buttons .videollamada > a");
	var cuentaBancaria = $(".hightlight-two-buttons .bancaria > a");
	var opVideoLlamada = $("#videollamada");
	var opBancaria = $("#bancaria");
	var checkTrIdent = $("#tratidentidad"),
		toggleOptionIcon = function(element, origen){
			var imageCurrentPath = $(element).find('img').attr("src"),
				imageToggledPath = $(element).find('img').attr("data-toggle");

			element.find('img').attr("src", imageToggledPath).attr("data-toggle", imageCurrentPath);
		};

	// selected state for options
	$(".hightlight-two-buttons ul li a").on("click", function(){
		if( !$(this).hasClass("disabled")  ){

			if( !$(this).hasClass("selected") ){

				// Reset previous toggled images
				var previousSelected = $(".hightlight-two-buttons ul li a.selected")
				if( previousSelected && previousSelected.length > 0 ){
					if( previousSelected.find('img').length > 0 ){
						toggleOptionIcon( previousSelected, "toggle from previousSelected" );
					}
					previousSelected.removeClass('selected');
				}
				// add selected state
				$(this).addClass('selected');

				//  custom actions
				if( $(this).parent().hasClass("videollamada") ){
					if( !opBancaria.children("span").hasClass("disabled") && !checkTrIdent.prop('checked') ){
						opBancaria.children("span").addClass("disabled");
					}
					opVideoLlamada.fadeIn(500);
					if(checkTrIdent.prop('checked')){
						checkTrIdent.prev("span").trigger("click");
					}
				}
				else if( $(this).parent().hasClass("bancaria") ){
					opVideoLlamada.css("display","none");
					opBancaria.children("span").removeClass("disabled");
				}
			}
		}
		else {
			event.stopPropagation();
		}

		// Check legal activation
		checkTrIdent.on("change",function(){

			if ($(this).prop('checked')){
				opBancaria.children(".button").removeClass("disabled");
				cuentaBancaria.addClass("disabled");
			}
			else {
				opBancaria.children(".button").addClass("disabled");
				cuentaBancaria.removeClass("disabled");

			}
		});
	});
	// hover general event
	$(".hightlight-two-buttons ul li a").on('mouseenter mouseleave', function(){
		if( $(this).find('img').length > 0 ){
			if( $( this ).hasClass('selected') ){
				toggleOptionIcon( $(this), "toggle from " + event.type );
			}
		}
	});
}

function linksDisabled(){
	$(document).on("click",".combo-check .disabled a", function(e){
		e.preventDefault();
	})
}

/**************************************************
 *    @Funciones video-identificacion
 **************************************************/

/* Presentacion */

function identificationPresentation(){
	var relatedTarget, slides, slidesLength, activeItemIndex, indicators;
	$( '.js-carousel-presn' ).on('click', function(evt){
		evt.preventDefault();
		evt.stopPropagation;
		relatedTarget = $(this).attr('href');
		slides = $(relatedTarget).find('.c-carousel__item');
		activeItemIndex = $(slides).index( $(slides).filter('.active') );
		slidesLength = slides.length - 1;		
		indicators = $(relatedTarget).find('.c-carousel__indicators li');

		activeItemIndex++

		if ( activeItemIndex > 0 && activeItemIndex <= slidesLength){ /* index > 0  && index <= 3 */
			slides.filter('.active').removeClass('active');
			indicators.filter('.active').removeClass('active');
			$( slides.eq(activeItemIndex) ).addClass('active');
			$( indicators.eq(activeItemIndex) ).addClass('active');

			if( activeItemIndex == slidesLength) { /* index == 3 */
				$(this).closest('.button').addClass('d-n');
				$(document).find('input:submit').removeClass('d-n');
			}
		}
		
	});
}

/* video-llamada establecida a pantalla completa */

function videoCallBoxManagement(){
	var container =  "#conf-identidad_conectando",
		header = "#header",
		footer = "#footer",
		steps = "#bullet-steps",
		webPhone = container + ' #webphone',
		main = ".article-main",
		verticalCentering = function(){
			// Scale Visor Layout
			if( $(window).height() > $(window).width() ){
				//Portrait
				$(webPhone).css({'height': $(window).width() ,'max-height': $(window).width() , 'max-width':'initial'});
				setTimeout(function(){
					var top = ( ( $(window).height() - $(webPhone).height() ) / 2 ) + $(window).scrollTop();
					$(webPhone).css('top', top);
				}, 100);
			}

			else {
				$(webPhone).css({'height': $(window).width(),'max-height':'initial', 'max-width':$(window).height()});
				$(webPhone).css('top', 0);
			}

		},
		callEstablished = function(){
			if( $(container).length > 0  ){
				if( ( $(window).width()<=991 ) ){
					if( $(webPhone).is(':visible') ){
						// Call established
						return true;
					}
					else
					{
						// Call finished
						return false;
					}
				}
			}
		};

	if(  callEstablished() ){
		// Layout elements hidden
		$(header).css('display','none');
		$(footer).css('display','none');
		$(steps).css('display', 'none');
		$("#waitingDiv").css('display', 'none');
		// Call established
		$(main).addClass( "call-established" );
		$(container).addClass( "call-established" );
		$(container).parent(".center-block").css("height",$(window).height());
		// Vertical Centering
		verticalCentering();
	}
	else
	{
		// Call finished
		$(main).removeClass("call-established");
		$(container).removeClass("call-established");
		// Layout elements visible
		$(header).css('display', 'block');
		$(footer).css('display', 'block');
		$(steps).css('display', 'block');
		$("#waitingDiv").css('display', 'none');
		verticalCentering();
	}
}


/**************************************************
 *    @Funciones auxiliares Elige tu contrasena
 **************************************************/

function passwordShow(){
	$('.data-view a').on( "click", function(){
		if($(this).hasClass('text-off')){
			$(this).removeClass('text-off').addClass('text-on').closest('.data-view').siblings('input').attr('type','text');
		} else {
			if($(this).hasClass('text-on')){
				$(this).removeClass('text-on').addClass('text-off').closest('.data-view').siblings('input').attr('type','password');
			}
		}
	})
}

/***
 * Toggle password visibility
 * Versión actualizada para la visualización de la contraseña introducida.
 * Funcionalidad vinculada a los input:password UIX brand guide lines 2020.
 * */

function togglePasswordVisibility(){
	if( !$('.frm-custom.frm-password input[type=\'password\']').length > 0 ){
		return;
	}
	// Set up elements
	$('.frm-custom.frm-password input[type=\'password\']').each(function (index, element) {
		$(this).closest('.frm-custom.frm-password').append('<span class="h-show"></span>');
	});
	// Events handler
	$('.frm-custom.frm-password .h-show').on('click', function () {
		if( !( $(this).closest('.frm-custom.frm-password').find("[data-toggle='password']").val() ).length > 0 ){ return; } // Only when input has value
		$(this).toggleClass('h-show h-hide');
		$(this).closest('.frm-custom.frm-password').find("[data-toggle='password']").attr("type", function(_, val){
			return val == "password" ? "text" : "password"
		});
	})
	// Reset state listener/handler
	$('.frm-custom.frm-password input[type=\'password\']').on('blur', function () {
		if( !( $(this).val() ).length > 0 ){
			$(this).closest('.frm-custom.frm-password').find('.h-hide').toggleClass('h-show h-hide');
			$(this).attr("type", "password");
		}
	});
}

/**************************************************
 *    @Funciones auxiliares CMN Service
 **************************************************/

// Global vars
var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
var calendar = {
	weekHourStart: parseFloat(9.00).toFixed(2),
	weekHourEnd: parseFloat(21.00).toFixed(2)
};
var currentDateObject = new Date();

var currentDateObject = new Date('2/19/2018 20:52:10');
setTimeout(function(){
	currentDateObject = new Date('8/19/2018 20:52:10');
}, 10000)

function bankHolidays(today){

	// Constantes
	var bankHolidays = [ "March 30, 2018", "May 1, 2018", "August 15, 2018", "October 12, 2018", "November 1, 2018", "December 6, 2018", "December 8, 2018", "December 25, 2018", "January 1, 2019", "January 6, 2019" ];
	var success = false;

	// Fecha actual
	var year  = today.getFullYear(),
		month = today.getMonth(),
		day   = today.getDate(),
		date  = monthNames[month] + " " + day + ", " + year;

	// @Processing data
	$.each(bankHolidays, function(key, value) {
		if(Date.parse(value) == Date.parse(date)){
			success = true;
		}
	});

	return success;
}

function customerServiceStatus(){
	// Filtros
	if( bankHolidays( currentDateObject ) ){
		// Es Festivo Nacional
		return false;
	}
	else if( currentDateObject.getDay() < 6 && currentDateObject.getDay() !==0 ) { // Laboral entre diario
		if ( currentDateObject.getHours() >= calendar.weekHourStart &&  currentDateObject.getHours() < calendar.weekHourEnd ) {
			// Dentro de horario de atencion
			$('#bottom_sticky').addClass('active_service');
			return true;
		}
		else{
			// Fuera del horario de atencion
			return false;
		}
	}
	else {
		// Dia no laboral
		return false;
	}

}

function customerServiceNotices(notice){
	var notices_filename = ["fueradehorario"],
		notices_pathname = "/particular/general/popupapls/altaclienteonline/ayuda/aplnr/",
		extension = ".html",
		language = $('html').attr('lang'),
		url = notices_pathname + notices_filename[notice] + language + extension;
	return url;
}

function customerServiceInteractionEvents(){
	// User Interaction
	$('#bottom_sticky .cmn-cta a').on('click', function(){
		if( customerServiceStatus() == true ){
			$('.cmn-sticky .cmn-layer').toggleClass('open');
		}
		else{
			iframeContentCBoxLoad( 'Servicio no disponible', '04-01B_Aviso_Fuera_de_horario.html' )
			$('.cmn-sticky .cmn-layer').toggleClass('open');
			$('#bottom_sticky').removeClass('active_service');
		}
	});

}

function customCMBComponent(){
	
	if( !$('#bottom_sticky, .bottom_sticky').length > 0 ) return;

	// Viewing from 60 sec
	if( $('#bottom_sticky, .bottom_sticky').hasClass('error-taxation') ) return; // Rechazo  por fiscalidad no incluye custom delay
	var exist = false, delay60sElementsArr = ['#applicationInProgress', '#continueYourApplication', '#biometricDataAgree', '#videoIDWalkthrough', '#videoIdentificationOCR', '#purposeOfAccount']
	$.each(delay60sElementsArr, function (index, item) {
		if( $(item).length > 0 ) exist = true;
	});
	if(exist) {
		$('.bottom_sticky').addClass('-delay-60s');
	}
	$('html').addClass('fixed-cmb'); // Enables bottom value transition

}


/********************************
 *    @Ventana Modal
 ********************************/

function addClassName(target, classNames){
	if( $(target).length > 0 ){
		$(target).addClass(classNames);
	}
}

function removeClassName(target, classNames){
	if( $(target).length > 0 ){
		$(target).removeClass(classNames);
	}
}

// Hack para corregir error renderizado en
// safari en ios9, IE(forzar renderizado de nuevo)
function forceRendering(){
	$(window).scrollTop(0);
}

function verticalCenterHeight(){
	var winH = $(window).height();
	var paddingCboxWrapper = 10;
	var paddingColorbox = 60;
	var mainH = winH - (paddingCboxWrapper + paddingColorbox),
		activeElement = '#colorbox.open .v-center';

	// 1. Altura contenedor
	if( $( activeElement ).find('.container').length ){
		var containerH = $( activeElement ).find('.container').outerHeight(true),
			buttonsH =  $( activeElement + ' .v-center-bottom').outerHeight(true);

		var minHeight = containerH + buttonsH ;

		if(mainH < minHeight) {
			$( activeElement ).height(minHeight);
		} else {
			$( activeElement ).height(mainH);
		}

	} else {
		$( activeElement ).height(mainH);
	}

	// 2. Posicionamiento botonera
	if( (mainH - containerH) < buttonsH ){
		$( $( activeElement + ' .v-center-bottom') ).css('position', 'relative');
	} else {
		$( $( activeElement + ' .v-center-bottom[style*="position:"]') ).removeAttr( "style" );
	}

}

function verticalCenterHeightReset(){
	if( $('.apl-modal .v-center[style*="height:"]').length > 0){
		$('.apl-modal .v-center[style*="height:"]').removeAttr( "style" );
		$('.apl-modal .v-center-bottom[style*="position:"]').removeAttr( "style" );
	}
}

// Funcion para otorgar a colorbox la funcionalidad de overlay
function colorboxCloseEvents(){
	$('#colorbox').on( "click", function(e){
		e.preventDefault();
		e.stopPropagation();
		if(!($(this).hasClass('noClose'))){
			$('#cboxOverlay').trigger('click');
		}
	});

	// Funcionalidad generica close del boton aceptacion
	$('.close-cb').on('click',function(e){
		e.preventDefault();
		e.stopPropagation();
		$("#colorbox").trigger("click");
	});

	// Funcionalidad close solo desde el contenido
	$('.noCloseButton .close-cb').on('click',function(e){
		e.preventDefault();
		e.stopPropagation();
		$.colorbox.close();
	});

	// Funcionalidad close con redireccion URL
	$(".close-cb-prevent").on("click", function(event){
		event.preventDefault();
		event.stopPropagation();
		url = $(this).attr("href");
		window.location.href= url;
		$.colorbox.close();
	});

	// Funcionalidad close con redireccion URL en ventana nueva
	$('.ext-link').on('click',function(e){
		e.stopPropagation();
	});
}

function colorboxEventHooks(){
	// Colorbox abierto
	$(document).on( 'cbox_complete', function(){
		setTimeout( function(){
			// Anadir clases de apertura
			addClassName( $('#colorbox, #cboxOverlay'), 'open' );
			// Only mobile < 640
			if (curS == 1) {
				// Hack renderizado en safari
				// forceRendering();
			}
		}, 150);
	});
	// Comienzo de cierre de colorbox
	$(document).on( 'cbox_cleanup', function(){
		removeClassName( $('#colorbox, #cboxOverlay'), 'open' );
	});

}

// Modal de tipo iframe dinamico
function iframeContentCBoxLoad( target, target_href ){
	var cBoxTrigger = "<a class='cbox-iframe' href='" + target_href + "'><span class='sr-only'>" + target + "</span></a>", removeTarget;
	if( $('.enlaces-avisos-sistema').length > 0 ){
		$('.enlaces-avisos-sistema').prepend( cBoxTrigger );
	}
	else{
		$('#main').prepend( '<div class="enlaces-avisos-sistema">' + cBoxTrigger + '</div>' );
	}

	$(".cbox-iframe").colorbox({
		iframe:true,
		className:'cbox-iframe',
		open: true,
		transition: "none",
		onComplete: function(){
		},
		onCleanup: function(){
			$.colorbox.element().remove();
		}
	});
}

// Modal de tipo inline dinamico
function inlineContentCBoxLoad(target, returnFocusTo){
	var cBoxTarget = "#" + target,
		cBoxTrigger = "<a class='cbox-inline-modal' href='" + cBoxTarget + "'><span class='sr-only'>" + cBoxTarget + "</span></a>",
		closeButtonVal = true;
	if( $(cBoxTarget).length > 0 ){
		$(cBoxTarget).closest("div[class*='col']").prepend( $(cBoxTrigger) );
		$(cBoxTarget).removeClass("hidden");
		if( cBoxTarget.match(/datosValidacion/gi) || $(cBoxTarget).hasClass('noCloseButton') ) {
			closeButtonVal = false;
			$('#colorbox').addClass("noClose");
		}
		$(".cbox-inline-modal").colorbox({
			inline:true,
			className:'cbox-inline-modal',
			closeButton: closeButtonVal,
			open: true,
			transition: "none",
			onComplete: function(){
				// Simulacion efecto overlay desde la parte inferior del popup al browser
				$( "#cboxContent" ).on('click','.apl-modal',function(e){
					e.stopPropagation();
				});
				$( "#cboxContent" ).on( "click", function(e){
					e.preventDefault();
					e.stopPropagation();
					if(!($('#colorbox').hasClass('noClose'))){
						$('#cboxOverlay').trigger('click');
					}
				});

				// Only mobile < 640
				if (curS == 1) {
					// Inline colorbox vertical height
					setTimeout( function(){
						verticalCenterHeight();
					}, 300);
				}
			},
			onCleanup: function(){
				$(this).remove();
				$(cBoxTarget).find(".container").removeAttr("style");
				$(cBoxTarget).addClass("hidden");
				$('#colorbox').removeClass("noClose");

				// Only mobile < 640
				if ( curS == 1 ) {
					// Inline colorbox vertical height Reset
					verticalCenterHeightReset();
				}
			},
			onClosed: function(){
				if ( returnFocusTo != undefined ) {
					$( returnFocusTo.get(0) ).trigger( "focus");
				}
			}
		});
	}
}

// Modal de tipo inline estatico
function colorboxInlineEventsHooks(){
	$(".cbox-inline").on('click keypress', function(e){
		// avoid hash in URL
		e.preventDefault();

		// Only mobile < 640
		if ( curS == 1 ) {
			$(document).on( 'cbox_complete', function(){
				setTimeout( function(){
					verticalCenterHeight();
				}, 150);

			});
			$(document).on( 'cbox_cleanup', function(){
				// Reset
				verticalCenterHeightReset();
			});
		}
	});
}

function cerraPopupEnlace(){
	$(".close-cb-prevent").on("click", function(e){
		url = $(this).attr("href");
		//window.open(url, '_blank');
		window.parent.location.href= url;
		//return false;

		parent.jQuery.colorbox.close();
		//window.location.href = 'http://yourlink.com';
	});
}

/**************************************************
 *    @Funciones auxiliares flujo onBoarding
 **************************************************/

var dropdownSelectMenuContent;
function dropdownSelectMenu(object, selectedIndex){
    if( selectedIndex > 0 && $(object).children().eq(selectedIndex).attr('data-target') !== undefined ){
        dropdownSelectMenuContent = '#' + $(object).children().eq(selectedIndex).attr('data-target') ;
        $( dropdownSelectMenuContent ).slideDown();
    }else if( dropdownSelectMenuContent !== undefined ) {
        $( dropdownSelectMenuContent ).slideUp();
        dropdownSelectMenuContent = undefined;
    }
}
function promoButtonReset(){
	$('[data-toggle="visibility"]:not( [aria-expanded="false"] )').each(function(i,e) {
		$(this).closest( $(this).attr('data-parent') ).toggleClass('active');
		$(this).attr('aria-expanded', function(i, value) {
			return value == 'true' ? false : true;
		})
		$(this).text() == $(this).data("text-pressed")
			? $(this).text($(this).data("text"))
			: $(this).text($(this).data("text-pressed"));
	})
}
function visibilityToggle(){
	$('[data-toggle="visibility"]').each(function(i,e) {
		$(e).on('click', function() {
			$(this).closest( $(this).attr('data-parent') ).toggleClass('active');
			$(this).attr('aria-expanded', function(i, value) {
				return value == 'true' ? false : true;
			})
		});
	})
}
function toggleText(){
	if(!$('.js-toggle-text').length > 0){
		return;
	}
	$('.js-toggle-text').each(function(i,element) {
		$(element).on('click', function() {
			$(this).text() == $(this).data("text-pressed")
				? $(this).text($(this).data("text"))
				: $(this).text($(this).data("text-pressed"));
		});
	});
}
function availablePromotions(){
	if(!$('.js-promotion button').length > 0){
		return;
	}
	// Global events
	$('.js-promotion').on( "promo:toggle", function( evt ) {
		var _this = $(evt.currentTarget)
		if( _this.is('.js-promotion--added') ) {
			_this.trigger( "promo:added" );
		} else {
			_this.trigger( "promo:removed" );
		}
	});
	$('.js-promotion button').each(function(i,element) {
		$(element).on('click', function(event) {
			event.stopPropagation();
			var thisParent = $(this).closest( $(this).attr('data-parent') );
			// Reset
			if( $('.promotions .js-promotion--added').not(thisParent).length > 0 ) {
			    // @STEP PRODUCTO [Flujo MVP] support
				if( thisParent.hasClass('active') ) {
					var resetVisibility = $('.promotions .js-promotion.active ').not(thisParent);
						$(resetVisibility).toggleClass('active');
						$(resetVisibility).attr('aria-expanded', function(i, value) {
							return value == 'true' ? false : true;
						});
				}
			    
				var buttonReset = $('.promotions .js-promotion--added .js-toggle-text');
				buttonReset.text() == buttonReset.data("text-pressed")
					? buttonReset.text(buttonReset.data("text"))
					: buttonReset.text(buttonReset.data("text-pressed"));
				
				$('.promotions .js-promotion--added').removeClass('js-promotion--added is-added');
			}
			$(this).closest( $(this).attr('data-parent') ).toggleClass('js-promotion--added is-added');
			$(thisParent).trigger( "promo:toggle" );
		});
	});
}
function becomeACustomerProducts() {
	var becomeACustomerSelector = '#becomeACustomerProducts';
	if( !$(becomeACustomerSelector).length > 0 ){
		return;
	}
	// 1. Get promo elements
	var _this = {		
		promoProducts: $( becomeACustomerSelector ).find('.js-promotion'),
		relatedInput: $( becomeACustomerSelector ).find('input:checkbox:first'),
		relatedInputToggleState: function(){
			if( _this.relatedInput.hasClass('cform')){
				_this.relatedInput.prev('.custom-form-checkbox').trigger('click')
			} else {
				_this.relatedInput.trigger('click');
			}
		}
	}
	// 2. General Events
	_this.promoProducts.on( "promo:added", function(evt) {
		if ( !_this.relatedInput.is(':checked') ) {
			_this.relatedInputToggleState();			
		}
	});
}
var relatedPromo, currentTarget, currentTargetIndex, currentTargetBtn;
function confirmBecomeACustomerProducts() {
	var confirmModalSelector = $('#confirmarIncentivo, #confirmIncentive');

	if( !$(confirmModalSelector).length > 0 ){
		return;
	}
	// 1. Get promo elements
	var _this = {		
		confirmChildren: $( confirmModalSelector ).find('.js-promotion'),
		contWhProductBtn: $('#contWhProduct'),
		contWhOProductBtn: $('#contWhOProduct'),
		cboxClose: '#cboxClose',
		activatePromoSelection: function(){
			_this.contWhProductBtn.attr('disabled', false);
			$(_this.cboxClose).attr('disabled', true);
			_this.contWhOProductBtn.attr('aria-disabled', true); 
			$('#colorbox').addClass('noClose');
		},
		resetPromoSelection: function(){
			_this.contWhProductBtn.attr('disabled', true);
			$(_this.cboxClose).attr('disabled', false);
			_this.contWhOProductBtn.attr('aria-disabled', false);
			$('#colorbox').removeClass('noClose');
		},
		checkRelatedPromo: function(){	
			var carousel = $(confirmModalSelector).find('.promotions');
			// if carousel is active
			if( carousel.hasClass('owl-carousel') && carousel.find('.js-promotion--added').length > 0 ) {							
				if( carousel.find('.js-promotion').length > dots.length ){
					// Trigger dot for grouped items view ( example: >= 510px: 2 visible items)
					var groupIndex = Math.floor(currentTargetIndex / sm.items(carousel));
					$(dots[groupIndex]).trigger('click');
				} else {
					// Single view
					$(dots[activeIndex]).trigger('click');
				}	
			}
		}
	}
	// 2. General Events
	_this.confirmChildren.on( "promo:added", function(evt) {
		currentTarget = $(evt.currentTarget);
		currentTargetIndex = $(_this.confirmChildren).index(currentTarget)
		currentTargetBtn = $(currentTarget).find('.js-toggle-related');
		relatedPromo = $(currentTargetBtn).attr('data-related');
		_this.activatePromoSelection();
		
	});
	_this.confirmChildren.on( "promo:removed", function(evt) {
		if( !_this.confirmChildren.filter('.js-promotion--added').length > 0 ) {
			_this.resetPromoSelection();
		}		
	});
	// 3. Close events
	_this.contWhProductBtn.on('click', function(e) {
		e.stopPropagation();		
		_this.checkRelatedPromo();
		$(relatedPromo).trigger('click');
		_this.resetPromoSelection();	
		$("#colorbox").trigger("click");
	})
	_this.contWhOProductBtn.on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		_this.resetPromoSelection();
		$("#colorbox").trigger("click");
	})
}
function customCheckboxToggleState() {
	if( !$('input:checkbox[data-toggle="state"]').length > 0 ){
		return;
	}
	$('input:checkbox[data-toggle="state"]').on('change', function(){
		$(this).closest( $(this).attr('data-target') ).toggleClass('is-checked');
	})
}

// Product Option Cards
function productOptionCards() {
	if(!$('.c-options').length > 0){
		return;
	}
	$('.c-options .c-options__card .state-trigger').each(function(i,button) {
	    var root = $(this).closest('.c-options'),
            cards = root.find('.c-options__card'),
            buttons = root.find('.state-trigger');
		$(button).on('click', function() {
		    // Reset/toggle card state
            cards.removeClass('active');
            $(this).closest('.c-options__card').toggleClass('active');
            // Reset/toggle button state
            buttons.removeAttr('disabled').text( $(this).data("state") );
            $(this).attr('disabled', true).text() == $(this).data("state-selected")
                ? $(this).text($(this).data("state"))
                : $(this).text($(this).data("state-selected"));
		});
	});
}
// Ofertas Comerciales Checkbox Group
function checkBoxGroupRelated(){
	if( !$( '.js-checkboxgrouprelated' ).length > 0 ){
		return;
	}
	$( '.js-checkboxgrouprelated' ).on('change',function() {
		var checkboxgroup = $('#' + $('form input:checkbox[class*="' + $(this).attr('data-related') + '"]').attr('data-parent') ),
			checkboxgroupChildren = checkboxgroup.find('input:checkbox[class*="' + $(this).attr('data-related') + '"]');

		// Reset checkbox checked y deshabilitar
		if( $(this).attr('data-enable') == "true" && checkboxgroup[0].hasAttribute('disabled') ){
			checkboxgroup.attr('disabled', false);
			checkboxgroupChildren.each(function(){
				if( !$(this).is('checked') ){
					$(this).get(0).disabled = false;
				}
			});
		}
		else{
			checkboxgroup.attr('disabled', true);
			checkboxgroupChildren.each(function(){

				if( $(this).get(0).checked == true  ){
					$(this).get(0).checked = false;
					$(this).trigger('change');
					if( $(this).hasClass('cform')){
						$(this).prev('.custom-form-checkbox').trigger('click')
						$(this).prev('.custom-form-checkbox').removeClass('custom-form-focused').addClass('custom-form-disabled');
					}else{
						$(this).trigger('click');
					}
					$(this).get(0).disabled = true;
				}
			});
		}
	});
}
/**************************************************
 *    @Funciones auxiliares flujo videoDesasistida
 **************************************************/
function identificationMethodSwitch(){
	if ( $('[name="identificationmethod"]').length > 0 ) {
		var optionChangeEvent = function(){
			$('[name="identificationmethod"]:not(:checked)').each(function(){
				if( $(this).closest('.identification-method__option').hasClass('selected') ){
					$(this).closest('.identification-method__option').removeClass('selected');
				}
			});
			$('[name="identificationmethod"]:checked').closest('.identification-method__option').addClass('selected');
			$('[name="identificationmethod"]:checked').trigger( "focus");
		}

		if( $('[name="identificationmethod"]:checked').length > 0 ){
			optionChangeEvent();
		}
		$('[name="identificationmethod"]').on('change', function() {
			optionChangeEvent();
		});
	}
}

function equalheight(element){
	if ( $(element).length > 0 ) {
		if( $(window).width() > 640 ){
			// the browser window is larger than 640px
			var maxHeight = 0;
			$(element).each(function(){
				if ($(this).outerHeight() > maxHeight) { maxHeight = $(this).outerHeight(); }
			});
			$(element).outerHeight(maxHeight);
		}
		else {
			$(element).each(function(){
				$(this).removeAttr('style');
			});
		}

	}
}
function equalheightMediaAll(element){
	if ( !$(element).length > 0 ) {
		return;
	}
	// the browser window is larger than 640px
	var maxHeight = 0;
	$(element).each(function(){
		if ($(this).outerHeight() > maxHeight) { maxHeight = $(this).outerHeight(); }
	});
	$(element).outerHeight(maxHeight);
}
function equalheightSelectors(){
	equalheight(".identification-method__col");
	equalheight('.select-document-type__title');
	equalheight('.equal-height__91816');
	equalheightMediaAll('.equal-height__91316');
	equalheightMediaAll('.equal-height__91316-1');
	equalheightMediaAll('.c-opt-group_theme_kyc .c-opt-group__item');
	equalheightMediaAll('.c-opt-group_theme_kyc .c-opt-group__item label .text');
}
function attrExist(attr){
	return typeof attr !== 'undefined' && attr !== false;
}
function isURL(s){
	return s.split(".html").length > 1

}
function modalDinamicTrigger(){
	if( !$('.js-modal-trigger').length > 0 ){
		return;
	}
	// Open modal
	var openModal = function(element){
		if( attrExist( $(element).attr('href') ) ){
			if( isURL($(element).attr('href')) ){
				$.colorbox({
					open: true,
					href: $(element).attr('href'),
					iframe:true,
					transition: "none",
					className:'cbox-close',
					width: '100%',
					height: '100%',
					closeButton: true,
					onComplete: function(opts) {
					},
					onCleanup: function(){
					}
				});
			}
		}
		else {
			if(  attrExist( $(element).attr('data-target') )  ) {
				inlineContentCBoxLoad( $(element).attr('data-target') );
			}
		}
	}
	// Events
	$('.js-modal-trigger').each(function() {
		$(this).on('click', function(event){
			var _this = $(this);
			// if( attrExist( _this.attr('href') ) ) {
			// 	if (isURL(_this.attr('href'))) {
			// 		event.preventDefault();
			// 	}
			// }
			if ( $("#colorbox").css("display")=="block" ) {
				$.colorbox.close();
				setTimeout(function() {
					openModal(_this);
				}, 1200)
			}else{
				openModal(_this);
			}
		});
	});
}
var flagInfo;
function authorizationModalEvents() {
	$('#authorizationRelatedInfoModal').on('click', function(event) {
		flagInfo = false;
		event.preventDefault();
		$(document).on( 'cbox_closed', function(){
			if( flagInfo == false ){
				flagInfo = true;
				$('#authorizationRelatedInfo').trigger('click');
			}
		});
		$.colorbox.close()
	})
}
function relatedOptions(){
	if( !$('.js-related').length > 0 ){
		return;
	}
	var updateRelatedOption = function(e){
		var _this = e.currentTarget,
			related = $(_this).attr('data-related'),
			currentRelatedCkeckedOption = $('input:radio[name="' + $(related).attr('name')  + '"]:checked');

		// Reset/Change previous active elements
		if( currentRelatedCkeckedOption.length > 0 ){
			if( !$(related).is(currentRelatedCkeckedOption) ){
				$(related).prop('checked', true);
			}
		} else {
			$(related).prop('checked', true);
		}
	}
	// Events
	$('.js-related').each(function() {
		$(this).on('click', updateRelatedOption);
	});

}
function documentTypeSelectionSwitcher() {
	if(!$('.c-document-type .c-switch__input').length > 0){
		return;
	}
	var switchers = undefined;
	$('.c-document-type .c-switch__input').each(function(i,element) {
		$(element).on('change', function() {
			switchers = $(this).closest('.c-document-type').find('.c-switch__input');
			switchers.closest('.c-switch__option').removeClass('h-disabled h-checked');
			switchers.filter(':not(:checked)').closest('.c-switch__option').addClass('h-disabled');
			switchers.filter(':checked').closest('.c-switch__option').addClass('h-checked');
		});
	});
}

/********************************
 *    @Carousel 
 ********************************/

function basicCarousel(){
	var carousel, slides, slidesLength, slideIndex, direction;
	carousel = $('[data-ride="carousel"]');
	
	if(!carousel.length > 0){
		return
	}

	var getCarousel = function(e) {
		return $(e).closest('.c-carousel');
	}

	var getItems = function(c){
		return $(c).find('.c-carousel__item');
	}

	var getIndicators = function(c){
		return $(c).find('.c-carousel__indicators button');
	}

	var current = function (c, i) {
		if ( $(c).find('.active').index() === i ){
			return i
		}
		if ( i <= getItems(c).length ){
			return i
		}
	}

	var to = function (c, i) {
		var a = current(c, i),
			slides = getItems(c),
			indicators = getIndicators(c);
		$(slides).filter('.active').fadeOut('fast').removeClass('active');
		$(indicators).filter('.active').removeClass('active');
		$( slides.eq(a) ).fadeIn('fast').addClass('active');
		$( indicators.eq(a) ).addClass('active');
		$( slides.eq(a) ).trigger("item:toggle");
	}

	var indicatorsControlHandler = function(evt){
		evt.stopImmediatePropagation();
		var _this = $(evt.currentTarget),			
			carousel =  getCarousel(_this),
			indicators = getIndicators(carousel),
			indicatorIndex = indicators.index( _this );

			to(carousel, indicatorIndex);			
	}

	var presentationModeHandler = function(evt) {
		evt.preventDefault();
		evt.stopPropagation();
		var _this = $(evt.currentTarget),			
			carousel =  function(){
				return $( _this)[0].hasAttribute('href') ? $( _this.attr('href') ) : $( _this.attr('data-target' ) );
			},
			slides = getItems( carousel ),
			activeItemIndex = $(slides).index( $(slides).filter('.active') ),
			attr = _this.attr( 'data-slide' );

			(typeof attr !== typeof undefined && attr !== false) && attr === "next" ? activeItemIndex++ : activeItemIndex--

			if ( activeItemIndex <= getItems( carousel ).length - 1 ){
				to(carousel, activeItemIndex);	
			}
	}

	var presentationLastSlideHandler = function(evt) {
		var c = getCarousel(evt.currentTarget),
			s = getItems( c ),
			a = $(s).index( $(s).filter('.active') ),
			l = s.length - 1,
			b = $('.js-carousel-presn').closest('.button'),
			i = $(document).find('input:submit'),
			t = function(a, b) {
				a.removeClass('d-n'); b.addClass('d-n');
			};

		a === l ? t(i, b) : t(b, i);
	}

	// TEMPORAL
	carousel.each(function(){
		var firstElement = $(this).find('.c-carousel__item:first-child');
			firstElement.addClass('active')
			slides = $(this).find('.c-carousel__item');

			// Events
			$('.c-carousel__indicators button').on('click', indicatorsControlHandler )

			// Custom
			$('.js-carousel-presn').on('click', presentationModeHandler );
			$( slides ).on('item:toggle', presentationLastSlideHandler );
	});
}

var config = {
	'0' : 1,
	'510' : {
		margin: function(carousel) {				
			return carousel.find('.js-promotion').length > 1 ? 10 : 0;			
		},
		items: function(carousel) {
			return carousel.find('.js-promotion').length > 1 ? 2 : 1;			
		}
	}
}, sm = config['510'], dots;
function customerProductsCarousel(){
	var becomeACustomerSelector = '#becomeACustomerProducts', viewPort, query, carousel, enableCarousel, removeCarousel;
	if( !$(becomeACustomerSelector).length > 0 ){
		return;
	}
	carousel = $(becomeACustomerSelector).find('.promotions');
	// Flag: For multiple products and only on mobile
	query = function(){
		return ( isMobileDevice() && $(carousel).find('.promotions__item').length > 1 );
	} 

	enableCarousel = function(){
		carousel.addClass('owl-carousel owl-theme cbk-theme').owlCarousel({
			responsive: {
				0: {
					items: 1,
					lazyLoad: true,
					nav: false,						
					dots: true
				},
				510: {
					margin: sm.margin(carousel),
					items: sm.items(carousel),
					lazyLoad: true,
					nav: false,						
					dots: true
				}
			},
			onInitialized: setGlobalVars()
		});
	}
	removeCarousel = function() {
		carousel.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-theme cbk-theme');	
	}
	setCarouselState = function(event){
		viewPort = $( window.parent.document.body ).width();
		if( event.data.query ) {
			if ( viewPort >= 768 ) { // Remove carousel		
				removeCarousel();		
			} else { // Re-Enable carousel 
				enableCarousel();
			}
		}
	}
	setGlobalVars = function() {
		dots = $(becomeACustomerSelector).find('.owl-carousel .owl-dot');
	}

	// Toggle carousel event listener/handler
	$('.promotions').on( "carousel:toggle", {query: query}, setCarouselState);

	if( query ) { 
		$(carousel).trigger( "carousel:toggle" );					
	} 
	$('.owl-carousel').each(function(i,e){
		// Resize event
		$(window).on("resize",function(){		
			waitForFinalEvent(function(){
				if( query ) { 
					$(e).trigger( "carousel:toggle" );				
				}
			}, 200, "resize");
		});
	});
	
}
var activeIndex
function confirmProductsCarousel(){
	var query, viewPort, carousel, enableCarousel, removeCarousel;

	carousel = $('#confirmarIncentivo .promotions, #confirmIncentive .promotions');
	if( !$(carousel).length > 0 ){
		return;
	}	
	
	var onChangedEvent = function(event){		
		activeIndex = event.item.index;
	}
	enableCarousel = function(){
		carousel.addClass('owl-carousel owl-theme cbk-theme').owlCarousel({
			onChanged: onChangedEvent,
			responsive: {
				0: {
					items: 1,
					lazyLoad: true,
					nav: false,						
					dots: true
				},
				510: {
					margin: sm.margin(carousel),
					items: sm.items(carousel),
					lazyLoad: true,
					nav: false,						
					dots: true
				}
			}
		});
	}
	removeCarousel = function() {
		carousel.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-theme cbk-theme');
	}
	setCarouselState = function(event){
		viewPort = $( window.parent.document.body ).width();
		if( event.data.query ) {
			if ( viewPort >= 768 ) { // Remove carousel		
				removeCarousel();		
			} else { // Re-Enable carousel 
				enableCarousel();
			}
		}
	}
	centerActiveItem = function(carousel){
		var a = carousel.find('.owl-dot.active');
			b = currentTargetIndex;
		// if( a.length > 0 ){
		// 	carousel.trigger('to.owl.carousel', [1]);
		// }
	}

	$(document).on( 'cbox_complete', function(){
		setTimeout(function() {
			// Flag: For multiple products and only on mobile
			query = isMobileDevice() &&
			$('#colorbox').is(':visible') && 
			$(carousel).find('.promotions__item').length > 1;

			// Toggle carousel event listener/handler
			$(carousel).on( "carousel:toggle", {query: query}, setCarouselState);			

			if( query ) {							
				$(carousel).trigger( "carousel:toggle" );					

				$(window).on("resize",function(){		
					waitForFinalEvent(function(){
						carousel.trigger( "carousel:toggle" );										
					}, 200, "resize");
				});	
			}

		}, 200);
	});
	$(document).on( 'cbox_cleanup', function(){				
		removeCarousel(); // Reset
		//$(carousel).off( "carousel:toggle", {query: query}, setCarouselState); // Remove listener
	});
}

/********************************
 *    @mobile
 ********************************/

// Funcion para evitar zoom en elementos input para IOS
function zoomPreventOnIOS(){
	// Meta contenido no escalable
	var zoomDisable = function() {
		$('meta[name=viewport]').attr('content','width=device-width, initial-scale=1, user-scalable=0');
	};
	// Meta contenido escalable
	var zoomEnable = function() {
		$('meta[name=viewport]').attr('content','width=device-width, initial-scale=1');
	};
	if( navigator.userAgent.length && /iPhone|iPad|iPod/i.test( navigator.userAgent ) ) {

		$("input[type='text']:enabled","textarea:enabled","select:enabled").first().trigger( "focus");
		$( "input, textarea, select, .custom-form-select" ).on( "touchstart", function( event ) {
			zoomDisable(); setTimeout( zoomEnable , 1200 );
		});
		$( "input, textarea, select, .custom-form-select" ).on( "focusout", function( event ) {
			zoomDisable(); setTimeout( zoomEnable , 1200 );
		});

	}
}

// Funcion para el control de la visibilidad de elementos del layout
function  layoutElementsVisibility(){
	var layoutElements = $('#bullet-steps, #footer');
	if( ( $(window).width()<=991 ) ){
		layoutElements.css('display','none');
	}else {
		layoutElements.css('display','block');
	}
}

// Dectecion de dispositivos moviles
function isMobileDevice() {
	var orientation = (screen.orientation || {}).type || screen.mozOrientation || screen.msOrientation || window.orientation;
	return (typeof orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

/********************************
 *    @Miscelanea
 ********************************/
function noopenLinksEvents(){
	$( 'a[rel="noopen"]' ).on('click', function(event){
		event.preventDefault();
		event.stopPropagation();
	});
}

/********************************
 *    @Internet Explorer 
 ********************************/

function getUserAgentVersion() {
	// https://www.geeksforgeeks.org/how-to-check-the-user-is-using-internet-explorer-in-javascript/
	var ua = window.navigator.userAgent;

	// Older versions
	var msie = ua.indexOf('MSIE ');
	if (msie > 0) {
		// IE 10 or older => return version number
		return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
	}

	// IE11
	var trident = ua.indexOf('Trident/');
	if (trident > 0) {
		// IE 11 => return version number
		var rv = ua.indexOf('rv:');
		return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
	}
}

function internetExplorerSupport(){
	var vr = getUserAgentVersion();
	// IE9 +
	if ( vr === 9 ){
		$('html').addClass('ie-9');
		customSelectArrowPolyfill();
	}
	if ( vr === 10 ){
		$('html').addClass('ie-10');
		customSelectArrowPolyfill();
	}
	// All IE versions
	if ( vr >= 9 && vr <= 11 ){
		$('html').addClass('ie');
	}
}

/** > Form elements support */
function customSelectArrowPolyfill() {
	// IE9 Arrow appearance
	var SELECT_SPACER_TOP = 14;
	$('.frm-select').each(function() {
		$(this).after('<div class="frm-select__icon"></div>');
		var height = ( $(this).closest('.frm-select__container').height() ) - ( $(this).outerHeight() ),
			y = height + SELECT_SPACER_TOP ;
		$(this).closest('.frm-select__container').find('.frm-select__icon').css({ 'top': y + 'px' });
	});
}


/********************************
 *    @Components
 ********************************/

var frmComponent = function(){
	

	//@Input control radio/checkboxes

		//@Local vars
		var implicitLabels = {}, iaLabels = $('.frm-control-implicitly-label'),
		checkedElements = $(iaLabels).find('input:checked'), disabledElements = $(iaLabels).find('input:disabled'),
		disabledElementsNodeList = document.querySelectorAll('.frm-control-implicitly-label input:disabled'),
		resetList;

		// Implicitly Associated labels
		implicitLabels.onLoad = function(){
			if( !iaLabels.length > 0 ) return;

			implicitLabels.Listeners(iaLabels);
			implicitLabels.Observers(disabledElementsNodeList);

			// pre-activated elements on page load
			if( checkedElements.length > 0 ) implicitLabels.setCheckedControls(checkedElements);
			if( disabledElements.length > 0 ) implicitLabels.setDisabledControls(disabledElements);
		}
		implicitLabels.Listeners = function(arr){
			$(arr).each(function (){

				// States
				$(this).on("change", function(evt){
					implicitLabels.changeStateHandler(evt);
				});
			});
		}
		implicitLabels.changeStateHandler= function(evt){
			var this_ = evt.target, type = evt.target.type;
			switch ( type ){
				case 'checkbox':
					implicitLabels.toggleChecked(this_);
					break;
				case 'radio':
					implicitLabels.resetControlGroupChecked(this_);
					implicitLabels.toggleChecked(this_);
					break;
			}
		}
		implicitLabels.resetControlGroupChecked = function(e){
			resetList = $( "input[name='" + (e.name) +"']").not(e);
			resetList.each(function (){
				$(this).prop( "checked", false ).closest('label').removeClass('is-checked');
			})
		}
		implicitLabels.toggleChecked = function(e){
			$(e).closest('label').toggleClass("is-checked");
		}
		implicitLabels.toggleDisabled = function(e){
			$(e).is(":disabled") ?
				$(e).closest('label').addClass("is-disabled") :
				$(e).closest('label').removeClass("is-disabled");
		}
		implicitLabels.setCheckedControls = function(arr){
			$(arr).each(function (i,e){
				implicitLabels.toggleChecked(e);
			})
		}
		implicitLabels.setDisabledControls = function(arr){
			$(arr).each(function (i,e){
				implicitLabels.toggleDisabled(e);
			})
		}
		implicitLabels.Observers = function(arr){
			// Based on: https://gist.github.com/zlatkov?page=9 (IE11, FF, Chrome, Opera, Safari)
			if( "MutationObserver" in window ) {
				var mutationObserver = new MutationObserver(function(mutations) {
					mutations.forEach(function(mutation) {
						if( mutation.attributeName === 'disabled' ) implicitLabels.toggleDisabled(mutation.target);
					});
				});
				// Starts listening for changes in the root HTML element of the page.
				mutationObserver.observe(document.documentElement, {
					attributes: true,
					characterData: true,
					childList: true,
					subtree: true,
					attributeOldValue: true,
					characterDataOldValue: true
				});
			}

		}
		implicitLabels.onLoad();
}

/** Embed PDF Viewer */
var embedPDFViewer = function(){
	if( !$('#pdf-viewer').length > 0 ) return;

	var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

	// Polyfill
	if( isSafari ) {
		$('html').addClass('safari');
		$('#pdf-viewer').load(function(){
			console.log('loaded')
			$('#pdf-viewer').contents().find('body > img').css({
				width: '100%'
			});
		});
	}
}

var legalInfoViewerComponent = function(){
    // Public vars
    var legalViewer = {}, selector = {}, xhr, current, PERCENT = 95;

    selector = {
        trigger: '.js-legal-viewer',
        viewer: '.c-legal-viewer',
        viewerLoader: '.c-legal-viewer__loader',
        viewerContent: '.c-legal-viewer__content',
        viewerContainer: '.c-legal-viewer__container',
        viewerClose: '.c-legal-viewer__close',
        confirmConditions: '.c-legal-viewer__accept-conditions',
        ctIframe: '.c-legal-viewer__iframe',
        acceptConditionsBtn: '.confirm-conditions__accept-btn'
    }

    if( !$(selector.trigger).length > 0 ) return;

    // Methods
    legalViewer.openViewerEventListener = function () {
        $(selector.trigger).on('click', legalViewer.colorbox );
    },
    legalViewer.preloadViewer= function (html) {        
        $(selector.viewerContent).append(html);
        $(selector.viewerContent).fadeIn('fast', function () {
            // Content ready for read confirmation
            $(document).trigger('full:read');
        });
        setTimeout(function(){
            $(selector.viewerLoader).fadeOut('fast', function() {
                $(selector.viewerLoader).removeAttr('style')
            });
        }, 600);
    },
    legalViewer.colorbox = function(event){
        // Reset click default action and propagation for tag <a>
        event.preventDefault();
        event.stopPropagation();

        current = this;

        // Local vars
        var modal = $(current).attr('href'),
            identifier = '#' + $(current).attr('id'),
            url = $(current).attr('data-href');

        $(selector.viewerLoader).fadeIn();

        // Invoque 'Read confirmation'
        legalViewer.confirmConditions();

        // Invoque 'Close without confirm'
        legalViewer.confirmReadBeforeCloseViewer();

        // Pre-load colorbox
        legalViewer.getDocumentByAjax(identifier, url);

        var onCompleteHandler = function(){

            // Enable modal layout content
            $( modal ).removeClass("hidden");

            // Simulación efecto overlay desde la parte inferior del popup al browser
            $("#cboxContent").on('click', '.apl-modal', function (e) {
                e.stopPropagation();
            });
            $("#cboxContent").on( "click", function (e) {
                e.preventDefault();
                e.stopPropagation();
                if (!($('#colorbox').hasClass('noClose'))) {
                    $('#cboxOverlay').trigger('click');
                }
            });

            // Accept terms / close modal
            $(selector.acceptConditionsBtn).on('click', function(){
                $.colorbox.close();
            });
            
            // [Bugfix] Prevent scrollbar scrolling on viewer opening
            $('#colorbox .apl-modal__body').scrollTop(0);

        }
        var onCleanupHandler = function(){

            // Reset
            $(selector.viewerContent).empty().removeAttr('style');
            $( modal ).addClass("hidden");
            $(selector.viewerLoader).removeAttr('style');
            $(selector.acceptConditionsBtn).prop('disabled', false);
        }

        //  Init Colorbox instance
        $(current).colorbox({
            inline: true,
            open: true,
            transition: 'none',
            closeButton: false,
            className: 'c-colorbox c-colorbox--theme-legal-info noClose',
            onComplete: function() {
                setTimeout(function () {
                    onCompleteHandler();
                }, 100);
            },
            onCleanup: function() {
                setTimeout(function () {
                    onCleanupHandler();
                }, 100)          ;
            },
            onClosed: function () {
                //$('#colorbox, #cboxOverlay').removeClass('c-colorbox c-colorbox--theme-legal-info');
            }
        })

    },
    legalViewer.getDocumentByAjax = function(identifier, url){
        xhr = $.ajax({
            url: url,
            beforeSend : function(){
                // Si existe una llamada en ejecución, la eliminamos previamente a realizar esta.
                if(xhr != null) {
                    xhr.abort();
                }
            },
            statusCode: {
                401: function() {
                    console.error( "page not authorized" );
                },
                404: function() {
                    console.error( "page not found" );
                }
            }
        })
        .done(function (data) {
            if( data !== '' && data !== null ){
                var html = $( $.parseHTML(data) ).find(identifier).html();
                legalViewer.preloadViewer(html);
            } else {
                console.error('Document data not available', url);
            }
        })
        .fail(function(){
            console.log(xhr.status, xhr.statusText);
        });
    },
    legalViewer.confirmConditions = function () {
	    // Avoid when terms are accepted
	    if( legalViewer.attrExist($(current), 'data-read') && $(current).attr('data-read') !== 'true' ) {

	        $(selector.acceptConditionsBtn).prop('disabled', true);

	        $(document).on('full:read', function(event){
	            // Scroll at bottom
	            $(selector.viewerContainer)
	                .on('scroll', function (evt) {
	                    if (legalViewer.scrollAtPageBottom(evt)) {
	                        $(selector.acceptConditionsBtn).prop('disabled', false);
	                    }
	                });
	        })

	        $(document).on('cbox_cleanup', function(){
	            $(document).off('full:read');
	        });

	        $(selector.acceptConditionsBtn).on('click', function() {
	            $(current).attr('data-read', true);
	        });
	    };
    },
    legalViewer.confirmReadBeforeCloseViewer = function(){
        var trigger = $(current), modal = $(trigger).attr('href');

        $(selector.viewerClose).off('click');

        // Conditions Acceptation
        $(selector.viewerClose).on('click', function(evt){
            evt.preventDefault();
            evt.stopImmediatePropagation();

            // Avoid when terms are accepted
            if( legalViewer.attrExist(trigger, 'data-read') && $(trigger).attr('data-read') === 'true' ) {
                $.colorbox.close();
            } else {

                var alert = $(this).attr('data-alert'), alertContent = $(alert).clone(),
                    parent = $(modal).parent();

                // Hide viewer content
                $(modal).addClass('fade-out -fast');
                setTimeout(function () {
                    $(modal).addClass('is-hidden').removeClass('fade-out -fast');
                }, 700);

                // Show confirm window
                setTimeout(function () {

                    // Pre set theme for confirm theme
                    $('#colorbox, #cboxOverlay').toggleClass('c-colorbox--theme-legal-info c-colorbox--theme-confirm-window');
                    parent.append(alertContent);
                    $(alertContent).addClass('fade-in -fast').removeClass('hidden');

                    // Events
                    $(document).on('cbox_closed', function () {
                        $(modal).removeClass('required-full-read').removeAttr('style')
                        $(modal).find('.confirm-conditions__full-read').removeClass('confirm-conditions__full-read');
                        if( $('#colorbox, #cboxOverlay').hasClass('c-colorbox--theme-confirm-window') ){
                            $('#colorbox, #cboxOverlay').toggleClass('c-colorbox--theme-legal-info c-colorbox--theme-confirm-window');
                        }
                        $(modal).removeClass('fade-in -fast is-hidden');
                        $('#youMustScrollDown, #youMustAcceptConditions').addClass('hidden').removeAttr('style');
                    })
                    $('.btn-close').on('click', function (evt) {
                        evt.stopImmediatePropagation();
                        $(alertContent).addClass('fade-out -fast');

                        $.colorbox.close();
                    });
                    $('.btn-continue').on('click', function (evt) {
                        evt.stopImmediatePropagation();

                        $(alertContent).addClass('fade-out -fast');

                        setTimeout(function () {
                            $(alertContent).remove();
                            $('#youMustScrollDown, #youMustAcceptConditions').addClass('hidden').removeAttr('style');
                        }, 700);

                        setTimeout(function () {
                            // Pre set theme for viewer theme
                            $('#colorbox, #cboxOverlay').toggleClass('c-colorbox--theme-legal-info c-colorbox--theme-confirm-window');
                            $(modal).addClass('fade-in -fast').removeClass('is-hidden');
                        }, 500);
                    });

                    // Show when confirmation button is disabled
                    if( $(selector.acceptConditionsBtn).is(":disabled")  ){
                        $(alert + ' #youMustScrollDown').show().removeClass('hidden');
                    } else {
                        // Show when confirmation button is enabled but it has not been pressed
                        $(alert + ' #youMustAcceptConditions').show().removeClass('hidden');
                    }

                }, 700)

            }

        });
    },
    legalViewer.scrollAtPageBottom = function(event){
        return $(event.target).scrollTop() + $(event.target).outerHeight() >= legalViewer.getPercentageOfNumber(PERCENT, $(event.target)[0].scrollHeight);
    },
    legalViewer.getPercentageOfNumber = function(p, n){
        return (p / 100) * n;
    },
    legalViewer.attrExist = function(e, name){
        return $(e).attr(name) !== false || $(e).attr(name) !== undefined
	}

    // Starter
    legalViewer.init = function() {
        legalViewer.openViewerEventListener();
    }
    legalViewer.init();
}


/********************************
 *    @Llamadas
 ********************************/

$(document).ready(function(){
	checkWidth();
	//enableInputChecked();
	inputLabelTriggerDisabled();
	selectDefaultOptionDisabled();
	// customFormError(); // Deprecated: Interfiere con la validación inline de viewnext, #95827.
	optionalFormFieldHandler();
	// desplegables
	dropDownInputRadio();
	dropDownButtonLink();
	dropDownSingleInputCheckBox();
	basicDropDownBootstrapBased();
	// modal
	colorboxEventHooks();
	colorboxCloseEvents();
	colorboxInlineEventsHooks();
	// Domiciliacion nomina
	// relatedOptionsGroup(); // Deprecated Change Request #92060	
	// Tus datos personales
	inputFileHiddenButton();
	inputFileButton();
	addCountrySelectionAsDefaultOption();
	// Capturar documentacion
	uin_pattern_radioGroupMenuDropdown();
	uin_pattern_accordion();
	acc_pattern_accordion();
	// Finalidad de la cuenta
	desplegableActividadInit();
	desplegableRadio();
	dropdownGroup();
	// addPais(); Deprecated
	// addBlockCountry(); Deprecated
	actividadesDropdownContent();
	// Crea tu cuenta
	passwordShow();
	togglePasswordVisibility();
	// Confirma tu identidad
	comboCheckInt();
	linksDisabled();
    basicCarousel();
    // Finalidad de la cuenta
	countryTaxComponentHandler();
	countryTaxHBKComponentHandler();
	
	// CMN 
	customCMBComponent();
	//customerServiceStatus(); Deprecated [#106439, #106441]
	//customerServiceInteractionEvents(); Deprecated [#106439, #106441]	
	// Miscellanea
	noopenLinksEvents();
    // Flujo onBoarding
	productOptionCards();	
	visibilityToggle();
	toggleText();
	availablePromotions();
	becomeACustomerProducts();
	confirmBecomeACustomerProducts();
	checkBoxGroupRelated();
	// Flujo videoDesasistida
	identificationMethodSwitch();
	modalDinamicTrigger();
	// authorizationModalEvents(); // Deprecated function!
	relatedOptions();
	documentTypeSelectionSwitcher();

	// Internet Explorer
	internetExplorerSupport();

	// Components
	frmComponent();
	legalInfoViewerComponent();

	// PDF Viewer
	embedPDFViewer();

	// Only mobile < 640
	if (curS == 1) {
		zoomPreventOnIOS();
	}

	customerProductsCarousel();
	confirmProductsCarousel();
	customCheckboxToggleState(); 

	// Call after global rendered
	waitForFinalEvent(function(){
		// Domiciliación nomina
		//customerProductsCarousel(); // Jquery 3.x Bugfix - jQuery(window).on('load'...) called after load event occurred
		//confirmProductsCarousel(); // Jquery 3.x Bugfix - jQuery(window).on('load'...) called after load event occurred
		//customCheckboxToggleState(); // Jquery 3.x Bugfix - Called after velocity checkRegalo activation from velocity
		// Equal Height Columns
		equalheightSelectors();
		// Visibility toggle
		toggleCollapseRelatedContent();
		toggleDropdownRelatedContent();
	}, 200, "ready");
});

$(window).on('load',function(){
	var doModals =  (function(){
		/**
		 Prepares colorboxes (modals) based on elements classes.
		 **/
		if (!$.colorbox){
			return; // No colorbox defined
		}

		$(".autostart").colorbox({
			open: true,
			iframe:true,
			transition: "none",
			className:'cbox-close',
			width: '100%',
			height: '100%',
			closeButton: true,
			returnFocus: false,
			onComplete: function(opts) {
			},
			onCleanup: function(){
			}
		});

		$(".cbox-close").colorbox({
			iframe:true,
			transition: "none",
			className:'cbox-close',
			width: '100%',
			height: '100%',
			closeButton: true,
			onComplete: function(opts) {
			},
			onCleanup: function(){
			}
		});

		$(".cbox-nclose").colorbox({
			iframe:true,
			transition: "none",
			className:'cbox-close noClose',
			width: '100%',
			height: '100%',
			closeButton: false,
			onComplete: function(opts) {
			},
			onCleanup: function(){
			}
		});

		$(".cbox-inline_nclose").colorbox({
			inline:true,
			transition: "none",
			className:'cbox-inline noClose',
			width: '50%',
			height: '50%',
			closeButton: false,
			onComplete: function(opts) {
				$element = $.colorbox.element();
				$( $element.attr('href') ).removeClass("hidden");
			},
			onCleanup: function(){
				$( $element.attr('href') ).addClass("hidden");
			}
		});
        
        $(".cbox-inline").colorbox({
			inline:true,
			transition: "none",
			className:'cbox-inline',
			width: '50%',
			height: '50%',
			closeButton: true,
			onComplete: function(opts) {
				$element = $.colorbox.element();
				$( $element.attr('href') ).removeClass("hidden");
			},
			onCleanup: function(){
				$( $element.attr('href') ).addClass("hidden");
			}
		});

		$('.cbox-la').colorbox({
			iframe:true,
			transition: "none",
			className:'cbox-la',
			width: '100%',
			height: '100%',
			closeButton: false,
			onComplete: function(opts) {
			},
			onCleanup: function(){
			}
		});

		$('.cbox-product').colorbox({
			iframe:true,
			transition: "none",
			className:'cbox-product',
			width: '100%',
			height: '100%',
			closeButton: true,
			onComplete: function(opts) {
			},
			onCleanup: function(){
			}
		});

		$(".cbox-viewer").colorbox({
			inline: true,
			transition: "none",
			className: 'cbox-viewer',
			width: '100%',
			height: '100%',
			closeButton: false,
			onComplete: function (opts) {
				// Global Vars
				e = $.colorbox.element();

				// Generate modal custom data
				var ctTitle = $(e).find("[class*='label']").text();
				$('#ctTitle').text(ctTitle);

				// Enable document view / download
				var src = $('#pdf-viewer').attr('data-src')
				$('#pdf-viewer').attr('src', src);

				// Enable content
				e = $.colorbox.element();
				$( e.attr('href') ).removeClass("hidden");

				// Simulación efecto overlay desde la parte inferior del popup al browser
				$("#cboxContent").on('click', '.apl-modal', function (e) {
					e.stopPropagation();
				});
				$("#cboxContent").on( "click", function (e) {
					e.preventDefault();
					e.stopPropagation();
					if (!($('#colorbox').hasClass('noClose'))) {
						$('#cboxOverlay').trigger('click');
					}
				});

				// Confirmación de lectura
				if( $('#pdf-viewer').attr('data-read') && $('#pdf-viewer').attr('data-read') == 'true' ) {
					$('.cbox-viewer .is-required').on('click', function(){
						$( window.parent.$.colorbox.element() ).addClass('is-read');
					})
				}
			},
			onCleanup: function () {
				$('#pdf-viewer').removeAttr("src");
				$('#ctDownload').attr('href', './');
				$('#ctTitle').text("");
				$( e.attr('href') ).addClass("hidden");
			}
		});

	})();
});
$(window).on("resize",function(){
	waitForFinalEvent(function(){
		checkWidth();
		// Only mobile < 640
		if (curS == 1) {
			if( $('#colorbox.open.cbox-inline').length > 0 || $('#colorbox.open.cbox-inline-modal').length > 0){
				setTimeout( function(){
					verticalCenterHeight();
				}, 10);
			}
		}
		else {
			verticalCenterHeightReset();
		}
		// Equal Height Columns
		equalheightSelectors();

	}, 200, "resize");

});
$(window).on("scroll",function(){
	//fixStickyNavHeader();
});





