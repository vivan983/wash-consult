-- ============================================
-- WASH – Consult General Trading Co. Ltd
-- Supabase Database Schema
-- ============================================
-- Copy and paste this entire file into your
-- Supabase SQL Editor to set up the database.
-- ============================================

-- 1. INQUIRIES TABLE
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

-- 2. SERVICES TABLE
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

-- 3. NEWS POSTS TABLE
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
-- ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_posts ENABLE ROW LEVEL SECURITY;

-- ============================================
-- SECURITY POLICIES
-- ============================================

-- Allow anyone to submit a contact inquiry
CREATE POLICY "Public can insert inquiries"
  ON inquiries
  FOR INSERT
  WITH CHECK (true);

-- Allow anyone to read active services
CREATE POLICY "Public can read active services"
  ON services
  FOR SELECT
  USING (is_active = true);

-- Allow anyone to read published news posts
CREATE POLICY "Public can read published posts"
  ON news_posts
  FOR SELECT
  USING (published = true);

-- ============================================
-- SEED DATA — SERVICES (Optional)
-- ============================================

INSERT INTO services (title, description, icon_name, category, sort_order) VALUES
('General Trading and Supply', 'Supplying goods and commodities across South Sudan and beyond, serving both institutional and commercial markets.', 'ShoppingBagIcon', 'trading', 1),
('Cleaning and Facility Services', 'Professional cleaning solutions for businesses and institutions, maintaining high standards of hygiene and presentation.', 'SparklesIcon', 'services', 2),
('Money Transfer and Financial Services', 'Secure money transfer, currency exchange, and financial agency services connecting South Sudan to global markets.', 'CurrencyDollarIcon', 'financial', 3),
('Petroleum and Energy Products', 'Fuel supply, petroleum products, and energy distribution to power South Sudan''s growing economy.', 'FireIcon', 'energy', 4),
('Transportation and Logistics', 'Haulage, cargo transport, and customs clearing services ensuring goods reach their destination reliably.', 'TruckIcon', 'logistics', 5),
('Agriculture and Farming', 'Commercial farming, animal rearing, and agri-product export supporting South Sudan''s food security.', 'SunIcon', 'agriculture', 6),
('Real Estate and Property Leasing', 'Acquiring, leasing, and managing land and property assets for commercial and residential use.', 'BuildingOffice2Icon', 'real-estate', 7),
('Wholesale and Retail Distribution', 'Distributing skincare, produce, and commodities across South Sudan through established retail channels.', 'BuildingStorefrontIcon', 'distribution', 8);

-- ============================================
-- AUTHENTICATION SETUP
-- ============================================
-- Note: Authentication is handled by Supabase Auth.
-- Create an admin user via the Supabase Dashboard:
--   Authentication > Users > Add User
--   Use the admin email (e.g., admin@washconsult.com)
--   The admin can then sign in via the /admin page
-- ============================================
