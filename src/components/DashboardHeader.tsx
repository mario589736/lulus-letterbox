import { Child } from '@/types';

interface DashboardHeaderProps {
  child: Child;
}

export default function DashboardHeader({ child }: DashboardHeaderProps) {
  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    const ageInMonths = (today.getFullYear() - birth.getFullYear()) * 12 + (today.getMonth() - birth.getMonth());
    
    if (ageInMonths < 12) {
      return `${ageInMonths} Monate`;
    } else {
      const years = Math.floor(ageInMonths / 12);
      const months = ageInMonths % 12;
      return months > 0 ? `${years} Jahre, ${months} Monate` : `${years} Jahre`;
    }
  };

  const getThemeEmoji = (theme: string) => {
    const themes: { [key: string]: string } = {
      'Prinzessin': '👑',
      'Dinosaurier': '🦕',
      'Autos': '🚗',
      'Tiere': '🐻',
      'Weltraum': '🚀',
      'Blumen': '🌸',
    };
    return themes[theme] || '⭐';
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="flex items-center justify-between">
          {/* Logo und Navigation */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="text-3xl">💌</div>
              <h1 className="text-2xl font-bold text-primary-600">
                Lulu&apos;s Letterbox
              </h1>
            </div>
          </div>

          {/* Benutzer Info */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5-5-5 5h5z" />
              </svg>
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Kind Information */}
        <div className="mt-6 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl shadow-lg">
                {getThemeEmoji(child.favoriteTheme || '')}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {child.name}s Toiletten-Abenteuer
                </h2>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                  <span>{calculateAge(child.birthDate)} alt</span>
                  <span>•</span>
                  <span>Lieblingsthema: {child.favoriteTheme}</span>
                  <span>•</span>
                  <span>Lieblingsfarbe: {child.favoriteColor}</span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-4xl mb-2">🎯</div>
              <p className="text-sm text-gray-600">
                Gemeinsam schaffen<br />wir das!
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 