var fn = function() {
	alert('Resize event has finished');
}

$(document).ready(function() {
	$(window).afterResize({ 
		action: fn,
		runOnLoad: true
	});
});