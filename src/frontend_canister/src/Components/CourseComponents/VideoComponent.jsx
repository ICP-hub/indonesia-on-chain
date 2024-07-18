import React from 'react';
import ReactPlayer from 'react-player';

export default function VideoComponent({ videoUrl }) {
  return (
    <div className="video-wrapper rounded-lg overflow-hidden">
      <ReactPlayer
        url={videoUrl}
        controls={true}
        width="100%"
        height="550px"
      />
    </div>
  );
}