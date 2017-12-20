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
  var customGekks = readCookie('customGekks')
  if ((!flowFinish) && (!gekksVisit)){
    createCookie("gekksVisit", "remarketing", 7)
    createCookie("flowFinish", "learnMore", 14)
    if (!(window.location.href.indexOf("?sh=d") > -1) && ( on_index == true
    )) {
      window.location.href="/pages/customize"
    };
  }
  if (customGekks) {
    $('#custom-gekks a').attr("href", customGekks) 
    $('#custom-gekks').show()
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

$(document).ready(function(){
  checkForDiscount();
});