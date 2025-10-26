# Crypto Casino Demo - Email Marketing Platform

A complete Next.js 14 email marketing demo for crypto casino affiliate marketing. Features real-time email sending, MongoDB subscriber management, and a beautiful responsive UI.

## Features

- ✅ **Newsletter Subscription** - Users can subscribe with email consent
- ✅ **Welcome Email** - Automatic welcome email sent via Resend API
- ✅ **Admin Dashboard** - View subscriber stats and recent signups
- ✅ **Newsletter Publishing** - Send newsletters to all subscribers instantly
- ✅ **Password Protected Admin** - Simple password protection (casino@demo)
- ✅ **MongoDB Integration** - Secure subscriber data storage
- ✅ **Responsive Design** - Beautiful UI with Tailwind CSS and Framer Motion
- ✅ **GDPR Compliant** - Privacy policy, consent checkboxes, unsubscribe links
- ✅ **Free Tier** - $0 cost using MongoDB Atlas Free + Resend Free

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Database:** MongoDB Atlas
- **Email Service:** Resend
- **Email Templates:** React Email
- **Deployment:** Vercel

## Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (free tier)
- Resend account (free tier - 3,000 emails/month)

## Setup Instructions

### 1. Install Dependencies

```bash
cd crypto-casino-demo
npm install
```

### 2. Environment Variables

The `.env.local` file is already configured with your credentials:

```env
MONGODB_URI=mongodb+srv://promisevisionsu_db_user:5Ieu0RneDmv65qZG@cluster0.k5uuz7y.mongodb.net/?appName=Cluster0
MONGODB_DB=crypto_casino_demo
RESEND_API_KEY=re_VURWE1Y6_NBNsaZhM7SaweRGJhZk5nGUY
ADMIN_PASSWORD=casino@demo
FROM_EMAIL=onboarding@resend.dev
FROM_NAME=Crypto Casino Hub
```

**Note:** For production, update these values and never commit `.env.local` to git.

### 3. MongoDB Setup

Your MongoDB connection is already configured. The database will automatically create collections on first use:

- `subscribers` - Stores email subscribers
- `posts` - Stores published newsletters

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
crypto-casino-demo/
├── app/
│   ├── admin/              # Admin dashboard
│   │   ├── page.tsx        # Dashboard with stats
│   │   └── publish/
│   │       └── page.tsx    # Newsletter publishing page
│   ├── api/
│   │   ├── subscribe/
│   │   │   └── route.ts    # Subscription API (POST/GET)
│   │   └── newsletter/
│   │       └── route.ts    # Newsletter sending API
│   ├── privacy/            # Privacy policy page
│   ├── terms/              # Terms of service page
│   ├── responsible-gaming/ # Responsible gaming page
│   ├── layout.tsx          # Root layout with header/footer
│   ├── page.tsx            # Homepage
│   └── globals.css         # Global styles
├── components/
│   └── NewsletterForm.tsx  # Subscription form component
├── emails/
│   ├── WelcomeEmail.tsx    # Welcome email template
│   └── NewsletterEmail.tsx # Newsletter template
├── lib/
│   └── mongodb.ts          # MongoDB connection utility
├── .env.local              # Environment variables (configured)
├── .env.example            # Example env file
├── .gitignore              # Git ignore rules
├── tailwind.config.ts      # Tailwind configuration
├── next.config.js          # Next.js configuration
├── vercel.json             # Vercel deployment config
└── package.json            # Dependencies
```

## Usage Guide

### For Users (Homepage)

1. Visit the homepage
2. Enter email address in the newsletter form
3. Check the privacy policy consent checkbox
4. Click "Get Exclusive Bonuses"
5. Receive instant welcome email

### For Admin

1. Navigate to `/admin`
2. Login with password: `casino@demo`
3. View subscriber statistics
4. Click "Publish & Send Newsletter" to create new post

### Publishing Newsletter

1. Go to `/admin/publish`
2. Login with password: `casino@demo`
3. Fill in newsletter details:
   - Email subject / Post title
   - Newsletter introduction
   - 3 featured casinos with bonuses and features
4. Click "Publish & Send to All Subscribers"
5. Newsletter is sent immediately to all active subscribers

## API Endpoints

### POST /api/subscribe
Subscribe a new email address

**Request:**
```json
{
  "email": "user@example.com",
  "consent": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully subscribed!"
}
```

### GET /api/subscribe
Get subscriber statistics (admin only)

**Response:**
```json
{
  "total": 150,
  "newToday": 5,
  "recent": [...]
}
```

### POST /api/newsletter
Send newsletter to all subscribers

**Request:**
```json
{
  "password": "casino@demo",
  "postTitle": "This Week's Top Bonuses",
  "postContent": "Check out these exclusive offers...",
  "featuredCasinos": [...]
}
```

**Response:**
```json
{
  "success": true,
  "sent": 150,
  "failed": 0,
  "total": 150
}
```

## Deployment to Vercel

### Option 1: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables
vercel env add MONGODB_URI
vercel env add MONGODB_DB
vercel env add RESEND_API_KEY
vercel env add ADMIN_PASSWORD
vercel env add FROM_EMAIL
vercel env add FROM_NAME

# Deploy to production
vercel --prod
```

