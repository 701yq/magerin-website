<script setup>
import { onMounted, ref } from 'vue'
import { fetchUsers, updateUserStatus } from '@/api/firebaseService'

const users = ref([])

onMounted(async () => {
  users.value = await fetchUsers()
})

function formatDate(dateStr) {
  if (!dateStr) return '-'
  const date = new Date(dateStr)
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}

async function toggleStatus(user) {
  const newStatus = user.status === 'ya' ? 'tidak' : 'ya'
  const success = await updateUserStatus(user.id, newStatus)
  if (success) {
    user.status = newStatus
  } else {
    alert("Gagal memperbarui status.")
  }
}

function statusClass(status) {
  return status === 'tidak' ? 'text-red-500 font-medium' : 'text-green-600 font-medium'
}
</script>

<template>
  <div class="overflow-x-auto bg-white rounded-lg shadow p-4">
    <table class="min-w-full text-sm text-left text-gray-700">
      <thead class="text-xs uppercase bg-gray-100">
        <tr>
          <th class="px-6 py-3">Nama Lengkap</th>
          <th class="px-6 py-3">Nomor WhatsApp</th>
          <th class="px-6 py-3">Tanggal Terdaftar</th>
          <th class="px-6 py-3">Status Akun</th>
          <th class="px-6 py-3">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id" class="border-b hover:bg-gray-50">
          <td class="px-6 py-4 font-medium">{{ user.namaLengkap || '-' }}</td>
          <td class="px-6 py-4">{{ user.whatsapp || '-' }}</td>
          <td class="px-6 py-4">{{ formatDate(user.registerDate) }}</td>
          <td class="px-6 py-4">
            <span :class="statusClass(user.status)">
              {{ user.status || '-' }}
            </span>
          </td>
          <td class="px-6 py-4">
            <button
              class="text-sm px-3 py-1 rounded bg-blue-100 text-blue-600 hover:bg-blue-200"
              @click="toggleStatus(user)">
              {{ user.status === 'tidak' ? 'Buka Blokir' : 'Blokir' }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
