import React, { useState, useMemo, useEffect } from 'react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import Layout from '@/components/Layout';
import TourCard from '@/components/TourCard';
import SearchFilter from '@/components/SearchFilter';
import { Tour, Category, SearchFilters } from '@/types';
import { Grid, List, SlidersHorizontal } from 'lucide-react';

interface ToursPageProps {
  tours: Tour[];
  categories: Category[];
}

const ToursPage: React.FC<ToursPageProps> = ({ tours, categories }) => {
  const router = useRouter();
  const [filters, setFilters] = useState<SearchFilters>({});
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'duration'>('rating');

  // Handle URL parameters on page load
  useEffect(() => {
    if (router.isReady) {
      const { destination, minPrice, maxPrice, duration, category } = router.query;
      
      const newFilters: SearchFilters = {};
      
      // Handle destination
      if (destination) {
        const destinationMap: { [key: string]: string } = {
          'cox-bazar': 'Cox\'s Bazar Beach Paradise',
          'saint-martin': 'Saint Martin Island Escape',
          'bandarban': 'Bandarban Hill Tribe Tour',
          'sylhet': 'Sylhet Sada Pathor Adventure',
          'sundarban': 'Sundarban Mangrove Forest Safari',
          'international': 'India Golden Triangle Tour'
        };
        
        const searchTerm = destinationMap[destination as string] || destination as string;
        newFilters.keyword = searchTerm;
      }
      
      // Handle price range
      if (minPrice) {
        newFilters.minPrice = parseInt(minPrice as string);
      }
      if (maxPrice) {
        newFilters.maxPrice = parseInt(maxPrice as string);
      }
      
      // Handle duration
      if (duration) {
        newFilters.duration = duration as string;
      }
      
      // Handle category
      if (category) {
        newFilters.category = category as string;
      }
      
      setFilters(newFilters);
    }
  }, [router.isReady, router.query]);

  // Filter and sort tours
  const filteredAndSortedTours = useMemo(() => {
    let filtered = tours.filter((tour) => {
      // Keyword filter - only match tour title
      if (filters.keyword) {
        const keyword = filters.keyword.toLowerCase();
        const tourTitle = tour.title.toLowerCase();
        const matchesKeyword = tourTitle.includes(keyword) || keyword.includes(tourTitle.split(' ')[0]);
        if (!matchesKeyword) return false;
      }

      // Category filter
      if (filters.category && tour.category !== filters.category) {
        return false;
      }

      // Price range filter
      if (filters.minPrice && tour.price < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice && tour.price > filters.maxPrice) {
        return false;
      }

      // Duration filter
      if (filters.duration) {
        const tourDuration = tour.duration.toLowerCase();
        const filterDuration = filters.duration.toLowerCase();
        if (!tourDuration.includes(filterDuration.split(' ')[0])) {
          return false;
        }
      }

      // Difficulty filter
      if (filters.difficulty && tour.difficulty !== filters.difficulty) {
        return false;
      }

      return true;
    });

    // Sort tours
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'rating':
          return b.rating - a.rating;
        case 'duration':
          // Extract numeric duration for sorting
          const aDuration = parseInt(a.duration.split(' ')[0]);
          const bDuration = parseInt(b.duration.split(' ')[0]);
          return aDuration - bDuration;
        default:
          return 0;
      }
    });

    return filtered;
  }, [tours, filters, sortBy]);

  const handleFiltersChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
  };

  return (
    <>
      <NextSeo
        title="Desert Tours & Adventures - Explorer Nature"
        description="Explore our collection of premium desert tours and cultural adventures. From thrilling safaris to overnight camping, discover the magic of the Arabian desert."
        canonical="https://explorernature.com/tours"
        openGraph={{
          title: 'Desert Tours & Adventures - Explorer Nature',
          description: 'Explore our collection of premium desert tours and cultural adventures. From thrilling safaris to overnight camping, discover the magic of the Arabian desert.',
          images: [
            {
              url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200',
              width: 1200,
              height: 630,
              alt: 'Desert Tours',
            },
          ],
        }}
      />

      <Layout>
        {/* Hero Section */}
        <section className="relative py-32 bg-gradient-to-br from-primary-600 to-gold-600">
          <div className="absolute inset-0 bg-black/30" />
          <div className="container-custom section-padding relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="text-white/80 text-sm mb-4">
                Home | Tours
              </div>
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-wider">
                TOUR PACKAGES
              </h1>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 bg-white">
          <div className="container-custom section-padding">
            {/* Header with Search and View Controls */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
              <h2 className="text-4xl font-bold text-sand-900 mb-6 lg:mb-0">
                OUR TOUR PACKAGES
              </h2>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
                {/* Search Bar */}
                <div className="relative flex-1 sm:flex-none">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full sm:w-64 px-4 py-3 pr-10 border border-sand-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    value={filters.keyword || ''}
                    onChange={(e) => setFilters({...filters, keyword: e.target.value})}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <svg className="w-5 h-5 text-sand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center bg-sand-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors duration-200 ${
                      viewMode === 'grid'
                        ? 'bg-white text-primary-600 shadow-sm'
                        : 'text-sand-600 hover:text-sand-900'
                    }`}
                    aria-label="Grid view"
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-colors duration-200 ${
                      viewMode === 'list'
                        ? 'bg-white text-primary-600 shadow-sm'
                        : 'text-sand-600 hover:text-sand-900'
                    }`}
                    aria-label="List view"
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-3 mb-8">
              <button
                onClick={() => setFilters({...filters, category: undefined})}
                className={`px-6 py-3 rounded-full font-medium transition-colors duration-200 ${
                  !filters.category
                    ? 'bg-primary-600 text-white'
                    : 'bg-sand-100 text-sand-700 hover:bg-sand-200'
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category.slug}
                  onClick={() => setFilters({...filters, category: category.slug})}
                  className={`px-6 py-3 rounded-full font-medium transition-colors duration-200 ${
                    filters.category === category.slug
                      ? 'bg-primary-600 text-white'
                      : 'bg-sand-100 text-sand-700 hover:bg-sand-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Tours Grid/List */}
            {filteredAndSortedTours.length > 0 ? (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                    : 'space-y-6'
                }
              >
                {filteredAndSortedTours.map((tour, index) => (
                  <TourCard
                    key={tour.id}
                    tour={tour}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <SlidersHorizontal className="w-16 h-16 text-sand-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-sand-900 mb-2">
                  No tours found
                </h3>
                <p className="text-sand-600 mb-6">
                  Try adjusting your search criteria or browse all available tours.
                </p>
                <button
                  onClick={() => setFilters({})}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {filteredAndSortedTours.length > 0 && (
              <div className="flex justify-center items-center space-x-2 mt-12">
                <button className="p-2 rounded-lg text-sand-600 hover:text-sand-900 hover:bg-sand-100">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium">01</button>
                <button className="px-4 py-2 text-sand-600 hover:text-sand-900 hover:bg-sand-100 rounded-lg font-medium">02</button>
                <button className="px-4 py-2 text-sand-600 hover:text-sand-900 hover:bg-sand-100 rounded-lg font-medium">03</button>
                <span className="px-2 text-sand-400">...</span>
                <button className="px-4 py-2 text-sand-600 hover:text-sand-900 hover:bg-sand-100 rounded-lg font-medium">10</button>
                <button className="p-2 rounded-lg text-sand-600 hover:text-sand-900 hover:bg-sand-100">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </section>
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const tours = await import('@/data/tours.json');
  const categories = await import('@/data/categories.json');

  return {
    props: {
      tours: tours.default,
      categories: categories.default,
    },
    revalidate: 3600, // Revalidate every hour
  };
};

export default ToursPage;

