# Crypto Casino Demo - Complete Setup Guide

## Project Overview

A fully functional crypto casino news platform with:
- ✅ User authentication system (login/signup)
- ✅ Admin vs regular user roles
- ✅ News feed with article publishing
- ✅ Email newsletter system with subscription management
- ✅ User profile with subscribe/unsubscribe functionality
- ✅ Session-based navigation with avatar dropdown

## Quick Start

### 1. Install Dependencies

```bash
cd crypto-casino-demo
npm install
```

### 2. Environment is Already Configured

The `.env.local` file is already set up with:
- MongoDB connection
- Resend API key
- Admin credentials
- NextAuth configuration

### 3. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000

### 4. Create Admin Account

1. Go to http://localhost:3000/auth/signup
2. Use these EXACT credentials:
   - Email: `admin@email.com`
   - Password: `casino@demo`
   - Name: Any name you want
3. This will automatically create an admin account

### 5. Create Regular User Account

1. Sign up with any other email and password
2. This creates a regular user account

## User Flows

### For Admin Users (admin@email.com)

**After Login:**
1. Homepage shows news feed with all published articles
2. Header shows avatar with dropdown menu:
   - Profile & Settings
   - Admin Dashboard (admin only)
   - Publish News (admin only)
   - Sign Out

**Admin Dashboard** (`/admin`):
- View all users (name, email, role, subscription status)
- Delete users (removes user + all subscriptions)
- View statistics (total users, subscribed, admins)
- Quick action: Publish News

**Publish News** (`/admin/publish`):
- Enter article title
- Paste image URL
- Write article content
- Write expert review
- See live preview
- Publish & send to all subscribers instantly

### For Regular Users

**After Login:**
1. Homepage shows news feed
2. Header shows avatar with dropdown:
   - Profile & Settings
   - Sign Out

**Profile Page** (`/profile`):
- View profile information
- Subscribe/Unsubscribe to newsletter
- When subscribed: Receive welcome email
- When news published: Receive newsletter email
- Privacy information

## Features Implemented

### 1. Authentication System
- **Login:** `/auth/signin`
- **Signup:** `/auth/signup`
- **Session Management:** JWT-based with NextAuth
- **Auto-detect Admin:** `admin@email.com` + `casino@demo` = admin role
- **Password Hashing:** bcrypt

### 2. News Publishing (Admin Only)
- **Form Fields:**
  - Title (required)
  - Image URL (required)
  - Content (textarea, required)
  - Expert Review (textarea, required)
- **Features:**
  - Live preview
  - Saves to MongoDB `news` collection
  - Sends email to all subscribed users
  - Batch sending (100 at a time)

### 3. Email System
- **Welcome Email:** Sent when user subscribes
- **Newsletter Email:** Sent when admin publishes news
- **Email Service:** Resend (free 3,000/month)
- **Templates:** React Email components with proper styling

### 4. Subscription Management
- **Subscribe:** From profile page
- **Unsubscribe:** From profile page
- **Status Tracking:** MongoDB `users.isSubscribed` field
- **Subscribers Collection:** Separate collection for email tracking

### 5. User Management (Admin Only)
- **View All Users:** Table with all user information
- **Delete User:** Removes user and all subscription data
- **Statistics:** Total, subscribed, admin counts

## Database Collections

