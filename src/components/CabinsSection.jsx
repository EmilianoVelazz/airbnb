import React, { useState, useMemo, useEffect, useRef } from 'react';
import anime from 'animejs';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  Heart,
  Flame,
  Bike,
  Mountain,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Check,
  SlidersHorizontal,
  Plus,
  Users,
  BedDouble,
  Bath,
  Search,
  Map,
  LayoutGrid,
  ArrowUpDown,
  Scale,
  Wifi,
  PawPrint,
  X
} from 'lucide-react';
import { CABINS, CATEGORIES } from '../data/mockData';

// Helper: Spawn an Anime.js 12-particle radial firework burst on any button click
function triggerAnimeParticleBurst(buttonEl, colors = ['#D15B2E', '#E9A789', '#2E4F42']) {
  if (!buttonEl) return;
  const rect = buttonEl.getBoundingClientRect();
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.left = `${rect.left + rect.width / 2}px`;
  container.style.top = `${rect.top + rect.height / 2}px`;
  container.style.pointerEvents = 'none';
  container.style.zIndex = '9999';
  document.body.appendChild(container);

  const particles = Array.from({ length: 14 }, (_, i) => {
    const dot = document.createElement('span');
    const size = anime.random(5, 9);
    dot.style.position = 'absolute';
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    dot.style.borderRadius = '9999px';
    dot.style.backgroundColor = colors[i % colors.length];
    dot.style.boxShadow = `0 0 10px ${colors[i % colors.length]}`;
    container.appendChild(dot);
    return dot;
  });

  anime({
    targets: particles,
    translateX: (_, i) => {
      const angle = (i / particles.length) * Math.PI * 2;
      const distance = anime.random(28, 64);
      return Math.cos(angle) * distance;
    },
    translateY: (_, i) => {
      const angle = (i / particles.length) * Math.PI * 2;
      const distance = anime.random(28, 64);
      return Math.sin(angle) * distance;
    },
    scale: [1.4, 0],
    opacity: [1, 0],
    duration: 780,
    easing: 'easeOutExpo',
    complete: () => {
      container.remove();
    }
  });
}

