import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LeftNav from "./components/LeftNav";
import RightNav from "./components/RightNav";
import Home from "./pages/Home";
import VideoPage from "./components/VideoPage";

export default function App() {
  const [activePage, setActivePage] = useState("home"); // home, film, news, trending
  const [user, setUser] = useState({ name: "Vimukthi", isPremium: false, videosAdded: 12 }); // added isPremium
  const [theme, setTheme] = useState("dark"); // dark or light
  const brandName = "Erotic-X";

  useEffect(() => {
    const formatted = activePage.charAt(0).toUpperCase() + activePage.slice(1);
    document.title = `${brandName} | ${formatted}`;
  }, [activePage]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <Router>
      <div className={`${theme === "dark" ? "bg-black text-white" : "bg-white text-black"} flex min-h-screen`}>
        <LeftNav active={activePage} onNavigate={setActivePage} theme={theme} />
        <main className="flex-1 p-4">
          <Routes>
            <Route
              path="/"
              element={<Home brandName={brandName} theme={theme} user={user} />}
            />
            <Route
              path="/video"
              element={<VideoPage theme={theme} user={user} />}
            />
          </Routes>
        </main>
        <RightNav user={user} toggleTheme={toggleTheme} theme={theme} />
      </div>
    </Router>
  );
}

export { App };