// $("#head")[0].addEventListener 

function on(el, type, fn){
	if( "[object Array]" === Object.prototype.toString.call(el) ){
		for (var i = 0; i < el.length; i++) {
			on(el[i], type, fn);
		}
	}else if( el.addEventListener ){
		el.addEventListener(type, fn, false);
	}else{
		el.attachEvent("on"+type, function(e){
			fn.call(el, e);
		});
	}
}

