<template>
  <div class="relative w-full h-screen overflow-hidden font-sora">
    <!-- Background video -->
    <video autoplay muted loop class="absolute inset-0 w-full h-full object-cover z-0">
      <source src="@/assets/bg-login.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    <!-- Overlay darken layer (optional) -->
    <div class="absolute inset-0 bg-black bg-opacity-40 z-10"></div>

    <!-- Login Form -->
    <div class="relative z-20 flex items-center justify-center h-full px-4">
      <div class="bg-white bg-opacity-90 rounded-lg shadow-lg max-w-md w-full p-8">
        <h1 class="text-3xl md:text-4xl font-bold text-black leading-snug text-center">
          Selamat Datang di <span class="text-[#0168e7]">Mager-In!</span>
        </h1>
        <p class="mt-2 text-gray-600 text-sm text-center">
          Silahkan isi email dan password admin yang telah dibagikan.
        </p>

        <form @submit.prevent="handleLogin" class="mt-8 space-y-5">
          <div>
            <label class="block text-sm font-medium mb-1">Email</label>
            <input
              v-model="email"
              type="email"
              placeholder="admin@gmail.com"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Kata Sandi</label>
            <div class="relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
