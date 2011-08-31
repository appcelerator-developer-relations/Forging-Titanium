exports.MainView = function() {
	var instance = Ti.UI.createView({
		backgroundColor:'#fff'
	});
	
	instance.add(Ti.UI.createLabel({
		text:'Main View',
		color:'#000',
		height:'auto',
		width:'auto'
	}));
	
	return instance;
};
