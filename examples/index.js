'use strict';

var cprod = require( './../lib' );

var data = new Array( 10 );
for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random()*10 ) + 1;
}

console.log( cprod( data ) );
// returns [...]
