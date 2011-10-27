var isAndroid = Ti.Platform.osname === 'android';
Ti.UI.backgroundColor = '#222';

// Include Date.js via CommonJS require()
require('date');

// Suggestions for date values to test
suggestions = [
	'today',        
	'tomorrow',     
	'yesterday',   
	'July 2008',
	'next friday',
	'last april',
	'2004.08.07',
	'6/4/2005',
	'8:15 PM',
	'22:30:45',
	'+5years',
	'-10 months'
];

// Create UI components
var win = Ti.UI.createWindow();
var headerView = Ti.UI.createView({
	height: '40dp',
	backgroundColor: '#800',
	top: 0
});
var headerLabel = Ti.UI.createLabel({
	text: 'Date.js Formatter',
	height: '40dp',
	color: '#eee',
	font: {
		fontSize: '24dp',
		fontWeight: 'bold'	
	},
	textAlign: 'center',
	shadowColor: '#000',
	shadowOffset: {
		x: 0,
		y: 1	
	}
});

// Text input and instructions
var container = Ti.UI.createView({
	top: '80dp',
	height: 'auto',
	width: '80%',
	layout: 'vertical'
});
var instructLabel = Ti.UI.createLabel({
	text: 'Enter a date to format...',
	height: 'auto',
	width: 'auto',
	color: '#eee'
});
var dateText = Ti.UI.createTextField({
	height: '40dp',
	width: '100%',
	value: 'today',
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});
var label = Ti.UI.createLabel({
	text: '(no date entered)',
	color: '#eee',
	font: {
		fontSize: '18dp',
		fontWeight: 'bold'	
	},
	top: '10dp',
	height: 'auto',
	width: 'auto',
	textAlign: 'center'
});

// Create a Picker full of suggested date values
var suggestionContainer = Ti.UI.createView({
	height: isAndroid ? '100dp' : 'auto',
	layout: 'vertical',
	bottom: 0
});
var suggestionLabel = Ti.UI.createLabel({
	text: 'or try these values',
	color: '#eee',
	height: 'auto',
	width: 'auto'
});
var picker = Ti.UI.createPicker({
	height: isAndroid ? 'auto' : '216dp',
	width: isAndroid ? '80%' : '100%',
	selectionIndicator: true
});
var data = [];
for (var i = 0; i < suggestions.length; i++) {
	data.push(Ti.UI.createPickerRow({ title: suggestions[i] }));
}
picker.add(data);
picker.addEventListener('change', function(e) {
	dateText.value = e.row.title;
	if (!isAndroid) {
		dateText.fireEvent('change');	
	}
});

// Handle text changes
dateText.addEventListener('change', function(e) {
	var val = dateText.value;
	if (val.length > 0) {
		var date = Date.parse(val);
		if (date !== null) {
			label.text = date.toString('dddd, MMMM dd, yyyy h:mm:ss tt');
		} else {
			label.text = '(date invalid)';
		}	
	}
});

// Build view hierarchy
suggestionContainer.add(suggestionLabel);
suggestionContainer.add(picker);
headerView.add(headerLabel);
container.add(instructLabel);
container.add(dateText);
container.add(label);
win.add(headerView);
win.add(container);
win.add(suggestionContainer);

win.open();

// Initiate the first date format
dateText.fireEvent('change');