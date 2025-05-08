<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Total Pengguna -->
      <div class="bg-red-100 p-4 rounded shadow">
        <h3 class="text-sm font-medium text-gray-500">Total Pengguna Terdaftar</h3>
        <p class="text-2xl font-bold text-red-600 mt-2">{{ stats.total }}</p>
      </div>
  
      <!-- Pengguna Aktif -->
      <div class="bg-yellow-100 p-4 rounded shadow">
        <h3 class="text-sm font-medium text-gray-500">Pengguna Aktif</h3>
        <p class="text-2xl font-bold text-yellow-600 mt-2">{{ stats.aktif }}</p>
      </div>
  
      <!-- Laporan Masuk -->
      <div class="bg-green-100 p-4 rounded shadow">
        <h3 class="text-sm font-medium text-gray-500">Laporan Masuk</h3>
        <p class="text-2xl font-bold text-green-600 mt-2">-</p>
      </div>
  
      <!-- Banner -->
      <div class="bg-gradient-to-r from-blue-500 to-orange-400 p-4 rounded text-white shadow">
        <h3 class="text-sm font-semibold leading-5">Pantau<br>Mager-In dengan lebih mudah dan cepat.</h3>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { getDashboardStats } from '@/api/firebaseService'
  
  const stats = ref({ total: 0, aktif: 0 })
  
  onMounted(async () => {
    stats.value = await getDashboardStats()
  })
  </script>
  