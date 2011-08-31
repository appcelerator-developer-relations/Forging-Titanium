var UtilityWindow = require('ui/UtilityWindow').UtilityWindow,
	SettingsView = require('ui/SettingsView').SettingsView,
	MainView = require('ui/MainView').MainView;

new UtilityWindow(new MainView(), new SettingsView()).open();