### Option 2: Using Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variables in Settings > Environment Variables
6. Deploy

## Environment Variables for Vercel

Add these in Vercel Dashboard > Settings > Environment Variables:

| Variable | Value |
|----------|-------|
| `MONGODB_URI` | Your MongoDB connection string |
| `MONGODB_DB` | `crypto_casino_demo` |
| `RESEND_API_KEY` | Your Resend API key |
| `ADMIN_PASSWORD` | `casino@demo` (change for production) |
| `FROM_EMAIL` | `onboarding@resend.dev` |
| `FROM_NAME` | `Crypto Casino Hub` |

## Security Notes

⚠️ **Important for Production:**

1. **Change Admin Password** - Update `ADMIN_PASSWORD` environment variable
2. **Custom Domain for Emails** - Replace `onboarding@resend.dev` with your verified domain
3. **Add SPF/DKIM Records** - Configure in Resend for better deliverability
4. **Rate Limiting** - Consider adding rate limiting to prevent abuse
5. **Input Validation** - Already implemented, but review for your use case

## Spam Prevention

The demo includes spam prevention measures:

- ✅ Unsubscribe links in all emails (required by CAN-SPAM)
- ✅ Privacy policy consent checkbox (GDPR compliance)
- ✅ Resend handles SPF/DKIM/DMARC authentication
- ✅ Batch sending (100 emails at a time)
- ✅ Professional email templates
- ✅ No spam keywords in content

## Testing Checklist

- [ ] Homepage loads correctly
- [ ] Newsletter subscription works
- [ ] Welcome email is received
- [ ] Admin dashboard shows stats
- [ ] Admin login requires password
- [ ] Newsletter publishing page works
- [ ] Newsletter emails are sent to subscribers
- [ ] Privacy/Terms pages load
- [ ] Responsive design works on mobile
- [ ] All links work correctly

## Troubleshooting

### MongoDB Connection Error
- Verify `MONGODB_URI` is correct
- Check MongoDB Atlas Network Access allows your IP (0.0.0.0/0 for Vercel)
- Ensure database user has read/write permissions

### Email Not Sending
- Verify `RESEND_API_KEY` is correct
- Check Resend dashboard for quota (3,000/month free)
- For production, add custom domain in Resend

### Build Errors
- Run `npm install --legacy-peer-deps` if dependency conflicts occur
- Ensure Node.js version is 18 or higher
- Clear `.next` folder and rebuild

## Free Tier Limits

- **Vercel:** Unlimited deployments, 100GB bandwidth/month
- **MongoDB Atlas:** 512MB storage, shared cluster
- **Resend:** 3,000 emails/month, 100 emails/day

## License

This is a demo project for portfolio/client demonstration purposes.

## Support

For questions or issues:
- Check the troubleshooting section above
- Review the code comments for implementation details
- Verify environment variables are correctly set

---

**Demo Admin Credentials:**
- Password: `casino@demo`

**Built with Next.js 14, MongoDB, and Resend**
