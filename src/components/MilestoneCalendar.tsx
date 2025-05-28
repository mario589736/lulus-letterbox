import { useState, useMemo } from 'react';

interface CalendarEvent {
  id: string;
  date: Date;
  title: string;
  type: 'milestone' | 'postcard' | 'reminder';
  status: 'scheduled' | 'completed' | 'in-progress';
  icon: string;
  color: string;
}

interface MilestoneCalendarProps {
  events: CalendarEvent[];
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
  onEventClick?: (event: CalendarEvent) => void;
  className?: string;
}

const monthNames = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
];

const dayNames = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];

export default function MilestoneCalendar({
  events,
  selectedDate,
  onDateSelect,
  onEventClick,
  className = '',
}: MilestoneCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const { days } = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const monthStart = new Date(year, month, 1);
    const startDate = new Date(monthStart);
    startDate.setDate(startDate.getDate() - startDate.getDay());
    
    const days: Date[] = [];
    const currentDate = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return { days };
  }, [currentMonth]);

  const getEventsForDate = (date: Date): CalendarEvent[] => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  const isToday = (date: Date): boolean => {
    return date.toDateString() === new Date().toDateString();
  };

  const isCurrentMonth = (date: Date): boolean => {
    return date.getMonth() === currentMonth.getMonth();
  };

  const isSelected = (date: Date): boolean => {
    return selectedDate?.toDateString() === date.toDateString();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
  };

  const getEventColor = (type: string, status: string): string => {
    const colors = {
      milestone: {
        scheduled: 'bg-primary-500',
        completed: 'bg-success-500',
        'in-progress': 'bg-warning-500',
      },
      postcard: {
        scheduled: 'bg-secondary-500',
        completed: 'bg-success-500',
        'in-progress': 'bg-warning-500',
      },
      reminder: {
        scheduled: 'bg-gray-400',
        completed: 'bg-success-500',
        'in-progress': 'bg-warning-500',
      },
    };
    
    return colors[type as keyof typeof colors]?.[status as keyof typeof colors.milestone] || 'bg-gray-400';
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Calendar Header */}
      <div className="bg-white rounded-2xl shadow-soft-lg border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>

            <div className="text-center">
              <h2 className="text-xl font-semibold text-white">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h2>
              <p className="text-sm text-white/80">
                Deine Meilenstein-Übersicht
              </p>
            </div>

            <button
              onClick={() => navigateMonth('next')}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* Day Names */}
        <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
          {dayNames.map((day) => (
            <div key={day} className="p-3 text-center">
              <span className="text-sm font-medium text-gray-600">{day}</span>
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-0">
          {days.map((day, index) => {
            const dayEvents = getEventsForDate(day);
            const isCurrentMonthDay = isCurrentMonth(day);
            const isTodayDay = isToday(day);
            const isSelectedDay = isSelected(day);

            return (
              <div
                key={index}
                className={`
                  min-h-[120px] border-r border-b border-gray-100 p-2 cursor-pointer
                  transition-all duration-200 ease-out
                  ${isCurrentMonthDay 
                    ? 'hover:bg-blue-50' 
                    : 'bg-gray-50/50 hover:bg-gray-100'
                  }
                  ${isSelectedDay ? 'bg-blue-100 ring-2 ring-primary-500' : ''}
                `}
                onClick={() => onDateSelect?.(day)}
              >
                {/* Date Number */}
                <div className="flex items-center justify-between mb-2">
                  <span className={`
                    text-sm font-medium
                    ${isTodayDay 
                      ? 'w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs'
                      : isCurrentMonthDay 
                        ? 'text-gray-800' 
                        : 'text-gray-400'
                    }
                  `}>
                    {day.getDate()}
                  </span>
                  
                  {dayEvents.length > 3 && (
                    <span className="text-xs text-gray-500 bg-gray-200 rounded-full px-2 py-1">
                      +{dayEvents.length - 3}
                    </span>
                  )}
                </div>

                {/* Events */}
                <div className="space-y-1">
                  {dayEvents.slice(0, 3).map((event) => (
                    <div
                      key={event.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick?.(event);
                      }}
                      className={`
                        w-full px-2 py-1 rounded text-xs font-medium
                        transition-all duration-200 hover:scale-105
                        ${getEventColor(event.type, event.status)} text-white
                        shadow-sm hover:shadow-soft
                      `}
                    >
                      <div className="flex items-center space-x-1">
                        <span>{event.icon}</span>
                        <span className="truncate">{event.title}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Event Dots for overflow */}
                {dayEvents.length > 0 && dayEvents.length <= 3 && (
                  <div className="flex space-x-1 mt-2">
                    {dayEvents.map((event) => (
                      <div
                        key={`dot-${event.id}`}
                        className={`w-2 h-2 rounded-full ${getEventColor(event.type, event.status)}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 bg-white rounded-xl p-4 shadow-soft border border-gray-200">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Legende</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <div className="flex space-x-1">
              <div className="w-3 h-3 rounded-full bg-primary-500" />
              <div className="w-3 h-3 rounded-full bg-success-500" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-800">Meilensteine</div>
              <div className="text-xs text-gray-500">Töpfchen-Erfolge</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex space-x-1">
              <div className="w-3 h-3 rounded-full bg-secondary-500" />
              <div className="w-3 h-3 rounded-full bg-success-500" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-800">Postkarten</div>
              <div className="text-xs text-gray-500">Geplante Sendungen</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex space-x-1">
              <div className="w-3 h-3 rounded-full bg-warning-500" />
              <div className="w-3 h-3 rounded-full bg-gray-400" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-800">Status</div>
              <div className="text-xs text-gray-500">In Arbeit / Geplant</div>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Date Info */}
      {selectedDate && (
        <div className="mt-4 animate-slide-up">
          <div className="bg-gradient-to-r from-soft-blue to-soft-purple rounded-xl p-4 border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-2">
              {selectedDate.toLocaleDateString('de-DE', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h3>
            
            {(() => {
              const selectedEvents = getEventsForDate(selectedDate);
              
              if (selectedEvents.length === 0) {
                return (
                  <p className="text-sm text-gray-600">
                    Keine Ereignisse an diesem Tag geplant.
                  </p>
                );
              }
              
              return (
                <div className="space-y-2">
                  {selectedEvents.map((event) => (
                    <div key={event.id} className="flex items-center space-x-3">
                      <span className="text-lg">{event.icon}</span>
                      <div>
                        <div className="font-medium text-gray-800">{event.title}</div>
                        <div className="text-sm text-gray-600 capitalize">
                          {event.type} • {event.status === 'completed' ? 'Abgeschlossen' : 
                            event.status === 'in-progress' ? 'In Bearbeitung' : 'Geplant'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
} 