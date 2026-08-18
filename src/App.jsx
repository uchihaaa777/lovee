import { useEffect, useRef, useState } from "react";
import "@/App.css";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Heart, Music, Music2, Sunrise, Cake, ArrowLeft, X, ChevronDown, Play, Pause } from "lucide-react";

const SPOTIFY_TRACK_ID = "5llaVhaIoowKT3fqf2NfPO";
const SPOTIFY_TRACK_URI = `spotify:track:${SPOTIFY_TRACK_ID}`;

const CDN =
  "https://customer-assets-cm19k8pv.emergentagent.net/job_cfce852d-fdc4-4dca-881f-443adfaad970/artifacts";

const PORTRAIT = `${CDN}/ftqtswju_namm.mee11_20260816_131536_695.jpg`;
const MORNING = [
  `${CDN}/qnscgv7e_IMG-20260808-WA0001.jpg`,
  `${CDN}/4ebe7xxv_IMG-20260808-WA0002.jpg`,
  `${CDN}/heyz4mrg_IMG-20260808-WA0003.jpg`,
  `${CDN}/ktl72mbe_IMG-20260808-WA0004.jpg`,
];

const BIRTHDAY_MSG =
  "Happy birthday, Namisha. You may not be my first love, but you are the most special. I will never love anyone as much as I love you. Thank you for always choosing me, for valuing me, for making me a priority, and for letting me be your boyfriend.";

const CHAPTERS = [
  {
    n: "01",
    t: "Every Morning",
    b: "The day only truly begins when your name lights up my screen. Your good-mornings are the softest part of my whole day.",
  },
  {
    n: "02",
    t: "The Most Special",
    b: "Out of every person, in every crowd, my eyes and my heart only ever look for you. You are, and always will be, the special one.",
  },
  {
    n: "03",
    t: "Forever Yours",
    b: "Thank you for choosing me, for valuing me, for making me a priority. I promise to keep loving you louder with every passing day.",
  },
];

function Petals() {
  const petals = Array.from({ length: 14 });
  return (
    <>
      {petals.map((_, i) => {
        const left = (i * 7.3) % 100;
        const dur = 12 + (i % 6) * 3;
        const delay = (i % 8) * 1.6;
        const size = 12 + (i % 4) * 6;
        return (
          <Heart
            key={i}
            className="petal"
            style={{
              left: `${left}vw`,
              width: size,
              height: size,
              animationDuration: `${dur}s`,
              animationDelay: `-${delay}s`,
            }}
            fill="currentColor"
            strokeWidth={0}
          />
        );
      })}
    </>
  );
}

