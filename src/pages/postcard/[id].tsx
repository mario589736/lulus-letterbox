import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PostcardContent, Child } from '@/types';
import { fetchPostcardContent, fetchChildById } from '@/lib/api';
import SEOHead from '@/components/SEOHead';

interface PostcardPageProps {
  postcard: PostcardContent | null;
  child: Child | null;
}

export default function PostcardPage({ postcard, child }: PostcardPageProps) {
  if (!postcard || !child) {
    return (
      <>
        <SEOHead
          title="Postkarte nicht gefunden"
          description="Die angeforderte Postkarte konnte nicht gefunden werden."
          url="https://lulus-letterbox.de/postcard/not-found"
        />
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Postkarte nicht gefunden</h1>
            <p className="text-gray-600 mb-8">Die Postkarte, die Sie suchen, existiert nicht.</p>
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'preview':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Freigegeben';
      case 'preview':
        return 'Vorschau';
      case 'rejected':
        return 'Abgelehnt';
      default:
        return 'Entwurf';
    }
  };

  return (
    <>
      <SEOHead
        title={`${postcard.title} - Postkarte für ${child.name}`}
        description={`Personalisierte Postkarte für ${child.name}: ${postcard.title}`}
        url={`https://lulus-letterbox.de/postcard/${postcard.id}`}
        image={postcard.illustration}
        type="article"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto px-4 py-4 max-w-4xl">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors"
              >
                ← Zurück zum Dashboard
              </Link>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(postcard.status)}`}>
                {getStatusText(postcard.status)}
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Postkarten-Vorschau */}
            <div className="grid lg:grid-cols-2 gap-8 p-8">
              {/* Illustration */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Postkarten-Illustration
                </h2>
                <div className="relative aspect-[3/4] bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src={postcard.illustration}
                    alt={`Illustration für ${postcard.title}`}
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Overlay mit Lulu & Kacka Branding */}
                  <div className="absolute top-4 left-4 bg-white/90 rounded-lg px-3 py-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">💌</span>
                      <span className="text-sm font-medium text-primary-600">
                        Lulu&apos;s Letterbox
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nachricht */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Persönliche Nachricht
                  </h2>
                  <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-primary-600 mb-4">
                      {postcard.title}
                    </h3>
                    <div className="prose prose-sm text-gray-700">
                      {postcard.message.split('\n').map((line, index) => (
                        <p key={index} className="mb-2">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Personalisierung */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Personalisierungsdetails
                  </h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Name:</span>
                      <span className="font-medium">{child.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lieblingsthema:</span>
                      <span className="font-medium">{child.favoriteTheme}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lieblingsfarbe:</span>
                      <span className="font-medium">{child.favoriteColor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Geschlecht:</span>
                      <span className="font-medium capitalize">{child.gender}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Aktions-Buttons */}
            {postcard.status === 'preview' && (
              <div className="border-t border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <p className="text-gray-600">
                    Gefällt Ihnen diese Postkarte? Geben Sie sie frei oder hinterlassen Sie Feedback.
                  </p>
                  <div className="flex space-x-4">
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      Feedback geben
                    </button>
                    <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                      Freigeben
                    </button>
                  </div>
                </div>
              </div>
            )}

            {postcard.status === 'approved' && (
              <div className="border-t border-gray-200 p-6 bg-green-50">
                <div className="flex items-center justify-center text-green-700">
                  <span className="text-lg mr-2">✅</span>
                  <span className="font-medium">Diese Postkarte wurde freigegeben und wird gedruckt!</span>
                </div>
              </div>
            )}
          </div>

          {/* Feedback Section */}
          {postcard.parentFeedback && (
            <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <span className="text-xl mr-2">💬</span>
                Ihr Feedback
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700">{postcard.parentFeedback}</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<PostcardPageProps> = async (context) => {
  const { id } = context.params!;
  
  try {
    const postcard = await fetchPostcardContent(id as string);
    let child = null;
    
    if (postcard) {
      child = await fetchChildById(postcard.childId);
    }
    
    return {
      props: {
        postcard,
        child,
      },
    };
  } catch (error) {
    console.error('Error fetching postcard:', error);
    
    return {
      props: {
        postcard: null,
        child: null,
      },
    };
  }
}; 