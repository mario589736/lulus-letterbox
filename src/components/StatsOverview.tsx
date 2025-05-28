import React from 'react';

interface StatsOverviewProps {
  stats: {
    totalPostcards: number;
    deliveredPostcards: number;
    upcomingPostcards: number;
    currentStreak: number;
  };
}

export default function StatsOverview({ stats }: StatsOverviewProps) {
  const { totalPostcards, deliveredPostcards, upcomingPostcards, currentStreak } = stats;

  const statsData = [
    {
      label: 'Gesamt Postkarten',
      value: totalPostcards,
      icon: '📮',
      color: 'from-primary-500 to-primary-600',
      bgColor: 'from-primary-50 to-primary-100',
      darkBgColor: 'dark:from-primary-900/20 dark:to-primary-800/20',
      borderColor: 'border-primary-200 dark:border-primary-700/50',
    },
    {
      label: 'Zugestellt',
      value: deliveredPostcards,
      icon: '✅',
      color: 'from-success-500 to-success-600',
      bgColor: 'from-success-50 to-success-100',
      darkBgColor: 'dark:from-success-900/20 dark:to-success-800/20',
      borderColor: 'border-success-200 dark:border-success-700/50',
    },
    {
      label: 'Unterwegs',
      value: upcomingPostcards,
      icon: '🚚',
      color: 'from-secondary-500 to-secondary-600',
      bgColor: 'from-secondary-50 to-secondary-100',
      darkBgColor: 'dark:from-secondary-900/20 dark:to-secondary-800/20',
      borderColor: 'border-secondary-200 dark:border-secondary-700/50',
    },
    {
      label: 'Tage-Streak',
      value: currentStreak,
      icon: '🔥',
      color: 'from-warning-500 to-warning-600',
      bgColor: 'from-warning-50 to-warning-100',
      darkBgColor: 'dark:from-warning-900/20 dark:to-warning-800/20',
      borderColor: 'border-warning-200 dark:border-warning-700/50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat, index) => (
        <div
          key={stat.label}
          className="animate-slide-up"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className={`stat-card bg-gradient-to-br ${stat.bgColor} ${stat.darkBgColor} border ${stat.borderColor} hover:shadow-xl hover:shadow-${stat.color.split('-')[1]}-500/20 group`}>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2 uppercase tracking-wide">
                  {stat.label}
                </p>
                <p className="text-4xl font-bold text-gray-900 dark:text-white group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </p>
              </div>
              <div className={`icon-container bg-gradient-to-r ${stat.color} group-hover:animate-bounce-soft shadow-soft`}>
                <span className="text-2xl" style={{ animationDelay: `${index * 0.2}s` }}>
                  {stat.icon}
                </span>
              </div>
            </div>
            
            {/* Progress indicator for visual appeal */}
            <div className="mt-4 flex items-center space-x-2">
              <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${stat.color} rounded-full transition-all duration-1000 ease-out`}
                  style={{ 
                    width: `${Math.min(100, (stat.value / Math.max(totalPostcards, 10)) * 100)}%`,
                    animationDelay: `${index * 0.3}s`
                  }}
                ></div>
              </div>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                {stat.label === 'Tage-Streak' ? `${stat.value} Tage` : `${stat.value}`}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 