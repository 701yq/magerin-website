<template>
  <div class="min-h-screen bg-gray-50 font-sora flex flex-col lg:flex-row">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Konten utama -->
    <div class="flex-1 flex flex-col">
      <Topbar />

      <div class="p-6 space-y-6">
        <!-- Judul & Pencarian -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 class="text-2xl font-bold text-gray-800">Daftar Pengguna</h2>
            <p class="text-sm text-gray-500">Berikut daftar pengguna aplikasi Mager-In.</p>
          </div>
          <UserSearch v-model="searchQuery" @search="filterUsers" />
        </div>

        <!-- Tabel Pengguna -->
        <UserTable :users="filteredUsers" @status-updated="showSuccessDialog" />
      </div>
    </div>

    <!-- Modal -->
    <transition name="fade">
      <div v-if="successDialog" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 text-center shadow-lg max-w-xs w-full">
          <div class="text-green-500 text-4xl mb-4">✔️</div>
          <p class="text-sm text-gray-700 mb-4">{{ dialogMessage }}</p>
          <button
            class="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded"
            @click="successDialog = false">
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
import UserSearch from '@/components/Users/UserSearch.vue'
import UserTable from '@/components/Users/UserTable.vue'
import { fetchUsers } from '@/api/firebaseService'

const allUsers = ref([])
const searchQuery = ref('')
const successDialog = ref(false)
const dialogMessage = ref('')

const filteredUsers = computed(() => {
  if (!searchQuery.value) return allUsers.value
  return allUsers.value.filter(user =>
    user.namaLengkap?.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

onMounted(async () => {
  allUsers.value = await fetchUsers()
})

function filterUsers(query) {
  searchQuery.value = query
}

function showSuccessDialog(message) {
  dialogMessage.value = message
  successDialog.value = true
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
