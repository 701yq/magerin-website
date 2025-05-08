// adminApi.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api'  // Laravel API base URL
});

export function fetchUsers() {
  return api.get('/users');  // Endpoint yang kamu buat di Laravel
}
