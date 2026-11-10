import React, { useState, useEffect, useRef } from 'react';
import anime from 'animejs';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bike,
  ShieldCheck,
  MapPin,
  Check,
  Plus,
  Minus,
  Navigation,
  Video,
  UserCheck
} from 'lucide-react';
import { MOTO_FLEET, TRAIL_ROUTES } from '../data/mockData';

export default function MotoRentalSection({
  onAddMoto,
  bookedCabinName
}) {
  const [rentalMode, setRentalMode] = useState('half'); // 'half' | 'full'
  const [deliverToCabin, setDeliverToCabin] = useState(true);
  const [withGuide, setWithGuide] = useState(false);
  const [withGoPro, setWithGoPro] = useState(false);
  const [quantities, setQuantities] = useState({
    'moto-1': 1,
    'moto-2': 1,
    'moto-3': 1
  });
  const [activeTrailIdx, setActiveTrailIdx] = useState(0);
  const [hoveredCheckpoint, setHoveredCheckpoint] = useState(0);
  const [addedMotoId, setAddedMotoId] = useState(null);

  const trailSvgRef = useRef(null);
  const currentTrail = TRAIL_ROUTES[activeTrailIdx];

  // Anime.js SVG Path Follower + Line Drawing on Zacatlán Trail Change!
  useEffect(() => {
    if (!trailSvgRef.current) return;
    anime.suspendWhenDocumentHidden = false;
    const pathEl = trailSvgRef.current.querySelector('.anime-trail-curve');
    const riderEl = trailSvgRef.current.querySelector('.anime-trail-rider');
    const bars = Array.from(
      trailSvgRef.current.querySelectorAll('.anime-alt-bar')
    );

    if (pathEl && riderEl) {
      anime.remove([pathEl, riderEl, ...bars]);

      try {
        // 1. Draw the SVG topographic path
        anime({
          targets: pathEl,
          strokeDashoffset: [anime.setDashoffset, 0],
          duration: 2000,
          easing: 'easeInOutSine'
        });

        // 2. Move the glowing Moto GPS Beacon along the SVG path using anime.path()
        const motionPath = anime.path(pathEl);
        anime({
          targets: riderEl,
          translateX: motionPath('x'),
          translateY: motionPath('y'),
          rotate: motionPath('angle'),
          duration: 4200,
          loop: true,
          easing: 'easeInOutSine'
        });
      } catch {
        // fallback if SVG path length is not ready
      }
    }

    if (bars.length) {
      anime({
        targets: bars,
        scaleY: [0.35, 1],
        opacity: [0.5, 1],
        duration: 850,
        delay: anime.stagger(65),
        easing: 'easeOutElastic(1, .75)'
      });
    }

    return () => {
      anime.remove([pathEl, riderEl, ...bars]);
    };
  }, [activeTrailIdx]);

  const updateQty = (id, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.min(4, Math.max(1, (prev[id] || 1) + delta))
    }));
  };

  const handleBookMoto = (moto) => {
    const qty = quantities[moto.id] || 1;
    const baseUnit =
      rentalMode === 'half' ? moto.priceHalfDay : moto.priceFullDay;
    const extras = (withGuide ? 650 : 0) + (withGoPro ? 350 : 0);
    const totalPrice = baseUnit * qty + extras;

    onAddMoto({
      ...moto,
      qty,
      rentalMode,
      durationLabel:
        rentalMode === 'half' ? 'Medio Día (4h)' : 'Día Completo (8h)',
      deliverToCabin,
      withGuide,
      withGoPro,
      selectedTrail: currentTrail.name,
      price: totalPrice
    });
    setAddedMotoId(moto.id);
    setTimeout(() => setAddedMotoId(null), 1600);
  };

  // Convert elevation profile array into SVG path coordinates (viewBox 600 x 140)
  const svgPoints = currentTrail.elevationProfile.map((alt, i) => {
    const x = 35 + i * 66;
    const norm = (alt - 1950) / 560; // 0..1
    const y = Math.round(120 - Math.min(1, Math.max(0.1, norm)) * 95);
    return { x, y, alt };
  });

  const svgPathString = svgPoints
    .map((pt, i) => (i === 0 ? `M ${pt.x} ${pt.y}` : `L ${pt.x} ${pt.y}`))
    .join(' ');

  return (
    <section
      id="motos"
      className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      {/* Header + Mode Switchers */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#2E4F42] dark:text-[#97BAAA] mb-2">
            <Bike className="w-4 h-4 text-[#D15B2E]" />
            03 · GARAGE OFF-ROAD HOTEL GUERRERO · ZACATLÁN, PUEBLA
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#1C1B19] dark:text-white tracking-tight">
            Renta de Cuatrimotos 4x4, Enduro y E-Motos
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-2xl">
            {deliverToCabin && bookedCabinName ? (
              <>
                Entrega programada directamente en la puerta de tu{' '}
                <strong className="text-[#D15B2E]">{bookedCabinName}</strong>{' '}
                para rodar hacia Piedras Encimadas y Cascadas de Tulimán.
              </>
            ) : (
              'Te llevamos las motos listas con tanque lleno, cascos Bell y GPS Garmin directamente a tu cabaña en Hotel Guerrero.'
            )}
          </p>
        </div>

        {/* Interactive Controls: Half/Full Day + Cabin Delivery + Guide + GoPro */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Half vs Full Day Switcher */}
          <div className="p-1.5 rounded-2xl bg-white dark:bg-[#151F1B] border border-black/10 dark:border-white/10 flex items-center">
            <button
              onClick={() => setRentalMode('half')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                rentalMode === 'half'
                  ? 'bg-[#1C1B19] dark:bg-[#D15B2E] text-white shadow'
                  : 'text-neutral-600 dark:text-neutral-300'
              }`}
            >
              Medio Día (4h)
            </button>
            <button
              onClick={() => setRentalMode('full')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                rentalMode === 'full'
                  ? 'bg-[#1C1B19] dark:bg-[#D15B2E] text-white shadow'
                  : 'text-neutral-600 dark:text-neutral-300'
              }`}
            >
              Día Completo (8h)
            </button>
          </div>

          {/* Delivery Toggle */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setDeliverToCabin(!deliverToCabin)}
            className={`px-3.5 py-2.5 rounded-2xl text-xs font-semibold border flex items-center gap-1.5 transition-all ${
              deliverToCabin
                ? 'bg-[#2E4F42] text-white border-[#2E4F42] shadow-md'
                : 'bg-white dark:bg-[#151F1B] text-neutral-700 dark:text-neutral-300 border-black/10 dark:border-white/10'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>
              {deliverToCabin ? 'Entrega en Cabaña (Gratis)' : 'En Basecamp'}
            </span>
          </motion.button>

          {/* Guide Toggle */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setWithGuide(!withGuide)}
            className={`px-3.5 py-2.5 rounded-2xl text-xs font-semibold border flex items-center gap-1.5 transition-all ${
              withGuide
                ? 'bg-[#D15B2E] text-white border-[#D15B2E] shadow-md'
                : 'bg-white dark:bg-[#151F1B] text-neutral-700 dark:text-neutral-300 border-black/10 dark:border-white/10'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Guía Zacatlán (+$650)</span>
          </motion.button>

          {/* GoPro 4K Toggle */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setWithGoPro(!withGoPro)}
            className={`px-3.5 py-2.5 rounded-2xl text-xs font-semibold border flex items-center gap-1.5 transition-all ${
              withGoPro
                ? 'bg-[#1C1B19] dark:bg-white text-white dark:text-[#1C1B19] border-transparent shadow-md'
                : 'bg-white dark:bg-[#151F1B] text-neutral-700 dark:text-neutral-300 border-black/10 dark:border-white/10'
            }`}
          >
            <Video className="w-3.5 h-3.5 text-[#D15B2E]" />
            <span>GoPro 4K Casco (+$350)</span>
          </motion.button>
        </div>
      </div>

      {/* Fleet Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
        {MOTO_FLEET.map((moto, idx) => {
          const qty = quantities[moto.id] || 1;
          const unitPrice =
            rentalMode === 'half' ? moto.priceHalfDay : moto.priceFullDay;
          const extras = (withGuide ? 650 : 0) + (withGoPro ? 350 : 0);
          const totalCardPrice = unitPrice * qty + extras;
          const isAdded = addedMotoId === moto.id;

          return (
            <motion.div
              key={moto.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.55 }}
              whileHover={{ y: -6 }}
              className="rounded-3xl bg-white dark:bg-[#151F1B] border border-black/10 dark:border-white/10 overflow-hidden shadow-lg flex flex-col justify-between group"
            >
              <div>
                {/* Vehicle Render */}
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                  <img
                    src={moto.image}
                    alt={moto.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25" />

                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-[#D15B2E] text-white text-[11px] font-semibold shadow">
                      {moto.badge}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md text-white text-[10px] font-mono border border-white/15">
                      {moto.type}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white">
                    <span className="font-mono text-xs text-[#E9A789] font-semibold">
                      {moto.cc}
                    </span>
                    <span className="text-[11px] bg-white/15 backdrop-blur-md px-2.5 py-0.5 rounded-full">
                      {moto.capacity}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6">
                  <h3 className="font-serif text-2xl font-bold text-[#1C1B19] dark:text-white leading-snug">
                    {moto.name}
                  </h3>
                  <span className="inline-block mt-1 text-[11px] font-mono text-[#2E4F42] dark:text-[#97BAAA]">
                    {moto.licenseReq}
                  </span>

                  {/* Interactive Telemetry Bars */}
                  <div className="mt-4 grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-[#F7F4EF] dark:bg-black/30 border border-black/5 dark:border-white/5">
                    <div>
                      <div className="flex justify-between text-[10px] font-mono uppercase text-neutral-500 dark:text-neutral-400">
                        <span>Torque</span>
                        <span>{moto.specs.torque}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-black/10 dark:bg-white/10 rounded-full mt-1 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${moto.specs.torque}%` }}
                          transition={{ duration: 0.9, delay: 0.2 }}
                          className="h-full bg-[#D15B2E] rounded-full"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[10px] font-mono uppercase text-neutral-500 dark:text-neutral-400">
                        <span>Off-Road 4x4</span>
                        <span>{moto.specs.terrain}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-black/10 dark:bg-white/10 rounded-full mt-1 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${moto.specs.terrain}%` }}
                          transition={{ duration: 0.9, delay: 0.3 }}
                          className="h-full bg-[#2E4F42] dark:bg-[#6B9985] rounded-full"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[10px] font-mono uppercase text-neutral-500 dark:text-neutral-400">
                        <span>Confort Dúo</span>
                        <span>{moto.specs.comfort}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-black/10 dark:bg-white/10 rounded-full mt-1 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${moto.specs.comfort}%` }}
                          transition={{ duration: 0.9, delay: 0.4 }}
                          className="h-full bg-[#A68354] rounded-full"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[10px] font-mono uppercase text-neutral-500 dark:text-neutral-400">
                        <span>Sigilo Bosque</span>
                        <span>{moto.specs.stealth}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-black/10 dark:bg-white/10 rounded-full mt-1 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${moto.specs.stealth}%` }}
                          transition={{ duration: 0.9, delay: 0.5 }}
                          className="h-full bg-[#4B7D68] rounded-full"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-xs">
                    <span className="font-semibold text-neutral-600 dark:text-neutral-300">
                      Número de unidades:
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQty(moto.id, -1)}
                        className="w-7 h-7 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center hover:bg-[#D15B2E] hover:text-white"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono font-bold w-6 text-center">
                        {qty}x
                      </span>
                      <button
                        onClick={() => updateQty(moto.id, 1)}
                        className="w-7 h-7 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center hover:bg-[#D15B2E] hover:text-white"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Features list */}
                  <ul className="mt-3 space-y-1.5">
                    {moto.features.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-start gap-2 text-xs text-neutral-600 dark:text-neutral-300"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-[#2E4F42] dark:text-[#6B9985] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Price & Book CTA */}
              <div className="px-6 pb-6 pt-4 border-t border-black/5 dark:border-white/10 flex items-center justify-between">
                <div>
                  <motion.span
                    key={totalCardPrice}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-mono text-xl font-bold text-[#1C1B19] dark:text-white"
                  >
                    ${totalCardPrice.toLocaleString('es-MX')}
                  </motion.span>
                  <span className="block text-[11px] text-neutral-500 dark:text-neutral-400">
                    MXN · {qty} {qty === 1 ? 'unidad' : 'unidades'} (
                    {rentalMode === 'half' ? '4h' : '8h'})
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => handleBookMoto(moto)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    isAdded
                      ? 'bg-[#2E4F42] text-white'
                      : 'bg-[#1C1B19] dark:bg-[#D15B2E] text-white hover:bg-[#D15B2E]'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Moto Lista</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Rentar {qty}x</span>
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Interactive GPS Trail & Elevation Simulator powered by Anime.js Path Follower */}
      <div
        ref={trailSvgRef}
        className="mt-14 rounded-3xl bg-[#151F1B] text-white p-6 sm:p-8 border border-white/10 shadow-2xl"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#E9A789] flex items-center gap-1.5">
              <Navigation className="w-3.5 h-3.5 text-[#D15B2E]" />
              TELEMETRÍA ANIME.JS EN VIVO · RUTAS EN ZACATLÁN, PUEBLA
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold mt-1">
              Simulador de Rutas: Piedras Encimadas, Tulimán y San Pedro
            </h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {TRAIL_ROUTES.map((tr, i) => (
              <button
                key={tr.id}
                onClick={() => {
                  setActiveTrailIdx(i);
                  setHoveredCheckpoint(0);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTrailIdx === i
                    ? 'bg-[#D15B2E] text-white shadow-lg shadow-[#D15B2E]/30'
                    : 'bg-white/10 text-white/70 hover:text-white'
                }`}
              >
                {tr.name.split('·')[0]} · {tr.distance}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left 5 Cols: Route Stats & Checkpoints */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <span className="px-2.5 py-1 rounded-full bg-[#2E4F42] text-[#97BAAA] text-[11px] font-mono">
                {currentTrail.difficulty}
              </span>
              <h4 className="font-serif text-2xl font-bold mt-2">
                {currentTrail.name}
              </h4>
              <p className="text-xs text-white/70 mt-1">
                {currentTrail.terrain}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              <div className="p-3 rounded-2xl bg-black/30 border border-white/10">
                <span className="text-[10px] font-mono text-white/50 block">
                  DISTANCIA
                </span>
                <span className="font-mono text-sm font-bold text-white">
                  {currentTrail.distance}
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-black/30 border border-white/10">
                <span className="text-[10px] font-mono text-white/50 block">
                  TIEMPO EST.
                </span>
                <span className="font-mono text-sm font-bold text-white">
                  {currentTrail.duration}
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-black/30 border border-white/10">
                <span className="text-[10px] font-mono text-white/50 block">
                  CUMBRE MÁX
                </span>
                <span className="font-mono text-sm font-bold text-[#E9A789]">
                  {currentTrail.maxAltitude}
                </span>
              </div>
            </div>

            {/* Interactive Checkpoints */}
            <div className="space-y-2 pt-1">
              {currentTrail.checkpoints.map((cp, idx) => (
                <div
                  key={cp.name}
                  onMouseEnter={() => setHoveredCheckpoint(idx)}
                  onClick={() => setHoveredCheckpoint(idx)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-xs ${
                    hoveredCheckpoint === idx
                      ? 'bg-[#D15B2E]/20 border-[#D15B2E] text-white'
                      : 'bg-black/20 border-white/10 text-white/70 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-[#D15B2E] text-white font-mono text-[10px] font-bold flex items-center justify-center">
                      0{idx + 1}
                    </span>
                    <div>
                      <div className="font-semibold">{cp.name}</div>
                      <div className="text-[10px] font-mono opacity-70">
                        Km {cp.km}
                      </div>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-[#E9A789] font-semibold">
                    {cp.alt}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right 7 Cols: Anime.js SVG Path Follower + Elevation Bars */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-black/35 border border-white/10">
            <div className="flex items-center justify-between text-xs font-mono text-white/60 mb-3">
              <span>TRAZADO GPS EN VIVO (ANIME.JS PATH FOLLOWER)</span>
              <span className="text-[#E9A789]">
                Punto:{' '}
                {currentTrail.checkpoints[hoveredCheckpoint]?.name} (
                {currentTrail.checkpoints[hoveredCheckpoint]?.alt})
              </span>
            </div>

            {/* Anime.js SVG Route Trace + Moving Moto Beacon */}
            <div className="relative h-36 w-full mb-3 bg-black/30 rounded-xl border border-white/5 overflow-hidden p-2">
              <svg
                viewBox="0 0 600 140"
                className="w-full h-full overflow-visible"
              >
                {/* Guide Grid Lines */}
                <line
                  x1="20"
                  y1="30"
                  x2="580"
                  y2="30"
                  stroke="rgba(255,255,255,0.07)"
                  strokeDasharray="4 4"
                />
                <line
                  x1="20"
                  y1="75"
                  x2="580"
                  y2="75"
                  stroke="rgba(255,255,255,0.07)"
                  strokeDasharray="4 4"
                />
                <line
                  x1="20"
                  y1="120"
                  x2="580"
                  y2="120"
                  stroke="rgba(255,255,255,0.07)"
                />

                {/* Animated Topographic Route Curve */}
                <path
                  className="anime-trail-curve"
                  d={svgPathString}
                  fill="none"
                  stroke="#D15B2E"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Waypoint Dots */}
                {svgPoints.map((pt, i) => (
                  <g key={i}>
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={i === hoveredCheckpoint * 2 ? 6 : 3.5}
                      fill={
                        i === hoveredCheckpoint * 2 ? '#F2CBB8' : '#6B9985'
                      }
                    />
                    <text
                      x={pt.x}
                      y={pt.y - 10}
                      textAnchor="middle"
                      fill="rgba(255,255,255,0.65)"
                      fontSize="10"
                      fontFamily="JetBrains Mono"
                    >
                      {pt.alt}m
                    </text>
                  </g>
                ))}

                {/* Glowing Rider Beacon Moving Along Path via anime.path() */}
                <g className="anime-trail-rider" style={{ top: 0, left: 0 }}>
                  <circle
                    cx="0"
                    cy="0"
                    r="9"
                    fill="rgba(209, 91, 46, 0.35)"
                  />
                  <circle cx="0" cy="0" r="4.5" fill="#FFFFFF" />
                </g>
              </svg>
            </div>

            {/* Animated Elevation Bars */}
            <div className="h-32 flex items-end gap-3 pt-4 pb-2 px-2 border-b border-white/15 relative">
              {currentTrail.elevationProfile.map((alt, i) => {
                const heightPct = Math.min(
                  100,
                  Math.max(25, ((alt - 1920) / 580) * 100)
                );
                const isHighlighted = i === hoveredCheckpoint * 2;
                return (
                  <div
                    key={i}
                    className="flex-1 h-full flex flex-col justify-end items-center gap-1.5 group"
                  >
                    <div
                      style={{ height: `${heightPct}%` }}
                      className={`anime-alt-bar origin-bottom w-full rounded-t-xl transition-colors ${
                        isHighlighted
                          ? 'bg-gradient-to-t from-[#D15B2E] to-[#F2CBB8] shadow-[0_0_20px_rgba(209,91,46,0.7)]'
                          : 'bg-gradient-to-t from-[#2E4F42]/60 to-[#6B9985]/90 hover:from-[#D15B2E]/70 hover:to-[#E9A789]'
                      }`}
                    />
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between text-[11px] font-mono text-white/50 mt-3">
              <span>Salida Hotel Guerrero (Km 0.0)</span>
              <span>Mirador / Cascada</span>
              <span>Meta ({currentTrail.distance})</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
