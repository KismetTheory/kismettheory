
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MobileHeader from '@/components/navigation/MobileHeader';
import Sidebar from '@/components/navigation/Sidebar';
import { ArrowLeft, Map, MapPin } from 'lucide-react';
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
      <MobileHeader isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      
      <main className="pt-20 md:pl-[120px] px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <Link to="/" className="flex items-center text-primary mb-6 hover:underline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to home
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-6">My Travel Map</h1>
          
          <div className="relative w-full h-[70vh] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
            {/* Static world map image */}
            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-cover bg-center opacity-90 dark:opacity-70"></div>
            
            {/* Map markers */}
            <div className="absolute inset-0">
              {myVisitedLocations.map((location, index) => {
                // Approximate conversion from lat/long to relative position on our static map
                // These calculations are simplified and approximate
                const leftPosition = ((location.coordinates[0] + 180) / 360) * 100;
                const topPosition = ((90 - location.coordinates[1]) / 180) * 100;
                
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
                        className="w-6 h-6 text-[#5CC6D0] drop-shadow-md" 
                        fill={index === selectedLocation ? "#5CC6D0" : "transparent"}
                      />
                      
                      {/* Info popup when location is selected */}
                      {index === selectedLocation && (
                        <div className="absolute z-10 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg w-48 -translate-x-1/2 left-1/2 -translate-y-full top-0 mb-2">
                          <h3 className="font-bold text-lg">{location.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{location.description}</p>
                          {location.startDate && location.endDate && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {location.startDate.toLocaleDateString()} - {location.endDate.toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="absolute bottom-4 right-4 z-10">
              <div className="flex items-center bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow-md text-sm">
                <Map className="w-4 h-4 mr-2 text-gray-500" />
                <span className="text-gray-700 dark:text-gray-300">Static world map view</span>
              </div>
            </div>
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myVisitedLocations.map((location, index) => (
              <div 
                key={index} 
                className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex items-start cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition ${
                  index === selectedLocation ? 'ring-2 ring-[#5CC6D0]' : ''
                }`}
                onClick={() => setSelectedLocation(index === selectedLocation ? null : index)}
              >
                <MapPin className={`w-5 h-5 text-[#5CC6D0] mr-2 mt-1 flex-shrink-0 ${
                  index === selectedLocation ? 'fill-[#5CC6D0]' : ''
                }`} />
                <div>
                  <h3 className="font-bold text-lg">{location.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{location.description}</p>
                  {location.startDate && location.endDate && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {location.startDate.toLocaleDateString()} - {location.endDate.toLocaleDateString()}
                    </p>
                  )}
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
