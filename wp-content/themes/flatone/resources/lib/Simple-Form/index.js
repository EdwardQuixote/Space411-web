jQuery(document).ready(function() {
	 jQuery('#contactform').validate({
	 	// Set up rules for each field in your form. Reference each one by its "name" not "id"
		rules: {
	    	Your_Name: { required: true },
	    	Email_Address: { required: true, email: true },
	    	Message: { required: true }
		}
	});
	// Submit form using AJAX and clear the submitted results
	jQuery('#contactform').submit(function() {
		jQuery.ajax({
			type: 'POST',
			target: '#message',		
			url: myAjaxContactForm.ajaxurl,		
			data:{	action: 'contactform_submit', 
					email: escape(jQuery('#Email_Address').val()), 
					name: escape(jQuery('#Your_Name').val()),
					phone: escape(jQuery('#Phone_Number').val()),
					ques: escape(jQuery('#Question').val())
				},
			success: function(msg) {
				jQuery('#message').html(msg);
			}
		});	
		return false;
	});
});

// Fade in success message
function successMessage() {
	jQuery('#message').fadeIn(500).delay(5000).fadeOut(500);
}
