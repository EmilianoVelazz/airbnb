import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Star,
  Mountain,
  Flame,
  Bike,
  Check,
  Sparkles,
  Users,
  BedDouble,
  Bath,
  Plus,
  Minus,
  ShieldCheck,
  Wifi,
  Clock,
  Award,
  MessageSquareQuote,
  Calendar
} from 'lucide-react';

export default function CabinDetailModal({
  cabin,
  searchFilters,
  onClose,
  onConfirmCabinBundle
}) {
  const [activeImg, setActiveImg] = useState(0);
  const [nights, setNights] = useState(searchFilters?.nights || 2);
  const [bundleTemazcal, setBundleTemazcal] = useState(
    cabin?.hasPrivateTemazcal || false
  );
  const [bundleMoto, setBundleMoto] = useState(false);
  const [selectedMotoType, setSelectedMotoType] = useState(
    'Cuatrimoto Grizzly 700 4x4'
  );

  if (!cabin) return null;

  const cabinSubtotal = cabin.pricePerNight * nights;
  const temazcalAddon = bundleTemazcal ? 1850 : 0;
  const motoAddon = bundleMoto ? 1850 : 0;
  const grandTotal = cabinSubtotal + temazcalAddon + motoAddon;

  const handleConfirm = (goDirectToPay = false) => {
    onConfirmCabinBundle({
      cabin,
      nights,
      checkIn: searchFilters?.checkIn || 'Vie 13 Nov',
      checkOut: searchFilters?.checkOut || 'Dom 15 Nov',
      bundleTemazcal,
      bundleMoto,
      selectedMotoType: bundleMoto ? selectedMotoType : null,
      grandTotal,
      goDirectToPay
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-5 overflow-y-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-6xl rounded-3xl bg-[#F7F4EF] dark:bg-[#121B17] text-[#1C1B19] dark:text-white border border-black/10 dark:border-white/15 shadow-2xl overflow-hidden my-auto max-h-[93vh] flex flex-col"
        >
          {/* Sticky Modal Top Header */}
          <div className="px-6 py-4 bg-white/90 dark:bg-[#16221D]/90 backdrop-blur-md border-b border-black/8 dark:border-white/10 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <span className="px-2.5 py-1 rounded-full bg-[#D15B2E]/15 text-[#D15B2E] font-mono text-[11px] font-bold shrink-0">
                {cabin.altitude}
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold truncate">
                {cabin.name}
              </h2>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center hover:bg-[#D15B2E] hover:text-white transition-colors shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div className="overflow-y-auto p-5 sm:p-8 space-y-8">
            {/* Airbnb Signature 5-Render Bento Gallery */}
            <div className="space-y-2.5">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 h-[240px] sm:h-[360px]">
                {/* Main Active Image (7 cols) */}
                <div className="md:col-span-7 relative rounded-2xl overflow-hidden bg-neutral-900 h-full">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={cabin.images[activeImg]}
                      src={cabin.images[activeImg]}
                      alt={cabin.name}
                      initial={{ opacity: 0.4, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0.4 }}
                      transition={{ duration: 0.35 }}
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/65 backdrop-blur-md text-white text-xs font-mono">
                    Render {activeImg + 1} de {cabin.images.length} · {cabin.area}
                  </div>
                </div>

                {/* Right 2x2 Grid (5 cols on desktop/tablet) */}
                <div className="hidden md:grid md:col-span-5 grid-cols-2 grid-rows-2 gap-3 h-full">
                  {cabin.images.slice(1, 5).map((img, idx) => {
                    const realIndex = idx + 1;
                    const isCurrent = activeImg === realIndex;
                    return (
                      <div
                        key={realIndex}
                        onClick={() => setActiveImg(realIndex)}
                        className={`relative rounded-2xl overflow-hidden cursor-pointer border-2 transition-all ${
                          isCurrent
                            ? 'border-[#D15B2E]'
                            : 'border-transparent hover:opacity-90'
                        }`}
                      >
                        <img
                          src={img}
                          alt="Vista secundaria"
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Horizontal Thumbnail Strip */}
              <div className="flex md:hidden items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                {cabin.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImg(idx)}
                    className={`relative w-16 h-12 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      activeImg === idx
                        ? 'border-[#D15B2E] scale-105'
                        : 'border-transparent opacity-65'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Miniatura ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Two-Column Content: Left Architectural Details & Reviews (7 cols) + Right Booking Configurator (5 cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left 7 Cols */}
              <div className="lg:col-span-7 space-y-6">
                {/* Quick Specs Strip */}
                <div className="flex flex-wrap items-center gap-4 pb-5 border-b border-black/10 dark:border-white/10 text-xs">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <Users className="w-4 h-4 text-[#D15B2E]" />
                    Hasta {cabin.guests} huéspedes
                  </span>
                  <span className="flex items-center gap-1.5 font-semibold">
                    <BedDouble className="w-4 h-4 text-[#D15B2E]" />
                    {cabin.bedrooms} habitaciones
                  </span>
                  <span className="flex items-center gap-1.5 font-semibold">
                    <Bath className="w-4 h-4 text-[#D15B2E]" />
                    {cabin.baths} baños
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-[#2E4F42] dark:text-[#97BAAA]">
                    <Wifi className="w-4 h-4" />
                    {cabin.wifiSpeed}
                  </span>
                </div>

                {/* Host & Check-in Card */}
                {cabin.host && (
                  <div className="p-4 rounded-2xl bg-white dark:bg-[#18241F] border border-black/5 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D15B2E] to-[#2E4F42] text-white flex items-center justify-center font-serif text-xl font-bold shrink-0">
                        {cabin.host.name[0]}
                      </div>
                      <div>
                        <div className="text-sm font-bold flex items-center gap-1.5">
                          <span>Anfitrión: {cabin.host.name}</span>
                          <Award className="w-4 h-4 text-[#D15B2E]" />
                        </div>
                        <div className="text-xs text-neutral-500 dark:text-neutral-400">
                          {cabin.host.role}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs font-mono text-[#2E4F42] dark:text-[#97BAAA] bg-[#2E4F42]/10 px-3 py-1.5 rounded-xl">
                      {cabin.host.responseTime}
                    </div>
                  </div>
                )}

                {/* Editorial Description */}
                <div>
                  <h3 className="font-serif text-2xl font-bold mb-2">
                    Sobre la arquitectura de este refugio
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {cabin.description} Diseñado por{' '}
                    <strong>{cabin.architect}</strong> utilizando{' '}
                    <strong>{cabin.specs.woodType}</strong> con orientación{' '}
                    <em>{cabin.specs.orientation}</em> para garantizar una
                    temperatura interior de {cabin.specs.tempInterior}.
                  </p>
                </div>

                {/* Where You'll Sleep ("Dónde vas a dormir") */}
                {cabin.sleepingLayout && (
                  <div className="pt-4 border-t border-black/10 dark:border-white/10">
                    <h4 className="font-serif text-xl font-bold mb-3">
                      Distribución de Habitaciones y Descanso
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {cabin.sleepingLayout.map((sl) => (
                        <div
                          key={sl.room}
                          className="p-4 rounded-2xl bg-white dark:bg-[#18241F] border border-black/5 dark:border-white/10"
                        >
                          <BedDouble className="w-5 h-5 text-[#D15B2E] mb-2" />
                          <div className="text-xs font-bold">{sl.room}</div>
                          <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                            {sl.beds}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Amenities Grid */}
                <div className="pt-4 border-t border-black/10 dark:border-white/10">
                  <h4 className="font-serif text-xl font-bold mb-3">
                    Lo que incluye tu estancia
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {cabin.amenities.map((am) => (
                      <div
                        key={am}
                        className="flex items-center gap-2.5 text-xs font-medium text-neutral-700 dark:text-neutral-200"
                      >
                        <span className="w-5 h-5 rounded-full bg-[#2E4F42]/15 dark:bg-[#2E4F42] text-[#2E4F42] dark:text-[#97BAAA] flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3" />
                        </span>
                        <span>{am}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Verified Guest Reviews */}
                {cabin.reviews && (
                  <div className="pt-4 border-t border-black/10 dark:border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-serif text-xl font-bold flex items-center gap-2">
                        <Star className="w-5 h-5 text-[#D15B2E] fill-[#D15B2E]" />
                        <span>
                          {cabin.rating} · {cabin.reviewsCount} Reseñas Verificadas
                        </span>
                      </h4>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {cabin.reviews.map((rev, i) => (
                        <div
                          key={i}
                          className="p-4 rounded-2xl bg-white dark:bg-[#18241F] border border-black/5 dark:border-white/10 space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold">
                              {rev.author}
                            </span>
                            <span className="text-[10px] font-mono text-neutral-400">
                              {rev.date}
                            </span>
                          </div>
                          <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#D15B2E]/15 text-[#D15B2E]">
                            {rev.tripType}
                          </span>
                          <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                            "{rev.text}"
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right 5 Cols: Interactive Reservation & Combo Customizer */}
              <div className="lg:col-span-5 sticky top-4 rounded-3xl bg-white dark:bg-[#192520] border border-black/10 dark:border-white/10 p-6 shadow-xl space-y-5">
                {/* Price Header */}
                <div className="flex items-baseline justify-between pb-4 border-b border-black/10 dark:border-white/10">
                  <div>
                    <span className="font-mono text-2xl font-bold">
                      ${cabin.pricePerNight.toLocaleString('es-MX')}
                    </span>
                    <span className="text-xs text-neutral-500 ml-1">
                      MXN / noche
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#2E4F42] dark:text-[#97BAAA] font-semibold">
                    Cancelación flexible
                  </span>
                </div>

                {/* Dates & Nights Box */}
                <div className="p-3.5 rounded-2xl bg-[#F7F4EF] dark:bg-black/25 border border-black/5 dark:border-white/10 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-neutral-500 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-[#D15B2E]" />
                      FECHAS SELECCIONADAS
                    </span>
                    <span className="font-bold">
                      {searchFilters?.checkIn || 'Vie 13 Nov'} →{' '}
                      {searchFilters?.checkOut || 'Dom 15 Nov'}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-black/5 dark:border-white/10 flex items-center justify-between">
                    <span className="text-xs font-semibold">
                      Ajustar noches de estancia:
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setNights(Math.max(1, nights - 1))}
                        className="w-7 h-7 rounded-full bg-white dark:bg-white/10 shadow flex items-center justify-center hover:bg-[#D15B2E] hover:text-white transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-mono text-sm font-bold w-6 text-center">
                        {nights}
                      </span>
                      <button
                        onClick={() => setNights(Math.min(14, nights + 1))}
                        className="w-7 h-7 rounded-full bg-white dark:bg-white/10 shadow flex items-center justify-center hover:bg-[#D15B2E] hover:text-white transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Interactive Add-On Experiences (Temazcal + Moto) */}
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-2">
                    Suma Experiencias a tu Cabaña:
                  </span>

                  <div className="space-y-2.5">
                    {/* Temazcal Add-on */}
                    <div
                      onClick={() => setBundleTemazcal(!bundleTemazcal)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                        bundleTemazcal
                          ? 'bg-[#D15B2E]/10 border-[#D15B2E]'
                          : 'bg-transparent border-black/10 dark:border-white/10 hover:border-[#D15B2E]/50'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <div
                          className={`w-5 h-5 rounded-md mt-0.5 flex items-center justify-center ${
                            bundleTemazcal
                              ? 'bg-[#D15B2E] text-white'
                              : 'border border-neutral-400'
                          }`}
                        >
                          {bundleTemazcal && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <div className="text-xs font-bold flex items-center gap-1.5">
                            <Flame className="w-3.5 h-3.5 text-[#D15B2E]" />
                            Ceremonia de Temazcal Privado (Día 1 · 18:00)
                          </div>
                          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                            28 piedras volcánicas, guía temazcalero, copal e infusiones.
                          </p>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-bold shrink-0">
                        +$1,850
                      </span>
                    </div>

                    {/* Moto Delivery Add-on */}
                    <div
                      onClick={() => setBundleMoto(!bundleMoto)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                        bundleMoto
                          ? 'bg-[#2E4F42]/15 border-[#2E4F42] dark:border-[#6B9985]'
                          : 'bg-transparent border-black/10 dark:border-white/10 hover:border-[#2E4F42]/50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-2.5">
                          <div
                            className={`w-5 h-5 rounded-md mt-0.5 flex items-center justify-center ${
                              bundleMoto
                                ? 'bg-[#2E4F42] text-white'
                                : 'border border-neutral-400'
                            }`}
                          >
                            {bundleMoto && <Check className="w-3.5 h-3.5" />}
                          </div>
                          <div>
                            <div className="text-xs font-bold flex items-center gap-1.5">
                              <Bike className="w-3.5 h-3.5 text-[#2E4F42] dark:text-[#97BAAA]" />
                              Moto Entregada en la Puerta (Día 2 · 09:00)
                            </div>
                            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                              4 horas de ruta con cascos Bell y GPS Garmin incluido.
                            </p>
                          </div>
                        </div>
                        <span className="font-mono text-xs font-bold shrink-0">
                          +$1,850
                        </span>
                      </div>

                      {bundleMoto && (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="mt-3 pt-2.5 border-t border-black/10 dark:border-white/10"
                        >
                          <label className="text-[10px] font-mono uppercase text-neutral-500 block mb-1">
                            Elige vehículo para recibir en tu cabaña:
                          </label>
                          <select
                            value={selectedMotoType}
                            onChange={(e) => setSelectedMotoType(e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded-xl bg-white dark:bg-[#121B17] border border-black/10 dark:border-white/15 text-xs font-semibold"
                          >
                            <option value="Cuatrimoto Grizzly 700 4x4">
                              Cuatrimoto Yamaha Grizzly 700 4x4 (2 pax)
                            </option>
                            <option value="Scrambler Enduro 450cc">
                              Scrambler Enduro 450cc Sierra Edition
                            </option>
                            <option value="Sur-Ron E-Moto Silenciosa">
                              Sur-Ron Ultra Bee · E-Moto 100% Eléctrica
                            </option>
                          </select>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Live Price Breakdown */}
                <div className="p-4 rounded-2xl bg-[#F7F4EF] dark:bg-black/30 space-y-2 text-xs">
                  <div className="flex justify-between text-neutral-600 dark:text-neutral-300">
                    <span>
                      ${cabin.pricePerNight.toLocaleString('es-MX')} x {nights}{' '}
                      {nights === 1 ? 'noche' : 'noches'}
                    </span>
                    <span className="font-mono">
                      ${cabinSubtotal.toLocaleString('es-MX')}
                    </span>
                  </div>
                  {bundleTemazcal && (
                    <div className="flex justify-between text-[#D15B2E] font-medium">
                      <span>+ Ceremonia Temazcal Privado</span>
                      <span className="font-mono">$1,850</span>
                    </div>
                  )}
                  {bundleMoto && (
                    <div className="flex justify-between text-[#2E4F42] dark:text-[#97BAAA] font-medium">
                      <span>+ {selectedMotoType}</span>
                      <span className="font-mono">$1,850</span>
                    </div>
                  )}
                  <div className="flex justify-between text-neutral-500">
                    <span>Leña ilimitada, limpieza y acceso al parque</span>
                    <span className="font-mono text-[#2E4F42] dark:text-[#97BAAA]">
                      INCLUIDO
                    </span>
                  </div>
                  <div className="pt-2.5 border-t border-black/10 dark:border-white/10 flex justify-between items-baseline text-sm font-bold">
                    <span>Total de tu Estancia</span>
                    <motion.span
                      key={grandTotal}
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      className="font-mono text-lg text-[#D15B2E]"
                    >
                      ${grandTotal.toLocaleString('es-MX')} MXN
                    </motion.span>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleConfirm(true)}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#D15B2E] to-[#B84620] text-white font-semibold text-sm shadow-lg shadow-[#D15B2E]/30 flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Reservar e Ir Directo a Registro y Pago</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleConfirm(false)}
                    className="w-full py-3 rounded-2xl bg-black/5 dark:bg-white/10 text-[#1C1B19] dark:text-white font-semibold text-xs hover:bg-black/10 dark:hover:bg-white/15 transition-colors"
                  >
                    Guardar en Mi Expedición y Seguir Explorando
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
