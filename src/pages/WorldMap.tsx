
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MobileHeader from '@/components/navigation/MobileHeader';
import Sidebar from '@/components/navigation/Sidebar';
import NavigationMenu from '@/components/navigation/NavigationMenu';
import { ArrowLeft, MapPin } from 'lucide-react';
import { myVisitedLocations } from '@/data/myLocations';

const WorldMap = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);

  // Toggle menu function
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-background dark:bg-black relative overflow-hidden">
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
        <div className="max-w-7xl mx-auto pt-20 md:pt-0 px-4 md:px-8">
          <Link to="/" className="flex items-center text-primary mb-6 hover:underline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to home
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-6">My Travels 2025</h1>
          
          <div className="relative w-full h-[70vh] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
            {/* World map image */}
            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-cover bg-center opacity-90 dark:opacity-70"></div>
            
            {/* Map markers */}
            <div className="absolute inset-0">
              {myVisitedLocations.map((location, index) => {
                // Approximate conversion from lat/long to relative position on our static map
                const leftPosition = ((location.coordinates[0] + 180) / 360) * 100;
                const topPosition = ((90 - location.coordinates[1]) / 180) * 100;
                
                // Determine if popup should appear below instead of above
                // For markers in the top 20% of the map, place popup below
                const isTopOfMap = topPosition < 20;
                
                return (
                  <div 
                    key={index}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    style={{ 
                      left: `${leftPosition}%`, 
                      top: `${topPosition}%`,
                    }}
                    onClick={() => setSelectedLocation(index === selectedLocation ? null : index)}
                  >
                    <div className="relative">
                      <MapPin 
                        className="w-6 h-6 text-[#D946EF] dark:text-[#5CC6D0] drop-shadow-lg" 
                        fill={index === selectedLocation ? "#D946EF" : "rgba(217, 70, 239, 0.3)"}
                        strokeWidth={2.5}
                      />
                      
                      {/* Info popup when location is selected */}
                      {index === selectedLocation && (
                        <div 
                          className={`absolute z-10 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg w-48 -translate-x-1/2 left-1/2
                            ${isTopOfMap 
                              ? 'translate-y-full top-full mt-2' // Show below marker
                              : '-translate-y-full top-0 mb-2'   // Show above marker
                            } border border-gray-200 dark:border-gray-700`}
                        >
                          <h3 className="font-bold text-lg">{location.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{location.description}</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myVisitedLocations.map((location, index) => (
              <div 
                key={index} 
                className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex items-start cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition ${
                  index === selectedLocation ? 'ring-2 ring-[#D946EF] dark:ring-[#5CC6D0]' : ''
                }`}
                onClick={() => setSelectedLocation(index === selectedLocation ? null : index)}
              >
                <MapPin className={`w-5 h-5 text-[#D946EF] dark:text-[#5CC6D0] mr-2 mt-1 flex-shrink-0 ${
                  index === selectedLocation ? 'fill-[#D946EF] dark:fill-[#5CC6D0]' : ''
                }`} />
                <div>
                  <h3 className="font-bold text-lg">{location.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{location.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default WorldMap;
