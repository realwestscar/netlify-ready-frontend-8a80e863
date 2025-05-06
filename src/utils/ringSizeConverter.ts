
// Ring size conversion utility

interface SizeMapping {
  us: number;
  uk: string;
  eu: number;
  diameter: number;
}

const sizeMappings: SizeMapping[] = [
  { us: 3, uk: "F", eu: 44, diameter: 14.1 },
  { us: 3.5, uk: "G", eu: 45.5, diameter: 14.5 },
  { us: 4, uk: "H", eu: 47, diameter: 14.9 },
  { us: 4.5, uk: "I", eu: 48.5, diameter: 15.3 },
  { us: 5, uk: "J", eu: 50, diameter: 15.7 },
  { us: 5.5, uk: "K", eu: 51, diameter: 16.1 },
  { us: 6, uk: "L", eu: 52, diameter: 16.5 },
  { us: 6.5, uk: "M", eu: 53.5, diameter: 16.9 },
  { us: 7, uk: "N", eu: 54.5, diameter: 17.3 },
  { us: 7.5, uk: "O", eu: 56, diameter: 17.7 },
  { us: 8, uk: "P", eu: 57.5, diameter: 18.1 },
  { us: 8.5, uk: "Q", eu: 58.5, diameter: 18.5 },
  { us: 9, uk: "R", eu: 60, diameter: 18.9 },
  { us: 9.5, uk: "S", eu: 61, diameter: 19.3 },
  { us: 10, uk: "T", eu: 62.5, diameter: 19.7 },
  { us: 10.5, uk: "U", eu: 63.5, diameter: 20.1 },
  { us: 11, uk: "V", eu: 65, diameter: 20.6 },
  { us: 11.5, uk: "W", eu: 66, diameter: 21 },
  { us: 12, uk: "X", eu: 67.5, diameter: 21.4 },
  { us: 12.5, uk: "Y", eu: 68.5, diameter: 21.8 },
  { us: 13, uk: "Z", eu: 70, diameter: 22.2 },
];

export function convertRingSize(value: number, fromType: 'us' | 'uk' | 'eu' | 'diameter'): SizeMapping | null {
  // Find the closest size mapping
  const mapping = sizeMappings.find(item => {
    if (fromType === 'uk') {
      return item[fromType] === value.toString();
    }
    return Math.abs(item[fromType] - value) < 0.5;
  });
  
  return mapping || null;
}

export function findClosestSize(value: number, type: 'us' | 'eu' | 'diameter'): SizeMapping | null {
  let closestMapping = null;
  let smallestDifference = Number.MAX_VALUE;
  
  for (const mapping of sizeMappings) {
    const difference = Math.abs(mapping[type] - value);
    if (difference < smallestDifference) {
      smallestDifference = difference;
      closestMapping = mapping;
    }
  }
  
  return closestMapping;
}

export function getAllSizeMappings(): SizeMapping[] {
  return [...sizeMappings];
}
