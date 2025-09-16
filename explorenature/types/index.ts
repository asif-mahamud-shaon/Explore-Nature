export interface Tour {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  duration: string;
  location: string;
  category: string;
  difficulty: string;
  groupSize: string;
  includes: string[];
  highlights: string[];
  itinerary: ItineraryItem[];
  images: string[];
  rating: number;
  reviewsCount: number;
  featured: boolean;
}

export interface ItineraryItem {
  time: string;
  activity: string;
  duration: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: 'primary' | 'gold' | 'sand';
  featured: boolean;
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  review: string;
  image: string;
  tour: string;
  date: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  tourInterest?: string;
}

export interface NewsletterFormData {
  email: string;
}

export interface SearchFilters {
  keyword?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  duration?: string;
  difficulty?: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

