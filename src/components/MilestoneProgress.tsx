import React from 'react';
import { Milestone } from '../types';

interface MilestoneProgressProps {
  milestones: Milestone[];
  onMilestoneClick?: (milestoneId: string) => void;
}

export default function MilestoneProgress({ milestones, onMilestoneClick }: MilestoneProgressProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'basic':
        return 'from-success-500 to-success-600';
      case 'advanced':
        return 'from-primary-500 to-primary-600';
      case 'special':
        return 'from-warning-500 to-warning-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'basic':
        return 'Grundlagen';
      case 'advanced':
        return 'Fortgeschritten';
      case 'special':
        return 'Besonders';
      default:
        return 'Unbekannt';
    }
  };

  return (
    <div className="space-y-6">
      {milestones.map((milestone, index) => (
        <div
          key={milestone.id}
          className="animate-slide-up cursor-pointer"
          style={{ animationDelay: `${index * 0.1}s` }}
          onClick={() => onMilestoneClick?.(milestone.id)}
        >
          <div className={`
            p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-soft-lg hover:scale-105
            ${milestone.isCompleted 
              ? 'border-success-300 bg-gradient-to-br from-success-50 to-success-100 dark:from-success-900/20 dark:to-success-800/20' 
              : 'border-gray-200 bg-white dark:bg-gray-800 hover:border-gray-300 dark:border-gray-600'
            }
          `}>
            <div className="flex items-start space-x-4">
              {/* Icon */}
              <div className={`
                w-12 h-12 rounded-xl flex items-center justify-center text-2xl
                ${milestone.isCompleted 
                  ? 'bg-gradient-to-r from-success-500 to-success-600 animate-bounce-soft' 
                  : 'bg-gray-100 dark:bg-gray-700'
                }
              `}>
                <span className={milestone.isCompleted ? 'text-white' : 'text-gray-500 dark:text-gray-400'}>
                  {milestone.isCompleted ? '✅' : milestone.icon}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {milestone.title}
                  </h3>
                  <span className={`
                    px-3 py-1 rounded-full text-xs font-medium
                    bg-gradient-to-r ${getCategoryColor(milestone.category)} text-white
                  `}>
                    {getCategoryName(milestone.category)}
                  </span>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {milestone.description}
                </p>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      Fortschritt
                    </span>
                    <span className={`font-bold ${
                      milestone.isCompleted ? 'text-success-600' : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {milestone.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div
                      className={`
                        h-full rounded-full transition-all duration-500 ease-out
                        ${milestone.isCompleted 
                          ? 'bg-gradient-to-r from-success-500 to-success-600' 
                          : 'bg-gradient-to-r from-primary-500 to-secondary-500'
                        }
                      `}
                      style={{ width: `${milestone.progress}%` }}
                    />
                  </div>
                </div>

                {/* Next Postcard Date */}
                {!milestone.isCompleted && (
                  <div className="mt-4 flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <span>📅</span>
                    <span>
                      Nächste Postkarte: {new Date(milestone.nextPostcardDate).toLocaleDateString('de-DE')}
                    </span>
                  </div>
                )}

                {/* Completion Date */}
                {milestone.isCompleted && milestone.completedAt && (
                  <div className="mt-4 flex items-center space-x-2 text-sm text-success-600 dark:text-success-400">
                    <span>🎉</span>
                    <span>
                      Erreicht am {new Date(milestone.completedAt).toLocaleDateString('de-DE')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Summary */}
      <div className="mt-8 p-6 bg-gradient-to-br from-soft-blue to-soft-purple rounded-2xl border border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <div className="text-3xl mb-3">🎯</div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Meilenstein-Übersicht
          </h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-success-600">
                {milestones.filter(m => m.isCompleted).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Erreicht</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary-600">
                {milestones.filter(m => !m.isCompleted && m.progress > 0).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">In Arbeit</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-600">
                {milestones.filter(m => m.progress === 0).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Geplant</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 