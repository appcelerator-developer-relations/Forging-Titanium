require('lib/require').monkeypatch(this);
require('lib/credentials').set(this);

//create a globally accessible Twilio client interface
var Twilio = require('lib/Twilio');
var $T = new Twilio.RestClient(APPLICATION_SID,AUTH_TOKEN);

//initialize app UI
var AppWindow = require('ui/AppWindow');
new AppWindow().open();
