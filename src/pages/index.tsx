import { GetStaticProps } from 'next';
import { DashboardData } from '@/types';
import { fetchDashboardData } from '@/lib/api';
import SEOHead from '@/components/SEOHead';
import DashboardHeader from '@/components/DashboardHeader';
import MilestoneProgress from '@/components/MilestoneProgress';
import PostcardTimeline from '@/components/PostcardTimeline';
import StatsOverview from '@/components/StatsOverview';

interface HomeProps {
  dashboardData: DashboardData | null;
}

export default function Home({ dashboardData }: HomeProps) {
  if (!dashboardData) {
    return (
      <>
        <SEOHead
          title="Willkommen"
          description="Willkommen bei Lulu's Letterbox - Personalisierte Postkarten für das Toilettentraining"
          url="https://lulus-letterbox.de"
          type="website"
        />
        
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-8">
            <div className="text-6xl mb-4">🚽💌</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Willkommen bei Lulu&apos;s Letterbox!
            </h1>
            <p className="text-gray-600 mb-8">
              Personalisierte Postkarten, die Ihr Kind beim Toilettentraining motivieren und jeden Meilenstein feiern.
            </p>
            <div className="space-y-4">
              <button className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                Jetzt registrieren
              </button>
              <button className="w-full border border-primary-600 text-primary-600 py-3 px-6 rounded-lg font-medium hover:bg-primary-50 transition-colors">
                Anmelden
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  const { child, totalPostcards, deliveredPostcards, upcomingPostcards, currentMilestones, recentPostcards, progressTimeline } = dashboardData;

  return (
    <>
      <SEOHead
        title={`${child.name}s Fortschritt`}
        description={`Verfolgen Sie ${child.name}s Toilettentraining-Fortschritt mit personalisierten Postkarten von Lulu's Letterbox.`}
        url={`https://lulus-letterbox.de/dashboard/${child.id}`}
        type="website"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
        {/* Header */}
        <DashboardHeader child={child} />

        <main className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Statistiken Übersicht */}
          <StatsOverview 
            totalPostcards={totalPostcards}
            deliveredPostcards={deliveredPostcards}
            upcomingPostcards={upcomingPostcards}
          />

          <div className="grid lg:grid-cols-3 gap-8 mt-8">
            {/* Meilenstein Fortschritt */}
            <div className="lg:col-span-2">
              <MilestoneProgress 
                milestones={currentMilestones}
                childName={child.name}
              />
            </div>

            {/* Aktuelle Postkarten */}
            <div>
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="text-2xl mr-2">📮</span>
                  Aktuelle Postkarten
                </h3>
                
                {recentPostcards.length > 0 ? (
                  <div className="space-y-4">
                    {recentPostcards.map((postcard) => (
                      <div key={postcard.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            postcard.status === 'delivered' ? 'bg-green-100 text-green-800' :
                            postcard.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                            postcard.status === 'printed' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {postcard.status === 'delivered' ? 'Zugestellt' :
                             postcard.status === 'shipped' ? 'Versendet' :
                             postcard.status === 'printed' ? 'Gedruckt' :
                             'Geplant'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {postcard.status === 'delivered' ? `Zugestellt am ${new Date(postcard.estimatedDelivery || '').toLocaleDateString('de-DE')}` :
                           postcard.status === 'shipped' ? `Versendet am ${new Date(postcard.actualShippingDate || '').toLocaleDateString('de-DE')}` :
                           `Geplant für ${new Date(postcard.plannedShippingDate).toLocaleDateString('de-DE')}`}
                        </p>
                        {postcard.trackingNumber && (
                          <p className="text-xs text-gray-500 mt-1">
                            Sendungsnummer: {postcard.trackingNumber}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    Noch keine Postkarten geplant
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-8">
            <PostcardTimeline timeline={progressTimeline} />
          </div>
        </main>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  try {
    // In einer echten App würde hier der eingeloggte Benutzer ermittelt werden
    // Für die Demo verwenden wir das erste Kind
    const dashboardData = await fetchDashboardData('1');
    
    return {
      props: {
        dashboardData,
      },
      // Regenerate the page every hour for demo purposes
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    
    return {
      props: {
        dashboardData: null,
      },
      revalidate: 60,
    };
  }
}; 