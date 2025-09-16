import React from 'react';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { 
  Award, 
  Users, 
  Heart, 
  Globe, 
  Shield, 
  Star,
  MapPin,
  Clock,
  Phone,
  Mail
} from 'lucide-react';

interface AboutPageProps {
  stats: Array<{
    iconName: 'Users' | 'Award' | 'Star' | 'Globe';
    number: string;
    label: string;
  }>;
}

const AboutPage: React.FC<AboutPageProps> = ({ stats }) => {
  const teamMembers = [
    {
      name: 'Asif Mahamud Shaon',
      role: 'Founder & CEO',
      image: '/founder-picture.jpg',
      description: 'Passionate travel enthusiast and founder of Explorer Nature, dedicated to creating unforgettable travel experiences across Bangladesh and Asia.',
      linkedin: 'https://www.linkedin.com/in/asif-mahamud-shaon1/',
      email: 'asifmahamud669@gmail.com'
    },
  ];

  const companyStats = [
    {
      number: '50+',
      label: 'Happy Guests',
      icon: Users
    },
    {
      number: '1',
      label: 'Years Experience',
      icon: Award
    },
    {
      number: '5+',
      label: 'Countries Served',
      icon: Globe
    },
    {
      number: '4.9',
      label: 'Average Rating',
      icon: Star
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Passion for Adventure',
      description: 'We believe every journey should be filled with wonder and excitement.',
    },
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Your safety is our top priority with comprehensive protocols and equipment.',
    },
    {
      icon: Globe,
      title: 'Sustainable Tourism',
      description: 'We promote responsible travel that preserves our beautiful desert environment.',
    },
    {
      icon: Users,
      title: 'Authentic Experiences',
      description: 'Connect with local culture and traditions through genuine interactions.',
    },
  ];

  return (
    <>
      <NextSeo
        title="About Us - Explorer Nature"
        description="Learn about Explorer Nature's mission to provide unforgettable desert adventures. Meet our team and discover our commitment to safety, sustainability, and authentic experiences."
        canonical="https://explorernature.com/about"
        openGraph={{
          title: 'About Us - Explorer Nature',
          description: 'Learn about Explorer Nature\'s mission to provide unforgettable desert adventures. Meet our team and discover our commitment to safety, sustainability, and authentic experiences.',
          images: [
            {
              url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
              width: 1200,
              height: 630,
              alt: 'About Explorer Nature',
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
                About Explorer Nature
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-white/90 max-w-3xl mx-auto"
              >
                We're passionate about sharing the magic of the Arabian desert with travelers 
                from around the world, creating unforgettable memories and authentic experiences.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gradient-to-r from-primary-600 to-gold-600">
          <div className="container-custom section-padding">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {companyStats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center text-white"
                  >
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                      <IconComponent className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-4xl font-bold text-white mb-2">
                      {stat.number}
                    </h3>
                    <p className="text-white/90 text-lg font-medium">
                      {stat.label}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20 bg-sand-50 dark:bg-sand-800">
          <div className="container-custom section-padding">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl font-serif font-bold text-sand-900 dark:text-sand-100 mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-sand-700 dark:text-sand-300">
                  <p>
                    Founded in 2025 by Asif Mahamud Shaon, a passionate travel enthusiast, 
                    Explorer Nature began as a small operation with a simple mission: to 
                    showcase the breathtaking beauty and rich culture of Bangladesh to 
                    the world.
                  </p>
                  <p>
                    What started as weekend adventures exploring Cox's Bazar and Bandarban 
                    with friends has grown into one of Bangladesh's most trusted tour 
                    operators, serving thousands of guests from over 50 countries. Our 
                    success comes from our unwavering commitment to safety, authenticity, 
                    and creating truly memorable experiences.
                  </p>
                  <p>
                    Today, we're proud to offer a diverse range of experiences, from 
                    beach adventures at Cox's Bazar to hill treks in Bandarban, and 
                    international tours to India, Nepal, Bhutan, Thailand, and Malaysia. 
                    All designed to showcase the unique charm of Bangladesh and our 
                    neighboring countries.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="relative h-96 rounded-xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop"
                    alt="Our team in the desert"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-600 rounded-full opacity-20" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="py-20 bg-white dark:bg-sand-900">
          <div className="container-custom section-padding">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-serif font-bold text-sand-900 dark:text-sand-100 mb-6">
                Our Values
              </h2>
              <p className="text-xl text-sand-600 dark:text-sand-400 max-w-3xl mx-auto">
                These core values guide everything we do, from tour planning to guest 
                interactions and environmental responsibility.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start space-x-4 p-6 bg-sand-50 dark:bg-sand-800 rounded-xl"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                    <value.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-sand-900 dark:text-sand-100 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sand-600 dark:text-sand-400">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-sand-50 dark:bg-sand-800">
          <div className="container-custom section-padding">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-serif font-bold text-sand-900 dark:text-sand-100 mb-6">
                Meet Our Team
              </h2>
              <p className="text-xl text-sand-600 dark:text-sand-400 max-w-3xl mx-auto">
                Meet the founder and CEO of Explorer Nature, dedicated to creating 
                unforgettable travel experiences across Bangladesh and Asia.
              </p>
            </motion.div>

            <div className="flex justify-center">
              <div className="max-w-md">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-2xl font-semibold text-sand-900 dark:text-sand-100 mb-2">
                      {member.name}
                    </h3>
                    <div className="text-primary-600 dark:text-primary-400 font-medium mb-3 text-lg">
                      {member.role}
                    </div>
                    <p className="text-sand-600 dark:text-sand-400 text-lg mb-6">
                      {member.description}
                    </p>
                    
                    {/* Contact Information */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-center gap-2">
                        <Mail className="w-5 h-5 text-primary-600" />
                        <a 
                          href={`mailto:${member.email}`}
                          className="text-primary-600 hover:text-primary-700 font-medium"
                        >
                          {member.email}
                        </a>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        <a 
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:text-primary-700 font-medium"
                        >
                          LinkedIn Profile
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Awards Section */}
        <section className="py-20 bg-white dark:bg-sand-900">
          <div className="container-custom section-padding">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-serif font-bold text-sand-900 dark:text-sand-100 mb-6">
                Awards & Recognition
              </h2>
              <p className="text-xl text-sand-600 dark:text-sand-400 max-w-3xl mx-auto">
                We're honored to be recognized by industry leaders and our guests for 
                excellence in Bangladesh tourism and customer service.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center p-8 bg-sand-50 dark:bg-sand-800 rounded-xl"
              >
                <Award className="w-12 h-12 text-gold-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-sand-900 dark:text-sand-100 mb-2">
                  Best Tour Operator 2025
                </h3>
                <p className="text-sand-600 dark:text-sand-400">
                  Bangladesh Tourism Excellence Awards
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-center p-8 bg-sand-50 dark:bg-sand-800 rounded-xl"
              >
                <Star className="w-12 h-12 text-gold-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-sand-900 dark:text-sand-100 mb-2">
                  5-Star Rating
                </h3>
                <p className="text-sand-600 dark:text-sand-400">
                  TripAdvisor Travelers' Choice
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center p-8 bg-sand-50 dark:bg-sand-800 rounded-xl"
              >
                <Shield className="w-12 h-12 text-gold-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-sand-900 dark:text-sand-100 mb-2">
                  Bangladesh Tourism Excellence Awards
                </h3>
                <p className="text-sand-600 dark:text-sand-400">
                  Outstanding Service Excellence 2025
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary-600 to-gold-600">
          <div className="container-custom section-padding">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h2 className="text-4xl font-serif font-bold text-white mb-6">
                Ready for Your Adventure?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied guests who have experienced the magic of 
                the desert with Explorer Nature.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/tours"
                  className="btn bg-white text-primary-600 hover:bg-sand-100 font-semibold px-8 py-4"
                >
                  Explore Tours
                </a>
                <a
                  href="/contact"
                  className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold px-8 py-4"
                >
                  Contact Us
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const stats = [
    {
      iconName: 'Users',
      number: '10,000+',
      label: 'Happy Guests',
    },
    {
      iconName: 'Award',
      number: '8',
      label: 'Years Experience',
    },
    {
      iconName: 'Star',
      number: '4.9',
      label: 'Average Rating',
    },
    {
      iconName: 'Globe',
      number: '50+',
      label: 'Countries Served',
    },
  ];

  return {
    props: {
      stats,
    },
    revalidate: 3600,
  };
};

export default AboutPage;

