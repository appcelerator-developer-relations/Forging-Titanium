//require the UI components necessary to drive the test
var NavigationController = require('NavigationController').NavigationController,
	TestWindow = require('TestWindow').TestWindow;

//create NavigationController which will drive our simple application
var controller = new NavigationController();

//open initial window
controller.open(new TestWindow(controller));