/* global $, Stripe */

// Document Ready Function.
$(document).on('turbolinks:load', function(){
	var theForm = $('#pro_form');
	var submitBtn = $('#form-signup-btn');
	
	// Set our Stripe public key.
	Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') );
	
	// When user clicks form-submit-btn.
	submitBtn.click(function(event){
		
		// Prevent the default submission behavior.
		event.preventDefault();
		submitBtn.val('Processing').prop('disabled', true);
	
		// Collect the credit card fields.
		var ccNum = $('#card_number'.val()),
				cvcNum = $('#card_code'.val()),
				expMonth = $('#card_month'.val()),
				expYear = $('#card_year'.val());
		
		// Use Stripe js libary to check for card errors
		var error = false;
		
		// Validate the card number
		if (!Stripe.card.validateCardNumber(ccNum)) {
			error = true;
			alert('The credit card number appears to be invalid');
		};
		
		// Validate the CVC number
		if (!Stripe.card.validateCVC(cvcNum)) {
			error = true;
			alert('The CVC number appears to be invalid');
		};
		
		// Validate expiration date
		if (!Stripe.card.validateExpiry(expMonth, expYear)) {
			error = true;
			alert('The expiration date appears to be invalid');
		};
		
		if (error) {
			// If there are card errors, DON'T send to Stripe
			submitBtn.prop('disabled', false).val("Sign Up");
		} else {
			// Send card information to Stripe
			Stripe.createToken({
				number: ccNum,
				cvc: cvcNum,
				exp_month: expMonth,
				exp_year: expYear
			}, stripeResponseHandler);	
		};
		
	});
	
	// Stripe will return a card token.
	function stripeResponseHandler(status, response) {
		
		// Get the token from the response.
		var token = response.id;
		
		// Inject card token as a hidden field.
		theForm.append( $('<input type="hidden" name="user[stripe_card_token]">').val(token) );
	
		// Submit form to our rails app.
		theForm.get(0).submit();
	}
	
	return false;
});