<template>
  <div class="bg-white p-6 rounded shadow" style="height: 300px;">
    <h3 class="text-sm font-medium text-gray-500 mb-4">Statistik Pertumbuhan Pengguna</h3>
    <LineChart :data="chartData" :options="chartOptions" v-if="isReady" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getUserGrowthByMonth } from '@/api/firebaseService'

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line as LineChart } from 'vue-chartjs'

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend, Filler)

const isReady = ref(false)

const chartData = ref({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
  datasets: [
    {
      label: 'Pengguna Terdaftar',
      data: Array(12).fill(0),
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59,130,246,0.2)',
      tension: 0.3,
      fill: true
    }
  ]
})

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1
      }
    }
  }
})

onMounted(async () => {
  const monthlyData = await getUserGrowthByMonth()
  chartData.value.datasets[0].data = [...monthlyData] // reactive update
  isReady.value = true // allow rendering
})
</script>
