$(document).ready(function() {
	$(window).afterResize( { 
		action: function() { 
			$('#display').html('Done');
		},
		duration: 500
	} );
});