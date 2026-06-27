import { createClient } from '@supabase/supabase-js';

// Fallback data used when Supabase is not configured
const FALLBACK_SERVICES = [
  { id: 'general-trading', title: 'General Trading and Supply', description: 'Supplying goods and commodities across South Sudan and beyond, serving both institutional and commercial markets.', icon_name: 'ShoppingBagIcon', category: 'trading', sort_order: 1 },
  { id: 'cleaning', title: 'Cleaning and Facility Services', description: 'Professional cleaning solutions for businesses and institutions, maintaining high standards of hygiene and presentation.', icon_name: 'SparklesIcon', category: 'services', sort_order: 2 },
  { id: 'money-transfer', title: 'Money Transfer and Financial Services', description: 'Secure money transfer, currency exchange, and financial agency services connecting South Sudan to global markets.', icon_name: 'CurrencyDollarIcon', category: 'financial', sort_order: 3 },
  { id: 'petroleum', title: 'Petroleum and Energy Products', description: 'Fuel supply, petroleum products, and energy distribution to power South Sudan\'s growing economy.', icon_name: 'FireIcon', category: 'energy', sort_order: 4 },
  { id: 'transport', title: 'Transportation and Logistics', description: 'Haulage, cargo transport, and customs clearing services ensuring goods reach their destination reliably.', icon_name: 'TruckIcon', category: 'logistics', sort_order: 5 },
  { id: 'agriculture', title: 'Agriculture and Farming', description: 'Commercial farming, animal rearing, and agri-product export supporting South Sudan\'s food security.', icon_name: 'SunIcon', category: 'agriculture', sort_order: 6 },
  { id: 'real-estate', title: 'Real Estate and Property Leasing', description: 'Acquiring, leasing, and managing land and property assets for commercial and residential use.', icon_name: 'BuildingOffice2Icon', category: 'real-estate', sort_order: 7 },
  { id: 'wholesale', title: 'Wholesale and Retail Distribution', description: 'Distributing skincare, produce, and commodities across South Sudan through established retail channels.', icon_name: 'BuildingStorefrontIcon', category: 'distribution', sort_order: 8 },
];

export default defineEventHandler(async () => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  // If Supabase is not configured, return static fallback data
  if (!supabaseUrl || !supabaseKey) {
    return FALLBACK_SERVICES;
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('sort_order');

  if (error) {
    console.error('Services fetch error:', error.message);
    return FALLBACK_SERVICES;
  }

  return (data && data.length > 0) ? data : FALLBACK_SERVICES;
});
