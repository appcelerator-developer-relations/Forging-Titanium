# Episode 4: A Utility Application Template

In Episode 2, we took a look at a framework for displaying a stack of windows in a cross-platform navigation controller.  This week, we'll be taking a look at implementing a simple two-stage utility application, while isolating our cross-platform navigation code to a single component.

This week we will be building upon our technique of creating custom components, while adding in an important API for creating component-oriented applications: Application-level events.  By firing and listening for custom events, we can ensure that components in our system do not need to have knowledge of how other components behave - they just need to know how to indicate to the rest of the application that an important event has happened.

Find out how use this technique to create a two-stage utility application in this week's episode of Forging Titanium.

Episode Resources:

<ul>
<li><a href="http://developer.appcelerator.com/apidoc/mobile/1.7.1/Titanium.App-module">Custom events API in the Ti.App namespace</a></li>
<li><a href="http://developer.android.com/reference/android/R.drawable.html">Listing of built-in Android UI assets</a></li>
<li><a href="https://github.com/appcelerator-developer-relations/Forging-Titanium">Forging Titanium GitHub repository (source)</a></li>
</ul>