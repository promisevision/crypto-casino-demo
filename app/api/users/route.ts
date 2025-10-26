import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import clientPromise from '@/lib/mongodb';
import { authOptions } from '@/lib/auth';
import { ObjectId } from 'mongodb';
import { Resend } from 'resend';
import AccountDeleteEmail from '@/emails/AccountDeleteEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

// GET all users (admin only)
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'crypto_casino_demo');
    const users = db.collection('users');

    const allUsers = await users
      .find({}, { projection: { password: 0 } })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      users: allUsers.map(user => ({
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        isSubscribed: user.isSubscribed || false,
        createdAt: user.createdAt,
      })),
    });
  } catch (error) {
    console.error('Get users error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

// DELETE user (admin only)
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'crypto_casino_demo');
    const users = db.collection('users');
    const subscribers = db.collection('subscribers');

    // Get user email before deletion
    const user = await users.findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Send account deletion email before deleting
    try {
      await resend.emails.send({
        from: `${process.env.FROM_NAME || 'Crypto Casino Hub'} <${process.env.FROM_EMAIL || 'onboarding@resend.dev'}>`,
        to: user.email,
        subject: 'Your Crypto Casino Hub account has been deleted',
        react: AccountDeleteEmail({
          userName: user.name,
          userEmail: user.email,
        }),
      });
      console.log(`✅ Account deletion email sent to ${user.email}`);
    } catch (emailError) {
      console.error('Failed to send account deletion email:', emailError);
      // Continue with deletion even if email fails
    }

    // Delete user
    await users.deleteOne({ _id: new ObjectId(userId) });

    // Delete subscription if exists
    await subscribers.deleteMany({ email: user.email });

    return NextResponse.json({
      success: true,
      message: 'User and all associated data deleted successfully',
    });
  } catch (error) {
    console.error('Delete user error:', error);
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}
