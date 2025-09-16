import React, { useRef, useEffect } from "react";

export default function VideoPlayer({ url, speed, resolution, theme }) {
  const videoRef = useRef();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  }, [speed]);

  return (
    <div className="relative">
      <video
        ref={videoRef}
        src={url} // replace with secure source in production
        controls
        className="w-full h-[500px] rounded-lg bg-black"
        onContextMenu={(e) => e.preventDefault()} // disables right-click
        controlsList="nodownload nofullscreen noremoteplayback"
      >
        Your browser does not support HTML5 video.
      </video>
    </div>
  );
}
