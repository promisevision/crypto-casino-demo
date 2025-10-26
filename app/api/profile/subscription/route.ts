import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import clientPromise from '@/lib/mongodb';
import { Resend } from 'resend';
import SubscriptionEmail from '@/emails/SubscriptionEmail';
import UnsubscriptionEmail from '@/emails/UnsubscriptionEmail';
import { authOptions } from '@/lib/auth';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { subscribe } = await request.json();

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'crypto_casino_demo');
    const users = db.collection('users');
    const subscribers = db.collection('subscribers');

    // Update user subscription status
    await users.updateOne(
      { email: session.user.email },
      { $set: { isSubscribed: subscribe } }
    );

    if (subscribe) {
      // Add to subscribers collection if not exists
      const existingSubscriber = await subscribers.findOne({ email: session.user.email });

      if (!existingSubscriber) {
        await subscribers.insertOne({
          email: session.user.email,
          consent: true,
          subscribedAt: new Date(),
          status: 'active',
        });
      } else {
        // Reactivate if previously unsubscribed
        await subscribers.updateOne(
          { email: session.user.email },
          { $set: { status: 'active' } }
        );
      }

      // Send subscription confirmation email
      try {
        await resend.emails.send({
          from: `${process.env.FROM_NAME || 'Crypto Casino Hub'} <${process.env.FROM_EMAIL || 'onboarding@resend.dev'}>`,
          to: session.user.email,
          subject: 'You\'re now subscribed to Crypto Casino Hub!',
          react: SubscriptionEmail({ userName: session.user.name }),
        });
        console.log(`✅ Subscription email sent to ${session.user.email}`);
      } catch (emailError) {
        console.error('Failed to send subscription email:', emailError);
      }

      return NextResponse.json({
        success: true,
        message: 'Successfully subscribed! You will receive emails about new casino reviews.',
      });
    } else {
      // Unsubscribe - update status to inactive
      await subscribers.updateOne(
        { email: session.user.email },
        { $set: { status: 'inactive', unsubscribedAt: new Date() } }
      );

      // Send unsubscription confirmation email
      try {
        await resend.emails.send({
          from: `${process.env.FROM_NAME || 'Crypto Casino Hub'} <${process.env.FROM_EMAIL || 'onboarding@resend.dev'}>`,
          to: session.user.email,
          subject: 'You\'ve been unsubscribed from Crypto Casino Hub',
          react: UnsubscriptionEmail({ userName: session.user.name }),
        });
        console.log(`✅ Unsubscription email sent to ${session.user.email}`);
      } catch (emailError) {
        console.error('Failed to send unsubscription email:', emailError);
      }

      return NextResponse.json({
        success: true,
        message: 'Successfully unsubscribed. You will no longer receive newsletter emails.',
      });
    }
  } catch (error) {
    console.error('Subscription toggle error:', error);
    return NextResponse.json(
      { error: 'Failed to update subscription' },
      { status: 500 }
    );
  }
}
