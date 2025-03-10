
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
    description: "Singapore - Urban photography and street scenes",
    startDate: new Date('2023-05-10'),
    endDate: new Date('2023-05-17')
  },
  { 
    name: "Hong Kong",
    coordinates: [114.1694, 22.3193],
    description: "Hong Kong - City skylines and harbor views",
    startDate: new Date('2023-07-22'),
    endDate: new Date('2023-08-01')
  },
  { 
    name: "Manila",
    coordinates: [120.9842, 14.5995],
    description: "Philippines - Cultural documentation and coastal scenes",
    startDate: new Date('2022-04-12'),
    endDate: new Date('2022-04-19')
  },
  { 
    name: "Portugal",
    coordinates: [-8.2245, 39.3999],
    description: "Portugal - Architecture and coastal landscapes",
    startDate: new Date('2022-08-15'),
    endDate: new Date('2022-08-28')
  }
];
