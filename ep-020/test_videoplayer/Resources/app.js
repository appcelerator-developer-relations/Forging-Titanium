var win = Ti.UI.createWindow({
	backgroundColor: '#fff',
	fullscreen: false,
	exitOnClose: true
});
var videoPlayer = Ti.Media.createVideoPlayer({
	url:'vids/appc.mp4',
    //movieControlStyle: Titanium.Media.VIDEO_CONTROL_EMBEDDED,
    //width: 200,
    //height: 200	
});

win.add(videoPlayer);
win.open();