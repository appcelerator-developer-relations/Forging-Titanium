var SENSOR_IP_ADDRESS = '192.168.98.106';
var SENSOR_PORT = 40404;
var isAndroid = Ti.Platform.osname === 'android';
var win, sensor;

if (isAndroid) {
	var choice
	sensor = require('sensor');
	win = sensor.createSensorWindow();
	win.open();
	sensor.listen(SENSOR_PORT);
	 
	//require('choice').createChoiceWindow(SENSOR_IP_ADDRESS, SENSOR_PORT).open();
} else {
	require('client').createClientWindow(SENSOR_IP_ADDRESS, SENSOR_PORT).open();	
}