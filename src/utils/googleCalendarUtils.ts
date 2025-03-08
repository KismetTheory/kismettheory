import { toast } from "@/components/ui/use-toast";

// Location data interface
export interface LocationData {
  name: string;
  coordinates: [number, number]; // [longitude, latitude]
  description: string;
  startDate?: Date;
  endDate?: Date;
}

// This file is kept as a placeholder for future Google Calendar integration
// Currently using static data from src/data/myLocations.ts

// Mock function to geocode location strings to coordinates
// In a real implementation, you would use a geocoding service like Google Maps Geocoding API
export const geocodeLocation = async (locationString: string): Promise<[number, number] | null> => {
  // This is a mock implementation
  // In a real app, you would call a geocoding API here
  
  // For demo purposes, return coordinates based on some common city names
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
  return null;
};
