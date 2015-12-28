exports["localhost"] = {
    "root": "d:\\doc\\github\\web-study\\",
    "autoprefixer": true,
    "babel": false,
    "livereload": {
        inject: function(pathname){
            return pathname.match(/html/);
        }
    }
};
