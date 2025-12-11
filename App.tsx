import React from 'react';
import { QRGenerator } from './components/QRGenerator';
import { Github } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center p-4 text-slate-800">
      <header className="absolute top-0 w-full p-6 flex justify-between items-center text-white/90">
        <h1 className="text-xl font-bold">QR Gen</h1>
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          <Github size={24} />
        </a>
      </header>

      <main className="w-full max-w-md">
        <QRGenerator />
      </main>

      <footer className="mt-8 text-center text-white/80 text-sm">
        <p>© {new Date().getFullYear()} تم الإنشاء بواسطة React</p>
      </footer>
    </div>
  );
};

export default App;