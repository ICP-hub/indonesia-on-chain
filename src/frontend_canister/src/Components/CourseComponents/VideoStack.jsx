import React, { useEffect, useRef, useState } from 'react';
import {
  isHLSProvider,
  MediaPlayer,
  MediaProvider,
  Poster,
  Track,
} from '@vidstack/react';
import VideoLayout from './components/layouts/video-layout';
import { textTracks } from './tracks';
import './media.css';

export default function VideoStack() {
  const [blobUrl, setBlobUrl] = useState(null);
  const player = useRef(null);

  useEffect(() => {
    async function fetchVideoAndConvertToBlob() {
      try {
        const response = await fetch(
          'https://stream.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/low.mp4'
        );
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setBlobUrl(url);
      } catch (error) {
        console.error('Error fetching or converting video:', error);
      }
    }

    fetchVideoAndConvertToBlob();
  }, []);

  useEffect(() => {
    // Cleanup function to revoke the blob URL when component unmounts
    return () => {
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, [blobUrl]);

  function onProviderChange(provider, nativeEvent) {
    if (isHLSProvider(provider)) {
      provider.config = {};
    }
  }

  function onCanPlay(detail, nativeEvent) {
    // ...
  }

  // Conditionally render the MediaPlayer component
  return blobUrl ? (
    <MediaPlayer
      className="w-full aspect-video bg-slate-900 text-white font-sans overflow-hidden rounded-md ring-media-focus data-[focus]:ring-4 media-player-width"
      title="Sprite Fight"
      src={{ src: blobUrl, type: 'video/mp4' }}
      crossorigin
      playsinline
      onProviderChange={onProviderChange}
      onCanPlay={onCanPlay}
      ref={player}
    >
      <MediaProvider>
        <Poster
          className="absolute inset-0 block h-full w-full rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 object-cover"
          src="https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/thumbnail.webp?time=268&width=1200"
          alt="Girl walks into campfire with gnomes surrounding her friend ready for their next meal!"
        />
        {textTracks.map((track) => (
          <Track {...track} key={track.src} />
        ))}
      </MediaProvider>
      <VideoLayout thumbnails="https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/storyboard.vtt" />
    </MediaPlayer>
  ) : null;
}
