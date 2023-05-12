<?php

// database

$connection = mysqli_connect('localhost', 'root', '', 'softeng');

if (!$connection) {
    die("Connection error: " . mysqli_connect_error());
}
