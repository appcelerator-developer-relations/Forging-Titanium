var baseHeight = 200;
var baseWidth = 200;

var win = Ti.UI.createWindow({
	backgroundColor: '#fff',
	fullscreen: false,
	exitOnClose: true
});
var view = Ti.UI.createView({
	backgroundColor: '#800',
	height: baseHeight,
	width: baseWidth
});
var viewLabel = Ti.UI.createLabel({
	text: baseWidth + ' x ' + baseHeight,
	color: '#fff',
	font: {
		fontWeight: 'bold',
		fontSize: 24	
	},
	height: 'auto',
	width: 'auto'
});

view.addEventListener('longpress', function(e) {
	alert('longpress');
});
view.addEventListener('pinch', function(e) {
	view.height = baseHeight * e.scale;
	view.width = baseWidth * e.scale;
	viewLabel.text = Math.round(view.width) + ' x ' + Math.round(view.height);
});
view.addEventListener('touchstart', function(e) {
	baseHeight = view.height;
	baseWidth = view.width;
});

view.add(viewLabel);
win.add(view);
win.open();