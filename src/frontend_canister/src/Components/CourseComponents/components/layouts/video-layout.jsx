import './captions.css';
import './video-layout.css';
import React from 'react';
import { Captions, Controls, Gesture } from '@vidstack/react';

import * as Buttons from '../buttons';
// import * as Menus from '../menus';
import { Settings } from '../menus';
import Time from '../Time';
import Volume from '../Volume';
import { TimeGroup } from '../time-group';
import { Title } from '../title';

export default function VideoLayout({ thumbnails }) {
  return (
    <>
      <Gestures />
      <Captions
        className={`captions-heading media-preview:opacity-0 media-controls:bottom-[85px] media-captions:opacity-100 absolute inset-0 bottom-2 z-10 select-none break-words opacity-0 transition-[opacity,bottom] duration-300 `}
      />
      <Controls.Root
        className="controls-heading media-controls:opacity-100 absolute inset-0 z-10 flex h-full w-full flex-col bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity"
      >
        <div className="flex-1" />
        <Controls.Group className="flex w-full items-center px-2">
          <Time thumbnails={thumbnails} />
        </Controls.Group>
        <Controls.Group className="-mt-0.5 flex w-full items-center px-2 pb-2">
          <Buttons.Play tooltipPlacement="top start" />
          <Buttons.Mute tooltipPlacement="top" />
          <Volume />
          <TimeGroup />
          <Title />
          <div className="flex-1" />
          <Buttons.Caption tooltipPlacement="top" />
          <Settings placement="top end" tooltipPlacement="top" />
          <Buttons.PIP tooltipPlacement="top" />
          <Buttons.Fullscreen tooltipPlacement="top end" />
        </Controls.Group>
      </Controls.Root>
    </>
  );
}

function Gestures() {
  return (
    <>
      <Gesture
        className="absolute inset-0 z-0 block h-full w-full"
        event="pointerup"
        action="toggle:paused"
      />
      <Gesture
        className="absolute inset-0 z-0 block h-full w-full"
        event="dblpointerup"
        action="toggle:fullscreen"
      />
      <Gesture
        className="absolute left-0 top-0 z-10 block h-full w-1/5"
        event="dblpointerup"
        action="seek:-10"
      />
      <Gesture
        className="absolute right-0 top-0 z-10 block h-full w-1/5"
        event="dblpointerup"
        action="seek:10"
      />
    </>
  );
}
