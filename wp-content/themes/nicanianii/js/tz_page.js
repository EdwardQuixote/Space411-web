var w_height = jQuery(window).height();
jQuery(document).ready(function(){
    jQuery('div.module_contact_map iframe').css('height',w_height+'px');
    jQuery('.contact-overlay, .contact-inner').bind("touchstart mousedown", function(evt) {
        jQuery('.contact-overlay, .contact').addClass('contact-transparent');
    });
    jQuery('.contact-overlay, .contact-inner').bind("touchend mouseup", function(evt) {
        jQuery('.contact-overlay, .contact').removeClass('contact-transparent');
    });
});