function CabinCard({
  cabin,
  nights,
  checkIn,
  checkOut,
  showTotalWithNights,
  isWishlisted,
  isBookedInItinerary,
  isCompared,
  onToggleWishlist,
  onToggleCompare,
  onSelectCabin,
  onQuickAddCabin,
  onHoverCabin
}) {
  const [imgIdx, setImgIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const nextImg = (e) => {
    e.stopPropagation();
    setImgIdx((prev) => (prev + 1) % cabin.images.length);
  };

  const prevImg = (e) => {
    e.stopPropagation();
    setImgIdx((prev) => (prev - 1 + cabin.images.length) % cabin.images.length);
  };

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    triggerAnimeParticleBurst(e.currentTarget, ['#2E4F42', '#97BAAA', '#D15B2E']);
    anime({
      targets: cardRef.current,
      scale: [1, 0.97, 1.02, 1],
      duration: 550,
      easing: 'easeOutElastic(1, .6)'
    });
    onQuickAddCabin(cabin);
  };

  const handleHeartClick = (e) => {
    e.stopPropagation();
    triggerAnimeParticleBurst(e.currentTarget, ['#D15B2E', '#F2CBB8', '#FF6B4A']);
    anime({
      targets: e.currentTarget,
      scale: [1, 1.45, 0.9, 1.15, 1],
      rotate: [0, -15, 15, 0],
      duration: 650,
      easing: 'easeOutElastic(1, .5)'
    });
    onToggleWishlist(cabin.id);
  };

  const displayPrice = showTotalWithNights
    ? cabin.pricePerNight * nights
    : cabin.pricePerNight;

  return (
    <article
      ref={cardRef}
      onMouseEnter={() => {
        setIsHovered(true);
        if (onHoverCabin) onHoverCabin(cabin.id);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      onClick={() => onSelectCabin(cabin)}
      className={`anime-cabin-card group cursor-pointer rounded-3xl bg-white dark:bg-[#151F1B] border overflow-hidden transition-all duration-300 flex flex-col hover:-translate-y-1.5 ${
        isBookedInItinerary
          ? 'border-[#2E4F42] ring-2 ring-[#2E4F42]/30 shadow-xl'
          : 'border-black/10 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_24px_48px_rgba(209,91,46,0.16)]'
      }`}
    >
      {/* Image Render Carousel Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900">
        <AnimatePresence mode="wait">
          <motion.img
            key={cabin.images[imgIdx]}
            src={cabin.images[imgIdx]}
            alt={cabin.name}
            initial={{ opacity: 0.4, scale: 1.05 }}
            animate={{
              opacity: 1,
              scale: isHovered ? 1.05 : 1.0
            }}
            exit={{ opacity: 0.4 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30 pointer-events-none" />

        {/* Top Row: Architect Badge + Compare + Wishlist Heart */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
          <span className="px-3 py-1 rounded-full bg-white/95 dark:bg-[#111915]/95 backdrop-blur-md text-[11px] font-semibold text-[#1C1B19] dark:text-white shadow-sm flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#D15B2E]" />
            {cabin.badge}
          </span>

          <div className="flex items-center gap-1.5">
            {/* Compare Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleCompare(cabin);
              }}
              title="Comparar cabaña"
              className={`px-2.5 h-8 rounded-full backdrop-blur-md border text-[10px] font-mono font-semibold flex items-center gap-1 transition-all ${
                isCompared
                  ? 'bg-[#D15B2E] text-white border-[#D15B2E]'
                  : 'bg-black/45 text-white border-white/25 hover:bg-black/70'
              }`}
            >
              <Scale className="w-3 h-3" />
              <span>{isCompared ? 'Comparando' : 'Comparar'}</span>
            </button>

            {/* Wishlist Button with Anime.js Firework Burst */}
            <button
              onClick={handleHeartClick}
              className="w-8 h-8 rounded-full bg-black/45 backdrop-blur-md border border-white/25 flex items-center justify-center text-white hover:bg-black/65 transition-colors"
              aria-label="Guardar en favoritos"
            >
              <Heart
                className={`w-4 h-4 transition-all ${
                  isWishlisted
                    ? 'text-[#D15B2E] fill-[#D15B2E] scale-110'
                    : 'text-white'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Left / Right Carousel Controls (Always accessible on touch screens, hover on desktop) */}
        <button
          type="button"
          onClick={prevImg}
          aria-label="Imagen anterior"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 text-[#1C1B19] shadow-md flex items-center justify-center opacity-90 lg:opacity-0 lg:group-hover:opacity-100 hover:scale-110 transition-all z-10"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={nextImg}
          aria-label="Siguiente imagen"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 text-[#1C1B19] shadow-md flex items-center justify-center opacity-90 lg:opacity-0 lg:group-hover:opacity-100 hover:scale-110 transition-all z-10"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Bottom Overlay inside Image: Altitude + Service Badges + Dots */}
        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-end justify-between z-10">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-black/65 backdrop-blur-md text-white text-[10px] font-mono flex items-center gap-1 border border-white/15">
              <Mountain className="w-3 h-3 text-[#E9A789]" />
              {cabin.altitude}
            </span>
            {cabin.hasPrivateTemazcal && (
              <span className="px-2.5 py-0.5 rounded-full bg-[#D15B2E]/90 backdrop-blur-md text-white text-[10px] font-medium flex items-center gap-1">
                <Flame className="w-2.5 h-2.5" />
                Temazcal
              </span>
            )}
            {cabin.hasMotoTrailAccess && (
              <span className="px-2.5 py-0.5 rounded-full bg-[#2E4F42]/90 backdrop-blur-md text-white text-[10px] font-medium flex items-center gap-1">
                <Bike className="w-2.5 h-2.5" />
                Ruta Moto
              </span>
            )}
          </div>

          {/* Carousel Dots */}
          <div className="flex items-center gap-1 bg-black/45 px-2 py-1 rounded-full backdrop-blur-sm">
            {cabin.images.slice(0, 5).map((_, i) => (
              <span
                key={i}
                className={`block rounded-full transition-all ${
                  i === imgIdx
                    ? 'w-3.5 h-1.5 bg-white'
                    : 'w-1.5 h-1.5 bg-white/45'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Zone & Rating */}
          <div className="flex items-center justify-between gap-2 text-xs">
            <span className="font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 truncate">
              {cabin.zone}
            </span>
            <span className="flex items-center gap-1 font-semibold text-[#1C1B19] dark:text-white shrink-0">
              <Star className="w-3.5 h-3.5 text-[#D15B2E] fill-[#D15B2E]" />
              {cabin.rating}
              <span className="text-neutral-400 font-normal">
                ({cabin.reviewsCount})
              </span>
            </span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-2xl font-bold text-[#1C1B19] dark:text-white mt-1 group-hover:text-[#D15B2E] transition-colors leading-snug">
            {cabin.name}
          </h3>

          {/* Active Dates & Wifi pill */}
          <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
            <span>
              {checkIn} – {checkOut} ({nights}n)
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-[#2E4F42] dark:text-[#97BAAA]">
              <Wifi className="w-3 h-3" />
              {cabin.wifiSpeed}
            </span>
          </div>

          {/* Short Description */}
          <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-2 line-clamp-2 leading-relaxed">
            {cabin.shortDesc}
          </p>

          {/* Capacity & Architectural Specs */}
          <div className="mt-3.5 pt-3 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#D15B2E]" />
                {cabin.guests} pax
              </span>
              <span className="flex items-center gap-1">
                <BedDouble className="w-3.5 h-3.5 text-[#D15B2E]" />
                {cabin.bedrooms} hab.
              </span>
              <span className="flex items-center gap-1">
                <Bath className="w-3.5 h-3.5 text-[#D15B2E]" />
                {cabin.baths}
              </span>
            </div>
            {cabin.petFriendly && (
              <span
                title="Pet-Friendly"
                className="flex items-center gap-1 text-[11px] text-[#2E4F42] dark:text-[#97BAAA] font-medium"
              >
                <PawPrint className="w-3 h-3" />
                Pet-Friendly
              </span>
            )}
          </div>
        </div>

        {/* Footer Price & Micro-Actions */}
        <div className="mt-4 pt-3.5 border-t border-black/10 dark:border-white/10 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="font-mono text-lg font-bold text-[#1C1B19] dark:text-white">
                ${displayPrice.toLocaleString('es-MX')}
              </span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                MXN / {showTotalWithNights ? `total ${nights}n` : 'noche'}
              </span>
            </div>
            <span className="text-[11px] text-[#2E4F42] dark:text-[#97BAAA] font-medium">
              {showTotalWithNights
                ? ` $${cabin.pricePerNight.toLocaleString('es-MX')} por noche`
                : `Total ${nights}n: $${(
                    cabin.pricePerNight * nights
                  ).toLocaleString('es-MX')} MXN`}
            </span>
          </div>

          <button
            onClick={handleQuickAdd}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              isBookedInItinerary
                ? 'bg-[#2E4F42] text-white shadow-sm'
                : 'bg-[#1C1B19] dark:bg-white text-white dark:text-[#1C1B19] hover:bg-[#D15B2E] dark:hover:bg-[#D15B2E] dark:hover:text-white'
            }`}
          >
            {isBookedInItinerary ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Seleccionada</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Elegir Cabaña</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

export default function CabinsSection({
  searchFilters,
  setSearchFilters,
  wishlist,
  onlyWishlistFilter,
  setOnlyWishlistFilter,
  bookedCabinId,
  onToggleWishlist,
  onSelectCabin,
  onQuickAddCabin
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showTotalWithNights, setShowTotalWithNights] = useState(false);
  const [maxPrice, setMaxPrice] = useState(6500);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [splitMapView, setSplitMapView] = useState(false);
  const [hoveredCabinId, setHoveredCabinId] = useState(CABINS[0].id);

  // Side-by-side comparison state (up to 3 cabins)
  const [compareList, setCompareList] = useState([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  const gridRef = useRef(null);

  const handleToggleCompare = (cabin) => {
    setCompareList((prev) => {
      const exists = prev.some((c) => c.id === cabin.id);
      if (exists) return prev.filter((c) => c.id !== cabin.id);
      if (prev.length >= 3) return [...prev.slice(1), cabin];
      return [...prev, cabin];
    });
  };

  // Filter and sort cabins dynamically
  const filteredCabins = useMemo(() => {
    const list = CABINS.filter((cabin) => {
      if (onlyWishlistFilter && !wishlist.includes(cabin.id)) {
        return false;
      }
      if (
        selectedCategory !== 'all' &&
        !cabin.category.includes(selectedCategory)
      ) {
        return false;
      }
      if (
        searchFilters.zone !== 'Todas las Zonas' &&
        cabin.zone !== searchFilters.zone
      ) {
        return false;
      }
      if (cabin.guests < searchFilters.guests) {
        return false;
      }
      if (searchFilters.petFriendlyOnly && !cabin.petFriendly) {
        return false;
      }
      if (searchFilters.withTemazcal && !cabin.hasPrivateTemazcal) {
        return false;
      }
      if (searchFilters.withMoto && !cabin.hasMotoTrailAccess) {
        return false;
      }
      if (cabin.pricePerNight > maxPrice) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchName = cabin.name.toLowerCase().includes(q);
        const matchZone = cabin.zone.toLowerCase().includes(q);
        const matchDesc = cabin.description.toLowerCase().includes(q);
        const matchAmenity = cabin.amenities.some((a) =>
          a.toLowerCase().includes(q)
        );
        if (!matchName && !matchZone && !matchDesc && !matchAmenity) {
          return false;
        }
      }
      return true;
    });

    if (sortBy === 'price-asc') {
      return [...list].sort((a, b) => a.pricePerNight - b.pricePerNight);
    }
    if (sortBy === 'rating') {
      return [...list].sort((a, b) => b.rating - a.rating);
    }
    if (sortBy === 'altitude') {
      return [...list].sort((a, b) => b.altitudeNum - a.altitudeNum);
    }
    return list;
  }, [
    onlyWishlistFilter,
    wishlist,
    selectedCategory,
    searchFilters,
    maxPrice,
    searchQuery,
    sortBy
  ]);

  // Anime.js Staggered 3D Grid Cascade whenever category, sort, or filters change!
  useEffect(() => {
    if (!gridRef.current) return;
    anime.suspendWhenDocumentHidden = false;
    const cards = Array.from(gridRef.current.querySelectorAll('.anime-cabin-card'));
    if (!cards.length) return;

    const clearCardStyles = () => {
      cards.forEach((c) => {
        c.style.opacity = '1';
        c.style.transform = '';
      });
    };

    anime.remove(cards);
    const anim = anime({
      targets: cards,
      translateY: [24, 0],
      scale: [0.96, 1],
      opacity: [0.35, 1],
      duration: 650,
      delay: anime.stagger(65, { from: 'first' }),
      easing: 'easeOutExpo',
      complete: clearCardStyles
    });

    return () => {
      anim.pause();
      clearCardStyles();
    };
  }, [
    selectedCategory,
    sortBy,
    onlyWishlistFilter,
    searchFilters.zone,
    splitMapView
  ]);

  const resetAllFilters = () => {
    setSelectedCategory('all');
    setMaxPrice(6500);
    setSearchQuery('');
    setSortBy('featured');
    setOnlyWishlistFilter(false);
    setSearchFilters((prev) => ({
      ...prev,
      zone: 'Todas las Zonas',
      guests: 2,
      petFriendlyOnly: false,
      withTemazcal: false,
      withMoto: false
    }));
  };

  const activeHoveredCabin =
    CABINS.find((c) => c.id === hoveredCabinId) ||
    filteredCabins[0] ||
    CABINS[0];

  return (
    <section
      id="cabanas"
      className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#D15B2E] mb-2">
            <span className="w-6 h-[1px] bg-[#D15B2E]" />
            01 · HOTEL GUERRERO · ZACATLÁN DE LAS MANZANAS, PUEBLA
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#1C1B19] dark:text-white tracking-tight">
            Elige tu cabaña base en la niebla de Zacatlán
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-2xl">
            Mostrando disponibilidad para{' '}
            <strong className="text-[#D15B2E]">
              {searchFilters.checkIn} → {searchFilters.checkOut} (
              {searchFilters.nights}{' '}
              {searchFilters.nights === 1 ? 'noche' : 'noches'})
            </strong>
            . Todas nuestras cabañas incluyen sidra artesanal de bienvenida y pan relleno de queso.
          </p>
        </div>

        {/* Right Controls: Total Price Toggle + Map Split View Toggle */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          {/* Airbnb-style "Show Total Price" Switch Card */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            onClick={() => setShowTotalWithNights(!showTotalWithNights)}
            className="cursor-pointer px-4 py-2.5 rounded-2xl bg-white dark:bg-[#151F1B] border border-black/10 dark:border-white/10 shadow-sm flex items-center gap-3"
          >
            <div>
              <div className="text-xs font-semibold text-[#1C1B19] dark:text-white">
                Precio total ({searchFilters.nights}n)
              </div>
              <div className="text-[10px] text-neutral-500">
                Con impuestos y leña
              </div>
            </div>
            <div
              className={`w-10 h-5 rounded-full p-0.5 transition-colors flex items-center ${
                showTotalWithNights
                  ? 'bg-[#D15B2E] justify-end'
                  : 'bg-neutral-300 dark:bg-neutral-700 justify-start'
              }`}
            >
              <motion.div
                layout
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="w-4 h-4 rounded-full bg-white shadow"
              />
            </div>
          </motion.div>

          {/* Split View Toggle (Lista + Mapa Sticky) */}
          <button
            onClick={() => setSplitMapView(!splitMapView)}
            className={`px-4 py-3 rounded-2xl text-xs font-semibold border flex items-center gap-2 transition-all ${
              splitMapView
                ? 'bg-[#1C1B19] dark:bg-[#D15B2E] text-white border-transparent shadow-md'
                : 'bg-white dark:bg-[#151F1B] text-[#1C1B19] dark:text-white border-black/10 dark:border-white/10 hover:border-[#D15B2E]'
            }`}
          >
            {splitMapView ? (
              <>
                <LayoutGrid className="w-4 h-4" />
                <span>Vista Galería</span>
              </>
            ) : (
              <>
                <Map className="w-4 h-4 text-[#D15B2E]" />
                <span>Dividir con Mapa</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Search Keyword + Sort + Wishlist Filter Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-5">
        {/* Keyword Search Input */}
        <div className="md:col-span-5 relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar 'Jilgueros', 'Piedras Encimadas', 'Tulimán', 'jacuzzi'..."
            className="w-full pl-10 pr-8 py-2.5 rounded-2xl bg-white dark:bg-[#151F1B] border border-black/10 dark:border-white/10 text-xs focus:outline-none focus:border-[#D15B2E]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Sort Selector */}
        <div className="md:col-span-3 flex items-center gap-2 bg-white dark:bg-[#151F1B] px-3.5 py-2 rounded-2xl border border-black/10 dark:border-white/10">
          <ArrowUpDown className="w-3.5 h-3.5 text-[#D15B2E] shrink-0" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full bg-transparent text-xs font-semibold text-[#1C1B19] dark:text-white focus:outline-none cursor-pointer"
          >
            <option value="featured" className="bg-white dark:bg-[#151F1B]">
              Ordenar: Destacados Hotel Guerrero
            </option>
            <option value="price-asc" className="bg-white dark:bg-[#151F1B]">
              Precio: Menor a Mayor
            </option>
            <option value="rating" className="bg-white dark:bg-[#151F1B]">
              Calificación más alta (5.0★)
            </option>
            <option value="altitude" className="bg-white dark:bg-[#151F1B]">
              Mayor Altitud (msnm)
            </option>
          </select>
        </div>

        {/* Price Slider */}
        <div className="md:col-span-4 flex items-center justify-between gap-2 bg-white dark:bg-[#151F1B] px-3.5 py-2 rounded-2xl border border-black/10 dark:border-white/10">
          <div className="flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#D15B2E]" />
            <span className="text-xs text-neutral-600 dark:text-neutral-300 whitespace-nowrap">
              Máx/noche:
            </span>
          </div>
          <input
            type="range"
            min="3950"
            max="6500"
            step="150"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-24 sm:w-28 accent-[#D15B2E] cursor-pointer"
          />
          <span className="font-mono text-xs font-bold text-[#1C1B19] dark:text-white">
            ${maxPrice.toLocaleString('es-MX')}
          </span>
        </div>
      </div>

      {/* Category Pills + Only Favorites Pill */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-6 mb-8 border-b border-black/10 dark:border-white/10">
        {/* Mis Favoritos Filter Pill */}
        <button
          onClick={() => setOnlyWishlistFilter(!onlyWishlistFilter)}
          className={`px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
            onlyWishlistFilter
              ? 'bg-[#D15B2E] text-white border-[#D15B2E] shadow-md'
              : 'bg-white/80 dark:bg-[#151F1B] text-[#1C1B19] dark:text-white border-black/10 dark:border-white/10 hover:border-[#D15B2E]'
          }`}
        >
          <Heart
            className={`w-3.5 h-3.5 ${
              onlyWishlistFilter
                ? 'fill-white text-white'
                : 'text-[#D15B2E] fill-[#D15B2E]'
            }`}
          />
          <span>Mis Guardados ({wishlist.length})</span>
        </button>

        {CATEGORIES.map((cat) => {
          const active = selectedCategory === cat.id && !onlyWishlistFilter;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setOnlyWishlistFilter(false);
                setSelectedCategory(cat.id);
              }}
              className={`relative px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-2 ${
                active
                  ? 'text-white'
                  : 'bg-white/70 dark:bg-[#151F1B] text-neutral-700 dark:text-neutral-300 hover:bg-white border border-black/5 dark:border-white/10'
              }`}
            >
              {active && (
                <motion.div
                  layoutId="cabin-category-pill"
                  transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  className="absolute inset-0 rounded-full bg-[#1C1B19] dark:bg-[#D15B2E]"
                />
              )}
              <span className="relative z-10">{cat.label}</span>
              <span
                className={`relative z-10 text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                  active
                    ? 'bg-white/20 text-white'
                    : 'bg-black/5 dark:bg-white/10 text-neutral-500'
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Content: Either Full Grid OR Airbnb Split List + Sticky Map */}
      {filteredCabins.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16 px-4 rounded-3xl bg-white/70 dark:bg-[#151F1B]/70 border border-black/10 dark:border-white/10"
        >
          <p className="font-serif text-2xl text-[#1C1B19] dark:text-white font-semibold">
            No encontramos cabañas con esa combinación de filtros
          </p>
          <p className="text-sm text-neutral-500 mt-1">
            Prueba restableciendo los filtros para ver los 6 refugios disponibles en Zacatlán.
          </p>
          <button
            onClick={resetAllFilters}
            className="mt-5 px-5 py-2.5 rounded-full bg-[#D15B2E] text-white text-xs font-semibold hover:bg-[#B84620] transition-colors"
          >
            Ver todas las cabañas
          </button>
        </motion.div>
      ) : (
        <div
          ref={gridRef}
          className={
            splitMapView
              ? 'grid grid-cols-1 lg:grid-cols-12 gap-7 items-start'
              : 'block'
          }
        >
          {/* Cards Grid */}
          <div
            className={
              splitMapView
                ? 'lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6'
                : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7'
            }
          >
            {filteredCabins.map((cabin) => (
              <CabinCard
                key={cabin.id}
                cabin={cabin}
                nights={searchFilters.nights}
                checkIn={searchFilters.checkIn}
                checkOut={searchFilters.checkOut}
                showTotalWithNights={showTotalWithNights}
                isWishlisted={wishlist.includes(cabin.id)}
                isBookedInItinerary={bookedCabinId === cabin.id}
                isCompared={compareList.some((c) => c.id === cabin.id)}
                onToggleWishlist={onToggleWishlist}
                onToggleCompare={handleToggleCompare}
                onSelectCabin={onSelectCabin}
                onQuickAddCabin={onQuickAddCabin}
                onHoverCabin={setHoveredCabinId}
              />
            ))}
          </div>

          {/* Right Sticky Map Column (Airbnb Split View) */}
          {splitMapView && (
            <div className="lg:col-span-5 sticky top-24 rounded-3xl bg-[#14201B] border border-white/15 overflow-hidden shadow-2xl p-5 text-white">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#E9A789]">
                  MAPA ZACATLÁN EN VIVO · PASA EL CURSOR SOBRE UNA CABAÑA
                </span>
                <span className="text-xs font-mono text-white/60">
                  {filteredCabins.length} cabañas
                </span>
              </div>

              <div className="relative h-80 rounded-2xl bg-[#0D1512] border border-white/10 overflow-hidden">
                {/* Contour SVG */}
                <svg
                  viewBox="0 0 500 360"
                  className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
                  fill="none"
                >
                  <ellipse cx="220" cy="160" rx="150" ry="90" stroke="#6B9985" />
                  <ellipse cx="220" cy="160" rx="90" ry="50" stroke="#6B9985" />
                  <path
                    d="M 40 280 Q 190 120 350 220 T 470 140"
                    stroke="#D15B2E"
                    strokeWidth="2.5"
                    strokeDasharray="6 5"
                  />
                </svg>

                {filteredCabins.map((c) => {
                  const isActive = c.id === hoveredCabinId;
                  return (
                    <motion.button
                      key={c.id}
                      style={{
                        left: `${c.mapCoords.x}%`,
                        top: `${c.mapCoords.y}%`
                      }}
                      animate={{
                        scale: isActive ? 1.2 : 1,
                        zIndex: isActive ? 30 : 10
                      }}
                      onClick={() => onSelectCabin(c)}
                      onMouseEnter={() => setHoveredCabinId(c.id)}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 px-3 py-1 rounded-full font-mono text-xs font-bold shadow-lg transition-colors ${
                        isActive
                          ? 'bg-[#D15B2E] text-white ring-4 ring-[#D15B2E]/40'
                          : 'bg-white text-[#1C1B19]'
                      }`}
                    >
                      ${c.pricePerNight.toLocaleString('es-MX')}
                    </motion.button>
                  );
                })}
              </div>

              {/* Active Hovered Cabin Mini Card */}
              {activeHoveredCabin && (
                <div
                  onClick={() => onSelectCabin(activeHoveredCabin)}
                  className="mt-4 p-3.5 rounded-2xl bg-white/10 hover:bg-white/15 cursor-pointer transition-colors flex items-center gap-3.5"
                >
                  <img
                    src={activeHoveredCabin.images[0]}
                    alt={activeHoveredCabin.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-mono text-[#E9A789]">
                      {activeHoveredCabin.zone} · {activeHoveredCabin.altitude}
                    </div>
                    <div className="font-serif text-lg font-bold truncate">
                      {activeHoveredCabin.name}
                    </div>
                    <div className="text-xs text-white/75 font-mono">
                      ${activeHoveredCabin.pricePerNight.toLocaleString('es-MX')}{' '}
                      MXN / noche · ★ {activeHoveredCabin.rating}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Floating Compare Bar at Bottom if compareList > 0 */}
      <AnimatePresence>
        {compareList.length > 0 && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="fixed bottom-20 left-3 right-3 sm:left-auto sm:right-6 sm:bottom-6 z-40 p-3 sm:p-3.5 rounded-2xl bg-[#151F1B] text-white border border-white/20 shadow-2xl flex items-center justify-between sm:justify-start gap-2.5 sm:gap-3"
          >
            <div className="flex items-center -space-x-2">
              {compareList.map((c) => (
                <img
                  key={c.id}
                  src={c.images[0]}
                  alt={c.name}
                  className="w-9 h-9 rounded-full object-cover border-2 border-[#151F1B]"
                />
              ))}
            </div>
            <div className="text-xs">
              <span className="font-bold block">
                {compareList.length}{' '}
                {compareList.length === 1 ? 'cabaña' : 'cabañas'} para comparar
              </span>
              <span className="text-[10px] text-white/60">
                Selecciona hasta 3 cabañas
              </span>
            </div>
            <button
              onClick={() => setShowCompareModal(true)}
              className="px-3.5 py-2 rounded-xl bg-[#D15B2E] text-white text-xs font-semibold hover:bg-[#B84620]"
            >
              Comparar Ahora
            </button>
            <button
              onClick={() => setCompareList([])}
              className="p-1.5 text-white/60 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side-by-Side Cabin Comparison Modal */}
      <AnimatePresence>
        {showCompareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCompareModal(false)}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl rounded-3xl bg-[#F7F4EF] dark:bg-[#131C18] text-[#1C1B19] dark:text-white border border-white/15 p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/10">
                <div>
                  <span className="text-xs font-mono uppercase text-[#D15B2E]">
                    COMPARATIVA HOTEL GUERRERO · ZACATLÁN, PUEBLA
                  </span>
                  <h3 className="font-serif text-3xl font-bold">
                    Comparando {compareList.length} Cabañas
                  </h3>
                </div>
                <button
                  onClick={() => setShowCompareModal(false)}
                  className="w-9 h-9 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-5">
                {compareList.map((c) => (
                  <div
                    key={c.id}
                    className="rounded-2xl bg-white dark:bg-[#192520] border border-black/10 dark:border-white/10 p-4 flex flex-col justify-between"
                  >
                    <div>
                      <img
                        src={c.images[0]}
                        alt={c.name}
                        className="w-full h-36 rounded-xl object-cover"
                      />
                      <h4 className="font-serif text-xl font-bold mt-3">
                        {c.name}
                      </h4>
                      <p className="text-xs font-mono text-[#D15B2E]">
                        ${c.pricePerNight.toLocaleString('es-MX')} MXN / noche
                      </p>

                      <div className="mt-4 space-y-2 text-xs border-t border-black/10 dark:border-white/10 pt-3">
                        <div className="flex justify-between">
                          <span className="text-neutral-500">Zona:</span>
                          <span className="font-semibold text-right">
                            {c.zone.split('·')[0]}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-500">Altitud:</span>
                          <span className="font-mono">{c.altitude}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-500">Capacidad:</span>
                          <span>
                            {c.guests} huéspedes ({c.bedrooms} hab)
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-500">Internet:</span>
                          <span className="font-mono text-[#2E4F42] dark:text-[#97BAAA]">
                            {c.wifiSpeed}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-500">
                            Temazcal Privado:
                          </span>
                          <span>
                            {c.hasPrivateTemazcal
                              ? '✓ Sí, en cabaña'
                              : 'En Santuario Central'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-500">
                            Ruta Moto Zacatlán:
                          </span>
                          <span>
                            {c.hasMotoTrailAccess
                              ? '✓ Salida directa'
                              : 'En Basecamp'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-500">Pet-Friendly:</span>
                          <span>{c.petFriendly ? '✓ Sí' : 'No'}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setShowCompareModal(false);
                        onSelectCabin(c);
                      }}
                      className="mt-5 w-full py-2.5 rounded-xl bg-[#D15B2E] text-white text-xs font-semibold"
                    >
                      Inspeccionar y Reservar
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
