const API_BASE = import.meta.env.VITE_API_URL || '/api';

export function getAuthToken(): string | null {
  return localStorage.getItem('decodedx_token');
}

export function setAuthToken(token: string) {
  localStorage.setItem('decodedx_token', token);
}

export function removeAuthToken() {
  localStorage.removeItem('decodedx_token');
}

async function request(endpoint: string, options: RequestInit = {}) {
  const token = getAuthToken();
  const headers = {
    ...((options.headers as Record<string, string>) || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Handle JSON payload automatically if body is not FormData
  if (options.body && !(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(options.body);
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong');
  }

  return data;
}

export const api = {
  auth: {
    async signup(email: string, password: string, fullName: string) {
      const data = await request('/auth/signup', {
        method: 'POST',
        body: { email, password, fullName } as any,
      });
      if (data.session?.access_token) {
        setAuthToken(data.session.access_token);
      }
      return data;
    },
    async login(email: string, password: string) {
      const data = await request('/auth/login', {
        method: 'POST',
        body: { email, password } as any,
      });
      if (data.session?.access_token) {
        setAuthToken(data.session.access_token);
      }
      return data;
    },
    async logout() {
      try {
        await request('/auth/logout', { method: 'POST' });
      } finally {
        removeAuthToken();
      }
    },
    async me() {
      return request('/auth/me');
    }
  },
  reports: {
    async upload(file: File) {
      const formData = new FormData();
      formData.append('report', file);
      return request('/reports/upload', {
        method: 'POST',
        body: formData,
      });
    },
    async list() {
      return request('/reports');
    },
    async get(id: string) {
      return request(`/reports/${id}`);
    }
  }
};
export default api;
