export type TICustomer = {
  customerID?: number; // Optional for input (e.g., when creating a new customer)
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string | null;
  address?: string | null;
  password: string; // This might be sensitive and only sent during registration/login
  role?: "admin" | "user" | null;
  isVerified?: boolean | null;
  verificationCode?: string | null;
};

export type TSCustomer = { // 'TS' for 'Type for Stored' or 'Type from Server'
  customerID: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string | null;
  address: string | null;
  password: string; // Should be hashed
  role: "admin" | "user" | null;
  isVerified: boolean | null;
  verificationCode: string | null;
};

export type TILocation = {
  locationID?: number;
  locationName: string;
  address: string;
  contactNumber?: string | null;
};

export type TSLocation = {
  locationID: number;
  locationName: string;
  address: string;
  contactNumber: string | null;
};

export type TICar = {
  carID?: number;
  carModel: string;
  year: string;
  color?: string | null;
  rentalRate: string; // Consider 'number' for calculations if not handled on backend
  availability?: boolean | null;
  locationID?: number | null;
};

export type TSCar = {
  carID: number;
  carModel: string;
  year: string;
  color: string | null;
  rentalRate: string; // Make sure this is parsed to number for calculations
  availability: boolean | null;
  locationID: number | null;
};

export type TIBooking = {
  bookingID?: number;
  carID: number;
  customerID: number;
  rentalStartDate: string; // ISO date string e.g., "YYYY-MM-DD"
  rentalEndDate: string;   // ISO date string e.g., "YYYY-MM-DD"
  totalAmount?: string | null; // Nullable if calculated by backend
};

export type TSBooking = {
  bookingID: number;
  carID: number;
  customerID: number;
  rentalStartDate: string;
  rentalEndDate: string;
  totalAmount: string | null;
};

export type TIReservation = {
  reservationID?: number;
  customerID: number;
  carID: number;
  reservationDate: string; // ISO date string
  pickupDate: string;      // ISO date string
  returnDate?: string | null; // ISO date string
};

export type TSReservation = {
  reservationID: number;
  customerID: number;
  carID: number;
  reservationDate: string;
  pickupDate: string;
  returnDate: string | null;
};

// --- Frontend-specific types for UI components and forms ---

// Extends TSCar with additional properties needed for display in the UI (e.g., in car cards)
export type CarWithLocation = TSCar & {
  location?: TSLocation; // Optional, might be joined from backend or inferred
  imageUrl?: string; // Specific to frontend display
  features?: string[]; // Specific to frontend display
  rating?: number; // Specific to frontend display
  reviewCount?: number; // Specific to frontend display
};

// This is the type for your Booking form data, combining fields from various sources
export type BookingFormData = {
  // Car selection (from Car entity)
  carID: number;

  // Rental dates (from Booking entity)
  rentalStartDate: string; // Matches TIBooking
  rentalEndDate: string;   // Matches TIBooking

  // Customer information (from Customer entity, but adjusted for form input)
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string; // Made required for the form
  address: string;     // Made required for the form

  // Additional booking details (might be on Booking or a separate request body)
  pickupLocationID: number; // Matches TILocation's ID (made required for form)
  returnLocationID: number; // Matches TILocation's ID (made required for form)
};

// Example of a type for a list of items (e.g., for a dropdown)
export type SelectOption = {
  value: string | number;
  label: string;
}

