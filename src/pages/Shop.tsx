
import React, { useState } from "react";
import Sidebar from "@/components/navigation/Sidebar";
import MobileHeader from "@/components/navigation/MobileHeader";
import NavigationMenu from "@/components/navigation/NavigationMenu";
import LocalBusinessBanner from "@/components/shop/LocalBusinessBanner";
import FeaturedCategories from "@/components/shop/FeaturedCategories";

const Shop = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const mainContent = (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Shop</h1>
        
        {/* Local Businesses Banner */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Local Businesses</h2>
          <LocalBusinessBanner />
        </div>
        
        {/* Featured Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Featured Categories</h2>
          <FeaturedCategories />
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

export default Shop;
