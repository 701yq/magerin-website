<template>
    <div class="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
      <input
        v-model="query"
        type="text"
        placeholder="Cari nama pengguna"
        class="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full sm:w-64"
      />
      <button
        @click="onSearch"
        class="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded w-full sm:w-auto">
        Cari
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const query = ref('')
  function onSearch() {
    alert(`Fitur pencarian "${query.value}" akan dihubungkan ke tabel nanti.`)
  }
  </script>
  