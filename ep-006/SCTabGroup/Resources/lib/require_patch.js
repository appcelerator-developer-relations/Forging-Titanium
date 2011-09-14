/*
 * Monkey patch for require to make it do two things:
 * - only load a module once per context (performance/efficiency++)
 * - if the exports object contains an object with the same name as the module
 * 		root (meaning "MyWindow" for module ui/common/MyWindow) return that
 *	    value from require.  This monkey patch is necessary because Titanium's
 * 		require implementation (as of the latest 1.7.x) doesn't let you assign
 * 		exports to be a whole other object.
 * 
 * Example:
 * 
 * ui/Foo.js
 * ---------
 * exports.Foo = function() {
 * 	//create class however you like...
 * }
 * 
 * anywhere_else.js
 * ----------------
 * var Foo = require('ui/Foo');
 * var myFoo = new Foo();
 * 
 * 
 */
exports.monkeypatch = function(object) {
	var scriptRegistry = {},
		old_require = object.require;
	object.require = function(moduleName) {
		if (!scriptRegistry[moduleName]) {
			var mod = old_require(moduleName),
				moduleRoot = moduleName.split(/[\/ ]+/).pop();
			if (typeof(mod[moduleRoot]) === 'function') {
				scriptRegistry[moduleName] = mod[moduleRoot];
			}
			else {
				scriptRegistry[moduleName] = mod;
			}	
		}
		return scriptRegistry[moduleName];
	};
};
