-- ============================================
-- WASH Consult — Complete Supabase Schema
-- ============================================
-- Run this ENTIRE file in your Supabase SQL Editor:
--   Supabase Dashboard → SQL Editor → New Query
--   Paste everything → Click "Run"
-- ============================================

-- ============================================
-- 1. PROFILES TABLE (linked to auth.users)
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 2. INQUIRIES TABLE (contact form)
-- ============================================
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  phone VARCHAR(20),
  service_interest VARCHAR(100),
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new','read','replied')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 3. SERVICES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  icon_name VARCHAR(50),
  category VARCHAR(50),
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 4. NEWS POSTS TABLE (gallery/news)
-- ============================================
CREATE TABLE IF NOT EXISTS news_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  content TEXT,
  image_url TEXT,
  excerpt VARCHAR(300),
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 5. STORIES TABLE (user content)
-- ============================================
CREATE TABLE IF NOT EXISTS stories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  thumbnail TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 6. COMMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  story_id UUID REFERENCES stories(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 7. BOOKMARKS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS bookmarks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  story_id UUID REFERENCES stories(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(story_id, user_id)
);

-- ============================================
-- INDEXES (for performance)
-- ============================================
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_services_sort ON services(sort_order);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(is_active);
CREATE INDEX IF NOT EXISTS idx_news_published ON news_posts(published);
CREATE INDEX IF NOT EXISTS idx_news_created_at ON news_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_stories_user_id ON stories(user_id);
CREATE INDEX IF NOT EXISTS idx_stories_status ON stories(status);
CREATE INDEX IF NOT EXISTS idx_stories_created_at ON stories(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_comments_story_id ON comments(story_id);
CREATE INDEX IF NOT EXISTS idx_comments_user_id ON comments(user_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_user_id ON bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_story_id ON bookmarks(story_id);

-- ============================================
-- ROW LEVEL SECURITY — Enable on all tables
-- ============================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES: profiles
-- ============================================
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ============================================
-- RLS POLICIES: inquiries
-- ============================================
CREATE POLICY "Public can insert inquiries"
  ON inquiries FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admin can read all inquiries"
  ON inquiries FOR SELECT
  USING (
    auth.role() = 'authenticated'
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admin can update inquiries"
  ON inquiries FOR UPDATE
  USING (
    auth.role() = 'authenticated'
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- ============================================
-- RLS POLICIES: services
-- ============================================
CREATE POLICY "Public can read active services"
  ON services FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admin can manage services"
  ON services FOR ALL
  USING (
    auth.role() = 'authenticated'
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- ============================================
-- RLS POLICIES: news_posts
-- ============================================
CREATE POLICY "Public can read published posts"
  ON news_posts FOR SELECT
  USING (published = true);

CREATE POLICY "Admin can manage news posts"
  ON news_posts FOR ALL
  USING (
    auth.role() = 'authenticated'
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- ============================================
-- RLS POLICIES: stories
-- ============================================
CREATE POLICY "Public can read published stories"
  ON stories FOR SELECT
  USING (status = 'published');

CREATE POLICY "Owner can create stories"
  ON stories FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Owner can update own stories"
  ON stories FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Owner can delete own stories"
  ON stories FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- RLS POLICIES: comments
-- ============================================
CREATE POLICY "Public can read comments"
  ON comments FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create comments"
  ON comments FOR INSERT
  WITH CHECK (auth.role() = 'authenticated' AND auth.uid() = user_id);

CREATE POLICY "Owner can delete own comments"
  ON comments FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- RLS POLICIES: bookmarks
-- ============================================
CREATE POLICY "Owner can read own bookmarks"
  ON bookmarks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Owner can create bookmarks"
  ON bookmarks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Owner can delete own bookmarks"
  ON bookmarks FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- AUTO-CREATE PROFILE ON SIGNUP (Trigger)
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.email,
    'user'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists, then create
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- SEED DATA: Services
-- ============================================
INSERT INTO services (title, description, icon_name, category, sort_order)
SELECT * FROM (VALUES
  ('General Trading and Supply', 'Supplying goods and commodities across South Sudan and beyond, serving both institutional and commercial markets.', 'ShoppingBagIcon', 'trading', 1),
  ('Cleaning and Facility Services', 'Professional cleaning solutions for businesses and institutions, maintaining high standards of hygiene and presentation.', 'SparklesIcon', 'services', 2),
  ('Money Transfer and Financial Services', 'Secure money transfer, currency exchange, and financial agency services connecting South Sudan to global markets.', 'CurrencyDollarIcon', 'financial', 3),
  ('Petroleum and Energy Products', 'Fuel supply, petroleum products, and energy distribution to power South Sudan''s growing economy.', 'FireIcon', 'energy', 4),
  ('Transportation and Logistics', 'Haulage, cargo transport, and customs clearing services ensuring goods reach their destination reliably.', 'TruckIcon', 'logistics', 5),
  ('Agriculture and Farming', 'Commercial farming, animal rearing, and agri-product export supporting South Sudan''s food security.', 'SunIcon', 'agriculture', 6),
  ('Real Estate and Property Leasing', 'Acquiring, leasing, and managing land and property assets for commercial and residential use.', 'BuildingOffice2Icon', 'real-estate', 7),
  ('Wholesale and Retail Distribution', 'Distributing skincare, produce, and commodities across South Sudan through established retail channels.', 'BuildingStorefrontIcon', 'distribution', 8)
) AS v(title, description, icon_name, category, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM services LIMIT 1);

-- ============================================
-- SEED DATA: Sample News Post
-- ============================================
INSERT INTO news_posts (title, content, excerpt, published)
SELECT
  'WASH Consult Launches Operations in Juba',
  'WASH – Consult General Trading Co. Ltd is proud to announce the official launch of our operations in Juba, South Sudan. Our company is now fully registered under the Companies Act 2012 and ready to serve clients across eight strategic business sectors.',
  'WASH Consult officially launches operations in Juba, South Sudan, bringing multi-sector trading services to the region.',
  true
WHERE NOT EXISTS (SELECT 1 FROM news_posts LIMIT 1);

-- ============================================
-- STORAGE BUCKETS (run this section separately if needed)
-- ============================================
-- Note: Storage buckets are created via the Supabase Dashboard.
-- Go to: Storage → New Bucket
-- Create these buckets:
--   1. avatars       → Public
--   2. story-images  → Public
--   3. gallery       → Public
--   4. documents     → Private
-- ============================================
