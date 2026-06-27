import { defineStore } from 'pinia';

export const useContactStore = defineStore('contact', () => {
  const submitting = ref(false);
  const success = ref(false);
  const error = ref(null);

  const form = reactive({
    fullName: '',
    email: '',
    phone: '',
    serviceInterest: '',
    message: '',
  });

  function resetForm() {
    form.fullName = '';
    form.email = '';
    form.phone = '';
    form.serviceInterest = '';
    form.message = '';
    success.value = false;
    error.value = null;
  }

  function validateForm() {
    const errors = {};

    if (!form.fullName || form.fullName.trim().length < 2) {
      errors.fullName = 'Full name is required (minimum 2 characters)';
    }

    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = 'A valid email address is required';
    }

    if (!form.message || form.message.trim().length < 20) {
      errors.message = 'Message must be at least 20 characters';
    }

    return Object.keys(errors).length === 0 ? null : errors;
  }

  async function submitInquiry() {
    const validationErrors = validateForm();
    if (validationErrors) {
      error.value = validationErrors;
      return false;
    }

    submitting.value = true;
    error.value = null;
    success.value = false;

    try {
      const { data, error: apiError } = await useFetch('/api/inquiries', {
        method: 'POST',
        body: {
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          serviceInterest: form.serviceInterest,
          message: form.message.trim(),
        },
      });

      if (apiError.value) {
        throw new Error(apiError.value?.data?.error || 'Failed to send inquiry');
      }

      if (data.value?.success) {
        success.value = true;
        return true;
      } else {
        throw new Error(data.value?.error || 'Unexpected server response');
      }
    } catch (e) {
      error.value = e.message || 'An error occurred. Please try again later.';
      return false;
    } finally {
      submitting.value = false;
    }
  }

  return {
    form,
    submitting,
    success,
    error,
    resetForm,
    submitInquiry,
    validateForm,
  };
});
