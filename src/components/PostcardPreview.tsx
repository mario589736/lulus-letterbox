import { useState, useEffect } from 'react';

interface PostcardPreviewProps {
  childName: string;
  theme: string;
  milestone: string;
  message: string;
  onMessageChange: (message: string) => void;
  className?: string;
}

const themeConfig = {
  princess: {
    colors: 'from-pink-400 to-purple-500',
    bg: 'from-pink-50 to-purple-50',
    emoji: '👑',
    name: 'Prinzessin',
  },
  dinosaur: {
    colors: 'from-green-400 to-emerald-500',
    bg: 'from-green-50 to-emerald-50',
    emoji: '🦕',
    name: 'Dinosaurier',
  },
  space: {
    colors: 'from-blue-400 to-indigo-500',
    bg: 'from-blue-50 to-indigo-50',
    emoji: '🚀',
    name: 'Weltraum',
  },
  animals: {
    colors: 'from-amber-400 to-orange-500',
    bg: 'from-amber-50 to-orange-50',
    emoji: '🐻',
    name: 'Tiere',
  },
  cars: {
    colors: 'from-red-400 to-rose-500',
    bg: 'from-red-50 to-rose-50',
    emoji: '🚗',
    name: 'Autos',
  },
  flowers: {
    colors: 'from-rose-400 to-pink-500',
    bg: 'from-rose-50 to-pink-50',
    emoji: '🌸',
    name: 'Blumen',
  },
};

export default function PostcardPreview({
  childName,
  theme,
  milestone,
  message,
  onMessageChange,
  className = '',
}: PostcardPreviewProps) {
  const [showBack, setShowBack] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const themeData = themeConfig[theme as keyof typeof themeConfig] || themeConfig.princess;

  useEffect(() => {
    setCharCount(message.length);
  }, [message]);

  const defaultMessage = `Liebe ${childName || '[Name]'}!

🎉 Was für ein großer Tag! Du hast einen wichtigen Schritt beim Töpfchentraining geschafft: ${milestone || '[Meilenstein]'}.

Lulu und Kacka sind so stolz auf dich! Du wirst immer größer und selbstständiger. 

Mach weiter so, kleiner Champion!

Deine Freunde
Lulu 💖 & Kacka 💩`;

  const currentMessage = message || defaultMessage;

  return (
    <div className={`w-full ${className}`}>
      <div className="md:flex md:space-x-8 space-y-6 md:space-y-0">
        {/* Editor Panel */}
        <div className="flex-1">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Nachricht personalisieren
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Bearbeite die Nachricht für {childName || 'dein Kind'}. Die Postkarte wird so gedruckt, wie du sie hier siehst.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deine persönliche Nachricht
                </label>
                <textarea
                  value={message}
                  onChange={(e) => onMessageChange(e.target.value)}
                  placeholder={defaultMessage}
                  rows={12}
                  maxLength={400}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-inner-soft focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none font-mono text-sm leading-relaxed"
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-gray-500">
                    Nutze [Name] als Platzhalter für den Kindernamen
                  </p>
                  <span className={`text-xs font-medium ${charCount > 350 ? 'text-warning-600' : 'text-gray-500'}`}>
                    {charCount}/400 Zeichen
                  </span>
                </div>
              </div>

              <button
                onClick={() => onMessageChange(defaultMessage)}
                className="px-4 py-2 text-sm text-secondary-600 hover:text-secondary-700 hover:bg-secondary-50 rounded-lg transition-colors duration-200"
              >
                Standard-Nachricht verwenden
              </button>
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="flex-1">
          <div className="sticky top-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">
                Live-Vorschau
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowBack(false)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                    !showBack 
                      ? 'bg-primary-500 text-white shadow-soft' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Vorderseite
                </button>
                <button
                  onClick={() => setShowBack(true)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                    showBack 
                      ? 'bg-primary-500 text-white shadow-soft' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Rückseite
                </button>
              </div>
            </div>

            {/* Postcard */}
            <div className="relative">
              <div className="aspect-[3/2] bg-white rounded-2xl shadow-soft-lg border border-gray-200 overflow-hidden transform transition-all duration-500 hover:shadow-soft-lg">
                {!showBack ? (
                  /* Front Side */
                  <div className={`w-full h-full bg-gradient-to-br ${themeData.bg} p-6 flex flex-col`}>
                    {/* Header */}
                    <div className="text-center mb-4">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${themeData.colors} mb-3 animate-float`}>
                        <span className="text-2xl">{themeData.emoji}</span>
                      </div>
                      <h2 className="text-xl font-bold text-gray-800 font-playful">
                        Lulus Briefkasten
                      </h2>
                      <p className="text-sm text-gray-600">
                        Thema: {themeData.name}
                      </p>
                    </div>

                    {/* Message */}
                    <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-inner-soft">
                      <pre className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap font-sans">
                        {currentMessage.replace(/\[Name\]/g, childName || '[Name]')}
                      </pre>
                    </div>

                    {/* Footer Characters */}
                    <div className="flex justify-center space-x-4 mt-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full flex items-center justify-center animate-bounce-soft">
                          <span className="text-xs">💖</span>
                        </div>
                        <span className="text-xs font-medium text-gray-700">Lulu</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce-soft" style={{ animationDelay: '0.2s' }}>
                          <span className="text-xs">💩</span>
                        </div>
                        <span className="text-xs font-medium text-gray-700">Kacka</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Back Side */
                  <div className="w-full h-full bg-white p-6 flex">
                    {/* Address Section */}
                    <div className="w-1/2 pr-4">
                      <div className="h-full border-r border-gray-200 pr-4">
                        <h3 className="text-sm font-semibold text-gray-800 mb-3">
                          Nachricht an:
                        </h3>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="font-medium">{childName || '[Kindername]'}</div>
                          <div>[Straße und Hausnummer]</div>
                          <div>[PLZ Stadt]</div>
                          <div>[Land]</div>
                        </div>
                      </div>
                    </div>

                    {/* Stamp and Logo Section */}
                    <div className="w-1/2 pl-4">
                      <div className="flex flex-col h-full justify-between">
                        {/* Stamp */}
                        <div className="self-end">
                          <div className={`w-16 h-12 bg-gradient-to-r ${themeData.colors} rounded border-2 border-dashed border-gray-300 flex items-center justify-center`}>
                            <span className="text-xs text-white font-bold">✉️</span>
                          </div>
                        </div>

                        {/* Logo */}
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-700 font-playful">
                            Lulus Briefkasten
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Post für kleine Helden
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Flip Animation Indicator */}
              <div className="absolute top-2 right-2">
                <div className="w-6 h-6 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-soft">
                  <svg className="w-3 h-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Preview Info */}
            <div className="mt-4 p-4 bg-soft-blue rounded-xl">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 text-lg">💡</div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-1">
                    So wird deine Postkarte aussehen
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Die echte Postkarte wird auf hochwertigem Papier gedruckt und kommt in 
                    {theme ? ` ${themeData.name}` : ''}-Farben bei euch an.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 