<?php
$servername = "localhost";
$username = "root";
$password = "admin";
$dbname = "map_notes_db";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $lat = $_POST['lat'];
  $lng = $_POST['lng'];
  $title = $_POST['title'];
  $description = $_POST['description'];

  $sql = "INSERT INTO locations (latitude, longitude, title, description) VALUES ($lat, $lng, '$title', '$description')";
  if ($conn->query($sql) === TRUE) {
    echo "New marker created successfully";
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }
} else {
  $sql = "SELECT * FROM locations";
  $result = $conn->query($sql);
  $locations = array();
  if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
      $locations[] = array(
        "lat" => $row["latitude"],
        "lng" => $row["longitude"],
        "title" => $row["title"],
        "description" => $row["description"] // Include description in the response
      );
    }
  }

  header("Content-type: application/json");
  echo json_encode($locations);
}

$conn->close();
?>
