export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  imageUrl: string;
  slug: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: string;
  isVerified: boolean;
}

export interface Child {
  id: string;
  parentId?: string;
  name: string;
  birthDate: string;
  gender: 'male' | 'female' | 'other' | 'mädchen' | 'junge';
  favoriteColor: string;
  favoriteTheme: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  category: 'basic' | 'advanced' | 'special';
  isCompleted: boolean;
  completedAt: string | null;
  nextPostcardDate: string;
  icon: string;
  progress: number;
}

export interface PostcardContent {
  id: string;
  milestoneId: string;
  childId: string;
  title: string;
  message: string;
  illustration: string;
  isPersonalized: boolean;
  status: 'approved' | 'preview' | 'pending';
  parentFeedback?: string;
}

export interface ShippingConfig {
  rhythm: 'weekly' | 'milestone-based' | 'custom';
  frequency?: number;
  customDates?: Date[];
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

export interface Postcard {
  id: string;
  childId: string;
  contentId: string;
  status: 'planned' | 'approved' | 'printed' | 'shipped' | 'delivered';
  plannedShippingDate: string;
  actualShippingDate?: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
  parentReaction?: string;
  childReaction?: string;
}

export interface DashboardData {
  stats: {
    totalPostcards: number;
    deliveredPostcards: number;
    upcomingPostcards: number;
    currentStreak: number;
  };
  milestones: Milestone[];
  timeline: TimelineEntry[];
}

export interface TimelineEntry {
  id: string;
  date: string;
  type: 'milestone' | 'postcard' | 'reaction' | 'progress';
  title: string;
  description: string;
  icon: string;
  postcardId?: string;
}

export interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
  locale?: string;
} 