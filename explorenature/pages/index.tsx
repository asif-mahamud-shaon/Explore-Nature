import React from 'react';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import TourCard from '@/components/TourCard';
import Carousel from '@/components/Carousel';
import { Tour, Testimonial } from '@/types';
import { Star, Users, Award, Shield } from 'lucide-react';

interface HomePageProps {
  featuredTours: Tour[];
  allTours: Tour[];
  testimonials: Testimonial[];
}

const HomePage: React.FC<HomePageProps> = ({ featuredTours, allTours, testimonials }) => {
  return (
    <>
      <NextSeo
        title="Explorer Nature - Premium Desert Tours & Adventures"
        description="Discover the magic of the Arabian desert with our premium tours. Experience thrilling safaris, cultural heritage walks, and overnight camping under the stars."
        canonical="https://explorernature.com"
        openGraph={{
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
        }}
      />
      
      <Layout>
        {/* Hero Section */}
        <Hero tours={allTours} />

        {/* Featured Tours Section */}
        <section className="py-20 gradient-bg">
          <div className="container-custom section-padding">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-sand-900 dark:text-sand-100 mb-6">
                Featured Adventures
              </h2>
              <p className="text-xl text-sand-600 dark:text-sand-400 max-w-3xl mx-auto">
                Discover our most popular tours that showcase the best of the Arabian desert 
                and cultural heritage.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredTours.slice(0, 3).map((tour, index) => (
                <TourCard key={tour.id} tour={tour} index={index} />
              ))}
            </div>

            <div className="text-center mt-12">
              <a
                href="/tours"
                className="btn-primary text-lg px-8 py-4"
              >
                View All Tours
              </a>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-white dark:bg-sand-900">
          <div className="container-custom section-padding">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-sand-900 dark:text-sand-100 mb-6">
                Why Choose Explorer Nature?
              </h2>
              <p className="text-xl text-sand-600 dark:text-sand-400 max-w-3xl mx-auto">
                We're committed to providing unforgettable experiences with the highest 
                standards of safety, comfort, and authenticity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-sand-900 dark:text-sand-100 mb-2">
                  5-Star Rated
                </h3>
                <p className="text-sand-600 dark:text-sand-400">
                  Consistently rated 4.8+ stars by our guests across all platforms.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-sand-900 dark:text-sand-100 mb-2">
                  Expert Guides
                </h3>
                <p className="text-sand-600 dark:text-sand-400">
                  Professional, multilingual guides with deep local knowledge.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-sand-900 dark:text-sand-100 mb-2">
                  Safety First
                </h3>
                <p className="text-sand-600 dark:text-sand-400">
                  All tours include comprehensive safety equipment and protocols.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-sand-900 dark:text-sand-100 mb-2">
                  Award Winning
                </h3>
                <p className="text-sand-600 dark:text-sand-400">
                  Recognized as the best desert tour operator in the region.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 gradient-bg">
          <div className="container-custom section-padding">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-sand-900 dark:text-sand-100 mb-6">
                What Our Guests Say
              </h2>
              <p className="text-xl text-sand-600 dark:text-sand-400 max-w-3xl mx-auto">
                Don't just take our word for it. Here's what our guests have to say 
                about their experiences with us.
              </p>
            </div>

            <Carousel
              autoPlay={true}
              autoPlayInterval={5000}
              className="max-w-6xl mx-auto"
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white dark:bg-sand-800 rounded-xl p-8 shadow-soft mx-4">
                  <div className="flex items-center mb-6">
                    <div className="flex space-x-1 mr-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < testimonial.rating
                              ? 'text-gold-400 fill-current'
                              : 'text-sand-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-sand-500 dark:text-sand-500">
                      {testimonial.date}
                    </span>
                  </div>

                  <blockquote className="text-lg text-sand-700 dark:text-sand-300 mb-6 italic">
                    "{testimonial.review}"
                  </blockquote>

                  <div className="flex items-center">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <div className="font-semibold text-sand-900 dark:text-sand-100">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-sand-500 dark:text-sand-500">
                        {testimonial.location}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </section>

      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Import JSON data
  const tours = await import('@/data/tours.json');
  const testimonials = await import('@/data/testimonials.json');

  // Filter featured tours
  const featuredTours = tours.default.filter((tour: Tour) => tour.featured);

  return {
    props: {
      featuredTours,
      allTours: tours.default,
      testimonials: testimonials.default,
    },
    revalidate: 3600, // Revalidate every hour
  };
};

export default HomePage;

