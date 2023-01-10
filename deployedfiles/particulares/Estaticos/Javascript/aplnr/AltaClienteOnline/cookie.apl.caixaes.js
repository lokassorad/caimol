function ocultarcapa()
{
    for(var i = 0; i < arguments.length; i++)
    {
        document.getElementById(arguments[i]).style.visibility="hidden";
        document.getElementById(arguments[i]).style.height="0px";
        document.getElementById(arguments[i]).style.margin="0px";
    }
}

function mostrarcapa()
{

    for(var i = 0; i < arguments.length; i++)
    {
        document.getElementById(arguments[i]).style.visibility="visible";
        document.getElementById(arguments[i]).style.height="auto";
        document.getElementById(arguments[i]).style.zindex="16777271";
    }
}

function getCurrentDomain() {var index=location.hostname.indexOf("."); if (index===-1) return location.hostname; return location.hostname.substring(index, location.hostname.length);}

function getCookieParams() {
  var domain = getCurrentDomain();
  var secure = location.protocol === "https:" ? true : false;
  return {domain: domain, secure: secure, path: '/'};
}

function getCreateCookieParams() {
  var domain = getCurrentDomain();
  var secure = location.protocol === "https:" ? true : false;
  return {domain: domain, secure: secure, path: '/', expires:180};
}

function getCookieData() {
    var domain = getCurrentDomain();
    if (Cookies.get("cookie_message", getCookieParams()) === "false" && Cookies.get("cookie_aceptacion", getCookieParams()) === "true") {
        ocultarcapa("acookie");
    }

    $(document).click(function (e) {
        if ($(e.target).closest("#acookie").length > 0) {
            Cookies.remove('cookie_aceptacion', getCookieParams());
        }
        else if($(e.target).closest("#intrusivo").length) {
            Cookies.remove('cookie_aceptacion', getCookieParams());
        } else {
            if ($(e.target).closest('a').length) {
               dontShowCookieMsg();
            }
            if ($(e.target).closest('input').length) {
              dontShowCookieMsg();
            }    
        }
    });
}


function dontShowCookieMsg() {
  var domain = getCurrentDomain();
  if(!Cookies.get('cookie_aceptacion', getCookieParams()) || Cookies.get('cookie_aceptacion', getCookieParams()) !== 'true'){
    Cookies.set('cookie_aceptacion', 'true', getCreateCookieParams());
    Cookies.set('cookie_message', 'false', getCreateCookieParams());
    ocultarcapa("acookie");
    if(typeof recalcSticky !== "undefined") {
      recalcSticky();
    }
  }
}