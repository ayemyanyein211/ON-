export interface TeamReview {
  id: string;
  clientName: string;
  text: string;
  rating: number;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  email: string;
  linkedin: string;
  photoUrl?: string;
  reviews?: TeamReview[];
}

export interface ServiceItem {
  id: string;
  name: string;
  price: string;
  description: string;
  availableCountries: string[];
}

export interface PackageItem {
  id: string;
  title: string;
  price: string;
  features: string[];
  availableCountries: string[];
}

export interface University {
  id: string;
  name: string;
  countries: string[];
  description: string;
}

export interface Scholarship {
  id: string;
  name: string;
  countries: string[];
  amount: string;
  deadline: string;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  content: string;
  imageUrl?: string;
}

export interface SiteData {
  companyName: string;
  logoUrl?: string;
  tagline: string;
  vision: string;
  mission: string[];
  disclaimer: string;
  values: { title: string; description: string }[];
  contact: {
    phone: string[];
    email: string;
    address: string;
    whatsapp: string[];
    socials: {
      facebook: string;
      instagram: string;
      tiktok: string;
      youtube: string;
    };
  };
  policy: {
    servicePolicy: string;
    refundPolicy: string;
    liability: string;
  };
}

export interface AdminSettings {
  email: string;
  passwordHash: string;
  twoFactorHash: string;
}

export interface SecurityLog {
  id: string;
  timestamp: number;
  event: string;
  status: 'success' | 'failure' | 'warning';
  details?: string;
}

export interface LoginResult {
  success: boolean;
  error?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  is2FAPending: boolean;
  loginStep1: (email: string, password: string) => Promise<LoginResult>;
  loginStep2: (code: string) => Promise<LoginResult>;
  logout: () => void;
  updateCredentials: (currentPassword: string, newSettings: Partial<{ email: string; password: string; code2FA: string }>) => Promise<LoginResult>;
  logs: SecurityLog[];
  adminEmail: string; // Expose email for display
}

export interface AppContextType {
  data: SiteData;
  team: TeamMember[];
  services: ServiceItem[];
  packages: PackageItem[];
  universities: University[];
  scholarships: Scholarship[];
  blog: BlogPost[];
  auth: AuthState;
  updateData: (newData: Partial<SiteData>) => void;
  updateTeam: (newTeam: TeamMember[]) => void;
  updateServices: (newServices: ServiceItem[]) => void;
  updatePackages: (newPackages: PackageItem[]) => void;
  updateUniversities: (newUnis: University[]) => void;
  updateScholarships: (newScholarships: Scholarship[]) => void;
  updateBlog: (newBlog: BlogPost[]) => void;
}