import React from "react";
import { HomeIcon, FilmIcon, NewspaperIcon, FireIcon } from "@heroicons/react/24/outline";

export default function LeftNav({ active, onNavigate, theme }) {
  const tabs = [
    { name: "home", icon: <HomeIcon className="w-6 h-6" /> },
    { name: "film", icon: <FilmIcon className="w-6 h-6" /> },
    { name: "news", icon: <NewspaperIcon className="w-6 h-6" /> },
    { name: "trending", icon: <FireIcon className="w-6 h-6" /> },
  ];

  return (
    <aside className={`${theme === "dark" ? "bg-gray-900" : "bg-gray-200"} w-20 flex flex-col items-center py-4 space-y-6`}>
      {tabs.map((tab) => (
        <button 
          key={tab.name} 
          className={`flex flex-col items-center ${active === tab.name ? "text-red-500" : "text-gray-400 hover:text-red-500"}`}
          onClick={() => onNavigate(tab.name)}
        >
          {tab.icon}
          <span className="text-xs mt-1 capitalize">{tab.name}</span>
        </button>
      ))}
    </aside>
  );
}
