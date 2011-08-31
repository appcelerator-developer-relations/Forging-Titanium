exports.SettingsView = function() {
	var instance = Ti.UI.createView({
		backgroundColor:'#fff'
	});
	
	var label = Ti.UI.createLabel({
		text:'Settings View: tap to close',
		color:'#000',
		height:'auto',
		width:'auto'
	});
	
	label.addEventListener('click', function() {
		Ti.App.fireEvent('app:dismiss.settings');
	});
	instance.add(label);
	
	return instance;
};
