# Supabase Setup Instructions for June Street Admin Dashboard

## Step 1: Create Supabase Account & Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" and sign up (you can use GitHub)
3. Click "New Project"
4. Fill in:
   - **Name**: JuneStreet (or any name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to you
5. Click "Create new project" and wait for setup (~2 minutes)

---

## Step 2: Get Your API Keys

1. In your Supabase project, go to **Settings** (gear icon) → **API**
2. Copy these two values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (under "Project API keys")

---

## Step 3: Create the Barbers Table

1. Go to **SQL Editor** in the left sidebar
2. Click "New query"
3. Paste this SQL and click "Run":

```sql
-- Create barbers table
CREATE TABLE barbers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  image TEXT DEFAULT '/images/placeholder.jpg',
  booking_type TEXT NOT NULL CHECK (booking_type IN ('external', 'internal')),
  booking_link TEXT,
  phone TEXT,
  is_visible BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert current barbers
INSERT INTO barbers (name, booking_type, booking_link, phone, display_order) VALUES
  ('Zacc', 'external', 'http://book.thecut.co/zacc-Mitchell-cutsbyzdfw', NULL, 1),
  ('Savant', 'external', 'http://thesavant.booksy.com/a/', NULL, 2),
  ('Vino', 'external', 'http://cutzbyvino.booksy.com/a/', NULL, 3),
  ('KP', 'internal', NULL, '+1 (214) 991-6181', 4),
  ('Coffey', 'internal', NULL, '+1 (469) 540-8025', 5);

-- Enable Row Level Security
ALTER TABLE barbers ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read visible barbers
CREATE POLICY "Public can view visible barbers" ON barbers
  FOR SELECT USING (is_visible = true);

-- Policy: Authenticated users can do everything
CREATE POLICY "Authenticated users have full access" ON barbers
  FOR ALL USING (auth.role() = 'authenticated');
```

---

## Step 4: Create Your Admin User

1. Go to **Authentication** in the left sidebar
2. Click **Users** tab
3. Click "Add user" → "Create new user"
4. Enter:
   - **Email**: your email address
   - **Password**: create a strong password
5. Click "Create user"

---

## Step 5: Configure Your React App

1. Install Supabase client:
```bash
npm install @supabase/supabase-js
```

2. Create a `.env` file in your project root (same level as package.json):
```
REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
```

3. **IMPORTANT**: Add `.env` to your `.gitignore` file to keep keys private:
```
# .gitignore
.env
.env.local
```

4. Restart your development server:
```bash
npm start
```

---

## Step 6: Access Your Admin Dashboard

1. Navigate to: `http://localhost:3000/admin300389708`
2. Login with the email and password you created in Step 4
3. You can now:
   - View all barbers
   - Add new barbers
   - Edit barber details (name, link, phone)
   - Toggle visibility (hide/show)
   - Delete barbers

---

## Troubleshooting

### "Invalid API key" error
- Make sure your `.env` file has the correct keys
- Restart the dev server after adding `.env`

### "User not found" on login
- Check you created the user in Supabase Authentication
- Verify email and password are correct

### Barbers not showing on website
- Check `is_visible` is `true` in the database
- Check browser console for errors

### Changes not saving
- Check Supabase dashboard for any RLS policy errors
- Make sure you're logged in to the admin panel

---

## Security Notes

1. **Never commit `.env` file** to version control
2. **Change the admin URL** (`/admin300389708`) periodically
3. **Use strong passwords** for your admin account
4. The anon key is safe to use client-side (RLS protects data)

---

## Need Help?

- Supabase Docs: https://supabase.com/docs
- Supabase Discord: https://discord.supabase.com



