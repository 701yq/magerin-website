<template>
  <div class="overflow-x-auto bg-white rounded-lg shadow p-4">
    <table class="min-w-full text-sm text-left text-gray-700">
      <thead class="text-xs uppercase bg-gray-100">
        <tr>
          <th class="px-6 py-3">Nama Pelapor</th>
          <th class="px-6 py-3">Nama Terlapor</th>
          <th class="px-6 py-3">Deskripsi</th>
          <th class="px-6 py-3">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="lapor in reports" :key="lapor.id" class="border-b hover:bg-gray-50">
          <td class="px-6 py-4">{{ lapor.namaPelapor }}</td>
          <td class="px-6 py-4">{{ lapor.namaTerlapor }}</td>
          <td class="px-6 py-4">{{ lapor.alasan }}</td>
          <td class="px-6 py-4">
            <select
              v-model="lapor.status"
              @change="updateStatus(lapor)"
              class="px-2 py-1 rounded text-xs font-medium"
              :class="lapor.status === 'Belum diproses' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'"
            >
              <option value="Belum diproses">Belum diproses</option>
              <option value="Selesai">Selesai</option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { updateReportStatus } from '@/api/firebaseService'

const props = defineProps({ reports: Array })
const emit = defineEmits(['status-updated'])

const updateStatus = async (report) => {
  const success = await updateReportStatus(report.id, report.status)
  if (success && report.status === 'Selesai') {
    emit('status-updated', 'Pelaporan telah selesai diproses')
  }
}
</script>
