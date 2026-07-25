export interface Specification {
  label: string;
  value: string;
}

export interface DownloadItem {
  title: string;
  url: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  discount: number;
  category: string;
  subcategory: string;
  tags: string[];
  voltage: string;
  capacity: string;
  dimensions: string;
  weight: string;
  warranty: string;
  stock: number;
  status: string;
  featured: boolean;
  specifications: Specification[];
  downloads: DownloadItem[];
  applications: string[];
  thumbnail: string;
  gallery: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  featuredImage: string;
  createdAt: string;
  readTime: string;
}

export interface QuoteRequest {
  id: string;
  product: string;
  capacity: string;
  voltage: string;
  quantity: number;
  industry: string;
  location: string;
  requirements: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: "Pending" | "Assigned" | "Replied" | "Archived";
  createdAt: string;
}

export interface DealerApplication {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  city: string;
  businessType: string;
  experience: string;
  status: "Pending" | "Approved" | "Rejected";
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "Inbox" | "Archive" | "Spam";
  createdAt: string;
}

export interface SiteSettings {
  logo: string;
  favicon: string;
  theme: string;
  socialLinks: {
    facebook: string;
    linkedin: string;
    twitter: string;
  };
  contactInfo: {
    phone: string;
    email: string;
    officeAddress: string;
    factoryAddress: string;
  };
  whatsAppNumber: string;
}
