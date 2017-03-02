// $.fn.tabs = function(){};
(function ($) {
    $.fn.extend({
        tabs: function(cfg){
            var defaultCfg = {
                auto: false,
                interval: 1200,
                current: 0,
                repeat: true,
                max_focus: 0,
                type: 'show',

                handle: '.handle',
                current_class: 'current',
                show: '.show',

                handle_event: 'click',
                pause_event: 'mouseover',
                run_event: 'mouseout',

                btn_next: '.next',
                btn_prev: '.prev',

                onChange: function (index) {}
            };

            return this.each(function(){
                var holder = $(this);

                var inited = holder.data('init-tabs');
                cfg = $.extend(inited || defaultCfg, cfg);
                holder.data({'init-tabs': cfg});

                var btns = holder.find(cfg.handle).children();
                var show = holder.find(cfg.show)
                var items = show.children();
                var prev = holder.find(cfg.btn_prev);
                var next = holder.find(cfg.btn_next);

                var index = cfg.focus;
                var max = cfg.max_focus || items.length;
                var width = items.width();
                var height = items.height();

                function render (i) {
                    if (cfg.repeat) {
                        i = (i + max) % max;
                    }
                    else {
                        i = Math.min(i, max);
                        i = Math.max(i, 0);
                    }
                    index = i;
                    btns.eq(i).addClass(cfg.current_class).siblings().removeClass(cfg.current_class);
                    switch(cfg.type){
                        case "slide":
                            show.animate({
                                marginLeft: -width * i
                            });
                            break;
                        case "show": 
                            items.eq(i).show().siblings().hide();
                            break;
                        case "fade": 
                            items.eq(i).fadeIn().siblings().fadeOut();
                            break;
                        case "animate":
                            show.animate({
                                marginTop: -height * i
                            });
                            break;
                    }
                    cfg.onChange(i);
                }
                render(cfg.current);

                // 初始化完成以后只能设置聚焦，不再绑定事件
                if (inited) {
                    return;
                }

                if( cfg.auto ){
                    var if_hover = false;
                    holder.on(cfg.pause_event, function(){
                        if_hover = true;
                    }).on(cfg.run_event, function(){
                        if_hover = false;
                    });

                    setInterval(function(){
                        if( if_hover ){return;}
                        render(index + 1);
                    }, cfg.interval);
                }

                btns.on("click", function(e){
                    render($(this).index());
                    e.preventDefault();
                });

                prev.on('click', function(){
                    render(index - 1);
                });

                next.on('click', function(){
                    render(index + 1);
                });

            });
        }
    });
})(jQuery);
