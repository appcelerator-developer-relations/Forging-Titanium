var SENSOR_IP_ADDRESS = '192.168.98.104';
var SENSOR_PORT = 40404;
var isAndroid = Ti.Platform.osname === 'android';
var win, sensor, alertDialog;

if (isAndroid) {
	alertDialog = Ti.UI.createAlertDialog({
		title: 'Choose',
		message: 'Want to be a sensor or client?',
		buttonNames: ['Sensor', 'Client']
	});
	alertDialog.addEventListener('click', function(e) {
		if (e.index === 0) { 
			sensor = require('sensor');
			win = sensor.createSensorWindow(SENSOR_PORT);
			win.open();
			sensor.listen(SENSOR_PORT);	
		} else {
			require('client').createClientWindow(SENSOR_IP_ADDRESS, SENSOR_PORT).open();
		}
	});
	alertDialog.show();
} else {
	require('client').createClientWindow(SENSOR_IP_ADDRESS, SENSOR_PORT).open();	
}