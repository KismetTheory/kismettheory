
import { useState } from "react";
import { panels, menuItems, menuPaths } from "@/data/panels";
import Panel from "@/components/home/Panel";
import Background from "@/components/home/Background";
import Sidebar from "@/components/navigation/Sidebar";
import MobileHeader from "@/components/navigation/MobileHeader";
import NavigationMenu from "@/components/navigation/NavigationMenu";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredPanel, setHoveredPanel] = useState<number | null>(null);
  const [hoveredMenuItem, setHoveredMenuItem] = useState<number | null>(null);
  const defaultImage = "https://jamiemarsland.co.uk/wp-content/uploads/2025/03/photo-3-scaled.jpg";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const currentImage = hoveredMenuItem !== null 
    ? panels[hoveredMenuItem].image 
    : hoveredPanel !== null 
      ? panels[hoveredPanel].image 
      : defaultImage;

  const backgroundOpacity = (hoveredMenuItem !== null || hoveredPanel !== null) ? 1 : 0;

  return (
    <div className="flex min-h-screen bg-black" role="main">
      <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <MobileHeader isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <NavigationMenu isMenuOpen={isMenuOpen} />

      <main 
        className={`fixed w-full md:w-[calc(100vw-120px)] h-screen transition-transform duration-300 overflow-y-auto md:overflow-hidden ${
          isMenuOpen 
            ? 'translate-x-full md:translate-x-[300px]' 
            : 'translate-x-0'
        } ${
          'md:left-[120px]'
        }`}
        role="region"
        aria-label="Main content"
      >
        <Background 
          defaultImage={defaultImage}
          currentImage={currentImage}
          opacity={backgroundOpacity}
        />

        <div className="flex flex-col md:flex-row h-full relative z-10 pt-16 md:pt-0">
          {panels.map((panel, index) => (
            <Panel
              key={index}
              {...panel}
              onMouseEnter={() => setHoveredPanel(index)}
              onMouseLeave={() => setHoveredPanel(null)}
            />
          ))}
        </div>
        
        <div className="absolute bottom-4 left-0 right-0 flex justify-center z-20">
          <div className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg">
            <p className="text-white text-sm">
              Now featuring media from{" "}
              <a 
                href="/photos" 
                className="text-primary hover:underline font-medium"
              >
                Kismet Theory
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
