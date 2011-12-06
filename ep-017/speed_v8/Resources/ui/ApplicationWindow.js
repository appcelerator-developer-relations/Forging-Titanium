var HEADER_HEIGHT = 40;
var FOOTER_HEIGHT = 80;

var progress, jsonLabel, createLabel, scrollLabel, tv;

exports.ApplicationWindow = function() {
	var win = Ti.UI.createWindow({
		backgroundColor: '#ddd',
		fullscreen: false,
		exitOnClose: true
	});
	var performanceView = Ti.UI.createView({
		top: 0,
		bottom: 0,
		left: 0,
		right: 0
	});
	
	// Create header and buttons
	var header = Ti.UI.createView({
		backgroundColor: '#fff',
		height: HEADER_HEIGHT,
		top: 0,
		borderWidth: 2,
		borderColor: '#222'
	});
	var create100Button = Ti.UI.createButton({
		top: 4, 
		left: 5, 
		height: HEADER_HEIGHT-5,
		title: "create 100 rows",
		rowCount: 100
	});
	var create1000Button = Ti.UI.createButton({
		top: 4, 
		right: 5, 
		height: HEADER_HEIGHT-5,
		title: "create 1000 rows",
		rowCount: 1000
	});
	
	// Create table for displaying JSON data
	tv = Ti.UI.createTableView({
		top: HEADER_HEIGHT,
		bottom: FOOTER_HEIGHT,
		separatorColor: '#222'
	});
	
	// Create footer with performance info
	var footer = Ti.UI.createView({
		backgroundColor: '#fff',
		height: FOOTER_HEIGHT,
		bottom: 0,
		borderWidth: 2,
		borderColor: '#222'
	});
	progress = Ti.UI.createProgressBar({
		min: 0, 
		max: 1000, 
		value: 0,
		top: -10, 
		width: 250, 
		height: 30
	});
	jsonLabel = Ti.UI.createLabel({
		text: "JSON\n???",
		textAlign: 'center',
		color: '#222',
		font: { 
			fontSize: 24,
			fontWeight: 'bold' 
		},
		top: 21,
		left: 0, 
		width: "33%"
	});
	createLabel = Ti.UI.createLabel({
		text: "ROWS\n???",
		textAlign: 'center',
		color: '#222',
		font: { 
			fontSize: 24,
			fontWeight: 'bold' 
		},
		top: 21,
		left: "33%", 
		width: "33%"
	});
	scrollLabel = Ti.UI.createLabel({
		text: "SCROLL\n???",
		textAlign: 'center',
		color: '#222',
		font: { 
			fontSize: 24,
			fontWeight: 'bold' 
		},
		top: 21,
		left: "66%", 
		width: "33%"
	});
	
	// Add event listeners and assemble view hierarchy
	create100Button.addEventListener("click", createRows);
	create1000Button.addEventListener("click", createRows);
	
	header.add(create100Button);
	header.add(create1000Button);
	footer.add(progress);
	footer.add(jsonLabel);
	footer.add(createLabel);
	footer.add(scrollLabel);
	performanceView.add(header);
	performanceView.add(tv);
	performanceView.add(footer);
	
	// create a scrollableview
	var TestView = require('ui/TestView').TestView;
	var scrollableView = Ti.UI.createScrollableView({
		views: [
			performanceView, 
			new TestView(),
			new TestView(),
			new TestView(),
			new TestView()
		],
		showPagingControl: true
	});
	win.add(scrollableView);
	
	return win;
};

var createRows = function(e) {
	var count = e.source.rowCount;
	var dataFile = Ti.Filesystem.getFile("app://data.json");
	var kbSize = (dataFile.getSize() / 1024).toFixed(1);
	var dataText = dataFile.read().toString();
	progress.max = count;

	var start = new Date().getTime();
	var rowData = JSON.parse(dataText);
	var duration = new Date().getTime() - start;
	jsonLabel.text = "JSON\n" + duration + "ms";

	var data = [];
	start = new Date().getTime();
	for (var c = 0; c < count; c++) {
		data[c] = createTestRow(c, rowData[c].deeply.nested.object.name);
	}
	tv.data = data;

	duration = new Date().getTime() - start;
	var each = duration / count;

	createLabel.text = "ROWS\n" + duration + "ms"; 

	var eventStart = null;
	var totalEvents = 0;
	var firstReading = true;

	tv.addEventListener("scroll", function(e) {
		if (firstReading) {
			firstReading = false;
			return;	
		}
		
		if (eventStart == null) {
			eventStart = new Date().getTime();
		} else {
			++totalEvents;
			var totalTime = (new Date().getTime() - eventStart);
			var average = totalTime / totalEvents;
			scrollLabel.text = "SCROLL\n" + average.toFixed(1) + "ms";
		}
		progress.value = e.firstVisibleItem + e.visibleItemCount;
	});
}

var createTestRow = function(index, title) {
	var row = Ti.UI.createTableViewRow({ 
		className: "testrow",
		hasChild: true,
		height: 54,
		touchEnabled: false
	});
	var image = Ti.UI.createImageView({
		image: '/images/' + (index % 2 === 0 ? 'image0.jpg' : 'image1.png'),
		height: 48,
		width: 48,
		top: 3,
		left: 3
	});
	var title = Ti.UI.createLabel({ 
		text: title, 
		color: '#222',
		font: {
			fontSize: 24,
			fontWeight: 'bold'	
		},
		top: 3,
		left: 58
	});
	var subtitle = Ti.UI.createLabel({ 
		text: 'a subtitle for the row', 
		color: '#222',
		font: {
			fontSize: 14,
			fontWeight: 'normal'	
		},
		top: 32,
		left: 62
	});
	
	row.add(image);
	row.add(title);
	row.add(subtitle);
	
	return row;
};