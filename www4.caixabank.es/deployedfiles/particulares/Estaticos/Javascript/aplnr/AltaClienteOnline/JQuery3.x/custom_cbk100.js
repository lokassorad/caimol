/*	Librería de funciones comunes cbk 100x100 */

$(document).ready(function() {				
		
		$('form input').on('keyup keypress', function(e) {
		  var keyCode = e.keyCode || e.which;
		  if (keyCode === 13) { 
		    e.preventDefault();
		    e.target.click();
		    return false;
		  }
		});

        /**/
        if (window.addEventListener) {                // For all major browsers, except IE 8 and earlier
            window.addEventListener("beforeunload", function() { $(':input[type="submit"]').prop('disabled', true); $('form').on("submit",false); });
        } else if (window.attachEvent) {              // For IE 8 and earlier versions
            window.attachEvent("beforeunload", function() { $(':input[type="submit"]').prop('disabled', true); $('form').on("submit",false); });
        }
        /**/
});