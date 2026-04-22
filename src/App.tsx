/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { PlayCircle, ArrowUpRight } from "lucide-react";

export default function App() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const navLinks = [
    { name: "Home", href: "#", active: true },
    { name: "Studio", href: "#" },
    { name: "Music", href: "#music" },
    { name: "About", href: "#" },
    { name: "Reach Us", href: "#" },
  ];

  const scrollToMusic = () => {
    const element = document.getElementById('music');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen selection:bg-surface-variant selection:text-white">
      {/* Background Video */}
      <div className="fixed inset-0 z-[-1] pointer-events-none w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="object-cover w-full h-full opacity-60"
        >
          <source
            src="https://imagine-public.x.ai/imagine-public/share-videos/b0b3d2aa-2ae7-4a97-a28d-7477be0b8dd2.mp4"
            type="video/mp4"
          />
        </video>
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-surface/40 via-surface/60 to-surface pointer-events-none" />
      </div>

      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 py-6 bg-surface/40 backdrop-blur-2xl border-b border-on-surface/5">
        <div className="font-headline italic text-2xl tracking-tighter text-white">
          MinhNhat.Art®
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                if (link.href === "#music") {
                  e.preventDefault();
                  scrollToMusic();
                }
              }}
              className={`text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:text-white ${
                link.active ? "text-white border-b border-white/40 pb-1" : "text-on-surface-variant"
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>

        <button className="liquid-glass px-6 py-2 rounded-full text-xs font-medium tracking-wide text-white hover:scale-95 transition-transform">
          Let's go
        </button>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl space-y-12"
        >
          <motion.h1 
            variants={itemVariants}
            className="font-headline text-6xl md:text-8xl lg:text-[120px] leading-[0.9] tracking-tight text-white"
          >
            <span className="text-on-surface-variant font-light not-italic">Good Music</span>
            <br />
            Make <span className="italic font-light">Us Happy</span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed text-on-surface-variant"
          >
            Let me show you a kind of energy you’ve never felt before.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <button 
              onClick={scrollToMusic}
              className="liquid-glass px-8 py-4 rounded-full flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-white group"
            >
              <PlayCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Listen My Music
            </button>
            <button className="liquid-glass px-8 py-4 rounded-full flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-white group">
              <ArrowUpRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Work With Me
            </button>
          </motion.div>
        </motion.div>
      </main>

      {/* Music Section */}
      <section id="music" className="relative z-10 py-24 px-6 md:px-12 bg-surface/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="space-y-24"
          >
            <div className="text-center space-y-4">
              <h2 className="font-headline text-4xl md:text-6xl text-white">The Sound Waves</h2>
              <p className="text-on-surface-variant tracking-[0.2em] uppercase text-xs">Curated sets and remixes</p>
            </div>

            {/* Spotify Section */}
            <div className="space-y-8">
              <h3 className="font-headline text-2xl text-on-surface-variant italic border-l-2 border-white/20 pl-4">Hệ Spotify</h3>
              <div className="liquid-glass p-4 rounded-2xl">
                <iframe 
                  style={{ borderRadius: '12px' }} 
                  src="https://open.spotify.com/embed/artist/4fPZXnp7EAhGo95xr6ysJV?utm_source=generator" 
                  width="100%" 
                  height="352" 
                  frameBorder="0" 
                  allowFullScreen={true} 
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            {/* SoundCloud Section */}
            <div className="space-y-8">
              <h3 className="font-headline text-2xl text-on-surface-variant italic border-l-2 border-white/20 pl-4">Hệ Soundcloud</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {[
                  "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A1374846166&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
                  "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2290266722&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true",
                  "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2266532570&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
                  "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A1616254599&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
                  "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A1606080858&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
                  "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A1129528636&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
                  "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A980746819&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
                  "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A762154690&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
                  "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A645735228&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
                ].map((src, idx) => (
                  <div key={idx} className="liquid-glass p-2 rounded-xl overflow-hidden">
                    <iframe 
                      width="100%" 
                      height={src.includes("2290266722") ? "166" : "300"} 
                      scrolling="no" 
                      frameBorder="no" 
                      allow="autoplay" 
                      src={src}
                    ></iframe>
                  </div>
                ))}
              </div>
            </div>

            {/* YouTube Section */}
            <div className="space-y-8">
              <h3 className="font-headline text-2xl text-on-surface-variant italic border-l-2 border-white/20 pl-4">Hệ Youtube : Sản phẩm</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="liquid-glass p-1 rounded-2xl overflow-hidden aspect-video">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/vGC7OtcLop0?si=rZLdj7Dnr_8zkZXv" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen={true}
                  ></iframe>
                </div>
                <div className="liquid-glass p-1 rounded-2xl overflow-hidden aspect-video">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/YKFh1Gzd4iA?si=A81gtILNWt8fyx1k" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen={true}
                  ></iframe>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-12 border-t border-on-surface/5 text-[10px] uppercase tracking-[0.3em] text-on-surface-variant">
        <div>
          © 2024 MINHNHAT.ART. THE NOCTURNAL CURATOR.
        </div>
        <div className="flex gap-8 mt-6 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
        </div>
      </footer>
    </div>
  );
}
