import { User, Child, Milestone, PostcardContent, Postcard, DashboardData } from '@/types';

// Mock data for German toilet training milestones
const mockMilestones: Milestone[] = [
  {
    id: '1',
    title: 'Erstes Mal ohne Windel',
    description: 'Das erste Mal erfolgreich auf die Toilette gegangen',
    category: 'basic',
    icon: '🚽',
    isCompleted: false,
    completedAt: null,
    nextPostcardDate: new Date('2024-02-01').toISOString(),
    progress: 0,
  },
  {
    id: '2',
    title: '3 Tage trocken',
    description: 'Drei aufeinanderfolgende Tage ohne Unfälle',
    category: 'basic',
    icon: '⭐',
    isCompleted: false,
    completedAt: null,
    nextPostcardDate: new Date('2024-02-15').toISOString(),
    progress: 0,
  },
  {
    id: '3',
    title: 'Nachts trocken bleiben',
    description: 'Eine ganze Nacht ohne Unfall',
    category: 'advanced',
    icon: '🌙',
    isCompleted: false,
    completedAt: null,
    nextPostcardDate: new Date('2024-03-01').toISOString(),
    progress: 0,
  },
  {
    id: '4',
    title: 'Selbstständig aufs Klo',
    description: 'Ohne Hilfe auf die Toilette gehen',
    category: 'advanced',
    icon: '🚽',
    isCompleted: false,
    completedAt: null,
    nextPostcardDate: new Date('2024-03-15').toISOString(),
    progress: 0,
  },
  {
    id: '5',
    title: 'Großes Geschäft gemeistert',
    description: 'Erfolgreich das große Geschäft auf der Toilette',
    category: 'special',
    icon: '💩',
    isCompleted: false,
    completedAt: null,
    nextPostcardDate: new Date('2024-04-01').toISOString(),
    progress: 0,
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

export const getDashboardData = async (): Promise<DashboardData> => {
  return {
    stats: {
      totalPostcards: 5,
      deliveredPostcards: 3,
      upcomingPostcards: 2,
      currentStreak: 7,
    },
    milestones: [
      {
        id: '1',
        title: 'Erstes Mal ohne Windel',
        description: 'Das erste Mal erfolgreich das Töpfchen benutzt',
        category: 'basic',
        isCompleted: true,
        completedAt: new Date('2024-01-15').toISOString(),
        nextPostcardDate: new Date('2024-02-01').toISOString(),
        icon: '🎯',
        progress: 100,
      },
      {
        id: '2',
        title: '3 Tage trocken',
        description: 'Drei aufeinanderfolgende Tage ohne Unfälle',
        category: 'basic',
        isCompleted: true,
        completedAt: new Date('2024-01-20').toISOString(),
        nextPostcardDate: new Date('2024-02-05').toISOString(),
        icon: '⭐',
        progress: 100,
      },
      {
        id: '3',
        title: 'Nachts trocken bleiben',
        description: 'Eine ganze Nacht ohne Unfall',
        category: 'advanced',
        isCompleted: false,
        completedAt: null,
        nextPostcardDate: new Date('2024-02-15').toISOString(),
        icon: '🌙',
        progress: 60,
      },
      {
        id: '4',
        title: 'Selbstständig aufs Klo',
        description: 'Ohne Hilfe das Töpfchen benutzen',
        category: 'advanced',
        isCompleted: false,
        completedAt: null,
        nextPostcardDate: new Date('2024-02-20').toISOString(),
        icon: '🚽',
        progress: 40,
      },
      {
        id: '5',
        title: 'Großes Geschäft gemeistert',
        description: 'Erfolgreich das große Geschäft im Töpfchen',
        category: 'special',
        isCompleted: false,
        completedAt: null,
        nextPostcardDate: new Date('2024-03-01').toISOString(),
        icon: '💩',
        progress: 20,
      },
    ],
    timeline: [
      {
        id: '1',
        date: new Date('2024-01-25').toISOString(),
        type: 'milestone',
        title: 'Meilenstein erreicht!',
        description: 'Emma hat 3 Tage ohne Unfall geschafft! 🎉',
        icon: '🏆',
      },
      {
        id: '2',
        date: new Date('2024-01-22').toISOString(),
        type: 'postcard',
        title: 'Postkarte versendet',
        description: 'Eine Glückwunschkarte ist unterwegs zu Emma!',
        icon: '📮',
      },
      {
        id: '3',
        date: new Date('2024-01-20').toISOString(),
        type: 'progress',
        title: 'Fortschritt gemacht',
        description: 'Emma wird immer sicherer beim Töpfchen benutzen.',
        icon: '📈',
      },
      {
        id: '4',
        date: new Date('2024-01-15').toISOString(),
        type: 'milestone',
        title: 'Erster Erfolg!',
        description: 'Emma hat zum ersten Mal das Töpfchen erfolgreich benutzt! 🎯',
        icon: '🌟',
      },
    ],
  };
};

// Alias for backward compatibility
export const fetchDashboardData = getDashboardData;

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

export async function getChild(childId: string): Promise<Child> {
  await delay(100);
  
  // Mock child data
  return {
    id: childId,
    name: 'Emma',
    birthDate: '2022-03-15',
    gender: 'mädchen',
    favoriteColor: 'Rosa',
    favoriteTheme: 'Prinzessin',
  };
} 