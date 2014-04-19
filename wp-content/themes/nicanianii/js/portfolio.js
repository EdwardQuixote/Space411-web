/*global jQuery: false, themeprefix: false, changeLayoutMode: false, portfolio_variable: false */

function tz_init(defaultwidth){

    var contentWidth    =   jQuery('#TzContent').width();
    var columnWidth     =   defaultwidth;
    var curColCount     =   0;
    var maxColCount     =   0;
    var newColCount     =   0;
    var newColWidth     =   0;
    var featureColWidth =   0;

    curColCount         =   Math.floor(contentWidth / columnWidth);

    maxColCount         =   curColCount + 1;

    if((maxColCount - (contentWidth / columnWidth)) > ((contentWidth / columnWidth) - curColCount)){
        newColCount     =   curColCount;
    }
    else{
        newColCount     =   maxColCount;
    }

    newColWidth         =   contentWidth;
    featureColWidth     =   contentWidth;


    if(newColCount > 1){
        newColWidth = Math.floor(contentWidth / newColCount);
        featureColWidth = newColWidth * 2;
    }

    jQuery('.element').width(newColWidth);
    jQuery('.tz_item').each(function(){
        jQuery(this).find('img').first().attr('width','100%');
    });

    jQuery('.tz_feature_item').width(featureColWidth);
    jQuery('.landscape_field').width(featureColWidth);
    var $container = jQuery('#portfolio');

    $container.imagesLoaded(function(){
        $container.isotope({
            masonry:{
                columnWidth: newColWidth
            }
        });

    });
}

jQuery(document).ready(function(){

        var cat_status = []; //var cat_status = [];
        jQuery('#portfolio .element').each(function(){
            var item_class = jQuery(this).attr('class');
            item_class = item_class.split(' ');
            for(var i = 0; i < item_class.length; i++){
                if(parseInt(item_class[i].indexOf(themeprefix), 10) === 0) {
                    if(jQuery.inArray(item_class[i], cat_status)){
                        cat_status.push(item_class[i]);
                    }
                }
            }

        });

        for(var index=0; index < cat_status.length; index++){
            jQuery('#filter a#' + cat_status[index]).removeClass('hidden');
        }

    var resizeTimer = null;
    function getFilterOptions() {
        var tags    =   [];
        jQuery('#filter a').each(function (index) {
            tags.push(jQuery(this).attr('data-option-value').replace('.',''));
        });

        return tags;
    }

    jQuery(window).bind('resize load', function() {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout("tz_init("+"350)", 100);
    });

    var $container = jQuery('#portfolio');
    $items = $container.children('.element');
    $container.imagesLoaded( function(){
        $container.isotope({
                itemSelector : '.element',
                layoutMode: 'masonry',
                sortBy:'order',			sortAscending: false,
                getSortData: {
                    name: function( $elem ) {
                        var name = $elem.find('.name'),
                            itemText = name.length ? name : $elem;
                        return itemText.text();
                    },
                    date: function($elem){
                        var number = $elem.hasClass('element') ?
                            $elem.find('.create').text() :
                            $elem.attr('data-date');
                        return number;
                    },
                    order: function($elem){
                        var _order = $elem.hasClass('element') ?
                            $elem.attr('data-order'):
                            $elem.find('.order').text();
                        return parseInt(_order);
                    }
                }
            }, function($elem){
                var $elem   = $container.find('.element'),
                    max_order   = $container.find('.element:first').attr('data-order');
                if($elem.length){
                    $elem.each(function(index){
                        if(parseInt(max_order) < parseInt(jQuery(this).attr('data-order'))){
                            max_order   = parseInt(jQuery(this).attr('data-order')) +1;
                        }
                    })
                }

                jQuery('#tz_append').attr('data-order',max_order);
                var $opClass = getFilterOptions(),
                    $b_class = jQuery('#tz_append').attr('class').split(' ');

                if($opClass.length){
                    jQuery.each($opClass,function(i,el){
                        if(jQuery.inArray(el,$b_class) === -1){
                            jQuery('#tz_append').addClass(el);
                        }
                    });
                }
            }

        );
        tz_init('350');
    });


    function loadPortfolio(){
        "use strict";
        var $optionSets = jQuery('#tz_options .option-set'),
            $optionLinks = $optionSets.find('a');
        $optionLinks.click(function(event){
            event.preventDefault();
            var $this = jQuery(this);
            // don't proceed if already selected
            if ( $this.hasClass('selected') ) {
                return false;
            }
            var $optionSet = $this.parents('.option-set');
            $optionSet.find('.selected').removeClass('selected');
            $this.addClass('selected');
            // make option object dynamically, i.e. { filter: '.my-filter-class' }
            var options = {},
                key = $optionSet.attr('data-option-key'),
                value = $this.attr('data-option-value');
            // parse 'false' as false boolean
            value = value === 'false' ? false : value;
            options[ key ] = value;
            if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
                // changes in layout modes need extra logic
                changeLayoutMode( $this, options );
            } else {
                // otherwise, apply new options
                $container.isotope( options );
            }
            return false;
        });
    }
    loadPortfolio();

});

