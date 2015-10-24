var require;
var define;
(function(){
    var defineModules = {};
    var modules = {};

    require = function(moduleName){
        if( modules[moduleName] ){
            return modules[moduleName];
        }
        else if( defineModules[moduleName] ){
            var module = {
                exports: {}
            };
            var res = defineModules[moduleName](require, module, module.exports);
            if( typeof res === "undefined" ){
                return module.exports;
            }else {
                return res;
            }
        }else{
            throw new Error('module not fond: ' + moduleName);
        }
    };


    define = function(moduleName, fn){
        defineModules[moduleName] = fn;
    };

})();