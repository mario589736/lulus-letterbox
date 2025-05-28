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
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <span className="text-2xl mr-2">📅</span>
        Fortschritts-Timeline
      </h3>

      {timeline.length > 0 ? (
        <div className="space-y-4">
          {timeline.map((entry, index) => (
            <div key={entry.id} className="flex items-start space-x-4">
              {/* Timeline Linie */}
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-lg ${getTypeColor(entry.type)}`}>
                  {getTypeIcon(entry.type)}
                </div>
                {index < timeline.length - 1 && (
                  <div className="w-0.5 h-8 bg-gray-200 mt-2"></div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-4">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-gray-800">
                    {entry.title}
                  </h4>
                  <span className="text-sm text-gray-500">
                    {formatDate(entry.date)}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">
                  {entry.description}
                </p>
                {entry.postcardId && (
                  <button className="text-primary-600 hover:text-primary-700 text-xs font-medium mt-2">
                    Postkarte anzeigen →
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">📅</div>
          <p className="text-gray-500">Noch keine Aktivitäten in der Timeline.</p>
        </div>
      )}

      {timeline.length > 3 && (
        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <button className="text-primary-600 hover:text-primary-700 font-medium">
            Alle Aktivitäten anzeigen →
          </button>
        </div>
      )}
    </div>
  );
} 