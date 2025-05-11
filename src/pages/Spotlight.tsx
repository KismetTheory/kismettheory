
import React, { useState } from "react";
import Sidebar from "@/components/navigation/Sidebar";
import MobileHeader from "@/components/navigation/MobileHeader";
import NavigationMenu from "@/components/navigation/NavigationMenu";

const Spotlight = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const mainContent = (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">The Spotlight</h1>
        <div className="bg-muted p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Kismet: Destiny or Fate</h2>
          <p className="text-lg mb-4">
            <em>Kismet</em>: A power that is believed to control what happens in the future; fate or destiny.
          </p>
          <p className="text-lg mb-4">
            The Spotlight section features stories and events that showcase the concept of kismet - 
            those beautiful moments when destiny brings people, ideas, and opportunities together.
          </p>
          <p className="text-lg">
            Check back regularly for updates on featured stories and spotlight events.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
      <MobileHeader isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <NavigationMenu isMenuOpen={isMenuOpen} />
      
      <main className={`w-full md:w-[calc(100vw-120px)] min-h-screen transition-transform duration-300 ${
        isMenuOpen ? 'translate-x-full md:translate-x-[300px]' : 'translate-x-0'
      } ${'md:ml-[120px]'}`}>
        {mainContent}
      </main>
    </div>
  );
};

export default Spotlight;
