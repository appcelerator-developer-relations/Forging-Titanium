exports.createChoiceWindow = function(ip, port) {
	var win = Ti.UI.createWindow({
		backgroundColor: '#eee',
		fullscreen: false,
		exitOnClose: false
	});
	win.orientationModes = [ Ti.UI.PORTRAIT ];
	
	var view = Ti.UI.createView({
		height: 'auto',
		width: 'auto',
		layout: 'vertical',
		top: '100dp'
	});
	var label = Ti.UI.createLabel({
		text: 'Choose:',
		color: '#222',
		font: {
			fontSize: '24dp',
			fontWeight: 'bold'	
		}
	});
	var button1 = Ti.UI.createButton({
		title: 'Sensor',
		height: '50dp',
		width: '150dp',
		top: '15dp'
	});
	var button2 = Ti.UI.createButton({
		title: 'Client',
		height: '50dp',
		width: '150dp',
		top: '15dp'
	});
	
	button1.addEventListener('click', function(e) {
		require('sensor').createSensorWindow().open();
		win.close();
	});
	button2.addEventListener('click', function(e) {
		require('client').createClientWindow(ip, port).open();
		win.close();
	});
	
	view.add(label);
	view.add(button1);
	view.add(button2);
	win.add(view);
	
	return win;
};