
function maquetarFormYenviar(action,caso){
	window.parent.$('form').attr('action', action);
	switch(caso){
		case(1):
			window.parent.$('#HTC_saveTmp').attr('value','1');
		break;
	}
		
		window.parent.$("form").submit();	

}

/*
	Función que le añade el evento de cierre de colorbox al "a" de
	seguir más adelante, ya que la clase close-cb se añade dinámicamente
	si el form en cuestión (de la página padre) no realiza guardado.
*/
function listenerCierrePopUp(){
	$('.close-cb').on("click", function(){
        window.parent.jQuery.colorbox.close();
    });
}

$(document).ready(function(){

	$("#seguir-mas-tarde").on("click",function(){
		
		//Action se modifica a mano
		var actionAntiguo=window.parent.$('form').attr('action');
		var nombreForm=window.parent.$('form').attr('name');
		//Casos según página
		switch(nombreForm){
			//Form Datos Personales
			case("AltaclienteCaixaBankDataPerson"):
				var nuevoAction=actionAntiguo.replace("enviarPerson","guardarPerson");
				maquetarFormYenviar(nuevoAction,1);
			break;
			//Form Datos Direccion
			case("AltaclienteCaixaBankDataDireccion"):
				var nuevoAction=actionAntiguo.replace("enviarDir","guardarDir");
				maquetarFormYenviar(nuevoAction,1);
			break;
			//Form Datos Bancarios
			case("AltaclienteCaixaBankDataBank"):
				var nuevoAction=actionAntiguo.replace("enviarDataBank","guardarDataBank");
				maquetarFormYenviar(nuevoAction,1);
			break;
			//Form Datos DNI/Pass
			case("AltaclienteDNIPasaporte"):
				var nuevoAction=actionAntiguo.replace("continuarDNI","guardarDoc");
				maquetarFormYenviar(nuevoAction,1);
			break;
			//Form Actividad Laboral
			case("AltaclienteCaixaBankDataWork"):
				var nuevoAction=actionAntiguo.replace("enviarWork","guardarWork");
				maquetarFormYenviar(nuevoAction,1);
			break;
			//Form Doc Autonomos
			case("AltaclienteCaixaBankDocAutonomo"):
				var nuevoAction=actionAntiguo.replace("enviarDocAutonomo","guardarDocAutonomo");
				maquetarFormYenviar(nuevoAction,1);
			break;
			//Form lopd
			case("gestionatusdatos"):			
				var nuevoAction=actionAntiguo.replace("enviarLOPD","guardarLOPD");
				maquetarFormYenviar(nuevoAction,1);
			break;
		}
	});
	
	$("#rechazo-oficina").on("click",function(){
			var actionAntiguo=window.parent.$('form').attr('action');
			var nombreForm=window.parent.$('form').attr('name');
			switch(nombreForm){
				//Form Datos Personales
					case("AltaclienteCaixaBankDataPerson"):
						var nuevoAction=actionAntiguo.replace("enviarPerson","anularSolPerson");
						maquetarFormYenviar(nuevoAction,1);
					break;
				//Form Actividad Laboral	
					case("AltaclienteCaixaBankDataWork"):
						var nuevoAction=actionAntiguo.replace("enviarWork","anularSolWork");
						maquetarFormYenviar(nuevoAction,1);
					break;
			}
	});
});