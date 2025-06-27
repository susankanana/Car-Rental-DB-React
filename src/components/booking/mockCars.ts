import type { CarWithLocation } from './schema'; // Adjust path if schema.ts is elsewhere

export const mockCars: CarWithLocation[] = [
  {
    carID: 1,
    carModel: 'Toyota Corolla',
    year: '2023',
    color: 'White',
    rentalRate: '45.00',
    availability: true,
    locationID: 1,
    imageUrl: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=600',
    features: ['Air Conditioning', 'Bluetooth', 'USB Charging'],
    rating: 4.8,
    reviewCount: 124
  },
  {
    carID: 2,
    carModel: 'Honda CR-V',
    year: '2023',
    color: 'Silver',
    rentalRate: '75.00',
    availability: true,
    locationID: 1,
    imageUrl: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=600',
    features: ['AWD', 'Sunroof', 'Navigation', 'Backup Camera'],
    rating: 4.9,
    reviewCount: 89
  },
  {
    carID: 3,
    carModel: 'BMW X5',
    year: '2024',
    color: 'Black',
    rentalRate: '120.00',
    availability: true,
    locationID: 2,
    imageUrl: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=600',
    features: ['Luxury Interior', 'Premium Sound', 'Heated Seats', 'Panoramic Roof'],
    rating: 5.0,
    reviewCount: 67
  }
];