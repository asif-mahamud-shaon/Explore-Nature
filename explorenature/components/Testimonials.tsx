import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Testimonial } from '@/types';

interface TestimonialsProps {
  testimonials: Testimonial[];
  className?: string;
}

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials, className = '' }) => {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-5 h-5 ${
            i < rating
              ? 'text-gold-400 fill-current'
              : 'text-sand-300 dark:text-sand-600'
          }`}
        />
      );
    }
    return stars;
  };

  return (
    <section className={`py-16 ${className}`}>
      <div className="container-custom section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-serif font-bold text-sand-900 dark:text-sand-100 mb-6">
            What Our Guests Say
          </h2>
          <p className="text-xl text-sand-600 dark:text-sand-400 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our guests have to say 
            about their experiences with us.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-sand-800 rounded-xl p-6 shadow-soft hover:shadow-medium transition-shadow duration-300"
            >
              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Review */}
              <blockquote className="text-sand-700 dark:text-sand-300 mb-6 italic">
                "{testimonial.review}"
              </blockquote>

              {/* Author */}
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
                  <div className="text-xs text-sand-400 dark:text-sand-600">
                    {testimonial.tour}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

