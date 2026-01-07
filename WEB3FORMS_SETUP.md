# Web3Forms Setup Guide

## Quick Setup (2 minutes)

### Step 1: Get Your Access Key
1. Go to [https://web3forms.com](https://web3forms.com)
2. Enter your email address (where you want to receive applications)
3. Click "Get Your Access Key"
4. Copy the access key (it will look like: `abc123-def456-ghi789`)

### Step 2: Add Access Key to Environment Variables

**Option A: Local Development (.env file)**
1. Open the `.env` file in your project root
2. Add this line:
   ```
   REACT_APP_WEB3FORMS_KEY=your-access-key-here
   ```
3. Replace `your-access-key-here` with your actual access key from Step 1

**Option B: Direct Code (Quick Test)**
1. Open `src/components/CareersPage.js`
2. Find line 81: `formDataToSend.append('access_key', process.env.REACT_APP_WEB3FORMS_KEY || 'YOUR_ACCESS_KEY_HERE');`
3. Replace `'YOUR_ACCESS_KEY_HERE'` with your actual access key (in quotes)
   ```javascript
   formDataToSend.append('access_key', 'your-actual-access-key-here');
   ```

### Step 3: Deploy to Vercel
If using environment variables (Option A):
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add new variable:
   - **Name**: `REACT_APP_WEB3FORMS_KEY`
   - **Value**: Your access key from Step 1
3. Redeploy your site

### Step 4: Test
1. Fill out the careers form on your website
2. Submit it
3. Check your email inbox for the application

## How It Works
- Form submissions are sent to Web3Forms API
- Web3Forms forwards the email to your specified email address
- All form fields and uploaded images are included in the email
- Free tier: 250 submissions/month

## Security Note
Never commit your access key to GitHub. Always use environment variables for production.


