   function createCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function deleteCookie(name) {
  document.cookie = name +'=; Path=/; Expires=Tues, 14 July 1992 00:00:01 GMT;';
}

if(window.location.href.indexOf("countdown") > -1) {
  localStorage.setItem("timer", true);
}

$(document).ready(function(){
  if (!sessionStorage.getItem('visitLogic')) {
  var flowFinish = readCookie('flowFinish')
  var gekksVisit = readCookie('gekksVisit')
  if ((!flowFinish) && (!gekksVisit)){
    console.log('literally no cookies')
    createCookie("gekksVisit", "remarketing", 7)
    createCookie("flowFinish", "learnMore", 14)
    if (!(window.location.href.indexOf("?sh=d") > -1)) {
          window.location.href="/pages/customize"
    };
  }
  else if ((flowFinish) || (gekksVisit)) {
    KlaviyoSubscribe.attachToModalForm('#remarketing-popup', {
      delay_seconds: 0,
      success_url: '?countdown-started',
      ignore_cookie: true, 
    }); 
  }
  sessionStorage.setItem('visitLogic', true)
}
})




$(document).ready(function(){
  if (localStorage.getItem("timer")){    
    $('span a h4').hide();
    $('#countdown').show();
    var minutesleft = 20;
    var secondsleft = 0; 
    var finishedtext = "Out of Time! Check back soon!";
    var end;
    if(localStorage.getItem("end")) {
      end = new Date(localStorage.getItem("end"));
    } else {
      end = new Date();
      end.setMinutes(end.getMinutes()+minutesleft);
      end.setSeconds(end.getSeconds()+secondsleft);
    }
    var counter = function () {
      var now = new Date();
      var diff = end - now;
      diff = new Date(diff);
      var sec = diff.getSeconds();
      var min = diff.getMinutes(); 
      if (min < 10) {
        min = "0" + min;
      }
      if (sec < 10) { 
        sec = "0" + sec;
      }     
      
      if(now >= end || localStorage.getItem("end") == "Invalid Date") { 
        $('#countdown').hide();
       
        clearTimeout(interval);
        localStorage.setItem("end", null)
        localStorage.clear()
      } 
      else {
        var value = min + ":" + sec;
        localStorage.setItem("end", end);
        document.getElementById('divCounter').innerHTML = value
      }
    }
    var interval = setInterval(counter, 1000);
  }
});