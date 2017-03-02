// $.fn.tabs = function(){};
$.fn.extend({
    tabs: function(cfg){
        cfg = $.extend({
            auto: false,
            interval: 1200,
            current: 0,
            type: 'show',

            handle: '.handle',
            handle_current: '.current',
            show: '.show',

            handle_event: 'click',
            pause_event: 'mouseover',
            run_event: 'mouseout',

            btn_next: '.next',
            btn_prev: '.prev'
        }, cfg);

        return this.each(function(){
            var holder = $(this);    // holder
            var btns = holder.find(cfg.handle).children();
            var show = holder.find(cfg.show)
            var items = show.children();
            var prev = holder.find(cfg.btn_prev);
            var next = holder.find(cfg.btn_next);

            var index = cfg.focus;
            var width = items.width();
            var height = items.height();

            function render (i) {
                index = i;
                btns.eq(i).addClass(cfg.handle_current).siblings().removeClass(cfg.handle_current);
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
                    index = (index + 1) % items.length;
                    render(index);
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

            render(cfg.current);
        });
    }
});
