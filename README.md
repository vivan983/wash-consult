# WASH – Consult General Trading Co. Ltd

**Connecting South Sudan to the World**

A multi-sector general trading company registered in Juba, South Sudan under the Companies Act 2012, with a share capital of US$100,000.

## Business Sectors

- General Trading and Supply
- Cleaning and Facility Services
- Money Transfer and Financial Services
- Petroleum and Energy Products
- Transportation and Logistics
- Agriculture and Farming
- Real Estate and Property Leasing
- Wholesale and Retail Distribution

## Tech Stack

- **Framework:** Nuxt 3
- **State Management:** Pinia
- **Styling:** Tailwind CSS v3
- **Database & Auth:** Supabase (PostgreSQL)
- **Email:** Nodemailer
- **Deployment:** Vercel

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and fill in your Supabase and email credentials
4. Run the SQL schema in the Supabase SQL Editor (see below)
5. Start the dev server: `npm run dev`
6. Build for production: `npm run build`

## Database Setup

Run the following SQL in your Supabase project's SQL Editor:

```sql
CREATE TABLE inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  phone VARCHAR(20),
  service_interest VARCHAR(100),
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new','read','replied')),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  icon_name VARCHAR(50),
  category VARCHAR(50),
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE news_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  content TEXT,
  image_url TEXT,
  excerpt VARCHAR(300),
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can insert inquiries" ON inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can read services" ON services FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read published posts" ON news_posts FOR SELECT USING (published = true);
```

## Environment Variables

| Variable | Description |
|---|---|
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_ANON_KEY` | Your Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service role key |
| `EMAIL_HOST` | SMTP host (e.g., smtp.gmail.com) |
| `EMAIL_PORT` | SMTP port (e.g., 587) |
| `EMAIL_USER` | SMTP username/email |
| `EMAIL_PASS` | SMTP password or app password |
| `EMAIL_TO` | Admin email for receiving inquiries |
| `NUXT_PUBLIC_SITE_URL` | Public site URL |

## License

Proprietary — All rights reserved.

© 2026 WASH – Consult General Trading Co. Ltd. Registered in Juba, South Sudan.
