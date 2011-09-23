Hi everybody, and thanks for checking out this screencast.  In this week's episode, we'll be taking a look at <a href="http://twilio.com">Twilio</a>, a cloud-based service for adding telephony features to web, mobile, or desktop applications.  Using Twilio, developers can send and receive phone calls and SMS text messages, enabling the creation of interfaces that pass beyond the reach of smart phones.

Using Twilio's REST API, we can easily integrate these powerful telephone features into native applications built with Titanium Mobile.  To demonstrate this, we will be implementing a social networking application first conceived of on an episode of The Office.  The WUPHF.com service was invented to send text messages, phone calls, instant messages, e-mails, faxes, tweets, and Facebook messages to a person all at once.  For the purposes of demonstration, let's stick to the first two, and implement the means to WUPHF! at one of our friends via SMS and telephone.

The WUPHF application has been developed for iPhone and Android devices, and looks largely the same across platforms.  To send a WUPHF, we must first configure a phone number for our intended target.  When WUPHFed at, this phone number will receive both a text message with the value we give it, as well as a phone call where the specified text will be read back to the user with a computerized voice.

When we click the WUPHF button, we initiate a pair of web service requests to Twilio's back end, which will result in a text message and phone call sent to my Android phone, which is displayed on the left using Android Screencast.  As the web service calls complete, we can see that the label underneath the WUPHF button is updated, and that my phone is being assaulted on multiple fronts by the WUPHF I just sent.

The same functionality works great on the Android platform as well.  Here in the Android emulator, we can navigate the embedded Titanium ScrollableView to enter a phone number to WUPHF at, and then send the WUPHF to my Android phone in the same way as before.

In a few moments, the Twilio web service calls are complete, and my phone is lit up with new text messages and phone calls from the Twilio back end.

Integrating with these Twilio services is very easy, and can be accomplished in pure JavaScript using our HTTPClient API and a port of the node-twilio client maintained by Steven Walters.

Looking in app.js, there's very little logic contained within it, as usual.  As we did in last week's screencast, we are employing my CommonJS require monkey patch, which adds a few little bits of sugar to the built in global require function.

We also require a file that will place our Application SID and Auth Token into the global scope.  These values are obtainable when you sign up for a developer account on the Twilio web site.

Next, we require the top-level Twilio module, which contains all Twilio-related JavaScript code.  Once the Twilio module is included, we create a new instance of the Twilio REST client, as implemented originally in the node-twilio module.  This client object will allow us to make authenticated requests to the Twilio back end.

Once our global configuration and setup is done, we create a new custom UI object, a parasitic subclass of Ti.UI.Window, and open it up to initialize the interface.  Most of the Twilio specific code, however, is in the MainView object, which is included as a part of a ScrollableView in the Application window.

When a user enters their phone number into the text fields provided, the WUPHF application will store it in an application property as a JSON string, so that it can be read out on subsequent application launches and when changes are made.

Next, we use the Twilio Rest Client to place a phone call to the number provided by the user.  We provide a "From" phone number, which is a local number I registered with Twilio.  We also specify the "To" phone number, which was entered by the user.  The third argument is a URL to a remote server I set up to dynamically generate TwiML, which is an XML markup format that tells Twilio how to behave when placing a phone call.  I pass the string of text I need to be read back for the WUPHF as a parameter on this URL.

then, I specify a success and an error callback to update the user interface when a reply is received from the server.

The API to send an SMS text message is very similar, except that I can directly pass in the text I would like to be sent to the user.  As before, I have success and error callbacks I can specify to update the UI when the requests are complete.

Recently, Twilio also announced an SDK for integrating voice over IP communication into native iOS applications.  We are working on a native extension to our platform that will enable Titanium applications to take advantage of this functionality soon.  But today, you have access to the full range of powerful REST APIs that Twilio provides to integrate rich telephony services into your mobile application.  Thank you very much for watching, and code strong!