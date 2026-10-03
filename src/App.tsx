/**
 * DJ MinhNhat — The Nocturnal Curator
 * Cinematic one-pager that grew from a Hero + Capabilities base into a full
 * profile site: live Hero, "What I Do" capabilities, the whole music catalogue
 * (Spotify artist, SoundCloud remixes, YouTube beats), a photo gallery, and a
 * booking / socials section — all surfaced through the liquid-glass design
 * system, looping background video (custom rAF crossfade), and Framer Motion.
 */

import { motion, useInView } from "motion/react";
import { useEffect, useRef, type CSSProperties, type Key, type ReactElement, type ReactNode } from "react";
import {
  ArrowUpRight,
  Clapperboard,
  Facebook,
  Instagram,
  Mail,
  Music,
  Phone,
  Youtube,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Local assets                                                        */
/* ------------------------------------------------------------------ */
import heroVideo from "../Minhnhat - the profile/01.mp4";
import capabilitiesVideo from "../Minhnhat - the profile/Video/ok 02.mp4";

const pictureModules = import.meta.glob(
  [
    "../Minhnhat - the profile/MinhNhat Profile Picture/*.{png,PNG,jpg,JPG,jpeg,JPEG}",
    "../Vault 2/*.{png,PNG,jpg,JPG,jpeg,JPEG}",
    "!../Minhnhat - the profile/MinhNhat Profile Picture/._*",
    "!../Minhnhat - the profile/MinhNhat Profile Picture/{IMG_0755.PNG,IMG_0776.PNG,DOO01946.png,01 .png,IMG_0724.PNG,IMG_5491.JPG}",
    "!../Vault 2/._*",
    "!../Vault 2/473189117_1957251571435329_8354319944244705017_n.jpg",
  ],
  { eager: true, import: "default" },
) as Record<string, string>;

const pictureDimensions: Record<string, { width: number; height: number }> = {
  "482242610_2000747133752439_6881298387076109_n.jpg": { width: 1209, height: 1600 },
  "483528132_2002020566958429_5578150164988324061_n.jpg": { width: 1600, height: 1067 },
  "14.06 HansMedia_KalaKalaEDM (133).jpg": { width: 1600, height: 1067 },
  "ChatGPT Image Sep 17, 2026, 04_25_38 PM.png": { width: 1066, height: 1600 },
  "IMG_0286.JPG": { width: 1068, height: 1600 },
  "IMG_0289.JPG": { width: 1068, height: 1600 },
  "IMG_0290.JPG": { width: 1068, height: 1600 },
  "IMG_5501.JPG": { width: 1600, height: 1065 },
};

const pictureCards = Object.entries(pictureModules)
  .sort(([left], [right]) => left.localeCompare(right))
  .filter(([path]) => {
    const normalizedPath = path.toLowerCase();
    const excluded = ["img_0755", "img_0776", "doo01946", "01 .png", "img_0724", "img_5491"];
    return !excluded.some((raw) => normalizedPath.includes(raw));
  })
  .map(([path, src], index) => {
    const fileName = path.split("/").pop() ?? `Picture ${index + 1}`;
    const title = fileName.startsWith("IMG_028") || fileName.startsWith("IMG_029")
      ? "MinhNhat — Artist Portrait"
      : `MinhNhat — The Vault ${index + 1}`;
    return { id: `${index}-${title}`, src, title, ...pictureDimensions[fileName] };
  });

/* ------------------------------------------------------------------ */
/* Static data mirrored from the original site                         */
/* ------------------------------------------------------------------ */
const SOCIALS = [
  { name: "Facebook", href: "https://fb.com/real.minhnhat2k" },
  { name: "Instagram", href: "https://instagram.com/minhnhat.music" },
  { name: "TikTok", href: "https://tiktok.com/@nhnlnc" },
  { name: "Threads", href: "https://www.threads.com/@minhnhat.music" },
];

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Sound", href: "#sound" },
  { label: "Craft", href: "#craft" },
  { label: "The Vault", href: "#gallery" },
  { label: "Booking", href: "#booking" },
];

const PARTNER_NAMES = ["Kala Kala", "Da Nang Electronic Carnival", "Hoiana", "+10 venues"];

const REMIX_LINKS = [
  "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A1374846166&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
  "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2266532570&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
  "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A1606080858&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
  "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A1129528636&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
  "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A980746819&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
  "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A762154690&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
  "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A645735228&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
];

