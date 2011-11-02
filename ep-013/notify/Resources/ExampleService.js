var NOTIFICATION_PROPERTY = 'notificationCount';

// Get the Service and Service Intent we created in app.js
var service = Ti.Android.currentService;
var serviceIntent = service.getIntent();
var serviceMessage = serviceIntent.hasExtra('message') ? serviceIntent.getStringExtra('message') : 'you have a notification!';

// If this is an interval Intent, don't execute the code the first time.
// Execute it after the first interval runs. We use Ti.App.Properties
// To keep track of this.
if (serviceIntent.hasExtra('interval') && !Ti.App.Properties.hasProperty('notificationCount')) {
	Ti.App.Properties.setInt(NOTIFICATION_PROPERTY, 0);
} else {
	if (Ti.App.Properties.hasProperty(NOTIFICATION_PROPERTY)) {
		Ti.App.Properties.removeProperty(NOTIFICATION_PROPERTY);
	}
	
	var activity = Ti.Android.currentActivity();
    var intent = Ti.Android.createIntent({
        action : Ti.Android.ACTION_MAIN,
        // you can use className or url to launch the app
        // className and packageName can be found by looking in the build folder
        // for example, mine looked like this
        // build/android/gen/com/appcelerator/notify/NotifyActivity.java
        // className : 'com.appcelerator.notify.NotifyActivity',
 
        // if you use url, you need to make some changes to your tiapp.xml
        url : 'app.js',
        flags : Ti.Android.FLAG_ACTIVITY_RESET_TASK_IF_NEEDED | Ti.Android.FLAG_ACTIVITY_SINGLE_TOP
    });
    intent.addCategory(Titanium.Android.CATEGORY_LAUNCHER);
 
    // Create the pending intent that will launch our app when selected
    var pending = Ti.Android.createPendingIntent({
        activity : activity,
        intent : intent,
        type : Ti.Android.PENDING_INTENT_FOR_ACTIVITY,
        flags : Ti.Android.FLAG_ACTIVITY_NO_HISTORY
    });
 
 	// Create the notification
    var notification = Ti.Android.createNotification({
        contentIntent : pending,
        contentTitle : 'Notify',
        contentText : serviceMessage,
        tickerText : serviceMessage,
        // "when" will only put the timestamp on the notification and nothing else.
        // Setting it does not show the notification in the future
        when : new Date().getTime(),
        icon : Ti.App.Android.R.drawable.appicon,
        flags : Titanium.Android.ACTION_DEFAULT | Titanium.Android.FLAG_AUTO_CANCEL | Titanium.Android.FLAG_SHOW_LIGHTS
    });
    Ti.Android.NotificationManager.notify(1, notification);
    
    // Kill the service intent once it launches our notification.
    // You can skip this step if you want notifications to be constantly 
    // sent at the given interval.
    Ti.Android.stopService(serviceIntent);
}
