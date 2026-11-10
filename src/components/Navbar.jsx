import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flame,
  Trees,
  Compass,
  Bike,
  Heart,
  Moon,
  ShoppingBag,
  User,
  Ticket
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'cabanas', label: 'Cabañas', fullLabel: 'Cabañas de Autor', icon: Trees, href: '#cabanas' },
  { id: 'temazcal', label: 'Temazcal', fullLabel: 'Ritual Temazcal', icon: Flame, href: '#temazcal' },
  { id: 'motos', label: 'Motos', fullLabel: 'Renta de Motos', icon: Bike, href: '#motos' },
  { id: 'mapa', label: 'Mapa', fullLabel: 'Mapa de Altura', icon: Compass, href: '#mapa-topografico' }
];

export default function Navbar({
  activeSection,
  setActiveSection,
  darkMode,
  setDarkMode,
  wishlistCount,
  onOpenWishlist,
  itineraryCount,
  itineraryTotal,
  onOpenItinerary,
  currentUser,
  onOpenAuth,
  confirmedCount,
  onOpenMyTrips
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 36);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id, href) => {
    setActiveSection(id);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-2 sm:py-2.5 bg-[#F7F4EF]/90 dark:bg-[#0E1512]/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.06)] border-b border-black/5 dark:border-white/10'
            : 'py-3 sm:py-4 bg-gradient-to-b from-black/65 via-black/30 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-3">
          {/* Brand Logo */}
          <a
            href="#top"
            onClick={() => setActiveSection('cabanas')}
            className="flex items-center gap-2 sm:gap-3 group focus:outline-none shrink-0"
          >
            <motion.div
              whileHover={{ rotate: 12, scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#D15B2E] to-[#98371C] flex items-center justify-center text-white shadow-lg shadow-[#D15B2E]/30 shrink-0"
            >
              <Trees className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span
                  className={`font-serif text-base sm:text-xl md:text-2xl font-bold tracking-wider transition-colors ${
                    scrolled ? 'text-[#1C1B19] dark:text-[#F7F4EF]' : 'text-white'
                  }`}
                >
                  HOTEL GUERRERO
                </span>
                <span className="hidden md:inline-block text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#D15B2E]/20 text-[#D15B2E] border border-[#D15B2E]/30 font-semibold">
                  Zacatlán, Pue.
                </span>
              </div>
              <p
                className={`text-[10px] sm:text-[11px] tracking-wide transition-colors hidden sm:block ${
                  scrolled ? 'text-neutral-500 dark:text-neutral-400' : 'text-white/75'
                }`}
              >
                Cabañas · Temazcal · Motos en Zacatlán
              </p>
            </div>
          </a>

          {/* Desktop Center Switcher Pill */}
          <nav className="hidden lg:flex items-center p-1.5 rounded-full bg-white/90 dark:bg-[#17221D]/90 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-sm">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id, item.href)}
                  className={`relative px-3.5 py-2 rounded-full text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? 'text-white'
                      : 'text-neutral-700 dark:text-neutral-300 hover:text-[#D15B2E]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className="absolute inset-0 rounded-full bg-[#1C1B19] dark:bg-[#D15B2E]"
                    />
                  )}
                  <Icon className="w-3.5 h-3.5 relative z-10" />
                  <span className="relative z-10">{item.fullLabel}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Micro-Interaction Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Modo Fogata (Dark Mode Toggle) */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setDarkMode(!darkMode)}
              title="Alternar Modo Fogata Nocturno"
              className={`p-2 sm:p-2.5 rounded-full text-xs font-medium flex items-center justify-center border transition-all ${
                scrolled
                  ? 'bg-white/80 dark:bg-[#17221D] border-black/10 dark:border-white/15 text-[#1C1B19] dark:text-[#F7F4EF]'
                  : 'bg-black/35 backdrop-blur-md border-white/20 text-white'
              }`}
            >
              {darkMode ? (
                <Flame className="w-4 h-4 text-[#D15B2E] fill-[#D15B2E]" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </motion.button>

            {/* Favoritos / Wishlist */}
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.92 }}
              onClick={onOpenWishlist}
              className={`relative p-2 sm:p-2.5 rounded-full border transition-all ${
                scrolled
                  ? 'bg-white/80 dark:bg-[#17221D] border-black/10 dark:border-white/15 text-[#1C1B19] dark:text-white'
                  : 'bg-black/35 backdrop-blur-md border-white/20 text-white'
              }`}
              aria-label="Ver cabañas guardadas"
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  wishlistCount > 0 ? 'text-[#D15B2E] fill-[#D15B2E]' : ''
                }`}
              />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#D15B2E] text-white text-[9px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </motion.button>

            {/* Mis Viajes / Pases QR Confirmados */}
            {confirmedCount > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.93 }}
                onClick={onOpenMyTrips}
                className="px-2.5 sm:px-3 py-2 rounded-full bg-[#2E4F42] text-white text-xs font-semibold flex items-center gap-1 shadow-md"
              >
                <Ticket className="w-3.5 h-3.5 text-[#E9A789]" />
                <span className="hidden md:inline">Mis Pases QR</span>
                <span className="px-1.5 py-0.2 rounded-full bg-white/20 font-mono text-[10px]">
                  {confirmedCount}
                </span>
              </motion.button>
            )}

            {/* Registro / Perfil de Usuario */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.94 }}
              onClick={onOpenAuth}
              className={`px-2.5 sm:px-3 py-2 rounded-full text-xs font-semibold border flex items-center gap-1.5 transition-all ${
                scrolled
                  ? 'bg-white dark:bg-[#17221D] border-black/10 dark:border-white/15 text-[#1C1B19] dark:text-white'
                  : 'bg-black/40 backdrop-blur-md border-white/25 text-white'
              }`}
            >
              <User className="w-3.5 h-3.5 text-[#D15B2E] shrink-0" />
              <span className="hidden sm:inline max-w-[85px] truncate">
                {currentUser ? currentUser.name.split(' ')[0] : 'Registro'}
              </span>
            </motion.button>

            {/* Mi Expedición (Combined Booking Cart & Payment Trigger) */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={onOpenItinerary}
              className="relative px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#D15B2E] to-[#B84620] text-white text-xs font-semibold shadow-lg shadow-[#D15B2E]/25 flex items-center gap-1.5 sm:gap-2"
            >
              <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden xl:inline">Pagar / Expedición</span>
              {itineraryCount > 0 && (
                <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-white text-[#1C1B19] font-mono text-[10px] sm:text-[11px] font-bold whitespace-nowrap">
                  {itineraryCount} · ${(itineraryTotal / 1000).toFixed(1)}k
                </span>
              )}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile & Tablet Sticky Bottom Navigation Bar (Airbnb App Feel) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#111915]/95 backdrop-blur-xl border-t border-black/10 dark:border-white/10 px-2 py-1.5 flex items-center justify-around shadow-[0_-8px_25px_rgba(0,0,0,0.12)]">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id, item.href)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-colors ${
                isActive
                  ? 'text-[#D15B2E] font-bold'
                  : 'text-neutral-500 dark:text-neutral-400'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[10px] mt-0.5">{item.label}</span>
            </button>
          );
        })}

        <button
          onClick={onOpenItinerary}
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-[#2E4F42] dark:text-[#97BAAA] font-bold"
        >
          <ShoppingBag className="w-4 h-4 text-[#D15B2E]" />
          <span className="text-[10px] mt-0.5">Pagar ({itineraryCount})</span>
        </button>
      </nav>
    </>
  );
}
