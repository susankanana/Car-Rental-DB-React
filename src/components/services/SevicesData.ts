import { Car, Users, Clock } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Service = {
  icon: LucideIcon;
  title: string;
  features: string[];
  description: string;
  price: string;
  popular: boolean;
};

const servicesData: Service[] = [
  {
    icon: Car,
    title: "Economy Cars",
    description: "Affordable and fuel-efficient vehicles perfect for city driving",
    features: ["Fuel efficient", "Easy parking", "Great for daily use"],
    price: "From $25/day",
    popular: false,
  },
  {
    icon: Users,
    title: "Family SUVs",
    description: "Spacious and comfortable SUVs ideal for family trips",
    features: ["7-8 seater capacity", "Large luggage space", "Safety features"],
    price: "From $65/day",
    popular: true,
  },
  {
    icon: Clock,
    title: "Luxury Vehicles",
    description: "Premium cars for special occasions and business trips",
    features: ["Latest models", "Premium interiors", "Concierge service"],
    price: "From $120/day",
    popular: false,
  }
];

export default servicesData;
