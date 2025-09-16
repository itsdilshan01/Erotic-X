import React from "react";

export default function VideoRow({ title, videos }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {videos.map((video, i) => (
          <div
            key={i}
            className="bg-gray-800 rounded-lg overflow-hidden shadow hover:scale-105 transform transition"
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-2">
              <h3 className="text-sm font-medium">{video.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
