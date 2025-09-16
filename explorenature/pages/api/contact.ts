import { NextApiRequest, NextApiResponse } from 'next';
import { ContactFormData, ApiResponse } from '@/types';

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
    const { name, email, phone, message, tourInterest }: ContactFormData = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
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

    // Phone validation (optional)
    if (phone) {
      const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
      if (!phoneRegex.test(phone)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid phone number',
        });
      }
    }

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In a real application, you would:
    // 1. Save to database
    // 2. Send email notification
    // 3. Add to CRM system
    // 4. Send confirmation email to customer

    console.log('Contact form submission:', {
      name,
      email,
      phone,
      message,
      tourInterest,
      timestamp: new Date().toISOString(),
    });

    // Mock successful response
    return res.status(200).json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.',
      data: {
        id: Math.random().toString(36).substr(2, 9),
        submittedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Contact form error:', error);
    
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
}

