<template>
    <div class="flex flex-col md:flex-row min-h-screen bg-gray-50 font-sora">
      <!-- Sidebar -->
      <Sidebar />
  
      <!-- Konten utama -->
      <div class="flex-1 flex flex-col">
        <Topbar />
  
        <main class="p-6 space-y-6">
          <!-- Statcards -->
          <StatCard />
  
          <!-- Grafik dan Info -->
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-sm font-semibold text-gray-700 mb-4">Statistik Pertumbuhan Pengguna</h3>
            <UserGrowthChart />
          </div>
        </main>
      </div>
    </div>
  </template>
  
  <script setup>
  import Sidebar from '@/components/Layout/Sidebar.vue'
  import Topbar from '@/components/Layout/Topbar.vue'
  import StatCard from '@/components/Dashboard/StatCard.vue'
  import UserGrowthChart from '@/components/Dashboard/UserGrowthChart.vue'
  </script>
  