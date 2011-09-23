exports.MainView = function() {
	var instance = Ti.UI.createView();
	
	var container = Ti.UI.createView({
		layout:'vertical'
	});
	instance.add(container);
	
	var tf = Ti.UI.createTextField({
		top:10,
		left:10,
		right:10,
		height:50,
		hintText:'Say what?',
		borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		returnKeyType:Ti.UI.RETURNKEY_DONE,
		font: {
			fontSize:24
		}
	});
	tf.addEventListener('return', function() {
		tf.blur();
	});
	container.add(tf);
	
	var send = Ti.UI.createButton({
		title:'WUPHF!',
		top:15,
		width:114,
		height:32,
		color:'#ffffff',
		backgroundImage:'images/button.png',
		backgroundSelectedImage:'images/button_down.png'
	});
	container.add(send);
	
	var status = Ti.UI.createLabel({
		top:10,
		color:'#787878',
		text:'Send a WUPHF.',
		font: {
			fontSize:10
		},
		textAlign:'center',
		height:'auto'
	});
	container.add(status);
	
	var powered = Ti.UI.createView({
		bottom:0,
		left:0,
		height:50,
		width:250
	});
	powered.add(Ti.UI.createImageView({
		image:'images/twilio.png',
		height:40,
		width:40,
		left:0,
		top:0
	}));
	powered.add(Ti.UI.createImageView({
		image:'images/titanium.png',
		height:40,
		width:40,
		left:15,
		bottom:0
	}));
	powered.add(Ti.UI.createLabel({
		text:'Powered by Hello World',
		color:'#787878',
		font:{
			fontSize:10
		},
		left:60
	}));
	instance.add(powered);
	
	// WUPHF MOTHER****ER!
	send.addEventListener('click', function() {
		var prefs = JSON.parse(Ti.App.Properties.getString('preferences')) || {};
		status.text = 'Sending WUPHF...';
		
		$T.makeOutgoingCall(
			'+16125680330',
			'+'+prefs.phone,
			'http://ti-wuphf.appspot.com/WUPHF?say='+escape(tf.value),
			{},
			function(response) {
				status.text = status.text+' call sent.'
			}, function(response) {
				alert('error');
			}
		);
		
		$T.sendSms(
			'+16125680330',
			'+'+prefs.phone,
			tf.value,
			null,
			function(response) {
				status.text = status.text+' SMS sent.'
			}, function(response) {
				alert('error');
			}
		);
	});
	
	return instance;
};
