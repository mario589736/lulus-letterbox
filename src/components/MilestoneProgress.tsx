import { Milestone } from '@/types';

interface MilestoneProgressProps {
  milestones: Milestone[];
  childName: string;
}

export default function MilestoneProgress({ milestones, childName }: MilestoneProgressProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'basic':
        return 'from-blue-500 to-blue-600';
      case 'advanced':
        return 'from-purple-500 to-purple-600';
      case 'special':
        return 'from-pink-500 to-pink-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'basic':
        return 'Grundlagen';
      case 'advanced':
        return 'Fortgeschritten';
      case 'special':
        return 'Besondere Erfolge';
      default:
        return 'Sonstige';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800 flex items-center">
          <span className="text-2xl mr-2">🎯</span>
          {childName}s Meilensteine
        </h3>
        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
          Alle anzeigen →
        </button>
      </div>

      <div className="space-y-4">
        {milestones.map((milestone) => (
          <div key={milestone.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="text-2xl">{milestone.icon}</div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">
                    {milestone.name}
                  </h4>
                  <p className="text-gray-600 text-sm mb-2">
                    {milestone.description}
                  </p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getCategoryColor(milestone.category)} text-white`}>
                    {getCategoryLabel(milestone.category)}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col items-end">
                <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center">
                  {/* In einer echten App würde hier der Fortschritt angezeigt */}
                  <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                </div>
                <span className="text-xs text-gray-500 mt-1">Ausstehend</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {milestones.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🎯</div>
          <p className="text-gray-500">Noch keine Meilensteine definiert.</p>
        </div>
      )}

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Fortschritt insgesamt</span>
          <span className="font-medium text-primary-600">2 von 5 erreicht</span>
        </div>
        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full" style={{ width: '40%' }}></div>
        </div>
      </div>
    </div>
  );
} 