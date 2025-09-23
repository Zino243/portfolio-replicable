"use client"
 
import { useState } from "react";
import Gallery from "@/app/components/gallery";
import Projects from "@/app/components/projects";
import Home from "@/app/components/home";
import "../../globals.css"

export default function HomePage() {
  const [active, setActive] = useState("home");

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

  const primario = "#F0C490"
  return (
    <>
      <div style={{ backgroundColor: primario }} className="flex flex-row bg-green-400 h-screen">
      {/* Sidebar */}
      <div className="flex flex-col w-48 border-r border-gray-300 p-2">
        <button 
          onClick={() => setActive("home")} 
          className="p-2 text-left m-1.5 hover:bg-green-700 rounded"
        >
          Home
        </button>
        <button 
          onClick={() => setActive("gallery")} 
          className="p-2 text-left hover:bg-red-600 rounded"
        >
          Gallery
        </button>
        <button 
          onClick={() => setActive("projects")} 
          className="p-2 text-left hover:bg-red-600 rounded"
        >
          Projects
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        {renderContent()}
      </div>
    </div>
    </>
  );
}       