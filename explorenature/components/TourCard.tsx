import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Clock, Users, MapPin, ArrowRight, Heart } from 'lucide-react';
import { Tour } from '@/types';
import { useGeoCurrency } from '@/context/GeoCurrencyContext';

interface TourCardProps {
  tour: Tour;
  index?: number;
  onFavoriteToggle?: (tourId: number) => void;
  isFavorite?: boolean;
}

const TourCard: React.FC<TourCardProps> = ({
  tour,
  index = 0,
  onFavoriteToggle,
  isFavorite = false,
}) => {
  const [isClient, setIsClient] = useState(false);
  const { formatPrice } = useGeoCurrency();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onFavoriteToggle) {
      onFavoriteToggle(tour.id);
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 text-gold-400 fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="w-4 h-4 text-sand-300" />
          <Star className="w-4 h-4 text-gold-400 fill-current absolute inset-0 overflow-hidden" />
        </div>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-4 h-4 text-sand-300" />
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="tour-card group"
    >
      <Link href={`/tours/${tour.slug}`}>
        <div className="relative overflow-hidden rounded-t-xl">
          {/* Featured Badge */}
          {tour.featured && (
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                Featured
              </span>
            </div>
          )}

          {/* Favorite Button */}
          {onFavoriteToggle && (
            <button
              onClick={handleFavoriteClick}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white text-sand-600 rounded-full shadow-soft transition-all duration-200"
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart
                className={`w-5 h-5 ${
                  isFavorite
                    ? 'text-red-500 fill-current'
                    : 'text-sand-600 hover:text-red-500'
                } transition-colors duration-200`}
              />
            </button>
          )}

          {/* Tour Image */}
          <div className="relative h-64 overflow-hidden">
            <Image
              src={tour.images[0]}
              alt={tour.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={(e) => {
                console.error('Image failed to load:', tour.images[0]);
                e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-sand-900/20 to-transparent" />
          </div>

          {/* Price Tag */}
          <div className="absolute bottom-4 left-4 z-10">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
              <span className="text-2xl font-bold text-primary-600">{formatPrice(tour.price)}</span>
              <span className="text-sm text-sand-600 ml-1">/person</span>
            </div>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6">
          {/* Category & Difficulty */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-primary-600 uppercase tracking-wide">
              {tour.category}
            </span>
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full ${getDifficultyColor(
                tour.difficulty
              )}`}
            >
              {tour.difficulty}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-serif font-bold text-sand-900 dark:text-sand-100 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
            {tour.title}
          </h3>

          {/* Description */}
          <p className="text-sand-600 dark:text-sand-400 text-sm mb-4 line-clamp-2">
            {tour.shortDescription}
          </p>

          {/* Tour Details */}
          <div className="flex items-center space-x-4 mb-4 text-sm text-sand-500 dark:text-sand-500">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{tour.duration}</span>
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              <span>{tour.groupSize}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{tour.location}</span>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                {renderStars(tour.rating)}
              </div>
              <span className="text-sm font-medium text-sand-700 dark:text-sand-300">
                {tour.rating}
              </span>
              <span className="text-sm text-sand-500 dark:text-sand-500">
                ({tour.reviewsCount} reviews)
              </span>
            </div>
          </div>

          {/* Highlights */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {tour.highlights.slice(0, 2).map((highlight, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-sand-100 dark:bg-sand-800 text-sand-600 dark:text-sand-400 px-2 py-1 rounded"
                >
                  {highlight}
                </span>
              ))}
              {tour.highlights.length > 2 && (
                <span className="text-xs text-sand-500 dark:text-sand-500">
                  +{tour.highlights.length - 2} more
                </span>
              )}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-sand-500 dark:text-sand-500">
              From {isClient ? formatPrice(tour.price) : `BDT ${tour.price.toLocaleString()}`}/person
            </span>
            <div className="flex items-center text-primary-600 dark:text-primary-400 font-medium text-sm group-hover:translate-x-1 transition-transform duration-200">
              <span>View Details</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </div>
          
          {/* Book Now Button */}
          <Link 
            href={`/booking?package=${encodeURIComponent(tour.title)}&price=${tour.price}&duration=${tour.duration}&location=${tour.location}`}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-center block"
            onClick={(e) => e.stopPropagation()}
          >
            Book Now
          </Link>
        </div>
      </Link>
    </motion.div>
  );
};

export default TourCard;

