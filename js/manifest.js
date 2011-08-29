JS.ENV.JSCLASS_PATH = (typeof JSCLASS_PATH === 'undefined') ? '.' : JSCLASS_PATH
JS.ENV.JS_PATH = (typeof JS_PATH === 'undefined') ? '.' : JS_PATH

JS.cacheBust = true;

JS.Packages(function() { with(this) {
	file(JS_PATH + '/libs/easel.js')
		.provides('Easel');
	file(JSCLASS_PATH + '/core.js')
        .provides('JS.Module',
                  'JS.Class',
                  'JS.Kernel'); 
	file(JSCLASS_PATH + '/state.js')
        .provides('JS.State')
		.requires('JS.Class', 'JS.Module');
	file(JS_PATH + '/Yadobe.js')
        .provides('Yadobe')
		.requires('JS.State', 'Easel');
}});

JS.require('Yadobe', function() {
	console.log('lol1');
	var YadobeClass = new Yadobe();
});