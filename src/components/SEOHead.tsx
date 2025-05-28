import Head from 'next/head';
import { SEOProps } from '@/types';

interface SEOHeadProps extends SEOProps {
  keywords?: string;
  children?: React.ReactNode;
}

export default function SEOHead({
  title,
  description,
  keywords,
  image = 'https://picsum.photos/1200/630?random=lulu',
  url = 'https://lulus-letterbox.de',
  type = 'website',
  locale = 'de-DE',
  children,
}: SEOHeadProps) {
  const fullTitle = title.includes('|') ? title : `${title} | Lulu's Letterbox`;
  const defaultKeywords = "Toilettentraining, Postkarten, Kinder, Meilensteine, personalisiert, Deutschland, Österreich";

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="language" content="German" />
      <meta httpEquiv="content-language" content={locale} />
      <link rel="icon" href="/favicon.ico" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={locale} />
      <meta property="og:site_name" content="Lulu's Letterbox" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Additional tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Lulu's Letterbox" />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <link rel="canonical" href={url} />

      {children}
    </Head>
  );
} 