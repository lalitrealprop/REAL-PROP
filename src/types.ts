
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

  // Existing REAL PROP lead fields
  propertyInterest?: string;
  propertyType?: string;
  budget?: string;
  location?: string;
  message?: string;

  // Project-specific enquiries, including Hero Homes
  project?: string;
  projectId?: string;
  configuration?: string;
  enquiryPurpose?: string;
  source?: string;
  consentToContact?: boolean;

  createdAt: Timestamp;
}
