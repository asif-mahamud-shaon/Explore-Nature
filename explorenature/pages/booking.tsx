import React, { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { Tour } from '@/types';
import { useGeoCurrency } from '@/context/GeoCurrencyContext';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Clock, 
  Check,
  ChevronLeft,
  ChevronRight,
  Shield,
  FileText
} from 'lucide-react';

interface BookingPageProps {
  tours: Tour[];
}

const BookingPage: React.FC<BookingPageProps> = ({ tours }) => {
  const router = useRouter();
  const { formatPrice } = useGeoCurrency();
  const [currentPackageIndex, setCurrentPackageIndex] = useState(0);
  const [formData, setFormData] = useState({
    title: 'Mr.',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    startDate: {
      day: '',
      month: '',
      year: ''
    },
    selectedTour: tours[0] || null,
    travelInsurance: false,
    termsAccepted: false
  });

  const [isClient, setIsClient] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle URL parameters for package selection
  useEffect(() => {
    if (router.isReady && router.query) {
      const { package: packageName, price, duration, location } = router.query;
      
      if (packageName) {
        // Find the tour by title
        const selectedTour = tours.find(tour => 
          tour.title.toLowerCase() === (packageName as string).toLowerCase()
        );
        
        if (selectedTour) {
          const tourIndex = tours.findIndex(tour => tour.id === selectedTour.id);
          setCurrentPackageIndex(tourIndex);
          setFormData(prev => ({
            ...prev,
            selectedTour: selectedTour
          }));
        }
      }
    }
  }, [router.isReady, router.query, tours]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedInputChange = (parentField: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [parentField]: {
        ...prev[parentField as keyof typeof prev] as any,
        [field]: value
      }
    }));
  };

  const nextPackage = () => {
    const newIndex = (currentPackageIndex + 1) % tours.length;
    setCurrentPackageIndex(newIndex);
    setFormData(prev => ({
      ...prev,
      selectedTour: tours[newIndex]
    }));
  };

  const prevPackage = () => {
    const newIndex = (currentPackageIndex - 1 + tours.length) % tours.length;
    setCurrentPackageIndex(newIndex);
    setFormData(prev => ({
      ...prev,
      selectedTour: tours[newIndex]
    }));
  };

  const selectPackage = (index: number) => {
    setCurrentPackageIndex(index);
    setFormData(prev => ({
      ...prev,
      selectedTour: tours[index]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      alert('Please accept the terms and conditions to proceed.');
      return;
    }
    
    // Here you would typically send the data to your backend
    console.log('Booking submitted:', formData);
    setIsSubmitted(true);
  };

  const currentTour = tours[currentPackageIndex];

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i);

  return (
    <>
      <NextSeo
        title="Booking Form - Explorer Nature"
        description="Book your dream tour with Explorer Nature. Fill out our easy booking form and start your adventure today."
        canonical="https://explorernature.com/booking"
        openGraph={{
          title: 'Booking Form - Explorer Nature',
          description: 'Book your dream tour with Explorer Nature. Fill out our easy booking form and start your adventure today.',
          images: [
            {
              url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
              width: 1200,
              height: 630,
              alt: 'Booking Form - Explorer Nature',
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
              <div className="text-white/80 text-sm mb-4">
                <Link href="/" className="hover:text-white">Home</Link> | 
                <Link href="/tours" className="hover:text-white"> Tours</Link> | 
                <span className="text-white"> Booking</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-wider">
                BOOKING FORM
              </h1>
            </div>
          </div>
        </section>

        {/* Success Message */}
        {isSubmitted && (
          <section className="py-20 bg-green-50">
            <div className="container-custom section-padding">
              <div className="max-w-4xl mx-auto text-center">
                <div className="bg-white rounded-2xl shadow-2xl p-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-green-600" />
                  </div>
                  
                  <h2 className="text-4xl font-bold text-sand-900 mb-4">
                    Thank You for Your Booking!
                  </h2>
                  
                  <p className="text-xl text-sand-600 mb-8">
                    Your booking request has been submitted successfully. We will contact you within 24 hours to confirm your tour details and payment.
                  </p>
                  
                  <div className="bg-sand-50 rounded-xl p-6 mb-8">
                    <h3 className="text-2xl font-semibold text-sand-900 mb-4">Booking Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                      <div>
                        <span className="font-medium text-sand-700">Package:</span>
                        <span className="ml-2 text-sand-600">{formData.selectedTour?.title}</span>
                      </div>
                      <div>
                        <span className="font-medium text-sand-700">Duration:</span>
                        <span className="ml-2 text-sand-600">{formData.selectedTour?.duration}</span>
                      </div>
                      <div>
                        <span className="font-medium text-sand-700">Location:</span>
                        <span className="ml-2 text-sand-600">{formData.selectedTour?.location}</span>
                      </div>
                      <div>
                        <span className="font-medium text-sand-700">Price:</span>
                        <span className="ml-2 text-sand-600">
                          {isClient ? formatPrice(formData.selectedTour?.price || 0) : `BDT ${(formData.selectedTour?.price || 0).toLocaleString()}`}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-primary-50 rounded-xl p-6">
                    <h3 className="text-2xl font-semibold text-sand-900 mb-4">Contact Information</h3>
                    <p className="text-sand-600 mb-4">
                      For any questions or modifications to your booking, please contact us:
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <div className="flex items-center gap-2">
                        <Phone className="w-5 h-5 text-primary-600" />
                        <span className="text-sand-700 font-medium">+880 1704-439665</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-5 h-5 text-primary-600" />
                        <span className="text-sand-700 font-medium">asifmahamud669@gmail.com</span>
                      </div>
                    </div>
                    <p className="text-sm text-sand-500 mt-4">
                      Our team is available 24/7 to assist you with your travel needs.
                    </p>
                  </div>
                  
                  <div className="mt-8">
                    <Link 
                      href="/tours"
                      className="btn-primary text-lg px-8 py-4 mr-4"
                    >
                      Explore More Tours
                    </Link>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="btn bg-sand-200 hover:bg-sand-300 text-sand-800 text-lg px-8 py-4"
                    >
                      Make Another Booking
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Booking Form */}
        {!isSubmitted && (
          <section className="py-20 bg-white">
            <div className="container-custom section-padding">
              <form onSubmit={handleSubmit} className="max-w-6xl mx-auto">
              {/* Personal Identity Section */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-sand-900 mb-8 uppercase tracking-wide">
                  Personal Identity
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Title and First Name */}
                  <div className="flex gap-4">
                    <div className="w-24">
                      <label className="block text-sm font-medium text-sand-700 mb-2">Title</label>
                      <select
                        className="w-full px-4 py-3 border border-sand-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                      >
                        <option value="Mr.">Mr.</option>
                        <option value="Mrs.">Mrs.</option>
                        <option value="Ms.">Ms.</option>
                        <option value="Dr.">Dr.</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-sand-700 mb-2">First Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-sand-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter your first name"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-sm font-medium text-sand-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-sand-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter your last name"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-sand-700 mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sand-400 w-5 h-5" />
                      <input
                        type="email"
                        className="w-full pl-12 pr-4 py-3 border border-sand-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-sand-700 mb-2">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sand-400 w-5 h-5" />
                      <input
                        type="tel"
                        className="w-full pl-12 pr-4 py-3 border border-sand-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Start Date */}
                  <div>
                    <label className="block text-sm font-medium text-sand-700 mb-2">Start Date</label>
                    <div className="flex gap-2">
                      <select
                        className="flex-1 px-3 py-3 border border-sand-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        value={formData.startDate.day}
                        onChange={(e) => handleNestedInputChange('startDate', 'day', e.target.value)}
                        required
                      >
                        <option value="">Day</option>
                        {days.map(day => (
                          <option key={day} value={day.toString().padStart(2, '0')}>
                            {day.toString().padStart(2, '0')}
                          </option>
                        ))}
                      </select>
                      <select
                        className="flex-1 px-3 py-3 border border-sand-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        value={formData.startDate.month}
                        onChange={(e) => handleNestedInputChange('startDate', 'month', e.target.value)}
                        required
                      >
                        <option value="">Month</option>
                        {months.map((month, index) => (
                          <option key={month} value={(index + 1).toString().padStart(2, '0')}>
                            {month}
                          </option>
                        ))}
                      </select>
                      <select
                        className="flex-1 px-3 py-3 border border-sand-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        value={formData.startDate.year}
                        onChange={(e) => handleNestedInputChange('startDate', 'year', e.target.value)}
                        required
                      >
                        <option value="">Year</option>
                        {years.map(year => (
                          <option key={year} value={year.toString()}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                </div>
              </div>

              {/* Package Selection Section */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-sand-900 mb-8 uppercase tracking-wide">
                  Package
                </h2>

                <div className="relative">
                  {/* Package Carousel */}
                  <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <div className="relative h-96">
                      {currentTour && (
                        <>
                          <Image
                            src={currentTour.images[0]}
                            alt={currentTour.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          
                          {/* Selected Indicator */}
                          <div className="absolute top-4 left-4 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                            <Check className="w-5 h-5 text-white" />
                          </div>

                          {/* Package Info */}
                          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                            <h3 className="text-2xl font-bold mb-2">{currentTour.title}</h3>
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                <span>{currentTour.location}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{currentTour.duration}</span>
                              </div>
                            </div>
                            <div className="mt-4 text-2xl font-bold">
                              Starting from {isClient ? formatPrice(currentTour.price) : `BDT ${currentTour.price.toLocaleString()}`}
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Navigation Arrows */}
                    <button
                      type="button"
                      onClick={prevPackage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      type="button"
                      onClick={nextPackage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Package Indicators */}
                  <div className="flex justify-center mt-6 gap-2">
                    {tours.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => selectPackage(index)}
                        className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                          index === currentPackageIndex ? 'bg-primary-600' : 'bg-sand-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="mb-8">
                <div className="space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-1 w-5 h-5 text-primary-600 border-sand-300 rounded focus:ring-primary-500"
                      checked={formData.travelInsurance}
                      onChange={(e) => handleInputChange('travelInsurance', e.target.checked)}
                    />
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-primary-600" />
                      <span className="text-sand-700">
                        Get me a travel insurance that covers my whole trip safety and cancellation.
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-1 w-5 h-5 text-primary-600 border-sand-300 rounded focus:ring-primary-500"
                      checked={formData.termsAccepted}
                      onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
                      required
                    />
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary-600" />
                      <span className="text-sand-700">
                        I have read all{' '}
                        <Link href="/terms" className="text-primary-600 hover:underline">
                          terms & conditions
                        </Link>{' '}
                        and{' '}
                        <Link href="/privacy" className="text-primary-600 hover:underline">
                          privacy policy
                        </Link>
                        .
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-12 rounded-lg text-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  Book Now
                </button>
              </div>
              </form>
            </div>
          </section>
        )}
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const tours = [
    {
      id: 1,
      title: "Cox's Bazar Beach Paradise",
      location: "Cox's Bazar, Bangladesh",
      duration: "3 days 2 nights",
      price: 15000,
      images: ["/Image/Cox's Bazar/cox1.jpg"],
      category: "beach"
    },
    {
      id: 2,
      title: "Saint Martin Island Escape",
      location: "Saint Martin Island, Bangladesh",
      duration: "2 days 1 night",
      price: 18000,
      images: ["/Image/Saint Martin/sm1.png"],
      category: "island"
    },
    {
      id: 3,
      title: "Bandarban Hill Tribe Tour",
      location: "Bandarban, Bangladesh",
      duration: "3 days 2 nights",
      price: 16000,
      images: ["/Image/Bandarban/bandor1.jpg"],
      category: "hills"
    },
    {
      id: 4,
      title: "Sajek Valley Cloud Paradise",
      location: "Sajek Valley, Bangladesh",
      duration: "2 days 1 night",
      price: 14000,
      images: ["/Image/Sajek/sajek1.jpg"],
      category: "hills"
    },
    {
      id: 5,
      title: "Sundarban Mangrove Forest Safari",
      location: "Sundarban, Bangladesh",
      duration: "3 days 2 nights",
      price: 20000,
      images: ["/Image/Sundarban/snb1.jpg"],
      category: "wildlife"
    },
    {
      id: 6,
      title: "Bhutan Happiness Kingdom Tour",
      location: "Thimphu, Paro, Bhutan",
      duration: "6 days 5 nights",
      price: 55000,
      images: ["/Image/Bhutan/Bh1.png"],
      category: "international"
    }
  ];

  return {
    props: {
      tours,
    },
    revalidate: 3600,
  };
};

export default BookingPage;

