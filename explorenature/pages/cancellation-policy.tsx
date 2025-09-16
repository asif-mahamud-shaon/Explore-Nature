import React from 'react';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { RotateCcw, Clock, AlertTriangle, CheckCircle, XCircle, Phone, Mail } from 'lucide-react';

const CancellationPolicyPage: React.FC = () => {
  return (
    <>
      <NextSeo
        title="Cancellation Policy - Explorer Nature"
        description="Read our comprehensive cancellation and refund policy. Understand the terms for canceling your tour bookings with Explorer Nature."
        canonical="https://explorernature.com/cancellation-policy"
        openGraph={{
          title: 'Cancellation Policy - Explorer Nature',
          description: 'Read our comprehensive cancellation and refund policy for tour bookings.',
          images: [
            {
              url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
              width: 1200,
              height: 630,
              alt: 'Cancellation Policy - Explorer Nature',
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
                <RotateCcw className="w-16 h-16 text-white mr-4" />
                <h1 className="text-5xl md:text-6xl font-serif font-bold text-white">
                  Cancellation Policy
                </h1>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-white/90 max-w-3xl mx-auto"
              >
                We understand that plans can change. Here's our fair and transparent cancellation policy.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Policy Content */}
        <section className="py-20 bg-white dark:bg-sand-900">
          <div className="container-custom section-padding">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="prose prose-lg max-w-none"
              >
                <div className="bg-sand-50 dark:bg-sand-800 rounded-xl p-8 mb-8">
                  <div className="flex items-center mb-4">
                    <Clock className="w-6 h-6 text-primary-600 mr-3" />
                    <h2 className="text-2xl font-bold text-sand-900 dark:text-sand-100">
                      Last Updated: January 1, 2025
                    </h2>
                  </div>
                  <p className="text-sand-600 dark:text-sand-400">
                    This cancellation policy applies to all tour bookings made with Explorer Nature. Please read carefully before making a booking.
                  </p>
                </div>

                {/* Cancellation Timeline */}
                <div className="space-y-8">
                  <section>
                    <h2 className="text-3xl font-bold text-sand-900 dark:text-sand-100 mb-6 flex items-center">
                      <Clock className="w-8 h-8 text-primary-600 mr-3" />
                      Cancellation Timeline
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border-l-4 border-green-500">
                        <div className="flex items-center mb-4">
                          <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                          <h3 className="text-xl font-semibold text-green-800 dark:text-green-200">
                            More than 7 days before tour
                          </h3>
                        </div>
                        <p className="text-green-700 dark:text-green-300 font-semibold text-lg mb-2">
                          Full Refund (100%)
                        </p>
                        <p className="text-green-600 dark:text-green-400">
                          Cancel your booking more than 7 days before the tour date and receive a full refund of your payment.
                        </p>
                      </div>

                      <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 border-l-4 border-yellow-500">
                        <div className="flex items-center mb-4">
                          <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3" />
                          <h3 className="text-xl font-semibold text-yellow-800 dark:text-yellow-200">
                            3-7 days before tour
                          </h3>
                        </div>
                        <p className="text-yellow-700 dark:text-yellow-300 font-semibold text-lg mb-2">
                          Partial Refund (50%)
                        </p>
                        <p className="text-yellow-600 dark:text-yellow-400">
                          Cancel your booking 3-7 days before the tour date and receive 50% of your payment as refund.
                        </p>
                      </div>

                      <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border-l-4 border-red-500">
                        <div className="flex items-center mb-4">
                          <XCircle className="w-6 h-6 text-red-600 mr-3" />
                          <h3 className="text-xl font-semibold text-red-800 dark:text-red-200">
                            Less than 3 days before tour
                          </h3>
                        </div>
                        <p className="text-red-700 dark:text-red-300 font-semibold text-lg mb-2">
                          No Refund (0%)
                        </p>
                        <p className="text-red-600 dark:text-red-400">
                          Cancellations made less than 3 days before the tour date are not eligible for refunds.
                        </p>
                      </div>

                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border-l-4 border-blue-500">
                        <div className="flex items-center mb-4">
                          <CheckCircle className="w-6 h-6 text-blue-600 mr-3" />
                          <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200">
                            Weather-related cancellations
                          </h3>
                        </div>
                        <p className="text-blue-700 dark:text-blue-300 font-semibold text-lg mb-2">
                          Full Refund or Rescheduling
                        </p>
                        <p className="text-blue-600 dark:text-blue-400">
                          Tours cancelled due to weather conditions are eligible for full refund or rescheduling.
                        </p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-3xl font-bold text-sand-900 dark:text-sand-100 mb-4">
                      Special Circumstances
                    </h2>
                    <div className="space-y-4">
                      <div className="bg-sand-50 dark:bg-sand-800 rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-sand-900 dark:text-sand-100 mb-3">
                          Medical Emergencies
                        </h3>
                        <p className="text-sand-600 dark:text-sand-400 leading-relaxed">
                          In case of medical emergencies, we will consider refunds on a case-by-case basis. Please provide medical documentation when requesting a refund for medical reasons.
                        </p>
                      </div>

                      <div className="bg-sand-50 dark:bg-sand-800 rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-sand-900 dark:text-sand-100 mb-3">
                          Government Restrictions
                        </h3>
                        <p className="text-sand-600 dark:text-sand-400 leading-relaxed">
                          If tours are cancelled due to government restrictions or travel bans, full refunds will be provided regardless of the cancellation timeline.
                        </p>
                      </div>

                      <div className="bg-sand-50 dark:bg-sand-800 rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-sand-900 dark:text-sand-100 mb-3">
                          Group Bookings
                        </h3>
                        <p className="text-sand-600 dark:text-sand-400 leading-relaxed">
                          For group bookings (10+ people), special cancellation terms may apply. Please contact us for group-specific cancellation policies.
                        </p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-3xl font-bold text-sand-900 dark:text-sand-100 mb-4">
                      How to Cancel
                    </h2>
                    <div className="space-y-4">
                      <p className="text-sand-600 dark:text-sand-400 leading-relaxed">
                        To cancel your booking, please contact us using one of the following methods:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-sand-600 dark:text-sand-400">
                        <li>Call us at +880 1704-439665</li>
                        <li>Email us at asifmahamud669@gmail.com</li>
                        <li>Use our contact form on the website</li>
                        <li>Visit our office in person</li>
                      </ul>
                      <p className="text-sand-600 dark:text-sand-400 leading-relaxed">
                        Please provide your booking reference number and reason for cancellation when contacting us.
                      </p>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-3xl font-bold text-sand-900 dark:text-sand-100 mb-4">
                      Refund Processing
                    </h2>
                    <div className="space-y-4">
                      <p className="text-sand-600 dark:text-sand-400 leading-relaxed">
                        Refunds will be processed using the same payment method used for the original booking:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-sand-600 dark:text-sand-400">
                        <li><strong>Bank Transfer:</strong> 3-5 business days</li>
                        <li><strong>Mobile Banking:</strong> 1-2 business days</li>
                        <li><strong>Cash Payment:</strong> Refund will be provided in cash at our office</li>
                        <li><strong>Credit Card:</strong> 5-10 business days</li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-3xl font-bold text-sand-900 dark:text-sand-100 mb-4">
                      Rescheduling Policy
                    </h2>
                    <div className="space-y-4">
                      <p className="text-sand-600 dark:text-sand-400 leading-relaxed">
                        Instead of cancelling, you may reschedule your tour to a different date:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-sand-600 dark:text-sand-400">
                        <li>Rescheduling is free if done more than 7 days before the original tour date</li>
                        <li>Rescheduling 3-7 days before the tour may incur a small fee</li>
                        <li>Rescheduling less than 3 days before the tour is subject to availability</li>
                        <li>You can reschedule up to 2 times per booking</li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-3xl font-bold text-sand-900 dark:text-sand-100 mb-4">
                      Important Notes
                    </h2>
                    <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6 border-l-4 border-amber-500">
                      <ul className="list-disc list-inside space-y-2 text-amber-700 dark:text-amber-300">
                        <li>All cancellation requests must be made in writing (email or written notice)</li>
                        <li>Refunds are calculated based on the original booking amount</li>
                        <li>Processing fees (if any) are non-refundable</li>
                        <li>Partial cancellations for group bookings are handled individually</li>
                        <li>We reserve the right to modify this policy with 30 days notice</li>
                      </ul>
                    </div>
                  </section>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-sand-50 dark:bg-sand-800">
          <div className="container-custom section-padding">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-serif font-bold text-sand-900 dark:text-sand-100 mb-6">
                Need Help with Cancellation?
              </h2>
              <p className="text-xl text-sand-600 dark:text-sand-400 mb-8">
                If you need to cancel your booking or have questions about our cancellation policy, we're here to help.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-sand-700 rounded-xl p-8 shadow-soft">
                  <Phone className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-sand-900 dark:text-sand-100 mb-2">
                    Call Us
                  </h3>
                  <p className="text-sand-600 dark:text-sand-400 mb-4">
                    Speak with our booking team
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
                    Send us your cancellation request
                  </p>
                  <a 
                    href="mailto:asifmahamud669@gmail.com"
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    asifmahamud669@gmail.com
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
  return {
    props: {},
    revalidate: 3600,
  };
};

export default CancellationPolicyPage;
