<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Database set up
$servername = "ns8037.hostgator.com";
$username = "vluna_projects";
$password = "projects";
$dbname = "vluna_fruit_jedy";

// Create a connection
$conn = mysqli_connect($servername, $username, $password) or die("Could not connect to database");
mysqli_select_db($conn, $dbname) or die("Could not select database");

// Select the events from the query
$result = mysqli_query($conn, "SELECT * FROM AccelerometerValues");

$outp[] = array();

// Assign the values of the database to the array
while($row = mysqli_fetch_assoc($result)) {
    $outp[] = $row;
}   

echo json_encode($outp); // Convert output to json

$conn->close(); // Close connection
?>