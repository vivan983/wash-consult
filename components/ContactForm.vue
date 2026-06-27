<template>
  <div class="card p-8">
    <!-- Success State -->
    <div v-if="contactStore.success" class="text-center py-10">
      <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 class="text-xl font-heading font-bold text-primary mb-2">Thank You for Your Inquiry</h3>
      <p class="text-gray-600 mb-6">
        We have received your message and will get back to you within 1–2 business days.
        For urgent matters, please email us directly at <strong>admin@washconsult.com</strong>.
      </p>
      <button @click="contactStore.resetForm()" class="btn-secondary">
        Send Another Message
      </button>
    </div>

    <!-- Form -->
    <form v-else @submit.prevent="handleSubmit" novalidate class="space-y-5">
      <h3 class="text-xl font-heading font-bold text-primary mb-2">Send Us a Message</h3>
      <p class="text-gray-600 text-sm mb-2">Fill in the form below and our team will get back to you shortly.</p>

      <!-- Error Alert -->
      <div v-if="contactStore.error && typeof contactStore.error === 'string'" class="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm flex items-start gap-3">
        <svg class="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{{ contactStore.error }}</span>
      </div>

      <!-- Full Name -->
      <div>
        <label for="fullName" class="block text-sm font-heading font-semibold text-primary mb-1">
          Full Name <span class="text-red-500">*</span>
        </label>
        <input
          id="fullName"
          v-model="contactStore.form.fullName"
          type="text"
          required
          minlength="2"
          class="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
          :class="{ 'border-red-400 focus:ring-red-400': fieldErrors?.fullName }"
          placeholder="Your full name"
        />
        <p v-if="fieldErrors?.fullName" class="text-red-500 text-caption mt-1">{{ fieldErrors.fullName }}</p>
      </div>

      <!-- Email -->
      <div>
        <label for="email" class="block text-sm font-heading font-semibold text-primary mb-1">
          Email Address <span class="text-red-500">*</span>
        </label>
        <input
          id="email"
          v-model="contactStore.form.email"
          type="email"
          required
          class="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
          :class="{ 'border-red-400 focus:ring-red-400': fieldErrors?.email }"
          placeholder="your.email@example.com"
        />
        <p v-if="fieldErrors?.email" class="text-red-500 text-caption mt-1">{{ fieldErrors.email }}</p>
      </div>

      <!-- Phone Number -->
      <div>
        <label for="phone" class="block text-sm font-heading font-semibold text-primary mb-1">
          Phone Number
        </label>
        <input
          id="phone"
          v-model="contactStore.form.phone"
          type="tel"
          class="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
          placeholder="+211 XX XXX XXXX"
        />
      </div>

      <!-- Service Interest -->
      <div>
        <label for="serviceInterest" class="block text-sm font-heading font-semibold text-primary mb-1">
          Service of Interest
        </label>
        <select
          id="serviceInterest"
          v-model="contactStore.form.serviceInterest"
          class="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors bg-white"
        >
          <option value="">— Select a service —</option>
          <option v-for="sector in servicesStore.sectors" :key="sector.id" :value="sector.title">
            {{ sector.title }}
          </option>
        </select>
      </div>

      <!-- Message -->
      <div>
        <label for="message" class="block text-sm font-heading font-semibold text-primary mb-1">
          Your Message <span class="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          v-model="contactStore.form.message"
          required
          minlength="20"
          rows="5"
          class="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors resize-y"
          :class="{ 'border-red-400 focus:ring-red-400': fieldErrors?.message }"
          placeholder="Tell us about your requirements, project details, or inquiry... (minimum 20 characters)"
        />
        <div class="flex justify-between mt-1">
          <p v-if="fieldErrors?.message" class="text-red-500 text-caption">{{ fieldErrors.message }}</p>
          <p class="text-gray-400 text-caption ml-auto">{{ contactStore.form.message.length }} / 20 min</p>
        </div>
      </div>

      <!-- Submit -->
      <button
        type="submit"
        :disabled="contactStore.submitting"
        class="btn-primary w-full text-base py-3 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <svg v-if="contactStore.submitting" class="animate-spin -ml-1 mr-2 h-5 w-5 inline" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        {{ contactStore.submitting ? 'Sending...' : 'Send Inquiry' }}
      </button>

      <p class="text-gray-400 text-caption text-center">
        By submitting this form, you agree to our processing of your data in accordance with applicable laws.
      </p>
    </form>
  </div>
</template>

<script setup>
import { useContactStore } from '~/stores/useContactStore';
import { useServicesStore } from '~/stores/useServicesStore';

const contactStore = useContactStore();
const servicesStore = useServicesStore();

const fieldErrors = ref(null);

async function handleSubmit() {
  const errors = {};
  if (!contactStore.form.fullName || contactStore.form.fullName.trim().length < 2) {
    errors.fullName = 'Full name is required (minimum 2 characters)';
  }
  if (!contactStore.form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactStore.form.email)) {
    errors.email = 'A valid email address is required';
  }
  if (!contactStore.form.message || contactStore.form.message.trim().length < 20) {
    errors.message = 'Message must be at least 20 characters';
  }

  fieldErrors.value = Object.keys(errors).length > 0 ? errors : null;

  if (fieldErrors.value) return;

  await contactStore.submitInquiry();
}
</script>
