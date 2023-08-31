<?php
// Connect to your database
$servername = "localhost";
$username = "root";
$password = "admin";
$dbname = "map_notes_db";

// Connect to the database
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Check if POST data exists
if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $lat = $_POST['lat'];
  $lng = $_POST['lng'];
  $title = $_POST['title'];
  $description = $_POST['description'];

  // Insert the new location into the database
  $sql = "INSERT INTO locations (latitude, longitude, title, description) VALUES ($lat, $lng, '$title', '$description')";
  if ($conn->query($sql) === TRUE) {
    echo "New marker created successfully";
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }
}

$conn->close();
?>
