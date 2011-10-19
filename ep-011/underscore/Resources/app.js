Ti.UI.backgroundColor = '#222';

// Create a reference to the underscore.js module
var _ = require('underscore')._;

var json = [
	{ id:1, available:false, value:'vodka', quantity:1 },
	{ id:2, available:true, value:'WINE', quantity:13 },
	{ id:2, available:true, value:'WINE', quantity:13 },
	{ id:3, available:true, value:'gin', quantity:42 },
	{ id:4, available:true, value:'scotch', quantity:21 },
	{ id:5, available:true, value:'WHISKEY', quantity:123 },
	{ id:100, available:true, value:'schnapps', quantity:5 },
	{ id:120, available:false, value:'beer', quantity:0 },
	{ id:2, available:true, value:'WINE', quantity:13 },
	{ id:999, available:true, value:'rum', quantity:55 },
	{ id:1, available:false, value:'Vodka', quantity:1 },
	{ id:13, available:true, value:'brandy', quantity:3 },
	{ id:42, available:true, value:'Tequila', quantity:88 }
];

// UI properties for table rows
var rowProperties = {
	height: '60dp',
	color: '#222',
	font: {
		fontSize: '24dp',
		fontWeight: 'bold'
	},
	backgroundColor: '#eee',
	hasChild: false,
	hasDetail: false,
	hasCheck: false
};

// Label properties for table header and footer
var labelProperties = {
	height: '40dp',
	color: '#eee',
	backgroundColor: '#222',
	font: {
		fontSize: '18dp',
		fontWeight: 'bold'	
	}
};

// Take the raw JSON array and format in the following manner:
// - Make the objects unique by id
// - Remove any objects where available != true
// - Capitalize the first letter of value
// - Sort the objects by value alphabetically
var rowValues = _(json).chain()
	.uniq(false, function(obj) { return obj.id; })
	.select(function(obj) { return obj.available; })
	.map(function(obj) { 
		obj.value = obj.value.charAt(0).toUpperCase() + obj.value.substring(1).toLowerCase();
		return obj; 
	})
	.sortBy(function(obj) { return obj.value; })
	.value();
	
// Get the sum total of all quantities in the formatted array
var totalAvailable = _(rowValues).reduce(function(memo, obj) { return memo + obj.quantity }, 0);

// Create a TableViewRow for each formatted JSON object
var rows = [];
_(rowValues).each(function(obj) {
	var row = Ti.UI.createTableViewRow(rowProperties);
	row.title = _.template('<%= value %> (<%= quantity %>)')(obj);
	rows.push(row);
});

// Create the app UI
var win = Ti.UI.createWindow();
var tableview = Ti.UI.createTableView({
	data: rows,
	separatorColor: '#222',
	headerView: _.extend(Ti.UI.createLabel({ text: '  Alcohol Selection'}), labelProperties),
	footerView: _.extend(Ti.UI.createLabel({ text: '  Total Available: ' + totalAvailable}), labelProperties)
});
win.add(tableview);
win.open();