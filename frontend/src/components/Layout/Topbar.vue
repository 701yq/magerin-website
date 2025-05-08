<template>
    <div class="w-full h-14 bg-white shadow px-6 flex items-center justify-between">
      <div class="text-sm font-semibold">Admin Mager-In</div>
      <button @click="logout" class="text-blue-600 hover:underline text-sm">Logout</button>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  function logout() {
    localStorage.removeItem('adminToken')
    router.push('/login')
  }
  </script>
  