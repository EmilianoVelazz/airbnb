import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import { Trees, Sparkles } from 'lucide-react';

export default function AnimeIntroOverlay({ onComplete }) {
  const overlayRef = useRef(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!visible) return;

    // Set initial SVG dashoffset for line drawing
    const paths = overlayRef.current?.querySelectorAll('.anime-draw-path');
    if (paths) {
      paths.forEach((p) => {
        const len = p.getTotalLength ? p.getTotalLength() : 400;
        p.style.strokeDasharray = `${len}`;
        p.style.strokeDashoffset = `${len}`;
      });
    }

    const tl = anime.timeline({
      easing: 'easeOutExpo',
      complete: () => {
        setVisible(false);
        if (onComplete) onComplete();
      }
    });

    // 1. Draw the architectural mountain + A-Frame cabin SVG lines
    tl.add({
      targets: '.anime-draw-path',
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: 1350,
      delay: anime.stagger(160),
      easing: 'easeInOutSine'
    })
      // 2. Staggered 3D letter reveal for "HOTEL GUERRERO"
      .add(
        {
          targets: '.anime-intro-letter',
          translateY: [55, 0],
          rotateZ: [8, 0],
          opacity: [0, 1],
          duration: 850,
          delay: anime.stagger(42, { from: 'center' })
        },
        '-=800'
      )
      // 3. Subtitle & altitude counter reveal
      .add(
        {
          targets: '.anime-intro-sub',
          translateY: [20, 0],
          opacity: [0, 1],
          duration: 650,
          delay: anime.stagger(110)
        },
        '-=500'
      )
      // 4. Fade out center emblem
      .add({
        targets: '.anime-intro-center',
        scale: [1, 0.94],
        opacity: [1, 0],
        duration: 450,
        delay: 280,
        easing: 'easeInQuad'
      })
      // 5. Staggered 5-column architectural shutter curtain opening
      .add(
        {
          targets: '.anime-shutter-col',
          translateY: ['0%', '-102%'],
          duration: 850,
          delay: anime.stagger(75, { from: 'center' }),
          easing: 'easeInOutQuart'
        },
        '-=150'
      );

    return () => {
      tl.pause();
    };
  }, [visible, onComplete]);

  if (!visible) return null;

  const brandLetters = 'HOTEL GUERRERO'.split('');

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] pointer-events-auto flex items-center justify-center overflow-hidden"
    >
      {/* 5 Staggered Vertical Shutter Columns */}
      <div className="absolute inset-0 grid grid-cols-5 pointer-events-none">
        {[0, 1, 2, 3, 4].map((col) => (
          <div
            key={col}
            className="anime-shutter-col h-full w-full bg-[#0B120F] border-r border-white/5"
          />
        ))}
      </div>

      {/* Center SVG Line-Drawing + Staggered Typography */}
      <div className="anime-intro-center relative z-10 text-center px-6 flex flex-col items-center">
        {/* SVG Architectural A-Frame + Sierra Norte Zacatlán Line Art */}
        <svg
          viewBox="0 0 260 130"
          className="w-56 sm:w-64 h-32 mb-4 overflow-visible"
          fill="none"
        >
          {/* Rising Sun / Temazcal Dome */}
          <path
            className="anime-draw-path"
            d="M 75 95 A 55 55 0 0 1 185 95"
            stroke="#D15B2E"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Sierra Norte Mountains */}
          <path
            className="anime-draw-path"
            d="M 15 105 L 70 42 L 115 85 L 165 30 L 245 105"
            stroke="#E9A789"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Iconic A-Frame Cabin Silhouette */}
          <path
            className="anime-draw-path"
            d="M 95 105 L 130 40 L 165 105 Z"
            stroke="#FFFFFF"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          {/* Mist Waves of Barranca de los Jilgueros */}
          <path
            className="anime-draw-path"
            d="M 30 118 Q 80 110 130 118 T 230 118"
            stroke="#6B9985"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        {/* Staggered Letters */}
        <div className="flex items-center justify-center flex-wrap font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-[0.18em] text-white overflow-hidden py-1">
          {brandLetters.map((char, idx) => (
            <span
              key={idx}
              className="anime-intro-letter inline-block opacity-0"
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>

        {/* Subtitle & Location */}
        <div className="anime-intro-sub opacity-0 mt-3 flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#E9A789] text-xs font-mono tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#D15B2E]" />
          <span>Zacatlán de las Manzanas, Puebla · 2,340 MSNM</span>
        </div>

        <p className="anime-intro-sub opacity-0 mt-2 text-xs font-mono text-white/60">
          Cabañas de Autor · Temazcal Volcánico · Rutas en Moto
        </p>

        {/* Skip Intro Button */}
        <button
          onClick={() => {
            setVisible(false);
            if (onComplete) onComplete();
          }}
          className="mt-8 text-[11px] font-mono uppercase tracking-widest text-white/40 hover:text-white transition-colors"
        >
          Saltar Intro [ESC]
        </button>
      </div>
    </div>
  );
}
