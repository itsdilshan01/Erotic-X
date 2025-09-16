import React, { useState } from "react";
import { FaTelegramPlane, FaEnvelope } from "react-icons/fa";
import { PlusIcon, StarIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import 'react-toastify/dist/ReactToastify.css';

export default function Home({ brandName, theme, user }) {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Amateur", "Desi", "Spam-cam", "Village", "GangBang", "Brazzers", "High-School"];

  // Dummy video data with category
  const videoRows = Array.from({ length: 3 }, (_, rowIndex) =>
    Array.from({ length: 5 }, (_, i) => ({
      id: `${rowIndex}-${i}`,
      title: `Video ${rowIndex * 5 + i + 1}`,
      views: Math.floor(Math.random() * 10000),
      added: Math.floor(Math.random() * 500),
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      premium: false,
      category: categories[(i + rowIndex) % categories.length],
    }))
  );

  const premiumRows = Array.from({ length: 2 }, (_, rowIndex) =>
    Array.from({ length: 5 }, (_, i) => ({
      id: `p-${rowIndex}-${i}`,
      title: `Premium Video ${rowIndex * 5 + i + 1}`,
      views: Math.floor(Math.random() * 10000),
      added: Math.floor(Math.random() * 500),
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      premium: true,
      category: categories[(i + rowIndex) % categories.length],
    }))
  );

  const handleVideoClick = (video) => {
    if (video.premium && !user?.isPremium) {
      toast.info("Try this video with Premium plan!");
    } else {
      navigate("/video", { state: { video } });
    }
  };


  const filterVideos = (rows) => {
    if (selectedCategory === "All") return rows;
    return rows.map(row => row.filter(video => video.category === selectedCategory));
  };

  const filteredVideoRows = filterVideos(videoRows);
  const filteredPremiumRows = filterVideos(premiumRows);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{brandName}</h1>

      {/* Categories */}
      <div className="flex space-x-3 mb-6 overflow-x-auto">
        {categories.map((cat) => (
          <button 
            key={cat} 
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded whitespace-nowrap ${
              selectedCategory === cat 
                ? "bg-red-600 text-white" 
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Advertisement */}
      <div className={`${theme === "dark" ? "bg-gray-700" : "bg-gray-300"} h-24 flex items-center justify-center mb-6`}>
        Advertisement Banner
      </div>

      {/* Premium Videos */}
      <AnimatePresence>
        {filteredPremiumRows.map((row, rowIndex) => (
          <motion.div
            key={`premium-${rowIndex}`}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {row.map(video => (
              <motion.div
                key={video.id}
                onClick={() => handleVideoClick(video)}
                className={`${theme === "dark" ? "bg-gray-800" : "bg-gray-100"} rounded overflow-hidden relative cursor-pointer hover:scale-105 transition-transform`}
                whileHover={{ scale: 1.05 }}
              >
                <div className="absolute top-2 left-2">
                  <StarIcon className="w-5 h-5 text-yellow-400" />
                </div>
                <div className="aspect-video bg-gray-700 flex items-center justify-center text-gray-400">Video Player</div>
                <div className="p-2 flex flex-col space-y-1">
                  <span className="font-semibold text-sm">{video.title}</span>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>{video.views} views</span>
                    <span>{video.added} added</span>
                  </div>
                  <button className="flex items-center justify-center w-full bg-red-500 text-white rounded py-1 mt-1">
                    <PlusIcon className="w-4 h-4 mr-1" /> Add
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Advertisement */}
      <div className={`${theme === "dark" ? "bg-gray-700" : "bg-gray-300"} h-24 flex items-center justify-center mb-6`}>
        Advertisement Banner
      </div>

      {/* Regular Videos */}
      <AnimatePresence>
        {filteredVideoRows.map((row, rowIndex) => (
          <motion.div
            key={`regular-${rowIndex}`}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {row.map(video => (
              <motion.div
                key={video.id}
                onClick={() => handleVideoClick(video)}
                className={`${theme === "dark" ? "bg-gray-800" : "bg-gray-100"} rounded overflow-hidden relative cursor-pointer hover:scale-105 transition-transform`}
                whileHover={{ scale: 1.05 }}
              >
                <div className="aspect-video bg-gray-700 flex items-center justify-center text-gray-400">Video Player</div>
                <div className="p-2 flex flex-col space-y-1">
                  <span className="font-semibold text-sm">{video.title}</span>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>{video.views} views</span>
                    <span>{video.added} added</span>
                  </div>
                  <button className="flex items-center justify-center w-full bg-red-500 text-white rounded py-1 mt-1">
                    <PlusIcon className="w-4 h-4 mr-1" /> Add
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ))}
      </AnimatePresence>

        {/* Advertisement */}
      <div className={`${theme === "dark" ? "bg-gray-700" : "bg-gray-300"} h-24 flex items-center justify-center mb-6`}>
        Advertisement Banner
      </div>


      {/* Bottom Bar */}
      <footer className={`${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-200 text-black"} p-6 mt-10`}>
        <h2 className="text-2xl font-bold mb-4 text-center">Erotic-X Team</h2>
        <div className="flex justify-center items-center space-x-6 mb-4">
          <a
            href="https://t.me/your_support_link"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors"
          >
            <FaTelegramPlane className="w-5 h-5" />
            <span>Telegram</span>
          </a>
          <div className="flex items-center space-x-2 px-3 py-2 bg-gray-700 text-white rounded">
            <FaEnvelope className="w-5 h-5" />
            <span>support@eroticx.com</span>
          </div>
        </div>
        <p className="text-center text-sm text-gray-400">All issues have been resolved</p>
      </footer>

      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </div>
  );
}
