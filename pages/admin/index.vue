<template>
  <!-- ================================================================ -->
  <!-- LOGIN / SIGN UP SCREEN (no sidebar — clean standalone)           -->
  <!-- ================================================================ -->
  <main v-if="!session" class="min-h-screen bg-primary flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-accent rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <span class="font-heading font-bold text-primary text-xl">WC</span>
        </div>
        <h1 class="text-2xl font-heading font-bold text-white">
          {{ isSignUp ? 'Create Account' : 'Admin Portal' }}
        </h1>
        <p class="text-white/60 text-sm mt-2">
          {{ isSignUp ? 'Register for an admin account.' : 'Sign in to manage inquiries and content.' }}
        </p>
      </div>

      <!-- Card -->
      <div class="bg-white rounded-2xl shadow-2xl p-8">
        <!-- Error -->
        <div v-if="errorMsg" class="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm mb-5 flex items-start gap-2">
          <svg class="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{{ errorMsg }}</span>
        </div>

        <!-- Success -->
        <div v-if="successMsg" class="bg-green-50 border border-green-200 text-green-700 rounded-lg p-3 text-sm mb-5 flex items-start gap-2">
          <svg class="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <span>{{ successMsg }}</span>
        </div>

        <form @submit.prevent="handleAuth" class="space-y-4" novalidate>
          <!-- Full Name (sign up only) -->
          <div v-if="isSignUp">
            <label class="block text-sm font-heading font-semibold text-primary mb-1">Full Name</label>
            <input
              v-model="fullName"
              type="text"
              required
              class="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
              placeholder="Your full name"
            />
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-heading font-semibold text-primary mb-1">Email Address</label>
            <input
              v-model="email"
              type="email"
              required
              class="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
              placeholder="admin@washconsult.com"
            />
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-heading font-semibold text-primary mb-1">Password</label>
            <input
              v-model="password"
              type="password"
              required
              minlength="6"
              class="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
              placeholder="••••••••"
            />
          </div>

          <!-- Confirm Password (sign up only) -->
          <div v-if="isSignUp">
            <label class="block text-sm font-heading font-semibold text-primary mb-1">Confirm Password</label>
            <input
              v-model="confirmPassword"
              type="password"
              required
              minlength="6"
              class="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
              placeholder="••••••••"
            />
          </div>

          <!-- Submit -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full py-3 bg-accent text-primary font-heading font-semibold rounded-lg hover:bg-accent-500 transition-colors shadow-md disabled:opacity-60 disabled:cursor-not-allowed text-base"
          >
            <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-5 w-5 inline" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {{ isSignUp ? 'Create Account' : 'Sign In' }}
          </button>
        </form>

        <!-- Toggle Sign In / Sign Up -->
        <div class="mt-6 text-center text-sm">
          <button
            @click="toggleMode"
            class="text-accent hover:text-accent-500 font-heading font-semibold transition-colors"
          >
            {{ isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Create One" }}
          </button>
        </div>

        <!-- Back to site -->
        <div class="mt-4 text-center">
          <a href="/" class="text-gray-400 hover:text-gray-600 text-sm transition-colors">
            &larr; Back to Website
          </a>
        </div>
      </div>

      <!-- Footer text -->
      <p class="text-center text-white/30 text-xs mt-6">
        WASH – Consult General Trading Co. Ltd | Authorized personnel only
      </p>
    </div>
  </main>

  <!-- ================================================================ -->
  <!-- DASHBOARD (authenticated — professional sidebar + content)       -->
  <!-- ================================================================ -->
  <div v-else class="flex min-h-screen bg-gray-50">

    <!-- Mobile overlay backdrop -->
    <Transition name="fade">
      <div
        v-if="sidebarOpen"
        class="fixed inset-0 bg-black/50 z-40 lg:hidden"
        @click="sidebarOpen = false"
      />
    </Transition>

    <!-- ============================================================ -->
    <!-- SIDEBAR                                                        -->
    <!-- ============================================================ -->
    <aside
      class="fixed inset-y-0 left-0 z-50 w-64 bg-primary flex flex-col shadow-xl transition-transform duration-300 lg:translate-x-0"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <!-- Brand -->
      <div class="flex items-center gap-3 px-5 py-5 border-b border-white/[0.08]">
        <div class="w-10 h-10 bg-accent rounded-lg flex items-center justify-center shrink-0 shadow-md shadow-accent/20">
          <span class="font-heading font-bold text-primary text-sm">WC</span>
        </div>
        <div class="min-w-0">
          <p class="font-heading font-bold text-white text-sm leading-tight">Admin Panel</p>
          <p class="text-accent text-caption leading-tight">WASH Consult</p>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        <p class="px-3 mb-2 text-white/30 text-caption font-heading font-semibold uppercase tracking-wider">
          Main Menu
        </p>

        <!-- Dashboard Link (active) -->
        <a
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-accent/15 text-accent font-heading font-semibold text-sm transition-colors cursor-pointer"
        >
          <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <span>Dashboard</span>
          <!-- New badge -->
          <span v-if="store.newCount > 0" class="ml-auto bg-accent text-primary text-caption font-heading font-bold px-2 py-0.5 rounded-full leading-none">
            {{ store.newCount }}
          </span>
        </a>

        <!-- Inquiries Link -->
        <a
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/60 hover:text-white hover:bg-white/[0.06] font-heading font-semibold text-sm transition-colors cursor-pointer"
        >
          <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <span>Inquiries</span>
        </a>

        <div class="my-3 border-t border-white/[0.06]"></div>
        <p class="px-3 mb-2 text-white/30 text-caption font-heading font-semibold uppercase tracking-wider">
          Quick Links
        </p>

        <!-- Back to Website -->
        <a
          href="/"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/60 hover:text-white hover:bg-white/[0.06] font-heading font-semibold text-sm transition-colors"
        >
          <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Website</span>
        </a>

        <!-- View Site -->
        <a
          href="/"
          target="_blank"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/60 hover:text-white hover:bg-white/[0.06] font-heading font-semibold text-sm transition-colors"
        >
          <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
          <span>View Live Site</span>
        </a>
      </nav>

      <!-- User Info + Logout -->
      <div class="border-t border-white/[0.08] p-4">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-9 h-9 rounded-lg bg-accent/20 flex items-center justify-center shrink-0 ring-1 ring-accent/30">
            <span class="text-accent font-heading font-bold text-xs uppercase">
              {{ session.user?.email?.charAt(0) || 'A' }}
            </span>
          </div>
          <div class="min-w-0 flex-1">
            <p class="text-white text-sm font-medium truncate leading-tight">
              {{ session.user?.user_metadata?.full_name || session.user?.email?.split('@')[0] || 'Admin' }}
            </p>
            <p class="text-white/40 text-caption truncate leading-tight">
              {{ session.user?.email }}
            </p>
          </div>
        </div>

        <button
          @click="handleLogout"
          class="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 font-heading font-semibold text-sm transition-colors border border-red-500/20 hover:border-red-500/30"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sign Out
        </button>
      </div>
    </aside>

    <!-- ============================================================ -->
    <!-- MAIN CONTENT AREA                                             -->
    <!-- ============================================================ -->
    <div class="flex-1 lg:ml-64 flex flex-col min-h-screen">

      <!-- Top Bar (mobile hamburger + breadcrumb) -->
      <header class="sticky top-0 z-30 bg-white border-b border-gray-200 lg:border-b-0">
        <div class="flex items-center justify-between h-16 px-4 lg:px-8">
          <!-- Mobile: hamburger + page title -->
          <div class="flex items-center gap-3">
            <button
              class="lg:hidden p-2 -ml-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              @click="sidebarOpen = !sidebarOpen"
              aria-label="Toggle sidebar"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-if="!sidebarOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h1 class="text-lg font-heading font-bold text-primary lg:hidden">Dashboard</h1>
          </div>

          <!-- Desktop: breadcrumb -->
          <div class="hidden lg:block">
            <h1 class="text-xl font-heading font-bold text-primary">Dashboard</h1>
            <p class="text-sm text-gray-500">Manage inquiries from the WASH Consult website</p>
          </div>

          <!-- Top-right: user avatar (mobile only — desktop has it in sidebar) -->
          <div class="lg:hidden flex items-center gap-3">
            <span class="text-sm text-gray-500 hidden sm:inline">{{ session.user?.email }}</span>
            <button
              @click="handleLogout"
              class="text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 p-4 lg:p-8">
        <!-- ========================================================= -->
        <!-- Stats Row                                                    -->
        <!-- ========================================================= -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p class="text-2xl font-heading font-bold text-primary">{{ store.newCount }}</p>
              <p class="text-sm text-gray-500">New</p>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div class="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
              <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div>
              <p class="text-2xl font-heading font-bold text-primary">{{ store.readCount }}</p>
              <p class="text-sm text-gray-500">Read</p>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div class="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
            </div>
            <div>
              <p class="text-2xl font-heading font-bold text-primary">{{ store.repliedCount }}</p>
              <p class="text-sm text-gray-500">Replied</p>
            </div>
          </div>
        </div>

        <!-- ========================================================= -->
        <!-- Content Area                                                -->
        <!-- ========================================================= -->

        <!-- Loading -->
        <div v-if="store.loading" class="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <svg class="animate-spin h-8 w-8 text-accent mx-auto mb-4" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p class="text-gray-500">Loading inquiries...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="store.error" class="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
          <div class="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-lg font-heading font-semibold text-primary mb-2">Error Loading Data</h3>
          <p class="text-gray-600 mb-4">{{ store.error }}</p>
          <button @click="store.fetchInquiries()" class="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-primary font-heading font-semibold text-sm rounded-lg hover:bg-accent-500 transition-colors shadow-md">
            Try Again
          </button>
        </div>

        <!-- Inquiries: Mobile Cards + Desktop Table -->
        <div v-else-if="store.inquiries.length > 0">
          <!-- Section Header -->
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-heading font-semibold text-primary">
              All Inquiries
              <span class="text-gray-400 font-normal text-sm ml-2">({{ store.inquiries.length }})</span>
            </h2>
          </div>

          <!-- Mobile Card Layout -->
          <div class="block lg:hidden space-y-3">
            <div
              v-for="inquiry in store.inquiries"
              :key="inquiry.id"
              class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 cursor-pointer hover:shadow-md transition-shadow"
              :class="{ 'ring-2 ring-blue-400/50 border-blue-400': inquiry.status === 'new' }"
              @click="store.selectInquiry(inquiry)"
            >
              <div class="flex items-start justify-between mb-3">
                <div>
                  <h3 class="font-heading font-semibold text-primary">{{ inquiry.full_name }}</h3>
                  <p class="text-accent text-sm">{{ inquiry.email }}</p>
                </div>
                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-caption font-heading font-semibold shrink-0" :class="statusBadgeClass(inquiry.status)">
                  <span class="w-1.5 h-1.5 rounded-full mr-1.5" :class="statusDotClass(inquiry.status)"></span>
                  {{ inquiry.status }}
                </span>
              </div>
              <div class="grid grid-cols-2 gap-2 text-sm mb-3">
                <div>
                  <p class="text-gray-400 text-caption">Phone</p>
                  <p class="text-primary">{{ inquiry.phone || '—' }}</p>
                </div>
                <div>
                  <p class="text-gray-400 text-caption">Service</p>
                  <p class="text-primary text-sm">{{ inquiry.service_interest || '—' }}</p>
                </div>
              </div>
              <div class="text-sm mb-2">
                <p class="text-gray-400 text-caption">Message</p>
                <p class="text-primary line-clamp-3">{{ inquiry.message }}</p>
              </div>
              <p class="text-gray-400 text-caption">{{ formatDate(inquiry.created_at) }}</p>
            </div>
          </div>

          <!-- Desktop Table Layout -->
          <div class="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead>
                  <tr class="bg-gray-50 border-b border-gray-200">
                    <th class="text-left py-3.5 px-5 font-heading font-semibold text-primary text-sm">Name</th>
                    <th class="text-left py-3.5 px-5 font-heading font-semibold text-primary text-sm">Email</th>
                    <th class="text-left py-3.5 px-5 font-heading font-semibold text-primary text-sm">Phone</th>
                    <th class="text-left py-3.5 px-5 font-heading font-semibold text-primary text-sm">Service</th>
                    <th class="text-left py-3.5 px-5 font-heading font-semibold text-primary text-sm hidden xl:table-cell">Message</th>
                    <th class="text-left py-3.5 px-5 font-heading font-semibold text-primary text-sm">Status</th>
                    <th class="text-left py-3.5 px-5 font-heading font-semibold text-primary text-sm">Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="inquiry in store.inquiries"
                    :key="inquiry.id"
                    class="border-b border-gray-100 hover:bg-gray-50/50 cursor-pointer transition-colors"
                    :class="{ 'bg-blue-50/40': inquiry.status === 'new' }"
                    @click="store.selectInquiry(inquiry)"
                  >
                    <td class="py-3 px-5 font-medium text-primary">{{ inquiry.full_name }}</td>
                    <td class="py-3 px-5 text-gray-600">{{ inquiry.email }}</td>
                    <td class="py-3 px-5 text-gray-600">{{ inquiry.phone || '—' }}</td>
                    <td class="py-3 px-5 text-gray-600">{{ inquiry.service_interest || '—' }}</td>
                    <td class="py-3 px-5 text-gray-600 hidden xl:table-cell max-w-xs truncate">{{ inquiry.message }}</td>
                    <td class="py-3 px-5">
                      <span class="inline-flex items-center px-2.5 py-1 rounded-full text-caption font-heading font-semibold" :class="statusBadgeClass(inquiry.status)">
                        <span class="w-1.5 h-1.5 rounded-full mr-1.5" :class="statusDotClass(inquiry.status)"></span>
                        {{ inquiry.status }}
                      </span>
                    </td>
                    <td class="py-3 px-5 text-gray-500 text-caption whitespace-nowrap">{{ formatDate(inquiry.created_at) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="bg-white rounded-xl shadow-sm border border-gray-100 p-16 text-center">
          <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h3 class="text-xl font-heading font-semibold text-primary mb-2">No Inquiries Yet</h3>
          <p class="text-gray-500 max-w-md mx-auto">Inquiries submitted through the contact form will appear here once visitors start reaching out.</p>
        </div>
      </main>
    </div>

    <!-- ============================================================ -->
    <!-- INQUIRY DETAIL MODAL                                          -->
    <!-- ============================================================ -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="store.selectedInquiry"
          class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          @click.self="store.selectedInquiry = null"
        >
          <div class="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl" @click.stop>
            <!-- Modal Header -->
            <div class="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div>
                <h2 class="text-lg font-heading font-bold text-primary">Inquiry Details</h2>
                <p class="text-sm text-gray-400">{{ formatDateTime(store.selectedInquiry.created_at) }}</p>
              </div>
              <button @click="closeModal" class="p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Close">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div class="p-6 space-y-5">
              <!-- Info Grid -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p class="text-caption text-gray-400 font-heading font-semibold uppercase tracking-wide">Full Name</p>
                  <p class="text-primary font-medium mt-0.5">{{ store.selectedInquiry.full_name }}</p>
                </div>
                <div>
                  <p class="text-caption text-gray-400 font-heading font-semibold uppercase tracking-wide">Email</p>
                  <a :href="'mailto:' + store.selectedInquiry.email" class="text-accent hover:text-accent-500 font-medium mt-0.5 block">{{ store.selectedInquiry.email }}</a>
                </div>
                <div v-if="store.selectedInquiry.phone">
                  <p class="text-caption text-gray-400 font-heading font-semibold uppercase tracking-wide">Phone</p>
                  <p class="text-primary mt-0.5">{{ store.selectedInquiry.phone }}</p>
                </div>
                <div v-if="store.selectedInquiry.service_interest">
                  <p class="text-caption text-gray-400 font-heading font-semibold uppercase tracking-wide">Service Interest</p>
                  <p class="text-primary mt-0.5">{{ store.selectedInquiry.service_interest }}</p>
                </div>
                <div>
                  <p class="text-caption text-gray-400 font-heading font-semibold uppercase tracking-wide">Status</p>
                  <span class="inline-flex items-center px-2.5 py-1 rounded-full text-caption font-heading font-semibold mt-1" :class="statusBadgeClass(store.selectedInquiry.status)">
                    <span class="w-1.5 h-1.5 rounded-full mr-1.5" :class="statusDotClass(store.selectedInquiry.status)"></span>
                    {{ store.selectedInquiry.status }}
                  </span>
                </div>
              </div>

              <!-- Message -->
              <div>
                <p class="text-caption text-gray-400 font-heading font-semibold uppercase tracking-wide mb-1">Message</p>
                <div class="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p class="text-primary whitespace-pre-wrap leading-relaxed text-sm">{{ store.selectedInquiry.message }}</p>
                </div>
              </div>

              <!-- Reply Form -->
              <div v-if="showReplyForm" class="border-t border-gray-100 pt-5 space-y-3">
                <div class="flex flex-col gap-1 text-sm">
                  <div class="flex items-center gap-2">
                    <span class="text-gray-400 w-10 shrink-0">From:</span>
                    <span class="font-heading font-semibold text-primary">WASH – CONSULT GENERAL TRADING CO. LTD</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-gray-400 w-10 shrink-0">To:</span>
                    <span class="font-heading font-semibold text-primary">{{ store.selectedInquiry.full_name }} ({{ store.selectedInquiry.email }})</span>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-heading font-semibold text-primary mb-1.5">Your Reply</label>
                  <textarea
                    v-model="replyText"
                    rows="5"
                    class="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-accent focus:border-accent resize-y transition-shadow"
                    placeholder="Type your reply message here..."
                  ></textarea>
                  <p class="text-gray-400 text-caption mt-1.5">The greeting "Dear [Name]," will be added automatically.</p>
                </div>

                <div class="flex gap-2 pt-1">
                  <button
                    @click="handleReply"
                    :disabled="replying"
                    class="flex-1 flex items-center justify-center gap-2 py-2.5 bg-accent text-primary font-heading font-semibold text-sm rounded-lg hover:bg-accent-500 transition-colors disabled:opacity-60 shadow-sm"
                  >
                    <svg v-if="replying" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                    </svg>
                    {{ replying ? 'Sending...' : 'Send Reply' }}
                  </button>
                  <button
                    @click="showReplyForm = false"
                    class="px-5 py-2.5 border border-gray-200 text-gray-600 font-heading font-semibold text-sm rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="border-t border-gray-100 pt-4 flex gap-2">
                <button
                  v-if="!showReplyForm"
                  @click="showReplyForm = true"
                  class="flex-1 flex items-center justify-center gap-2 py-2.5 bg-accent text-primary font-heading font-semibold text-sm rounded-lg hover:bg-accent-500 transition-colors shadow-sm"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/>
                  </svg>
                  Reply
                </button>
                <button
                  @click="handleDelete"
                  :disabled="deleting"
                  class="flex items-center justify-center gap-2 px-5 py-2.5 border border-red-200 text-red-600 font-heading font-semibold text-sm rounded-lg hover:bg-red-50 hover:border-red-300 transition-colors disabled:opacity-60"
                >
                  <svg v-if="deleting" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                  {{ deleting ? 'Deleting...' : 'Delete' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { useAdminStore } from '~/stores/useAdminStore';

definePageMeta({
  middleware: ['auth'],
  layout: 'auth',
});

const store = useAdminStore();
const supabase = useSupabaseClient();
const session = ref(null);

// Auth form fields
const isSignUp = ref(false);
const email = ref('');
const password = ref('');
const fullName = ref('');
const confirmPassword = ref('');
const loading = ref(false);
const errorMsg = ref('');
const successMsg = ref('');

// Sidebar mobile toggle
const sidebarOpen = ref(false);

function toggleMode() {
  isSignUp.value = !isSignUp.value;
  errorMsg.value = '';
  successMsg.value = '';
  email.value = '';
  password.value = '';
  fullName.value = '';
  confirmPassword.value = '';
}

// Check for existing session
onMounted(async () => {
  const { data } = await supabase.auth.getSession();
  session.value = data.session;
  if (data.session) {
    await store.fetchInquiries();
  }
  const { data: listener } = supabase.auth.onAuthStateChange((event, newSession) => {
    session.value = newSession;
    if (newSession) {
      store.fetchInquiries();
    }
  });
});

// Close mobile sidebar on route change
watch(sidebarOpen, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

onUnmounted(() => {
  document.body.style.overflow = '';
});

// Handle Sign In OR Sign Up
async function handleAuth() {
  loading.value = true;
  errorMsg.value = '';
  successMsg.value = '';

  try {
    if (isSignUp.value) {
      // --- SIGN UP ---
      if (!fullName.value || fullName.value.trim().length < 2) {
        errorMsg.value = 'Full name is required.';
        loading.value = false;
        return;
      }
      if (password.value.length < 6) {
        errorMsg.value = 'Password must be at least 6 characters.';
        loading.value = false;
        return;
      }
      if (password.value !== confirmPassword.value) {
        errorMsg.value = 'Passwords do not match.';
        loading.value = false;
        return;
      }

      const { data, error } = await supabase.auth.signUp({
        email: email.value.trim(),
        password: password.value,
        options: {
          data: { full_name: fullName.value.trim() },
        },
      });

      if (error) throw error;

      if (data.user) {
        successMsg.value = 'Account created! You can now sign in.';
        setTimeout(() => {
          isSignUp.value = false;
          successMsg.value = '';
          password.value = '';
          confirmPassword.value = '';
        }, 2000);
      }
    } else {
      // --- SIGN IN ---
      const { error } = await supabase.auth.signInWithPassword({
        email: email.value.trim(),
        password: password.value,
      });
      if (error) throw error;
      password.value = '';
    }
  } catch (e) {
    errorMsg.value = e.message || 'Authentication failed. Please try again.';
  } finally {
    loading.value = false;
  }
}

async function handleLogout() {
  sidebarOpen.value = false;
  await supabase.auth.signOut();
  session.value = null;
  store.inquiries = [];
}

// Reply & Delete
const showReplyForm = ref(false);
const replyText = ref('');
const replying = ref(false);
const deleting = ref(false);

function closeModal() {
  store.selectedInquiry = null;
  showReplyForm.value = false;
  replyText.value = '';
}

async function handleReply() {
  if (!replyText.value || replyText.value.trim().length < 5) return;
  replying.value = true;
  try {
    const token = session.value?.access_token;
    const { data, error } = await useFetch('/api/admin/reply', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: { inquiryId: store.selectedInquiry.id, replyMessage: replyText.value.trim() },
    });
    if (error.value) throw new Error(error.value?.data?.statusMessage || 'Failed');
    store.selectedInquiry.status = 'replied';
    showReplyForm.value = false;
    replyText.value = '';
  } catch (e) {
    alert('Reply failed: ' + e.message);
  } finally {
    replying.value = false;
  }
}

async function handleDelete() {
  if (!confirm('Delete this inquiry permanently? This cannot be undone.')) return;
  deleting.value = true;
  try {
    const token = session.value?.access_token;
    const { error } = await useFetch('/api/admin/inquiries', {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
      body: { id: store.selectedInquiry.id },
    });
    if (error.value) throw new Error(error.value?.data?.statusMessage || 'Failed');
    store.inquiries = store.inquiries.filter(i => i.id !== store.selectedInquiry.id);
    store.selectedInquiry = null;
    showReplyForm.value = false;
  } catch (e) {
    alert('Delete failed: ' + e.message);
  } finally {
    deleting.value = false;
  }
}

function statusBadgeClass(status) {
  switch (status) {
    case 'new': return 'bg-blue-50 text-blue-700';
    case 'read': return 'bg-gray-100 text-gray-600';
    case 'replied': return 'bg-green-50 text-green-700';
    default: return 'bg-gray-100 text-gray-600';
  }
}

function statusDotClass(status) {
  switch (status) {
    case 'new': return 'bg-blue-500';
    case 'read': return 'bg-gray-400';
    case 'replied': return 'bg-green-500';
    default: return 'bg-gray-400';
  }
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatDateTime(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}
</script>

<style scoped>
/* Sidebar scrollbar */
aside nav::-webkit-scrollbar {
  width: 4px;
}
aside nav::-webkit-scrollbar-track {
  background: transparent;
}
aside nav::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}
aside nav::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>
