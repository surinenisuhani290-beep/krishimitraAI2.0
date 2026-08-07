export type FarmerContext = {
  id?: string;
  name?: string;
  phone?: string;
  state?: string;
  district?: string;
  village?: string;
  crops?: string[];
  soil?: string;
  irrigation?: string;
  language?: string;
};

export type VerificationStatus = 'PENDING' | 'VERIFIED' | 'REJECTED' | 'SUSPENDED';

export type ExpertProfile = {
  id: string;
  full_name: string;
  mobile?: string;
  email?: string;
  role?: string;
  organization?: string;
  qualification?: string;
  expertise?: string;
  experience?: number;
  state?: string;
  district?: string;
  service_areas?: string[];
  languages?: string[];
  remote_assistance?: boolean;
  physical_camp?: boolean;
  availability?: string;
  bio?: string;
  verification_status?: VerificationStatus;
  created_at?: string;
};

export type KrishiSevaRequest = {
  id: string;
  farmer_id?: string;
  title: string;
  crop?: string;
  description?: string;
  state?: string;
  district?: string;
  village?: string;
  image_url?: string;
  preferred_language?: string;
  contact_preference?: string;
  priority?: 'LOW' | 'NORMAL' | 'HIGH' | 'EMERGENCY';
  status?: 'PENDING' | 'ASSIGNED' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  assigned_expert?: string | null;
  created_at?: string;
  updated_at?: string | null;
};
