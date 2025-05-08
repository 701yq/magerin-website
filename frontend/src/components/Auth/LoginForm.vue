<template>
    <div class="flex flex-col lg:flex-row min-h-screen font-sora">
      <!-- Ilustrasi Kiri -->
      <div class="hidden lg:flex w-full lg:w-1/2 bg-[#e8f3ff] items-center justify-center">
        <img :src="image4" alt="Ilustrasi Login" class="w-[300px] md:w-[400px] lg:w-[430px] h-auto" />
      </div>
  
      <!-- Form Login -->
      <div class="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 py-12 sm:px-10 md:px-20">
        <div class="w-full max-w-md">
          <h1 class="text-3xl md:text-4xl font-bold text-black leading-snug">
            Selamat Datang di <span class="text-[#0168e7]">Mager-In!</span>
          </h1>
          <p class="mt-2 text-gray-500 font-medium text-sm">
            Silahkan isi email dan password admin yang telah dibagikan.
          </p>
  
          <form @submit.prevent="handleLogin" class="mt-10 space-y-6">
            <div>
              <label class="block text-sm font-medium mb-1">Email</label>
              <input
                v-model="email"
                type="email"
                placeholder="admin@gmail.com"
                class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
  
            <div>
              <label class="block text-sm font-medium mb-1">Kata Sandi</label>
              <div class="relative">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  v-model="password"
                  class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-black pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  @click="showPassword = !showPassword"
                >
                  👁️
                </button>
              </div>
            </div>
  
            <button
              type="submit"
              class="w-full bg-[#0168e7] text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Masuk
            </button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { loginAdmin } from '@/api/firebaseService'
  import image4 from '@/assets/login.jpg'
  
  const email = ref('')
  const password = ref('')
  const showPassword = ref(false)
  const router = useRouter()
  
  async function handleLogin() {
    try {
      const user = await loginAdmin(email.value, password.value)
      if (user.email !== 'admin1@gmail.com') {
        alert('Akun ini tidak memiliki akses admin.')
        return
      }
  
      localStorage.setItem('adminToken', user.uid)
      router.push('/dashboard')
    } catch (error) {
      alert('Email atau password salah!')
      console.error(error)
    }
  }
  </script>
  