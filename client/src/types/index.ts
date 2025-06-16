// User types
export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'agent' | 'admin';
  phone?: string;
  avatar?: string;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

// Property types
export interface Property {
  _id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  images: string[];
  agent: User;
  status: string;
  features: string[];
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
}

// Inquiry types
export interface Inquiry {
  _id: string;
  property: string | Property;
  name: string;
  email: string;
  phone: string;
  message: string;
  agent: string | User;
  createdAt: string;
  updatedAt: string;
}

// Auth types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: 'user' | 'agent';
  phone?: string;
}

// API Response types
export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiError {
  message: string;
  error?: any;
} 