define(function(require, module, exports){

    console.log( 'require before' );
    
    var _Math = require('math');

    console.log( _Math.sqrt(15) );

});