
import React, { useState } from "react";
import Sidebar from "@/components/navigation/Sidebar";
import MobileHeader from "@/components/navigation/MobileHeader";
import NavigationMenu from "@/components/navigation/NavigationMenu";
import { toast } from "@/hooks/use-toast";

const Paintings = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [imageErrors, setImageErrors] = useState<{[key: number]: boolean}>({});

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const paintings = [
    {
      id: 1,
      src: "https://jamiemarsland.co.uk/wp-content/uploads/2024/06/cliff.jpg",
      title: "Cliff Painting",
      description: "Oil painting of a cliff landscape"
    },
    {
      id: 2,
      src: "https://jamiemarsland.co.uk/wp-content/uploads/2024/06/lake.jpg",
      title: "Lake Painting",
      description: "Oil painting of a serene lake"
    }
  ];

  const handleImageError = (id: number) => {
    setImageErrors(prev => ({...prev, [id]: true}));
    toast({
      title: "Image Error",
      description: "There was a problem loading an image. Please try again later.",
      variant: "destructive"
    });
  };

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
                  {!imageErrors[painting.id] ? (
                    <img
                      src={painting.src}
                      alt={painting.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={() => handleImageError(painting.id)}
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-muted p-4 text-center">
                      <p className="text-muted-foreground">Image could not be loaded</p>
                    </div>
                  )}
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
