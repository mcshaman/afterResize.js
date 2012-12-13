( function( $ ) {
	"use strict";
	// Define default settings
	var defaults = {
		action: function() {},
		runOnLoad: false,
		duration: 500
	};
	// Define global variables
	var settings = defaults,
		running = false,
		start = new Date();
	
	var methods = {
	// Initial plugin confiuration
	init: function( options ) {
		// Define runtime settings
		settings = $.extend( {}, defaults, options );
		// Process each matching jQuery object
		return this.each(function() {
		
			if( settings.runOnLoad ) { settings.action(); }
		
			$(this).resize( function() {
				console.log('resize');
				methods.timedAction.call( this );
			} );
		} );
	},
	timedAction: function( code, millisec ) {
		
		var doAction = function() {
			var remaining = settings.duration;
			if( running ) {
				var elapse = new Date() - start;
				remaining = settings.duration - elapse;
				if( remaining <= 0 ) {
					// Clear timeout and resset running variable
					clearTimeout(running);
					running = false;
					// Perform user defined function
					settings.action();
				
					return;
				}
			}
			wait( remaining );
		};
		
		var wait = function( time ) {
			running = setTimeout( doAction, time );
		};
		
		// Define new action starting time
		start = new Date();
		// Define runtime settings if function is run directly
		if( typeof millisec === 'number' ) { settings.duration = millisec; }
		if( typeof code === 'function' ) { settings.action = code; }
		
		// Only run timed loop if not already running
		if( !running ) { doAction(); }
		
		}
	};
	
	$.fn.afterEvent = function( method ) {
		if( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ) );
		} else if ( typeof method === 'object' || !method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
		}
	};
	
})(jQuery);
