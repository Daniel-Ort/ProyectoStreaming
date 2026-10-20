'use client';

import { signOut, useSession } from 'next-auth/react';

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-xl space-y-6">
        <h1 className="text-3xl font-bold">Panel Principal</h1>
        <p className="text-gray-400">
          Sesión iniciada con éxito.
        </p>

        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500 transition-colors"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}