const BEAT_LINKS = [
  { src: "https://www.youtube.com/embed/vGC7OtcLop0?si=rZLdj7Dnr_8zkZXv", label: "Beat 01" },
  { src: "https://www.youtube.com/embed/YKFh1Gzd4iA?si=A81gtILNWt8fyx1k", label: "Beat 02" },
];

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */
function OutlineIcon({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <OutlineIcon className={className}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </OutlineIcon>
  );
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <OutlineIcon className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </OutlineIcon>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.6 3A5.73 5.73 0 0 0 18 6.48 5.9 5.9 0 0 0 21 8.07v3.03a8.7 8.7 0 0 1-4.36-1.12v5.78a5.76 5.76 0 1 1-5.76-5.76c.36 0 .72.03 1.07.1v3.1a2.7 2.7 0 1 0 1.63 2.46V3h3.02Z" />
    </svg>
  );
}

function ThreadsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M15.35 10.17c-.2-.1-.4-.2-.61-.28-.04-.88-.3-1.58-.79-2.12-.56-.62-1.44-.93-2.62-.93-2.22 0-3.77 1.28-4.14 3.42l2.1.36c.19-1.1.9-1.7 2-1.7.63 0 1.1.15 1.39.46.18.2.3.47.35.83a11.2 11.2 0 0 0-2.43-.01c-2.36.2-3.87 1.62-3.87 3.61 0 2.06 1.58 3.49 3.83 3.49 1.62 0 2.84-.62 3.62-1.84.58-.9.89-2.05.94-3.42.36.19.66.43.87.72.34.45.48 1 .42 1.56-.15 1.34-1.4 2.7-4.15 2.7-2.93 0-4.82-1.94-4.82-4.93 0-3.14 2-5.17 5.1-5.17 1.55 0 2.81.44 3.75 1.3.46.42.82.93 1.08 1.52Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const SOCIAL_ICONS: Record<string, (p: { className?: string }) => ReactElement> = {
  Facebook: ({ className }) => <Facebook className={className} />,
  Instagram: ({ className }) => <Instagram className={className} />,
  TikTok: ({ className }) => <TikTokIcon className={className} />,
  Threads: ({ className }) => <ThreadsIcon className={className} />,
};

/* ------------------------------------------------------------------ */
/* FadingVideo — manual rAF crossfade, no CSS transitions, no `loop`   */
/* ------------------------------------------------------------------ */
const FADE_MS = 500;
const FADE_OUT_LEAD = 0.55;

function FadingVideo({ src, className, style }: { src: string; className?: string; style?: CSSProperties }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const nearViewport = useInView(videoRef, { once: true, margin: "300px" });
  const rafRef = useRef<number | null>(null);
  const fadingOutRef = useRef(false);

  function fadeTo(target: number, duration: number) {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }
    const video = videoRef.current;
    if (!video) return;
    const start = performance.now();
    const from = video.style.opacity === "" ? 0 : parseFloat(video.style.opacity);

    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      video.style.opacity = String(from + (target - from) * progress);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        rafRef.current = null;
      }
    };
    rafRef.current = requestAnimationFrame(step);
  }

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      video.style.opacity = "0";
      video.play().catch(() => undefined);
      fadeTo(1, FADE_MS);
    };

    const handleTimeUpdate = () => {
      if (!fadingOutRef.current && video.duration - video.currentTime <= FADE_OUT_LEAD && video.duration - video.currentTime > 0) {
        fadingOutRef.current = true;
        fadeTo(0, FADE_MS);
      }
    };

    const handleEnded = () => {
      video.style.opacity = "0";
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      fadingOutRef.current = false;
      setTimeout(() => {
        video.currentTime = 0;
        video.play().catch(() => undefined);
        fadeTo(1, FADE_MS);
      }, 100);
    };

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      playsInline
      preload="metadata"
      src={nearViewport ? src : undefined}
      style={{ opacity: 0, ...style }}
      className={className}
    />
  );
}

/* ------------------------------------------------------------------ */
/* BlurText — word-by-word blur-in                                    */
/* ------------------------------------------------------------------ */
function BlurText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { amount: 0.1 });
  const words = text.split(" ");

  return (
    <span
      ref={ref}
      className={className ?? ""}
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", rowGap: "0.1em" }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ filter: "blur(10px)", opacity: 0, y: 50 }}
          animate={
            inView
              ? { filter: ["blur(10px)", "blur(5px)", "blur(0px)"], opacity: [0, 0.5, 1], y: [50, -5, 0] }
              : { filter: "blur(10px)", opacity: 0, y: 50 }
          }
          transition={{ duration: 0.7, times: [0, 0.5, 1], ease: "easeOut", delay: delay + (i * 100) / 1000 }}
          style={{ display: "inline-block", marginRight: "0.28em" }}
        >
          {word}{i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </span>
  );
}

