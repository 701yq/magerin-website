<template>
    <div class="min-h-screen bg-gray-50 font-sora flex flex-col lg:flex-row">
      <!-- Sidebar -->
      <Sidebar class="hidden lg:block" />
  
      <!-- Konten -->
      <div class="flex-1 flex flex-col">
        <Topbar />
  
        <div class="p-4 sm:p-6">
          <!-- Judul & Pencarian -->
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h2 class="text-xl font-bold text-gray-800">Daftar Pengguna</h2>
              <p class="text-sm text-gray-500">Berikut daftar pengguna aplikasi Mager-In.</p>
            </div>
            <UserSearch />
          </div>
  
          <!-- Tabel Pengguna -->
          <UserTable />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import Sidebar from '@/components/Layout/Sidebar.vue'
  import Topbar from '@/components/Layout/Topbar.vue'
  import UserSearch from '@/components/Users/UserSearch.vue'
  import UserTable from '@/components/Users/UserTable.vue'
  </script>
  