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

var i = 0;
var values = [ 'azimuth', 'pitch', 'roll', 'x', 'y', 'z' ];
var labels = [];
var win = Ti.UI.createWindow({
	backgroundColor: '#eee',
	layout: 'vertical',
	fullscreen: false
});
win.orientationModes = [Ti.UI.PORTRAIT];

for (i = 0; i < values.length; i++) {
	var label = createPositionDataLabel(values[i]);
	labels.push(label);
	win.add(label);
}
win.open();

var twisti = require('ti.twisti');
twisti.addEventListener('update', function(e) {
	for (i = 0; i < labels.length; i++) {
		labels[i].updatePositionData(e[values[i]]);	
	}
});