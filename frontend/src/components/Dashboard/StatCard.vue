<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <!-- Total Pengguna Terdaftar -->
    <div class="bg-red-100 p-4 rounded shadow flex items-center gap-4">
      <Icon icon="mdi:account-group-outline" class="text-red-500 text-3xl" />
      <div>
        <p class="text-2xl font-bold text-red-600">{{ stats.total }}</p>
        <h3 class="text-sm font-medium text-gray-600">Total Pengguna Terdaftar</h3>
      </div>
    </div>

    <!-- Pengguna Aktif -->
    <div class="bg-yellow-100 p-4 rounded shadow flex items-center gap-4">
      <Icon icon="mdi:account-check-outline" class="text-yellow-500 text-3xl" />
      <div>
        <p class="text-2xl font-bold text-yellow-600">{{ stats.aktif }}</p>
        <h3 class="text-sm font-medium text-gray-600">Pengguna Aktif</h3>
      </div>
    </div>

    <!-- Laporan Masuk -->
    <div class="bg-green-100 p-4 rounded shadow flex items-center gap-4">
      <Icon icon="mdi:briefcase-outline" class="text-green-500 text-3xl" />
      <div>
        <p class="text-2xl font-bold text-green-600">{{ stats.laporan }}</p>
        <h3 class="text-sm font-medium text-gray-600">Laporan Masuk</h3>
      </div>
    </div>

    <!-- Banner Mahasiswa UB -->
    <div class="bg-blue-100 p-4 rounded shadow flex items-center gap-4">
      <Icon icon="mdi:school-outline" class="text-blue-500 text-3xl" />
      <div>
        <p class="text-2xl font-bold text-blue-600">{{ stats.mahasiswa }}</p>
        <h3 class="text-sm font-medium text-gray-600">Total Mahasiswa UB</h3>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getDashboardStats, countTotalReports, getTotalMahasiswaUB } from '@/api/firebaseService'
import { Icon } from '@iconify/vue'

const stats = ref({ total: 0, aktif: 0, laporan: '-', mahasiswa: 0 })

onMounted(async () => {
  const userStats = await getDashboardStats()
  const laporanCount = await countTotalReports()
  const mahasiswaCount = await getTotalMahasiswaUB()
  stats.value = {
    ...userStats,
    laporan: laporanCount,
    mahasiswa: mahasiswaCount
  }
})
</script>
