import { NextApiRequest, NextApiResponse } from 'next';
import { NewsletterFormData, ApiResponse } from '@/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<any>>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
  }

  try {
    const { email }: NewsletterFormData = req.body;

    // Basic validation
    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email is required',
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email address',
      });
    }

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500));

    // In a real application, you would:
    // 1. Check if email already exists
    // 2. Save to database/newsletter service
    // 3. Send confirmation email
    // 4. Add to marketing automation

    console.log('Newsletter subscription:', {
      email,
      timestamp: new Date().toISOString(),
      source: 'website',
    });

    // Mock successful response
    return res.status(200).json({
      success: true,
      message: 'Successfully subscribed to our newsletter!',
      data: {
        email,
        subscribedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
}

