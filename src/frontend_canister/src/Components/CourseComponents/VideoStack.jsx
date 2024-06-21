import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import './media.css';
import { useAuth } from '../utils/useAuthClient';
import VideoLayout from './components/layouts/video-layout';

export default function VideoStack({ videoBucket, videoProfile, currVidId, courseId, setWatchedVideos }) {
  const playerRef = useRef(null);
  const { contentActor } = useAuth();

  const videoSrc = {
    type: "video",
    sources: [
      {
        src: `https://storage.googleapis.com/${videoBucket}/${videoProfile}`,
      }
    ]
  };

  const onProviderChange = (provider) => {
    if (isHLSProvider(provider)) {
      provider.config = {};
    }
  };

  const onCanPlay = () => {
    // Custom logic for when the video can play
  };

  const handleWatchedVideos = (result) => {
    let newVideoData = new Set();
    let currVid = result;
    let flag = true;

    while (flag) {
      let vid = currVid[0][0];
      newVideoData.add(vid);
      if (currVid[0][1].length > 0 && currVid[0][1] !== undefined) {
        currVid = currVid[0][1];
      } else {
        flag = false;
      }
    }
    setWatchedVideos(newVideoData);
  };

  const handleEnded = async () => {
    const cols = document.getElementsByClassName('sticky');
    const cols2 = document.getElementsByClassName('fullscreenClass');
    
    await contentActor.videotracking(courseId, currVidId);
    const result = await contentActor.getwatchedvideo(courseId);
    handleWatchedVideos(result);
    // Custom logic for exiting fullscreen (if needed)
    for (let i = 0; i < cols.length; i++) {
      cols[i].style.zIndex = ''; // Resetting the zIndex, change as per your requirement
    }
    for (let i = 0; i < cols2.length; i++) {
      cols2[i].style.display = 'block';
    }
  };

  const onFullscreenChange = (isFullscreen, nativeEvent) => {
    const requestEvent = nativeEvent.request;
    console.log('Fullscreen change:', { isFullscreen, requestEvent });
  
    const cols = document.getElementsByClassName('sticky');
    const cols2 = document.getElementsByClassName('fullscreenClass');
    
    
    if (isFullscreen) {
      // Custom logic for entering fullscreen
      for (let i = 0; i < cols.length; i++) {
        cols[i].style.zIndex = 0;
      }
      for (let i = 0; i < cols2.length; i++) {
        cols2[i].style.display = 'none';
      }
    } else {
      // Custom logic for exiting fullscreen (if needed)
      for (let i = 0; i < cols.length; i++) {
        cols[i].style.zIndex = ''; // Resetting the zIndex, change as per your requirement
      }
      for (let i = 0; i < cols2.length; i++) {
        cols2[i].style.display = 'block';
      }
    }
  };
  

  const onFullscreenError = (error, nativeEvent) => {
    const requestEvent = nativeEvent.request;
    console.error('Fullscreen error:', { error, requestEvent });
  };

  useEffect(() => {
    const player = new Plyr(playerRef.current, {
      controls: [
        'rewind',
        'play',
        'fast-forward',
        'progress',
        'current-time',
        'duration',
        'mute',
        'volume',
        'settings',
        'fullscreen',
      ],
      i18n: {
        restart: 'Restart',
        rewind: 'Rewind {seektime}s',
        play: 'Play',
        pause: 'Pause',
        fastForward: 'Forward {seektime}s',
        seek: 'Seek',
        seekLabel: '{currentTime} of {duration}',
        played: 'Played',
        buffered: 'Buffered',
        currentTime: 'Current time',
        duration: 'Duration',
        volume: 'Volume',
        mute: 'Mute',
        unmute: 'Unmute',
        enableCaptions: 'Enable captions',
        disableCaptions: 'Disable captions',
        download: 'Download',
        enterFullscreen: 'Enter fullscreen',
        exitFullscreen: 'Exit fullscreen',
        frameTitle: 'Player for {title}',
        captions: 'Captions',
        settings: 'Settings',
        menuBack: 'Go back to previous menu',
        speed: 'Speed',
        normal: 'Normal',
        quality: 'Quality',
        loop: 'Loop',
      },
    });

    player.source = videoSrc;

    player.on('ended', handleEnded);
    player.on('enterfullscreen', (event) => onFullscreenChange(true, event));
    player.on('exitfullscreen', (event) => onFullscreenChange(false, event));
    player.on('error', (event) => onFullscreenError(event.detail.plyr, event));

    return () => {
      player.destroy();
    };
  }, [videoSrc, handleEnded]);

  return (
    <div>
      <video ref={playerRef} className='js-plyr plyr' data-poster="/https://storage.googleapis.com/ioc-data/1920images.png/to/poster.jpg" style={{position:"absolute",zIndex:"99999"}} />
    </div>
  );
}

VideoStack.propTypes = {
  videoBucket: PropTypes.string.isRequired,
  videoProfile: PropTypes.string.isRequired,
  currVidId: PropTypes.string.isRequired,
  courseId: PropTypes.string.isRequired,
  setWatchedVideos: PropTypes.func.isRequired,
};
