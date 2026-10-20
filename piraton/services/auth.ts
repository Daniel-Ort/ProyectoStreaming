const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface AuthResponse {
  access_token: string;
}

export interface UserResponse {
  id: number;
  email: string;
  name?: string;
}

export async function loginUser(credentials: { email: string; password: string }): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Credenciales inválidas o error al iniciar sesión');
  }

  return res.json();
}

export async function registerUser(data: { email: string; password: string; name?: string }): Promise<UserResponse> {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Error al registrar el usuario');
  }

  return res.json();
}