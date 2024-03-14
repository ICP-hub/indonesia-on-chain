import { VolumeSlider } from '@vidstack/react';
import React from 'react';

export default function Volume() {
  return (
    <VolumeSlider.Root className="volume-slider group relative mx-[7.5px] inline-flex h-10 w-full max-w-[80px] cursor-pointer touch-none select-none items-center outline-none aria-hidden:hidden">
      <VolumeSlider.Track className="relative ring-media-focus z-0 h-[5px] w-full rounded-sm bg-white/30 group-data-[focus]:ring-[3px]">
        <VolumeSlider.TrackFill className="bg-media-brand absolute h-full w-[var(--slider-fill)] rounded-sm will-change-[width]" />
      </VolumeSlider.Track>

      <VolumeSlider.Preview
        className="flex flex-col items-center opacity-0 transition-opacity duration-200 data-[visible]:opacity-100 pointer-events-none"
        noClamp
      >
        <VolumeSlider.Value className="rounded-sm bg-black px-2 py-px text-[13px] font-medium" />
      </VolumeSlider.Preview>
      <VolumeSlider.Thumb className="absolute left-[var(--slider-fill)] top-1/2 z-20 h-[15px] w-[15px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#cacaca] bg-white opacity-0 ring-white/40 transition-opacity group-data-[active]:opacity-100 group-data-[dragging]:ring-4 will-change-[left]" />
    </VolumeSlider.Root>
  );
}

