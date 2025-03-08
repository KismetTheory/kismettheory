
// Predefined list of locations I've visited
export interface MyLocation {
  name: string;
  coordinates: [number, number]; // [longitude, latitude]
  description: string;
  startDate?: Date;
  endDate?: Date;
}

export const myVisitedLocations: MyLocation[] = [
  { 
    name: "London",
    coordinates: [-0.1278, 51.5074],
    description: "UK - Business trip and sightseeing",
    startDate: new Date('2023-03-15'),
    endDate: new Date('2023-03-20')
  },
  { 
    name: "Paris",
    coordinates: [2.3522, 48.8566],
    description: "France - Photography expedition",
    startDate: new Date('2023-06-10'),
    endDate: new Date('2023-06-17')
  },
  { 
    name: "New York",
    coordinates: [-74.0060, 40.7128],
    description: "USA - Art exhibition",
    startDate: new Date('2022-11-05'),
    endDate: new Date('2022-11-15')
  },
  { 
    name: "Tokyo",
    coordinates: [139.6917, 35.6895],
    description: "Japan - Street photography tour",
    startDate: new Date('2022-09-20'),
    endDate: new Date('2022-10-01')
  },
  { 
    name: "Barcelona",
    coordinates: [2.1734, 41.3851],
    description: "Spain - Architecture study",
    startDate: new Date('2022-05-08'),
    endDate: new Date('2022-05-14')
  },
  { 
    name: "Cape Town",
    coordinates: [18.4241, -33.9249],
    description: "South Africa - Landscape photography",
    startDate: new Date('2023-01-10'),
    endDate: new Date('2023-01-22')
  },
  { 
    name: "Sydney",
    coordinates: [151.2093, -33.8688],
    description: "Australia - Coastal scenes",
    startDate: new Date('2021-12-01'),
    endDate: new Date('2021-12-15')
  }
];
