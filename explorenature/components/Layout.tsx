import React, { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import { DefaultSeo } from 'next-seo';
import Navbar from './Navbar';
import Footer from './Footer';
import { SEOProps } from '@/types';

interface LayoutProps {
  children: ReactNode;
  seo?: SEOProps;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, seo, className = '' }) => {
  const defaultSEO = {
    title: 'Explorer Nature - Premium Desert Tours & Adventures',
    description: 'Discover the magic of the Arabian desert with our premium tours. Experience thrilling safaris, cultural heritage walks, and overnight camping under the stars.',
    canonical: 'https://explorernature.com',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://explorernature.com',
      siteName: 'Explorer Nature',
      title: 'Explorer Nature - Premium Desert Tours & Adventures',
      description: 'Discover the magic of the Arabian desert with our premium tours. Experience thrilling safaris, cultural heritage walks, and overnight camping under the stars.',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200',
          width: 1200,
          height: 630,
          alt: 'Desert Safari Adventure',
        },
      ],
    },
    twitter: {
      handle: '@explorernature',
      site: '@explorernature',
      cardType: 'summary_large_image',
    },
    additionalMetaTags: [
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        name: 'theme-color',
        content: '#f1760a',
      },
    ],
  };

  const mergedSEO = { ...defaultSEO, ...seo };

  return (
    <>
      <DefaultSeo {...mergedSEO} />
      <div className={`min-h-screen flex flex-col ${className}`}>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'var(--toast-bg, #363636)',
              color: 'var(--toast-color, #fff)',
            },
            success: {
              style: {
                background: '#10b981',
                color: '#fff',
              },
              iconTheme: {
                primary: '#fff',
                secondary: '#10b981',
              },
            },
            error: {
              style: {
                background: '#ef4444',
                color: '#fff',
              },
              iconTheme: {
                primary: '#fff',
                secondary: '#ef4444',
              },
            },
          }}
        />
      </div>
    </>
  );
};

export default Layout;

