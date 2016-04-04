// Dependencies
var five = require("johnny-five");
var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');
var path = require("path");

var board = new five.Board(); // Connect to arduino board

// Sensors
var accelerometer;

// Outputs
var acc_output;

// Start on local server
app.listen(8000);

function handler (req, res) {
    fs.readFile(__dirname + '/index.html', function (err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading index.html');
        }

        res.writeHead(200);
        res.end(data);
    });
}

// Set up the board
board.on("ready", function() {
    accelerometer = new five.Accelerometer({
        controller: "ADXL345"
    });
});

// Connect to server
io.sockets.on('connection', function (socket) {
    // When board is ready
    if(board.isReady) {
        // When accelerometer values change
        accelerometer.on("change", function() {

        // Accelerometer output
        acc_output = { x: this.x,
                       y: this.y,
                       z: this.z,
                       pitch: this.pitch,
                       roll: this.roll,
                       inclination: this.inclination,
                       orientation: this.orientation,
                       acceleration: this.acceleration
                     }

            // Debug
            // console.log(acc_output); 
            // console.log("Sending...");    
            socket.emit('news', acc_output); // Send information to client
        });
    }
});
