(function($){
if( "undefined" === typeof document.createElement("input").placeholder ){
	$("[placeholder]").each(function(){
		var t = $(this),
			ph = t.attr("placeholder");
		t.on("focus", function(){
			if( t.val() === ph ){
				t.val("");
			}
		}).on("blur", function(){
			if( !$.trim( t.val() ) ){
				t.val( ph );
			}
		});

		if( !$.trim( t.val() ) ){
			t.val( ph );
		}
	});
}
})(jQuery);