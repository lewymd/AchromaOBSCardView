const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

// Serve static files from the "public" directory
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Read the config file
const config = require('./config.json');

// Store the selected image filename
let selectedImage = config.fallbackImage;
let timerId;

// Change the selected image
const changeImage = (filename) => {
  // Assuming the images are stored in the "public/images" directory
  const imagePath = path.join(__dirname, 'public/images', filename);

  // Update the selected image filename
  selectedImage = filename;

  // Reset the timer
  clearTimeout(timerId);
  timerId = setTimeout(() => {
    selectedImage = config.fallbackImage;
  }, config.timeout); // Set timer to revert to initial image after the specified timeout

  // Copy the selected image file to currentfile.png
  const sourcePath = path.join(__dirname, 'public/images', selectedImage);
  const destinationPath = path.join(__dirname, 'public/images', 'currentfile.png');
  fs.copyFileSync(sourcePath, destinationPath);

  console.log(`Image changed to: ${selectedImage}`);
};

// Handle GET requests to change the image
app.get('/image/:filename', (req, res) => {
  const { filename } = req.params;
  changeImage(filename);
  res.sendStatus(200);
});

// Serve the selected image
app.get('/image', (req, res) => {
  // Assuming the images are stored in the "public/images" directory
  const imagePath = path.join(__dirname, 'public/images', selectedImage);
  res.sendFile(imagePath);
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
  console.log('Visit http://localhost:3000/CardSearch.html or send a GET request to change the image')
});
