var needsCalibration = false;
var i = 0;
var createPositionDataLabel = function(name, value) {
	var label = Ti.UI.createLabel({
		text: '  ' + name + ': ' + (value === undefined ? 'null' : value),
		color: '#444',
		font: {
			fontSize: '16dp',
			fontWeight: 'bold'	
		},
		width: 'auto',
		left: '5dp'
	});
	label.updatePositionData = function(data) {
		label.text = '  ' + name + ': ' + (data === undefined ? 'null' : data);
	};
	return label;
};

var win = Ti.UI.createWindow({
	backgroundColor: '#eee',
	layout: 'vertical',
	fullscreen: false,
	exitOnClose: true
});
win.orientationModes = [Ti.UI.PORTRAIT];
var webview = Ti.UI.createWebView({
	url: 'web/index.html',
	height: Ti.Platform.displayCaps.platformWidth,
	width: Ti.Platform.displayCaps.platformWidth
});
var toolbar = Ti.UI.createView({
	height: '44dp',
	backgroundColor: '#888'
});
var button = Ti.UI.createButton({
	title: 'Calibrate',
	height: '40dp',
	width: '120dp',
	top: '4dp'
});
button.addEventListener('click', function(e) {
	needsCalibration = true;
});

toolbar.add(button);
win.add(webview);
win.add(toolbar);

var values = [ 'azimuth', 'pitch', 'roll', 'x', 'y', 'z' ];
var labels = [];
for (i = 0; i < values.length; i++) {
	var label = createPositionDataLabel(values[i]);
	labels.push(label);
	win.add(label);
}
win.open();

var twisti = require('ti.twisti');
twisti.addEventListener('update', function(e) {
	Ti.App.fireEvent('app:updateRotation', { 
		azimuth: e.azimuth,
		pitch: e.pitch, 
		roll: e.roll,
		calibrate: needsCalibration
	});
	needsCalibration = false;
	for (i = 0; i < labels.length; i++) {
		labels[i].updatePositionData(e[values[i]]);	
	}
});