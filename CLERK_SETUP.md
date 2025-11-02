# Clerk Authentication Setup

This application uses Clerk for user authentication. Follow these steps to set it up:

## Step 1: Create a Clerk Account

1. Go to [https://clerk.com](https://clerk.com)
2. Sign up for a free account
3. Create a new application

## Step 2: Get Your Publishable Key

1. In your Clerk dashboard, navigate to your application
2. Go to the "API Keys" section
3. Copy your **Publishable Key** (starts with `pk_test_` or `pk_live_`)

## Step 3: Configure Environment Variables

1. Create a `.env` file in the root of your project (if it doesn't exist)
2. Add your Clerk publishable key:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key_here
```

3. Replace `pk_test_your_actual_key_here` with your actual publishable key from Clerk

## Step 4: Restart Development Server

After adding the environment variable, restart your development server:

```bash
npm run dev
```

## Features

Once configured, you'll have access to:

- **Sign Up**: Users can create new accounts
- **Sign In**: Existing users can log in
- **Sign Out**: Users can sign out from the header dropdown
- **Protected Routes**: The dashboard is only accessible to signed-in users

## Test Users

For development, you can:

1. Use Clerk's test mode (no real email verification needed)
2. Create test accounts with any email
3. Sign in/out to test the authentication flow

## Troubleshooting

If you see authentication errors:

1. Check that your `.env` file is in the project root
2. Verify the key starts with `pk_test_` or `pk_live_`
3. Ensure the key doesn't have extra spaces or quotes
4. Restart your dev server after adding/changing the key

