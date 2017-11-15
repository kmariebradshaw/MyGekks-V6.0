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
  var flowFinish = readCookie('flowFinish')
  var gekksVisit = readCookie('gekksVisit')
  if ((!flowFinish) && (!gekksVisit)){
    createCookie("gekksVisit", "remarketing", 7)
    createCookie("flowFinish", "learnMore", 14)
    if (!(window.location.href.indexOf("?sh=d") > -1) && ( on_index == true
)) {
          window.location.href="/pages/customize"
    };
  }
})

function getParameterByName(name, url) {
  if (!url) {
    url = window.location.href;
  }

  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function countdownActive(){
    localStorage.setItem("activate", true);
    setTimeout(function() {
      $('span a h4').hide(); 
      $('#activate-countdown').show();
    }, 15000); 
}

function checkForDiscount() {
$discountInput = $("input.js-form-discount");
$coupon = getParameterByName('coupon');

if($coupon){
  createCookie('discountCode', $coupon, { expires: 2 });
}

$discountCode = readCookie('discountCode');

if($discountCode){
  if ($discountInput.length > 0) { 
    $discountInput.val( $discountCode );
  }
}
}; 

function discountTimedBanner(){
    $('span a h4').hide();
    $('#activate-countdown').hide(); 
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

$('#activate-timer').click(function(){
  discountTimedBanner(); 
  localStorage.setItem("timer", true);
});

$(document).ready(function(){
  checkForDiscount(); 
  if (localStorage.getItem("timer")){    
    discountTimedBanner(); 
  }
  else if (localStorage.getItem("activate")) {
    $('span a h4').hide(); 
    $('#countdown').hide(); 
    $('#activate-countdown').show(); 
  }
});