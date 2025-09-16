import React, { useState, useEffect } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useGeoCurrency } from '@/context/GeoCurrencyContext';
import {
  Star,
  Clock,
  Users,
  MapPin,
  Calendar,
  Heart,
  Share2,
  Camera,
  ChevronLeft,
  ChevronRight,
  Check,
  AlertCircle,
  Phone,
  Mail,
} from 'lucide-react';
import { Tour } from '@/types';
import toast from 'react-hot-toast';

interface TourDetailPageProps {
  tour: Tour;
  relatedTours: Tour[];
}

const TourDetailPage: React.FC<TourDetailPageProps> = ({ tour, relatedTours }) => {
  const router = useRouter();
  const { formatPrice } = useGeoCurrency();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAllItinerary, setShowAllItinerary] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    toast.success(
      isFavorite ? 'Removed from favorites' : 'Added to favorites'
    );
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: tour.title,
          text: tour.shortDescription,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard');
    }
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % tour.images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + tour.images.length) % tour.images.length);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-5 h-5 text-gold-400 fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="w-5 h-5 text-sand-300" />
          <Star className="w-5 h-5 text-gold-400 fill-current absolute inset-0 overflow-hidden" />
        </div>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-5 h-5 text-sand-300" />
      );
    }

    return stars;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'challenging':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-sand-100 text-sand-800 dark:bg-sand-800 dark:text-sand-200';
    }
  };

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Tours', href: '/tours' },
    { label: tour.title, href: '' },
  ];

  return (
    <>
      <NextSeo
        title={`${tour.title} - Explorer Nature`}
        description={tour.shortDescription}
        canonical={`https://explorernature.com/tours/${tour.slug}`}
        openGraph={{
          title: tour.title,
          description: tour.shortDescription,
          images: [
            {
              url: tour.images[0],
              width: 1200,
              height: 630,
              alt: tour.title,
            },
          ],
        }}
      />

      <Layout>
        {/* Breadcrumbs */}
        <div className="py-4 bg-sand-50 dark:bg-sand-900">
          <div className="container-custom section-padding">
            <Breadcrumbs items={breadcrumbItems} />
          </div>
        </div>

        <div className="py-8">
          <div className="container-custom section-padding">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Image Gallery */}
                <div className="mb-8">
                  <div className="relative h-96 md:h-[500px] rounded-xl overflow-hidden">
                    <Image
                      src={tour.images[selectedImageIndex]}
                      alt={tour.title}
                      fill
                      className="object-cover"
                      priority
                    />
                    
                    {/* Navigation Arrows */}
                    {tour.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 hover:bg-white text-sand-600 rounded-full shadow-soft transition-all duration-200"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 hover:bg-white text-sand-600 rounded-full shadow-soft transition-all duration-200"
                          aria-label="Next image"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>
                      </>
                    )}

                    {/* Image Counter */}
                    {tour.images.length > 1 && (
                      <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-sand-600">
                        {selectedImageIndex + 1} / {tour.images.length}
                      </div>
                    )}
                  </div>

                  {/* Thumbnail Gallery */}
                  {tour.images.length > 1 && (
                    <div className="grid grid-cols-4 gap-2 mt-4">
                      {tour.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImageIndex(index)}
                          className={`relative h-20 rounded-lg overflow-hidden ${
                            index === selectedImageIndex
                              ? 'ring-2 ring-primary-600'
                              : 'opacity-70 hover:opacity-100'
                          } transition-opacity duration-200`}
                        >
                          <Image
                            src={image}
                            alt={`${tour.title} ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Tour Information */}
                <div className="space-y-8">
                  {/* Title and Rating */}
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h1 className="text-4xl font-serif font-bold text-sand-900 dark:text-sand-100 mb-2">
                          {tour.title}
                        </h1>
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="flex items-center space-x-1">
                            {renderStars(tour.rating)}
                          </div>
                          <span className="text-lg font-medium text-sand-700 dark:text-sand-300">
                            {tour.rating}
                          </span>
                          <span className="text-sand-500 dark:text-sand-500">
                            ({tour.reviewsCount} reviews)
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={handleFavoriteToggle}
                          className="p-3 bg-white dark:bg-sand-800 rounded-full shadow-soft hover:shadow-medium transition-all duration-200"
                          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                        >
                          <Heart
                            className={`w-5 h-5 ${
                              isFavorite
                                ? 'text-red-500 fill-current'
                                : 'text-sand-600 dark:text-sand-400'
                            }`}
                          />
                        </button>
                        <button
                          onClick={handleShare}
                          className="p-3 bg-white dark:bg-sand-800 rounded-full shadow-soft hover:shadow-medium transition-all duration-200"
                          aria-label="Share tour"
                        >
                          <Share2 className="w-5 h-5 text-sand-600 dark:text-sand-400" />
                        </button>
                      </div>
                    </div>

                    {/* Tour Details */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-5 h-5 text-primary-600" />
                        <div>
                          <div className="text-sm text-sand-500 dark:text-sand-500">Duration</div>
                          <div className="font-medium text-sand-900 dark:text-sand-100">{tour.duration}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-5 h-5 text-primary-600" />
                        <div>
                          <div className="text-sm text-sand-500 dark:text-sand-500">Group Size</div>
                          <div className="font-medium text-sand-900 dark:text-sand-100">{tour.groupSize}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-5 h-5 text-primary-600" />
                        <div>
                          <div className="text-sm text-sand-500 dark:text-sand-500">Location</div>
                          <div className="font-medium text-sand-900 dark:text-sand-100">{tour.location}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-5 h-5 text-primary-600" />
                        <div>
                          <div className="text-sm text-sand-500 dark:text-sand-500">Category</div>
                          <div className="font-medium text-sand-900 dark:text-sand-100 capitalize">{tour.category}</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 mb-6">
                      <span
                        className={`text-sm font-medium px-3 py-1 rounded-full ${getDifficultyColor(
                          tour.difficulty
                        )}`}
                      >
                        {tour.difficulty} Level
                      </span>
                      {tour.featured && (
                        <span className="bg-primary-600 text-white text-sm px-3 py-1 rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-sand-900 dark:text-sand-100 mb-4">
                      About This Tour
                    </h2>
                    <p className="text-sand-700 dark:text-sand-300 leading-relaxed">
                      {tour.longDescription}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-sand-900 dark:text-sand-100 mb-4">
                      Tour Highlights
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {tour.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sand-700 dark:text-sand-300">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Itinerary */}
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-sand-900 dark:text-sand-100 mb-4">
                      Itinerary
                    </h2>
                    <div className="space-y-4">
                      {(showAllItinerary ? tour.itinerary : tour.itinerary.slice(0, 3)).map((item, index) => (
                        <div key={index} className="flex items-start space-x-4 p-4 bg-sand-50 dark:bg-sand-800 rounded-lg">
                          <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-sand-900 dark:text-sand-100">
                                {item.activity}
                              </span>
                              <span className="text-sm text-sand-500 dark:text-sand-500">
                                {item.duration}
                              </span>
                            </div>
                            <div className="text-sm text-sand-600 dark:text-sand-400">
                              {item.time}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {tour.itinerary.length > 3 && (
                      <button
                        onClick={() => setShowAllItinerary(!showAllItinerary)}
                        className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
                      >
                        {showAllItinerary ? 'Show Less' : `Show All ${tour.itinerary.length} Activities`}
                      </button>
                    )}
                  </div>

                  {/* What's Included */}
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-sand-900 dark:text-sand-100 mb-4">
                      What's Included
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {tour.includes.map((item, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sand-700 dark:text-sand-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-8">
                  <div className="bg-white dark:bg-sand-800 rounded-xl shadow-soft border border-sand-200 dark:border-sand-700 p-6">
                    {/* Price */}
                    <div className="text-center mb-6">
                      <div className="text-4xl font-bold text-primary-600 mb-2">
                        {isClient ? formatPrice(tour.price) : `BDT ${tour.price.toLocaleString()}`}
                      </div>
                      <div className="text-sand-500 dark:text-sand-500">
                        per person
                      </div>
                    </div>

                    {/* Booking Form */}
                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="label">Select Date</label>
                        <input
                          type="date"
                          className="input"
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      <div>
                        <label className="label">Number of Guests</label>
                        <select className="input">
                          <option value="1">1 Guest</option>
                          <option value="2">2 Guests</option>
                          <option value="3">3 Guests</option>
                          <option value="4">4 Guests</option>
                          <option value="5">5 Guests</option>
                          <option value="6">6 Guests</option>
                        </select>
                      </div>
                    </div>

                    {/* Book Now Button */}
                    <Link 
                      href={`/booking?package=${encodeURIComponent(tour.title)}&price=${tour.price}&duration=${tour.duration}&location=${tour.location}`}
                      className="btn-primary w-full py-4 text-lg font-semibold mb-4 text-center block"
                    >
                      Book Now
                    </Link>

                    {/* Contact Info */}
                    <div className="border-t border-sand-200 dark:border-sand-700 pt-4">
                      <p className="text-sm text-sand-600 dark:text-sand-400 text-center mb-3">
                        Need help? Contact us directly
                      </p>
                      <div className="flex items-center justify-center space-x-4">
                        <a
                          href="tel:+97141234567"
                          className="flex items-center space-x-2 text-primary-600 hover:text-primary-700"
                        >
                          <Phone className="w-4 h-4" />
                          <span className="text-sm">Call</span>
                        </a>
                        <a
                          href="mailto:info@explorernature.com"
                          className="flex items-center space-x-2 text-primary-600 hover:text-primary-700"
                        >
                          <Mail className="w-4 h-4" />
                          <span className="text-sm">Email</span>
                        </a>
                      </div>
                    </div>

                    {/* Important Notes */}
                    <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-1">
                            Important Notes
                          </h4>
                          <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                            <li>• Free cancellation up to 24 hours before</li>
                            <li>• Weather-dependent activity</li>
                            <li>• Minimum age: 5 years</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Tours */}
            {relatedTours.length > 0 && (
              <section className="mt-16">
                <h2 className="text-3xl font-serif font-bold text-sand-900 dark:text-sand-100 mb-8 text-center">
                  You Might Also Like
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {relatedTours.slice(0, 3).map((relatedTour, index) => (
                    <div key={relatedTour.id} className="card hover-lift cursor-pointer">
                      <Link href={`/tours/${relatedTour.slug}`}>
                        <div className="relative h-48 overflow-hidden rounded-t-xl">
                          <Image
                            src={relatedTour.images[0]}
                            alt={relatedTour.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-serif font-bold text-sand-900 dark:text-sand-100 mb-2">
                            {relatedTour.title}
                          </h3>
                          <p className="text-sand-600 dark:text-sand-400 text-sm mb-4">
                            {relatedTour.shortDescription}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-primary-600">
                              {isClient ? formatPrice(relatedTour.price) : `BDT ${relatedTour.price.toLocaleString()}`}
                            </span>
                            <span className="text-sm text-sand-500 dark:text-sand-500">
                              {relatedTour.duration}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const tours = await import('@/data/tours.json');
  
  const paths = tours.default.map((tour: Tour) => ({
    params: { slug: tour.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const tours = await import('@/data/tours.json');
  
  const tour = tours.default.find((t: Tour) => t.slug === params?.slug);
  
  if (!tour) {
    return {
      notFound: true,
    };
  }

  // Get related tours (same category, excluding current tour)
  const relatedTours = tours.default
    .filter((t: Tour) => t.id !== tour.id && t.category === tour.category)
    .slice(0, 3);

  return {
    props: {
      tour,
      relatedTours,
    },
    revalidate: 3600, // Revalidate every hour
  };
};

export default TourDetailPage;
