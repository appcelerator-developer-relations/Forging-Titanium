//insert global variables containing credentials
Ti.include('credentials.js');

//include Parse module
var parse = require('parse');

//create Parse Client
var client = new parse.Client(APPLICATION_ID,MASTER_KEY);

//create a JavaScript object
function Person(firstName, lastName, address) {
	this.firstName = firstName;
	this.lastName = lastName;
	this.address = address;
}

//create a person object
var kevin = new Person('Kevin', 'Whinnery', {
	street: '1337 Elite Drive',
	city: 'Saint Paul',
	state: 'MN',
	zip: 55102
});

//save a Person to the Parse back end
client.create({
	className: 'Person',
	object: kevin,
	success: function(response) {
		alert(JSON.stringify(response));
	},
	error: function(response,xhr) {
		alert('Error!');
	}
});
