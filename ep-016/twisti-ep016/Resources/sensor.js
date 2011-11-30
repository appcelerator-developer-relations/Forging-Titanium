var clients = [];
var currentOrientation = undefined;

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

var createOrientationBuffer = function(data) {
	var tmpArray = [data.azimuth, data.pitch, data.roll, data.calibrate];
	var buffer = Ti.createBuffer({ length:32 });
	var pos = 0;
	
	for (var i = 0; i < tmpArray.length; i++) {
		pos = Ti.Codec.encodeNumber({
			source: tmpArray[i],
			dest: buffer, 
			position: pos,
			type: Ti.Codec.TYPE_FLOAT,
			byteOrder: Ti.Codec.BIG_ENDIAN
		});
	}
	
	return buffer;
};

var updateClients = function() {
	if (currentOrientation !== undefined) {
		var buffer = createOrientationBuffer(currentOrientation);
		var len = clients.length;
		for (var i = 0; i < len; i++) {
			try {
				clients[i].write(buffer);	
			} catch (e) {
				// log exception
				Ti.API.error(e);
				
				// close socket if still open
				if (clients[i] && 
					(clients[i].state === Ti.Network.Socket.CONNECTED ||
					 clients[i].state === Ti.Network.Socket.LISTENING)) {
					clients[i].close();
				}
				
				// mark for garbage collection and remove from clients array
				clients[i] = null;
				clients.splice(i,1);
				i--;
				len--;
			}
		}
	}
};

exports.listen = function(port) {
	var listenSocket = Ti.Network.Socket.createTCP({
	    port: port,
	    accepted: function(e) {
	    		clients.push(e.inbound);
	    		e.socket.accept({});
	    },
	    error: function(e) {
	        Ti.API.error("Socket <" + e.socket + "> encountered error when listening");
	        Ti.API.error(" error code <" + e.errorCode + ">");
	        Ti.API.error(" error description <" + e.error + ">");
	    }
	});
	
	// Make sure we can listen on the desired port
	try {
		listenSocket.listen(); 
	} catch (e) {
		Ti.API.error('Couldn\'t listen on port ' + port);
		return false;
	}
	listenSocket.accept({});
};

exports.createSensorWindow = function(port) {
	var needsCalibration = false;
	var i = 0;
	
	var win = Ti.UI.createWindow({
		backgroundColor: '#eee',
		layout: 'vertical',
		fullscreen: false,
		exitOnClose: true
	});
	win.orientationModes = [Ti.UI.PORTRAIT];
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
	var serverLabel = Ti.UI.createLabel({
		text: 'Listening at:\n\n' + Ti.Platform.address + ':' + port,
		color: '#222',
		textAlign: 'center',
		font: {
			fontSize: '20dp',
			fontWeight: 'bold'	
		},
		height: 'auto',
		width: 'auto',
		top: '50dp'
	});
	
	var values = [ 'azimuth', 'pitch', 'roll', 'x', 'y', 'z' ];
	var labels = [];
	for (i = 0; i < values.length; i++) {
		var label = createPositionDataLabel(values[i]);
		labels.push(label);
		win.add(label);
	}
	toolbar.add(button);
	win.add(toolbar);
	win.add(serverLabel);
	
	var twisti = require('ti.twisti');
	twisti.addEventListener('update', function(e) {
		currentOrientation = {
			azimuth: e.azimuth,
			pitch: e.pitch,
			roll: e.roll,
			calibrate: needsCalibration ? 1 : 0
		};
		updateClients();
		needsCalibration = false;
		for (i = 0; i < labels.length; i++) {
			labels[i].updatePositionData(e[values[i]]);	
		}
	});
	
	return win;
};