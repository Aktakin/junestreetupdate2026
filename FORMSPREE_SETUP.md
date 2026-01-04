# Formspree Email Setup Guide

## Quick Setup (5 minutes)

### Step 1: Create Formspree Account
1. Go to [https://formspree.io](https://formspree.io)
2. Sign up for a free account (50 submissions/month free)
3. Click "New Form"

### Step 2: Get Your Form ID
1. After creating a form, you'll see a form endpoint like: `https://formspree.io/f/YOUR_FORM_ID`
2. Copy the `YOUR_FORM_ID` part

### Step 3: Update the Code
1. Open `src/components/CareersPage.js`
2. Find line 99: `const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {`
3. Replace `YOUR_FORM_ID` with your actual Form ID from Step 2

### Step 4: Configure Email Settings
1. In Formspree dashboard, go to your form settings
2. Set **Email To**: Your email address (e.g., `junestreetbarbershop214@gmail.com`)
3. Set **Email From**: `noreply@formspree.io` (or your custom domain if you upgrade)
4. Enable **File Uploads** (for the portfolio images)

### Step 5: Test
1. Fill out the careers form on your website
2. Submit it
3. Check your email inbox for the submission

## Alternative: Web3Forms (Even Simpler)

If you prefer an even simpler option with no signup:

1. Go to [https://web3forms.com](https://web3forms.com)
2. Enter your email and get an access key
3. Replace the Formspree code with Web3Forms

## Alternative: Resend (More Control)

If you want more control and better email delivery:

1. Sign up at [https://resend.com](https://resend.com) (3,000 emails/month free)
2. Get your API key
3. We'll need to set up a Vercel serverless function to use Resend

Let me know which option you prefer!

