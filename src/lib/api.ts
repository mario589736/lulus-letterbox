import { User, Child, Milestone, PostcardContent, Postcard, DashboardData, TimelineEntry } from '@/types';

// Mock Meilensteine für das Toilettentraining
const mockMilestones: Milestone[] = [
  {
    id: '1',
    name: 'Erstes Mal ohne Windel',
    description: 'Das erste Mal erfolgreich auf die Toilette gegangen',
    category: 'basic',
    icon: '🚽',
    order: 1,
  },
  {
    id: '2',
    name: '3 Tage hintereinander trocken',
    description: 'Drei aufeinanderfolgende Tage ohne Unfall',
    category: 'basic',
    icon: '🌟',
    order: 2,
  },
  {
    id: '3',
    name: 'Kein nächtliches Malheur',
    description: 'Eine ganze Woche nachts trocken geblieben',
    category: 'advanced',
    icon: '🌙',
    order: 3,
  },
  {
    id: '4',
    name: 'Selbstständig zur Toilette',
    description: 'Alleine zur Toilette gegangen und Bescheid gesagt',
    category: 'advanced',
    icon: '🏆',
    order: 4,
  },
  {
    id: '5',
    name: 'Große Geschäfte gemeistert',
    description: 'Erfolgreich das große Geschäft auf der Toilette erledigt',
    category: 'special',
    icon: '💩',
    order: 5,
  },
];

// Mock Kinder
const mockChildren: Child[] = [
  {
    id: '1',
    parentId: 'user1',
    name: 'Emma',
    birthDate: '2021-03-15',
    gender: 'mädchen',
    favoriteColor: 'Rosa',
    favoriteTheme: 'Prinzessin',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
  },
  {
    id: '2',
    parentId: 'user2',
    name: 'Max',
    birthDate: '2020-11-20',
    gender: 'junge',
    favoriteColor: 'Blau',
    favoriteTheme: 'Dinosaurier',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10',
  },
];

// Mock Postkarteninhalte
const mockPostcardContents: PostcardContent[] = [
  {
    id: '1',
    milestoneId: '1',
    childId: '1',
    title: 'Hurra Emma! Dein erster Toiletten-Erfolg! 🎉',
    message: 'Liebe Emma,\n\nLulu und Kacka sind so stolz auf dich! Du hast es zum ersten Mal ganz alleine auf die Toilette geschafft. Das ist ein riesiger Schritt für ein großes Mädchen wie dich!\n\nDeine Prinzessinnen-Krone glänzt heute besonders hell! ✨\n\nWeiter so, kleine Toiletten-Prinzessin!\n\nLiebe Grüße,\nLulu 💕',
    illustration: 'https://picsum.photos/400/600?random=princess1',
    isPersonalized: true,
    status: 'approved',
  },
  {
    id: '2',
    milestoneId: '2',
    childId: '1',
    title: 'Emma ist 3 Tage trocken! 🌟',
    message: 'Wow Emma!\n\nDrei ganze Tage warst du trocken - das ist fantastisch! Lulu tanzt vor Freude und Kacka macht Purzelbäume!\n\nDu wirst immer besser im Toiletten-Training. Mama und Papa sind bestimmt sehr stolz auf ihre kleine Prinzessin!\n\nMach weiter so!\n\nDeine Lulu 👑',
    illustration: 'https://picsum.photos/400/600?random=princess2',
    isPersonalized: true,
    status: 'preview',
  },
];

// Mock Postkarten
const mockPostcards: Postcard[] = [
  {
    id: '1',
    childId: '1',
    contentId: '1',
    status: 'delivered',
    plannedShippingDate: '2024-01-20',
    actualShippingDate: '2024-01-20',
    trackingNumber: 'DE123456789',
    estimatedDelivery: '2024-01-22',
    parentReaction: 'Emma war überglücklich!',
    childReaction: 'Hat vor Freude gesprungen und die Karte allen gezeigt',
  },
  {
    id: '2',
    childId: '1',
    contentId: '2',
    status: 'printed',
    plannedShippingDate: '2024-01-25',
    actualShippingDate: '2024-01-25',
    trackingNumber: 'DE987654321',
    estimatedDelivery: '2024-01-27',
  },
];

// Mock Timeline
const mockTimeline: TimelineEntry[] = [
  {
    id: '1',
    date: '2024-01-22',
    type: 'postcard',
    title: 'Postkarte zugestellt',
    description: 'Erste Postkarte "Erstes Mal ohne Windel" wurde zugestellt',
    postcardId: '1',
  },
  {
    id: '2',
    date: '2024-01-20',
    type: 'milestone',
    title: 'Meilenstein erreicht',
    description: 'Emma hat das erste Mal erfolgreich die Toilette benutzt!',
  },
  {
    id: '3',
    date: '2024-01-23',
    type: 'reaction',
    title: 'Reaktion aufgezeichnet',
    description: 'Emma war überglücklich und hat vor Freude gesprungen',
    postcardId: '1',
  },
];

// Simuliere API-Verzögerung
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchMilestones(): Promise<Milestone[]> {
  await delay(300);
  return mockMilestones;
}

export async function fetchChildById(childId: string): Promise<Child | null> {
  await delay(300);
  return mockChildren.find(child => child.id === childId) || null;
}

export async function fetchChildrenByParent(parentId: string): Promise<Child[]> {
  await delay(300);
  return mockChildren.filter(child => child.parentId === parentId);
}

export async function fetchPostcardsByChild(childId: string): Promise<Postcard[]> {
  await delay(400);
  return mockPostcards.filter(postcard => postcard.childId === childId);
}

export async function fetchPostcardContent(contentId: string): Promise<PostcardContent | null> {
  await delay(200);
  return mockPostcardContents.find(content => content.id === contentId) || null;
}

export async function fetchDashboardData(childId: string): Promise<DashboardData | null> {
  await delay(500);
  
  const child = await fetchChildById(childId);
  if (!child) return null;

  const postcards = await fetchPostcardsByChild(childId);
  const deliveredPostcards = postcards.filter(p => p.status === 'delivered').length;
  const upcomingPostcards = postcards.filter(p => p.status === 'planned' || p.status === 'printed').length;

  return {
    child,
    totalPostcards: postcards.length,
    deliveredPostcards,
    upcomingPostcards,
    currentMilestones: mockMilestones.slice(0, 3),
    recentPostcards: postcards.slice(-3),
    progressTimeline: mockTimeline,
  };
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  await delay(800);
  
  // Mock authentication - in real app, this would check against database
  if (email === 'mama@example.de' && password === 'test123') {
    return {
      id: 'user1',
      email: 'mama@example.de',
      createdAt: '2024-01-01',
      isVerified: true,
    };
  }
  
  return null;
}

export async function registerUser(email: string): Promise<User | null> {
  await delay(1000);
  
  // Mock registration
  return {
    id: Math.random().toString(36),
    email,
    createdAt: new Date().toISOString(),
    isVerified: false,
  };
} 