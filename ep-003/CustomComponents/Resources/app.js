var ui = require('ui');

var win = ui.window({
	backgroundColor:'white'
});

var ratingView = new ui.RatingView(3.5, 6);
ratingView.top = 10;
ratingView.left = 30;

win.add(ratingView);

ratingView.addEventListener('ratingChanged', function(e) {
	alert(e.currentValue);
});

var btn = ui.button({
	top:80,
	left:5,
	title:'set to 3.245',
	height:40,
	width:100
}, function() {
	ratingView.changeRating(3.245);
});
win.add(btn);

win.open();