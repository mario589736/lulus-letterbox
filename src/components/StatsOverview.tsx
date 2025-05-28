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
    },
    {
      label: 'Zugestellt',
      value: deliveredPostcards,
      icon: '✅',
      color: 'from-success-500 to-success-600',
      bgColor: 'from-success-50 to-success-100',
    },
    {
      label: 'Unterwegs',
      value: upcomingPostcards,
      icon: '🚚',
      color: 'from-secondary-500 to-secondary-600',
      bgColor: 'from-secondary-50 to-secondary-100',
    },
    {
      label: 'Tage-Streak',
      value: currentStreak,
      icon: '🔥',
      color: 'from-warning-500 to-warning-600',
      bgColor: 'from-warning-50 to-warning-100',
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
          <div className={`bg-gradient-to-br ${stat.bgColor} dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border border-gray-200 dark:border-gray-600 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:scale-105`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center animate-float`}>
                <span className="text-white text-xl" style={{ animationDelay: `${index * 0.2}s` }}>
                  {stat.icon}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 