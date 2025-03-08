
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import MobileHeader from '@/components/navigation/MobileHeader';
import Sidebar from '@/components/navigation/Sidebar';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ArrowLeft } from 'lucide-react';

// Sample locations - replace with your actual visited locations
const visitedLocations = [
  { name: "London", coordinates: [-0.1278, 51.5074], description: "UK" },
  { name: "Paris", coordinates: [2.3522, 48.8566], description: "France" },
  { name: "New York", coordinates: [-74.0060, 40.7128], description: "USA" },
  { name: "Tokyo", coordinates: [139.6917, 35.6895], description: "Japan" },
  { name: "Sydney", coordinates: [151.2093, -33.8688], description: "Australia" },
  // Add more locations as needed
];

const WorldMap = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  // Toggle menu function for both MobileHeader and Sidebar
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // Check if we already have a token in localStorage
    const savedToken = localStorage.getItem('mapbox_token');
    if (savedToken) {
      setMapboxToken(savedToken);
    }
  }, []);

  useEffect(() => {
    if (!mapboxToken || !mapContainer.current || map.current) return;

    mapboxgl.accessToken = mapboxToken;
    
    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [0, 20], // Starting position [lng, lat]
        zoom: 1.5, // Starting zoom
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      map.current.on('load', () => {
        setIsMapLoaded(true);
        
        // Add markers for each location
        visitedLocations.forEach(location => {
          // Create custom marker element
          const markerEl = document.createElement('div');
          markerEl.className = 'custom-marker';
          markerEl.style.width = '20px';
          markerEl.style.height = '20px';
          markerEl.style.borderRadius = '50%';
          markerEl.style.backgroundColor = '#5CC6D0';
          markerEl.style.border = '2px solid white';
          markerEl.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
          
          // Create popup
          const popup = new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<h3>${location.name}</h3><p>${location.description}</p>`);
          
          // Add marker to map
          new mapboxgl.Marker(markerEl)
            .setLngLat(location.coordinates)
            .setPopup(popup)
            .addTo(map.current!);
        });
      });
      
      return () => map.current?.remove();
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }, [mapboxToken]);

  const handleTokenSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const tokenInput = form.elements.namedItem('mapbox-token') as HTMLInputElement;
    
    if (tokenInput && tokenInput.value) {
      // Save token to localStorage for future visits
      localStorage.setItem('mapbox_token', tokenInput.value);
      setMapboxToken(tokenInput.value);
    }
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
          
          {!mapboxToken ? (
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-md mx-auto mb-8">
              <h2 className="text-xl font-semibold mb-4">Enter your Mapbox token</h2>
              <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
                To display the map, you need a Mapbox public token. You can get one for free at{' '}
                <a 
                  href="https://mapbox.com/account/access-tokens" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  mapbox.com
                </a>
              </p>
              <form onSubmit={handleTokenSubmit} className="space-y-4">
                <div>
                  <label htmlFor="mapbox-token" className="block mb-1 text-sm font-medium">
                    Mapbox Public Token
                  </label>
                  <input
                    type="text"
                    id="mapbox-token"
                    name="mapbox-token"
                    placeholder="pk.eyJ1Ijo..."
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#5CC6D0] hover:bg-[#4ab8c2] text-white py-2 px-4 rounded"
                >
                  Load Map
                </button>
              </form>
            </div>
          ) : !isMapLoaded ? (
            <div className="flex justify-center items-center h-[60vh]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5CC6D0]"></div>
            </div>
          ) : null}
          
          <div 
            ref={mapContainer} 
            className={`w-full h-[70vh] rounded-lg overflow-hidden shadow-lg ${!mapboxToken || !isMapLoaded ? 'hidden' : ''}`}
          ></div>
          
          {mapboxToken && isMapLoaded && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {visitedLocations.map((location, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                  <h3 className="font-bold text-lg">{location.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{location.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default WorldMap;
