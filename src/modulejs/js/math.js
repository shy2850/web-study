define(function(require, module, exports){

    var max = function () {
        //  将参数修改为数组
        var arr = [].slice.call(arguments);

        var max = arr[0];

        arr.forEach(function(item){
            if(max < item){
                max = item;
            }
        });

        return max;
    };

    console.log('math.js');
    
    return {
        sqrt: function(n) {
            return n * n;
        },
        max: max
    };


});
