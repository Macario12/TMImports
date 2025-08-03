import { Vehicle, PurchaseReport } from '../types';

export const mockVehicles: Vehicle[] = [
  {
    id: '1',
    make: 'BMW',
    model: '330i',
    year: 2022,
    vin: 'WBA5R1C50NDT12345',
    lot: '65432100',
    location: 'Dallas, TX',
    auctionHouse: 'Copart',
    currentBid: 18500,
    estimatedValue: 28000,
    damage: 'Front End',
    condition: 'Run and Drive',
    primaryDamage: 'Front End',
    secondaryDamage: 'Minor Hail',
    images: [
      'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg',
      'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg',
      'https://images.pexels.com/photos/1004409/pexels-photo-1004409.jpeg'
    ],
    saleDate: '2024-01-15',
    transmission: 'Automatic',
    engine: '2.0L I4 Turbo',
    drivetrain: 'RWD',
    fuel: 'Gasoline',
    odometer: 35420,
    titleType: 'Clean Title',
    color: 'Alpine White'
  },
  {
    id: '2',
    make: 'Mercedes-Benz',
    model: 'C300',
    year: 2021,
    vin: 'WDDWF4HB5MR123456',
    lot: '98765432',
    location: 'Phoenix, AZ',
    auctionHouse: 'IAAI',
    currentBid: 22000,
    estimatedValue: 32000,
    damage: 'Rear',
    condition: 'Start and Run',
    primaryDamage: 'Rear',
    images: [
      'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg',
      'https://images.pexels.com/photos/3849365/pexels-photo-3849365.jpeg'
    ],
    saleDate: '2024-01-20',
    transmission: 'Automatic',
    engine: '2.0L I4 Turbo',
    drivetrain: 'RWD',
    fuel: 'Gasoline',
    odometer: 28950,
    titleType: 'Clean Title',
    color: 'Obsidian Black'
  },
  {
    id: '3',
    make: 'Audi',
    model: 'A4',
    year: 2023,
    vin: 'WAUENAF49PA123457',
    lot: '11223344',
    location: 'Houston, TX',
    auctionHouse: 'Copart',
    currentBid: 25000,
    estimatedValue: 38000,
    damage: 'Hail',
    condition: 'Run and Drive',
    primaryDamage: 'Hail',
    images: [
      'https://images.pexels.com/photos/1429775/pexels-photo-1429775.jpeg',
      'https://images.pexels.com/photos/627678/pexels-photo-627678.jpeg'
    ],
    saleDate: '2024-01-25',
    transmission: 'Automatic',
    engine: '2.0L I4 Turbo',
    drivetrain: 'AWD',
    fuel: 'Gasoline',
    odometer: 15200,
    titleType: 'Clean Title',
    color: 'Glacier White'
  },
  {
    id: '4',
    make: 'Toyota',
    model: 'Camry',
    year: 2022,
    vin: '4T1G11AK8NU123458',
    lot: '55667788',
    location: 'Atlanta, GA',
    auctionHouse: 'IAAI',
    currentBid: 16800,
    estimatedValue: 24000,
    damage: 'Side',
    condition: 'Run and Drive',
    primaryDamage: 'Left Side',
    secondaryDamage: 'Minor Scratches',
    images: [
      'https://images.pexels.com/photos/1077785/pexels-photo-1077785.jpeg',
      'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg'
    ],
    saleDate: '2024-01-30',
    transmission: 'Automatic',
    engine: '2.5L I4',
    drivetrain: 'FWD',
    fuel: 'Gasoline',
    odometer: 42100,
    titleType: 'Clean Title',
    color: 'Magnetic Gray'
  }
];

export const mockReports: PurchaseReport[] = [
  {
    id: 'R001',
    vehicle: mockVehicles[0],
    costs: {
      auctionPrice: 18500,
      auctionFees: 925,
      transportationLand: 800,
      transportationMaritime: 2500,
      importFees: 1200,
      customsDuties: 2775,
      documentationFees: 350,
      insuranceFees: 450,
      storageFees: 200,
      otherFees: 300
    },
    purchaseDate: '2024-01-15',
    status: 'Delivered',
    profit: 3500,
    salePrice: 31500
  },
  {
    id: 'R002',
    vehicle: mockVehicles[1],
    costs: {
      auctionPrice: 22000,
      auctionFees: 1100,
      transportationLand: 950,
      transportationMaritime: 2800,
      importFees: 1400,
      customsDuties: 3300,
      documentationFees: 400,
      insuranceFees: 500,
      storageFees: 150,
      otherFees: 250
    },
    purchaseDate: '2024-01-20',
    status: 'In Transit'
  }
];