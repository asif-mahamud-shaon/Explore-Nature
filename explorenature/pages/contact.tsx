import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import Layout from '@/components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  HelpCircle, 
  X, 
  Users, 
  Building, 
  CreditCard,
  ChevronRight,
  Send
} from 'lucide-react';

interface ContactPageProps {
  contactInfo: Array<{
    iconName: 'Phone' | 'Mail' | 'MapPin' | 'Clock';
    title: string;
    details: string[];
  }>;
}

const ContactPage: React.FC<ContactPageProps> = ({ contactInfo }) => {
  const [selectedModal, setSelectedModal] = useState<string | null>(null);
  const [showThankYou, setShowThankYou] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    businessName: '',
    message: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setShowThankYou(true);
    setFormData({
      title: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      businessName: '',
      message: ''
    });
  };

  const contactCards = [
    {
      id: 'existing-customers',
      title: 'Existing customers',
      icon: <Users className="w-8 h-8 text-orange-500" />,
      description: 'Already booked with us? Our customer support team will be able to answer your questions.',
      action: 'Contact us',
      color: 'bg-white'
    },
    {
      id: 'new-tour-customers',
      title: 'New tour customers',
      icon: <CreditCard className="w-8 h-8 text-orange-500" />,
      description: 'Looking to book a tour or adventure? Speak to our booking team for the best experience.',
      action: 'Contact us',
      color: 'bg-white'
    },
    {
      id: 'group-bookings',
      title: 'Group bookings',
      icon: <Building className="w-8 h-8 text-orange-500" />,
      description: 'Planning a group trip or corporate event? We\'ll connect you with our group specialist.',
      action: 'Contact us',
      color: 'bg-white'
    }
  ];

  const renderThankYouModal = () => {
    if (!showThankYou) return null;

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowThankYou(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl max-w-md w-full p-8 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Success Icon */}
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            {/* Thank You Message */}
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Thank You!
            </h2>
            
            <p className="text-gray-600 mb-6">
              Your message has been sent successfully. We will contact you as soon as possible.
            </p>

            <p className="text-sm text-gray-500 mb-6">
              Our team typically responds within 24 hours. For urgent matters, please call us at{' '}
              <span className="text-orange-500 font-medium">+880 1704-439665</span>
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  setShowThankYou(false);
                  setSelectedModal(null);
                }}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowThankYou(false);
                  setSelectedModal(null);
                  window.location.href = '/tours';
                }}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Explore Tours
              </button>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  const renderModal = () => {
    if (!selectedModal) return null;

    const card = contactCards.find(c => c.id === selectedModal);
    if (!card) return null;

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedModal(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">{card.title}</h2>
              <button
                onClick={() => setSelectedModal(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <p className="text-gray-600 mb-6">
                {card.description}
              </p>

              <p className="text-gray-600 mb-6">
                Have you checked our{' '}
                <a href="/faq" className="text-orange-500 hover:text-orange-600 underline">
                  Help centre
                </a>
                ? You might find the answer you're looking for there.
              </p>

              {/* Contact Information */}
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <span className="text-orange-500 font-medium">Email:</span>
                    <span className="ml-2 text-gray-700">asifmahamud669@gmail.com</span>
                  </div>
                  <div>
                    <span className="text-orange-500 font-medium">Phone:</span>
                    <span className="ml-2 text-gray-700">+880 1704-439665</span>
                  </div>
                  <div>
                    <span className="text-orange-500 font-medium">Hours:</span>
                    <span className="ml-2 text-gray-700">
                      Monday to Friday from 9:00am to 6:00pm, Saturday 10:00am to 4:00pm
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Please do not send personal information over email.
                </p>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Message us</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title *
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      required
                    >
                      <option value="">Please Select</option>
                      <option value="Mr.">Mr.</option>
                      <option value="Mrs.">Mrs.</option>
                      <option value="Ms.">Ms.</option>
                      <option value="Dr.">Dr.</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First name *
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last name *
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Business name (if applicable)
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    value={formData.businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone number *
                  </label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <>
      <NextSeo
        title="Get in Touch - Explorer Nature"
        description="Got a question? You might find the answer in our Help centre. Otherwise, see all the ways you can speak to our team below."
        canonical="https://explorernature.com/contact"
        openGraph={{
          title: 'Get in Touch - Explorer Nature',
          description: 'Got a question? You might find the answer in our Help centre. Otherwise, see all the ways you can speak to our team below.',
          images: [
            {
              url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200',
              width: 1200,
              height: 630,
              alt: 'Get in Touch - Explorer Nature',
            },
          ],
        }}
      />
      
      <Layout>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-slate-900 to-slate-800">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container-custom section-padding relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="text-white">
                <h1 className="text-6xl md:text-7xl font-bold mb-8 text-white drop-shadow-2xl" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  Get in touch
                </h1>
                <p className="text-xl md:text-2xl text-white/95 mb-8 leading-relaxed" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.6)' }}>
                  Got a question? You might find the answer in our{' '}
                  <a href="/faq" className="text-orange-400 hover:text-orange-300 underline font-semibold">
                    Help centre
                  </a>
                  . Otherwise, see all the ways you can speak to our team below.
                </p>
              </div>

              {/* Right Content - Customer Service Image */}
              <div className="relative">
                <div className="relative h-96 rounded-xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&crop=faces"
                    alt="Customer Service Team"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  
                  {/* Decorative Shapes */}
                  <div className="absolute top-4 right-4 w-16 h-16 bg-blue-500 rounded-lg"></div>
                  <div className="absolute bottom-4 left-4 w-12 h-12 bg-orange-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Cards Section */}
        <section className="py-20 bg-gray-50">
          <div className="container-custom section-padding">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {contactCards.map((card) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`${card.color} rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group`}
                  onClick={() => setSelectedModal(card.id)}
                >
                  <div className="flex items-center justify-between mb-4">
                    {card.icon}
                    <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-orange-500 transition-colors" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {card.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {card.description}
                  </p>
                  
                  <div className="text-orange-500 font-medium group-hover:text-orange-600 transition-colors">
                    {card.action} →
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Decorative Element */}
        <div className="relative">
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-400 rounded-full opacity-10 -translate-x-48 translate-y-24"></div>
        </div>

        {/* Render Modals */}
        {renderModal()}
        {renderThankYouModal()}
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const contactInfo = [
    {
      iconName: 'Phone' as const,
      title: 'Phone',
      details: ['+880 1704-439665', 'Available 24/7']
    },
    {
      iconName: 'Mail' as const,
      title: 'Email',
      details: ['asifmahamud669@gmail.com', 'We respond within 24 hours']
    },
    {
      iconName: 'MapPin' as const,
      title: 'Location',
      details: ['Dhaka, Bangladesh', 'Serving nationwide']
    },
    {
      iconName: 'Clock' as const,
      title: 'Hours',
      details: ['Mon-Fri: 9AM-6PM', 'Sat: 10AM-4PM']
    }
  ];

  return {
    props: {
      contactInfo,
    },
    revalidate: 3600,
  };
};

export default ContactPage;