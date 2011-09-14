exports.AppTabGroup = function() {
	var instance = Ti.UI.createTabGroup();
	
	//loop through tab objects and add them to the tab group
	for (var i = 0, l = arguments.length; i < l; i++) {
		var tab = Ti.UI.createTab(arguments[i]);
		//on initialization, we track the current tab as the first one added
		if (i === 0) {
			instance.currentTab = tab;
		}
		instance.addTab(tab);
	}
	
	//track the current tab for the tab group
	instance.addEventListener('focus', function(e) {
		instance.currentTab = e.tab;
	});
	
	return instance;
};
