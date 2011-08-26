function Point(x, y) {
  this.x = x;
  this.y = y;
}

function heriter(destination, source) { 
    function initClassIfNecessary(obj) { 
        if( typeof obj["_super"] == "undefined" ) { 
            obj["_super"] = function() { 
                var methodName = arguments[0]; 
                var parameters = arguments[1]; 
                this["__parent_methods"][methodName].apply(this, parameters); 
            } 
        } 
        if( typeof obj["__parent_methods"] == "undefined" ) { 
            obj["__parent_methods"] = {} 
        } 
    } 
    for (var element in source) { 
        if( typeof destination[element] != "undefined" ) { 
            initClassIfNecessary(destination); 
            destination["__parent_methods"][element] = source[element]; 
        } else { 
            destination[element] = source[element]; 
        } 
    } 
} 