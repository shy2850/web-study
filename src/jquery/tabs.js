// $.tabs = function(){};
$.extend({
	tabs: function(cfg){
		cfg = cfg || {};
		$(cfg.holder||".tab-holder").each(function(){
			var holder = $(this);	// holder

			holder.find(cfg.handle || ".handle").children().on("click",function(e){
				$(this).addClass("current").siblings().removeClass("current");
				// var href = this.getAttribute("href");
				var href = $(this).attr("href");
				// $(href).show().siblings().hide();
				holder.find(cfg.show||".show").children().first().animate({
					marginTop: -100 * $(this).index()
				});
				e.preventDefault(); 
			}).first().trigger("click");
		});
	},
	flash: function(el){
		$(el).fadeOut().fadeIn().fadeOut().fadeIn().fadeOut().fadeIn().fadeOut().fadeIn().fadeOut().fadeIn().fadeOut();
	}
});


// $.fn.tabs = function(){};
$.fn.extend({
	tabs: function(cfg){
		cfg = cfg || {};
		return this.each(function(){
			var holder = $(this);	// holder
			var btns = holder.find(cfg.handle || ".handle").children();

			if( cfg.auto ){
				var index = 0, if_hover = false;
				holder.on("mouseover",function(){
					if_hover = true;
				}).on("mouseout",function(){
					if_hover = false;
				});

				setInterval(function(){
					if( if_hover ){return;}
					index = (index+1) % btns.length;
					btns.eq(index)
						.trigger("click");
				},2000);
			}

			btns.on("click",function(e){
				$(this).addClass("current").siblings().removeClass("current");
				// var href = this.getAttribute("href");
				var href = $(this).attr("href");

				switch(cfg.type||"show"){
					case "slide":
						holder.find(cfg.show||".show").animate({
							marginLeft: -300 * $(this).index()
						});
						break;
					case "show": 
						$(href).show().siblings().hide();
						break;
					case "fade": 
						$(href).fadeIn().siblings().fadeOut();
						break;
					case "animate":
						holder.find(cfg.show||".show").children().first().animate({
							marginTop: -100 * $(this).index()
						});
						break;
				}

				e.preventDefault(); 
			}).first().trigger("click");
		});
	},
	flash: function(){
		return this.fadeOut().fadeIn().fadeOut().fadeIn();
	}
});


// $("h2").on("click",function(){
	// 	$.flash(this);
	// })

	// var hash = window.location.hash || "#show1";
	// var handler = $('[href="'+hash+'"]');
	// if( handler.length ){
	// 	handler.trigger("click");
	// }else{
	// 	$('[href="#show1"]').trigger("click");
	// }

	// var hash = window.location.hash;
	// if( ["#show1","#show2","#show3"].indexOf(hash) == -1 ){
	// 	hash = "#show1";
	// }
	// $('[href="'+hash+'"]').trigger("click");

/**

	$(selector) // 选择元素
	$().find() // 在已选中的元素下面继续找

	.eq(0) // 一组元素中的第几个
	.first() // 一组元素中的第一个

	$().on(event,callback) // 事件绑定
	$().trigger(event);

	$().show() .hide() .slideDown() .shlideUp() .fadeIn() .fadeOut()
	
	$().attr() // 获取属性
	$().prop() // 获取(表单中的元素特性)属性 selected/readonly/disabled/checked 

	$().css()	// css 设置
	$().animate()	// css的动态(过渡型)设置
**/