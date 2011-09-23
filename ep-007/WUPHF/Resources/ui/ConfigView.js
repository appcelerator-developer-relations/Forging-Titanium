exports.ConfigView = function(args) {
	var instance = Ti.UI.createView({
		layout:'vertical'
	});
	
	var initialPreferences = JSON.parse(Ti.App.Properties.getString('preferences','{}'));
	
	var phoneField = Ti.UI.createTextField({
		top:10,
		left:10,
		right:10,
		height:50,
		hintText:'Phone',
		value:initialPreferences.phone||'',
		borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		returnKeyType:Ti.UI.RETURNKEY_DONE,
		font: {
			fontSize:24
		}
	});
	instance.add(phoneField);
	
	var emailField = Ti.UI.createTextField({
		top:10,
		left:10,
		right:10,
		height:50,
		hintText:'E-Mail',
		value:initialPreferences.email||'',
		keyboardType:Ti.UI.KEYBOARD_EMAIL,
		borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		returnKeyType:Ti.UI.RETURNKEY_DONE,
		font: {
			fontSize:24
		}
	});
	instance.add(emailField);
	
	function writePreferences() {
		Ti.App.Properties.setString('preferences', JSON.stringify({
			phone:phoneField.value,
			email:emailField.value
		}));
	}
	phoneField.addEventListener('change', writePreferences);
	emailField.addEventListener('change', writePreferences);
	
	return instance;
};
