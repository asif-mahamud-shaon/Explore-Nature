import React from 'react';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Database, Mail, Phone, AlertCircle } from 'lucide-react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <>
      <NextSeo
        title="Privacy Policy - Explorer Nature"
        description="Learn how Explorer Nature collects, uses, and protects your personal information. Read our comprehensive privacy policy."
        canonical="https://explorernature.com/privacy-policy"
        openGraph={{
          title: 'Privacy Policy - Explorer Nature',
          description: 'Learn how Explorer Nature collects, uses, and protects your personal information.',
          images: [
            {
              url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
              width: 1200,
              height: 630,
              alt: 'Privacy Policy - Explorer Nature',
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
                <Shield className="w-16 h-16 text-white mr-4" />
                <h1 className="text-5xl md:text-6xl font-serif font-bold text-white">
                  Privacy Policy
                </h1>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-white/90 max-w-3xl mx-auto"
              >
                Your privacy is important to us. Learn how we collect, use, and protect your information.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Privacy Content */}
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
                    <AlertCircle className="w-6 h-6 text-primary-600 mr-3" />
                    <h2 className="text-2xl font-bold text-sand-900 dark:text-sand-100">
                      Last Updated: January 1, 2025
                    </h2>
                  </div>
                  <p className="text-sand-600 dark:text-sand-400">
                    This privacy policy explains how Explorer Nature collects, uses, and protects your personal information when you use our services.
                  </p>
                </div>

                <div className="space-y-8">
                  <section>
                    <h2 className="text-3xl font-bold text-sand-900 dark:text-sand-100 mb-4 flex items-center">
                      <Eye className="w-8 h-8 text-primary-600 mr-3" />
                      1. Information We Collect
                    </h2>
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-sand-900 dark:text-sand-100">
                        Personal Information
                      </h3>
                      <p className="text-sand-600 dark:text-sand-400 leading-relaxed">
                        We collect information you provide directly to us, such as when you book a tour, create an account, or contact us.
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-sand-600 dark:text-sand-400">
                        <li>Name and contact information (email, phone number, address)</li>
                        <li>Payment information (processed securely through third-party providers)</li>
                        <li>Tour preferences and special requirements</li>
                        <li>Emergency contact information</li>
                        <li>Photographs and videos (with your consent)</li>
                      </ul>

                      <h3 className="text-xl font-semibold text-sand-900 dark:text-sand-100 mt-6">
                        Automatically Collected Information
                      </h3>
                      <ul className="list-disc list-inside space-y-2 text-sand-600 dark:text-sand-400">
                        <li>IP address and device information</li>
                        <li>Browser type and version</li>
                        <li>Pages visited and time spent on our website</li>
                        <li>Referring website information</li>
                        <li>Cookies and similar tracking technologies</li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-3xl font-bold text-sand-900 dark:text-sand-100 mb-4 flex items-center">
                      <Database className="w-8 h-8 text-primary-600 mr-3" />
                      2. How We Use Your Information
                    </h2>
                    <div className="space-y-4">
                      <p className="text-sand-600 dark:text-sand-400 leading-relaxed">
                        We use the information we collect to provide, maintain, and improve our services.
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-sand-600 dark:text-sand-400">
                        <li>Process tour bookings and payments</li>
                        <li>Communicate with you about your bookings and tours</li>
                        <li>Provide customer support and respond to inquiries</li>
                        <li>Send you promotional materials and updates (with your consent)</li>
                        <li>Improve our website and services</li>
                        <li>Ensure safety and security during tours</li>
                        <li>Comply with legal obligations</li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-3xl font-bold text-sand-900 dark:text-sand-100 mb-4 flex items-center">
                      <Lock className="w-8 h-8 text-primary-600 mr-3" />
                      3. Information Sharing and Disclosure
                    </h2>
                    <div className="space-y-4">
                      <p className="text-sand-600 dark:text-sand-400 leading-relaxed">
                        We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described below.
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-sand-600 dark:text-sand-400">
                        <li><strong>Service Providers:</strong> We may share information with trusted third parties who assist us in operating our website and conducting our business</li>
                        <li><strong>Legal Requirements:</strong> We may disclose information when required by law or to protect our rights and safety</li>
                        <li><strong>Business Transfers:</strong> In the event of a merger or acquisition, your information may be transferred to the new entity</li>
                        <li><strong>Consent:</strong> We may share information with your explicit consent</li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-3xl font-bold text-sand-900 dark:text-sand-100 mb-4">
                      4. Data Security
                    </h2>
                    <div className="space-y-4">
                      <p className="text-sand-600 dark:text-sand-400 leading-relaxed">
                        We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-sand-600 dark:text-sand-400">
                        <li>SSL encryption for data transmission</li>
                        <li>Secure servers and databases</li>
                        <li>Regular security audits and updates</li>
                        <li>Limited access to personal information</li>
                        <li>Employee training on data protection</li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-3xl font-bold text-sand-900 dark:text-sand-100 mb-4">
                      5. Cookies and Tracking Technologies
                    </h2>
                    <p className="text-sand-600 dark:text-sand-400 leading-relaxed">
                      We use cookies and similar technologies to enhance your experience on our website. You can control cookie settings through your browser preferences.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-3xl font-bold text-sand-900 dark:text-sand-100 mb-4">
                      6. Your Rights and Choices
                    </h2>
                    <div className="space-y-4">
                      <p className="text-sand-600 dark:text-sand-400 leading-relaxed">
                        You have certain rights regarding your personal information:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-sand-600 dark:text-sand-400">
                        <li><strong>Access:</strong> Request a copy of your personal information</li>
                        <li><strong>Correction:</strong> Update or correct your information</li>
                        <li><strong>Deletion:</strong> Request deletion of your information</li>
                        <li><strong>Portability:</strong> Receive your data in a structured format</li>
                        <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-3xl font-bold text-sand-900 dark:text-sand-100 mb-4">
                      7. Data Retention
                    </h2>
                    <p className="text-sand-600 dark:text-sand-400 leading-relaxed">
                      We retain your personal information for as long as necessary to provide our services and comply with legal obligations. When we no longer need your information, we will securely delete or anonymize it.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-3xl font-bold text-sand-900 dark:text-sand-100 mb-4">
                      8. Children's Privacy
                    </h2>
                    <p className="text-sand-600 dark:text-sand-400 leading-relaxed">
                      Our services are not directed to children under 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-3xl font-bold text-sand-900 dark:text-sand-100 mb-4">
                      9. Changes to This Policy
                    </h2>
                    <p className="text-sand-600 dark:text-sand-400 leading-relaxed">
                      We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-3xl font-bold text-sand-900 dark:text-sand-100 mb-4">
                      10. Contact Us
                    </h2>
                    <p className="text-sand-600 dark:text-sand-400 leading-relaxed">
                      If you have any questions about this privacy policy or our data practices, please contact us using the information below.
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
                Questions About Privacy?
              </h2>
              <p className="text-xl text-sand-600 dark:text-sand-400 mb-8">
                If you have any questions about our privacy practices, please contact us.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-sand-700 rounded-xl p-8 shadow-soft">
                  <Phone className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-sand-900 dark:text-sand-100 mb-2">
                    Call Us
                  </h3>
                  <p className="text-sand-600 dark:text-sand-400 mb-4">
                    Speak with our privacy team
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
                    Send us your privacy questions
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

export default PrivacyPolicyPage;
