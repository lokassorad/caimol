var endPingDate = null;
var request=null;
var intervalId = null;

function initPings() {
	calculatePing(null,null);
	callServer();
	
}

function calculatePing(aPingTime, aPingInterval) {
	//if(isNaN(aPingTime)) alert("ping time is not a number");
	//if(isNaN(aPingInterval)) alert("ping interval is not a number");
	
	if(aPingTime!=null && !isNaN(aPingTime)) {
		pingTime = aPingTime;
	}
	if(aPingInterval!=null && !isNaN(aPingInterval)) {
		pingInterval=aPingInterval;
	}
	endPingDate=new Date();
	endPingDate.setTime(endPingDate.getTime() + (pingTime*1000));
	if(intervalId!=null) {
		clearInterval(intervalId);
		intervalId=null;
	}
	//alert("pingTime="+pingTime);
	//alert("pingInterval="+pingInterval);
	//alert("endPingDate="+endPingDate);
	intervalId = setInterval("refresco()",pingInterval*1000);
}

function updateVars() {
	 if (request.readyState == 4) {
		if (request.status == 200) {
			var response = request.responseText.split(",");
			try {
				calculatePing(response[0],response[1]);
			} catch(errorenparametros) {
			}
		}
	}
}

function callServer() {
	if(useServerTime) {
		request = createRequest();
		if(request) {
			request.open("https://www.caixabank.es/error/error404_es.html", contextRoot+"aplnr/SAlive?"+Math.random(), true);
			request.onreadystatechange = updateVars;
			request.send(null);
		}
		
	} 
	
}

function v() { return; }

function refresco(){
	if((new Date())<endPingDate) {
	  var i=new Image(1,1);
	  i.src=contextRoot+"aplnr/SAlive?"+Math.random();
	  i.onload=function() {v();}
	} else {
		if(intervalId!=null) {
			clearInterval(intervalId);
			intervalId=null;
		}
	}
}		
function createRequest() {
	var request = false;
	try {
	  request = new XMLHttpRequest();
	} catch (trymicrosoft) {
	  try {
		request = new ActiveXObject("Msxml2.XMLHTTP");
	  } catch (othermicrosoft) {
		try {
		  request = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (failed) {
		  request = false;
		}
	  }
	}
	return request;
}
