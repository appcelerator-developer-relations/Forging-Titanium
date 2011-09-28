Hey everybody, and thanks for With the new Mac App Store, many Mac OS X developers are taking advantage of the frictionless distribution mechanism of the Mac App Store to distribute and monetize desktop applications.  In fact, some top Mac App Store apps have been written and distributed using Titanium!  In this multi-part series, we will explore the APIs and techniques necessary to build and distribute an application to the Mac App Store using Titanium Desktop.

Here in Titanium Studio, we have a freshly generated Titanium Desktop application.  In tiapp.xml, we have configured a high resolution, 512 by 512 pixel application icon that will be displayed in the dock, as well as when a user tabs through their currently active applications.  

Also in tiapp.xml, we can configure the initial HTML page we would like to display when our application is launched, that window's height and width, and other information about our application.

In the index.html file in our application's resources directory, we include some very simple HTML content that will be displayed in the window when the application is launched.  The more interesting APIs are contained in the script tag above, where we will populate some of the ancillary features of our desktop application that a Mac user would expect.

The first thing we notice is a call to set the badge for our application.  The badge text can only be six characters wide before it begins to get truncated.  We'll see how this renders in a moment when we run the app.

The next thing we'll do is set up a tray icon, which will show up on the Mac's menu bar while our application is running.

Next, we'll set up a menu of options we'd like to present to the user via the menu bar, tray icon, and dock.  Only one of these menu options will actually do anything, which is just to display a simple alert when it is chosen.

We'll add these items to the menu, and then share the same menu object in both the tray, application, and dock menus associated with our app.

When we launch our application, we initially see the simple h1 tag we used as the content of our application window.  When we start to tab through our Mac's currently running applications, we see that our six character badge text is being displayed there as we expect.  The bade text is present on the icon in the dock as well.

When we view the main menus for our application when it is in focus, we see the three menus that we defined earlier.  The third menu option actually has some functionality associated with it, so when we click the "run" label, our alert is displayed within our application window.

that same menu of functionality is available in the menu bar, using the tray object we defined in our JavaScript code earlier.

Much like the tray icon, we get the same list of menu options when we two-finger click or right click on the application icon in the dock.  In this way, we can make our application controllable from wherever it is convenient for the user.

In this episode, we explored some of the desktop APIs necessary to deliver a usable application on the Mac.  In our next episode, we will take a look at a full featured application that is ready to ship off to the Mac App Store as we step through the process of preparing your Mac app for distribution.  Thanks for watching, and code strong!


