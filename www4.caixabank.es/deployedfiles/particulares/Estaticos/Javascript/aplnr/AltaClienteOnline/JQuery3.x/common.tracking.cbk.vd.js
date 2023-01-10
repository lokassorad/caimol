// Funciones de seguimiento comunes de Caixabank
// Version v1.0


//Etiquetado CMN
$(window).on("load",function(e) {
	$("#bottom_sticky iframe").on("load",function(e) {
		if($(this).contents().find("#okChat").length > 0 ){
			if(window.matchMedia("(min-width: 768px)").matches){
				envioCMN("cmnlateral", "OK", s.pageName);
			}else{
				envioCMN("cmninferior", "OK", s.pageName);
			}
		}else{
			if(window.matchMedia("(min-width: 768px)").matches){				
				envioCMN("cmnlateral", "KO", s.pageName);
			}else{	
				envioCMN("cmninferior", "KO", s.pageName);
			}
		}
	});
	$("#bottom_sticky").contents().find(".cmn-cta").trigger("click",function() {
		onClickSC("boton_te_llamamos");
	});
});


var listFormsObj = {    //listado de formularios con sus pageName
    AltaClienteCBK100DatosMinimos:"La Caixa:P:C:Formularioaltavideodesasistida:Inicio100",
    AltaclienteCaixaBankDataPerson:"La Caixa:P:C:Formularioaltavideodesasistida:Tusdatos",
    AltaclienteDNIPasaporte:"La Caixa:P:C:Formularioaltavideodesasistida:Confirmaridentidad:Seleccionardocumento",
    AltaclienteCaixaBankDataWork:"La Caixa:P:C:Formularioaltavideodesasistida:Finalidadcuenta:Datoskyc",
    AltaclienteCaixaBankDataBank:"La Caixa:P:C:Formularioaltavideodesasistida:Confirmaridentidad:Autorizacionprocesoidentificacion",
    AltaclienteCaixaBankConfirm:"La Caixa:P:C:Formularioaltavideodesasistida:Finalidadcuenta:Confirmardatos"
}; 



function enviarEventoSuccess(uid,form) {		
	if (typeof(Storage) !== "undefined") {
		var data = sessionStorage.getItem(uid)||'';	    	
		var listForms = data.split(',');			
		if (listForms.indexOf(form) < 0) {				
			sessionStorage.setItem(uid,data + ',' + form);		
			var lastForm = listForms[listForms.length-1];						
			if (listFormsObj[lastForm]) {
				var pageNameBak = s.pageName;
				s.pageName = listFormsObj[lastForm];
				s.sendFormEvent("s",listFormsObj[lastForm], lastForm);
				s.pageName = pageNameBak;
			}			
		}	
	} else { // Sorry! No Web Storage support..
	}										
}