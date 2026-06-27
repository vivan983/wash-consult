<template>
  <main class="min-h-screen bg-light">
    <!-- Login Screen -->
    <section v-if="!session" class="pt-32 pb-16">
      <div class="container-custom">
        <div class="max-w-md mx-auto">
          <div class="card p-8 text-center">
            <div class="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
            <h1 class="text-2xl font-heading font-bold text-primary mb-2">Admin Login</h1>
            <p class="text-gray-600 text-sm mb-6">
              Sign in with your authorized email to access the admin dashboard.
            </p>

            <div v-if="loginError" class="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm mb-4">
              {{ loginError }}
            </div>

            <form @submit.prevent="handleLogin" class="space-y-4">
              <div>
                <label for="email" class="block text-left text-sm font-heading font-semibold text-primary mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  v-model="loginEmail"
                  type="email"
                  required
                  class="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
                  placeholder="admin@washconsult.com"
                />
              </div>

              <div>
                <label for="password" class="block text-left text-sm font-heading font-semibold text-primary mb-1">
                  Password
                </label>
                <input
                  id="password"
                  v-model="loginPassword"
                  type="password"
                  required
                  class="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                :disabled="loginLoading"
                class="btn-primary w-full text-base py-3 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <svg v-if="loginLoading" class="animate-spin -ml-1 mr-2 h-5 w-5 inline" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {{ loginLoading ? 'Signing in...' : 'Sign In' }}
              </button>
            </form>

            <p class="text-gray-400 text-caption mt-4">
              Authorized personnel only. Access is monitored and logged.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Dashboard -->
    <section v-else class="pt-24 pb-16">
      <div class="container-custom">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 class="text-2xl md:text-3xl font-heading font-bold text-primary">Admin Dashboard</h1>
            <p class="text-gray-600 text-sm">Manage inquiries from the WASH Consult website.</p>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-sm text-gray-500">{{ session.user?.email }}</span>
            <button @click="handleLogout" class="text-sm text-red-600 hover:text-red-700 font-medium transition-colors">
              Sign Out
            </button>
          </div>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div class="card p-5 flex items-center gap-4">
            <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <span class="text-xl font-heading font-bold text-blue-600">{{ store.newCount }}</span>
            </div>
            <div>
              <p class="text-sm font-heading font-semibold text-primary">New</p>
              <p class="text-caption text-gray-500">Unread inquiries</p>
            </div>
          </div>
          <div class="card p-5 flex items-center gap-4">
            <div class="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
              <span class="text-xl font-heading font-bold text-gray-600">{{ store.readCount }}</span>
            </div>
            <div>
              <p class="text-sm font-heading font-semibold text-primary">Read</p>
              <p class="text-caption text-gray-500">Reviewed messages</p>
            </div>
          </div>
          <div class="card p-5 flex items-center gap-4">
            <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <span class="text-xl font-heading font-bold text-green-600">{{ store.repliedCount }}</span>
            </div>
            <div>
              <p class="text-sm font-heading font-semibold text-primary">Replied</p>
              <p class="text-caption text-gray-500">Responded to</p>
            </div>
          </div>
        </div>

        <!-- Loading -->
        <div v-if="store.loading" class="text-center py-12">
          <svg class="animate-spin h-8 w-8 text-accent mx-auto mb-4" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p class="text-gray-500">Loading inquiries...</p>
        </div>

        <!-- Error -->
        <div v-else-if="store.error" class="card p-8 text-center">
          <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-lg font-heading font-semibold text-primary mb-2">Error Loading Data</h3>
          <p class="text-gray-600 mb-4">{{ store.error }}</p>
          <button @click="store.fetchInquiries()" class="btn-primary text-sm">
            Try Again
          </button>
        </div>

        <!-- Inquiries Table -->
        <div v-else-if="store.inquiries.length > 0" class="card overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="bg-primary/5 border-b border-gray-100">
                  <th class="text-left py-3 px-4 font-heading font-semibold text-primary text-sm">Name</th>
                  <th class="text-left py-3 px-4 font-heading font-semibold text-primary text-sm hidden md:table-cell">Email</th>
                  <th class="text-left py-3 px-4 font-heading font-semibold text-primary text-sm hidden lg:table-cell">Phone</th>
                  <th class="text-left py-3 px-4 font-heading font-semibold text-primary text-sm hidden lg:table-cell">Service</th>
                  <th class="text-left py-3 px-4 font-heading font-semibold text-primary text-sm hidden xl:table-cell">Message</th>
                  <th class="text-left py-3 px-4 font-heading font-semibold text-primary text-sm">Status</th>
                  <th class="text-left py-3 px-4 font-heading font-semibold text-primary text-sm">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="inquiry in store.inquiries"
                  :key="inquiry.id"
                  class="border-b border-gray-50 hover:bg-primary/[0.02] cursor-pointer transition-colors"
                  :class="{ 'bg-blue-50/30': inquiry.status === 'new' }"
                  @click="store.selectInquiry(inquiry)"
                >
                  <td class="py-3 px-4 font-medium text-primary">
                    {{ inquiry.full_name }}
                  </td>
                  <td class="py-3 px-4 text-gray-600 hidden md:table-cell">
                    {{ inquiry.email }}
                  </td>
                  <td class="py-3 px-4 text-gray-600 hidden lg:table-cell">
                    {{ inquiry.phone || '—' }}
                  </td>
                  <td class="py-3 px-4 text-gray-600 hidden lg:table-cell">
                    {{ inquiry.service_interest || '—' }}
                  </td>
                  <td class="py-3 px-4 text-gray-600 hidden xl:table-cell max-w-xs truncate">
                    {{ inquiry.message }}
                  </td>
                  <td class="py-3 px-4">
                    <span
                      class="inline-block px-2.5 py-1 rounded-full text-caption font-heading font-semibold"
                      :class="statusClass(inquiry.status)"
                    >
                      {{ inquiry.status }}
                    </span>
                  </td>
                  <td class="py-3 px-4 text-gray-500 text-caption whitespace-nowrap">
                    {{ formatDate(inquiry.created_at) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="card p-12 text-center">
          <div class="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h3 class="text-lg font-heading font-semibold text-primary mb-2">No Inquiries Yet</h3>
          <p class="text-gray-600 text-sm">
            Inquiries submitted through the contact form will appear here.
          </p>
        </div>

        <!-- Inquiry Detail Modal -->
        <Teleport to="body">
          <Transition name="menu">
            <div
              v-if="store.selectedInquiry"
              class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              @click.self="store.selectedInquiry = null"
            >
              <div class="bg-white rounded-xl max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-2xl" @click.stop>
                <div class="p-6">
                  <div class="flex items-start justify-between mb-6">
                    <h2 class="text-xl font-heading font-bold text-primary">Inquiry Details</h2>
                    <button
                      @click="store.selectedInquiry = null"
                      class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      aria-label="Close"
                    >
                      <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div class="space-y-4">
                    <div>
                      <p class="text-caption text-gray-400 font-heading font-semibold">Full Name</p>
                      <p class="text-primary font-medium">{{ store.selectedInquiry.full_name }}</p>
                    </div>
                    <div>
                      <p class="text-caption text-gray-400 font-heading font-semibold">Email</p>
                      <a :href="'mailto:' + store.selectedInquiry.email" class="text-accent hover:text-accent-500 transition-colors">{{ store.selectedInquiry.email }}</a>
                    </div>
                    <div v-if="store.selectedInquiry.phone">
                      <p class="text-caption text-gray-400 font-heading font-semibold">Phone</p>
                      <p class="text-primary">{{ store.selectedInquiry.phone }}</p>
                    </div>
                    <div v-if="store.selectedInquiry.service_interest">
                      <p class="text-caption text-gray-400 font-heading font-semibold">Service Interest</p>
                      <p class="text-primary">{{ store.selectedInquiry.service_interest }}</p>
                    </div>
                    <div>
                      <p class="text-caption text-gray-400 font-heading font-semibold">Message</p>
                      <p class="text-primary whitespace-pre-wrap leading-relaxed bg-light rounded-lg p-4 mt-1">{{ store.selectedInquiry.message }}</p>
                    </div>
                    <div class="flex gap-4">
                      <div>
                        <p class="text-caption text-gray-400 font-heading font-semibold">Status</p>
                        <span
                          class="inline-block px-2.5 py-1 rounded-full text-caption font-heading font-semibold mt-1"
                          :class="statusClass(store.selectedInquiry.status)"
                        >
                          {{ store.selectedInquiry.status }}
                        </span>
                      </div>
                      <div>
                        <p class="text-caption text-gray-400 font-heading font-semibold">Date</p>
                        <p class="text-primary text-sm mt-1">{{ formatDateTime(store.selectedInquiry.created_at) }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </Teleport>
      </div>
    </section>
  </main>
</template>

<script setup>
import { useAdminStore } from '~/stores/useAdminStore';

definePageMeta({
  middleware: ['auth'],
});

const store = useAdminStore();
const supabase = useSupabaseClient();
const session = ref(null);

const loginEmail = ref('');
const loginPassword = ref('');
const loginLoading = ref(false);
const loginError = ref('');

// Check for existing session
onMounted(async () => {
  const { data } = await supabase.auth.getSession();
  session.value = data.session;

  if (data.session) {
    await store.fetchInquiries();
  }

  // Listen for auth state changes
  const { data: listener } = supabase.auth.onAuthStateChange((event, newSession) => {
    session.value = newSession;
    if (newSession) {
      store.fetchInquiries();
    }
  });
});

async function handleLogin() {
  loginLoading.value = true;
  loginError.value = '';

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail.value.trim(),
      password: loginPassword.value,
    });

    if (error) throw error;

    loginPassword.value = '';
  } catch (e) {
    loginError.value = e.message || 'Authentication failed. Please check your credentials.';
  } finally {
    loginLoading.value = false;
  }
}

async function handleLogout() {
  await supabase.auth.signOut();
  session.value = null;
  store.inquiries = [];
}

function statusClass(status) {
  switch (status) {
    case 'new': return 'bg-blue-100 text-blue-700';
    case 'read': return 'bg-gray-100 text-gray-600';
    case 'replied': return 'bg-green-100 text-green-700';
    default: return 'bg-gray-100 text-gray-600';
  }
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatDateTime(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
</script>
