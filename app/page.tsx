'use client';

import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  ExternalLink, 
  Terminal, 
  User, 
  Code2, 
  Cpu, 
  ChevronRight,
  Download,
  CheckCircle2,
  Layers
} from 'lucide-react';

// Custom SVG Components untuk Github & Linkedin (Menghindari masalah ekspor Lucide)
const GithubIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const LinkedinIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const copyEmail = () => {
    const email = "julius.sinaga@example.com"; 
    const textArea = document.createElement("textarea");
    textArea.value = email;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const projects = [
    {
      title: "AI Analysis Dashboard",
      desc: "Platform visualisasi data berbasis AI untuk memprediksi tren pasar menggunakan Next.js dan TensorFlow.",
      tech: ["Next.js", "Python", "Tailwind"],
      link: "#"
    },
    {
      title: "E-Commerce Blockchain",
      desc: "Integrasi pembayaran kripto pada sistem e-commerce modern dengan keamanan tingkat tinggi.",
      tech: ["React", "Solidity", "Ether.js"],
      link: "#"
    },
    {
      title: "Smart Home Controller",
      desc: "Dashboard IoT untuk mengontrol perangkat rumah pintar secara real-time melalui web.",
      tech: ["TypeScript", "Node.js", "MQTT"],
      link: "#"
    }
  ];

  const skills = [
    { name: "Frontend Development", icon: <Code2 size={20} />, level: "Expert", tools: "React, Next.js, Tailwind" },
    { name: "Backend Architecture", icon: <Terminal size={20} />, level: "Intermediate", tools: "Node.js, PostgreSQL, Docker" },
    { name: "AI & Machine Learning", icon: <Cpu size={20} />, level: "Beginner", tools: "Python, Scikit-learn" }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-400">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-900/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15 mix-blend-overlay"></div>
      </div>

      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0a0c]/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div 
            className="flex items-center gap-2 group cursor-pointer" 
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
          >
            <div className="w-10 h-10 bg-linear-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-[0_0_15px_rgba(6,182,212,0.5)] group-hover:scale-110 transition-transform">
              J
            </div>
            <span className="text-xl font-bold tracking-tighter text-white">JULIUS <span className="text-cyan-400 font-light italic">SINAGA</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {['About', 'Projects', 'Skills', 'Contact'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors tracking-widest uppercase"
              >
                {item}
              </button>
            ))}
            <button className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black hover:bg-white/10 transition-all flex items-center gap-2 tracking-widest uppercase text-white">
              CV <Download size={14} />
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 container mx-auto px-6">
        <section id="home" className="min-h-screen flex flex-col justify-center pt-20">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black mb-6 animate-pulse tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              Siap Menghadapi Tantangan Baru
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-none tracking-tight">
              KODE <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600">
                TANPA BATAS
              </span> <br />
              MASA DEPAN.
            </h1>
            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed font-light">
              Saya adalah <span className="text-white font-semibold">Julius Kaisar Sinaga</span>. 
              Software Engineer yang mengkhususkan diri dalam membangun arsitektur web modern yang skalabel.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => scrollToSection('projects')}
                className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold transition-all shadow-[0_0_30px_rgba(8,145,178,0.3)] flex items-center gap-2 group cursor-pointer"
              >
                Eksplorasi Proyek <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="flex items-center gap-3">
                <a href="#" className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all hover:border-cyan-500/50">
                  <GithubIcon />
                </a>
                <a href="#" className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all hover:border-cyan-500/50">
                  <LinkedinIcon />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-24 border-t border-white/5">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-square bg-linear-to-br from-cyan-500/20 to-blue-600/20 rounded-3xl border border-white/10 overflow-hidden flex items-center justify-center p-8">
                <div className="text-cyan-500/10">
                  <Layers size={320} strokeWidth={0.5} />
                </div>
                <div className="absolute bottom-6 right-6 p-5 bg-[#0a0a0c]/80 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl">
                  <div className="text-[10px] text-slate-500 mb-1 font-black tracking-widest uppercase">Expertise Level</div>
                  <div className="text-2xl font-black text-white">PROFESIONAL</div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-black mb-8 tracking-tighter uppercase">Siapa Saya?</h2>
              <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
                <p>
                  Fokus utama saya adalah ekosistem <span className="text-white font-medium">Fullstack JavaScript</span>. 
                  Mulai dari performa tinggi di sisi klien hingga keamanan data di sisi server.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <div className="text-cyan-400 font-bold mb-1 text-sm uppercase tracking-wider">Spesialisasi</div>
                    <div className="text-sm font-light">Web & App Architect</div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <div className="text-cyan-400 font-bold mb-1 text-sm uppercase tracking-wider">Lokasi</div>
                    <div className="text-sm font-light">Indonesia (Remote Ready)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="py-24 border-t border-white/5">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <h2 className="text-4xl font-black mb-4 tracking-tighter uppercase">Katalog Proyek</h2>
              <p className="text-slate-400 font-light max-w-xl">Koleksi solusi teknologi yang telah saya rancang.</p>
            </div>
            <a href="#" className="text-cyan-400 font-bold text-sm flex items-center gap-2 group hover:underline uppercase tracking-widest">
              Liat di GitHub <ExternalLink size={16} />
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((proj, i) => (
              <div key={i} className="group bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/8 transition-all hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-cyan-500/10 blur-2xl group-hover:bg-cyan-500/20 transition-all"></div>
                <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-400 mb-6 group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                  <Terminal size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white tracking-tight">{proj.title}</h3>
                <p className="text-slate-400 text-sm mb-8 leading-relaxed font-light">
                  {proj.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {proj.tech.map(t => (
                    <span key={t} className="text-[9px] font-black px-3 py-1 bg-white/5 border border-white/10 rounded-full uppercase tracking-tighter">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="skills" className="py-24 border-t border-white/5">
          <h2 className="text-4xl font-black mb-16 text-center tracking-tighter uppercase">Tech Stack & Skillset</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {skills.map((skill, i) => (
              <div key={i} className="p-10 bg-linear-to-b from-white/5 to-transparent border border-white/10 rounded-3xl text-center group hover:border-cyan-500/30 transition-all">
                <div className="mx-auto w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                  {skill.icon}
                </div>
                <h3 className="text-xl font-bold mb-1 tracking-tight uppercase">{skill.name}</h3>
                <div className="text-cyan-500 text-[10px] font-black mb-4 uppercase tracking-[0.2em]">{skill.level}</div>
                <div className="text-slate-500 text-sm font-light italic">{skill.tools}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="py-24 border-t border-white/5">
          <div className="bg-linear-to-br from-cyan-600 to-blue-800 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-[0_20px_50px_rgba(8,145,178,0.3)]">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-80 h-80 bg-black/20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-none tracking-tighter uppercase">
                Mari Bangun Sesuatu yang Luar Biasa
              </h2>
              <p className="text-white/80 text-lg mb-12 font-light">
                Apakah Anda memiliki ide proyek? Pintu saya selalu terbuka untuk inovasi baru.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a 
                  href="mailto:juliussinaga712@gmail.com"
                  className="px-10 py-5 bg-white text-blue-900 rounded-2xl font-black hover:bg-slate-100 transition-all shadow-2xl flex items-center justify-center gap-2 tracking-widest uppercase text-xs"
                >
                  KIRIM EMAIL <Mail size={16} />
                </a>
                <button 
                  onClick={copyEmail}
                  className="px-10 py-5 bg-transparent border-2 border-white/30 text-white rounded-2xl font-black hover:bg-white/10 transition-all flex items-center justify-center gap-2 tracking-widest uppercase text-xs cursor-pointer"
                >
                  {copied ? 'EMAIL DISALIN!' : 'SALIN ALAMAT'} {copied ? <CheckCircle2 size={16} /> : <Mail size={16} />}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-16 border-t border-white/5 relative z-10 mt-12 bg-black/40">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-slate-500 text-xs font-bold tracking-widest uppercase">
            © 2025 Julius Kaisar Sinaga. All rights reserved.
          </div>
          <div className="flex items-center gap-10">
            {['GitHub', 'LinkedIn', 'Dribbble'].map(social => (
              <a 
                key={social} 
                href="#" 
                className="text-slate-400 hover:text-cyan-400 transition-colors text-[10px] font-black tracking-widest uppercase"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}