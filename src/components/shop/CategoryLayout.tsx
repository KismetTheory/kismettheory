
import React, { useState } from "react";
import Sidebar from "@/components/navigation/Sidebar";
import MobileHeader from "@/components/navigation/MobileHeader";
import NavigationMenu from "@/components/navigation/NavigationMenu";

interface CategoryLayoutProps {
  title: string;
  children: React.ReactNode;
}

const CategoryLayout: React.FC<CategoryLayoutProps> = ({ title, children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
      <MobileHeader isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <NavigationMenu isMenuOpen={isMenuOpen} />
      
      <main className={`w-full md:w-[calc(100vw-120px)] min-h-screen transition-transform duration-300 ${
        isMenuOpen ? 'translate-x-full md:translate-x-[300px]' : 'translate-x-0'
      } ${'md:ml-[120px]'}`}>
        <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">{title}</h1>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CategoryLayout;
