
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import MobileHeader from '@/components/navigation/MobileHeader';
import Sidebar from '@/components/navigation/Sidebar';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ArrowLeft, Calendar, MapPin } from 'lucide-react';
import { 
  initGoogleCalendar, 
  authenticateWithGoogle, 
  fetchTravelEvents, 
  LocationData 
} from '@/utils/googleCalendarUtils';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

// Fallback locations in case Google Calendar integration fails
const fallbackLocations: LocationData[] = [
  { name: "London", coordinates: [-0.1278, 51.5074], description: "UK" },
  { name: "Paris", coordinates: [2.3522, 48.8566], description: "France" },
  { name: "New York", coordinates: [-74.0060, 40.7128], description: "USA" },
  { name: "Tokyo", coordinates: [139.6917, 35.6895], description: "Japan" },
  { name: "Sydney", coordinates: [151.2093, -33.8688], description: "Australia" },
];

const WorldMap = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [isLoadingLocations, setIsLoadingLocations] = useState(false);
  const [locations, setLocations] = useState<LocationData[]>(fallbackLocations);
  const [googleApiKey, setGoogleApiKey] = useState<string>('');
  const [googleClientId, setGoogleClientId] = useState<string>('');
  const [isGoogleConfigured, setIsGoogleConfigured] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  // Toggle menu function for both MobileHeader and Sidebar
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // Check if we already have tokens in localStorage
    const savedMapboxToken = localStorage.getItem('mapbox_token');
    const savedGoogleApiKey = localStorage.getItem('google_api_key');
    const savedGoogleClientId = localStorage.getItem('google_client_id');
    
    if (savedMapboxToken) {
      setMapboxToken(savedMapboxToken);
    }
    
    if (savedGoogleApiKey && savedGoogleClientId) {
      setGoogleApiKey(savedGoogleApiKey);
      setGoogleClientId(savedGoogleClientId);
      setIsGoogleConfigured(true);
    }
  }, []);

  // Initialize Google Calendar API when credentials are configured
  useEffect(() => {
    if (isGoogleConfigured && !isAuthenticated) {
      initGoogleCalendar()
        .then(() => {
          console.log('Google API client loaded');
        })
        .catch(error => {
          console.error('Error loading Google API client:', error);
        });
    }
  }, [isGoogleConfigured, isAuthenticated]);

  // Initialize the map
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
        addMarkersToMap(locations);
      });
      
      return () => map.current?.remove();
    } catch (error) {
      console.error('Error initializing map:', error);
      toast({
        title: "Map Error",
        description: "Failed to initialize the map",
        variant: "destructive"
      });
    }
  }, [mapboxToken, locations]);

  // Function to add markers to the map
  const addMarkersToMap = (locationData: LocationData[]) => {
    if (!map.current) return;
    
    // Clear existing markers (if any)
    const existingMarkers = document.querySelectorAll('.custom-marker');
    existingMarkers.forEach(marker => marker.remove());
    
    // Add markers for each location
    locationData.forEach(location => {
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

  // Function to authenticate with Google and fetch travel events
  const fetchFromGoogleCalendar = async () => {
    if (!isGoogleConfigured) {
      toast({
        title: "Configuration Required",
        description: "Please set up your Google API key and Client ID first",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoadingLocations(true);
    
    try {
      const isAuth = await authenticateWithGoogle(googleApiKey, googleClientId);
      
      if (isAuth) {
        setIsAuthenticated(true);
        const travelEvents = await fetchTravelEvents();
        
        if (travelEvents.length > 0) {
          setLocations(travelEvents);
          toast({
            title: "Success",
            description: `Loaded ${travelEvents.length} locations from your calendar`,
          });
        } else {
          toast({
            title: "No Travel Events",
            description: "No travel events found in your calendar",
          });
        }
      }
    } catch (error) {
      console.error('Error fetching from Google Calendar:', error);
      toast({
        title: "Error",
        description: "Failed to fetch travel events from Google Calendar",
        variant: "destructive"
      });
    } finally {
      setIsLoadingLocations(false);
    }
  };

  const handleMapboxTokenSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const tokenInput = form.elements.namedItem('mapbox-token') as HTMLInputElement;
    
    if (tokenInput && tokenInput.value) {
      // Save token to localStorage for future visits
      localStorage.setItem('mapbox_token', tokenInput.value);
      setMapboxToken(tokenInput.value);
    }
  };

  const handleGoogleCredentialsSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const apiKeyInput = form.elements.namedItem('google-api-key') as HTMLInputElement;
    const clientIdInput = form.elements.namedItem('google-client-id') as HTMLInputElement;
    
    if (apiKeyInput?.value && clientIdInput?.value) {
      // Save credentials to localStorage for future visits
      localStorage.setItem('google_api_key', apiKeyInput.value);
      localStorage.setItem('google_client_id', clientIdInput.value);
      
      setGoogleApiKey(apiKeyInput.value);
      setGoogleClientId(clientIdInput.value);
      setIsGoogleConfigured(true);
      
      toast({
        title: "Google API Configured",
        description: "Your Google Calendar API credentials have been saved",
      });
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
              <form onSubmit={handleMapboxTokenSubmit} className="space-y-4">
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
          ) : (
            <>
              {!isGoogleConfigured && (
                <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-md mx-auto mb-8">
                  <h2 className="text-xl font-semibold mb-4">Connect Google Calendar</h2>
                  <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
                    To show your travel history, you need to connect your Google Calendar. You can get 
                    your credentials from the{' '}
                    <a 
                      href="https://console.cloud.google.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Google Cloud Console
                    </a>
                  </p>
                  <form onSubmit={handleGoogleCredentialsSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="google-api-key" className="block mb-1 text-sm font-medium">
                        Google API Key
                      </label>
                      <input
                        type="text"
                        id="google-api-key"
                        name="google-api-key"
                        placeholder="AIzaSyA..."
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="google-client-id" className="block mb-1 text-sm font-medium">
                        Google Client ID
                      </label>
                      <input
                        type="text"
                        id="google-client-id"
                        name="google-client-id"
                        placeholder="123456789-abcdef..."
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#5CC6D0] hover:bg-[#4ab8c2] text-white py-2 px-4 rounded"
                    >
                      Save Credentials
                    </button>
                  </form>
                </div>
              )}
              
              {isGoogleConfigured && (
                <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center">
                  <Button 
                    onClick={fetchFromGoogleCalendar}
                    className="flex items-center gap-2 bg-[#5CC6D0] hover:bg-[#4ab8c2]"
                    disabled={isLoadingLocations}
                  >
                    <Calendar className="w-4 h-4" />
                    {isLoadingLocations ? 'Loading...' : 'Load Places from Google Calendar'}
                  </Button>
                  
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {locations.length > 0 && `Showing ${locations.length} places you've visited`}
                  </div>
                </div>
              )}
              
              {!isMapLoaded ? (
                <div className="flex justify-center items-center h-[60vh]">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5CC6D0]"></div>
                </div>
              ) : null}
              
              <div 
                ref={mapContainer} 
                className={`w-full h-[70vh] rounded-lg overflow-hidden shadow-lg ${!isMapLoaded ? 'hidden' : ''}`}
              ></div>
              
              {isMapLoaded && (
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {locations.map((location, index) => (
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
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default WorldMap;
