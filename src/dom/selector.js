function $(sel, ele){
	function _getElementsByClassName(className, ele) {
		ele = ele || document;
		if( ele.getElementsByClassName ){
			var all = ele.getElementsByClassName(className),
				result = [];
			for (var i = 0; i < all.length; i++) {
				result.push( all[i] );
			};
			return result;
		}else{
			var all = ele.getElementsByTagName("*"),
				result = [],
				reg = new RegExp( "([\\s]|^)" + className + "([\\s]|$)" );
			for (var i = 0; i < all.length; i++) {
				if( all[i].className.match( reg ) ){
					result.push( all[i] );
				}
			};
			return result;
		}
	}
	ele = ele || document;
	var r = [];
	if( sel.charAt(0) == "#" ){
		var el = ele.getElementById( sel.substring(1) ); 
		r.push( el );
	}else if( sel.charAt(0) == "." ){
		r = _getElementsByClassName( sel.substring(1), ele )
	}else{
		var a1 = ele.getElementsByTagName( sel );
		for (var i = 0; i < a1.length; i++) {
			r.push( a1[i] );
		};
	}
	return r;
};
