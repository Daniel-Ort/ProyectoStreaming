import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Obtener la cookie de autenticación
  const token = request.cookies.get('access_token')?.value;

  // Definir las rutas que requieren autenticación
  const isDashboardRoute = request.nextUrl.pathname.startsWith('/dashboard');

  // Si intenta entrar al dashboard sin token, redirigir al login
  if (isDashboardRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Si ya tiene sesión e intenta ir al login o register, redirigir al dashboard
  const isAuthRoute = request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register');
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Configurar en qué rutas actúa el middleware
export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
};