import { defineStore } from 'pinia';

export const useServicesStore = defineStore('services', () => {
  const services = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const sectors = [
    {
      id: 'general-trading',
      title: 'General Trading and Supply',
      description: 'Supplying goods and commodities across South Sudan and beyond, serving both institutional and commercial markets.',
      icon: 'ShoppingBagIcon',
      category: 'trading',
    },
    {
      id: 'cleaning',
      title: 'Cleaning and Facility Services',
      description: 'Professional cleaning solutions for businesses and institutions, maintaining high standards of hygiene and presentation.',
      icon: 'SparklesIcon',
      category: 'services',
    },
    {
      id: 'money-transfer',
      title: 'Money Transfer and Financial Services',
      description: 'Secure money transfer, currency exchange, and financial agency services connecting South Sudan to global markets.',
      icon: 'CurrencyDollarIcon',
      category: 'financial',
    },
    {
      id: 'petroleum',
      title: 'Petroleum and Energy Products',
      description: 'Fuel supply, petroleum products, and energy distribution to power South Sudan\'s growing economy.',
      icon: 'FireIcon',
      category: 'energy',
    },
    {
      id: 'transport',
      title: 'Transportation and Logistics',
      description: 'Haulage, cargo transport, and customs clearing services ensuring goods reach their destination reliably.',
      icon: 'TruckIcon',
      category: 'logistics',
    },
    {
      id: 'agriculture',
      title: 'Agriculture and Farming',
      description: 'Commercial farming, animal rearing, and agri-product export supporting South Sudan\'s food security.',
      icon: 'SunIcon',
      category: 'agriculture',
    },
    {
      id: 'real-estate',
      title: 'Real Estate and Property Leasing',
      description: 'Acquiring, leasing, and managing land and property assets for commercial and residential use.',
      icon: 'BuildingOffice2Icon',
      category: 'real-estate',
    },
    {
      id: 'wholesale',
      title: 'Wholesale and Retail Distribution',
      description: 'Distributing skincare, produce, and commodities across South Sudan through established retail channels.',
      icon: 'BuildingStorefrontIcon',
      category: 'distribution',
    },
  ];

  async function fetchServices() {
    loading.value = true;
    error.value = null;
    try {
      const client = useSupabaseClient();
      const { data } = await client
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');

      if (data && data.length > 0) {
        services.value = data;
      } else {
        services.value = sectors;
      }
    } catch (e) {
      services.value = sectors;
    } finally {
      loading.value = false;
    }
  }

  function getServiceById(id) {
    return services.value.find(s => s.id === id) || sectors.find(s => s.id === id);
  }

  return {
    services,
    sectors,
    loading,
    error,
    fetchServices,
    getServiceById,
  };
});
