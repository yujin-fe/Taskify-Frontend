import axios from 'axios';
import { getAccessToken } from '@/utils/token';

const API_URL = import.meta.env.VITE_API_URL;

interface CreateApiOptions {
  timeout: number;
  contentType?: string;
}

const createApi = ({ timeout, contentType }: CreateApiOptions) => {
  const headers: Record<string, string> = {};

  if (contentType !== undefined) {
    headers['Content-Type'] = contentType;
  }

  const instance = axios.create({
    baseURL: API_URL,
    timeout,
    headers,
  });

  instance.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return instance;
};

/**
 * ### 기본 API 인스턴스
 * timeout `5s`
 */
export const api = createApi({ timeout: 5000, contentType: 'application/json' });

/**
 * ### 파일 업로드용 API 인스턴스
 * 카드 이미지 업로드, 프로필 이미지 업로드 시 사용하는 인스턴스입니다.
 * timeout `30s`
 */
export const fileApi = createApi({ timeout: 30000 });
