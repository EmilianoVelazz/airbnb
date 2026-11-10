import React, { useState, useRef, useEffect } from 'react';
import anime from 'animejs';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring
} from 'framer-motion';
import {
  MapPin,
  Calendar,
  Users,
  Search,
  Flame,
  Bike,
  Plus,
  Minus,
  Layers,
  PawPrint,
  ChevronDown,
  Check,
  Sparkles
} from 'lucide-react';
import { HERO_SCENES, ZONES, DATE_PRESETS } from '../data/mockData';

const PARTICLE_SEEDS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 19 + 7) % 94}%`,
  top: `${(i * 23 + 11) % 86}%`,
  size: (i % 3) * 3 + 4
}));

export default function HeroRenderShowcase({
  searchFilters,
  setSearchFilters,
  onExecuteSearch,
  onReplayIntro
}) {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState(HERO_SCENES[0].hotspots[0].id);
  const [showHotspots, setShowHotspots] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // Active Popover in the Search Dock: null | 'dates' | 'guests'
  const [openPopover, setOpenPopover] = useState(null);

  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const particlesRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  const currentScene = HERO_SCENES[activeSceneIndex];

  // 1. Anime.js Word-by-Word 3D Staggered Headline + Stats Choreography on Scene Switch
  useEffect(() => {
    anime.suspendWhenDocumentHidden = false;
    anime.remove('.anime-hero-word, .anime-hero-sub, .anime-stat-card');

    const resetStyles = () => {
      document
        .querySelectorAll('.anime-hero-word, .anime-hero-sub, .anime-stat-card')
        .forEach((el) => {
          el.style.opacity = '1';
          el.style.transform = '';
        });
    };

    const tl = anime.timeline({
      easing: 'easeOutExpo',
      complete: resetStyles
    });

    tl.add({
      targets: '.anime-hero-word',
      translateY: [28, 0],
      rotateZ: [4, 0],
      opacity: [0.2, 1],
      duration: 750,
      delay: anime.stagger(45)
    })
      .add(
        {
          targets: '.anime-hero-sub',
          translateY: [14, 0],
          opacity: [0.25, 1],
          duration: 600
        },
        '-=500'
      )
      .add(
        {
          targets: '.anime-stat-card',
          scale: [0.92, 1],
          translateY: [12, 0],
          opacity: [0.3, 1],
          duration: 650,
          delay: anime.stagger(75),
          easing: 'easeOutElastic(1, .75)'
        },
        '-=450'
      );

    return () => {
      tl.pause();
      resetStyles();
    };
  }, [activeSceneIndex]);

  // 2. Anime.js Continuous Atmospheric Particle Engine (Fireflies / Volcanic Embers / Trail Sparks)
  useEffect(() => {
    if (!particlesRef.current) return;
    const nodes = particlesRef.current.querySelectorAll('.anime-hero-particle');

    const anim = anime({
      targets: nodes,
      translateY: () => anime.random(-95, -25),
      translateX: () => anime.random(-45, 45),
      scale: () => [anime.random(0.6, 1), anime.random(1.2, 1.9)],
      opacity: [
        { value: 0.85, duration: 900 },
        { value: 0.15, duration: 1400 }
      ],
      easing: 'easeInOutSine',
      duration: () => anime.random(2600, 4800),
      delay: anime.stagger(140),
      direction: 'alternate',
      loop: true
    });

    return () => anim.pause();
  }, [activeSceneIndex]);

  // Auto-advance hero scenes unless user is hovering/interacting
  useEffect(() => {
    if (isPaused || openPopover) return;
    const timer = setInterval(() => {
      setActiveSceneIndex((prev) => {
        const next = (prev + 1) % HERO_SCENES.length;
        setActiveHotspot(HERO_SCENES[next].hotspots[0].id);
        return next;
      });
    }, 8500);
    return () => clearInterval(timer);
  }, [isPaused, openPopover]);

  // Scroll parallax transforms
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.15]);
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Interactive 3D mouse-tracking physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 25 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct * -20);
    mouseY.set(yPct * -14);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsPaused(false);
  };

  const handleSceneChange = (idx) => {
    setActiveSceneIndex(idx);
    setActiveHotspot(HERO_SCENES[idx].hotspots[0].id);
  };

  const handleSelectDatePreset = (preset) => {
    setSearchFilters((prev) => ({
      ...prev,
      checkIn: preset.checkIn,
      checkOut: preset.checkOut,
      nights: preset.nights,
      dateLabel: preset.label
    }));
  };

  // Split title into words for Anime.js staggered 3D word animation
  const titleWords = currentScene.title.split(' ');

  return (
    <section
      id="top"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[95vh] w-full flex flex-col justify-between overflow-visible pt-24 pb-12 select-none"
    >
      {/* Background Architectural Render with Scroll + Mouse Parallax */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <motion.div
          style={{ scale: bgScale, y: bgY, x: smoothX }}
          className="w-full h-full"
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={currentScene.id}
              src={currentScene.image}
              alt={currentScene.title}
              initial={{ opacity: 0, scale: 1.06, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1.02, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.99, filter: 'blur(4px)' }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full object-cover object-center"
            />
          </AnimatePresence>

          {/* Cinematic Multi-Layer Gradient Scrim */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#090F0C]/90 via-[#090F0C]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090F0C] via-transparent to-[#090F0C]/45" />
        </motion.div>

        {/* Anime.js Floating Atmospheric Particles (Embers / Fireflies / Mist) */}
        <div
          ref={particlesRef}
          className="absolute inset-0 pointer-events-none z-10 overflow-hidden"
        >
          {PARTICLE_SEEDS.map((p) => (
            <span
              key={p.id}
              style={{
                left: p.left,
                top: p.top,
                width: `${p.size}px`,
                height: `${p.size}px`
              }}
              className={`anime-hero-particle absolute rounded-full blur-[0.5px] ${
                activeSceneIndex === 1
                  ? 'bg-[#D15B2E] shadow-[0_0_14px_#D15B2E]'
                  : activeSceneIndex === 2
                  ? 'bg-[#E9A789] shadow-[0_0_12px_#E9A789]'
                  : 'bg-[#F2ECE1] shadow-[0_0_12px_#F2ECE1]'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Interactive 3D Render Hotspots Overlay */}
      {showHotspots && (
        <div className="hidden lg:block absolute inset-0 z-10 pointer-events-none">
          {currentScene.hotspots.map((spot) => {
            const isSelected = activeHotspot === spot.id;
            return (
              <div
                key={spot.id}
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
              >
                <motion.button
                  whileHover={{ scale: 1.18 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setActiveHotspot(isSelected ? null : spot.id)}
                  onMouseEnter={() => setActiveHotspot(spot.id)}
                  className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-[#D15B2E] text-white shadow-[0_0_25px_rgba(209,91,46,0.9)]'
                      : 'bg-black/60 text-white/90 border border-white/40 backdrop-blur-md hover:bg-[#D15B2E]'
                  }`}
                >
                  <span className="absolute inset-0 rounded-full bg-[#D15B2E] animate-ping opacity-40" />
                  <Plus
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isSelected ? 'rotate-45' : ''
                    }`}
                  />
                </motion.button>

                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.92 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.92 }}
                      transition={{ type: 'spring', stiffness: 360, damping: 26 }}
                      className="absolute left-11 -top-4 w-72 p-4 rounded-2xl bg-[#111915]/95 backdrop-blur-xl border border-white/20 text-white shadow-2xl"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#D15B2E]/25 text-[#F2CBB8] border border-[#D15B2E]/40">
                          {spot.tag}
                        </span>
                        <span className="text-[10px] font-mono text-white/50">
                          INSPECCIÓN 3D
                        </span>
                      </div>
                      <h4 className="font-serif text-lg font-semibold text-white leading-snug mt-1">
                        {spot.title}
                      </h4>
                      <p className="text-xs text-white/75 leading-relaxed mt-1">
                        {spot.detail}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      )}

      {/* Main Hero Foreground Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 md:pt-10 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8"
      >
        {/* Left Editorial Column */}
        <div className="max-w-2xl" ref={headlineRef}>
          <div className="flex flex-wrap items-center gap-2.5 mb-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-mono tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#D15B2E] animate-pulse" />
              {currentScene.badge}
            </div>

            <button
              onClick={() => setShowHotspots(!showHotspots)}
              className={`hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all border ${
                showHotspots
                  ? 'bg-[#D15B2E]/25 border-[#D15B2E] text-[#F9E6DC]'
                  : 'bg-black/40 border-white/20 text-white/70'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              {showHotspots ? 'Pines 3D: ON' : 'Pines: OFF'}
            </button>

            {onReplayIntro && (
              <button
                onClick={onReplayIntro}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-[#D15B2E] border border-white/20 text-white text-xs font-mono transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#E9A789]" />
                <span>Intro Anime.js</span>
              </button>
            )}
          </div>

          {/* Anime.js Staggered Word-by-Word Headline */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-7xl text-white font-semibold leading-[1.06] tracking-tight flex flex-wrap gap-x-2.5 sm:gap-x-3 gap-y-1">
            {titleWords.map((word, idx) => (
              <span
                key={`${currentScene.id}-w-${idx}`}
                className="anime-hero-word inline-block origin-bottom-left"
              >
                {word}
              </span>
            ))}
          </h1>

          <p className="anime-hero-sub mt-3 sm:mt-4 text-xs sm:text-base md:text-lg text-white/80 max-w-xl leading-relaxed font-normal">
            {currentScene.subtitle}
          </p>

          {/* Mobile & Tablet Interactive 3D Hotspot Chip Bar (Touch Friendly) */}
          <div className="lg:hidden mt-4">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1.5">
              {currentScene.hotspots.map((spot) => {
                const isSelected = activeHotspot === spot.id;
                return (
                  <button
                    key={spot.id}
                    type="button"
                    onClick={() => setActiveHotspot(isSelected ? null : spot.id)}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-mono whitespace-nowrap flex items-center gap-1.5 border transition-all ${
                      isSelected
                        ? 'bg-[#D15B2E] text-white border-[#D15B2E] shadow-md'
                        : 'bg-black/50 text-white/85 border-white/20 backdrop-blur-md'
                    }`}
                  >
                    <Plus
                      className={`w-3 h-3 transition-transform ${
                        isSelected ? 'rotate-45' : ''
                      }`}
                    />
                    <span>{spot.title}</span>
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              {activeHotspot && (
                <motion.div
                  key={activeHotspot}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  className="mt-2 p-3 rounded-2xl bg-[#111915]/90 backdrop-blur-xl border border-white/20 text-white"
                >
                  {(() => {
                    const spot =
                      currentScene.hotspots.find((h) => h.id === activeHotspot) ||
                      currentScene.hotspots[0];
                    return (
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#E9A789]">
                            {spot.tag} · {spot.title}
                          </span>
                          <span className="text-[9px] font-mono text-white/50">
                            PUNTO 3D
                          </span>
                        </div>
                        <p className="text-xs text-white/80 mt-1 leading-relaxed">
                          {spot.detail}
                        </p>
                      </div>
                    );
                  })()}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Live Atmospheric Telemetry Strip animated via Anime.js */}
          <div className="mt-5 sm:mt-7 grid grid-cols-3 gap-2 sm:gap-3 max-w-lg">
            {currentScene.stats.map((st) => (
              <div
                key={st.label}
                className="anime-stat-card p-2.5 sm:p-3 rounded-2xl bg-black/45 backdrop-blur-md border border-white/15"
              >
                <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-white/55 truncate">
                  {st.label}
                </div>
                <div className="text-[11px] sm:text-sm font-semibold text-white mt-0.5 font-mono truncate">
                  {st.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Interactive Render Scene Switcher Cards */}
        <div className="w-full lg:w-80 flex flex-row lg:flex-col gap-2.5 overflow-x-auto no-scrollbar">
          {HERO_SCENES.map((scene, idx) => {
            const active = idx === activeSceneIndex;
            return (
              <motion.button
                key={scene.id}
                whileHover={{ x: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSceneChange(idx)}
                className={`relative text-left p-3.5 rounded-2xl border transition-all flex items-center gap-3.5 min-w-[240px] lg:min-w-0 ${
                  active
                    ? 'bg-white/15 backdrop-blur-xl border-white/40 shadow-xl'
                    : 'bg-black/40 backdrop-blur-md border-white/10 opacity-75 hover:opacity-100'
                }`}
              >
                <img
                  src={scene.image}
                  alt={scene.category}
                  className="w-14 h-14 rounded-xl object-cover flex-shrink-0 border border-white/20"
                />
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] font-mono text-[#E9A789] font-semibold">
                    {scene.category}
                  </div>
                  <div className="text-xs font-medium text-white truncate mt-0.5">
                    {scene.title}
                  </div>
                  {active && (
                    <motion.div
                      layoutId="scene-progress"
                      className="h-1 bg-[#D15B2E] rounded-full mt-2 w-full"
                    />
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Bottom Airbnb-Style Interactive Search & Combo Configurator Dock */}
      <div className="relative z-40 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-8">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative p-3 sm:p-4 rounded-3xl bg-white/95 dark:bg-[#141E1A]/95 backdrop-blur-2xl border border-black/10 dark:border-white/15 shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 items-center">
            {/* 1. Ubicación / Sierra */}
            <div className="md:col-span-3 px-3.5 py-2 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              <label className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                <MapPin className="w-3.5 h-3.5 text-[#D15B2E]" />
                Zona en Zacatlán
              </label>
              <select
                value={searchFilters.zone}
                onChange={(e) =>
                  setSearchFilters((prev) => ({ ...prev, zone: e.target.value }))
                }
                className="w-full mt-1 bg-transparent text-sm font-bold text-[#1C1B19] dark:text-white focus:outline-none cursor-pointer"
              >
                {ZONES.map((z) => (
                  <option key={z} value={z} className="bg-white dark:bg-[#141E1A]">
                    {z}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Interactive Check-In / Check-Out Date Picker Popover Trigger */}
            <div className="relative md:col-span-3 px-3.5 py-2 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors border-t md:border-t-0 md:border-l border-black/10 dark:border-white/10">
              <button
                type="button"
                onClick={() =>
                  setOpenPopover(openPopover === 'dates' ? null : 'dates')
                }
                className="w-full text-left"
              >
                <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#D15B2E]" />
                    Check-in · Check-out
                  </span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
                <div className="mt-1 flex items-baseline justify-between">
                  <span className="text-sm font-bold text-[#1C1B19] dark:text-white">
                    {searchFilters.checkIn} → {searchFilters.checkOut}
                  </span>
                  <span className="text-xs font-mono text-[#D15B2E] font-semibold">
                    ({searchFilters.nights}n)
                  </span>
                </div>
              </button>

              {/* Date Picker Popover */}
              <AnimatePresence>
                {openPopover === 'dates' && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    className="absolute left-0 right-0 sm:right-auto top-full mt-2 md:top-auto md:bottom-full md:mb-4 w-full sm:w-96 p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#16221D] border border-black/10 dark:border-white/15 shadow-2xl z-50"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                        Elige Fechas en Hotel Guerrero
                      </span>
                      <button
                        onClick={() => setOpenPopover(null)}
                        className="text-xs font-semibold text-[#D15B2E]"
                      >
                        Listo
                      </button>
                    </div>

                    <div className="space-y-2">
                      {DATE_PRESETS.map((preset) => {
                        const isSelected =
                          searchFilters.checkIn === preset.checkIn &&
                          searchFilters.nights === preset.nights;
                        return (
                          <button
                            key={preset.id}
                            type="button"
                            onClick={() => handleSelectDatePreset(preset)}
                            className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                              isSelected
                                ? 'bg-[#D15B2E]/10 border-[#D15B2E] text-[#1C1B19] dark:text-white'
                                : 'border-black/10 dark:border-white/10 hover:border-[#D15B2E]/50'
                            }`}
                          >
                            <div>
                              <div className="text-xs font-bold flex items-center gap-2">
                                <span>{preset.label}</span>
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#D15B2E]/20 text-[#D15B2E]">
                                  {preset.tag}
                                </span>
                              </div>
                              <div className="text-xs text-neutral-500 dark:text-neutral-400 font-mono mt-0.5">
                                {preset.checkIn} al {preset.checkOut} ·{' '}
                                {preset.nights} noches
                              </div>
                            </div>
                            {isSelected && (
                              <Check className="w-4 h-4 text-[#D15B2E]" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Custom Nights Adjuster */}
                    <div className="mt-4 pt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
                      <span className="text-xs font-semibold">
                        Personalizar noches totales:
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setSearchFilters((prev) => ({
                              ...prev,
                              nights: Math.max(1, prev.nights - 1)
                            }))
                          }
                          className="w-7 h-7 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center hover:bg-[#D15B2E] hover:text-white"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-mono text-sm font-bold w-6 text-center">
                          {searchFilters.nights}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setSearchFilters((prev) => ({
                              ...prev,
                              nights: Math.min(14, prev.nights + 1)
                            }))
                          }
                          className="w-7 h-7 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center hover:bg-[#D15B2E] hover:text-white"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 3. Interactive Guests & Pets Popover Trigger */}
            <div className="relative md:col-span-2 px-3.5 py-2 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors border-t md:border-t-0 md:border-l border-black/10 dark:border-white/10">
              <button
                type="button"
                onClick={() =>
                  setOpenPopover(openPopover === 'guests' ? null : 'guests')
                }
                className="w-full text-left"
              >
                <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#D15B2E]" />
                    Huéspedes
                  </span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
                <div className="mt-1 flex items-center gap-1.5 text-sm font-bold text-[#1C1B19] dark:text-white">
                  <span>
                    {searchFilters.guests}{' '}
                    {searchFilters.guests === 1 ? 'viajero' : 'viajeros'}
                  </span>
                  {searchFilters.petFriendlyOnly && (
                    <span className="px-1.5 py-0.5 rounded-md bg-[#2E4F42] text-white text-[10px] flex items-center gap-1">
                      <PawPrint className="w-2.5 h-2.5" />
                      Pet
                    </span>
                  )}
                </div>
              </button>

              {/* Guests & Pets Popover */}
              <AnimatePresence>
                {openPopover === 'guests' && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    className="absolute left-0 right-0 sm:right-auto top-full mt-2 md:top-auto md:bottom-full md:mb-4 w-full sm:w-72 p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#16221D] border border-black/10 dark:border-white/15 shadow-2xl z-50 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold">Adultos y jóvenes</div>
                        <div className="text-[11px] text-neutral-500">
                          Capacidad de 1 a 6 por cabaña
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setSearchFilters((prev) => ({
                              ...prev,
                              guests: Math.max(1, prev.guests - 1)
                            }))
                          }
                          className="w-7 h-7 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center hover:bg-[#D15B2E] hover:text-white"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-mono text-sm font-bold w-5 text-center">
                          {searchFilters.guests}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setSearchFilters((prev) => ({
                              ...prev,
                              guests: Math.min(6, prev.guests + 1)
                            }))
                          }
                          className="w-7 h-7 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center hover:bg-[#D15B2E] hover:text-white"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold flex items-center gap-1.5">
                          <PawPrint className="w-3.5 h-3.5 text-[#D15B2E]" />
                          Viajo con Mascota
                        </div>
                        <div className="text-[11px] text-neutral-500">
                          Filtra cabañas Pet-Friendly
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setSearchFilters((prev) => ({
                            ...prev,
                            petFriendlyOnly: !prev.petFriendlyOnly
                          }))
                        }
                        className={`w-11 h-6 rounded-full p-0.5 transition-colors flex items-center ${
                          searchFilters.petFriendlyOnly
                            ? 'bg-[#2E4F42] justify-end'
                            : 'bg-neutral-300 dark:bg-neutral-700 justify-start'
                        }`}
                      >
                        <motion.div
                          layout
                          className="w-5 h-5 rounded-full bg-white shadow"
                        />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 4. Combos Experiencias Toggles */}
            <div className="md:col-span-2 px-3 py-2 border-t md:border-t-0 md:border-l border-black/10 dark:border-white/10">
              <span className="block text-[11px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1.5">
                Con Servicios
              </span>
              <div className="flex items-center gap-1.5">
                <motion.button
                  whileTap={{ scale: 0.93 }}
                  onClick={() =>
                    setSearchFilters((prev) => ({
                      ...prev,
                      withTemazcal: !prev.withTemazcal
                    }))
                  }
                  className={`px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1 border transition-all ${
                    searchFilters.withTemazcal
                      ? 'bg-[#D15B2E] text-white border-[#D15B2E] shadow-sm'
                      : 'bg-black/5 dark:bg-white/5 text-neutral-700 dark:text-neutral-300 border-transparent'
                  }`}
                >
                  <Flame className="w-3 h-3" />
                  Temazcal
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.93 }}
                  onClick={() =>
                    setSearchFilters((prev) => ({
                      ...prev,
                      withMoto: !prev.withMoto
                    }))
                  }
                  className={`px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1 border transition-all ${
                    searchFilters.withMoto
                      ? 'bg-[#2E4F42] text-white border-[#2E4F42] shadow-sm'
                      : 'bg-black/5 dark:bg-white/5 text-neutral-700 dark:text-neutral-300 border-transparent'
                  }`}
                >
                  <Bike className="w-3 h-3" />
                  Motos
                </motion.button>
              </div>
            </div>

            {/* 5. CTA Search Button */}
            <div className="md:col-span-2 flex justify-end">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setOpenPopover(null);
                  onExecuteSearch();
                }}
                className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-[#D15B2E] to-[#B84620] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#D15B2E]/30 hover:shadow-[#D15B2E]/50 transition-all"
              >
                <Search className="w-4 h-4" />
                <span>Buscar</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
