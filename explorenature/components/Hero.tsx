import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Star, Users, Clock, MapPin } from 'lucide-react';
import { Tour } from '@/types';
import { useGeoCurrency } from '@/context/GeoCurrencyContext';

interface HeroProps {
  tours?: Tour[];
}

const Hero: React.FC<HeroProps> = ({ tours = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const { formatPrice } = useGeoCurrency();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Filter tours that have local images (not stock images)
  const toursWithLocalImages = tours.filter(tour => 
    tour.images && tour.images.length > 0 && 
    tour.images[0].includes('/Image/')
  );

  // Use actual tours data with local images - minimum 5 tours
  const heroSlides = toursWithLocalImages.slice(0, Math.max(5, toursWithLocalImages.length)).map(tour => ({
    id: tour.id,
    image: tour.images[0],
    title: tour.title,
    subtitle: tour.location,
    description: tour.shortDescription,
    price: tour.price,
    duration: tour.duration,
    rating: tour.rating,
    reviewsCount: tour.reviewsCount,
    groupSize: tour.groupSize,
  }));

  // Debug: Log the first few slides
  if (heroSlides.length > 0) {
    console.log('Hero slides:', heroSlides.slice(0, 3).map(slide => ({ title: slide.title, image: slide.image })));
  }

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const currentSlideData = heroSlides[currentSlide];

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src={currentSlideData.image}
            alt={currentSlideData.title}
            fill
            className="object-cover"
            priority
            onError={(e) => {
              console.error('Hero image failed to load:', currentSlideData.image, e);
            }}
          />
          <div className="hero-overlay" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container-custom section-padding">
          <div className="max-w-3xl">
            <motion.div
              key={`content-${currentSlide}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white mb-6"
              >
                <Star className="w-4 h-4 text-gold-400 mr-2" />
                <span className="text-sm font-medium">
                  {currentSlideData.rating} • {currentSlideData.reviewsCount} Reviews
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-4 text-shadow"
              >
                {currentSlideData.title}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-xl md:text-2xl text-white/90 mb-6 font-medium"
              >
                {currentSlideData.subtitle}
              </motion.p>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="text-lg text-white/80 mb-8 leading-relaxed max-w-2xl"
              >
                {currentSlideData.description}
              </motion.p>

              {/* Tour Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="flex flex-wrap items-center gap-6 mb-8"
              >
                <div className="flex items-center text-white/90">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{currentSlideData.duration}</span>
                </div>
                <div className="flex items-center text-white/90">
                  <Users className="w-5 h-5 mr-2" />
                  <span>{currentSlideData.groupSize}</span>
                </div>
                <div className="flex items-center text-white/90">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{currentSlideData.subtitle}</span>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  href={`/booking?package=${encodeURIComponent(currentSlideData.title)}&price=${currentSlideData.price}&duration=${currentSlideData.duration}&location=${currentSlideData.subtitle}`}
                  className="btn bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-4 text-lg"
                >
                  Book Now
                </Link>
                <Link
                  href="/tours"
                  className="btn bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 text-lg backdrop-blur-sm border border-white/20"
                >
                  Explore Tours
                </Link>
                <button className="btn bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 text-lg backdrop-blur-sm border border-white/20">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Video
                </button>
              </motion.div>

              {/* Price */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.6 }}
                className="mt-8"
              >
                <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                  <span className="text-white/80 text-lg">Starting from</span>
                  <span className="text-3xl font-bold text-white ml-3">
                    {isClient ? formatPrice(currentSlideData.price) : `BDT ${currentSlideData.price.toLocaleString()}`}
                  </span>
                  <span className="text-white/80 text-sm ml-1">/person</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center space-x-4">
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-sm transition-colors duration-200"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Slide Indicators */}
          <div className="flex space-x-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-white scale-125'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-sm transition-colors duration-200"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 right-8 text-white/60"
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm font-medium">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;

