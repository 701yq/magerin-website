<template>
    <div class="bg-white p-6 rounded shadow w-full overflow-x-auto">
      <h3 class="text-sm font-medium text-gray-500 mb-4">Statistik Pertumbuhan Pengguna</h3>
      <div class="relative h-[300px] min-w-[300px] sm:min-w-[500px] md:min-w-[600px] lg:min-w-[700px]">
        <LineChart :data="chartData" :options="chartOptions" />
      </div>
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
    Legend
  } from 'chart.js'
  import { Line as LineChart } from 'vue-chartjs'
  
  ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend)
  
  const chartData = ref({
    labels: [
      'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
      'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'
    ],
    datasets: [{
      label: 'Pengguna Baru',
      data: [],
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59,130,246,0.2)',
      tension: 0.3,
      fill: true
    }]
  })
  
  const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0 // agar angka bulat
        }
      }
    },
    plugins: {
      legend: {
        position: 'top'
      }
    }
  })
  
  onMounted(async () => {
    const monthlyData = await getUserGrowthByMonth()
    chartData.value.datasets[0].data = monthlyData
  })
  </script>
  