JS.ENV.JSLIBS_PATH = (typeof JSLIBS_PATH === 'undefined') ? 'js/libs/' : JSLIBS_PATH
JS.ENV.JSCLASS_PATH = (typeof JSCLASS_PATH === 'undefined') ? 'js/libs/JSClass/' : JSCLASS_PATH
JS.ENV.JSCONFIG_PATH = (typeof JSCONFIG_PATH === 'undefined') ? 'js/config/' : JSCONFIG_PATH
JS.ENV.JSMODEL_PATH = (typeof JSMODEL_PATH === 'undefined') ? 'js/models/' : JSMODEL_PATH
JS.ENV.JSMODEL_DINNER_PATH = (typeof JSMODEL_DINNER_PATH === 'undefined') ? 'js/models/dinner/' : JSMODEL_DINNER_PATH

JS.cacheBust = true;

JS.Packages(function() { with(this) {
	/* config */
	file(JSCONFIG_PATH + 'DinnerConst.js').provides('DINNERCONST');
	file(JSCONFIG_PATH + 'TimeManager.js').provides('TimeManager').requires('DINNERCONST');
	file(JSCONFIG_PATH + 'Page.js').provides('Page').requires('JS.Class');
	/* Dinner models */
	file(JSMODEL_DINNER_PATH + 'Place.js').provides('Place').requires('JS.Class');
	file(JSMODEL_DINNER_PATH + 'TablePlace.js').provides('TablePlace').requires('Place');
	file(JSMODEL_DINNER_PATH + 'TablePlaceGraph.js').provides('TablePlaceGraph').requires('TablePlace');
	file(JSMODEL_DINNER_PATH + 'ReceptionPlace.js').provides('ReceptionPlace').requires('Place');
	file(JSMODEL_DINNER_PATH + 'ReceptionPlaceGraph.js').provides('ReceptionPlaceGraph').requires('ReceptionPlace');
	file(JSMODEL_DINNER_PATH + 'KitchenPlace.js').provides('KitchenPlace').requires('Place');
	file(JSMODEL_DINNER_PATH + 'KitchenPlaceGraph.js').provides('KitchenPlaceGraph').requires('KitchenPlace');
	file(JSMODEL_DINNER_PATH + 'Group.js').provides('Group').requires('JS.Class');
	file(JSMODEL_DINNER_PATH + 'Menu.js').provides('Menu').requires('Recipe');
	file(JSMODEL_DINNER_PATH + 'Recipe.js').provides('Recipe').requires('JS.Class');
	file(JSMODEL_DINNER_PATH + 'RecipeManager.js').provides('RecipeManager').requires('Recipe');
	file(JSMODEL_DINNER_PATH + 'Waiter.js').provides('Waiter').requires('Menu');
	/* tools libs */
	file(JSLIBS_PATH + 'tools.js').provides('Tools');
	/* jQuery libs */
	file('https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.js')
        .provides('jQuery');
	/* Easel libs */
	file(JSLIBS_PATH + 'easel.js')
		.provides('Easel');
	/* JSClass libs */
	file(JSCLASS_PATH + 'core.js')
        .provides('JS.Module',
                  'JS.Class',
                  'JS.Kernel'); 
	file(JSCLASS_PATH + 'state.js')
        .provides('JS.State')
		.requires('JS.Class', 'JS.Module');
	/* DinnerGame */
	file(JSMODEL_PATH + 'DinnerGame.js')
        .provides('DinnerGame')
		.requires(
			'JS.State',
			'Tools',
			'jQuery',
			'Easel',
			'DINNERCONST',
			'TimeManager',
			'Page',
			'TablePlaceGraph',
			'ReceptionPlaceGraph',
			'KitchenPlaceGraph',
			'Group',
			'RecipeManager',
			'Waiter'
		);
	/* Yadobe */
	file(JSMODEL_PATH + 'Yadobe.js')
		.provides('Yadobe')
		.requires('DinnerGame');
	
}});

JS.require('Yadobe', function() {
	console.log('Yadobe launch');
	window.YadobeClass = new Yadobe('yadobe-canvas');
});