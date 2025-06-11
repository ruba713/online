import React from 'react';

function VideoPlayer({ videoName }) {
  return (
    <video width="100%" controls>
      <source src={`http://localhost:5000/api/videos/${videoName}`} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}

export default VideoPlayer;
