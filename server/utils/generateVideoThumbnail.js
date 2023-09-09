const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');

// Path to the input video file
const inputVideoPath = 'input-video.mp4';

// Path to the output thumbnail image
const outputThumbnailPath = 'thumbnail.jpg';

// Time (in seconds) where you want to capture the thumbnail
const thumbnailTime = 5; // Change this to your desired time

ffmpeg(inputVideoPath)
  .seekInput(thumbnailTime) // Set the time to capture the thumbnail (in seconds)
  .frames(1) // Capture only 1 frame (thumbnail)
  .on('end', () => {
    console.log(`Thumbnail generated: ${outputThumbnailPath}`);
  })
  .on('error', (err) => {
    console.error('Error generating thumbnail:', err);
  })
  .save(outputThumbnailPath);
