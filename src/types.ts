import { Timestamp } from 'firebase/firestore';

export interface Project {
  id: string;
  title: string;
  image: string;
  location: string;
  type: string;
  description: string;
  category: 'Residential' | 'Commercial' | 'Investment' | 'Plots';
  createdAt: Timestamp;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  propertyInterest?: string;
  budget?: string;
  location?: string;
  message?: string;
  createdAt: Timestamp;
}
