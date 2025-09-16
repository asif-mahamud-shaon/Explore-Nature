import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, Home } from 'lucide-react';
import { BreadcrumbItem } from '@/types';

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index === 0 && (
              <Home className="w-4 h-4 text-sand-500 dark:text-sand-400 mr-1" />
            )}
            
            {item.href && index < items.length - 1 ? (
              <Link
                href={item.href}
                className="text-sand-500 dark:text-sand-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
              >
                {item.label}
              </Link>
            ) : (
              <span className={`${
                index === items.length - 1
                  ? 'text-sand-900 dark:text-sand-100 font-medium'
                  : 'text-sand-500 dark:text-sand-400'
              }`}>
                {item.label}
              </span>
            )}
            
            {index < items.length - 1 && (
              <ChevronRight className="w-4 h-4 text-sand-400 mx-2" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;

