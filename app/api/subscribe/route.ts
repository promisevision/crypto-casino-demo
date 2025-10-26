import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Resend } from 'resend';
import WelcomeEmail from '@/emails/WelcomeEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, consent } = await request.json();

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Validate consent
    if (!consent) {
      return NextResponse.json(
        { error: 'You must agree to the privacy policy' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'crypto_casino_demo');
    const subscribers = db.collection('subscribers');

    // Check if email already exists
    const existingSubscriber = await subscribers.findOne({ email });
    if (existingSubscriber) {
      return NextResponse.json(
        { error: 'This email is already subscribed' },
        { status: 400 }
      );
    }

    // Add new subscriber
    await subscribers.insertOne({
      email,
      consent,
      subscribedAt: new Date(),
      status: 'active',
    });

    // Send welcome email
    try {
      await resend.emails.send({
        from: `${process.env.FROM_NAME || 'Crypto Casino Hub'} <${process.env.FROM_EMAIL || 'onboarding@resend.dev'}>`,
        to: email,
        subject: 'Welcome to Crypto Casino Hub!',
        react: WelcomeEmail({ email }),
      });
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
      // Don't fail the subscription if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed! Check your email for a welcome message.',
    });
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'An error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'crypto_casino_demo');
    const subscribers = db.collection('subscribers');

    const total = await subscribers.countDocuments({ status: 'active' });

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const newToday = await subscribers.countDocuments({
      status: 'active',
      subscribedAt: { $gte: today },
    });

    const recent = await subscribers
      .find({ status: 'active' })
      .sort({ subscribedAt: -1 })
      .limit(10)
      .toArray();

    return NextResponse.json({
      total,
      newToday,
      recent: recent.map((sub) => ({
        email: sub.email,
        subscribedAt: sub.subscribedAt,
      })),
    });
  } catch (error) {
    console.error('Get subscribers error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscribers' },
      { status: 500 }
    );
  }
}
