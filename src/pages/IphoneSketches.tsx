import React, { useState } from "react";
import Sidebar from "@/components/navigation/Sidebar";
import MobileHeader from "@/components/navigation/MobileHeader";
import NavigationMenu from "@/components/navigation/NavigationMenu";
import { cn } from "@/lib/utils";

const sketches = [
  {
    id: 1,
    src: "https://mlkwtxmsxa0d.i.optimole.com/w:auto/h:auto/q:mauto/f:best/https://jamiemarsland.co.uk/wp-content/uploads/2021/11/IMG_7217.jpg",
    title: "Architectural Sketch 1",
    description: "Digital architectural exploration using iPhone"
  },
  {
    id: 2,
    src: "https://mlkwtxmsxa0d.i.optimole.com/w:auto/h:auto/q:mauto/f:best/https://jamiemarsland.co.uk/wp-content/uploads/2021/11/IMG_7160-1.jpg",
    title: "Architectural Sketch 2",
    description: "Urban landscape study on iPhone"
  },
  {
    id: 3,
    src: "https://mlkwtxmsxa0d.i.optimole.com/w:auto/h:auto/q:mauto/f:best/https://jamiemarsland.co.uk/wp-content/uploads/2022/01/IMG_8708.jpg",
    title: "Architectural Sketch 3",
    description: "Building perspective study using iPhone"
  }
];

const IphoneSketches = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedSketch, setSelectedSketch] = useState<number | null>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen bg-black">
      <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <MobileHeader isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <NavigationMenu isMenuOpen={isMenuOpen} />

      <main className="pt-16 md:pl-[120px] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-white mb-8">iPhone Sketches</h1>
          <p className="text-gray-400 mb-12 max-w-2xl">
            A collection of architectural and artistic sketches created on iPhone, exploring the intersection of technology and creativity.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sketches.map((sketch) => (
              <div
                key={sketch.id}
                className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg"
                onClick={() => setSelectedSketch(sketch.id)}
              >
                <img
                  src={sketch.src}
                  alt={sketch.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{sketch.title}</h3>
                    <p className="text-gray-300 text-sm">{sketch.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox */}
        {selectedSketch && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            onClick={() => setSelectedSketch(null)}
          >
            <div className="relative max-w-4xl w-full p-4">
              <img
                src={sketches.find(s => s.id === selectedSketch)?.src}
                alt={sketches.find(s => s.id === selectedSketch)?.title}
                className="w-full h-auto rounded-lg"
              />
              <button
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
                onClick={() => setSelectedSketch(null)}
              >
                <span className="sr-only">Close</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default IphoneSketches;