jQuery(function(){

    jQuery('ul.nav').superfish({

        animation: {height:'show'},   // slide-down effect without fade-in
        delay:     0,
        onInit		: function(){
            var count_li    = jQuery(this).find('> li').length;
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

jQuery(window).bind("load resize",function(){

    var left_width      =  jQuery('.ja-sidebar').outerWidth(true);
    var win_width       =   jQuery('#ja-mainbody').width();
    main_width          =   win_width - left_width;
    jQuery('#ja-content').css('width',main_width);
    jQuery('#ja-content').css('min-height',jQuery(window).height()+1);
//    jQuery('#ja-mainbody').css('background-color','#eee');
    jQuery('#scrollbar1').tinyscrollbar();

});

jQuery(window).bind("load resize",function(){

    var left_width      =   jQuery('.ja-sidebar').outerWidth(true);
    var win_width       =   jQuery('#ja-mainbody').width();
    main_width          = win_width - left_width;
    jQuery('#ja-content').css('width',main_width);
    jQuery('#ja-content').css('min-height',jQuery(window).height()+1);
//    jQuery('#ja-mainbody').css('background-color','#eee');

});


jQuery(function(){
    "use strict";
    var $container = jQuery('#portfolio');
    $container.imagesLoaded(function(){
        $container.isotope({
            itemSelector : '.element',
            getSortData: {
                name: function( $elem ) {
                    var name = $elem.find('.name'),
                        itemText = name.length ? name : $elem;
                    return itemText.text();
                },
                date: function($elem){
                    var number = $elem.hasClass('element') ?
                        $elem.find('.create').text() :
                        $elem.attr('data-date');
                    return number;
                }
            }
        });
    });

    $container.infinitescroll({

            navSelector  : '#loadaj a',    // selector for the paged navigation
            nextSelector : '#loadaj a:first',  // selector for the NEXT link (to page 2)
            itemSelector : '.element',     // selector for all items you'll retrieve
            errorCallback: function(){
                jQuery('#tz_append a').unbind('click').html('').show();
                jQuery('#tz_append a').addClass('tzNomore');
            },
            loading: {
                msgText:'',
                finishedMsg: '',
                img:portfolio_variable.loading_image,
                selector: '#tz_append'
            }
        },
        // call Isotope as a callback
        function( newElements ) {
            jQuery('.tz_append2:eq(1)').remove();
            var $newElems   =   jQuery( newElements ).css({ opacity: 0 });

            // ensure that images load before adding to masonry layout
            $newElems.imagesLoaded(function(){
                // show elems now they're ready
                $newElems.animate({ opacity: 1 });

                var $elem   = $container.find('.element'),
                    max_order   = $container.find('.element:first').attr('data-order');
                if($elem.length){
                    $elem.each(function(index){
                        if(parseInt(max_order) < parseInt(jQuery(this).attr('data-order'))){
                            max_order   = parseInt(jQuery(this).attr('data-order')) +1;
                        }
                    })
                }

                jQuery('#tz_append').attr('data-order',max_order);
                // trigger scroll again
                $container.isotope( 'appended', $newElems);
                tz_init('350');
                //if there still more item
                if($newElems.length !=1){

                    //move item-more to the end
                    jQuery('div#tz_append').find('a:first').show();

                }else{
                    jQuery('div#tz_append').fadeOut();
                }
            });
            var ncat_status = []; //var ncat_status = [];
            jQuery('#portfolio .element').each(function(){
               if(jQuery(this).attr('id') != 'tz_append'){
                var item_class = jQuery(this).attr('class');
                item_class = item_class.split(' ');
                for(var i = 0; i < item_class.length; i++){
                    if(parseInt(item_class[i].indexOf(themeprefix), 10) === 0) {
                        if(jQuery.inArray(item_class[i], ncat_status)){
                            ncat_status.push(item_class[i]);
                        }
                    }
                }
              }
            });

            for(var index=0; index < ncat_status.length; index++){
                jQuery('#filter  a#' + ncat_status[index]).removeClass('hidden');
            }
        }
    );

    jQuery(window).unbind('.infscr');
    jQuery('div#tz_append a').click(function(){
        jQuery(this).stop();
        jQuery('div#tz_append').find('a:first').hide();
        $container.infinitescroll('retrieve');
    });

});



