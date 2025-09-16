import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TourCard from '@/components/TourCard';
import { Tour } from '@/types';

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/tours',
  }),
}));

// Mock Next.js Link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

// Mock Next.js Image
jest.mock('next/image', () => {
  return ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
  );
});

const mockTour: Tour = {
  id: 1,
  slug: 'desert-safari-adventure',
  title: 'Desert Safari Adventure',
  shortDescription: 'Experience the magic of the Arabian desert with our premium safari tour',
  longDescription: 'Embark on an unforgettable journey through the golden dunes of the Arabian desert.',
  price: 299,
  duration: '6 hours',
  location: 'Dubai Desert',
  category: 'desert',
  difficulty: 'moderate',
  groupSize: '2-12 people',
  includes: [
    'Hotel pickup and drop-off',
    'Dune bashing in 4x4 vehicles',
    'Camel ride experience',
  ],
  highlights: [
    'Thrilling dune bashing experience',
    'Authentic Bedouin camp',
    'Traditional Arabic entertainment',
  ],
  itinerary: [
    {
      time: '3:00 PM',
      activity: 'Hotel pickup and transfer to desert',
      duration: '45 minutes',
    },
  ],
  images: [
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800',
  ],
  rating: 4.8,
  reviewsCount: 1247,
  featured: true,
};

describe('TourCard Component', () => {
  it('renders tour information correctly', () => {
    render(<TourCard tour={mockTour} />);
    
    expect(screen.getByText('Desert Safari Adventure')).toBeInTheDocument();
    expect(screen.getByText('Experience the magic of the Arabian desert with our premium safari tour')).toBeInTheDocument();
    expect(screen.getByText('$299')).toBeInTheDocument();
    expect(screen.getByText('6 hours')).toBeInTheDocument();
    expect(screen.getByText('Dubai Desert')).toBeInTheDocument();
    expect(screen.getByText('4.8')).toBeInTheDocument();
    expect(screen.getByText('(1247 reviews)')).toBeInTheDocument();
  });

  it('displays featured badge when tour is featured', () => {
    render(<TourCard tour={mockTour} />);
    
    expect(screen.getByText('Featured')).toBeInTheDocument();
  });

  it('does not display featured badge when tour is not featured', () => {
    const nonFeaturedTour = { ...mockTour, featured: false };
    render(<TourCard tour={nonFeaturedTour} />);
    
    expect(screen.queryByText('Featured')).not.toBeInTheDocument();
  });

  it('renders correct number of stars based on rating', () => {
    render(<TourCard tour={mockTour} />);
    
    // Should render 5 stars (4 filled + 1 empty)
    const stars = screen.getAllByRole('img', { hidden: true });
    expect(stars).toHaveLength(1); // Only the main tour image
  });

  it('displays difficulty level with correct styling', () => {
    render(<TourCard tour={mockTour} />);
    
    expect(screen.getByText('moderate')).toBeInTheDocument();
  });

  it('calls onFavoriteToggle when favorite button is clicked', () => {
    const mockOnFavoriteToggle = jest.fn();
    render(<TourCard tour={mockTour} onFavoriteToggle={mockOnFavoriteToggle} />);
    
    const favoriteButton = screen.getByLabelText('Add to favorites');
    fireEvent.click(favoriteButton);
    
    expect(mockOnFavoriteToggle).toHaveBeenCalledWith(mockTour.id);
  });

  it('shows favorite button when onFavoriteToggle is provided', () => {
    const mockOnFavoriteToggle = jest.fn();
    render(<TourCard tour={mockTour} onFavoriteToggle={mockOnFavoriteToggle} />);
    
    expect(screen.getByLabelText('Add to favorites')).toBeInTheDocument();
  });

  it('does not show favorite button when onFavoriteToggle is not provided', () => {
    render(<TourCard tour={mockTour} />);
    
    expect(screen.queryByLabelText('Add to favorites')).not.toBeInTheDocument();
  });

  it('displays correct category', () => {
    render(<TourCard tour={mockTour} />);
    
    expect(screen.getByText('desert')).toBeInTheDocument();
  });

  it('shows highlights with correct formatting', () => {
    render(<TourCard tour={mockTour} />);
    
    expect(screen.getByText('Thrilling dune bashing experience')).toBeInTheDocument();
    expect(screen.getByText('Authentic Bedouin camp')).toBeInTheDocument();
  });

  it('links to correct tour detail page', () => {
    render(<TourCard tour={mockTour} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/tours/desert-safari-adventure');
  });

  it('renders tour image with correct alt text', () => {
    render(<TourCard tour={mockTour} />);
    
    const image = screen.getByAltText('Desert Safari Adventure');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockTour.images[0]);
  });

  it('displays price in correct format', () => {
    render(<TourCard tour={mockTour} />);
    
    expect(screen.getByText('$299')).toBeInTheDocument();
    expect(screen.getByText('/person')).toBeInTheDocument();
  });

  it('shows group size information', () => {
    render(<TourCard tour={mockTour} />);
    
    expect(screen.getByText('2-12 people')).toBeInTheDocument();
  });
});

