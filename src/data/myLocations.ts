
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
    name: "Singapore",
    coordinates: [103.8198, 1.3521],
    description: "Population: 5.6 million | Weather: Hot and humid, avg 27-31°C | Known for stunning Gardens by the Bay and being the world's only island city-state.",
    startDate: new Date('2023-05-10'),
    endDate: new Date('2023-05-17')
  },
  { 
    name: "Hong Kong",
    coordinates: [114.1694, 22.3193],
    description: "Population: 7.4 million | Weather: Subtropical, avg 16-28°C | Famous for having the most skyscrapers in the world and its iconic Victoria Harbour.",
    startDate: new Date('2023-07-22'),
    endDate: new Date('2023-08-01')
  },
  { 
    name: "Manila",
    coordinates: [120.9842, 14.5995],
    description: "Population: 13.9 million (metro) | Weather: Tropical, avg 24-32°C | Home to the oldest Chinatown in the world and one of the most densely populated cities globally.",
    startDate: new Date('2022-04-12'),
    endDate: new Date('2022-04-19')
  },
  { 
    name: "Portugal",
    coordinates: [-9.1393, 38.7223], // Updated coordinates to Lisbon, Portugal
    description: "Population: 10.3 million | Weather: Mediterranean, avg 15-25°C | The oldest country in Europe with the same defined borders and the world's largest cork producer.",
    startDate: new Date('2022-08-15'),
    endDate: new Date('2022-08-28')
  }
];
