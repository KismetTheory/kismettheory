
import React, { useState } from "react";
import Sidebar from "@/components/navigation/Sidebar";
import MobileHeader from "@/components/navigation/MobileHeader";
import NavigationMenu from "@/components/navigation/NavigationMenu";
import LocalBusinessBanner from "@/components/shop/LocalBusinessBanner";
import FeaturedCategories from "@/components/shop/FeaturedCategories";
import { Clover } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

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

        {/* Handmade Products Information */}
        <div className="mb-8 p-6 rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-orange-100 dark:border-orange-900/30">
          <h2 className="text-2xl font-bold mb-4">Handcrafted With Love</h2>
          
          <div className="mb-6">
            <p className="mb-3">
              Most of our products are lovingly handmade, which means each piece is unique and may have slight variations in color or other tiny details. This isn't a flaw — it's what makes your item special and one-of-a-kind!
            </p>
            <p className="mb-3">
              Because our items are handcrafted, we can often tailor them to your specific preferences. If you're looking for something custom-made just for you:
            </p>
            <div className="flex justify-center mt-4">
              <Button asChild variant="outline" className="bg-white/80 hover:bg-white">
                <Link to="/contact">Explore Custom Options</Link>
              </Button>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-orange-200 dark:border-orange-800/30">
            <div className="flex items-center gap-2 mb-3">
              <Clover className="h-5 w-5 text-emerald-600" />
              <h3 className="text-lg font-semibold">Finn's Lucky Brand</h3>
            </div>
            <p>
              Products marked with a <span className="inline-flex items-center"><Clover className="h-4 w-4 inline text-emerald-600 mx-1" /></span> 
              in their description are part of our Finn's Lucky Brand collection. The maker's initials can be found at the end of each product description.
            </p>
            <div className="flex justify-center mt-4">
              <Button asChild variant="outline" size="sm" className="bg-white/80 hover:bg-white">
                <Link to="/shop/finns-lucky">Learn More About Finn's Lucky</Link>
              </Button>
            </div>
          </div>
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
