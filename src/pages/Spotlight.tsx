
import React, { useState } from "react";
import Sidebar from "@/components/navigation/Sidebar";
import MobileHeader from "@/components/navigation/MobileHeader";
import NavigationMenu from "@/components/navigation/NavigationMenu";
import { Card, CardContent } from "@/components/ui/card";

const Spotlight = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const mainContent = (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">The Spotlight</h1>
        
        {/* Introduction Section */}
        <div className="bg-muted p-8 rounded-lg mb-8">
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

        {/* Coming Soon Section */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">Coming Soon: Community Spotlight</h2>
            <p className="text-lg mb-4">
              We're excited to announce our upcoming Community Spotlight initiative! This space will soon feature 
              talented small businesses and local artists from our community.
            </p>
            <p className="text-lg mb-4">
              Our mission is to raise awareness about the incredible talents and unique offerings that exist right in our 
              neighborhood. By highlighting these creators, we hope to foster connections and support the growth of our 
              local creative economy.
            </p>
            <p className="text-lg">
              Stay tuned as we prepare to shine a light on the amazing people who make our community special.
            </p>
          </CardContent>
        </Card>
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
