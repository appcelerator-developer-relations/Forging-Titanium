var createObjectFromBuffer = function(buffer) {
	var obj = {};
	var props = ['azimuth', 'pitch', 'roll', 'calibrate'];
	var size = 4;
	var pos = 0;
	
	for (var i = 0; i < props.length; i++) {
		obj[props[i]] = Ti.Codec.decodeNumber({
			source: buffer,
			position: pos,
			type: Ti.Codec.TYPE_FLOAT,
			byteOrder: Ti.Codec.BIG_ENDIAN	
		});	
		pos += size;
	}
	
	return obj;
};

var handleConnection = function(e) {
	var socket = e.source ? e.source : e.socket;
	
	// start read loop
	var readBuffer = Ti.createBuffer({length:32});
	var callback = function(e) {
		var data = createObjectFromBuffer(readBuffer);
        Ti.App.fireEvent('app:updateRotation', data);
        readBuffer.clear(); 
        Ti.Stream.read(socket, readBuffer, callback);
	};
	Ti.Stream.read(socket, readBuffer, callback);
};

var handleError = function(e) {
	Ti.API.error("Socket <" + e.socket + "> encountered error when connecting");
    Ti.API.error(" error code <" + e.errorCode + ">");
    Ti.API.error(" error description <" + e.error + ">");
};

var connect = function(ip, port) {
	var connectSocket = Ti.Network.Socket.createTCP({
	    host: ip,
	    port: port,
	    connected: handleConnection,
	    error: handleError
	});
	connectSocket.connect();
};

exports.createClientWindow = function(ip, port) {
	var win = Ti.UI.createWindow({
		backgroundColor: '#eee',
		fullscreen: false,
		exitOnClose: true
	});
	win.orientationModes = [Ti.UI.PORTRAIT];
	var webview = Ti.UI.createWebView({
		url: 'web/index.html',
		height: Ti.Platform.displayCaps.platformWidth,
		width: Ti.Platform.displayCaps.platformWidth
	});
	win.add(webview);
	
	connect(ip, port);

	return win;
};
