<template>
  <div class="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
    <input
      v-model="model"
      type="text"
      placeholder="Cari nama pengguna"
      class="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full sm:w-64"
    />
  </div>
</template>

<script setup>
const model = defineModel() // v-model binding
</script>
