var navGroup = Ti.UI.iPhone.createNavigationGroup({
	window : Ti.UI.createWindow({
		title : 'a window'
	})
});
var containerWindow = Ti.UI.createWindow();
containerWindow.add(this.navGroup);
containerWindow.open();

var win2 = Ti.UI.createWindow({
	title : 'a window'
});

var win3 = Ti.UI.createWindow({
	title : 'a window'
});

var win4 = Ti.UI.createWindow({
	title : 'a window'
});

var win5 = Ti.UI.createWindow({
	title : 'a window'
});

navGroup.open(win2);
navGroup.open(win3);
navGroup.open(win4);
navGroup.open(win5);

var btn = Ti.UI.createButton({
	height:40,
	width:120
});
btn.addEventListener('click', function() {
	win2.close();
});
win5.add(btn);


