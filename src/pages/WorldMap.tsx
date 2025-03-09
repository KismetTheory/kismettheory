
import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import MobileHeader from '@/components/navigation/MobileHeader';
import Sidebar from '@/components/navigation/Sidebar';
import { ArrowLeft, MapPin } from 'lucide-react';
import { myVisitedLocations } from '@/data/myLocations';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

// Default map container style
const mapContainerStyle = {
  width: '100%',
  height: '70vh',
  borderRadius: '0.5rem',
};

// Default center for the map (center of the world)
const center = {
  lat: 20,
  lng: 0,
};

const WorldMap = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Toggle menu function
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle map load
  const onMapLoad = useCallback(() => {
    setMapLoaded(true);
  }, []);

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
          
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Places I've Visited</h1>
          
          {!mapLoaded ? (
            <div className="flex justify-center items-center h-[60vh]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5CC6D0]"></div>
            </div>
          ) : null}
          
          <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY" onLoad={() => setMapLoaded(true)}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={2}
              onLoad={onMapLoad}
              options={{
                mapTypeControl: false,
                fullscreenControl: true,
                streetViewControl: false,
                zoomControl: true,
              }}
            >
              {myVisitedLocations.map((location, index) => (
                <Marker
                  key={index}
                  position={{
                    lat: location.coordinates[1], 
                    lng: location.coordinates[0]
                  }}
                  onClick={() => setSelectedLocation(index)}
                  icon={{
                    url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 24 24' fill='%235CC6D0' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3C/svg%3E",
                    scaledSize: new window.google.maps.Size(20, 20),
                  }}
                />
              ))}

              {selectedLocation !== null && (
                <InfoWindow
                  position={{
                    lat: myVisitedLocations[selectedLocation].coordinates[1],
                    lng: myVisitedLocations[selectedLocation].coordinates[0]
                  }}
                  onCloseClick={() => setSelectedLocation(null)}
                >
                  <div className="p-2 max-w-[200px]">
                    <h3 className="font-bold text-lg">{myVisitedLocations[selectedLocation].name}</h3>
                    <p className="text-gray-600">{myVisitedLocations[selectedLocation].description}</p>
                    {myVisitedLocations[selectedLocation].startDate && myVisitedLocations[selectedLocation].endDate && (
                      <p className="text-sm text-gray-500 mt-1">
                        {myVisitedLocations[selectedLocation].startDate.toLocaleDateString()} - {myVisitedLocations[selectedLocation].endDate.toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </LoadScript>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myVisitedLocations.map((location, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex items-start cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                onClick={() => setSelectedLocation(index)}
              >
                <MapPin className="w-5 h-5 text-[#5CC6D0] mr-2 mt-1 flex-shrink-0" />
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
