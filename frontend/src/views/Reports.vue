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
        <ReportTable :reports="filteredReports" @status-updated="showDialog" />
      </div>
    </div>

    <!-- Dialog Notifikasi -->
    <transition name="fade">
      <div v-if="dialogVisible" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 text-center shadow-lg max-w-xs w-full">
          <div class="text-green-500 text-4xl mb-4">✔️</div>
          <p class="text-sm text-gray-700 mb-4">{{ dialogMessage }}</p>
          <button
            class="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded"
            @click="dialogVisible = false"
          >
            Selesai
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Sidebar from '@/components/Layout/Sidebar.vue'
import Topbar from '@/components/Layout/Topbar.vue'
import ReportTable from '@/components/Reports/ReportTable.vue'
import { fetchAllReports } from '@/api/firebaseService'

// Props untuk mendukung pemfilteran halaman seperti /pending dan /completed
const props = defineProps({
  filterStatus: String
})

const reports = ref([])
const searchQuery = ref('')
const dialogVisible = ref(false)
const dialogMessage = ref('')

// Ambil data dari Firebase
const fetchReports = async () => {
  reports.value = await fetchAllReports()
}
onMounted(fetchReports)

// Tampilkan dialog saat status updated
function showDialog(message) {
  dialogMessage.value = message
  dialogVisible.value = true
}

// Filter laporan berdasarkan status dan pencarian
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

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
