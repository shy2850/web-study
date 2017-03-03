// $.fn.tabs = function(){};
(function ($) {
    $.fn.extend({
        /**
         * tabs切换效果, 不提供 destroy 功能
         */
        tabs: function(cfg){
            var defaultCfg = {
                /**
                 * 是否自动轮播
                 * @type {Boolean}
                 */
                auto: false,
                /**
                 * 自动轮播的切换时间
                 * @type {Number}
                 */
                interval: 1200,
                /**
                 * 当前聚焦的index
                 * @type {Number}
                 */
                current: 0,
                /**
                 * 是否重新开始？ 设置为false时, next到头不能换到开始
                 * @type {Boolean}
                 */
                repeat: true,
                /**
                 * 最大可聚焦index， 如果设置为 0 则为items.length
                 * @type {Number}
                 */
                max_focus: 0,
                /**
                 * 切换的动画效果
                 * @type {String} slide(横向动画)|show(显示隐藏)|fade(渐变显示)|animate(纵向动画)
                 */
                type: 'show',
                /**
                 * 可以点击来 切换聚焦的按钮组(必须是兄弟元素) 的父级容器
                 * @type {String}
                 */
                handle: '.handle',
                /**
                 * 切换聚焦的按钮组某个聚焦时候需要添加的class
                 * @type {String}
                 */
                current_class: 'current',
                /**
                 * 切换展示的内容组(必须是兄弟元素) 的父容器
                 * @type {String}
                 */
                show: '.show',

                /**
                 * 在 按钮组上绑定的事件类型，用来触发切换
                 * @type {String} 默认 click
                 */
                handle_event: 'click',
                /**
                 * 自动运行时候， 绑定在整个父容器上面的事件，用来停止自动运行
                 * @type {String}
                 */
                pause_event: 'mouseover',
                /**
                 * 停止自动运行时候， 绑定在整个父容器上面的事件，用来重启自动运行
                 * @type {String}
                 */
                run_event: 'mouseout',

                /**
                 * 点击按钮触发 next
                 * @type {String}
                 */
                btn_next: '.next',
                /**
                 * 点击按钮触发 prev
                 * @type {String}
                 */
                btn_prev: '.prev',

                /**
                 * 切换聚焦的时候， 触发事件
                 * @param  {Number} index 当前聚焦的index
                 */
                onChange: function (index) {}
            };

            // return this.each 同时覆盖所有满足条件的tabs
            return this.each(function(){
                var holder = $(this);

                // 如果已经初始化过了，就用已绑定配置+cfg，否则用默认配置+cfg，完事儿再保存回去
                // .data 方法是jQuery用来把数据绑定到dom元素的方法
                var inited = holder.data('init-tabs');
                cfg = $.extend(inited || defaultCfg, cfg);
                holder.data({'init-tabs': cfg});

                // 获取各种元素
                var btns = holder.find(cfg.handle).children();
                var show = holder.find(cfg.show)
                var items = show.children();
                var prev = holder.find(cfg.btn_prev);
                var next = holder.find(cfg.btn_next);

                // 计算各种初始值
                var index = cfg.focus;
                var max = cfg.max_focus || items.length;
                var width = items.width();
                var height = items.height();

                // 聚焦
                function render (i) {
                    // 可重复时， i 超过 max，从头开始，否则 i 介于 0 ~ max 之间
                    if (cfg.repeat) {
                        i = (i + max) % max;
                    }
                    else {
                        i = Math.min(i, max);
                        i = Math.max(i, 0);
                    }
                    index = i;

                    // 切换按钮的聚焦
                    btns.eq(i).addClass(cfg.current_class).siblings().removeClass(cfg.current_class);

                    // 根据不同的动画类型分别处理, 开启动画的需要对整个展示的内容组父容器操作
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
                // 执行聚焦操作
                render(cfg.current);

                // 初始化完成以后只能设置聚焦，不再绑定事件和修改其他参数
                if (inited) {
                    return;
                }

                // 自动轮播时候 给定一个标记，在轮询(interval)中判断是否继续修改 index
                if( cfg.auto ){
                    var pause = false;
                    holder.on(cfg.pause_event, function(){
                        pause = true;
                    }).on(cfg.run_event, function(){
                        pause = false;
                    });

                    setInterval(function(){
                        if( pause ){return;}
                        render(index + 1);
                    }, cfg.interval);
                }

                // 切换按钮可能会有 href 属性默认设置 hash, 阻止默认的锚点切换
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
