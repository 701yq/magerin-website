<template>
  <div class="min-h-screen bg-gray-50 font-sora flex flex-col lg:flex-row">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Konten utama -->
    <div class="flex-1 flex flex-col">
      <Topbar />

      <div class="p-6 space-y-6">
        <!-- Judul dan Search -->
        <div class="flex justify-between items-center">
          <div>
            <h2 class="text-2xl font-bold text-gray-800">Manajemen Pelaporan Pengguna</h2>
            <p class="text-sm text-gray-500">Berikut daftar pelaporan aplikasi Mager-In.</p>
          </div>

          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari nama terlapor"
            class="border border-gray-300 rounded px-4 py-2 text-sm w-64 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <!-- Tabel laporan -->
        <ReportTable :reports="filteredReports" @status-updated="fetchReports" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Sidebar from '@/components/Layout/Sidebar.vue'
import Topbar from '@/components/Layout/Topbar.vue'
import ReportTable from '@/components/Reports/ReportTable.vue'
import { fetchAllReports } from '@/api/firebaseService'

// props untuk mendukung halaman seperti /reports/pending dan /reports/completed
const props = defineProps({
  filterStatus: String
})

const reports = ref([])
const searchQuery = ref('')

// Ambil data dari firebase
const fetchReports = async () => {
  reports.value = await fetchAllReports()
}

onMounted(fetchReports)

// Filter berdasarkan status dan pencarian
const filteredReports = computed(() => {
  let result = [...reports.value]

  if (props.filterStatus) {
    result = result.filter(item => item.status === props.filterStatus)
  }

  if (searchQuery.value) {
    result = result.filter(item =>
      item.namaTerlapor?.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  return result
})
</script>
