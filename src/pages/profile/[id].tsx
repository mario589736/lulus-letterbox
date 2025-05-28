import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { Child, DashboardData } from '@/types';
import { fetchChildById, fetchDashboardData } from '@/lib/api';
import SEOHead from '@/components/SEOHead';

interface ChildProfileProps {
  child: Child | null;
  dashboardData: DashboardData | null;
}

export default function ChildProfile({ child, dashboardData }: ChildProfileProps) {
  if (!child || !dashboardData) {
    return (
      <>
        <SEOHead
          title="Kind nicht gefunden"
          description="Das angeforderte Kinderprofil konnte nicht gefunden werden."
          url="https://lulus-letterbox.de/profile/not-found"
        />
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Kind nicht gefunden</h1>
            <p className="text-gray-600 mb-8">Das Kinderprofil, das Sie suchen, existiert nicht.</p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
            >
              ← Zurück zum Dashboard
            </Link>
          </div>
        </div>
      </>
    );
  }

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    const ageInMonths = (today.getFullYear() - birth.getFullYear()) * 12 + (today.getMonth() - birth.getMonth());
    
    if (ageInMonths < 12) {
      return `${ageInMonths} Monate`;
    } else {
      const years = Math.floor(ageInMonths / 12);
      const months = ageInMonths % 12;
      return months > 0 ? `${years} Jahre, ${months} Monate` : `${years} Jahre`;
    }
  };

  const getThemeEmoji = (theme: string) => {
    const themes: { [key: string]: string } = {
      'Prinzessin': '👑',
      'Dinosaurier': '🦕',
      'Autos': '🚗',
      'Tiere': '🐻',
      'Weltraum': '🚀',
      'Blumen': '🌸',
    };
    return themes[theme] || '⭐';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      <SEOHead
        title={`${child.name}s Profil`}
        description={`${child.name}s Toilettentraining-Profil mit personalisierten Postkarten von Lulu's Letterbox.`}
        url={`https://lulus-letterbox.de/profile/${child.id}`}
        type="article"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
        <main className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Navigation */}
          <nav className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              ← Zurück zum Dashboard
            </Link>
          </nav>

          {/* Kinderprofil Header */}
          <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center text-6xl shadow-lg">
                  {getThemeEmoji(child.favoriteTheme || '')}
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{child.name}</h1>
                <p className="text-gray-600 mb-4">{calculateAge(child.birthDate)} alt</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <span className="text-gray-500">Lieblingsthema:</span>
                    <p className="font-medium text-gray-800">{child.favoriteTheme}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <span className="text-gray-500">Lieblingsfarbe:</span>
                    <p className="font-medium text-gray-800">{child.favoriteColor}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <span className="text-gray-500">Geschlecht:</span>
                    <p className="font-medium text-gray-800 capitalize">{child.gender}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <span className="text-gray-500">Profil erstellt:</span>
                    <p className="font-medium text-gray-800">
                      {child.createdAt ? formatDate(child.createdAt) : 'Unbekannt'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Statistiken */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="text-3xl mb-2">📮</div>
              <div className="text-2xl font-bold text-primary-600">{dashboardData.stats.totalPostcards}</div>
              <div className="text-gray-600">Postkarten gesamt</div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="text-3xl mb-2">✅</div>
              <div className="text-2xl font-bold text-green-600">{dashboardData.stats.deliveredPostcards}</div>
              <div className="text-gray-600">Zugestellt</div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="text-3xl mb-2">🎯</div>
              <div className="text-2xl font-bold text-yellow-600">{dashboardData.milestones.filter(m => !m.isCompleted).length}</div>
              <div className="text-gray-600">Aktive Meilensteine</div>
            </div>
          </section>

          {/* Aktuelle Meilensteine */}
          <section className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="text-2xl mr-2">🎯</span>
              Aktuelle Meilensteine
            </h2>
            
            <div className="space-y-4">
              {dashboardData.milestones.filter(m => !m.isCompleted).map((milestone) => (
                <div key={milestone.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">{milestone.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{milestone.title}</h3>
                      <p className="text-gray-600 text-sm">{milestone.description}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Postkarten Historie */}
          <section className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="text-2xl mr-2">📅</span>
              Timeline
            </h2>
            
            {dashboardData.timeline.length > 0 ? (
              <div className="space-y-4">
                {dashboardData.timeline.map((entry) => (
                  <div key={entry.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-lg">{entry.icon}</span>
                          <span className="font-semibold text-gray-800">{entry.title}</span>
                        </div>
                        <p className="text-sm text-gray-600">{entry.description}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(entry.date).toLocaleDateString('de-DE')}
                        </p>
                      </div>
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
          </section>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<ChildProfileProps> = async (context) => {
  const { id } = context.params!;
  
  try {
    const child = await fetchChildById(id as string);
    let dashboardData = null;
    
    if (child) {
      dashboardData = await fetchDashboardData();
    }
    
    return {
      props: {
        child,
        dashboardData,
      },
    };
  } catch (error) {
    console.error('Error fetching child profile:', error);
    
    return {
      props: {
        child: null,
        dashboardData: null,
      },
    };
  }
}; 