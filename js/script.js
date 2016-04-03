var x, y;
var widthCenter = window.innerWidth/2;
var heightCenter = window.innerHeight/2;

setInterval(function(){
	// $.ajax({                                      
	// 	url: 'http://www.victorluna.ca/fruit-jedy/index.php',             
 //      	data: "",                
 //      	dataType: 'json',      
 //      	success: function(d) {
 //        	data = d[1];      
 //      	} 
 //    });

	      $.ajax({
  url: 'data.json',
  data: "",
  cache: false,
  dataType: 'json',
  success: function(data) {
		  // Parse JSON string into object
		    //var jsonData = JSON.parse(response);
		    x = (data.x * 100) + widthCenter;
		    y = data.y * 100;
		    //console.log(data.x);
		}
		 });
	// var x = data.x + widthCenter;
	// var y = (data.y * 100) + heightCenter;
	// var mouseX, mouseY, 
	var limitX = window.innerWidth, limitY = window.innerHeight;
	//$(window).mousemove(function(e){

	mouseX = Math.min(x, limitX);
	mouseY = Math.min(y, limitY);

	//});

	// cache the selector
	var follower = $(".plasma");
	//var xp = 0, yp = 0;
	//var loop = setInterval(function(){
	    // change 12 to alter damping higher is slower
	    // xp += (mouseX - xp) / 12;
	    // yp += (mouseY - yp) / 12;
	    follower.css({left:mouseX, top:mouseY});
	//}, 1);
}, 1);

function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'data.json', true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {

            // .open will NOT return a value but simply returns undefined in async mode so use a callback
            callback(xobj.responseText);

        }
    }
    xobj.send(null);

}

// setInterval(function() {
//     $.getJSON('data.json', function(data) {
//         console.log("ultimo" + data.x);

//     });
// }, 100);


