import React from 'react';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { 
  Mountain, 
  Castle, 
  Moon, 
  Users, 
  Star, 
  Clock, 
  MapPin,
  Shield,
  Award,
  Heart
} from 'lucide-react';

interface TourCategoryProps {
  categories: Array<{
    id: string;
    title: string;
    description: string;
    iconName: string;
    features: string[];
    duration: string;
    difficulty: string;
    price: string;
    image: string;
    highlights: string[];
  }>;
}

const TourCategoriesPage: React.FC<TourCategoryProps> = ({ categories }) => {
  return (
    <>
      <NextSeo
        title="Tour Categories - Explorer Nature"
        description="Explore our diverse range of tour categories including Desert Safari, Ancient Forts, Overnight Camping, and Cultural Heritage tours across Bangladesh."
        canonical="https://explorernature.com/tours-categories"
        openGraph={{
          title: 'Tour Categories - Explorer Nature',
          description: 'Explore our diverse range of tour categories including Desert Safari, Ancient Forts, Overnight Camping, and Cultural Heritage tours across Bangladesh.',
          images: [
            {
              url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
              width: 1200,
              height: 630,
              alt: 'Tour Categories - Explorer Nature',
            },
          ],
        }}
      />
      
      <Layout>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-primary-600 to-gold-600">
          <div className="absolute inset-0 bg-black/20" />
          <div className="container-custom section-padding relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-6xl font-serif font-bold text-white mb-6"
              >
                Tour Categories
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-white/90 max-w-3xl mx-auto"
              >
                Discover our diverse range of tour experiences designed to showcase the best of Bangladesh's natural beauty and cultural heritage.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Tour Categories Grid */}
        <section className="py-20 bg-white dark:bg-sand-900">
          <div className="container-custom section-padding">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {categories.map((category, index) => {
                const getIconComponent = (iconName: string) => {
                  switch (iconName) {
                    case 'Mountain': return Mountain;
                    case 'Castle': return Castle;
                    case 'Moon': return Moon;
                    case 'Users': return Users;
                    default: return Mountain;
                  }
                };
                const IconComponent = getIconComponent(category.iconName);
                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white dark:bg-sand-800 rounded-2xl shadow-soft overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    {/* Category Image */}
                    <div className="relative h-64">
                      <img
                        src={category.image}
                        alt={category.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Category Content */}
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-sand-900 dark:text-sand-100 mb-4">
                        {category.title}
                      </h3>
                      
                      <p className="text-sand-600 dark:text-sand-400 mb-6 text-lg">
                        {category.description}
                      </p>

                      {/* Category Info */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center">
                          <Clock className="w-5 h-5 text-primary-600 mx-auto mb-2" />
                          <p className="text-sm text-sand-500 dark:text-sand-500">Duration</p>
                          <p className="font-semibold text-sand-900 dark:text-sand-100">{category.duration}</p>
                        </div>
                        <div className="text-center">
                          <Star className="w-5 h-5 text-primary-600 mx-auto mb-2" />
                          <p className="text-sm text-sand-500 dark:text-sand-500">Difficulty</p>
                          <p className="font-semibold text-sand-900 dark:text-sand-100">{category.difficulty}</p>
                        </div>
                        <div className="text-center">
                          <Award className="w-5 h-5 text-primary-600 mx-auto mb-2" />
                          <p className="text-sm text-sand-500 dark:text-sand-500">From</p>
                          <p className="font-semibold text-sand-900 dark:text-sand-100">{category.price}</p>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-sand-900 dark:text-sand-100 mb-3">
                          What's Included:
                        </h4>
                        <ul className="space-y-2">
                          {category.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center text-sand-600 dark:text-sand-400">
                              <Heart className="w-4 h-4 text-primary-600 mr-3 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Highlights */}
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-sand-900 dark:text-sand-100 mb-3">
                          Highlights:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {category.highlights.map((highlight, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* CTA Button */}
                      <a
                        href="/tours"
                        className="btn-primary w-full text-center block"
                      >
                        Explore {category.title} Tours
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-sand-50 dark:bg-sand-800">
          <div className="container-custom section-padding">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-sand-900 dark:text-sand-100 mb-6">
                Why Choose Our Tours?
              </h2>
              <p className="text-xl text-sand-600 dark:text-sand-400 max-w-3xl mx-auto">
                We're committed to providing unforgettable experiences with the highest standards of safety, comfort, and authenticity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                  <Award className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-sand-900 dark:text-sand-100 mb-2">
                  Award Winning
                </h3>
                <p className="text-sand-600 dark:text-sand-400">
                  Recognized as the best tour operator in Bangladesh.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-sand-900 dark:text-sand-100 mb-2">
                  Authentic Experience
                </h3>
                <p className="text-sand-600 dark:text-sand-400">
                  Connect with local culture and traditions through genuine interactions.
                </p>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const categories = [
    {
      id: 'desert-safari',
      title: 'Desert Safari',
      description: 'Experience the thrill of desert adventures with our guided safari tours. Explore sand dunes, enjoy camel rides, and witness breathtaking sunsets in the heart of Bangladesh\'s desert landscapes.',
      iconName: 'Mountain',
      features: [
        'Professional desert guide',
        'Camel riding experience',
        'Sunset photography session',
        'Traditional desert camp',
        'Safety equipment included',
        'Refreshments and snacks'
      ],
      duration: '4-6 hours',
      difficulty: 'Easy',
      price: 'BDT 3,500',
      image: '/Image/Tour Categories/Desert Safari.jpg',
      highlights: ['Sand Dunes', 'Camel Ride', 'Sunset View', 'Desert Camp']
    },
    {
      id: 'ancient-forts',
      title: 'Ancient Forts',
      description: 'Discover the rich historical heritage of Bangladesh through our ancient forts tours. Visit magnificent fortresses, learn about their fascinating history, and immerse yourself in centuries-old architecture.',
      iconName: 'Castle',
      features: [
        'Historical expert guide',
        'Fort exploration tour',
        'Historical documentation',
        'Photography opportunities',
        'Cultural insights',
        'Transportation included'
      ],
      duration: '6-8 hours',
      difficulty: 'Moderate',
      price: 'BDT 4,200',
      image: '/Image/Tour Categories/Ancient Forts.jpg',
      highlights: ['Historical Sites', 'Architecture', 'Cultural Heritage', 'Photography']
    },
    {
      id: 'overnight-camping',
      title: 'Overnight Camping',
      description: 'Spend a magical night under the stars with our overnight camping experiences. Enjoy bonfires, stargazing, traditional music, and wake up to stunning sunrise views in nature\'s embrace.',
      iconName: 'Moon',
      features: [
        'Tent accommodation',
        'Bonfire and stargazing',
        'Traditional dinner',
        'Morning breakfast',
        'Safety equipment',
        'Professional guide'
      ],
      duration: '24 hours',
      difficulty: 'Moderate',
      price: 'BDT 5,800',
      image: '/Image/Tour Categories/Overnight Camping.jpg',
      highlights: ['Stargazing', 'Bonfire', 'Tent Stay', 'Sunrise View']
    },
    {
      id: 'cultural-heritage',
      title: 'Cultural Heritage',
      description: 'Immerse yourself in Bangladesh\'s rich cultural heritage through our guided tours. Visit traditional villages, meet local artisans, and experience authentic cultural practices and traditions.',
      iconName: 'Users',
      features: [
        'Cultural expert guide',
        'Village visits',
        'Artisan workshops',
        'Traditional performances',
        'Local cuisine tasting',
        'Cultural documentation'
      ],
      duration: '8-10 hours',
      difficulty: 'Easy',
      price: 'BDT 4,500',
      image: '/Image/Tour Categories/Cultural Heritage.jpg',
      highlights: ['Village Life', 'Artisan Work', 'Traditional Music', 'Local Cuisine']
    }
  ];

  return {
    props: {
      categories,
    },
    revalidate: 3600,
  };
};

export default TourCategoriesPage;
