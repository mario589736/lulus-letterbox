import { GetStaticProps } from 'next';
import SEOHead from '../components/SEOHead';
import DashboardHeader from '../components/DashboardHeader';
import StatsOverview from '../components/StatsOverview';
import MilestoneProgress from '../components/MilestoneProgress';
import PostcardTimeline from '../components/PostcardTimeline';
import DarkModeToggle from '../components/DarkModeToggle';
import { useToast } from '../components/Toast';
import { DashboardData, Child } from '../types';
import { getDashboardData, getChild } from '../lib/api';

interface HomePageProps {
  dashboardData: DashboardData;
  child: Child;
}

export default function HomePage({ dashboardData, child }: HomePageProps) {
  const { success: showToast, ToastRenderer } = useToast();

  const handleMilestoneClick = () => {
    showToast(
      'Meilenstein ausgewählt!',
      'Du kannst hier später Fortschritte markieren.'
    );
  };

  const handleSuccessReport = () => {
    showToast(
      '🎉 Erfolg gemeldet!',
      'Toll gemacht! Der Fortschritt wurde gespeichert.'
    );
  };

  const handlePostcardOrder = () => {
    showToast(
      '📮 Postkarte bestellt!',
      'Eine neue Überraschung ist unterwegs!'
    );
  };

  return (
    <>
      <SEOHead
        title="Dashboard - Lulus Briefkasten"
        description={`Verfolge ${child.name}s Töpfchentraining-Fortschritt und sieh dir kommende Postkarten an.`}
        keywords="Töpfchentraining, Kleinkind, Meilensteine, Postkarten, Motivation"
      />

      <div className="min-h-screen bg-gradient-to-br from-soft-pink via-white to-soft-purple dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Enhanced Header */}
        <header className="sticky top-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              {/* Enhanced Logo */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center animate-float shadow-glow">
                    <span className="text-white font-bold text-2xl">💌</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-warning-400 to-warning-500 rounded-full flex items-center justify-center animate-bounce-soft">
                    <span className="text-white text-xs font-bold">3</span>
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold gradient-text font-playful">
                    Lulus Briefkasten
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    Post für kleine Helden ✨
                  </p>
                </div>
              </div>

              {/* Header Actions */}
              <div className="flex items-center space-x-4">
                <button className="relative p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:scale-105">
                  <span className="text-xl">🔔</span>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">2</span>
                  </div>
                </button>
                <DarkModeToggle />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
          {/* Welcome Section */}
          <section className="animate-slide-up">
            <div className="card-elevated">
              <div className="p-8">
                <DashboardHeader child={child} />
              </div>
            </div>
          </section>

          {/* Stats Overview */}
          <section className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <StatsOverview stats={dashboardData.stats} />
          </section>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
            {/* Left Column - Main Content */}
            <div className="xl:col-span-8 space-y-12">
              {/* Milestone Progress */}
              <section className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="card-elevated">
                  <div className="card-header">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="icon-container glass-effect">
                          <span className="text-2xl">🎯</span>
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-white">
                            Meilensteine
                          </h2>
                          <p className="text-white/80 font-medium">
                            {child.name}s Töpfchentraining-Fortschritt
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-white">
                          {Math.round((dashboardData.milestones.filter(m => m.isCompleted).length / dashboardData.milestones.length) * 100)}%
                        </div>
                        <div className="text-white/80 text-sm font-medium">Abgeschlossen</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <MilestoneProgress
                      milestones={dashboardData.milestones}
                      onMilestoneClick={handleMilestoneClick}
                    />
                  </div>
                </div>
              </section>

              {/* Quick Actions */}
              <section className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <div className="card-elevated">
                  <div className="p-8">
                    <div className="flex items-center space-x-3 mb-8">
                      <div className="icon-container-primary">
                        <span className="text-xl">⚡</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Schnellaktionen
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <button 
                        onClick={handleSuccessReport}
                        className="group relative overflow-hidden p-6 bg-gradient-to-br from-success-50 to-success-100 dark:from-success-900/20 dark:to-success-800/20 rounded-2xl border border-success-200 dark:border-success-700/50 hover:shadow-xl hover:shadow-success-500/20 transition-all duration-300 hover:scale-105 active:scale-95"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="icon-container-success group-hover:animate-bounce-soft">
                            <span className="text-2xl">✅</span>
                          </div>
                          <div className="text-left">
                            <div className="text-lg font-bold text-success-800 dark:text-success-200 mb-1">
                              Erfolg melden
                            </div>
                            <div className="text-success-600 dark:text-success-300 font-medium">
                              Meilenstein erreicht! 🎉
                            </div>
                          </div>
                        </div>
                        <div className="absolute top-2 right-2 opacity-20 group-hover:opacity-40 transition-opacity">
                          <span className="text-4xl">🌟</span>
                        </div>
                      </button>

                      <button 
                        onClick={handlePostcardOrder}
                        className="group relative overflow-hidden p-6 bg-gradient-to-br from-secondary-50 to-secondary-100 dark:from-secondary-900/20 dark:to-secondary-800/20 rounded-2xl border border-secondary-200 dark:border-secondary-700/50 hover:shadow-xl hover:shadow-secondary-500/20 transition-all duration-300 hover:scale-105 active:scale-95"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="icon-container bg-gradient-to-r from-secondary-500 to-secondary-600 text-white group-hover:animate-wiggle">
                            <span className="text-2xl">📮</span>
                          </div>
                          <div className="text-left">
                            <div className="text-lg font-bold text-secondary-800 dark:text-secondary-200 mb-1">
                              Postkarte bestellen
                            </div>
                            <div className="text-secondary-600 dark:text-secondary-300 font-medium">
                              Neue Überraschung 💌
                            </div>
                          </div>
                        </div>
                        <div className="absolute top-2 right-2 opacity-20 group-hover:opacity-40 transition-opacity">
                          <span className="text-4xl">💝</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column - Sidebar */}
            <div className="xl:col-span-4 space-y-12">
              {/* Recent Activity */}
              <section className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <div className="card-elevated">
                  <div className="card-header-warning">
                    <div className="flex items-center space-x-3">
                      <div className="icon-container glass-effect">
                        <span className="text-xl">📅</span>
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-white">
                          Fortschritts-Timeline
                        </h2>
                        <p className="text-white/80 text-sm font-medium">
                          Neueste Ereignisse
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <PostcardTimeline timeline={dashboardData.timeline} />
                  </div>
                </div>
              </section>

              {/* Motivational Card */}
              <section className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
                <div className="relative overflow-hidden bg-gradient-to-br from-soft-yellow via-soft-pink to-soft-purple rounded-3xl p-10 border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                  <div className="relative text-center">
                    <div className="text-6xl mb-6 animate-float">🌟</div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      Du machst das toll!
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8 font-medium">
                      {child.name} ist auf dem besten Weg! Jeder kleine Schritt ist ein großer Erfolg. 
                      Lulu und Kacka sind stolz auf euch beide! 💪
                    </p>
                    <div className="flex items-center justify-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full flex items-center justify-center animate-bounce-soft shadow-soft">
                          <span className="text-sm">💖</span>
                        </div>
                        <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Lulu</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce-soft shadow-soft" style={{ animationDelay: '0.2s' }}>
                          <span className="text-sm">💩</span>
                        </div>
                        <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Kacka</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Support Card */}
              <section className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
                <div className="card-elevated">
                  <div className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className="icon-container-primary">
                        <span className="text-xl">💬</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                          Brauchst du Hilfe?
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 font-medium">
                          Unser Support-Team hilft dir gerne bei Fragen rund um Lulus Briefkasten!
                        </p>
                        <button className="btn-primary w-full">
                          Support kontaktieren
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Progress Summary */}
              <section className="animate-slide-up" style={{ animationDelay: '0.7s' }}>
                <div className="card-elevated">
                  <div className="p-8">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="icon-container-success">
                        <span className="text-xl">📊</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        Wochenübersicht
                      </h3>
                    </div>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Erfolgreiche Tage</span>
                        <span className="text-lg font-bold text-success-600">5/7</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill-success" style={{ width: '71%' }}></div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>Diese Woche</span>
                        <span>71% Erfolgsrate</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>

        {/* Toast Renderer */}
        <ToastRenderer />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const dashboardData = await getDashboardData();
    const child = await getChild('1'); // Default child for demo

    return {
      props: {
        dashboardData,
        child,
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    
    return {
      notFound: true,
    };
  }
}; 