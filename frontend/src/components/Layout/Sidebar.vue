<template>
  <div class="w-64 bg-white shadow-lg h-screen p-6">
    <!-- Logo dan Judul -->
    <div class="flex items-center space-x-2 mb-6">
      <img src="@/assets/logolampu.svg" alt="Logo" class="w-6 h-6" />
      <h1 class="text-lg font-bold text-blue-600">Mager-In</h1>
    </div>

    <!-- Navigasi -->
    <nav class="space-y-4 text-sm">
      <!-- Dashboard -->
      <router-link
        to="/dashboard"
        class="flex items-center space-x-3 hover:text-blue-600"
        :class="{
          'text-blue-600 font-medium': route.path.startsWith('/dashboard'),
          'text-gray-700': !route.path.startsWith('/dashboard')
        }"
      >
        <Icon icon="material-symbols:dashboard-outline-rounded" class="text-xl" />
        <span>Dashboard</span>
      </router-link>

      <!-- Pengguna -->
      <router-link
        to="/users"
        class="flex items-center space-x-3 hover:text-blue-600"
        :class="{
          'text-blue-600 font-medium': route.path.startsWith('/users'),
          'text-gray-700': !route.path.startsWith('/users')
        }"
      >
        <Icon icon="material-symbols:person-outline-rounded" class="text-xl" />
        <span>Pengguna</span>
      </router-link>

      <!-- Pelaporan -->
      <div>
        <div
          @click="showReportsDropdown = !showReportsDropdown"
          class="flex items-center space-x-3 hover:text-blue-600 cursor-pointer"
          :class="{
            'text-blue-600 font-medium': route.path.startsWith('/reports'),
            'text-gray-700': !route.path.startsWith('/reports')
          }"
        >
          <Icon icon="material-symbols:mail-outline-rounded" class="text-xl" />
          <router-link
            to="/reports"
            class="flex-1 text-left"
            :class="{
              'text-blue-600 font-medium': route.path === '/reports',
              'text-gray-700': route.path !== '/reports'
            }"
          >
            Pelaporan
          </router-link>
          <Icon :icon="showReportsDropdown ? 'mdi:chevron-up' : 'mdi:chevron-down'" class="text-sm" />
        </div>

        <!-- Submenu -->
        <transition name="fade">
          <div v-if="showReportsDropdown" class="ml-8 mt-2 space-y-2 text-sm">
            <router-link
              to="/reports/pending"
              class="flex items-center space-x-2 hover:text-blue-600"
              :class="{
                'text-blue-600 font-medium': route.path === '/reports/pending',
                'text-gray-600': route.path !== '/reports/pending'
              }"
            >
              <span class="w-2 h-2 rounded-full bg-yellow-400"></span>
              <span>Belum diproses</span>
            </router-link>
            <router-link
              to="/reports/completed"
              class="flex items-center space-x-2 hover:text-blue-600"
              :class="{
                'text-blue-600 font-medium': route.path === '/reports/completed',
                'text-gray-600': route.path !== '/reports/completed'
              }"
            >
              <span class="w-2 h-2 rounded-full bg-green-500"></span>
              <span>Selesai</span>
            </router-link>
          </div>
        </transition>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'

const route = useRoute()
const showReportsDropdown = ref(false)

watch(
  () => route.path,
  (path) => {
    showReportsDropdown.value = path.startsWith('/reports/') && path !== '/reports'
  },
  { immediate: true }
)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
