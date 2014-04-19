	(function () {
		"use strict";	
		
		/*global jQuery */	
	
		jQuery(document).ready(function(){	
	
			jQuery(function(){
					jQuery(".player").mb_YTPlayer();
			});		

			jQuery('#slides').superslides({
				animation: 'fade',
				play:2000,
				pagination:false,
				inherit_width_from: '.top',
				inherit_height_from: '.top'
			});		

			jQuery('.bxslider').bxSlider({
				auto: true,
				controls:false,
				mode:'vertical',
				slideMargin: 40	
			});
			
			jQuery('.bx_featured_slider').bxSlider({
				auto: true,
				controls:false,
				mode:'fade',
				pagerType:'short',
				slideMargin: 40	
			});		
			
			jQuery('#nav-wrapper').height(jQuery("#nav").height());
			
			jQuery('#nav').affix({
				offset: { top: jQuery('#nav').offset().top }
			});			
			
			jQuery('#Grid').mixitup();	
			
			jQuery(function() {
				jQuery("#toTop").scrollToTop(1000);
			});		
		
		});
	
	}());