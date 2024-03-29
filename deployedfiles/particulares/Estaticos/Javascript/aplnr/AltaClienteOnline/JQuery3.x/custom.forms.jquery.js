/**!

	jQuery Custom Forms Plugin
	Version: 0.6.3
	Site: http://vebersol.net/demos/jquery-custom-forms/
	
	@author Vinícius Ebersol
	@license MIT License
	
*/

(function($){

	var CustomForm = function(element, options) {
		this.element = element;
		this.options = options;
		this.formElements = this.element.find('input, select');
		
		this.init();
	};
	
	CustomForm.prototype = {
		init: function() {
			this.polyfills();
			this.setup();
			this.bind();
		},

		polyfills: function() {

			// String.prototype.trim()
			if (!String.prototype.trim) {
				(function () {
					// Make sure we trim BOM and NBSP
					var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
					String.prototype.trim = function () {
						return this.replace(rtrim, '');
					};
				})();
			}
		},
		
		setup: function() {
			var _this = this;
			this.formElements.each(function() {
				_this.create($(this));
			});
		},
		
		bind: function() {
			var _this = this;
			
			$(document).on('toggleFormElement', function(ev, element, fakeElement, className) {
				if (_this.isRadio(element)) {
					_this.toggleRadio(element, fakeElement, className);
				}
				else {
					_this.toggleCheckbox(element, fakeElement, className);
				}
			});
			
			$(document).on('changeSelectValue', function(ev, element, fakeSelect) {
				var optionName = $(element).find('option:selected').html();
				fakeSelect.html(optionName);
			});
		},
		
		create: function(element) {
			var i, keyClass = this.options.keyClass.split(',');

			for (i = keyClass.length - 1; i >= 0; i--) {
				//if (element.hasClass($.trim(keyClass[i]))) {
				if (element.hasClass(keyClass[i].trim())) {
					if (element.get(0).nodeName == 'INPUT') {
						this.createCustomInput(element);
						return;
					}
					
					this.createCustomSelect(element);
				}
			}

		},
		
		createCustomSelect: function(element) {
			var _this = this,
				newValue,
				fakeSelect = this.createFakeElement(element, 'select');
			
			newValue = function() {
				$(document).trigger('changeSelectValue', [element, fakeSelect]);
			};
			
			if (this.options.enableWrapper === true) {
				element.wrap('<div class="' + this.setClass('wrapper') + '"></div>');
			}

			element.before(fakeSelect);
			element.on({
				change: function() {
					newValue();
				},
				focus: function() {
					fakeSelect.addClass(_this.setClass('focused'));
					newValue();
				},
				blur: function() {
					fakeSelect.removeClass(_this.setClass('focused'));
				},
				keyup: function() {
					newValue();
				},
				mousedown: function() {
					newValue();
				}
			});

			
			fakeSelect.prop('id', 'label_' + element.prop('id'));
			element.css({
				opacity: 0,
				position: 'relative',
				zIndex: 10,
				width: fakeSelect.outerWidth(),
				height: fakeSelect.outerHeight()
			});
		},
		
		createCustomInput: function(element) {
			var _this = this,
				toggleFormElement,
				fakeElement = this.createFakeElement(element, element.get(0).type),
				className = this.toSlug(element.prop('name'));

			fakeElement.addClass(className);
			element.addClass(className);
			
			
			element.before(fakeElement);
			element.css({
				opacity:0,
				position: 'absolute',
				left: -99999
			});
			
			toggleFormElement = function() {
				$(document).trigger('toggleFormElement', [element, fakeElement, className]);
			};
			
			if (element.prop('checked')) {
				fakeElement.addClass(this.setClass('checked'));
			}
			
			element.on({
				focus: function() {
					fakeElement.addClass(_this.setClass('focused'));
					if (_this.isRadio(element)) {
						toggleFormElement();
					}
				},
				blur: function() {
					fakeElement.removeClass(_this.setClass('focused'));
				},
				keypress: function(ev) {
					if (!ev.which && ((ev.charCode || ev.charCode === 0) ? ev.charCode: ev.keyCode)) {
						ev.which = ev.charCode || ev.keyCode;
					}
					
					if (_this.isRadio(element)) {
						toggleFormElement();
					}
					
				},
				change: function() {
					fakeElement.addClass(_this.setClass('focused'));
					/* JQuery Migrate */
					if (_this.isRadio(element)) {
						toggleFormElement();
					} else {
						fakeElement.toggleClass(_this.setClass('checked'));
					}
				}
			});
			
			fakeElement.on({
				click: function() {
					if (_this.isRadio(element)) {
						toggleFormElement();
					}
					else {
						_this.toggleCheckbox(element, fakeElement, className);
					}
				}
			});
		},
		
		toggleRadio: function(element, fakeElement, className) {
			$('input.' + className).prop('checked', false);
			$('span.' + className).removeClass(this.setClass('checked')).removeClass(this.setClass('focused'));				
			
			fakeElement.addClass(this.setClass('checked')).addClass(this.setClass('focused'));
			fakeElement.next('input.' + className).trigger('click'); // JQuery Migration
			fakeElement.next('input.' + className).prop('checked', 'checked');
			/*
			//$('input.' + className).attr('checked', false); // Elimina el atributo del tag
			$('input.' + className).removeAttr( "checked" ); // Elimina el atributo del tag
			$('input.' + className).prop('checked', false); // Elimina la propiedad para el check en el envío
			$('span.' + className).removeClass(this.setClass('checked')).removeClass(this.setClass('focused'));				
			
			fakeElement.addClass(this.setClass('checked')).addClass(this.setClass('focused'));
			fakeElement.next('input.' + className).trigger('click');
			*/
			/*console.log(
				fakeElement.next('input.' + className).prop('id') + '\n' +
				'Attr checked: ' +
				fakeElement.next('input.' + className).attr('checked') + '\n' +
				'Prop checked: ' +
				fakeElement.next('input.' + className).prop('checked') + '\n'

			)*/
			//fakeElement.next('input.' + className).attr('checked', 'checked');
			//fakeElement.next('input.' + className).prop('checked', true);

		},
		
		toggleCheckbox: function(element, fakeElement, className) {
			fakeElement.next('input.' + className).trigger('click'); //JQuery Migrate
			
			// if (element.prop('checked')) {

			// 	fakeElement.next('input.' + className).prop('checked', false);
			// 	fakeElement.removeClass(this.setClass('checked'));
			// }
			// else {			

			// 	fakeElement.next('input.' + className).prop('checked', true);
			// 	fakeElement.addClass(this.setClass('checked'));
			// }

		},
		
		createFakeElement: function(element, type) {
			var value = (type == 'select') ? $(element).find('option:selected').html() : '',
				fakeElement = $('<span class="'+ this.setClass(type) +'">'+ value +'</span>');

			if ( this.attrExist(element, 'disabled') ) { // element.prop('disabled') !== undefined
				fakeElement.addClass(this.setClass('disabled'));
			}

			return fakeElement;
		},
		
		isRadio: function(element) {
			return element.get(0).type == 'radio';
		},
		
		setClass: function(name) {
			return this.options.prefix + name;
		},
		
		toSlug: function(text) {
			return text.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');				
		},
		attrExist: function(e, attr){
			return $(e).attr(attr) !== false && $(e).attr(attr) !== undefined
		}
	};

	var defaultOptions = {
		prefix: 'custom-form-',
		keyClass: 'cform',
		enableWrapper: false
	};
	
	
	$.fn.customForm = function(options) {
		options = $.extend(defaultOptions, options);
		return new CustomForm(this, options);
	};

})(jQuery);
