
import { toast } from "@/components/ui/use-toast";

// Google Calendar API scopes for reading calendar events
const SCOPES = 'https://www.googleapis.com/auth/calendar.events.readonly';

// Location data interface
export interface LocationData {
  name: string;
  coordinates: [number, number]; // [longitude, latitude]
  description: string;
  startDate?: Date;
  endDate?: Date;
}

// Function to initialize Google Calendar API
export const initGoogleCalendar = () => {
  return new Promise<void>((resolve, reject) => {
    if (typeof window === 'undefined' || !window.gapi) {
      // Load the Google API client library
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = () => {
        window.gapi.load('client:auth2', () => {
          resolve();
        });
      };
      script.onerror = () => {
        reject(new Error('Failed to load Google API client'));
      };
      document.body.appendChild(script);
    } else {
      resolve();
    }
  });
};

// Function to authenticate with Google Calendar
export const authenticateWithGoogle = async (apiKey: string, clientId: string) => {
  try {
    await window.gapi.client.init({
      apiKey,
      clientId,
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
      scope: SCOPES
    });

    // Sign in the user
    if (!window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
      await window.gapi.auth2.getAuthInstance().signIn();
    }
    
    return true;
  } catch (error) {
    console.error('Error authenticating with Google:', error);
    toast({
      title: "Authentication Error",
      description: "Failed to authenticate with Google Calendar",
      variant: "destructive"
    });
    return false;
  }
};

// Function to fetch travel events from Google Calendar
export const fetchTravelEvents = async (): Promise<LocationData[]> => {
  try {
    // Get events from the past 2 years
    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
    
    const response = await window.gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'timeMin': twoYearsAgo.toISOString(),
      'timeMax': new Date().toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 100,
      'orderBy': 'startTime'
    });

    const events = response.result.items;
    const locations: LocationData[] = [];

    // Process events to extract location data
    for (const event of events) {
      // Look for events with location data
      if (event.location) {
        // This is a simple implementation - in a real app you would use
        // a geocoding service to convert addresses to coordinates
        const location = await geocodeLocation(event.location);
        
        if (location) {
          locations.push({
            name: event.location.split(',')[0],
            coordinates: location,
            description: event.summary || 'Travel Event',
            startDate: event.start?.dateTime ? new Date(event.start.dateTime) : undefined,
            endDate: event.end?.dateTime ? new Date(event.end.dateTime) : undefined
          });
        }
      }
    }

    return locations;
  } catch (error) {
    console.error('Error fetching travel events:', error);
    toast({
      title: "Error",
      description: "Failed to fetch travel events from Google Calendar",
      variant: "destructive"
    });
    return [];
  }
};

// Mock function to geocode location strings to coordinates
// In a real implementation, you would use a geocoding service like Google Maps Geocoding API
const geocodeLocation = async (locationString: string): Promise<[number, number] | null> => {
  // This is a mock implementation
  // In a real app, you would call a geocoding API here
  
  // For demo purposes, return random coordinates near the general area
  // based on some common city names
  
  const cities: Record<string, [number, number]> = {
    'New York': [-74.0060, 40.7128],
    'London': [-0.1278, 51.5074],
    'Paris': [2.3522, 48.8566],
    'Tokyo': [139.6917, 35.6895],
    'Sydney': [151.2093, -33.8688],
    'Rome': [12.4964, 41.9028],
    'Berlin': [13.4050, 52.5200],
    'Madrid': [-3.7038, 40.4168],
    'Beijing': [116.4074, 39.9042],
    'Cairo': [31.2357, 30.0444],
  };
  
  // Check if any city name is contained in the location string
  for (const [city, coordinates] of Object.entries(cities)) {
    if (locationString.toLowerCase().includes(city.toLowerCase())) {
      return coordinates;
    }
  }
  
  // If no match found, return null
  // In a real implementation, you would use a geocoding service
  return null;
};
