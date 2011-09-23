exports.AppWindow = function() {
	var MainView = require('ui/MainView'),
		ConfigView = require('ui/ConfigView');
	
	var instance = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		navBarHidden:true,
		exitOnClose:true
	});
	
	var logo = Ti.UI.createImageView({
		image:'images/wuphf.png',
		top:5,
		height:60,
		width:260
	});
	instance.add(logo);
	
	var scroller = Ti.UI.createScrollableView({
		top:60,
		showPagingControl:false,
		disableBounce:true,
		views:[
			new MainView(),
			new ConfigView()
		]
	});
	instance.add(scroller);
	
	var configButton = Ti.UI.createImageView({
		image:'images/config.png',
		height:48,
		width:48,
		bottom:5,
		right:5
	});
	instance.add(configButton);
	
	var messageButton = Ti.UI.createImageView({
		image:'images/message.png',
		height:48,
		width:48,
		bottom:5,
		left:5,
		visible:false
	});
	instance.add(messageButton);
	
	function toggle(viewIndex) {
		if (viewIndex === 0) {
			configButton.visible = true;
			messageButton.visible = false;
		}
		else {
			configButton.visible = false;
			messageButton.visible = true;
		}
	}
	
	scroller.addEventListener('scroll', function(e) {
		toggle(e.currentPage);
	});
	
	configButton.addEventListener('click', function(e) {
		toggle(1);
		scroller.scrollToView(1);
	});
	
	messageButton.addEventListener('click', function(e) {
		toggle(0);
		scroller.scrollToView(0);
	});
	
	return instance;
};
