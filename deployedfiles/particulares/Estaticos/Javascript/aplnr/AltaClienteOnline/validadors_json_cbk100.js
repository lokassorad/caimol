NOM_CAMP="";
CONST_IMG="IMGERROR";
CONST_DIV ="SPANERROR";
ID_FORM_VALIDADOR="";
var req=null;


URL_VALIDADOR ="/apl/json/validador/index_es.html?";

function callValidator(idOpcio,valueCamp,idOrigen,idiomaValidacio,callbackValidacio){
VAL_CODIVAL="VAL_codiVal";
VAL_NOMCAMP="VAL_nomCamp";
VAL_IDIOMA = "VAL_idioma";
VAL_ID_FORMULARI="VAL_idForm";
FIELD="field";
VAL_VALUECAMP_1="VAL_valueCamp1";
VAL_VALUECAMP_2="VAL_valueCamp2";
VAL_VALUECAMP_3="VAL_valueCamp3";
VAL_VALUECAMP_4="VAL_valueCamp4";
VAL_VALUECAMP_5="VAL_valueCamp5";
url = URL_VALIDADOR;
url += VAL_IDIOMA + "=" + idiomaValidacio + "&";
url += VAL_CODIVAL + "=" + idOpcio +"&";
url += VAL_VALUECAMP_1 + "=" + valueCamp+"&"

if(ID_FORM_VALIDADOR!==""){
	url+= VAL_ID_FORMULARI + "=" + ID_FORM_VALIDADOR + "&"
}
if(arguments.length>5){
    if(arguments[5]){
       url += VAL_VALUECAMP_2 + "=" + arguments[5]+"&"
    }
    if(arguments[6]){
        url += VAL_VALUECAMP_3 + "=" + arguments[6]+"&"
    }  
    if(arguments[7]){
        url += VAL_VALUECAMP_4 + "=" + arguments[7]+"&"
    }
	if(arguments[8]){
        url += VAL_VALUECAMP_5 + "=" + arguments[8]
    }
}
NOM_CAMP=idOrigen;
retorn = callXML(url,processaValidador,eval("("+callbackValidacio+")"));
}

function callXML(URL,processaValidator,callBackValidador){
	jQuery.ajaxSetup({ scriptCharset: "utf-8" , contentType: "application/json; charset=utf-8"});
	jQuery.getJSON(URL)
		.done(function(data){
		    processaValidador(data)
			if(callBackValidador){
			callBackValidador();
			}
		})
		.fail(function(data){
		    //alert("Error ajax");
		});
}
function processaValidador(request){
    return processaRespostaValidador("#"+NOM_CAMP,request)
}
function processaRespostaValidador(nomCamp,data) {
   var parsedJSON = data;
   var nomP ="#"+NOM_CAMP+CONST_DIV;
   $(nomCamp).removeClass("error cross");
   $(nomCamp).removeClass("valid check_ok");
   $(nomP).remove();
   var padre = $(nomCamp).parent();
   if(parsedJSON.resultCode=="1") { 
        // Type: Select menu
        if( document.getElementById(NOM_CAMP).type === "select-one"){          
            $(nomCamp).removeClass("valid check_ok");            
            $(nomCamp).addClass("error");
            padre = padre.parent();
        }  
        // Type: Input field   
        else {
            $(nomCamp).addClass("error cross");           
        }
        padre.append("<p class='text-error' id='"+NOM_CAMP+CONST_DIV+"'>"+data.result+"</p>");        
        return false;
   } else { 
        // Type: Select menu
        if( document.getElementById(NOM_CAMP).type === "select-one"){
            $(nomCamp).removeClass("error"); 
            $(nomCamp).addClass("valid check_ok"); 
          
        }    
        // Type: Input field       
        else {
            $(nomCamp).addClass("valid check_ok"); 
        }
   }
}   
function montaMissatgeError(id){

}
function setIdFormValidador(idformulari){
	ID_FORM_VALIDADOR = idformulari;
}


function resetError(id,fakeid){
if(fakeid){
$('#'+fakeid+"SPANERROR").hide();
}else{
$('#'+id+"SPANERROR").hide();
}

$("#"+id).removeClass("error cross");
}

