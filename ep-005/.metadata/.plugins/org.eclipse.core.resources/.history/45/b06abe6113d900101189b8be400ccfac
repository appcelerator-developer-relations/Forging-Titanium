//Public client interface
function Client(applicationId, masterKey) {
	this.applicationId = applicationId;
	this.masterKey = masterKey;
}
exports.Client = Client;

//Parse API endpoint
var ENDPOINT = 'https://api.parse.com/1/classes/';

/*
 * Make an authenticated client request.  Argument hash:
 * 
 * url: url endpoint to hit
 * method: HTTP method to use
 * payload (optional): A JavaScript object to JSON-serialize (PUT/POST only)
 * success (optional): a function to be called on a successful request
 * error (optional): a function to be called on a server error
 */
Client.prototype.request = function(args) {
	var xhr = Ti.Network.createHTTPClient(),
		that = this;
		
	xhr.onload = function() {
		var response = JSON.parse(this.responseText);
		(args.success) ? args.success(response) : Ti.API.debug('Parse Client: Request Successful');
	};
	xhr.onerror = function() {
		var response = JSON.parse(this.responseText);
		(args.error) ? args.error(response,this) : Ti.API.error('Parse Client: Request Failed: '+args.url);
	};
	
	xhr.open(args.method,ENDPOINT+args.url);
	var authString = Base64.encode(that.applicationId+':'+that.masterKey);
	xhr.setRequestHeader('Authorization', 'Basic '+authString);
	xhr.setRequestHeader('Content-Type','application/json');
	
	if (args.method === 'PUT' || args.method === 'POST') {
		xhr.send(JSON.stringify(args.payload));
	}
	else {
		xhr.send('');
	}
};

/*
 * Create a Parse object.  Argument hash:
 * 
 * className: string name of the Parse class
 * object: The object to save
 * success: function to call on success
 * error: function to call on error
 * 
 */
Client.prototype.create = function(args) {
	this.request({
		url:args.className,
		method:'POST',
		payload:args.object,
		success:args.success,
		error:args.error
	});
};

/*
 * Get a Parse object.  Argument hash:
 * 
 * className: string name of the Parse class
 * objectId: The object ID of the object you're getting
 * success: function to call on success
 * error: function to call on error
 * 
 */
Client.prototype.get = function(args) {
	this.request({
		url:args.className+'/'+args.objectId,
		method:'GET',
		success:args.success,
		error:args.error
	});
};

/*
 * Update a Parse object.  Argument hash:
 * 
 * className: string name of the Parse class
 * objectId: The object ID of the object you're getting
 * object: the fields on the object you would like to update
 * success: function to call on success
 * error: function to call on error
 * 
 */
Client.prototype.update = function(args) {
	this.request({
		url:args.className+'/'+args.objectId,
		method:'PUT',
		payload:args.object,
		success:args.success,
		error:args.error
	});
};

/*
 * Delete a Parse object.  Argument hash:
 * 
 * className: string name of the Parse class
 * objectId: The object ID of the object you're deleting
 * success: function to call on success
 * error: function to call on error
 * 
 */
Client.prototype.remove = function(args) {
	this.request({
		url:args.className+'/'+args.objectId,
		method:'DELETE',
		success:args.success,
		error:args.error
	});
};

//a non-jacked base 64 encode implementation
var Base64 = {
	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

	// public method for encoding
	encode : function (input) {
	    var output = "";
	    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
	    var i = 0;
	
	    input = Base64._utf8_encode(input);
	
	    while (i < input.length) {
	
	        chr1 = input.charCodeAt(i++);
	        chr2 = input.charCodeAt(i++);
	        chr3 = input.charCodeAt(i++);
	
	        enc1 = chr1 >> 2;
	        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
	        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
	        enc4 = chr3 & 63;
	
	        if (isNaN(chr2)) {
	            enc3 = enc4 = 64;
	        } else if (isNaN(chr3)) {
	            enc4 = 64;
	        }
	
	        output = output +
	        Base64._keyStr.charAt(enc1) + Base64._keyStr.charAt(enc2) +
	        Base64._keyStr.charAt(enc3) + Base64._keyStr.charAt(enc4);
	
	    }
	
	    return output;
	},
	
	// public method for decoding
	decode : function (input) {
	    var output = "";
	    var chr1, chr2, chr3;
	    var enc1, enc2, enc3, enc4;
	    var i = 0;
	
	    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
	
	    while (i < input.length) {
	
	        enc1 = Base64._keyStr.indexOf(input.charAt(i++));
	        enc2 = Base64._keyStr.indexOf(input.charAt(i++));
	        enc3 = Base64._keyStr.indexOf(input.charAt(i++));
	        enc4 = Base64._keyStr.indexOf(input.charAt(i++));
	
	        chr1 = (enc1 << 2) | (enc2 >> 4);
	        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
	        chr3 = ((enc3 & 3) << 6) | enc4;
	
	        output = output + String.fromCharCode(chr1);
	
	        if (enc3 != 64) {
	            output = output + String.fromCharCode(chr2);
	        }
	        if (enc4 != 64) {
	            output = output + String.fromCharCode(chr3);
	        }
	
	    }
	
	    output = Base64._utf8_decode(output);
	
	    return output;
	
	},
	
	// private method for UTF-8 encoding
	_utf8_encode : function (string) {
	    string = string.replace(/\r\n/g,"\n");
	    var utftext = "";
	
	    for (var n = 0; n < string.length; n++) {
	
	        var c = string.charCodeAt(n);
	
	        if (c < 128) {
	            utftext += String.fromCharCode(c);
	        }
	        else if((c > 127) && (c < 2048)) {
	            utftext += String.fromCharCode((c >> 6) | 192);
	            utftext += String.fromCharCode((c & 63) | 128);
	        }
	        else {
	            utftext += String.fromCharCode((c >> 12) | 224);
	            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
	            utftext += String.fromCharCode((c & 63) | 128);
	        }
	
	    }
	
	    return utftext;
	},
	
	// private method for UTF-8 decoding
	_utf8_decode : function (utftext) {
	    var string = "";
	    var i = 0;
	    var c = c1 = c2 = 0;
	
	    while ( i < utftext.length ) {
	
	        c = utftext.charCodeAt(i);
	
	        if (c < 128) {
	            string += String.fromCharCode(c);
	            i++;
	        }
	        else if((c > 191) && (c < 224)) {
	            c2 = utftext.charCodeAt(i+1);
	            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
	            i += 2;
	        }
	        else {
	            c2 = utftext.charCodeAt(i+1);
	            c3 = utftext.charCodeAt(i+2);
	            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
	            i += 3;
	        }
	
	    }
	    return string;
	}
};