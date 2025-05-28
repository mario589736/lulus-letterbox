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
  password?: string;
  createdAt: string;
  isVerified: boolean;
}

export interface Child {
  id: string;
  parentId: string;
  name: string;
  birthDate: string;
  gender: 'junge' | 'mädchen' | 'andere';
  favoriteColor?: string;
  favoriteTheme?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Milestone {
  id: string;
  name: string;
  description: string;
  category: 'basic' | 'advanced' | 'special';
  icon: string;
  order: number;
}

export interface PostcardContent {
  id: string;
  milestoneId: string;
  childId: string;
  title: string;
  message: string;
  illustration: string;
  isPersonalized: boolean;
  status: 'draft' | 'preview' | 'approved' | 'rejected';
  parentFeedback?: string;
}

export interface ShippingConfig {
  id: string;
  childId: string;
  selectedMilestones: string[];
  rhythm: 'weekly' | 'milestone' | 'custom';
  customInterval?: number;
  isActive: boolean;
  nextShippingDate?: string;
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
  child: Child;
  totalPostcards: number;
  deliveredPostcards: number;
  upcomingPostcards: number;
  currentMilestones: Milestone[];
  recentPostcards: Postcard[];
  progressTimeline: TimelineEntry[];
}

export interface TimelineEntry {
  id: string;
  date: string;
  type: 'milestone' | 'postcard' | 'reaction';
  title: string;
  description: string;
  postcardId?: string;
}

export interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  locale?: 'de-DE' | 'de-AT';
} 