var VALID_DNI_PASAPORTE = VALID_DNI_PASAPORTE || {

    //MSG 0003

    CAMPO_VALID : null,
    ID_FORM_VALIDADOR : "",
    req : null,    
    READY_STATE_UNINITIALIZED : 0,
    READY_STATE_LOADING : 1,
    READY_STATE_LOADED : 2,
    READY_STATE_INTERACTIVE : 3,
    READY_STATE_COMPLETE : 4,

    SRC_ERROR : "/deployedfiles/imaginbank/Estaticos/Imagenes/APL/error_m.png",
    SRC_OK : "/deployedfiles/imaginbank/Estaticos/Imagenes/APL/ok_m.png",
    SRC_LOADING : "/deployedfiles/particulares/Estaticos/Imagenes/apl/AltaCliente/ajax-loader.gif",
    URL_VALIDADOR : "/apl/json/validador/index_es.html?",

    getHttpRequestObject : function () {
        if (window.XMLHttpRequest) {
            request = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            request = new ActiveXObject("Microsoft.XMLHTTP");
        }
        return request;
    },

    callXML : function (url, procesReq, callbackValidacio) {
        request = this.getHttpRequestObject();
        if (request) {
            request.open("GET", url, false);
            if (procesReq) {
                request.onreadystatechange = function() {
                    if (request.readyState == VALID_DNI_PASAPORTE.READY_STATE_COMPLETE) {
                        var httpStatus = request.status;
                        if (httpStatus == 200 || httpStatus == 0) {
                            alerta = procesReq(request);
                            if (alerta && callbackValidacio) { callbackValidacio(); }
                        } else {
                            alert("Error ajax");
                        }
                    }
                };
            }
            request.send(null);
        }
    },

    callValidator : function (idOpcio, valueCamp, idOrigen, idiomaValidacio, callbackValidacio) {
        VAL_CODIVAL = "VAL_codiVal";
        VAL_NOMCAMP = "VAL_nomCamp";
        VAL_IDIOMA = "VAL_idioma";
        VAL_ID_FORMULARI = "VAL_idForm";
        FIELD = "field";
        VAL_VALUECAMP_1 = "VAL_valueCamp1";
        VAL_VALUECAMP_2 = "VAL_valueCamp2";
        VAL_VALUECAMP_3 = "VAL_valueCamp3";
        VAL_VALUECAMP_4 = "VAL_valueCamp4";
        VAL_VALUECAMP_5 = "VAL_valueCamp5";
        url = this.URL_VALIDADOR;
        url += VAL_IDIOMA + "=" + idiomaValidacio + "&";
        url += VAL_CODIVAL + "=" + idOpcio + "&";
        url += VAL_VALUECAMP_1 + "=" + valueCamp + "&";

        if (this.ID_FORM_VALIDADOR != "") {
            url += VAL_ID_FORMULARI + "=" + this.ID_FORM_VALIDADOR + "&";
        }
        if (arguments.length > 5) {
            if (arguments[5]) {
                url += VAL_VALUECAMP_2 + "=" + arguments[5] + "&";
            }
            if (arguments[6]) {
                url += VAL_VALUECAMP_3 + "=" + arguments[6] + "&";
            }
            if (arguments[7]) {
                url += VAL_VALUECAMP_4 + "=" + arguments[7] + "&";
            }
            if (arguments[8]) {
                url += VAL_VALUECAMP_5 + "=" + arguments[8];
            }
        }

        this.CAMPO_VALID = idOrigen;
        this.carregaLoading(this.CAMPO_VALID,false);
        //MSG 0004
        retorn = this.callXML(url, this.processaValidador, eval("(" + callbackValidacio + ")"));
    },

    processaValidador : function (request) {
        return VALID_DNI_PASAPORTE.processaRespostaValidador(VALID_DNI_PASAPORTE.CAMPO_VALID, request.responseText);
    },

    processaRespostaValidador : function (campo, data) {
        this.carregaLoading(campo,true);
        campo.removeMissatgeError();
        var parsedJSON = eval('(' + data + ')');
        //MSG 0005
        if (parsedJSON.resultCode == "1") {
            campo.afegeixMissatgeError(parsedJSON.result);
        }
        if (parsedJSON.resultCode == "0") {
            campo.setOk();
			//activarBotonEnvio();  RDU:Correción de errores.
            return true;
        } else return false;
    },

    carregaLoading : function (campo,restore) {
        if (restore) {
            campo.img_ok.find('img').attr('src',this.SRC_OK);               
        } else {
            campo.img_ok.find('img').attr('src',this.SRC_LOADING);            
        }
        campo.setOk();
    },

    setIdFormValidador : function (idformulari) {
        this.ID_FORM_VALIDADOR = idformulari;
    }

};