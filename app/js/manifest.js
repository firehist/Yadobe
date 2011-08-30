JS.ENV.JSCLASS_PATH = (typeof JSCLASS_PATH === 'undefined') ? 'js/' : JSCLASS_PATH
JS.ENV.JS_PATH = (typeof JS_PATH === 'undefined') ? '.' : JS_PATH

JS.cacheBust = true;

JS.Packages(function() { with(this) {
	/* config */
	file(JS_PATH + '/Const.js').provides('CONST');
	file(JS_PATH + '/models/TimeManager.js').provides('TimeManager');
	/* models */
	file(JS_PATH + '/models/Place.js').provides('Place').requires('JS.Class');
	file(JS_PATH + '/models/TablePlace.js').provides('TablePlace').requires('Place');
	file(JS_PATH + '/models/ReceptionPlace.js').provides('ReceptionPlace').requires('Place');
	file(JS_PATH + '/models/KitchenPlace.js').provides('KitchenPlace').requires('Place');
	file(JS_PATH + '/models/Group.js').provides('Group').requires('JS.Class');
	file(JS_PATH + '/models/Menu.js').provides('Menu').requires('Recipe');
	file(JS_PATH + '/models/Recipe.js').provides('Recipe').requires('JS.Class');
	file(JS_PATH + '/models/RecipeManager.js').provides('RecipeManager').requires('Recipe');
	file(JS_PATH + '/models/Waiter.js').provides('Waiter').requires('Menu');
	/* jQuery libs */
	file('https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.js')
        .provides('jQuery');
	/* Easel libs */
	file(JS_PATH + '/libs/easel.js')
		.provides('Easel');
	/* JSClass libs */
	file(JSCLASS_PATH + '/core.js')
        .provides('JS.Module',
                  'JS.Class',
                  'JS.Kernel'); 
	file(JSCLASS_PATH + '/state.js')
        .provides('JS.State')
		.requires('JS.Class', 'JS.Module');
	/* DinnerGame */
	file(JS_PATH + '/DinnerGame.js')
        .provides('DinnerGame')
		.requires(
			'JS.State',
			'jQuery',
			'Easel',
			'CONST',
			'TimeManager',
			'TablePlace',
			'ReceptionPlace',
			'KitchenPlace',
			'Group',
			'RecipeManager',
			'Waiter'
		);
	/* Yadobe */
	file(JS_PATH + '/Yadobe.js')
		.provides('Yadobe')
		.requires('DinnerGame');
	
}});

JS.require('Yadobe', function() {
	console.log('Yadobe launch');
	window.YadobeClass = new Yadobe();
});