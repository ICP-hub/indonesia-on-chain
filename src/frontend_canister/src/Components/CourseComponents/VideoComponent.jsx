import React from 'react';
import ReactPlayer from 'react-player';

export default function VideoComponent({ videoUrl }) {
  return (
    <div className="video-wrapper rounded-lg overflow-hidden">
      <ReactPlayer
        url="https://www.youtube.com/watch?v=DLZD47lj82o&list=RDDLZD47lj82o&start_radio=1"
        controls={true}
        width="100%"
        height="550px"
      />
    </div>
  );
}