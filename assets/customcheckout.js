function readypage() {
    if ($("[data-step=shipping_method] .content-box:first").insertAfter(".section__content"),  $(".order-summary__section__content").append($("#hm")),  $(".step__footer__previous-link").insertBefore(".step__sections:first").addClass("accord btn step__footer"), $(".section__title:first").addClass("accord btn"), $(".section__text").parent().children().first().addClass("accord btn"), $('a[href="https://www.mygekks.com/cart"]').addClass("hidden"), $('a[href="https://my-gekks.myshopify.com/cart"]').addClass("hidden"), $("td .remove").insertAfter(".product"), $(".section--shipping-address").length) $("#payment-information").addClass("accord");
    else if ($(".section--payment-method").length) {
        $("#customer-information").addClass("accord").append($("#check-mark").removeClass("invis")), $("#customer-information a").addClass("nm"), $(".step__footer__previous-link").append($("#check-mark-prev").removeClass("invis")), $(".step__footer__previous-link span").addClass("nm");
        var e = $(".breadcrumb li:nth-child(2) a").attr("href");
        $("#customer-information a").attr("href", e)
    } else $(".step__footer__previous-link").append($("#check-mark-prev").removeClass("invis")), $(".step__footer__previous-link span").addClass("nm");
  if ($(".thank-you__additional-content").length && $(window).width() > 999 ) {
    $('#follow-us').show().insertAfter('.order-summary'); }
  else {
    $('#follow-us').hide();
   }
}
$(document).ready(function() {
    readypage(), $("select option").first().each(function() {
        $(this).text(this.dataset.code)
    })
 $(window).width() < 800 && $("#discount-code").removeClass("hidden").insertAfter(".order-summary-toggle__text--show span")
}), $(document).on("click", ".close-p", function() {
    event.preventDefault();
    var e = $(this).attr("variant-id");
    jQuery.post("/cart/update.js", "updates[" + e + "]=0"), setTimeout(function() {
        location.reload()
    }, 500)
})

$(document).ready(function() {
$('.order-summary__section--discount form').on("submit", function(){
    location.reload()

}); 
});
$(window).resize(function() {
  readypage();
});
