
DROP DATABASE IF EXISTS map_notes_db;
CREATE DATABASE map_notes_db;
USE map_notes_db;

CREATE TABLE locations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(255) DEFAULT NULL
);

INSERT INTO locations (latitude, longitude, title, description) VALUES
    (53.41874, -7.90476, 'Sample Marker 1', 'This is a sample marker.'),
    (53.41909, -7.90334, 'Sample Marker 2', 'Another sample marker.');
