import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, HelpCircle, Phone, Mail, MessageCircle } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

interface FAQPageProps {
  faqs: FAQItem[];
  categories: string[];
}

const FAQPage: React.FC<FAQPageProps> = ({ faqs, categories }) => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredFAQs = selectedCategory === 'All' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  return (
    <>
      <NextSeo
        title="FAQ - Explorer Nature"
        description="Find answers to frequently asked questions about our tours, bookings, safety, and services. Get help with your travel planning."
        canonical="https://explorernature.com/faq"
        openGraph={{
          title: 'FAQ - Explorer Nature',
          description: 'Find answers to frequently asked questions about our tours, bookings, safety, and services.',
          images: [
            {
              url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
              width: 1200,
              height: 630,
              alt: 'FAQ - Explorer Nature',
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
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex items-center justify-center mb-6"
              >
                <HelpCircle className="w-16 h-16 text-white mr-4" />
                <h1 className="text-5xl md:text-6xl font-serif font-bold text-white">
                  FAQ
                </h1>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-white/90 max-w-3xl mx-auto"
              >
                Find answers to frequently asked questions about our tours, bookings, and services.
              </motion.p>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-20 bg-white dark:bg-sand-900">
          <div className="container-custom section-padding">
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-6 py-3 rounded-full font-medium transition-colors ${
                  selectedCategory === 'All'
                    ? 'bg-primary-600 text-white'
                    : 'bg-sand-100 dark:bg-sand-800 text-sand-700 dark:text-sand-300 hover:bg-primary-100 dark:hover:bg-primary-900'
                }`}
              >
                All Questions
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary-600 text-white'
                      : 'bg-sand-100 dark:bg-sand-800 text-sand-700 dark:text-sand-300 hover:bg-primary-100 dark:hover:bg-primary-900'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* FAQ Items */}
            <div className="max-w-4xl mx-auto">
              {filteredFAQs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white dark:bg-sand-800 rounded-xl shadow-soft mb-4 overflow-hidden"
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-sand-50 dark:hover:bg-sand-700 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-sand-900 dark:text-sand-100 pr-4">
                      {faq.question}
                    </h3>
                    {openItems.includes(faq.id) ? (
                      <ChevronUp className="w-6 h-6 text-primary-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-primary-600 flex-shrink-0" />
                    )}
                  </button>
                  
                  {openItems.includes(faq.id) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-8 pb-6"
                    >
                      <p className="text-sand-600 dark:text-sand-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Support */}
        <section className="py-20 bg-sand-50 dark:bg-sand-800">
          <div className="container-custom section-padding">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-serif font-bold text-sand-900 dark:text-sand-100 mb-6">
                Still Have Questions?
              </h2>
              <p className="text-xl text-sand-600 dark:text-sand-400 mb-8">
                Can't find what you're looking for? Our support team is here to help you.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white dark:bg-sand-700 rounded-xl p-8 shadow-soft">
                  <Phone className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-sand-900 dark:text-sand-100 mb-2">
                    Call Us
                  </h3>
                  <p className="text-sand-600 dark:text-sand-400 mb-4">
                    Speak directly with our support team
                  </p>
                  <a 
                    href="tel:+8801704439665"
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    +880 1704-439665
                  </a>
                </div>

                <div className="bg-white dark:bg-sand-700 rounded-xl p-8 shadow-soft">
                  <Mail className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-sand-900 dark:text-sand-100 mb-2">
                    Email Us
                  </h3>
                  <p className="text-sand-600 dark:text-sand-400 mb-4">
                    Send us your questions via email
                  </p>
                  <a 
                    href="mailto:asifmahamud669@gmail.com"
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    asifmahamud669@gmail.com
                  </a>
                </div>

                <div className="bg-white dark:bg-sand-700 rounded-xl p-8 shadow-soft">
                  <MessageCircle className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-sand-900 dark:text-sand-100 mb-2">
                    Live Chat
                  </h3>
                  <p className="text-sand-600 dark:text-sand-400 mb-4">
                    Chat with us in real-time
                  </p>
                  <a 
                    href="/contact"
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Start Chat
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const faqs: FAQItem[] = [
    {
      id: 1,
      question: "What is included in the tour price?",
      answer: "All our tours include transportation, professional guide, safety equipment, and refreshments. Specific inclusions vary by tour - check the tour details page for complete information.",
      category: "Booking"
    },
    {
      id: 2,
      question: "What should I bring on a tour?",
      answer: "We recommend comfortable clothing, sunglasses, sunscreen, a hat, and a camera. We provide all safety equipment and most refreshments. Specific requirements will be provided upon booking.",
      category: "Preparation"
    },
    {
      id: 3,
      question: "Are tours suitable for children?",
      answer: "Yes! Most of our tours are family-friendly. Children under 5 years old may have restrictions on certain activities for safety reasons. Please check with us before booking.",
      category: "Safety"
    },
    {
      id: 4,
      question: "What happens if the weather is bad?",
      answer: "Safety is our priority. We monitor weather conditions closely and may modify or reschedule tours if necessary. Full refunds are available for weather-related cancellations.",
      category: "Weather"
    },
    {
      id: 5,
      question: "Can I customize a tour for my group?",
      answer: "Absolutely! We offer private tours and can customize experiences based on your group size, interests, and requirements. Contact us to discuss your needs.",
      category: "Customization"
    },
    {
      id: 6,
      question: "What is your cancellation policy?",
      answer: "Free cancellation up to 24 hours before your tour. Within 24 hours, cancellation fees may apply. Full details are provided at booking.",
      category: "Booking"
    },
    {
      id: 7,
      question: "Do you provide transportation?",
      answer: "Yes, all our tours include transportation from designated pickup points. We use comfortable, air-conditioned vehicles for your convenience.",
      category: "Transportation"
    },
    {
      id: 8,
      question: "Are meals included in the tour?",
      answer: "Refreshments and snacks are included in most tours. Full meals are included in overnight tours. Specific meal arrangements are detailed in each tour description.",
      category: "Meals"
    },
    {
      id: 9,
      question: "What safety measures do you have?",
      answer: "We provide comprehensive safety equipment, trained guides, and follow strict safety protocols. All our guides are certified in first aid and emergency procedures.",
      category: "Safety"
    },
    {
      id: 10,
      question: "Can I book a tour for a large group?",
      answer: "Yes, we accommodate groups of all sizes. For groups over 20 people, we offer special rates and customized itineraries. Contact us for group booking details.",
      category: "Group Booking"
    }
  ];

  const categories = ["All", "Booking", "Preparation", "Safety", "Weather", "Customization", "Transportation", "Meals", "Group Booking"];

  return {
    props: {
      faqs,
      categories,
    },
    revalidate: 3600,
  };
};

export default FAQPage;

