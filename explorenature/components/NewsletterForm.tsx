import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Send, Mail } from 'lucide-react';
import { NewsletterFormData } from '@/types';

const schema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
});

interface NewsletterFormProps {
  className?: string;
  variant?: 'default' | 'inline';
}

const NewsletterForm: React.FC<NewsletterFormProps> = ({ 
  className = '', 
  variant = 'default' 
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success('Successfully subscribed to our newsletter!');
        reset();
      } else {
        throw new Error('Failed to subscribe');
      }
    } catch (error) {
      toast.error('Sorry, there was an error subscribing. Please try again.');
      console.error('Newsletter subscription error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className={`flex flex-col sm:flex-row gap-4 ${className}`}>
        <div className="flex-1">
          <input
            {...register('email')}
            type="email"
            placeholder="Enter your email"
            className="input w-full"
          />
          {errors.email && (
            <p className="form-error">{errors.email.message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="flex items-center space-x-2">
              <div className="spinner" />
              <span>Subscribing...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Send className="w-5 h-5" />
              <span>Subscribe</span>
            </div>
          )}
        </button>
      </form>
    );
  }

  return (
    <div className={`max-w-md mx-auto ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-6"
      >
        <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-8 h-8 text-primary-600 dark:text-primary-400" />
        </div>
        <h3 className="text-2xl font-serif font-bold text-sand-900 dark:text-sand-100 mb-2">
          Stay Updated
        </h3>
        <p className="text-sand-600 dark:text-sand-400">
          Get the latest news and exclusive offers delivered to your inbox.
        </p>
      </motion.div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            {...register('email')}
            type="email"
            placeholder="Enter your email address"
            className="input w-full"
          />
          {errors.email && (
            <p className="form-error">{errors.email.message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="spinner" />
              <span>Subscribing...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <Send className="w-5 h-5" />
              <span>Subscribe to Newsletter</span>
            </div>
          )}
        </button>
      </form>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-xs text-sand-500 dark:text-sand-500 text-center mt-4"
      >
        We respect your privacy. Unsubscribe at any time.
      </motion.p>
    </div>
  );
};

export default NewsletterForm;

