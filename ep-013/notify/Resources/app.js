var createNotificationViaService = function(message, interval) {
	var intent = Ti.Android.createServiceIntent({
        url : 'ExampleService.js'
    });
    intent.putExtra('message', message || 'You have a notification!');
    if (interval) {
    	intent.putExtra('interval', interval);
    }
    Ti.Android.startService(intent);
};

var win = Ti.UI.createWindow({
	backgroundColor: '#222',
	layout: 'vertical'
});
var button = Ti.UI.createButton({
	title: 'Immediate Notification',
	height: '50dp',
	width: '200dp',
	top: '50dp'
});
button.addEventListener('click', function(e) {
	createNotificationViaService('Fired immediate notification!');
});

var button2 = Ti.UI.createButton({
	title: 'Pending Notification (4 sec)',
	height: '50dp',
	width: '200dp',
	top: '15dp'
});
button2.addEventListener('click', function(e) {
	var now = new Date().getTime()
    var delta = new Date( now + (4 * 1000) );
    createNotificationViaService('Fired pending notification!', delta - now);
});

var gpsLabel = Ti.UI.createLabel({
	text: '(No GPS Data)',
	color: '#fff',
	font: {
		fontSize: '20dp',
		fontWeight: 'normal'	
	},
	top: '30dp'
});

Ti.Gesture.addEventListener('orientationchange', function(e) {
	createNotificationViaService('Orientation changed!');
});

//Ti.Geolocation.getCurrentPosition(function(e) {});
if (Ti.Geolocation.locationServicesEnabled) {
    Ti.Geolocation.addEventListener('location', function(e) {
        if (!e.error) {
        	var gps = 'latitude: ' + e.coords.latitude + '\nlongitude: ' + e.coords.longitude;
        	gpsLabel.text = gps;
        	createNotificationViaService(gps);
        }
    });
} 

win.add(button);
win.add(button2);
win.add(gpsLabel);
win.open();