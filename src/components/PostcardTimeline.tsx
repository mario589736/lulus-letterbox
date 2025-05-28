import { TimelineEntry } from '@/types';

interface PostcardTimelineProps {
  timeline: TimelineEntry[];
}

export default function PostcardTimeline({ timeline }: PostcardTimelineProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'milestone':
        return '🎯';
      case 'postcard':
        return '📮';
      case 'reaction':
        return '😊';
      default:
        return '⭐';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'milestone':
        return 'bg-primary-100 text-primary-600 border-primary-200';
      case 'postcard':
        return 'bg-green-100 text-green-600 border-green-200';
      case 'reaction':
        return 'bg-yellow-100 text-yellow-600 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const formatDate = (date: string | Date) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg">
      <div className="p-8">
        <h3 className="text-xl font-bold text-gray-800 mb-8 flex items-center">
          <span className="text-2xl mr-3">📅</span>
          Fortschritts-Timeline
        </h3>

        {timeline.length > 0 ? (
          <div className="space-y-8">
            {timeline.map((entry, index) => (
              <div key={entry.id} className="flex items-start space-x-6">
                {/* Timeline Linie */}
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-lg ${getTypeColor(entry.type)} shadow-soft`}>
                    {getTypeIcon(entry.type)}
                  </div>
                  {index < timeline.length - 1 && (
                    <div className="w-0.5 h-12 bg-gray-200 mt-4"></div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-800 text-lg">
                      {entry.title}
                    </h4>
                    <span className="text-sm text-gray-500 font-medium">
                      {formatDate(entry.date)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {entry.description}
                  </p>
                  {entry.postcardId && (
                    <button className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors duration-200 hover:underline">
                      Postkarte anzeigen →
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-4xl mb-6">📅</div>
            <p className="text-gray-500 text-lg">Noch keine Aktivitäten in der Timeline.</p>
          </div>
        )}

        {timeline.length > 3 && (
          <div className="mt-10 pt-8 border-t border-gray-200 text-center">
            <button className="text-primary-600 hover:text-primary-700 font-medium text-lg transition-colors duration-200 hover:underline">
              Alle Aktivitäten anzeigen →
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 