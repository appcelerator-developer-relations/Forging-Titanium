# Full Text of Screencast Voiceover

Hi everybody, and thanks for checking out this screencast. In this week's episode, we'll be taking a look at Parse, a new service which allows developers to quickly and easily set up persistent back end data services for their application.  This is particularly useful for mobile applications that aren't terribly concerned with back end business logic, like games or utility applications.

While Parse is still in beta and has a few kinks that need to be worked out, it's definitely a project worth tracking, and is super easy to use in Titanium.  Let's take a look at how this works.

When you create an application with parse, you'll be given an Application ID and master key which you use to authenticate your application.  I've included these in an external JavaScript file which will create global variables in the root application context containing the application ID and master key I will use for this example.

Next, I will include my implementation of a simple Parse Client.  Parse has recently released a RESTful web service interface to their back end data services, which is incredibly easy to work with in Titanium.  My Client implementation uses the HTTPClient API and HTTP Basic Authentication to communicate with Parse.  To use the client, you will pass in an Application ID and a Master key to the parse client constructor.

Our next order of business is to create a JavaScript object which we will persist to our Parse back end.  For this example, we will be creating a Person object, which will have a string first name, a string last name, and an object containing a hash of values that represent a mailing address.

Let's first create an instance of the person object which we can save to the back end - we'll give it a first name, last name, and several properties for a mailing address.

Now that we have some data we'd like to save, let's use the Parse client to persist it remotely.  The Parse REST API has many functions, but in this simple client interface, I have only implemented the core Create/Read/Update/and Delete functions.

To save an object using Parse, you'll need to specify a "class name" for the object - this can be anything you'd like, but for simplicity's sake you'd probably want to give it the same name as your JavaScript object.

You'll also need to pass in the actual object you'd like to save.  This can be any JSON-serializable object, but in this case we'll use the person object we created previously.

For all Parse client calls, you can specify both a success and an error callback function - if our initial request is completed successfully, we will display an alert dialog containing the JSON response we got back from the Parse server.  We'll also save the unique object ID of the Person object we just saved, so we can access it later.  Let's run the application and see how it goes.

When the application launches in the iOS simulator, we can see that it's accessing the Parse servers over the network.  When the request completes, we see a simple alert dialogue which contains the response we got back from the server.

To ensure that our object was saved successfully, we can use another feature of Parse's web site interface, which is the data browser.  This page will allow you to see all the classes and objects you've created with Parse.  As you can see, we now have an object of type Person stored in the cloud, with the address, first name, and last name information we told it to save.

To retrieve data that we've previously saved, we can use the get function of the Parse client.  For this function, we'll still pass in the className property we used before, but instead of an object to save, we'll pass in the object ID of the Person object we just saved.  When the request completes, we'll alert the value that we get back from the server, which has all of the attributes on it of the person object we just created.

When we run the application in the iOS simulator, we can see that our object has been retrieved successfully.

Now that we have successfully persisted an object, let's say that we'd like to update that same object on the server.  Maybe we want to update the address of our person object to also contain the country of residence for that person.  Because the data APIs for Parse are schema-less, you can add attributes to the objects you save in any way you'd like, and new data fields will be added to the object persisted by Parse on the server without any database changes or migrations necessary.

To use the update function on the client, we pass in the class name and object ID along with the new version of the object we'd like to save.  

In our success callback, we'll alert the response we get back from the server, which should just contain information about when the object was updated.  When we run the application in the simulator, we can see that the object has been updated successfully.

To satisfy ourselves that the object has indeed been updated, let's retrieve it from the server one more time, and use specific attributes of the object we get back.  We will switch our client call to a get request, and alert the name of the person, followed by the country they live in.

When the application is run in the simulator, we see that our object has indeed been updated with the country attribute we specified on the address object earlier.

When it comes time to delete the object, we use the remove function on the Parse client to delete an object with the given ID.  We'll alert the response we get back, but if the call was successful, we can expect the response to be empty.

When we run the application on the simulator, the success function is called, alerting an empty JavaScript object.

We can confirm that the object has been deleted by returning to the Parse data browser.  When we refresh the page, we can see that our Person class no longer has saved objects in it.

The Parse APIs are capable of much more than we have shown in this screencast.  They have support for querying saved objects, push notifications, and relational data models that all look to be shaping up nicely.  And thanks to their REST API, their service is easy to test and work with in almost any programming environment.  

It will be interesting to see how the Parse service continues to evolve, but it's showing a great deal of promise as a back-end solution for mobile developers that want to focus on the client side logic of their application.  Thanks for watching, and code strong!