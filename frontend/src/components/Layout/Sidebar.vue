<template>
    <div class="w-64 bg-white shadow-lg h-screen p-6">
      <!-- Logo dan Judul -->
      <div class="flex items-center space-x-2 mb-6">
        <img src="@/assets/logolampu.svg" alt="Logo" class="w-6 h-6" />
        <h1 class="text-lg font-bold text-blue-600">Mager-In</h1>
      </div>
  
      <!-- Navigasi -->
      <nav class="space-y-4 text-sm">
        <router-link
          to="/dashboard"
          class="flex items-center space-x-3 hover:text-blue-600"
          :class="{ 'text-blue-600 font-semibold': $route.path === '/dashboard', 'text-gray-800': $route.path !== '/dashboard' }"
        >
          <Icon icon="material-symbols:dashboard-outline-rounded" class="text-xl" />
          <span>Dashboard</span>
        </router-link>
  
        <router-link
          to="/users"
          class="flex items-center space-x-3 hover:text-blue-600"
          :class="{ 'text-blue-600 font-semibold': $route.path === '/users', 'text-gray-800': $route.path !== '/users' }"
        >
          <Icon icon="material-symbols:person-outline-rounded" class="text-xl" />
          <span>Pengguna</span>
        </router-link>
  
        <router-link
          to="/reports"
          class="flex items-center space-x-3 hover:text-blue-600"
          :class="{ 'text-blue-600 font-semibold': $route.path === '/reports', 'text-gray-800': $route.path !== '/reports' }"
        >
          <Icon icon="material-symbols:mail-outline-rounded" class="text-xl" />
          <span>Pelaporan</span>
        </router-link>
      </nav>
    </div>
  </template>
  
  <script setup>
  import { Icon } from '@iconify/vue'
  </script>
  