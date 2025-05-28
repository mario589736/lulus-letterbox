import { useState } from 'react';

interface Theme {
  id: string;
  name: string;
  emoji: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
  };
  description: string;
}

interface ThemeSelectorProps {
  selectedTheme?: string;
  onThemeSelect: (themeId: string) => void;
}

const themes: Theme[] = [
  {
    id: 'princess',
    name: 'Prinzessin',
    emoji: '👑',
    colors: {
      primary: 'from-pink-400 to-purple-500',
      secondary: 'from-pink-100 to-purple-100',
      background: 'bg-gradient-to-br from-pink-50 to-purple-50',
    },
    description: 'Königlich und zauberhaft',
  },
  {
    id: 'dinosaur',
    name: 'Dinosaurier',
    emoji: '🦕',
    colors: {
      primary: 'from-green-400 to-emerald-500',
      secondary: 'from-green-100 to-emerald-100',
      background: 'bg-gradient-to-br from-green-50 to-emerald-50',
    },
    description: 'Stark und abenteuerlich',
  },
  {
    id: 'space',
    name: 'Weltraum',
    emoji: '🚀',
    colors: {
      primary: 'from-blue-400 to-indigo-500',
      secondary: 'from-blue-100 to-indigo-100',
      background: 'bg-gradient-to-br from-blue-50 to-indigo-50',
    },
    description: 'Galaktisch und spannend',
  },
  {
    id: 'animals',
    name: 'Tiere',
    emoji: '🐻',
    colors: {
      primary: 'from-amber-400 to-orange-500',
      secondary: 'from-amber-100 to-orange-100',
      background: 'bg-gradient-to-br from-amber-50 to-orange-50',
    },
    description: 'Niedlich und freundlich',
  },
  {
    id: 'cars',
    name: 'Autos',
    emoji: '🚗',
    colors: {
      primary: 'from-red-400 to-rose-500',
      secondary: 'from-red-100 to-rose-100',
      background: 'bg-gradient-to-br from-red-50 to-rose-50',
    },
    description: 'Schnell und aufregend',
  },
  {
    id: 'flowers',
    name: 'Blumen',
    emoji: '🌸',
    colors: {
      primary: 'from-rose-400 to-pink-500',
      secondary: 'from-rose-100 to-pink-100',
      background: 'bg-gradient-to-br from-rose-50 to-pink-50',
    },
    description: 'Sanft und natürlich',
  },
];

export default function ThemeSelector({ selectedTheme, onThemeSelect }: ThemeSelectorProps) {
  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null);

  return (
    <div className="w-full">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Wähle das Lieblingsthema deines Kindes
        </h3>
        <p className="text-base text-gray-600 leading-relaxed">
          Das Thema bestimmt die Farben, Illustrationen und den Ton der personalisierten Postkarten.
        </p>
      </div>

      {/* Horizontal scrollable theme cards */}
      <div className="flex overflow-x-auto space-x-4 pb-4 px-2 -mx-2">
        {themes.map((theme) => (
          <div
            key={theme.id}
            className={`
              flex-shrink-0 w-40 h-52 cursor-pointer transition-all duration-300 ease-out
              ${selectedTheme === theme.id 
                ? 'scale-105 shadow-glow' 
                : hoveredTheme === theme.id 
                  ? 'scale-102 shadow-soft-lg' 
                  : 'shadow-soft hover:scale-105'
              }
            `}
            onClick={() => onThemeSelect(theme.id)}
            onMouseEnter={() => setHoveredTheme(theme.id)}
            onMouseLeave={() => setHoveredTheme(null)}
          >
            <div className={`
              w-full h-full bg-white rounded-2xl p-4 border-2 transition-all duration-300
              ${selectedTheme === theme.id 
                ? 'border-primary-400 bg-gradient-to-br from-primary-50/50 to-secondary-50/50' 
                : 'border-gray-200 hover:border-gray-300'
              }
            `}>
              {/* Theme preview background */}
              <div className={`
                w-full h-20 rounded-xl mb-3 flex items-center justify-center text-4xl
                bg-gradient-to-br ${theme.colors.primary}
                animate-float
              `}>
                <span className="filter drop-shadow-sm">
                  {theme.emoji}
                </span>
              </div>

              {/* Theme info */}
              <div className="text-center">
                <h4 className="font-semibold text-lg text-gray-800 mb-1">
                  {theme.name}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {theme.description}
                </p>
              </div>

              {/* Selection indicator */}
              {selectedTheme === theme.id && (
                <div className="mt-3 flex justify-center animate-scale-in">
                  <div className="w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Selected theme preview */}
      {selectedTheme && (
        <div className="mt-6 animate-slide-up">
          {(() => {
            const theme = themes.find(t => t.id === selectedTheme);
            if (!theme) return null;
            
            return (
              <div className={`
                p-6 rounded-2xl border border-gray-200 ${theme.colors.background}
              `}>
                <div className="flex items-center space-x-3">
                  <div className={`
                    w-12 h-12 rounded-xl flex items-center justify-center text-2xl
                    bg-gradient-to-br ${theme.colors.primary}
                  `}>
                    {theme.emoji}
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-gray-800">
                      Ausgewähltes Thema: {theme.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Perfekt! Die Postkarten werden in diesem Stil gestaltet.
                    </p>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
} 