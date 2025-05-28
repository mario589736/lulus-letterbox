import { GetStaticProps } from 'next';
import { useState } from 'react';
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
  const [selectedMilestone, setSelectedMilestone] = useState<string | null>(null);
  const { success, ToastRenderer } = useToast();

  const handleMilestoneClick = (milestoneId: string) => {
    setSelectedMilestone(milestoneId);
    success(
      'Meilenstein ausgewählt!',
      'Du kannst hier später Fortschritte markieren.'
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
        {/* Header with Dark Mode Toggle */}
        <div className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center animate-float">
                  <span className="text-white font-bold text-lg">L</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white font-playful">
                    Lulus Briefkasten
                  </h1>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Post für kleine Helden
                  </p>
                </div>
              </div>

              {/* Dark Mode Toggle */}
              <DarkModeToggle />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Header */}
          <div className="mb-8 animate-slide-up">
            <DashboardHeader child={child} />
          </div>

          {/* Stats Overview */}
          <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <StatsOverview stats={dashboardData.stats} />
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Milestones */}
            <div className="lg:col-span-2 space-y-8">
              {/* Milestone Progress */}
              <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="bg-gradient-to-r from-primary-500 to-secondary-500 px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-white text-lg">🎯</span>
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-white">
                          Meilensteine
                        </h2>
                        <p className="text-sm text-white/80">
                          {child.name}s Töpfchentraining-Fortschritt
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <MilestoneProgress
                      milestones={dashboardData.milestones}
                      onMilestoneClick={handleMilestoneClick}
                    />
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft-lg border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Schnellaktionen
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button className="group p-4 bg-gradient-to-r from-success-100 to-success-200 dark:from-success-800 dark:to-success-700 rounded-xl border border-success-300 dark:border-success-600 hover:shadow-soft-lg transition-all duration-200 hover:scale-105">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-success-500 rounded-full flex items-center justify-center group-hover:animate-bounce-soft">
                          <span className="text-white text-lg">✅</span>
                        </div>
                        <div className="text-left">
                          <div className="font-medium text-success-800 dark:text-success-200">
                            Erfolg melden
                          </div>
                          <div className="text-sm text-success-600 dark:text-success-300">
                            Meilenstein erreicht!
                          </div>
                        </div>
                      </div>
                    </button>

                    <button className="group p-4 bg-gradient-to-r from-secondary-100 to-secondary-200 dark:from-secondary-800 dark:to-secondary-700 rounded-xl border border-secondary-300 dark:border-secondary-600 hover:shadow-soft-lg transition-all duration-200 hover:scale-105">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-secondary-500 rounded-full flex items-center justify-center group-hover:animate-wiggle">
                          <span className="text-white text-lg">📮</span>
                        </div>
                        <div className="text-left">
                          <div className="font-medium text-secondary-800 dark:text-secondary-200">
                            Postkarte bestellen
                          </div>
                          <div className="text-sm text-secondary-600 dark:text-secondary-300">
                            Neue Überraschung
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Timeline */}
            <div className="space-y-8">
              {/* Recent Activity */}
              <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="bg-gradient-to-r from-warning-400 to-warning-500 px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-white text-lg">📅</span>
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-white">
                          Aktivitäten
                        </h2>
                        <p className="text-sm text-white/80">
                          Neueste Ereignisse
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <PostcardTimeline timeline={dashboardData.timeline} />
                  </div>
                </div>
              </div>

              {/* Motivational Card */}
              <div className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
                <div className="bg-gradient-to-br from-soft-yellow to-soft-pink rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-soft-lg">
                  <div className="text-center">
                    <div className="text-4xl mb-3 animate-float">🌟</div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Du machst das toll!
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {child.name} ist auf dem besten Weg! Jeder kleine Schritt ist ein großer Erfolg. 
                      Lulu und Kacka sind stolz auf euch beide! 💪
                    </p>
                    <div className="mt-4 flex items-center justify-center space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full flex items-center justify-center animate-bounce-soft">
                        <span className="text-xs">💖</span>
                      </div>
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Lulu</span>
                      <div className="w-6 h-6 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce-soft" style={{ animationDelay: '0.2s' }}>
                        <span className="text-xs">💩</span>
                      </div>
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Kacka</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Support Card */}
              <div className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-lg">💬</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Brauchst du Hilfe?
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                        Unser Support-Team hilft dir gerne bei Fragen rund um Lulus Briefkasten!
                      </p>
                      <button className="px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm font-medium rounded-lg hover:shadow-glow transition-all duration-200 hover:scale-105">
                        Support kontaktieren
                      </button>
                    </div>
                  </div>
                </div>
              </div>
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