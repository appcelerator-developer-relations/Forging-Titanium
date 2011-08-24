# Episode 3: Custom Components

In last week's episode, we created a cross-platform Navigation Controller as a custom component we could use to organize windows in a Titanium application.  This week, we will be taking a deeper look at how to extend core Titanium objects and create our own custom UI components.

In order to accomplish this, we will be using a technique popularized by JavaScript luminary <a href="http://crockford.com">Douglas Crockford</a>, which is called parasitic inheritance.  <a href="http://www.crockford.com/javascript/inheritance.html">Parasitic inheritance</a> takes advantage of the malleable nature of JavaScript objects, allowing a developer to create an instance of a given type, modify it with additional properties, and return it as a new type of object.

This is a very powerful technique in JavaScript applications generally, but is even more useful and powerful when dealing with JavaScript proxy objects in Titanium.  We can use factory functions in the Ti.UI namespace to create base UI components, and then extend those components with new features and functionality we define ourselves.

Find out how use this technique to create a custom ratings widget in this week's episode of Forging Titanium.

Episode Resources:

<ul>
<li><a href="http://www.crockford.com/javascript/inheritance.html">Douglas Crockford on inheritance in JavaScript</a></li>
<li><a href="http://wefunction.com/2008/07/function-free-icon-set/
">Icon set used for star widgets</a></li>
<li><a href="https://github.com/appcelerator-developer-relations/Forging-Titanium">Forging Titanium GitHub repository</a></li>
</ul>