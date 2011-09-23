# Episode 6: A Single Context Tab Group Template

In this week's episode, we'll be taking a look at how to implement a tab-based application in a single JavaScript context in Titanium Mobile.  Throughout our <a href="http://wiki.appcelerator.org">reference guides</a> and <a href="http://vimeopro.com/appcelerator/building-native-mobile-applications">official training course</a>, we generally advocate the use of a <a href="http://wiki.appcelerator.org/display/guides/The+Titanium+JavaScript+Environment#TheTitaniumJavaScriptEnvironment-ExecutionContexts">single JavaScript context</a> in your Titanium applications.  

However, in our most popular demo application, the <a href="http://github.com/appcelerator/Kitchen Sink">Titanium Mobile Kitchen Sink</a>, a tab-based application is developed using multiple contexts by associating each window opened with a URL to a JavaScript file.  While this approach is technically valid, it presents the developer with difficulties around sharing data between windows, confusion around when code for a window has been executed, possible object reference issues which can lead to memory leaks, and reloading of JavaScript code in every window for shared libraries.  For those reasons, unless you have a specific need for a "clean slate" in every window, using multiple JavaScript contexts cannot be considered a best practice approach to structuring a Titanium Mobile application.

What then would be a reasonable approach to structuring windows in a tabbed application?  And how do we work around the loss of Ti.UI.currentTab and friends?  Find out the answer in this week's episode of Forging Titanium.

Episode Resources:

<ul>
	<li><a href="http://wiki.appcelerator.org/display/guides/The+Titanium+JavaScript+Environment#TheTitaniumJavaScriptEnvironment-ExecutionContexts">The Titanium JavaScript environment</a></li>
	<li><a href="http://github.com/appcelerator/KitchenSink">Titanium Mobile Kitchen Sink</a></li>
	<li><a href="https://github.com/appcelerator-developer-relations/Forging-Titanium">Forging Titanium GitHub repository (source)</a></li>
</ul>