/* Shared section reveal helper */
function FadeIn({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number; key?: Key }) {
  return (
    <motion.div
      initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
      whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Navbar (persistent)                                                 */
/* ------------------------------------------------------------------ */
function Navbar() {
  return (
    <nav className="fixed top-4 left-0 right-0 z-50 flex items-center justify-between px-8 lg:px-16">
      <a href="#home" aria-label="MinhNhat home" className="liquid-glass flex h-12 w-12 items-center justify-center rounded-full">
        <span className="font-heading italic lowercase text-white">m</span>
      </a>

      <div className="liquid-glass hidden items-center gap-1.5 px-1.5 py-1.5 rounded-full md:flex">
        {NAV_LINKS.map((link) => (
          <a key={link.label} href={link.href} className="px-3 py-2 text-sm font-medium text-white/90 font-body">
            {link.label}
          </a>
        ))}
        <a
          href="#booking"
          className="flex items-center gap-1 whitespace-nowrap rounded-full bg-white px-4 py-2 text-sm font-medium text-black"
        >
          Book MinhNhat
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      <div className="h-12 w-12" />
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/* Section 1 — Hero                                                    */
/* ------------------------------------------------------------------ */
function Hero() {
  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden bg-black">
      <FadingVideo
        src={heroVideo}
        className="absolute left-1/2 top-0 z-0 -translate-x-1/2 object-cover object-top"
        style={{ width: "120%", height: "120%" }}
      />

      <div className="relative z-10 flex min-h-screen flex-col px-4 sm:px-8 lg:px-16">
        <Navbar />

        <div className="flex flex-1 flex-col items-center justify-center pt-24 px-4 text-center">
          <motion.div
            initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
            animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="liquid-glass flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-6"
          >
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-black">Live</span>
            <span className="text-sm text-white/90 pr-3">Born to mix. Built to move the floor.</span>
          </motion.div>

          <h1 className="mt-8">
            <BlurText
              text="MinhNhat - DJ/ Producer"
              className="text-5xl md:text-7xl lg:text-[5.5rem] font-heading italic text-white leading-[1] max-w-2xl tracking-[-2px]"
            />
          </h1>
          <p className="mt-4 max-w-2xl text-lg font-heading italic text-white/80">Venture Past Your Sky Across the Soundscape</p>

          <motion.p
            initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
            animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="mt-4 text-sm md:text-base text-white max-w-2xl font-body font-light leading-tight"
          >
            DJ MinhNhat is a music producer in Vietnam, exploring techno, house and afro
            grooves through live DJ sets and remixes. Listen to the music or get in touch
            for DJ bookings and music collaborations.
          </motion.p>

          <motion.div
            initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
            animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
            className="mt-6 flex items-center gap-6"
          >
            <a
              href="#sound"
              className="liquid-glass-strong flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white"
            >
              Listen to DJ Sets & Remixes
              <ArrowUpRight className="h-5 w-5" />
            </a>
          </motion.div>

          <motion.div
            initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
            animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3, ease: "easeOut" }}
            className="mt-8 grid w-full max-w-[692px] grid-cols-1 gap-4 sm:grid-cols-3"
          >
            {[
              { icon: <ClockIcon className="h-7 w-7 text-white" />, value: "850+", label: "Live Sets Played" },
              { icon: <Music className="h-7 w-7 text-white" />, value: "98+", label: "Songs Released" },
              { icon: <GlobeIcon className="h-7 w-7 text-white" />, value: "8.7 Mil", label: "Views" },
            ].map((stat) => (
              <div key={stat.label} className="liquid-glass flex min-w-0 flex-col justify-between rounded-[1.25rem] p-5">
                <div>{stat.icon}</div>
                <div>
                  <div className="mt-6 text-4xl font-heading italic text-white leading-none tracking-[-1px]">{stat.value}</div>
                  <div className="mt-2 text-xs text-white font-body font-light">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
          animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
          className="flex flex-col items-center gap-4 pb-8"
        >
          <div className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white">
            Playing across the best venues and crews
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 md:gap-x-16">
            {PARTNER_NAMES.map((name) => (
              <span key={name} className="font-heading italic text-white text-2xl md:text-3xl tracking-tight">
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Section 2 — Sound plugs (Spotify, remixes, beats)                   */
/* ------------------------------------------------------------------ */
function Sound() {
  return (
    <section id="sound" className="relative w-full bg-black py-24 px-8 md:px-16 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <p className="mb-6 text-sm font-body text-white/80">// The Sound</p>
          <h2 className="font-heading italic text-white text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.9] tracking-[-3px]">
            Pause, press, listen.
            <br />
            <span className="text-white/70">The catalogue.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-white/80 leading-relaxed">
            Explore DJ MinhNhat’s live sets, SoundCloud remixes and beat videos,
            alongside a selected Spotify playlist. For MinhNhat trap enquiries or
            remix collaborations, <a href="#booking" className="underline underline-offset-4">get in touch</a>.
          </p>
        </FadeIn>

        {/* Latest set */}
        <FadeIn delay={0.1} className="mt-16">
          <div className="liquid-glass rounded-[1.25rem] p-4 md:p-6">
            <div className="mb-4 flex items-center gap-3">
              <Youtube className="h-5 w-5 text-white" />
              <h3 className="font-heading italic text-2xl text-white">live set at summer 2026</h3>
            </div>
            <div className="liquid-glass rounded-xl p-1 overflow-hidden aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/HeQkaLU3HEw"
                title="MinhNhat live set at summer 2026"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <a href="https://www.youtube.com/watch?v=HeQkaLU3HEw" target="_blank" rel="noreferrer" className="mt-4 inline-block text-sm underline underline-offset-4">Watch MinhNhat’s DJ set on YouTube</a>
          </div>
        </FadeIn>

        {/* Spotify — playlist embed */}
        <FadeIn delay={0.1} className="mt-12">
          <div className="liquid-glass rounded-[1.25rem] p-4 md:p-6">
            <div className="mb-4 flex items-center gap-3">
              <Music className="h-5 w-5 text-white" />
              <h3 className="font-heading italic text-2xl text-white">Playlist — Spotify</h3>
            </div>
            <iframe
              data-testid="embed-iframe"
              style={{ borderRadius: "12px" }}
              src="https://open.spotify.com/embed/playlist/1VQKoIPhICU5rkUq9ymSn3?utm_source=generator&theme=0&si=994f757b1b4143bf"
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Spotify playlist"
            />
          </div>
        </FadeIn>

        {/* Remixes */}
        <FadeIn delay={0.1} className="mt-12">
          <div className="mb-6 flex items-center gap-3">
            <Clapperboard className="h-5 w-5 text-white" />
            <h3 className="font-heading italic text-2xl md:text-3xl text-white">My remixes — SoundCloud</h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {REMIX_LINKS.map((src, idx) => (
              <div key={idx} className="liquid-glass rounded-xl p-2 overflow-hidden">
                <iframe
                  width="100%"
                  height="300"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  loading="lazy"
                  src={src}
                  title={`MinhNhat remix ${idx + 1}`}
                />
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Beats */}
        <FadeIn delay={0.1} className="mt-12">
          <div className="mb-6 flex items-center gap-3">
            <Youtube className="h-5 w-5 text-white" />
            <h3 className="font-heading italic text-2xl md:text-3xl text-white">YouTube — My beats</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BEAT_LINKS.map((beat) => (
              <div key={beat.src} className="liquid-glass rounded-2xl p-1 overflow-hidden aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={beat.src}
                  title={beat.label}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Section 3 — Capabilities ("What I Do")                              */
/* ------------------------------------------------------------------ */
function Capabilities() {
  return (
    <section id="craft" className="relative min-h-screen w-full overflow-hidden bg-black">
      <FadingVideo
        src={capabilitiesVideo}
        className="absolute inset-0 z-0 h-full w-full object-cover"
        style={{ width: "100%", height: "100%" }}
      />

      <div className="relative z-10 flex min-h-screen flex-col px-8 pt-24 md:px-16 lg:px-20 pb-10">
        <FadeIn className="mb-auto">
          <p className="mb-6 text-sm font-body text-white/80">// What I Do</p>
          <h2 className="font-heading italic text-white text-6xl md:text-7xl lg:text-[6rem] leading-[0.9] tracking-[-3px]">
            Sound
            <br />
            evolved
          </h2>
        </FadeIn>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Section 4 — The Vault (gallery)                                     */
/* ------------------------------------------------------------------ */
function VaultGallery() {
  return (
    <section id="gallery" className="relative w-full bg-black py-24 px-8 md:px-16 lg:px-20">
      <div className="mx-auto max-w-[1180px]">
        <FadeIn>
          <p className="mb-6 text-sm font-body text-white/80">// The Vault</p>
          <h2 className="font-heading italic text-white text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.9] tracking-[-3px]">
            Frames from the booth
          </h2>
          <p className="mt-4 max-w-2xl text-sm md:text-base text-white/70 font-body font-light leading-relaxed">
            Full-frame moments from shows, studios and the floor — a visual board of
            the nights and lights behind the music.
          </p>
        </FadeIn>

        <div className="picture-masonry mt-16">
          {pictureCards.map((picture, index) => (
            <motion.article
              key={picture.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.55, delay: index * 0.04 }}
              className="picture-card picture-masonry-item group"
            >
              <div className="picture-frame">
                <img src={picture.src} alt={picture.title} width={picture.width} height={picture.height} className="w-full h-auto block" loading="lazy" decoding="async" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                <div className="glass-caption inline-flex items-center gap-3 rounded-full px-4 py-2 max-w-full">
                  <span className="h-2 w-2 rounded-full bg-white/70 shrink-0" />
                  <span className="truncate text-[10px] uppercase tracking-[0.28em] text-white/90">{picture.title}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Section 5 — Booking & socials                                       */
/* ------------------------------------------------------------------ */
function Booking() {
  return (
    <section id="booking" className="relative w-full bg-black py-24 px-8 md:px-16 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="space-y-8">
          <div className="text-center space-y-4">
            <p className="mb-4 text-sm font-body text-white/80">// Booking</p>
            <h2 className="font-heading italic text-4xl md:text-6xl text-white">DJ Booking in Da Nang</h2>
            <p className="text-white/70 tracking-[0.2em] uppercase text-xs">Direct booking and contact</p>
            <p className="mx-auto max-w-2xl text-white/80 leading-relaxed">
              Looking for a DJ in Da Nang? Contact DJ and producer MinhNhat with your
              event date, venue and preferred music style to discuss availability.
              For music production or remix collaborations in Vietnam, share your creative brief.
            </p>
          </div>

          <div className="liquid-glass rounded-[32px] p-6 md:p-10 overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_30%)] pointer-events-none" />
            <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-start">
              <div className="space-y-6">
                <h3 className="font-heading italic text-4xl md:text-5xl leading-tight text-white">
                  Booking, collab, remix, build your music with me.
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <a href="mailto:minhnhatdichoi@gmail.com" className="glass-button rounded-2xl px-5 py-4 flex items-center gap-4 text-left">
                    <span className="glass-icon">
                      <Mail className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-[10px] uppercase tracking-[0.3em] text-white/60">Email</span>
                      <span className="block text-sm md:text-base text-white break-all">minhnhatdichoi@gmail.com</span>
                    </span>
                  </a>
                  <a href="tel:+84914254667" className="glass-button rounded-2xl px-5 py-4 flex items-center gap-4 text-left">
                    <span className="glass-icon">
                      <Phone className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-[10px] uppercase tracking-[0.3em] text-white/60">Call</span>
                      <span className="block text-sm md:text-base text-white">+84 914254667</span>
                    </span>
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {Object.entries({ Facebook: SOCIALS[0], Instagram: SOCIALS[1], TikTok: SOCIALS[2], Threads: SOCIALS[3] }).map(([key, social]) => {
                  const Icon = SOCIAL_ICONS[key];
                  return (
                    <a
                      key={key}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="glass-button rounded-2xl px-5 py-5 min-h-28 flex flex-col items-start justify-between"
                    >
                      <span className="glass-icon">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block text-[10px] uppercase tracking-[0.3em] text-white/60">{key}</span>
                        <span className="mt-1 block text-sm text-white">Open Profile</span>
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */
function Footer() {
  return (
    <footer className="relative z-10 flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-12 border-t border-white/10 text-[10px] uppercase tracking-[0.3em] text-white/50">
      <div>© {new Date().getFullYear()} MINHNHAT — DJ/ PRODUCER.</div>
      <div className="flex gap-8 mt-6 md:mt-0">
        <a href="#home" className="hover:text-white transition-colors">Home</a>
        <a href="#sound" className="hover:text-white transition-colors">Sound</a>
        <a href="#gallery" className="hover:text-white transition-colors">Vault</a>
        <a href="https://instagram.com/minhnhat.music" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
          Instagram
        </a>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* App                                                                 */
/* ------------------------------------------------------------------ */
export default function App() {
  return (
    <main className="bg-black">
      <Hero />
      <Sound />
      <Capabilities />
      <VaultGallery />
      <Booking />
      <Footer />
    </main>
  );
}
