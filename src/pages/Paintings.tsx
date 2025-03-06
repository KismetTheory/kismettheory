
import React, { useState } from "react";
import Sidebar from "@/components/navigation/Sidebar";
import MobileHeader from "@/components/navigation/MobileHeader";
import NavigationMenu from "@/components/navigation/NavigationMenu";

const Paintings = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const paintings = [
    {
      id: 1,
      src: "https://mlkwtxmsxa0d.i.optimole.com/w:auto/h:auto/q:mauto/f:best/https://jamiemarsland.co.uk/wp-content/uploads/2024/06/cliff.jpg",
      title: "Cliff Painting",
      description: "Acrylic painting of a cliff landscape"
    },
    {
      id: 2,
      src: "https://mlkwtxmsxa0d.i.optimole.com/w:auto/h:auto/q:mauto/f:best/https://jamiemarsland.co.uk/wp-content/uploads/2024/06/lake.jpg",
      title: "Lake Painting",
      description: "Acrylic painting of a serene lake"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <MobileHeader isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <NavigationMenu isMenuOpen={isMenuOpen} />

      <main 
        className={`w-full md:w-[calc(100vw-120px)] min-h-screen transition-transform duration-300 ${
          isMenuOpen 
            ? 'translate-x-full md:translate-x-[300px]' 
            : 'translate-x-0'
        } ${
          'md:ml-[120px]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-foreground mb-8">Paintings</h1>
          <p className="text-muted-foreground mb-12 max-w-2xl">
            Experimental paintings exploring color, texture, and emotion.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {paintings.map((painting) => (
              <div
                key={painting.id}
                className="group relative"
              >
                <div className="aspect-[4/3] overflow-hidden rounded-lg bg-muted">
                  <img
                    src={painting.src}
                    alt={painting.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-medium">{painting.title}</h3>
                  <p className="text-muted-foreground">{painting.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Paintings;
