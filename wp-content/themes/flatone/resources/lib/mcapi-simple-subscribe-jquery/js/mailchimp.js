jQuery(document).ready(function() {
	jQuery('#signup').submit(function() {
		// update user interface
		jQuery('#response').html('Adding email address...');
		
		// Prepare query string and send AJAX request
		jQuery.ajax({
			type: 'POST',
            url: myAjax.ajaxurl,		
			data: {action: 'mailchimp_submit', email: escape(jQuery('#email').val()) },
			success: function(msg) {
				jQuery('#response').html(msg);
			}
		});
		return false;
	});
});