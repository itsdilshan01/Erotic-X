import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { PlusIcon, HandThumbUpIcon, HandThumbDownIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import VideoPlayer from "../components/VideoPlayer"; // custom player component

// Dummy suggested videos
const suggestedVideos = Array.from({ length: 5 }, (_, i) => ({
  id: i,
  title: `Suggested Video ${i + 1}`,
  views: Math.floor(Math.random() * 10000),
  url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" // replace with secure sources
}));

export default function VideoPage({ theme }) {
  const location = useLocation();
  const { video } = location.state || {};
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [resolution, setResolution] = useState("720p");

  if (!video) return <div className="text-center mt-10">No video found!</div>;

  const handleAdd = () => toast.success("You added the video!");
  const handleLike = () => {
    setLiked(!liked);
    setDisliked(false);
    toast.info(liked ? "You unliked the video!" : "You liked the video!");
  };
  const handleDislike = () => {
    setDisliked(!disliked);
    setLiked(false);
    toast.info(disliked ? "You removed dislike!" : "You disliked the video!");
  };

  return (
    <div className={`flex flex-col md:flex-row min-h-screen ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>
      {/* Left Advertisement */}
      <aside className="hidden md:flex md:w-1/6 bg-gray-800 p-4 flex-col items-center space-y-4">
        <div className="h-64 w-full bg-gray-700 flex items-center justify-center">Advertisement</div>
        <div className="h-64 w-full bg-gray-700 flex items-center justify-center">Advertisement</div>
      </aside>

      {/* Main Video Content */}
      <main className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">{video.title}</h1>

        {/* Video Player with settings */}
        <div className="relative">
          <VideoPlayer 
            url={video.url} 
            speed={speed} 
            resolution={resolution} 
            theme={theme} 
          />

          {/* Settings Button */}
          <button
            onClick={() => setSettingsOpen(!settingsOpen)}
            className="absolute top-2 right-2 bg-gray-700 p-2 rounded-full hover:bg-gray-600"
          >
            <Cog6ToothIcon className="w-6 h-6 text-white" />
          </button>

          {/* Settings Menu */}
          {settingsOpen && (
            <div className="absolute top-12 right-2 bg-gray-800 text-white p-3 rounded shadow-lg z-50 space-y-2">
              <div>
                <label className="block mb-1">Speed:</label>
                <select
                  className="bg-gray-700 px-2 py-1 rounded"
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                >
                  {[0.5, 1, 1.25, 1.5, 2].map((s) => (
                    <option key={s} value={s}>{s}x</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1">Resolution:</label>
                <select
                  className="bg-gray-700 px-2 py-1 rounded"
                  value={resolution}
                  onChange={(e) => setResolution(e.target.value)}
                >
                  {["360p","480p","720p","1080p"].map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 mt-3">
          <button onClick={handleAdd} className="flex items-center space-x-1 bg-red-500 px-3 py-1 rounded">
            <PlusIcon className="w-5 h-5" />
            <span>Add</span>
          </button>
          <button
            onClick={handleLike}
            className={`flex items-center space-x-1 px-3 py-1 rounded ${liked ? "bg-green-600" : "bg-gray-700 hover:bg-green-600"}`}
          >
            <HandThumbUpIcon className="w-5 h-5" />
            <span>Like</span>
          </button>
          <button
            onClick={handleDislike}
            className={`flex items-center space-x-1 px-3 py-1 rounded ${disliked ? "bg-red-600" : "bg-gray-700 hover:bg-red-600"}`}
          >
            <HandThumbDownIcon className="w-5 h-5" />
            <span>Dislike</span>
          </button>
        </div>

        {/* Views / Added info */}
        <p className="mt-2 text-sm text-gray-400">{video.views} views • {video.added} added</p>

        {/* Suggested Videos */}
        <h2 className="text-xl font-semibold mt-8 mb-3">Suggested Videos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {suggestedVideos.map((s) => (
            <div key={s.id} className={`${theme === "dark" ? "bg-gray-800" : "bg-gray-200"} rounded overflow-hidden p-2`}>
              <div className="aspect-video bg-gray-700 flex items-center justify-center text-gray-400">Video Player</div>
              <p className="mt-2 text-sm">{s.title}</p>
              <p className="text-xs text-gray-400">{s.views} views</p>
            </div>
          ))}
        </div>
      </main>

      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </div>
  );
}
