// firebaseService.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, get, child } from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { update } from "firebase/database";

// Konfigurasi Firebase dari Web App
const firebaseConfig = {
  apiKey: "AIzaSyDHjSa6MJI_OAMGuHxqfrmHFkDVwFwomTM",
  authDomain: "magerin-3c326.firebaseapp.com",
  databaseURL: "https://magerin-3c326-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "magerin-3c326",
  storageBucket: "magerin-3c326.firebasestorage.app",
  messagingSenderId: "564589971014",
  appId: "1:564589971014:web:8fe0c5e93b1a267c9f6c47",
  measurementId: "G-GHY95YLDPC"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);
const auth = getAuth(app);

// Fungsi login admin
export async function loginAdmin(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
}

// Ambil semua pengguna dari Realtime Database
export async function fetchUsers() {
  const dbRef = ref(db);
  try {
    const snapshot = await get(child(dbRef, "users"));
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.entries(data).map(([id, value]) => ({ id, ...value }));
    } else {
      return [];
    }
  } catch (error) {
    console.error("Gagal ambil data pengguna:", error);
    return [];
  }
}

// firebaseService.js
export async function getDashboardStats() {
    const dbRef = ref(db)
    try {
      const snapshot = await get(child(dbRef, "users"))
      if (!snapshot.exists()) return { total: 0, aktif: 0 }
  
      const users = snapshot.val()
  
      const total = Object.keys(users).length
      const aktif = Object.values(users).filter(
        user => user.status && user.status.toLowerCase() === "ya"
      ).length
  
      return { total, aktif }
    } catch (error) {
      console.error("Gagal mengambil statistik dashboard:", error)
      return { total: 0, aktif: 0 }
    }
  }

 export async function getUserGrowthByMonth() {
  const dbRef = ref(db);
  try {
    const snapshot = await get(child(dbRef, 'users'));
    if (!snapshot.exists()) return Array(12).fill(0);

    const users = Object.values(snapshot.val());
    const monthlyCounts = Array(12).fill(0);

    users.forEach(user => {
      const dateStr = user.registerDate;
      if (dateStr) {
        const date = new Date(dateStr);
        const month = date.getMonth(); // 0 = Jan, 11 = Dec
        if (!isNaN(month)) {
          monthlyCounts[month]++;
        }
      }
    });

    console.log('monthlyCounts:', monthlyCounts);
    return monthlyCounts;
  } catch (error) {
    console.error('Gagal ambil data statistik pengguna:', error);
    return Array(12).fill(0);
  }
}

export async function updateUserStatus(userId, status) {
    const dbRef = ref(db, `users/${userId}`);
    try {
      await update(dbRef, { status });
      return true;
    } catch (error) {
      console.error("Gagal update status:", error);
      return false;
    }
  }
