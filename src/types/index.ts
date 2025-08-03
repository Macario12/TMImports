export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  vin: string;
  lot: string;
  location: string;
  auctionHouse: 'Copart' | 'IAAI';
  currentBid: number;
  estimatedValue: number;
  damage: string;
  condition: 'Run and Drive' | 'Start and Run' | 'Non-Running' | 'Unknown';
  primaryDamage: string;
  secondaryDamage?: string;
  images: string[];
  saleDate: string;
  transmission: string;
  engine: string;
  drivetrain: string;
  fuel: string;
  odometer: number;
  titleType: string;
  color: string;
}

export interface CostBreakdown {
  auctionPrice: number;
  auctionFees: number;
  transportationLand: number;
  transportationMaritime: number;
  importFees: number;
  customsDuties: number;
  documentationFees: number;
  insuranceFees: number;
  storageFees: number;
  otherFees: number;
}

export interface PurchaseReport {
  id: string;
  vehicle: Vehicle;
  costs: CostBreakdown;
  purchaseDate: string;
  status: 'Pending' | 'In Transit' | 'At Port' | 'Delivered' | 'Sold';
  profit?: number;
  salePrice?: number;
}