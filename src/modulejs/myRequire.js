var require;
var define;
(function(){
    var defineModules = {};
    var modules = {};

    require = function(moduleId){
        if (Object.prototype.toString.call(moduleId) === "[object Array]") {
            for (var i = 0; i < moduleId.length; i++) {
                require(moduleId[i]);
            }
            return;
        }
        if( modules[moduleId] ){
            return modules[moduleId];
        }
        else if( defineModules[moduleId] ){
            var module = {
                exports: {}
            };
            var res = defineModules[moduleId](require, module.exports, module);
            if( typeof res === "undefined" ){
                return module.exports;
            }else {
                return res;
            }
        }else{
            throw new Error('module not fond: ' + moduleId);
        }
    };


    define = function(moduleId, deps, fn){
        defineModules[moduleId] = fn;
    };

})();