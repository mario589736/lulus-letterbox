interface StatsOverviewProps {
  totalPostcards: number;
  deliveredPostcards: number;
  upcomingPostcards: number;
}

export default function StatsOverview({
  totalPostcards,
  deliveredPostcards,
  upcomingPostcards,
}: StatsOverviewProps) {
  const stats = [
    {
      title: 'Gesamt',
      value: totalPostcards,
      icon: '📮',
      color: 'from-primary-500 to-primary-600',
      textColor: 'text-primary-600',
      bgColor: 'bg-primary-50',
    },
    {
      title: 'Zugestellt',
      value: deliveredPostcards,
      icon: '✅',
      color: 'from-green-500 to-green-600',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Geplant',
      value: upcomingPostcards,
      icon: '⏰',
      color: 'from-yellow-500 to-yellow-600',
      textColor: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className={`w-12 h-12 rounded-full ${stat.bgColor} flex items-center justify-center text-2xl mb-4`}>
                {stat.icon}
              </div>
              <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
              <p className={`text-3xl font-bold ${stat.textColor}`}>
                {stat.value}
              </p>
            </div>
            <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${stat.color} opacity-10`}></div>
          </div>
        </div>
      ))}
    </div>
  );
} 