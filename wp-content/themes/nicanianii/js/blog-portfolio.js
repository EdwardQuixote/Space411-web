jQuery(window).bind('load resize',function(){
    jQuery('#scrollbar1').tinyscrollbar();
});
jQuery(function(){

    jQuery('ul.nav').superfish({

        animation: {height:'show'},   // slide-down effect without fade-in
        delay:     0,
        onInit		: function(){

            var count_li = jQuery(this).find('> li').length;
            var width_subul = count_li * 181;
            jQuery('ul.nav > li.menu-item  > ul.sub-menu').css('width',width_subul + 'px');
            //console.log(jQuery('ul.sf-menu ul li').length);
        },
        onShow		: function(){

            jQuery('ul.nav > li.menu-item  > ul.sub-menu').animate({
                opacity:1,
                duration:1000
            });

        }
    });
});

//siderbar-leftblog

jQuery(document).ready(function(){

    var tz = jQuery.noConflict();
    tz('.tz_news .tz_accordion:first-child h3').addClass('open');
    tz('.tz_news .tz_accordion:first-child').find('.info_accordion').css('display','block');

    tz('.tz_accordion h3').click(function(){
        tz(this).parent().find('.info_accordion').slideToggle();
        tz(this).toggleClass('open');
    });
})