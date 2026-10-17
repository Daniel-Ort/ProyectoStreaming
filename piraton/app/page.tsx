"use client";

import React from 'react';

export default function VideoLandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-sans">
      {/* Header / Navbar */}
      <header className="w-full border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              CineStream Pro
            </span>
          </div>
          <nav className="flex space-x-6 text-sm font-medium text-slate-400">
            <a href="#video" className="hover:text-white transition-colors">Reproductor</a>
            <a href="#info" className="hover:text-white transition-colors">Características</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 max-w-5xl mx-auto w-full">
        {/* Title Section */}
        <div className="text-center mb-8 space-y-3">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Módulo 
            
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
prrueas          </p>
        </div>

        {/* Video Player Container */}
        <section id="video" className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-2 md:p-4 overflow-hidden">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black flex items-center justify-center">
            <iframe
              className="w-full h-full border-0"
              src="https://playmogo.com/e/vyrc9dx2bfhs"
              scrolling="no"
              frameBorder="0"
              allowFullScreen={true}
              title="Secure Video Player"
            />
          </div>
        </section>

        {/* Info / Description Section */}
        <section id="info" className="w-full max-w-4xl mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900/50 border border-slate-800/80 p-5 rounded-xl">
            <h3 className="text-sm font-semibold text-cyan-400 mb-1">Protección Anti-Robo</h3>
            <p className="text-xs text-slate-400">Enlaces protegidos mediante restricciones de dominio y acceso por embed.</p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800/80 p-5 rounded-xl">
            <h3 className="text-sm font-semibold text-cyan-400 mb-1">Reproducción Fluida</h3>
            <p className="text-xs text-slate-400">Infraestructura optimizada para evitar cortes y latencia en la reproducción.</p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800/80 p-5 rounded-xl">
            <h3 className="text-sm font-semibold text-cyan-400 mb-1">Acceso Multiplataforma</h3>
            <p className="text-xs text-slate-400">Compatible con navegadores modernos en escritorio, tablets y smartphones.</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-800 bg-slate-900/40 py-6 text-center text-xs text-slate-500">
        <p>&copy; 2026 CineStream Pro. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}