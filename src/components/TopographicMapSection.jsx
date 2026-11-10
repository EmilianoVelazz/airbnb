import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  MapPin,
  Flame,
  Bike,
  Star,
  Mountain,
  ArrowUpRight,
  Layers
} from 'lucide-react';
import { CABINS } from '../data/mockData';

export default function TopographicMapSection({ onSelectCabin }) {
  const [selectedPinId, setSelectedPinId] = useState(CABINS[0].id);
  const [showTrailsLayer, setShowTrailsLayer] = useState(true);

  const activeCabin =
    CABINS.find((c) => c.id === selectedPinId) || CABINS[0];

  return (
    <section
      id="mapa-topografico"
      className="py-20 bg-[#EFECE6] dark:bg-[#111915] border-y border-black/5 dark:border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#D15B2E] flex items-center gap-1.5 mb-2">
              <Compass className="w-4 h-4" />
              04 · MAPA INTERACTIVO HOTEL GUERRERO · ZACATLÁN, PUEBLA
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#1C1B19] dark:text-white">
              Explora nuestras cabañas y puntos de Zacatlán de las Manzanas
            </h2>
          </div>

          <button
            onClick={() => setShowTrailsLayer(!showTrailsLayer)}
            className={`px-4 py-2.5 rounded-full text-xs font-mono font-semibold border flex items-center gap-2 transition-all self-start ${
              showTrailsLayer
                ? 'bg-[#2E4F42] text-white border-[#2E4F42]'
                : 'bg-white dark:bg-[#151F1B] text-neutral-700 dark:text-neutral-300 border-black/10'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            {showTrailsLayer
              ? 'Senderos de Moto & Temazcal: VISIBLES'
              : 'Mostrar Senderos de Moto'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Interactive SVG Topographic Map Canvas */}
          <div className="lg:col-span-8 relative rounded-3xl bg-[#16231D] border border-white/15 overflow-hidden min-h-[360px] sm:min-h-[460px] shadow-2xl select-none">
            {/* Topographic Contour Lines SVG */}
            <svg
              viewBox="0 0 800 500"
              className="absolute inset-0 w-full h-full object-cover opacity-35 pointer-events-none"
              fill="none"
            >
              <path
                d="M-50 120 C 140 80, 320 220, 520 140 C 660 80, 750 190, 860 150"
                stroke="#6B9985"
                strokeWidth="1.2"
                strokeDasharray="6 6"
              />
              <path
                d="M-40 240 C 180 160, 360 340, 580 220 C 700 150, 770 280, 850 260"
                stroke="#6B9985"
                strokeWidth="1.2"
              />
              <path
                d="M-20 370 C 200 290, 410 430, 620 330 C 720 280, 780 390, 850 370"
                stroke="#6B9985"
                strokeWidth="1.2"
              />
              <ellipse
                cx="280"
                cy="190"
                rx="160"
                ry="95"
                stroke="#97BAAA"
                strokeWidth="1"
              />
              <ellipse
                cx="280"
                cy="190"
                rx="95"
                ry="55"
                stroke="#97BAAA"
                strokeWidth="1"
              />
              <ellipse
                cx="560"
                cy="320"
                rx="190"
                ry="110"
                stroke="#97BAAA"
                strokeWidth="1"
              />

              {/* Animated Off-Road Moto Trail Path */}
              {showTrailsLayer && (
                <motion.path
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.9 }}
                  transition={{ duration: 1.8, ease: 'easeInOut' }}
                  d="M 190 330 Q 270 190 410 270 T 610 240"
                  stroke="#D15B2E"
                  strokeWidth="3.5"
                  strokeDasharray="8 6"
                  fill="none"
                />
              )}
            </svg>

            {/* Map Legend Top-Left */}
            <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-mono border border-white/15">
                ZACATLÁN DE LAS MANZANAS, PUEBLA (2,120m – 2,460m)
              </span>
              {showTrailsLayer && (
                <span className="px-3 py-1 rounded-full bg-[#D15B2E]/90 text-white text-[11px] font-mono flex items-center gap-1.5">
                  <Bike className="w-3 h-3" />
                  Ruta Piedras Encimadas & Tulimán
                </span>
              )}
            </div>

            {/* Central Temazcal Sanctuary Landmark */}
            {showTrailsLayer && (
              <div
                style={{ left: '48%', top: '46%' }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
              >
                <div className="px-2.5 py-1 rounded-full bg-[#D15B2E]/30 border border-[#D15B2E] text-[#F2CBB8] text-[10px] font-mono flex items-center gap-1 backdrop-blur-md">
                  <Flame className="w-3 h-3 text-[#D15B2E]" />
                  Temazcal Central Hotel Guerrero
                </div>
              </div>
            )}

            {/* Interactive Airbnb-Style Price Pins for all 6 Cabins */}
            {CABINS.map((cabin) => {
              const isSelected = cabin.id === selectedPinId;
              return (
                <motion.button
                  key={cabin.id}
                  style={{
                    left: `${cabin.mapCoords.x}%`,
                    top: `${cabin.mapCoords.y}%`
                  }}
                  whileHover={{ scale: 1.12, zIndex: 30 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => setSelectedPinId(cabin.id)}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full font-mono text-[10px] sm:text-xs font-bold shadow-xl transition-all flex items-center gap-1 sm:gap-1.5 ${
                    isSelected
                      ? 'bg-[#D15B2E] text-white scale-110 z-30 ring-4 ring-[#D15B2E]/35'
                      : 'bg-white text-[#1C1B19] hover:bg-[#1C1B19] hover:text-white z-20'
                  }`}
                >
                  <span>${cabin.pricePerNight.toLocaleString('es-MX')}</span>
                  {cabin.hasPrivateTemazcal && (
                    <Flame className="w-3 h-3 text-amber-300" />
                  )}
                </motion.button>
              );
            })}

            {/* Bottom Map Coordinates Bar */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-white/60 pointer-events-none">
              <span>LAT 19.9333° N · LON 97.9667° W · ZACATLÁN, PUEBLA</span>
              <span>Haz clic en cualquier cabaña de Hotel Guerrero</span>
            </div>
          </div>

          {/* Right 4 Cols: Selected Map Pin Preview Card */}
          <div className="lg:col-span-4 flex flex-col justify-between rounded-3xl bg-white dark:bg-[#151F1B] border border-black/10 dark:border-white/10 p-6 shadow-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCabin.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35 }}
              >
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4">
                  <img
                    src={activeCabin.images[0]}
                    alt={activeCabin.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md text-white text-[10px] font-mono">
                    {activeCabin.altitude}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                  <span>{activeCabin.zone}</span>
                  <span className="flex items-center gap-1 text-[#1C1B19] dark:text-white font-bold">
                    <Star className="w-3.5 h-3.5 text-[#D15B2E] fill-[#D15B2E]" />
                    {activeCabin.rating}
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-[#1C1B19] dark:text-white mt-1">
                  {activeCabin.name}
                </h3>

                <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-2 leading-relaxed">
                  {activeCabin.description}
                </p>

                <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/10 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Arquitectura:</span>
                    <span className="font-semibold text-[#1C1B19] dark:text-white">
                      {activeCabin.architect}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Superficie:</span>
                    <span className="font-mono text-[#1C1B19] dark:text-white">
                      {activeCabin.area}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Materialidad:</span>
                    <span className="text-[#D15B2E] font-medium">
                      {activeCabin.specs.woodType}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
              <div>
                <span className="font-mono text-xl font-bold text-[#1C1B19] dark:text-white">
                  ${activeCabin.pricePerNight.toLocaleString('es-MX')}
                </span>
                <span className="text-xs text-neutral-500 block">
                  MXN / noche
                </span>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelectCabin(activeCabin)}
                className="px-4 py-2.5 rounded-xl bg-[#D15B2E] text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-[#D15B2E]/25"
              >
                <span>Inspeccionar Cabaña</span>
                <ArrowUpRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
