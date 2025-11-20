import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
});

export default api;

// TODO: 인터셉터로 Authorization 헤더에 토큰 전달하도록 구현
