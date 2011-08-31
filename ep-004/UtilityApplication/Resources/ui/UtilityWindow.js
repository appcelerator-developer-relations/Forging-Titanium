exports.UtilityWindow = function(mainView, settingsView) {
	var instance = Ti.UI.createWindow({
		backgroundColor: '#fff',
		navBarHidden: true,
		exitOnClose: true,
		//Android specific, iOS will ignore
		activity: {
			onCreateOptionsMenu: function(e) {
				var menu = e.menu;
				var settingsButton = menu.add({
					title: 'Settings'
				});
				settingsButton.setIcon(Ti.Android.R.drawable.ic_menu_preferences);
				settingsButton.addEventListener('click', function(e) {
					//show the settings view in an Android-specific way
					var settings = Ti.UI.createWindow({
						title:'Settings',
						navBarHidden:false
					});
					settings.add(settingsView);
					
					// listen for app-level event requesting to close the settings view
					Ti.App.addEventListener('app:dismiss.settings', function() {
						settings.close();
					});
					
					settings.open();
				});
			}
		}
	});

	//on iOS, overlay the info icon/system button and set up view transition
	if(Ti.Platform.osname === 'iphone') {
		var container = Ti.UI.createView();
		container.add(settingsView);
		container.add(mainView);
		
		var btn = Ti.UI.createButton({
			backgroundImage:'images/info.png',
			height:19,
			width:19,
			bottom:8,
			right:8
		});
		btn.addEventListener('click', function() {
			container.animate({
				view:settingsView,
				transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
			});
		});
		instance.add(container);
		mainView.add(btn);
		
		// listen for app-level event requesting to close the settings view
		Ti.App.addEventListener('app:dismiss.settings', function() {
			container.animate({
				view:mainView,
				transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
			});
		});
	}
	else {
		//add the main application view
		instance.add(mainView);
	}

	return instance;
};
