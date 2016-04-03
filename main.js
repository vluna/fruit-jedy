// Dependencies
var five = require("johnny-five");
var mysql = require('mysql');

var jsonfile = require('jsonfile')
var util = require('util')
 
var file = 'data.json'
jsonfile.readFile(file, function(err, obj) {
  console.dir(obj.id)
})

var board = new five.Board(); // Connect to arduino board

var xCord;
var yCord;
// Database information
var connection_mysql = mysql.createConnection({
    host: 'ns8037.hostgator.com',
    user: 'vluna_projects',
    password: 'projects',
    database: 'vluna_fruit_jedy'
});

connection_mysql.connect(); // Connect to database
board.on("ready", function() {
  var accelerometer = new five.Accelerometer({
    controller: "ADXL345"
  });


  accelerometer.on("change", function() {
    // connection_mysql.query('UPDATE AccelerometerValues SET x = ?, y = ?, z = ?, pitch = ?, roll = ?, acceleration = ?, inclination = ?, orientation = ? Where ID = 1', [(this.x*100), this.y, this.z, this.pitch, this.roll, this.acceleration, this.inclination, this.orientation], function (err, result) {
    // if (err) throw err;
    // });


    var obj = { id: "1",
                x: this.x,
                y: this.y,
                z:"1",
                pitch:"1",
                roll:"1",
                inclination:"1",
                orientation:"1",
                acceleration:"1"
              }
    jsonfile.writeFileSync(file, obj);

    jsonfile.readFile(file, function(err, obj) {
      console.dir(obj)
    })

  
    // console.log("accelerometer");
    // console.log("  x            : ", this.x);
    // console.log("  y            : ", this.y);
    // console.log("  z            : ", this.z);
    // console.log("  pitch        : ", this.pitch);
    // console.log("  roll         : ", this.roll);
    // console.log("  acceleration : ", this.acceleration);
    // console.log("  inclination  : ", this.inclination);
    // console.log("  orientation  : ", this.orientation);
    // console.log("--------------------------------------");
  });
});