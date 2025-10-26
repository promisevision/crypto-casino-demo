import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';
import { Resend } from 'resend';
import WelcomeEmail from '@/emails/WelcomeEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'crypto_casino_demo');
    const users = db.collection('users');

    // Check if user already exists
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists with this email' },
        { status: 400 }
      );
    }

    // Determine role (admin or user)
    const isAdmin = email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD;
    const role = isAdmin ? 'admin' : 'user';

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    await users.insertOne({
      name,
      email,
      password: hashedPassword,
      role,
      createdAt: new Date(),
      isSubscribed: false,
    });

    // Send welcome email
    try {
      await resend.emails.send({
        from: `${process.env.FROM_NAME || 'Crypto Casino Hub'} <${process.env.FROM_EMAIL || 'onboarding@resend.dev'}>`,
        to: email,
        subject: 'Welcome to Crypto Casino Hub!',
        react: WelcomeEmail({ email, userName: name }),
      });
      console.log(`✅ Welcome email sent to ${email}`);
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
      // Don't fail registration if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'User registered successfully',
      role,
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'An error occurred during registration' },
      { status: 500 }
    );
  }
}
