function sessionExpired() {
    $.colorbox.close();
    stopSessionControlAplication();
    setTimeout(function() {
        inlineContentCBoxLoad("sessionExpired");
    }, 10);
}

var counter = 0;

function formatNumberTo2Digits(a) {
    return a > 9 ? a : "0" + a;
}

function converToSeconds(a) {
    var b = Math.floor(a / 60);
    var c = formatNumberTo2Digits(a % 60);
    return b + ":" + c;
}

function stopCountdownTimer() {
    $.colorbox.close();
    clearInterval(interval);
    counter = 0;
}

function countdownTimerListeners() {
    Array.prototype.slice.call(document.querySelectorAll(".c-timer")).forEach(function(a) {
        a.addEventListener("click", function(a) {
            var b = a.target;
            if (b.classList.contains("c-timer__button--stop")) stopCountdownTimer();
        });
    });
}

function setupCountdownTimer(a, b) {
    var c = document.getElementById("timer");
    c.innerHTML = converToSeconds(a - counter);
    interval = setInterval(d, 1e3);
    function d() {
        counter++;
        c.innerHTML = converToSeconds(a - counter);
        if (counter == a) {
            stopCountdownTimer();
            setTimeout(function() {
                b();
            }, 1e3);
        }
    }
}

function stopSessionControlAplication() {
    clearInterval(sinterval);
}

function inlineModalViewControl(t) {
    var cb = document.getElementById('colorbox');

    if( cb.classList.contains('open') ) {
        $.colorbox.close();
        setTimeout(function() {
            inlineContentCBoxLoad(t);
        }, 600);
    } else {
        inlineContentCBoxLoad(t);
    }
}

function initSessionControlApplication(a, b) {
    if (null !== document.getElementById(a) && null !== document.getElementById(b)) {
        sinterval = setInterval(c, 18e4);
        function c() {
            inlineModalViewControl('countdownTimer');
            //inlineContentCBoxLoad('countdownTimer');
            setTimeout(function() {
                countdownTimerListeners();
                setupCountdownTimer(120, sessionExpired);
            }, 600);
        }
    }
}

//document.onreadystatechange = function() {
//    if ("complete" == document.readyState) setTimeout(function() {
//        initSessionControlApplication("countdownTimer", "sessionExpired");
//    }, 1e3);
//};