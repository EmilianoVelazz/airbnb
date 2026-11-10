import React, { useState, useEffect, useRef } from 'react';
import anime from 'animejs';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flame,
  Thermometer,
  Sparkles,
  Clock,
  Check,
  Plus,
  Star,
  Volume2,
  Leaf,
  Users,
  Minus
} from 'lucide-react';
import {
  TEMAZCAL_DOORS,
  TEMAZCAL_PACKAGES,
  TEMAZCAL_INTENTIONS
} from '../data/mockData';

export default function TemazcalSection({
  onAddTemazcal,
  defaultGuests = 2
}) {
  const [activeDoorIdx, setActiveDoorIdx] = useState(1);
  const [selectedIntention, setSelectedIntention] = useState(
    TEMAZCAL_INTENTIONS[0]
  );
  const [selectedSchedules, setSelectedSchedules] = useState({
    'tem-1': '05:30 PM · Atardecer',
    'tem-2': '06:00 PM · Crepúsculo',
    'tem-3': '04:30 PM · Tarde'
  });
  const [selectedDays, setSelectedDays] = useState({
    'tem-1': 'Día 1 (Llegada)',
    'tem-2': 'Día 2 (Intermedio)',
    'tem-3': 'Día 2 (Intermedio)'
  });
  const [paxCount, setPaxCount] = useState(defaultGuests);
  const [addedId, setAddedId] = useState(null);

  const currentDoor = TEMAZCAL_DOORS[activeDoorIdx];
  const tempDisplayRef = useRef(null);
  const mandalaRef = useRef(null);
  const prevTempRef = useRef(currentDoor.temp);

  // Anime.js Thermal Counter + Sacred Geometry Mandala Rotation + Shockwave Pulse
  useEffect(() => {
    // 1. Animate number counter from previous temperature to new door temperature
    const counterObj = { temp: prevTempRef.current };
    anime({
      targets: counterObj,
      temp: currentDoor.temp,
      round: 1,
      duration: 900,
      easing: 'easeOutExpo',
      update: () => {
        if (tempDisplayRef.current) {
          tempDisplayRef.current.textContent = `${counterObj.temp}°C`;
        }
      }
    });
    prevTempRef.current = currentDoor.temp;

    // 2. Rotate Sacred Geometry SVG Mandala & pulse shockwave rings
    if (mandalaRef.current) {
      anime({
        targets: mandalaRef.current.querySelector('.anime-mandala-wheel'),
        rotate: activeDoorIdx * 90,
        scale: [0.85, 1],
        duration: 1100,
        easing: 'easeOutElastic(1, .65)'
      });

      anime({
        targets: mandalaRef.current.querySelectorAll('.anime-heat-wave'),
        scale: [0.8, 1.65],
        opacity: [0.85, 0],
        duration: 1600,
        delay: anime.stagger(240),
        easing: 'easeOutQuad'
      });
    }
  }, [activeDoorIdx, currentDoor.temp]);

  const handleBookPackage = (pkg) => {
    const chosenSlot = selectedSchedules[pkg.id] || pkg.schedule[0];
    const chosenDay = selectedDays[pkg.id] || 'Día 1 (Llegada)';
    const finalPrice = pkg.perPerson ? pkg.price * paxCount : pkg.price;

    onAddTemazcal({
      ...pkg,
      chosenSlot,
      chosenDay,
      intention: selectedIntention.label,
      pax: pkg.perPerson ? paxCount : pkg.id === 'tem-1' ? 2 : 6,
      price: finalPrice
    });
    setAddedId(pkg.id);
    setTimeout(() => setAddedId(null), 1600);
  };

  return (
    <section
      id="temazcal"
      className="relative py-24 bg-[#0D1310] text-white overflow-hidden"
    >
      {/* Ambient Volcanic Ember Glow Background */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-[#D15B2E]/20 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[28rem] h-[28rem] rounded-full bg-[#2E4F42]/25 blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D15B2E]/20 border border-[#D15B2E]/40 text-[#F2CBB8] text-xs font-mono uppercase tracking-widest mb-4">
              <Flame className="w-3.5 h-3.5 text-[#D15B2E]" />
              02 · TEMAZCAL HOTEL GUERRERO · SIERRA NORTE DE PUEBLA
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl font-semibold leading-[1.06] tracking-tight">
              El Ritual del Temazcal: 28 piedras volcánicas, manzana y copal.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-white/75 leading-relaxed">
              Personaliza la infusión herbal de tu ceremonia en Zacatlán (recuperación tras la ruta a Piedras Encimadas, infusión de manzana con canela o purificación en 4 puertas).
            </p>
          </motion.div>

          {/* Herbal Intention Selector */}
          <div className="w-full lg:w-96 p-4 rounded-2xl bg-[#151F1B] border border-white/15">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#E9A789] block mb-2">
              1. Elige la Intención Herbal de tu Vapor:
            </span>
            <div className="space-y-1.5">
              {TEMAZCAL_INTENTIONS.map((intent) => {
                const active = selectedIntention.id === intent.id;
                return (
                  <button
                    key={intent.id}
                    onClick={() => setSelectedIntention(intent)}
                    className={`w-full p-2.5 rounded-xl text-left text-xs transition-all flex items-center justify-between ${
                      active
                        ? 'bg-[#D15B2E] text-white font-semibold shadow'
                        : 'bg-black/30 text-white/70 hover:text-white'
                    }`}
                  >
                    <span className="truncate">{intent.label}</span>
                    <span className="font-mono text-[10px] opacity-85 shrink-0 ml-2">
                      {intent.recommendedTemp.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Interactive 4-Doors Simulator + Architectural Render */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left 7 Cols: Visual Render + Anime.js Sacred Geometry Xictli Stone Core */}
          <div
            ref={mandalaRef}
            className="lg:col-span-7 relative rounded-3xl overflow-hidden border border-white/15 min-h-[440px] flex flex-col justify-between p-6 sm:p-8 group"
          >
            <img
              src="/renders/temazcal-ritual.jpg"
              alt="Santuario Temazcal Volcánico Hotel Guerrero"
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090D0B] via-[#090D0B]/55 to-black/30" />

            {/* Top Live Thermal Telemetry */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs font-mono">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D15B2E] animate-ping" />
                <span>XICTLI ACTIVO · {currentDoor.stoneCount}</span>
              </div>

              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D15B2E] text-white font-mono text-sm font-bold shadow-lg shadow-[#D15B2E]/50">
                <Thermometer className="w-4 h-4" />
                <span>{currentDoor.temp}°C Vapor Herbal</span>
              </div>
            </div>

            {/* Interactive Anime.js Sacred Geometry & Volcanic Stone Circle Visualizer */}
            <div className="relative z-10 my-auto py-8 flex flex-col items-center justify-center">
              {/* Expanding Anime.js Thermal Shockwave Rings */}
              <span className="anime-heat-wave absolute w-36 h-36 rounded-full border-2 border-[#D15B2E] pointer-events-none opacity-0" />
              <span className="anime-heat-wave absolute w-36 h-36 rounded-full border border-[#E9A789] pointer-events-none opacity-0" />

              {/* Rotating Sacred Geometry SVG Wheel */}
              <svg
                viewBox="0 0 200 200"
                className="anime-mandala-wheel absolute w-52 h-52 pointer-events-none opacity-75"
              >
                <circle
                  cx="100"
                  cy="100"
                  r="88"
                  stroke="#E9A789"
                  strokeWidth="1"
                  strokeDasharray="6 6"
                  fill="none"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="74"
                  stroke="#D15B2E"
                  strokeWidth="1.5"
                  strokeDasharray="14 8"
                  fill="none"
                />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                  <line
                    key={deg}
                    x1="100"
                    y1="8"
                    x2="100"
                    y2="24"
                    stroke="#F2CBB8"
                    strokeWidth="2"
                    transform={`rotate(${deg} 100 100)`}
                  />
                ))}
              </svg>

              <div
                onClick={() =>
                  setActiveDoorIdx((prev) => (prev + 1) % TEMAZCAL_DOORS.length)
                }
                title="Haz clic para avanzar a la siguiente Puerta del Temazcal"
                className="relative w-32 h-32 rounded-full bg-gradient-to-br from-[#F2CBB8] via-[#D15B2E] to-[#66291A] border-2 border-white/50 flex flex-col items-center justify-center text-center p-3 cursor-pointer shadow-[0_0_55px_rgba(209,91,46,0.75)] hover:scale-105 transition-transform"
              >
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/85">
                  PUERTA 0{currentDoor.door}
                </span>
                <span
                  ref={tempDisplayRef}
                  className="font-serif text-3xl font-bold text-white"
                >
                  {currentDoor.temp}°C
                </span>
                <span className="text-[10px] font-mono text-white/90 mt-0.5">
                  Click → Siguiente
                </span>
              </div>
            </div>

            {/* Bottom Door Selector Tabs inside Render */}
            <div className="relative z-10">
              <div className="text-[11px] font-mono uppercase tracking-wider text-white/60 mb-2">
                Explora cada una de las 4 Puertas del Temazcal (Animación Anime.js):
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {TEMAZCAL_DOORS.map((d, idx) => {
                  const active = idx === activeDoorIdx;
                  return (
                    <button
                      key={d.door}
                      onClick={() => setActiveDoorIdx(idx)}
                      className={`p-3 rounded-2xl text-left border transition-all ${
                        active
                          ? 'bg-[#D15B2E] border-white/40 text-white shadow-lg -translate-y-0.5'
                          : 'bg-black/55 backdrop-blur-md border-white/15 text-white/75 hover:bg-white/10'
                      }`}
                    >
                      <div className="font-mono text-[10px] uppercase opacity-80">
                        Puerta 0{d.door} · {d.duration}
                      </div>
                      <div className="font-serif text-sm font-bold truncate mt-0.5">
                        {d.name.split('·')[1]}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right 5 Cols: Active Door Details Card */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl bg-[#151F1B] border border-white/10 p-6 sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentDoor.door}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.4 }}
                className="space-y-5"
              >
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#D15B2E]/20 text-[#E9A789] text-xs font-mono">
                    {currentDoor.element}
                  </span>
                  <span className="text-xs font-mono text-white/60 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#D15B2E]" />
                    Duración: {currentDoor.duration}
                  </span>
                </div>

                <h3 className="font-serif text-3xl font-bold text-white leading-tight">
                  {currentDoor.name}
                </h3>

                <p className="text-sm text-white/75 leading-relaxed">
                  {currentDoor.description}
                </p>

                {/* Herbal & Sound Specs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-black/30 border border-white/10">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#97BAAA] uppercase">
                      <Leaf className="w-3.5 h-3.5" />
                      Herbolaria Seleccionada
                    </div>
                    <div className="text-xs font-semibold text-white mt-1">
                      {selectedIntention.herbs}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-black/30 border border-white/10">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#E9A789] uppercase">
                      <Volume2 className="w-3.5 h-3.5" />
                      Sonoterapia
                    </div>
                    <div className="text-xs font-semibold text-white mt-1">
                      {currentDoor.frequency}
                    </div>
                  </div>
                </div>

                {/* Benefits list */}
                <div className="pt-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-white/50 mb-2.5">
                    Beneficios Fisiológicos en esta Puerta:
                  </div>
                  <div className="space-y-2">
                    {currentDoor.benefits.map((b) => (
                      <div
                        key={b}
                        className="flex items-center gap-2.5 text-xs text-white/85"
                      >
                        <span className="w-5 h-5 rounded-full bg-[#2E4F42] text-[#97BAAA] flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3" />
                        </span>
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
              <span>Intención activa: {selectedIntention.label}</span>
              <span className="font-mono text-[#E9A789]">4 Puertas = 90m</span>
            </div>
          </div>
        </div>

        {/* Bookable Temazcal Packages Grid */}
        <div className="mt-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-white">
                2. Elige Día, Horario y Modalidad en Hotel Guerrero
              </h3>
              <p className="text-xs text-white/60 mt-0.5">
                Se programa directamente en el itinerario de tu estancia en Zacatlán
              </p>
            </div>

            {/* Pax Counter for Per-Person Ceremonies */}
            <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-[#151F1B] border border-white/15 self-start">
              <Users className="w-4 h-4 text-[#D15B2E]" />
              <span className="text-xs">Participantes:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPaxCount(Math.max(1, paxCount - 1))}
                  className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D15B2E]"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="font-mono text-xs font-bold w-4 text-center">
                  {paxCount}
                </span>
                <button
                  onClick={() => setPaxCount(Math.min(6, paxCount + 1))}
                  className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D15B2E]"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TEMAZCAL_PACKAGES.map((pkg, i) => {
              const isAdded = addedId === pkg.id;
              const currentSlot = selectedSchedules[pkg.id] || pkg.schedule[0];
              const currentDay = selectedDays[pkg.id] || 'Día 1 (Llegada)';
              const computedPrice = pkg.perPerson
                ? pkg.price * paxCount
                : pkg.price;

              return (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                  className="rounded-3xl bg-[#151F1B] border border-white/12 p-6 flex flex-col justify-between hover:border-[#D15B2E]/60 transition-all shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full bg-[#D15B2E]/20 text-[#F2CBB8] text-[11px] font-semibold">
                        {pkg.badge}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-mono text-white/80">
                        <Star className="w-3.5 h-3.5 text-[#D15B2E] fill-[#D15B2E]" />
                        {pkg.rating} · {pkg.duration}
                      </span>
                    </div>

                    <h4 className="font-serif text-2xl font-bold text-white">
                      {pkg.title}
                    </h4>
                    <p className="text-xs text-white/65 mt-1 leading-relaxed">
                      {pkg.subtitle}
                    </p>

                    {/* Day of Stay Selector */}
                    <div className="mt-4">
                      <span className="block text-[10px] font-mono uppercase tracking-wider text-white/50 mb-1.5">
                        Día de tu estancia:
                      </span>
                      <div className="grid grid-cols-3 gap-1.5">
                        {[
                          'Día 1 (Llegada)',
                          'Día 2 (Intermedio)',
                          'Día 3 (Cierre)'
                        ].map((d) => (
                          <button
                            key={d}
                            onClick={() =>
                              setSelectedDays((prev) => ({
                                ...prev,
                                [pkg.id]: d
                              }))
                            }
                            className={`px-2 py-1.5 rounded-lg text-[10px] font-mono transition-all ${
                              currentDay === d
                                ? 'bg-[#2E4F42] text-white font-semibold border border-[#6B9985]'
                                : 'bg-black/40 text-white/60 hover:text-white border border-white/10'
                            }`}
                          >
                            {d.split(' ')[0]} {d.split(' ')[1]}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Schedule Selector Pills */}
                    <div className="mt-3">
                      <span className="block text-[10px] font-mono uppercase tracking-wider text-white/50 mb-1.5">
                        Horario de encendido:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {pkg.schedule.map((slot) => (
                          <button
                            key={slot}
                            onClick={() =>
                              setSelectedSchedules((prev) => ({
                                ...prev,
                                [pkg.id]: slot
                              }))
                            }
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all ${
                              currentSlot === slot
                                ? 'bg-[#D15B2E] text-white font-semibold'
                                : 'bg-black/40 text-white/65 hover:text-white border border-white/10'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Includes */}
                    <ul className="mt-4 space-y-2 border-t border-white/10 pt-3.5">
                      {pkg.includes.map((inc) => (
                        <li
                          key={inc}
                          className="flex items-start gap-2 text-xs text-white/80"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-[#D15B2E] shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price & Add Button */}
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="font-mono text-xl font-bold text-white">
                        ${computedPrice.toLocaleString('es-MX')}
                      </span>
                      <span className="block text-[11px] text-white/55">
                        MXN ·{' '}
                        {pkg.perPerson
                          ? `${paxCount} ${
                              paxCount === 1 ? 'persona' : 'personas'
                            }`
                          : pkg.unitLabel}
                      </span>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.94 }}
                      onClick={() => handleBookPackage(pkg)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                        isAdded
                          ? 'bg-[#2E4F42] text-white'
                          : 'bg-[#D15B2E] hover:bg-[#B84620] text-white shadow-lg shadow-[#D15B2E]/25'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Programado</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Programar Ritual</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
