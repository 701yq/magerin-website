<template>
  <div class="overflow-x-auto bg-white rounded-lg shadow p-4">
    <table class="min-w-full text-sm text-left text-gray-700">
      <thead class="text-xs uppercase bg-gray-100">
        <tr>
          <th class="px-6 py-3">Nama Lengkap</th>
          <th class="px-6 py-3">Mahasiswa UB</th>
          <th class="px-6 py-3">No Whatsapp</th>
          <th class="px-6 py-3">Tanggal Terdaftar</th>
          <th class="px-6 py-3">Status Akun</th>
          <th class="px-6 py-3">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id" class="border-b hover:bg-gray-50">
          <td class="px-6 py-4 font-medium">{{ user.namaLengkap || '-' }}</td>
          <td class="px-6 py-4">{{ user.mahasiswaUB || '-' }}</td>
          <td class="px-6 py-4">{{ user.whatsapp || '-' }}</td>
          <td class="px-6 py-4">{{ formatDate(user.registerDate) }}</td>
          <td class="px-6 py-4">
            <span :class="statusClass(user.status)" class="flex items-center gap-1">
              <span class="h-2 w-2 rounded-full" :class="user.status === 'ya' ? 'bg-green-500' : 'bg-red-500'"></span>
              {{ user.status === 'ya' ? 'Aktif' : 'Diblokir' }}
            </span>
          </td>
          <td class="px-6 py-4 relative">
            <div class="relative">
              <button
                class="px-4 py-1 rounded-full text-blue-600 bg-blue-100 hover:bg-blue-200 flex items-center justify-between gap-2 w-24"
                @click="toggleDropdown(user)"
              >
                Pilih
                <span class="text-xs">▾</span>
              </button>
              <div
                v-if="user.showDropdown"
                class="absolute right-0 mt-1 w-32 bg-white border rounded shadow z-10"
              >
                <button
                  v-if="user.status === 'ya'"
                  class="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                  @click="updateStatus(user, 'tidak')"
                >
                  Blokir
                </button>
                <button
                  v-else
                  class="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                  @click="updateStatus(user, 'ya')"
                >
                  Buka Blokir
                </button>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { updateUserStatus } from '@/api/firebaseService'

const props = defineProps({
  users: Array
})
const emit = defineEmits(['status-updated'])

function formatDate(dateStr) {
  if (!dateStr) return '-'
  const date = new Date(dateStr)
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}

function statusClass(status) {
  return status === 'ya' ? 'text-green-600 font-medium' : 'text-red-500 font-medium'
}

function toggleDropdown(user) {
  props.users.forEach(u => {
    if (u !== user) u.showDropdown = false
  })
  user.showDropdown = !user.showDropdown
}

async function updateStatus(user, newStatus) {
  const success = await updateUserStatus(user.id, newStatus)
  if (success) {
    user.status = newStatus
    user.showDropdown = false
    emit('status-updated', newStatus === 'ya' ? 'Buka blokir pengguna telah berhasil' : 'Pengguna telah diblokir')
  } else {
    alert('Gagal memperbarui status.')
  }
}
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}
th, td {
  text-align: left;
}
</style>
