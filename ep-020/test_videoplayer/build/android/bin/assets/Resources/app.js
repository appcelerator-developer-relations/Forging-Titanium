var win = Ti.UI.createWindow({
	backgroundColor: '#000',
	fullscreen: false,
	exitOnClose: true
});

// Create basic header
var header = Ti.UI.createView({
	top: 0,
	left: 0,
	height: 40,
	backgroundColor: '#800'
});
var headerTitle = Ti.UI.createLabel({
	text: 'Dunk Fail',
	color: '#fff',
	font: {
		fontSize: 24,
		fontWeight: 'bold'	
	},
	height: 'auto',
	width: 'auto'
});
header.add(headerTitle);

// Create content with VideoPlayer view and lorem ipsum text
var content = Ti.UI.createView({
    top: 40,
	bottom: 0,
	left: 0,
	right: 0,
	backgroundColor: '#fff'
});
var videoPlayer = Ti.Media.createVideoPlayer({
	url:'movie.mp4',
	mediaControlStyle: Ti.Media.VIDEO_CONTROL_EMBEDDED,
    top: 5,
    left: 5,
    right: 5,
    height: 200,
    autoplay: true,
    backgroundColor: '#000'
});
var loremIpsum = Ti.UI.createLabel({
	text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
	top: 220,
	left: 15,
	right: 10,
	color: '#333',
	font: {
		fontSize: 12	
	},
	height: 'auto'
});
content.add(videoPlayer);
content.add(loremIpsum);

// Create basic footer
var footer = Ti.UI.createView({
	bottom: 0,
	height: 30,
	left: 0,
	backgroundColor: '#800'
});

// Construct view hierarchy
win.add(header);
win.add(content);
win.add(footer);

win.open();
