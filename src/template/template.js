(function(){
	var utils = {

		"each": function(tmpl, o){
			var s = "";
			for (var i = 0; i < o.length; i++) {
				s += Template(tmpl, o[i]);
			}
			return s;
		},
		"with": function(tmpl, o){
			return Template(tmpl, o);
		},
		"if": function(tmpl, con, o){
			if( con ){
				return Template(tmpl, o);
			}else{
				return "";
			}
		}

	};

	Template = function(tmpl, o) {
		return tmpl.replace(
			/{{(\w+)\s+(\w+)}}([\s\S]*?){{\/\1}}/g,
			function(all, exp, arg, tmp){
				return utils[exp](tmp, o[arg], o);
		}).replace(
			/{{(\w+)}}/g, 
			function(wd, w){
				return o[w] || "";
		});
	};
})();

