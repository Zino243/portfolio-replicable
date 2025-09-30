"use client"
 
import { useState } from "react";
import Gallery from "@/app/components/gallery";
import Projects from "@/app/components/projects";
import Home from "@/app/components/home";
import { Colors } from "@/app/components/colors-config"

export default function HomePage() {
  const [active, setActive] = useState("home");
  const [visible, setVisible] = useState(true);
  
  const renderContent = () => {
    switch (active) {
      case "home":
        return <Home />;
      case "projects":
        return <Projects />;
      case "gallery":
        return <Gallery />;
      default:
        return <h1>Home Content</h1>;
    }
  };

  return (
    <>
    <div
      style={{ backgroundColor: Colors.fondo }}
      className="flex h-screen"
    >
      {/* Sidebar */}
      {
        visible && (<aside className="flex flex-col w-56 bg-gray-800 text-white shadow-lg">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
            <h2 className="text-xl font-bold">Mi Portfolio</h2>
            <button onClick={() => setVisible(false)}>Close</button>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-2">
            <button
            onClick={() => setActive("home")}
            className={`w-full text-left px-3 py-2 rounded-md transition ${
              active === "home"
                ? "bg-green-600 font-semibold"
                : "hover:bg-green-700"
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setActive("gallery")}
            className={`w-full text-left px-3 py-2 rounded-md transition ${
              active === "gallery"
                ? "bg-green-600 font-semibold"
                : "hover:bg-green-700"
            }`}
          >
            Gallery
          </button>
          <button
            onClick={() => setActive("projects")}
            className={`w-full text-left px-3 py-2 rounded-md transition ${
              active === "projects"
                ? "bg-green-600 font-semibold"
                : "hover:bg-green-700"
            }`}
          >
            Projects
          </button>
        </nav>
      </aside>)}
      {/* Content */}
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  </>

  );
}       