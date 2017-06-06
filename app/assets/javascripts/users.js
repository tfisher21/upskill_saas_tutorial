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
		event.preventDefault()
	
		// Collect the credit card fields.
		var ccNum = $('#card_number'.val()),
				cvcNum = $('#card_code'.val()),
				expMonth = $('#card_month'.val()),
				expYear = $('#card_year'.val());
		
		// Send card information to Stripe
		Stripe.createToken({
			number: ccNum,
			cvc: cvcNum,
			exp_month: expMonth,
			exp_year: expYear
		}, stripeResponseHandler);
	});
	
	// Stripe will return a card token
	
	
	// Inject card token as a hidden field
	
	
	// Submit form to our rails app
});