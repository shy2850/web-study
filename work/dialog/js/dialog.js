(function () {
    function create (html) {
        var parent = document.createElement('div');
        parent.innerHTML = html;
        return parent.children[0];
    }
    function show (dom) {
        dom.style.display = '';
    }
    function hide (dom) {
        dom.style.display = 'none';
    }
    function extend (base, extender) {
        for (var k in extender) {
            if (extender.hasOwnProperty(k) && typeof extender[k] != 'undefined') {
                base[k] = extender[k];
            }
        }
        return base;
    }

    var mask = create('<div class="dialog-mask" style="display:none;"></div>');
    var holder = create('<div class="dialog-holder" style="display:none;"></div>');
    var head = create('<div class="dialog-head"></div>');
    var title = create('<span class="dialog-title">温馨提示</span>');
    var close = create('<a href="javascript:void(0);" class="dialog-close">&times;</a>');
    var body = create('<div class="dialog-body">基本提示信息</div>');
    var foot = create('<div class="dialog-foot"></div>');
    var ok = create('<a href="javascript:void(0);" class="btn-ensure">确定</a>');
    var cancel = create('<a href="javascript:void(0);" class="btn-cancel">取消</a>');

    head.appendChild(title);
    head.appendChild(close);

    foot.appendChild(ok);
    foot.appendChild(cancel);

    holder.appendChild(head);
    holder.appendChild(body);
    holder.appendChild(foot);

    document.body.appendChild(mask);
    document.body.appendChild(holder);

    var defaultOptions = {
        showMask: true,
        closeWithMask: true,
        showHead: true,
        title: '温馨提示',
        buttons: ['确定', '取消'],
        onClose: function (y) {}
    };
    
    function Dialog (opt) {
        var t = this;
        var o = extend({}, defaultOptions);
        extend(o, opt);

        mask.onclick = o.closeWithMask ? function () {
            t.hide(false); // 取消的关闭
        } : null;

        o.showHead ? show(head) : hide(head);
        title.innerHTML = o.title;
        close.onclick = function () {
            t.hide(false); // 取消的关闭
        };

        if (o.content && o.content.outerHTML) {
            body.innerHTML = o.content.outerHTML;
        }
        else {
            body.innerHTML = o.content;
        }

        for (var i = 0; i < foot.children.length; i++) {
            if (o.buttons[i]) {
                foot.children[i].innerHTML = o.buttons[i];
                show(foot.children[i]);
            }
            else {
                hide(foot.children[i]);
            }
        }
        ok.onclick = function () {
            t.hide(true); // 确定的关闭
        };
        cancel.onclick = function () {
            t.hide(false); // 取消的关闭
        };

        t.options = o;
    }
    Dialog.prototype = {
        show: function () {
            show(holder);
            this.options.showMask ? show(mask) : hide(mask);
            return this;
        },
        hide: function (y) {
            this.options.onClose(y);
            if (y && typeof this.__yesFn === 'function') {
                this.__yesFn();
            }
            else if (typeof this.__noFn === 'function') {
                this.__noFn();
            }
            hide(holder);
            hide(mask);
            return this;
        },
        yes: function (fn) {
            this.__yesFn = fn;
            return this;
        },
        no: function (fn) {
            this.__noFn = fn;
            return this;
        }
    };
    Dialog.confirm = function (info, cbk, opt) {
        var o = extend(extend({
            closeWithMask: false
        }, opt), {
            content: info,
            onClose: cbk
        });
        var d = new Dialog(o);
        d.show();
        return d;
    };
    Dialog.alert = function (info, cbk, opt) {
        var o = extend(extend({
            closeWithMask: false,
            buttons: ['确定']
        }, opt), {
            content: info,
            onClose: cbk
        });
        var d = new Dialog(o);
        d.show();
        return d;
    };

    window.Dialog = Dialog;
})();