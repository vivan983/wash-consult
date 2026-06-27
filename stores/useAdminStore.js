import { defineStore } from 'pinia';

export const useAdminStore = defineStore('admin', () => {
  const inquiries = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const selectedInquiry = ref(null);

  async function fetchInquiries() {
    loading.value = true;
    error.value = null;
    try {
      const supabase = useSupabaseClient();
      const { data: session } = await supabase.auth.getSession();

      if (!session?.session?.access_token) {
        throw new Error('Not authenticated');
      }

      const { data, error: fetchError } = await useFetch('/api/admin/inquiries', {
        headers: {
          Authorization: `Bearer ${session.session.access_token}`,
        },
      });

      if (fetchError.value) {
        throw new Error(fetchError.value?.data?.error || 'Failed to fetch inquiries');
      }

      inquiries.value = data.value || [];
    } catch (e) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  }

  async function markAsRead(inquiryId) {
    try {
      const supabase = useSupabaseClient();
      const { error: updateError } = await supabase
        .from('inquiries')
        .update({ status: 'read' })
        .eq('id', inquiryId);

      if (updateError) throw updateError;

      const inquiry = inquiries.value.find(i => i.id === inquiryId);
      if (inquiry) {
        inquiry.status = 'read';
      }
    } catch (e) {
      console.error('Failed to mark as read:', e.message);
    }
  }

  function selectInquiry(inquiry) {
    selectedInquiry.value = inquiry;
    if (inquiry && inquiry.status === 'new') {
      markAsRead(inquiry.id);
    }
  }

  const newCount = computed(() =>
    inquiries.value.filter(i => i.status === 'new').length
  );

  const readCount = computed(() =>
    inquiries.value.filter(i => i.status === 'read').length
  );

  const repliedCount = computed(() =>
    inquiries.value.filter(i => i.status === 'replied').length
  );

  return {
    inquiries,
    loading,
    error,
    selectedInquiry,
    fetchInquiries,
    markAsRead,
    selectInquiry,
    newCount,
    readCount,
    repliedCount,
  };
});
