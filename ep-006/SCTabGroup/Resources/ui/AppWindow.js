//A window object which will be associated with the stack of windows
exports.AppWindow = function(args) {
	var instance = Ti.UI.createWindow(args);
	
	var button = Ti.UI.createButton({
		height:44,
		width:200,
		title:'Open new window on tab',
		top:20
	});
	instance.add(button);
	
	button.addEventListener('click', function() {
		globals.tabs.currentTab.open(Ti.UI.createWindow({
			title: 'New Window',
			backgroundColor: 'white'
		}));
	});
	
	return instance;
};
