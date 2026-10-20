// app/test-videos/page.tsx
import { Suspense } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function VideoList() {
 let videos = [];
try {
  const res = await fetch(`${API_URL}/videos`, { cache: 'no-store' });
  if (res.ok) videos = await res.json();
} catch (error) {
  console.error("No se pudo conectar al backend durante el build");
}

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-300">Videos Registrados ({videos.length})</h2>
      {videos.length === 0 ? (
        <p className="text-slate-500 text-sm">No hay videos o asegúrate de que tu backend de NestJS esté encendido.</p>
      ) : (
        <div className="grid gap-4">
          {videos.map((video: any) => (
            <div key={video.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex justify-between items-center">
              <div className="space-y-1">
                <h3 className="font-bold text-white">{video.title}</h3>
                <p className="text-xs text-slate-400">{video.description}</p>
                <span className="text-xs bg-slate-800 text-cyan-300 px-2 py-0.5 rounded">ID: {video.id}</span>
              </div>
              <a 
                href={`/videos/${video.id}`} 
                target="_blank"
                className="text-xs bg-blue-600/20 text-blue-400 border border-blue-500/30 px-3 py-1.5 rounded-lg hover:bg-blue-600/30 transition-colors"
              >
                Ver Reproductor →
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

async function handleCreateTestVideo() {
  'use server';
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  try {
    await fetch(`${API_URL}/videos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: `Video de Prueba ${Math.floor(Math.random() * 100)}`,
        description: 'Creado desde el frontend consumiendo NestJS.',
        embedUrl: 'https://playmogo.com/e/vyrc9dx2bfhs',
        isFree: true,
      }),
    });
  } catch (error) {
    console.error("Error al crear video en NestJS:", error);
  }
}

export default function TestVideosPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 font-sans max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-bold text-cyan-400">Panel de Testeo (Next.js + NestJS)</h1>
        <form action={handleCreateTestVideo}>
          <button 
            type="submit" 
            className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
          >
            + Crear Video vía NestJS
          </button>
        </form>
      </div>

      <Suspense fallback={<p className="text-slate-500 text-sm">Cargando videos...</p>}>
        <VideoList />
      </Suspense>
    </div>
  );
}