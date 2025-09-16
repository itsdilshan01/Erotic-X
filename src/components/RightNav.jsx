import React from "react";
import { UserCircleIcon, PlusIcon, SunIcon, MoonIcon } from "@heroicons/react/24/outline";

export default function RightNav({ user, toggleTheme, theme }) {
  return (
    <aside className={`${theme === "dark" ? "bg-gray-900" : "bg-gray-200"} w-60 p-4 flex flex-col items-center space-y-6`}>
      {/* Profile Section */}
      <div className="flex flex-col items-center space-y-2">
        <UserCircleIcon className="w-12 h-12 text-red-500" />
        <span className="font-bold">{user.name}</span>
      </div>

      {/* Premium Button */}
      <button className="bg-red-500 text-white px-4 py-2 rounded w-full">Upgrade to Premium</button>

      {/* Videos Added */}
      <div className="flex items-center space-x-2 text-gray-400">
        <PlusIcon className="w-5 h-5" />
        <span>{user.videosAdded} videos added</span>
      </div>

      {/* Theme Toggle */}
      <button 
        onClick={toggleTheme} 
        className="flex items-center space-x-2 px-3 py-1 border rounded hover:bg-red-500 hover:text-white"
      >
        {theme === "dark" ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
        <span>{theme === "dark" ? "Light Mode" : "Night Mode"}</span>
      </button>
    </aside>
  );
}