### users
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: "admin" | "user",
  isSubscribed: Boolean,
  createdAt: Date
}
```

### subscribers
```javascript
{
  email: String,
  consent: Boolean,
  subscribedAt: Date,
  status: "active" | "inactive",
  unsubscribedAt: Date (optional)
}
```

### news
```javascript
{
  title: String,
  imageUrl: String,
  content: String,
  review: String,
  author: String,
  authorEmail: String,
  publishedAt: Date,
  sentTo: Number
}
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/[...nextauth]` - NextAuth login/logout
- `GET /api/auth/[...nextauth]` - Session check

### News
- `POST /api/news` - Create and publish news (admin only)
- `GET /api/news` - Get all news articles

### Users (Admin Only)
- `GET /api/users` - Get all users
- `DELETE /api/users` - Delete user and subscriptions

### Profile
- `GET /api/profile` - Get current user profile
- `POST /api/profile/subscription` - Subscribe/unsubscribe

## File Structure

```
crypto-casino-demo/
├── app/
│   ├── admin/
│   │   ├── page.tsx                    # Admin dashboard
│   │   └── publish/page.tsx            # Publish news
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [...nextauth]/route.ts  # NextAuth config
│   │   │   └── register/route.ts       # Registration
│   │   ├── news/route.ts               # News CRUD
│   │   ├── users/route.ts              # User management
│   │   └── profile/
│   │       ├── route.ts                # Profile info
│   │       └── subscription/route.ts   # Subscribe/unsubscribe
│   ├── auth/
│   │   ├── signin/page.tsx             # Login page
│   │   └── signup/page.tsx             # Signup page
│   ├── profile/page.tsx                # User profile
│   ├── page.tsx                        # News feed (homepage)
│   ├── layout.tsx                      # Root layout
│   ├── providers.tsx                   # SessionProvider
│   └── globals.css                     # Global styles
├── components/
│   ├── Header.tsx                      # Header with avatar dropdown
│   └── NewsletterForm.tsx              # Subscription form
├── emails/
│   ├── WelcomeEmail.tsx                # Welcome email template
│   └── NewsletterEmail.tsx             # Newsletter template
├── lib/
│   └── mongodb.ts                      # MongoDB connection
├── types/
│   └── next-auth.d.ts                  # NextAuth type definitions
├── .env.local                          # Environment variables (configured)
├── .env.example                        # Example env file
└── package.json                        # Dependencies
```

## Testing Guide

### Test Admin Flow
1. Sign up with `admin@email.com` / `casino@demo`
2. Should redirect to homepage (news feed)
3. Click avatar → see admin menu items
4. Go to Admin Dashboard → see user list
5. Go to Publish News → create article
6. Publish → email sent to subscribers

### Test User Flow
1. Sign up with any email/password
2. Should redirect to homepage
3. Click avatar → only see Profile & Sign Out
4. Go to Profile → subscribe to newsletter
5. Should receive welcome email
6. When admin publishes news → receive newsletter

### Test User Deletion (Admin)
1. Login as admin
2. Go to Admin Dashboard
3. Click "Delete" on a user
4. Confirm deletion
5. User should be removed
6. Subscription should also be removed

## Deployment to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/crypto-casino-demo.git
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to https://vercel.com
2. Click "New Project"
3. Import GitHub repository
4. Add environment variables:
   - `MONGODB_URI`
   - `MONGODB_DB`
   - `RESEND_API_KEY`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
   - `FROM_EMAIL`
   - `FROM_NAME`
   - `NEXTAUTH_URL` (your deployed URL)
   - `NEXTAUTH_SECRET`
5. Deploy

## Key Differences from Original Plan

### Changed:
1. ✅ No separate newsletter subscription page - integrated into profile
2. ✅ Removed casino feature fields - simplified to image/title/content/review
3. ✅ Added admin detection on signup (admin@email.com + casino@demo)
4. ✅ Header with avatar dropdown instead of traditional nav
5. ✅ News feed as main page (not landing page)

### Added:
1. ✅ Complete authentication system
2. ✅ User management (view/delete users)
3. ✅ Session-based navigation
4. ✅ Profile page with subscription management
5. ✅ Real-time subscription status

## Admin Credentials

- **Email:** admin@email.com
- **Password:** casino@demo

**Important:** Sign up with these EXACT credentials to get admin role!

## Support

All features are fully implemented and tested:
- ✅ Login/Signup with session management
- ✅ Admin vs user role detection
- ✅ News publishing with email sending
- ✅ User management with deletion
- ✅ Profile with subscribe/unsubscribe
- ✅ Header with avatar dropdown
- ✅ News feed homepage

Ready to use immediately after `npm install` and `npm run dev`!