function Marquee() {
  const words = ["I LOVE YOU", "NAMISHA", "FOREVER", "MY GIRL", "ALWAYS"];
  const row = [...words, ...words, ...words, ...words];
  return (
    <div className="relative z-10 border-y border-[#e7b25b]/20 py-6 overflow-hidden bg-[#0b0705]/40">
      <div className="marquee">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0">
            {row.map((w, i) => (
              <span
                key={`${k}-${i}`}
                className="font-serif italic text-3xl md:text-5xl px-8 text-[#f3d9a6]/80 flex items-center gap-8"
              >
                {w}
                <Heart className="text-[#e11d6b]" size={18} fill="currentColor" strokeWidth={0} />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 26 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
  };
}

function LoveModal({ open, onClose }) {
  const [view, setView] = useState("menu"); // menu | morning | birthday | song

  useEffect(() => {
    if (open) setView("menu");
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          data-testid="love-modal"
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-[#0b0705]/85 backdrop-blur-xl"
            onClick={onClose}
            data-testid="modal-backdrop"
          />
          <motion.div
            className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto rounded-2xl border border-[#e7b25b]/30 bg-gradient-to-b from-[#1a0b0a] to-[#0b0705] p-6 md:p-10 shadow-2xl"
            initial={{ scale: 0.92, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: 30, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              onClick={onClose}
              data-testid="modal-close-btn"
              className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-[#e7b25b]/30 text-[#f3d9a6] hover:bg-[#e7b25b]/10 transition"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <AnimatePresence mode="wait">
              {view === "menu" && (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4 }}
                  className="text-center"
                >
                  <p className="font-script text-[#e11d6b] text-2xl">hi my love</p>
                  <h3 className="font-serif text-4xl md:text-5xl mt-2 text-[#f7ecd9]">
                    What would you like to see?
                  </h3>
                  <div className="mx-auto my-6 h-px w-24 gold-line" />
                  <div className="grid sm:grid-cols-2 gap-5 mt-8">
                    <button
                      data-testid="morning-wishes-btn"
                      onClick={() => setView("morning")}
                      className="group relative rounded-xl border border-[#e7b25b]/40 p-8 text-left overflow-hidden hover:border-[#e7b25b] transition"
                    >
                      <Sunrise className="text-[#e7b25b] mb-4" size={34} />
                      <p className="font-serif text-2xl text-[#f7ecd9]">Good Morning Wishes</p>
                      <p className="text-sm text-[#f7ecd9]/60 mt-2 font-light">
                        The little notes that start my day
                      </p>
                    </button>
                    <button
                      data-testid="birthday-wishes-btn"
                      onClick={() => setView("birthday")}
                      className="group relative rounded-xl border border-[#e11d6b]/40 p-8 text-left overflow-hidden hover:border-[#e11d6b] transition"
                    >
                      <Cake className="text-[#e11d6b] mb-4" size={34} />
                      <p className="font-serif text-2xl text-[#f7ecd9]">Birthday Wishes</p>
                      <p className="text-sm text-[#f7ecd9]/60 mt-2 font-light">
                        A message straight from my heart
                      </p>
                    </button>
                    <button
                      data-testid="song-btn"
                      onClick={() => setView("song")}
                      className="group relative rounded-xl border border-[#e7b25b]/40 p-8 text-left overflow-hidden hover:border-[#e7b25b] transition"
                    >
                      <Music className="text-[#e7b25b] mb-4" size={34} />
                      <p className="font-serif text-2xl text-[#f7ecd9]">Song: Pehli Nazar Mein</p>
                      <p className="text-sm text-[#f7ecd9]/60 mt-2 font-light">
                        Play a song I love (opens on Spotify)
                      </p>
                    </button>
                  </div>
                </motion.div>
              )}

              {view === "morning" && (
                <motion.div
                  key="morning"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4 }}
                >
                  <BackBtn onClick={() => setView("menu")} />
                  <h3 className="font-serif text-3xl md:text-4xl text-[#f7ecd9] mt-4 flex items-center gap-3">
                    <Sunrise className="text-[#e7b25b]" /> Good Morning, Namisha
                  </h3>
                  <p className="text-[#f7ecd9]/60 font-light mt-1">
                    Every sunrise deserves a message like these.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-5 mt-7">
                    {MORNING.map((src, i) => (
                      <motion.img
                        key={src}
                        src={src}
                        alt={`Good morning wish ${i + 1}`}
                        data-testid={`morning-chat-${i}`}
                        className="chat-card w-full rounded-xl border border-[#e7b25b]/20"
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {view === "birthday" && (
                <motion.div
                  key="birthday"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4 }}
                  className="text-center py-4"
                >
                  <div className="flex justify-start">
                    <BackBtn onClick={() => setView("menu")} />
                  </div>
                  <Cake className="mx-auto text-[#e11d6b] mt-6" size={44} />
                  <h3 className="font-script text-5xl md:text-6xl text-[#e11d6b] mt-4">
                    Happy Birthday
                  </h3>
                  <div className="mx-auto my-6 h-px w-28 gold-line" />
                  <p
                    data-testid="birthday-message"
                    className="font-serif text-2xl md:text-3xl leading-relaxed text-[#f7ecd9]/90 max-w-2xl mx-auto"
                  >
                    {BIRTHDAY_MSG}
                  </p>
                  <div className="mt-8 flex items-center justify-center gap-2 text-[#e7b25b]">
                    <Heart size={16} fill="currentColor" strokeWidth={0} className="heartbeat" />
                    <span className="font-script text-2xl">with all my love</span>
                    <Heart size={16} fill="currentColor" strokeWidth={0} className="heartbeat" />
                  </div>
                </motion.div>
              )}
              {view === "song" && (
                <motion.div
                  key="song"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4 }}
                  className="text-center py-6"
                >
                  <div className="flex justify-start">
                    <BackBtn onClick={() => setView("menu")} />
                  </div>
                  <Music className="mx-auto text-[#e7b25b] mt-6" size={44} />
                  <h3 className="font-script text-4xl md:text-5xl text-[#e7b25b] mt-4">Atif Aslam</h3>
                  <div className="mx-auto my-6 h-px w-28 gold-line" />
                  <p className="font-serif text-lg leading-relaxed text-[#f7ecd9]/85 max-w-2xl mx-auto">
                    Atif Aslam — open his Spotify profile to browse all his songs and playlists.
                  </p>
                  <div className="mt-6 flex items-center justify-center gap-4">
                    <a
                      href="https://open.spotify.com/artist/2oSONSC9zQ4UonDKnLqksx?si=l2pjSgxVS225QaHLSji_mg"
                      target="_blank"
                      rel="noreferrer"
                      className="btn-gold inline-flex items-center gap-3 rounded-full border border-[#e7b25b] px-6 py-3 text-sm uppercase tracking-[0.25em] text-[#f3d9a6] hover:text-[#1a0a08]"
                    >
                      <Music2 size={14} /> Open Atif Aslam on Spotify
                    </a>
                  </div>
                </motion.div>
            )}
          </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function BackBtn({ onClick }) {
  return (
    <button
      onClick={onClick}
      data-testid="modal-back-btn"
      className="inline-flex items-center gap-2 text-sm text-[#f3d9a6] hover:text-[#e7b25b] transition"
    >
      <ArrowLeft size={16} /> back
    </button>
  );
}

function App() {
  const [open, setOpen] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  useEffect(() => {
    let lenis;
    let raf;
    import("lenis")
      .then(({ default: Lenis }) => {
        lenis = new Lenis({ duration: 1.2, smoothWheel: true });
        const loop = (t) => {
          lenis.raf(t);
          raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
      })
      .catch(() => {});
    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (lenis) lenis.destroy();
    };
  }, []);

  const line = {
    initial: { y: "110%" },
    animate: { y: 0 },
  };
  const lineT = (d) => ({ duration: 1, delay: d, ease: [0.22, 1, 0.36, 1] });

  return (
    <div className="App relative">
      <div className="bg-love" />
      <div className="grain" />
      <Petals />


      {/* HERO */}
      <section
        ref={heroRef}
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16"
      >
        <motion.div
          style={{ y: titleY }}
          className="text-center max-w-4xl"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 1 }}
            className="uppercase tracking-[0.4em] text-[11px] md:text-xs text-[#e7b25b]/80 mb-6"
          >
            A little corner of the internet · made only for you
          </motion.p>

          <h1 className="font-serif leading-[0.9]">
            <span className="block overflow-hidden">
              <motion.span
                className="block font-script text-[#e11d6b] text-5xl md:text-7xl"
                variants={line}
                initial="initial"
                animate="animate"
                transition={lineT(0.2)}
              >
                Namisha,
              </motion.span>
            </span>
            <span className="block overflow-hidden mt-1">
              <motion.span
                className="block text-[#f7ecd9] text-6xl sm:text-7xl md:text-[9rem] tracking-tight"
                variants={line}
                initial="initial"
                animate="animate"
                transition={lineT(0.45)}
              >
                I Love You
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-8 text-[#f7ecd9]/70 font-light text-base md:text-lg max-w-xl mx-auto"
          >
            You may not be my first love — but you are, and forever will be, the most special.
            Tap on the photo below. 💌
          </motion.p>
        </motion.div>

        {/* portrait */}
        <motion.button
          data-testid="open-portrait-btn"
          onClick={() => setOpen(true)}
          className="group relative mt-14 spotlight-frame overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.015 }}
        >
          <motion.img
            src={PORTRAIT}
            alt="Namisha"
            style={{ y: portraitY, scale: portraitScale }}
            className="w-[280px] h-[350px] md:w-[340px] md:h-[430px] object-cover"
          />
          <div className="absolute inset-0 flex items-end justify-center pb-6 bg-gradient-to-t from-[#0b0705]/70 via-transparent to-transparent">
            <span className="flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-[#f3d9a6] opacity-90 group-hover:opacity-100 transition">
              <Heart size={14} fill="currentColor" strokeWidth={0} className="text-[#e11d6b]" />
              tap to open
            </span>
          </div>
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="mt-12 flex flex-col items-center text-[#e7b25b]/60"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] mb-2">scroll</span>
          <ChevronDown className="animate-bounce" size={18} />
        </motion.div>
      </section>

      <Marquee />

      {/* CHAPTERS */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-28 md:py-40">
        <motion.p {...reveal()} className="font-script text-[#e11d6b] text-3xl mb-2">
          a few things i need you to know
        </motion.p>
        <motion.h2
          {...reveal(0.05)}
          className="font-serif text-4xl md:text-6xl text-[#f7ecd9] mb-16"
        >
          Reasons, chapter by chapter.
        </motion.h2>

        <div className="space-y-14">
          {CHAPTERS.map((c, i) => (
            <motion.div
              key={c.n}
              {...reveal(i * 0.08)}
              className="grid md:grid-cols-[120px_1fr] gap-6 md:gap-12 items-start border-t border-[#e7b25b]/15 pt-10"
            >
              <span className="font-serif text-6xl md:text-7xl text-[#e7b25b]/40">{c.n}</span>
              <div>
                <h3 className="font-serif text-3xl md:text-4xl text-[#f7ecd9] mb-3">{c.t}</h3>
                <p className="text-[#f7ecd9]/65 font-light text-lg leading-relaxed max-w-2xl">
                  {c.b}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-6 pb-32 text-center">
        <motion.div {...reveal()} className="max-w-2xl mx-auto">
          <Heart
            className="mx-auto text-[#e11d6b] heartbeat mb-8"
            size={40}
            fill="currentColor"
            strokeWidth={0}
          />
          <h2 className="font-serif text-4xl md:text-6xl text-[#f7ecd9] mb-6">
            Open your little surprise.
          </h2>
          <button
            data-testid="open-cta-btn"
            onClick={() => setOpen(true)}
            className="btn-gold inline-flex items-center gap-3 rounded-full border border-[#e7b25b] px-10 py-4 text-sm uppercase tracking-[0.25em] text-[#f3d9a6] hover:text-[#1a0a08]"
          >
            <Heart size={15} fill="currentColor" strokeWidth={0} />
            open wishes
          </button>
        </motion.div>
      </section>

      <footer className="relative z-10 border-t border-[#e7b25b]/15 py-10 text-center">
        <p className="font-script text-3xl text-[#e11d6b]">Namisha</p>
        <p className="text-xs uppercase tracking-[0.3em] text-[#f7ecd9]/40 mt-2">
          made with love, only for you
        </p>
      </footer>

      <SidePlayer />
      <LoveModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

function SidePlayer() {
  const embedRef = useRef(null);
  const controllerRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [isPaused, setIsPaused] = useState(true);

  useEffect(() => {
    let cancelled = false;

    function setup(IFrameAPI) {
      if (cancelled || !embedRef.current || controllerRef.current) return;
      const options = {
        uri: SPOTIFY_TRACK_URI,
        width: "100%",
        height: "80",
      };
      IFrameAPI.createController(embedRef.current, options, (controller) => {
        if (cancelled) return;
        controllerRef.current = controller;
        controller.addListener("ready", () => setReady(true));
        controller.addListener("playback_update", (e) => {
          setIsPaused(!!e.data.isPaused);
        });
      });
    }

    if (window.Spotify && window.Spotify.Iframe) {
      setup(window.Spotify.Iframe);
    } else {
      const prevReady = window.onSpotifyIframeApiReady;
      window.onSpotifyIframeApiReady = (IFrameAPI) => {
        if (typeof prevReady === "function") prevReady(IFrameAPI);
        setup(IFrameAPI);
      };
      if (!document.getElementById("spotify-iframe-api")) {
        const script = document.createElement("script");
        script.id = "spotify-iframe-api";
        script.src = "https://open.spotify.com/embed/iframe-api/v1";
        script.async = true;
        document.body.appendChild(script);
      }
    }

    return () => {
      cancelled = true;
    };
  }, []);

  const handleToggle = () => {
    if (!controllerRef.current) return;
    controllerRef.current.togglePlay();
  };

  return (
    <aside className="side-player" role="complementary" aria-label="Atif Aslam — Pehli Nazar Mein player">
      <div className="side-player-inner">
        <h4 className="side-player-title">Pehli Nazar Mein — Atif Aslam</h4>

        <button
          type="button"
          data-testid="song-play-pause-btn"
          onClick={handleToggle}
          disabled={!ready}
          className="side-player-toggle"
          aria-label={isPaused ? "Play song" : "Pause song"}
        >
          {isPaused ? <Play size={16} fill="currentColor" /> : <Pause size={16} fill="currentColor" />}
          {isPaused ? "Play" : "Pause"}
        </button>

        <div className="side-player-embed" ref={embedRef} data-testid="spotify-embed" />

        <a
          className="side-player-link"
          href="https://open.spotify.com/track/5llaVhaIoowKT3fqf2NfPO?si=1558887a53f8400e"
          target="_blank"
          rel="noreferrer"
        >
          Open in Spotify
        </a>
      </div>
    </aside>
  );
}

export default App;
