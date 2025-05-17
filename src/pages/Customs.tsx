
import React, { useState } from "react";
import Sidebar from "@/components/navigation/Sidebar";
import MobileHeader from "@/components/navigation/MobileHeader";
import NavigationMenu from "@/components/navigation/NavigationMenu";
import CustomsForm from "@/components/customs/CustomsForm";
import CustomsGallery from "@/components/customs/CustomsGallery";
import { Link } from "react-router-dom";
import { TagIcon, Hand, Ring, Upload, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const Customs = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const mainContent = (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Custom Creations</h1>
          <p className="text-lg md:text-xl mb-6">
            We love creating unique pieces and would be thrilled to make something especially for you. 
            Each custom item is crafted with intention and care, tailored to your specific needs.
          </p>
        </div>

        {/* Energy Wearables Section */}
        <div className="mb-16 p-6 md:p-8 rounded-lg bg-gradient-to-r from-muted to-muted/30 border border-accent/20 animate-fade-up">
          <div className="flex items-center gap-3 mb-4">
            <Hand className="h-6 w-6 text-accent" />
            <h2 className="text-2xl font-bold">Energy Vibes</h2>
          </div>
          
          <div className="mb-6">
            <p className="mb-4">
              Any energy wearable such as bracelets or pendants can be made with a variety of stones 
              that when placed together create a manifested melody of energy to be harvested, held, 
              worn, and adorned by you.
            </p>
            <p className="mb-4">
              We have an extensive list of matches put together to match your holistic needs. 
              Tell us what vibe you're looking for, and we'll craft the perfect piece for you.
            </p>
          </div>
          
          <div className="bg-white/50 dark:bg-black/10 rounded-md p-6">
            <CustomsForm type="energy" />
          </div>
        </div>

        {/* Rings Section */}
        <div className="mb-16 p-6 md:p-8 rounded-lg bg-gradient-to-r from-accent/10 to-white dark:to-black/10 border border-accent/20 animate-fade-up">
          <div className="flex items-center gap-3 mb-4">
            <Ring className="h-6 w-6 text-accent" />
            <h2 className="text-2xl font-bold">Woven & Copper Rings</h2>
          </div>
          
          <div className="mb-6">
            <p>
              We can make you your own unique ring - just tell us which style you'd like and your size! 
              Our artisans specialize in both woven and copper designs that are comfortable, beautiful, 
              and made just for you.
            </p>
          </div>
          
          <div className="bg-white/50 dark:bg-black/10 rounded-md p-6">
            <CustomsForm type="rings" />
          </div>
        </div>

        {/* Gallery Section */}
        <div className="mb-16 p-6 md:p-8 rounded-lg bg-gradient-to-r from-white/80 to-muted/60 dark:from-black/10 dark:to-muted-foreground/10 border border-accent/20 animate-fade-up">
          <CustomsGallery />
        </div>

        {/* Resin Work Section */}
        <div className="mb-16 p-6 md:p-8 rounded-lg bg-gradient-to-r from-accent/20 to-muted/30 border border-accent/20 animate-fade-up">
          <div className="flex items-center gap-3 mb-4">
            <Upload className="h-6 w-6 text-accent" />
            <h2 className="text-2xl font-bold">Resin Artistry</h2>
          </div>
          
          <div className="mb-6">
            <p className="mb-4">
              Resin work takes longer to make custom and is more surprising when it's finished. 
              However, that won't stop us from trying to create something magical for you!
            </p>
            <p className="mb-4">
              We can make it glow, make words disappear, incorporate a ton of themes, and even 
              teach you how to do it yourself. The possibilities are endless with resin art.
            </p>
          </div>
          
          <div className="bg-white/50 dark:bg-black/10 rounded-md p-6">
            <CustomsForm type="resin" />
          </div>
        </div>

        {/* Contact Direct Section */}
        <div className="p-6 md:p-8 rounded-lg bg-accent text-accent-foreground text-center animate-fade-up">
          <div className="flex flex-col items-center justify-center gap-4">
            <Send className="h-8 w-8" />
            <h2 className="text-2xl md:text-3xl font-bold">Or You Can Contact Us Directly</h2>
            <Button asChild size="lg" variant="outline" className="bg-white/90 hover:bg-white mt-2">
              <Link to="/contact">Get In Touch</Link>
            </Button>
          </div>
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

export default Customs;
