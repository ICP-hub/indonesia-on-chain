import React, { useRef, useEffect } from 'react';
import {
  isHLSProvider,
  MediaPlayer,
  MediaProvider,
  Poster,
} from '@vidstack/react';
import VideoLayout from './components/layouts/video-layout';
import './media.css';
import { useAuth } from '../utils/useAuthClient';

export default function VideoStack({ videoBucket, videoProfile, currVidId, courseId, setWatchedVideos }) {
  const player = useRef(null);
  const { contentActor } = useAuth();

  function onProviderChange(provider) {
    if (isHLSProvider(provider)) {
      provider.config = {};
    }
  }

  function onCanPlay() {
    // ...
  }

  const HandleWatchedVideos = (result) => {
    let newVideoData = new Set();
    let CurrVid = result;
    let flag = true;

    while (flag) {
      let Vid = CurrVid[0][0];
      newVideoData.add(Vid);
      if (CurrVid[0][1].length > 0 && CurrVid[0][1] !== undefined) {
        CurrVid = CurrVid[0][1];
      } else {
        flag = false;
      }
    }
    setWatchedVideos(newVideoData);
  };

  const HandleEnded = async () => {
    await contentActor.videotracking(courseId, currVidId);
    const result = await contentActor.getwatchedvideo(courseId);
    HandleWatchedVideos(result);
  };

  function onFullscreenChange(isFullscreen, nativeEvent) {
    const requestEvent = nativeEvent.request;
    console.log('Fullscreen change:', { isFullscreen, requestEvent });
  }

  function onFullscreenError(error, nativeEvent) {
    const requestEvent = nativeEvent.request;
    console.error('Fullscreen error:', { error, requestEvent });
  }

  // Check the ref usage
  useEffect(() => {
    if (player.current) {
      console.log('Player ref:', player.current);
    } else {
      console.error('Player ref is null');
    }
  }, []);

  return (
    <div>
      <MediaPlayer
        className="w-full aspect-video bg-slate-900 text-white font-sans overflow-hidden rounded-md ring-media-focus data-[focus]:ring-4 media-player-width"
        title="Sprite Fight"
        src={{ src: `https://storage.googleapis.com/${videoBucket}/${videoProfile}`, type: 'video/mp4' }}
        crossorigin
        playsinline
        onProviderChange={onProviderChange}
        onCanPlay={onCanPlay} 
        ref={player}
        onEnded={HandleEnded}
        onFullscreenChange={onFullscreenChange}
        onFullscreenError={onFullscreenError}
        fullscreenOrientation="landscape"
      >
        <MediaProvider>
          <Poster
            className="absolute inset-0 block h-full w-full rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 object-cover"
            src="https://storage.googleapis.com/ioc-data/1920images.png"
            alt="Indonesia On Chain"
          />
        </MediaProvider>
        <VideoLayout thumbnails="https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/storyboard.vtt" />
      </MediaPlayer>
    </div>
  );
}
