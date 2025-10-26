import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import clientPromise from '@/lib/mongodb';
import { Resend } from 'resend';
import NewsletterEmail from '@/emails/NewsletterEmail';
import NewsUpdateEmail from '@/emails/NewsUpdateEmail';
import NewsDeleteEmail from '@/emails/NewsDeleteEmail';
import { authOptions } from '@/lib/auth';
import { ObjectId } from 'mongodb';

const resend = new Resend(process.env.RESEND_API_KEY);

// POST - Create and publish news
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { title, imageUrl, content, rating } = await request.json();

    // Validate input
    if (!title || !imageUrl || !content || !rating) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'crypto_casino_demo');
    const news = db.collection('news');
    const users = db.collection('users');

    // Save news article to database
    const newsArticle = {
      title,
      imageUrl,
      content,
      rating,
      author: session.user.name,
      authorEmail: session.user.email,
      publishedAt: new Date(),
      sentTo: 0,
    };

    const result = await news.insertOne(newsArticle);

    // Get all subscribed users
    const subscribedUsers = await users
      .find({ isSubscribed: true })
      .toArray();

    if (subscribedUsers.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'News published but no subscribers to send to',
        sent: 0,
        newsId: result.insertedId.toString(),
      });
    }

    // Send emails in batches of 100
    const batchSize = 100;
    let sentCount = 0;

    for (let i = 0; i < subscribedUsers.length; i += batchSize) {
      const batch = subscribedUsers.slice(i, i + batchSize);

      const emailPromises = batch.map(async (user) => {
        try {
          await resend.emails.send({
            from: `${process.env.FROM_NAME || 'Crypto Casino Hub'} <${process.env.FROM_EMAIL || 'onboarding@resend.dev'}>`,
            to: user.email,
            subject: title,
            react: NewsletterEmail({
              title,
              imageUrl,
              content,
              rating,
              userName: user.name,
            }),
          });
          sentCount++;
        } catch (error) {
          console.error(`Failed to send to ${user.email}:`, error);
        }
      });

      await Promise.all(emailPromises);

      // Small delay between batches
      if (i + batchSize < subscribedUsers.length) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    // Update news article with sent count
    await news.updateOne(
      { _id: result.insertedId },
      { $set: { sentTo: sentCount } }
    );

    return NextResponse.json({
      success: true,
      message: `News published and sent to ${sentCount} subscribers`,
      sent: sentCount,
      newsId: result.insertedId.toString(),
    });
  } catch (error) {
    console.error('News publishing error:', error);
    return NextResponse.json(
      { error: 'Failed to publish news' },
      { status: 500 }
    );
  }
}

// GET - Fetch all news articles
export async function GET(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'crypto_casino_demo');
    const news = db.collection('news');

    const articles = await news
      .find({})
      .sort({ publishedAt: -1 })
      .limit(50)
      .toArray();

    return NextResponse.json({
      articles: articles.map(article => ({
        id: article._id.toString(),
        title: article.title,
        imageUrl: article.imageUrl,
        content: article.content,
        rating: article.rating,
        author: article.author,
        publishedAt: article.publishedAt,
        sentTo: article.sentTo,
      })),
    });
  } catch (error) {
    console.error('Get news error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}

// PUT - Update a news article
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id, title, imageUrl, content, rating } = await request.json();

    // Validate input
    if (!id || !title || !imageUrl || !content || !rating) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'crypto_casino_demo');
    const news = db.collection('news');

    // Update news article
    const result = await news.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          title,
          imageUrl,
          content,
          rating,
          updatedAt: new Date(),
        }
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'News article not found' },
        { status: 404 }
      );
    }

    // Send update notification to subscribers
    const users = db.collection('users');
    const subscribedUsers = await users
      .find({ isSubscribed: true })
      .toArray();

    if (subscribedUsers.length > 0) {
      const batchSize = 100;
      for (let i = 0; i < subscribedUsers.length; i += batchSize) {
        const batch = subscribedUsers.slice(i, i + batchSize);

        const emailPromises = batch.map(async (user) => {
          try {
            await resend.emails.send({
              from: `${process.env.FROM_NAME || 'Crypto Casino Hub'} <${process.env.FROM_EMAIL || 'onboarding@resend.dev'}>`,
              to: user.email,
              subject: `Article Updated: ${title}`,
              react: NewsUpdateEmail({
                title,
                userName: user.name,
              }),
            });
          } catch (error) {
            console.error(`Failed to send update email to ${user.email}:`, error);
          }
        });

        await Promise.all(emailPromises);

        if (i + batchSize < subscribedUsers.length) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
      console.log(`✅ Update notification sent to ${subscribedUsers.length} subscribers`);
    }

    return NextResponse.json({
      success: true,
      message: 'News article updated successfully',
    });
  } catch (error) {
    console.error('News update error:', error);
    return NextResponse.json(
      { error: 'Failed to update news' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a news article
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'News ID is required' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'crypto_casino_demo');
    const news = db.collection('news');

    // Get the article before deleting to send notification
    const article = await news.findOne({ _id: new ObjectId(id) });

    if (!article) {
      return NextResponse.json(
        { error: 'News article not found' },
        { status: 404 }
      );
    }

    // Delete news article
    const result = await news.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'News article not found' },
        { status: 404 }
      );
    }

    // Send deletion notification to subscribers
    const users = db.collection('users');
    const subscribedUsers = await users
      .find({ isSubscribed: true })
      .toArray();

    if (subscribedUsers.length > 0) {
      const batchSize = 100;
      for (let i = 0; i < subscribedUsers.length; i += batchSize) {
        const batch = subscribedUsers.slice(i, i + batchSize);

        const emailPromises = batch.map(async (user) => {
          try {
            await resend.emails.send({
              from: `${process.env.FROM_NAME || 'Crypto Casino Hub'} <${process.env.FROM_EMAIL || 'onboarding@resend.dev'}>`,
              to: user.email,
              subject: `Article Removed: ${article.title}`,
              react: NewsDeleteEmail({
                title: article.title,
                userName: user.name,
              }),
            });
          } catch (error) {
            console.error(`Failed to send deletion email to ${user.email}:`, error);
          }
        });

        await Promise.all(emailPromises);

        if (i + batchSize < subscribedUsers.length) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
      console.log(`✅ Deletion notification sent to ${subscribedUsers.length} subscribers`);
    }

    return NextResponse.json({
      success: true,
      message: 'News article deleted successfully',
    });
  } catch (error) {
    console.error('News delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete news' },
      { status: 500 }
    );
  }
}
