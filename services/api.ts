
const API_URL: string = (import.meta as any)?.env?.VITE_API_URL || 'http://localhost:5000/api';

export interface Frame {
  id: number;
  name: string;
  description?: string;
  imageUrl: string;
  thumbnailUrl?: string;
  isPublic?: boolean;
  isPremium?: boolean;
  category?: string;
}

export function getToken(): string | null {
  return localStorage.getItem('token');
}

function setToken(token: string): void {
  localStorage.setItem('token', token);
}

function clearToken(): void {
  localStorage.removeItem('token');
}

async function request<T = any>(path: string, options: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });

  let data: any = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    throw new Error(data?.message || `Error ${res.status}`);
  }

  return data as T;
}

export const authAPI = {
  register: async (userData: { username: string; email: string; password: string; fullName?: string }) => {
    const data = await request<{ user: any; token: string }>('/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    setToken(data.token);
    return data;
  },
  login: async (credentials: { email: string; password: string }) => {
    const data = await request<{ user: any; token: string }>('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    setToken(data.token);
    return data;
  },
  getCurrentUser: () => request<{ user: any }>('/auth/me'),
  logout: () => clearToken(),
};

export const framesAPI = {
  list: () => request<{ frames: Frame[] }>('/frames'),
  upload: (formData: FormData) =>
    request<{ frame: Frame }>('/frames/upload', { method: 'POST', body: formData }),
  delete: (id: number) => request<{ message: string }>(`/frames/${id}`, { method: 'DELETE' }),
};

export interface Logo {
  id: number;
  name: string;
  description?: string;
  imageUrl: string;
  thumbnailUrl?: string;
  isPublic?: boolean;
  isPremium?: boolean;
  category?: string;
}

export const logosAPI = {
  list: () => request<{ logos: Logo[] }>('/logos'),
  upload: (formData: FormData) =>
    request<{ logo: Logo }>('/logos/upload', { method: 'POST', body: formData }),
  delete: (id: number) => request<{ message: string }>(`/logos/${id}`, { method: 'DELETE' }),
};
