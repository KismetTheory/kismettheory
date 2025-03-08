
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import MobileHeader from '@/components/navigation/MobileHeader';
import Sidebar from '@/components/navigation/Sidebar';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ArrowLeft, MapPin } from 'lucide-react';
import { myVisitedLocations } from '@/data/myLocations';

// Replace this with your own Mapbox access token from https://mapbox.com/
mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

const WorldMap = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  // Toggle menu function
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Initialize the map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [0, 20], // Starting position [lng, lat]
        zoom: 1.5, // Starting zoom
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      map.current.on('load', () => {
        setIsMapLoaded(true);
        addMarkersToMap();
      });
      
      return () => map.current?.remove();
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }, []);

  // Function to add markers to the map
  const addMarkersToMap = () => {
    if (!map.current) return;
    
    // Add markers for each location
    myVisitedLocations.forEach(location => {
      // Create custom marker element
      const markerEl = document.createElement('div');
      markerEl.className = 'custom-marker';
      markerEl.style.width = '20px';
      markerEl.style.height = '20px';
      markerEl.style.borderRadius = '50%';
      markerEl.style.backgroundColor = '#5CC6D0';
      markerEl.style.border = '2px solid white';
      markerEl.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
      
      // Create popup content
      let popupContent = `<h3>${location.name}</h3><p>${location.description}</p>`;
      
      // Add dates if available
      if (location.startDate && location.endDate) {
        const startDate = location.startDate.toLocaleDateString();
        const endDate = location.endDate.toLocaleDateString();
        popupContent += `<p>From ${startDate} to ${endDate}</p>`;
      }
      
      // Create popup
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(popupContent);
      
      // Add marker to map
      new mapboxgl.Marker(markerEl)
        .setLngLat(location.coordinates)
        .setPopup(popup)
        .addTo(map.current!);
    });
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
          
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Places I've Visited</h1>
          
          {!isMapLoaded ? (
            <div className="flex justify-center items-center h-[60vh]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5CC6D0]"></div>
            </div>
          ) : null}
          
          <div 
            ref={mapContainer} 
            className={`w-full h-[70vh] rounded-lg overflow-hidden shadow-lg ${!isMapLoaded ? 'hidden' : ''}`}
          ></div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myVisitedLocations.map((location, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex items-start">
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
