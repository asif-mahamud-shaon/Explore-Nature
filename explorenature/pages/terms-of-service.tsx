import React from 'react';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { FileText, Shield, AlertTriangle, Clock, Phone, Mail } from 'lucide-react';

const TermsOfServicePage: React.FC = () => {
  return (
    <>
      <NextSeo
        title="Terms of Service - Explorer Nature"
        description="Read our terms of service and conditions for using Explorer Nature's tour booking services. Understand your rights and responsibilities."
        canonical="https://explorernature.com/terms-of-service"
        openGraph={{
          title: 'Terms of Service - Explorer Nature',
          description: 'Read our terms of service and conditions for using Explorer Nature\'s tour booking services.',
          images: [
            {
              url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
              width: 1200,
              height: 630,
              alt: 'Terms of Service - Explorer Nature',
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
                <FileText className="w-16 h-16 text-white mr-4" />
                <h1 className="text-5xl md:text-6xl font-serif font-bold text-white">
                  Terms of Service
                </h1>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-white/90 max-w-3xl mx-auto"
              >
                Please read these terms and conditions carefully before using our services.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Terms Content */}
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
                    These terms and conditions govern your use of Explorer Nature's services. By booking a tour with us, you agree to be bound by these terms.
                  </p>
                </div>

                <div className="space-y-8">
                  <section>
                    <h2 className="text-3xl font-bold text-sand-900 dark:text-sand-100 mb-4 flex items-center">
                      <Shield className="w-8 h-8 text-primary-600 mr-3" />
                      1. Acceptance of Terms
                    </h2>
                    <p className="text-sand-600 dark:text-sand-400 leading-relaxed">
                      By accessing and using Explorer Nature's website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-3xl font-bold text-sand-900 dark:text-sand-100 mb-4 flex items-center">
                      <FileText className="w-8 h-8 text-primary-600 mr-3" />
                      2. Booking and Payment
                    </h2>
                    <div className="space-y-4">
                      <p className="text-sand-600 dark:text-sand-400 leading-relaxed">
                        All tour bookings are subject to availability and confirmation. Payment must be made in full at the time of booking unless otherwise agreed.
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-sand-600 dark:text-sand-400">
                        <li>All prices are quoted in Bangladeshi Taka (BDT)</li>
                        <li>Payment can be made via bank transfer, mobile banking, or cash</li>
                        <li>Bookings are confirmed only after full payment is received</li>
                        <li>Prices are subject to change without notice</li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-3xl font-bold text-sand-900 dark:text-sand-100 mb-4 flex items-center">
                      <AlertTriangle className="w-8 h-8 text-primary-600 mr-3" />
                      3. Cancellation and Refund Policy
                    </h2>
                    <div className="space-y-4">
                      <p className="text-sand-600 dark:text-sand-400 leading-relaxed">
                        We understand that plans can change. Our cancellation policy is designed to be fair to both parties.
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-sand-600 dark:text-sand-400">
                        <li><strong>More than 7 days before tour:</strong> Full refund</li>
                        <li><strong>3-7 days before tour:</strong> 50% refund</li>
                        <li><strong>Less than 3 days before tour:</strong> No refund</li>
                        <li><strong>Weather-related cancellations:</strong> Full refund or rescheduling</li>
                        <li><strong>Medical emergencies:</strong> Case-by-case consideration</li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-3xl font-bold text-sand-900 dark:text-sand-100 mb-4">
                      4. Safety and Responsibility
                    </h2>
                    <div className="space-y-4">
                      <p className="text-sand-600 dark:text-sand-400 leading-relaxed">
                        Your safety is our top priority. However, participants must understand and accept certain risks associated with outdoor activities.
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-sand-600 dark:text-sand-400">
                        <li>Participants must follow all safety instructions from our guides</li>
                        <li>We provide safety equipment, but participants use it at their own risk</li>
                        <li>Participants must disclose any medical conditions that may affect their safety</li>
                        <li>We reserve the right to refuse service to anyone who poses a safety risk</li>
                        <li>Participants are responsible for their own personal belongings</li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-3xl font-bold text-sand-900 dark:text-sand-100 mb-4">
                      5. Weather and Force Majeure
                    </h2>
                    <p className="text-sand-600 dark:text-sand-400 leading-relaxed">
                      We reserve the right to cancel or modify tours due to weather conditions or other circumstances beyond our control. In such cases, we will offer alternative dates or full refunds.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-3xl font-bold text-sand-900 dark:text-sand-100 mb-4">
                      6. Photography and Media
                    </h2>
                    <p className="text-sand-600 dark:text-sand-400 leading-relaxed">
                      We may take photographs or videos during tours for promotional purposes. By participating in our tours, you consent to the use of your image in our marketing materials unless you specifically request otherwise.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-3xl font-bold text-sand-900 dark:text-sand-100 mb-4">
                      7. Limitation of Liability
                    </h2>
                    <p className="text-sand-600 dark:text-sand-400 leading-relaxed">
                      Explorer Nature's liability is limited to the amount paid for the tour. We are not responsible for any indirect, incidental, or consequential damages arising from your participation in our tours.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-3xl font-bold text-sand-900 dark:text-sand-100 mb-4">
                      8. Changes to Terms
                    </h2>
                    <p className="text-sand-600 dark:text-sand-400 leading-relaxed">
                      We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on our website. Continued use of our services constitutes acceptance of the modified terms.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-3xl font-bold text-sand-900 dark:text-sand-100 mb-4">
                      9. Governing Law
                    </h2>
                    <p className="text-sand-600 dark:text-sand-400 leading-relaxed">
                      These terms are governed by the laws of Bangladesh. Any disputes will be resolved in the courts of Bangladesh.
                    </p>
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
                Questions About Our Terms?
              </h2>
              <p className="text-xl text-sand-600 dark:text-sand-400 mb-8">
                If you have any questions about these terms and conditions, please contact us.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-sand-700 rounded-xl p-8 shadow-soft">
                  <Phone className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-sand-900 dark:text-sand-100 mb-2">
                    Call Us
                  </h3>
                  <p className="text-sand-600 dark:text-sand-400 mb-4">
                    Speak with our legal team
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
                    Send us your questions
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

export default TermsOfServicePage;
