
import React, { useState } from "react";
import Sidebar from "@/components/navigation/Sidebar";
import MobileHeader from "@/components/navigation/MobileHeader";
import NavigationMenu from "@/components/navigation/NavigationMenu";
import { Card, CardContent } from "@/components/ui/card";
import DonationForm from "@/components/charity/DonationForm";
import DonationTracker from "@/components/charity/DonationTracker";
import CharityGallery from "@/components/charity/CharityGallery";
import { Clover } from "lucide-react";

const Charity = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const mainContent = (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Finn's Brand Lucky Charity</h1>
        
        {/* Explanation Section */}
        <Card className="mb-8 bg-muted">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Clover className="h-10 w-10 text-accent flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-3">Our Charity Initiative</h2>
                <p className="text-lg mb-4">
                  At Finn's Brand Lucky, we're committed to giving back to our community. 
                  Any product purchased from our collection that contains a clover icon 
                  in its description will have its proceeds donated to Delmar Elementary School
                  to support field trips for children.
                </p>
                <p className="text-lg mb-4">
                  Look for the <Clover className="h-4 w-4 inline text-accent mx-1" /> symbol in our product 
                  descriptions to identify items that contribute to this cause.
                </p>
                <p className="text-lg">
                  Together, we can make a meaningful difference in children's educational experiences.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Donation Tracker & Thank You List */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Donation Impact</h2>
          <DonationTracker />
        </div>
        
        {/* Gallery Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Charity Gallery</h2>
          <CharityGallery />
        </div>
        
        {/* Donation Form */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Make a Donation</h2>
          <DonationForm />
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

export default Charity;
