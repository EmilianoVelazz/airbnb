import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Sparkles, Trees, ArrowUp } from 'lucide-react';
import Navbar from './components/Navbar';
import HeroRenderShowcase from './components/HeroRenderShowcase';
import CabinsSection from './components/CabinsSection';
import TemazcalSection from './components/TemazcalSection';
import MotoRentalSection from './components/MotoRentalSection';
import TopographicMapSection from './components/TopographicMapSection';
import CabinDetailModal from './components/CabinDetailModal';
import ItineraryDrawer from './components/ItineraryDrawer';
import AuthModal from './components/AuthModal';
import CheckoutWizardModal from './components/CheckoutWizardModal';
import MyTripsModal from './components/MyTripsModal';
import AnimeIntroOverlay from './components/AnimeIntroOverlay';
import { CABINS } from './data/mockData';

export default function App() {
  const [activeSection, setActiveSection] = useState('cabanas');
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem('kaab_dark') === 'true';
    } catch {
      return false;
    }
  });

  // User Auth Profile persisted in localStorage
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('kaab_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Confirmed Bookings / QR Passes persisted in localStorage
  const [confirmedBookings, setConfirmedBookings] = useState(() => {
    try {
      const saved = localStorage.getItem('kaab_bookings');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Search & Filter State with real Check-in / Check-out dates
  const [searchFilters, setSearchFilters] = useState({
    zone: 'Todas las Zonas',
    checkIn: 'Vie 13 Nov',
    checkOut: 'Dom 15 Nov',
    nights: 2,
    guests: 2,
    petFriendlyOnly: false,
    withTemazcal: false,
    withMoto: false
  });

  // Wishlist State persisted in localStorage
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('kaab_wishlist');
      return saved ? JSON.parse(saved) : ['cab-1'];
    } catch {
      return ['cab-1'];
    }
  });
  const [onlyWishlistFilter, setOnlyWishlistFilter] = useState(false);

  // Unified Expedition Cart (Cabins + Temazcal + Motos)
  const [itinerary, setItinerary] = useState(() => {
    try {
      const saved = localStorage.getItem('guerrero_itinerary_zac');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        uid: 'cabin-active',
        cabinId: 'cab-1',
        type: 'cabin',
        categoryLabel: 'Cabaña Base · 2 Noches (Vie 13 Nov → Dom 15 Nov)',
        title: 'Suite Guerrero · A-Frame Barranca de los Jilgueros',
        meta: 'Barranca de los Jilgueros, Zacatlán · Sidra y Pan de Queso incluidos',
        pricePerNight: 4850,
        price: 9700,
        image: '/renders/hero-cabin.jpg'
      }
    ];
  });

  // Persist user, bookings, wishlist & itinerary
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('kaab_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('kaab_user');
      }
    } catch {
      // ignore
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem('kaab_bookings', JSON.stringify(confirmedBookings));
    } catch {
      // ignore
    }
  }, [confirmedBookings]);

  useEffect(() => {
    try {
      localStorage.setItem('kaab_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('guerrero_itinerary_zac', JSON.stringify(itinerary));
    } catch {
      // ignore
    }
  }, [itinerary]);

  // Automatically sync active cabin price when nights or dates change in searchFilters
  useEffect(() => {
    setItinerary((prev) =>
      prev.map((item) => {
        if (item.type === 'cabin' && item.pricePerNight) {
          return {
            ...item,
            categoryLabel: `Cabaña Base · ${searchFilters.nights} ${
              searchFilters.nights === 1 ? 'Noche' : 'Noches'
            } (${searchFilters.checkIn} → ${searchFilters.checkOut})`,
            price: item.pricePerNight * searchFilters.nights
          };
        }
        return item;
      })
    );
  }, [searchFilters.nights, searchFilters.checkIn, searchFilters.checkOut]);

  // ScrollSpy to update Navbar active section automatically
  useEffect(() => {
    const sections = [
      { id: 'cabanas', selector: '#cabanas' },
      { id: 'temazcal', selector: '#temazcal' },
      { id: 'motos', selector: '#motos' },
      { id: 'mapa', selector: '#mapa-topografico' }
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const matched = sections.find(
              (s) => entry.target.id === s.selector.replace('#', '')
            );
            if (matched) setActiveSection(matched.id);
          }
        });
      },
      { threshold: 0.25 }
    );

    sections.forEach((s) => {
      const el = document.querySelector(s.selector);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Modal & Drawer States
  const [selectedCabinModal, setSelectedCabinModal] = useState(null);
  const [isItineraryOpen, setIsItineraryOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCheckoutWizardOpen, setIsCheckoutWizardOpen] = useState(false);
  const [isMyTripsOpen, setIsMyTripsOpen] = useState(false);
  const [wizardDiscountApplied, setWizardDiscountApplied] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [introKey, setIntroKey] = useState(1);

  // Smooth Scroll Progress Bar at top of viewport
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });

  // Sync Dark Mode ("Modo Fogata") with document root
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('kaab_dark', String(darkMode));
    } catch {
      // ignore
    }
  }, [darkMode]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const handleToggleWishlist = (cabinId) => {
    const cabin = CABINS.find((c) => c.id === cabinId);
    setWishlist((prev) => {
      const exists = prev.includes(cabinId);
      if (exists) {
        showToast(`Se quitó "${cabin?.name}" de tus guardados`);
        return prev.filter((id) => id !== cabinId);
      } else {
        showToast(`♥ "${cabin?.name}" guardada en Mis Favoritos`);
        return [...prev, cabinId];
      }
    });
  };

  // Smart Cabin Selection: replaces active cabin in itinerary instead of duplicating
  const handleQuickAddCabin = (cabin) => {
    const nights = searchFilters.nights;
    const newCabinItem = {
      uid: 'cabin-active',
      cabinId: cabin.id,
      type: 'cabin',
      categoryLabel: `Cabaña Base · ${nights} ${
        nights === 1 ? 'Noche' : 'Noches'
      } (${searchFilters.checkIn} → ${searchFilters.checkOut})`,
      title: cabin.name,
      meta: `${cabin.zone} · ${cabin.altitude} · Leña incluida`,
      pricePerNight: cabin.pricePerNight,
      price: cabin.pricePerNight * nights,
      image: cabin.images[0]
    };

    setItinerary((prev) => {
      const withoutOldCabin = prev.filter((i) => i.type !== 'cabin');
      return [newCabinItem, ...withoutOldCabin];
    });
    showToast(`✓ "${cabin.name}" establecida como tu cabaña base`);
  };

  // Bundle Confirm from Modal: updates searchFilters.nights and adds selected extras cleanly
  const handleConfirmCabinBundle = ({
    cabin,
    nights,
    checkIn,
    checkOut,
    bundleTemazcal,
    bundleMoto,
    selectedMotoType,
    goDirectToPay
  }) => {
    setSearchFilters((prev) => ({ ...prev, nights }));

    const cabinItem = {
      uid: 'cabin-active',
      cabinId: cabin.id,
      type: 'cabin',
      categoryLabel: `Cabaña Base · ${nights} ${
        nights === 1 ? 'Noche' : 'Noches'
      } (${checkIn} → ${checkOut})`,
      title: cabin.name,
      meta: `${cabin.zone} · ${cabin.altitude} · Leña incluida`,
      pricePerNight: cabin.pricePerNight,
      price: cabin.pricePerNight * nights,
      image: cabin.images[0]
    };

    setItinerary((prev) => {
      let nextList = [cabinItem, ...prev.filter((i) => i.type !== 'cabin')];

      if (bundleTemazcal && !nextList.some((i) => i.type === 'temazcal')) {
        nextList.push({
          uid: `tem-bundle-${Date.now()}`,
          type: 'temazcal',
          categoryLabel: 'Ritual Temazcal · Día 1 (18:00 hrs)',
          title: 'Ceremonia Íntima Privada en Cabaña',
          meta: '28 piedras volcánicas · Copal blanco e infusión herbal',
          price: 1850,
          image: '/renders/temazcal-ritual.jpg'
        });
      }

      if (bundleMoto && !nextList.some((i) => i.type === 'moto')) {
        nextList.push({
          uid: `moto-bundle-${Date.now()}`,
          type: 'moto',
          categoryLabel: 'Garage Off-Road · Día 2 (09:00 AM)',
          title: selectedMotoType || 'Cuatrimoto Grizzly 700 4x4',
          meta: `Entrega en puerta de ${cabin.name.split('·')[0]} · 4 hrs`,
          price: 1850,
          image: '/renders/moto-cuatrimoto.jpg'
        });
      }

      return nextList;
    });

    if (goDirectToPay) {
      setIsCheckoutWizardOpen(true);
    } else {
      showToast(`✓ Expedición configurada en "${cabin.name}"`);
      setIsItineraryOpen(true);
    }
  };

  const handleAddTemazcal = (pkg) => {
    const newItem = {
      uid: `tem-${pkg.id}-${Date.now()}`,
      type: 'temazcal',
      categoryLabel: `Ritual Temazcal · ${pkg.chosenDay}`,
      title: pkg.title,
      meta: `${pkg.chosenSlot} · Intención: ${pkg.intention}`,
      price: pkg.price,
      image: '/renders/temazcal-ritual.jpg'
    };
    setItinerary((prev) => [...prev, newItem]);
    showToast(`🔥 "${pkg.title}" programado para ${pkg.chosenDay}`);
  };

  const handleAddMoto = (motoBooking) => {
    const extras = [];
    if (motoBooking.withGuide) extras.push('Guía Enduro');
    if (motoBooking.withGoPro) extras.push('GoPro 4K');

    const newItem = {
      uid: `moto-${motoBooking.id}-${Date.now()}`,
      type: 'moto',
      categoryLabel: `Garage Off-Road · ${motoBooking.qty}x (${motoBooking.durationLabel})`,
      title: motoBooking.name,
      meta: `${
        motoBooking.deliverToCabin
          ? 'Entrega en puerta de cabaña'
          : 'Salida Basecamp'
      } · ${motoBooking.selectedTrail.split('·')[0]}${
        extras.length ? ` + ${extras.join(' & ')}` : ''
      }`,
      price: motoBooking.price,
      image: motoBooking.image
    };
    setItinerary((prev) => [...prev, newItem]);
    showToast(
      `🏍️ ${motoBooking.qty}x "${motoBooking.name}" agregada a tu expedición`
    );
  };

  // Quick 1-click upsell inside Itinerary Drawer
  const handleQuickAddSuggested = (type) => {
    if (type === 'temazcal') {
      setItinerary((prev) => [
        ...prev,
        {
          uid: `tem-quick-${Date.now()}`,
          type: 'temazcal',
          categoryLabel: 'Ritual Temazcal · Día 1 (18:00 hrs)',
          title: 'Ceremonia Íntima en Pareja · Crepúsculo',
          meta: 'Domo volcánico privado · Copal y herbolaria fresca',
          price: 1850,
          image: '/renders/temazcal-ritual.jpg'
        }
      ]);
      showToast('🔥 Ceremonia de Temazcal sumada a tu expedición');
    } else if (type === 'moto') {
      setItinerary((prev) => [
        ...prev,
        {
          uid: `moto-quick-${Date.now()}`,
          type: 'moto',
          categoryLabel: 'Garage Off-Road · Día 2 (09:00 AM)',
          title: 'Cuatrimoto Yamaha Grizzly 700 4x4 EPS',
          meta: 'Entregada en la puerta de tu cabaña · Medio Día (4h)',
          price: 1850,
          image: '/renders/moto-cuatrimoto.jpg'
        }
      ]);
      showToast('🏍️ Cuatrimoto 4x4 sumada a tu expedición');
    }
  };

  const handleRemoveItineraryItem = (uid) => {
    setItinerary((prev) => prev.filter((item) => item.uid !== uid));
  };

  const handleExecuteHeroSearch = () => {
    const el = document.querySelector('#cabanas');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    showToast(
      `Disponibilidad actualizada: ${searchFilters.checkIn} → ${searchFilters.checkOut} (${searchFilters.guests} viajeros)`
    );
  };

  const activeCabinItem = itinerary.find((i) => i.type === 'cabin');
  const bookedCabinId = activeCabinItem?.cabinId || null;
  const bookedCabinName = activeCabinItem?.title || null;

  const hasCabin = itinerary.some((i) => i.type === 'cabin');
  const hasTemazcal = itinerary.some((i) => i.type === 'temazcal');
  const hasMoto = itinerary.some((i) => i.type === 'moto');
  const isFullCombo = hasCabin && hasTemazcal && hasMoto;

  const rawTotal = itinerary.reduce((acc, item) => acc + item.price, 0);
  const itineraryTotal = isFullCombo ? Math.round(rawTotal * 0.85) : rawTotal;

  return (
    <div className="min-h-screen bg-[#F7F4EF] dark:bg-[#0E1512] text-[#1C1B19] dark:text-[#F7F4EF] bg-arch-grid transition-colors duration-500">
      {/* Cinematic Anime.js Intro Curtain & SVG Line Drawing */}
      {introKey > 0 && (
        <AnimeIntroOverlay
          key={introKey}
          onComplete={() => setIntroKey(0)}
        />
      )}

      {/* Top Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D15B2E] via-[#E9A789] to-[#2E4F42] origin-left z-[60]"
      />

      {/* Sticky Airbnb-Style Navbar */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        wishlistCount={wishlist.length}
        onOpenWishlist={() => {
          setOnlyWishlistFilter((prev) => !prev);
          const el = document.querySelector('#cabanas');
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          showToast(
            !onlyWishlistFilter
              ? `Mostrando tus ${wishlist.length} cabañas guardadas`
              : 'Mostrando todas las cabañas'
          );
        }}
        itineraryCount={itinerary.length}
        itineraryTotal={itineraryTotal}
        onOpenItinerary={() => setIsItineraryOpen(true)}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        confirmedCount={confirmedBookings.length}
        onOpenMyTrips={() => setIsMyTripsOpen(true)}
      />

      {/* Interactive 3D Render Hero Showcase & Search Dock */}
      <HeroRenderShowcase
        searchFilters={searchFilters}
        setSearchFilters={setSearchFilters}
        onExecuteSearch={handleExecuteHeroSearch}
        onReplayIntro={() => setIntroKey(Date.now())}
      />

      {/* 01. Cabañas de Autor Section */}
      <CabinsSection
        searchFilters={searchFilters}
        setSearchFilters={setSearchFilters}
        wishlist={wishlist}
        onlyWishlistFilter={onlyWishlistFilter}
        setOnlyWishlistFilter={setOnlyWishlistFilter}
        bookedCabinId={bookedCabinId}
        onToggleWishlist={handleToggleWishlist}
        onSelectCabin={(cabin) => setSelectedCabinModal(cabin)}
        onQuickAddCabin={handleQuickAddCabin}
      />

      {/* 02. Interactive Temazcal Sanctuary Section */}
      <TemazcalSection
        onAddTemazcal={handleAddTemazcal}
        defaultGuests={searchFilters.guests}
      />

      {/* 03. Off-Road Moto & ATV Rental Section */}
      <MotoRentalSection
        onAddMoto={handleAddMoto}
        bookedCabinName={bookedCabinName}
      />

      {/* 04. Interactive Topographic Map Section */}
      <TopographicMapSection
        onSelectCabin={(cabin) => setSelectedCabinModal(cabin)}
      />

      {/* Footer */}
      <footer className="bg-[#0B110E] text-white pt-16 pb-28 lg:pb-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#D15B2E] flex items-center justify-center text-white">
                <Trees className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-wider">
                HOTEL GUERRERO · ZACATLÁN, PUEBLA
              </span>
            </div>
            <p className="text-xs text-white/65 max-w-md leading-relaxed">
              Hospitalidad boutique en el Pueblo Mágico de Zacatlán de las Manzanas, Puebla. Fusionamos cabañas de autor frente a la Barranca de los Jilgueros con rituales de temazcal y rutas en moto por el Valle de Piedras Encimadas y Cascadas de Tulimán.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-mono text-[#E9A789]">
              <span>BARRANCA DE LOS JILGUEROS</span>
              <span>•</span>
              <span>PIEDRAS ENCIMADAS</span>
              <span>•</span>
              <span>CASCADAS DE TULIMÁN</span>
              <span>•</span>
              <span>CASCADA DE SAN PEDRO</span>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-white/50 mb-3">
              Experiencias
            </h4>
            <ul className="space-y-2 text-xs text-white/75">
              <li>
                <a
                  href="#cabanas"
                  className="hover:text-[#D15B2E] transition-colors"
                >
                  Cabañas A-Frame & Casas en el Árbol
                </a>
              </li>
              <li>
                <a
                  href="#temazcal"
                  className="hover:text-[#D15B2E] transition-colors"
                >
                  Temazcal Tradicional de 4 Puertas
                </a>
              </li>
              <li>
                <a
                  href="#motos"
                  className="hover:text-[#D15B2E] transition-colors"
                >
                  Renta Scrambler 450cc & Cuatrimotos 4x4
                </a>
              </li>
              <li>
                <a
                  href="#mapa-topografico"
                  className="hover:text-[#D15B2E] transition-colors"
                >
                  Mapa Topográfico de Senderos
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-white/50 mb-3">
              Trilogía Káab (-15%)
            </h4>
            <p className="text-xs text-white/70 leading-relaxed">
              Combina <strong>Cabaña + Temazcal + Moto</strong> en tu itinerario para desbloquear automáticamente un 15% de descuento, o aplica el código{' '}
              <span className="font-mono text-[#E9A789] font-bold">
                BOSQUE15
              </span>
              .
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-[#D15B2E] text-xs font-mono transition-colors"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Volver a la Cumbre</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Cabin Architectural Detail & Combo Customizer Modal */}
      {selectedCabinModal && (
        <CabinDetailModal
          cabin={selectedCabinModal}
          searchFilters={searchFilters}
          onClose={() => setSelectedCabinModal(null)}
          onConfirmCabinBundle={handleConfirmCabinBundle}
        />
      )}

      {/* Slide-Over Unified Itinerary Drawer */}
      <ItineraryDrawer
        isOpen={isItineraryOpen}
        onClose={() => setIsItineraryOpen(false)}
        items={itinerary}
        searchFilters={searchFilters}
        onRemoveItem={handleRemoveItineraryItem}
        onQuickAddSuggested={handleQuickAddSuggested}
        onProceedToCheckout={(discountState) => {
          setWizardDiscountApplied(discountState);
          setIsItineraryOpen(false);
          setIsCheckoutWizardOpen(true);
        }}
      />

      {/* User Registration / Login Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onSuccessAuth={(userObj) => {
          setCurrentUser(userObj);
          showToast(`✓ Bienvenido a Káab, ${userObj.name}`);
        }}
        onLogout={() => {
          setCurrentUser(null);
          showToast('Sesión cerrada');
        }}
      />

      {/* 4-Step Registration, Payment Plan & Simulated Payment Gateway Wizard */}
      <CheckoutWizardModal
        isOpen={isCheckoutWizardOpen}
        onClose={() => setIsCheckoutWizardOpen(false)}
        items={itinerary}
        searchFilters={searchFilters}
        currentUser={currentUser}
        discountApplied={wizardDiscountApplied}
        onCompleteBooking={(passObj) => {
          setConfirmedBookings((prev) => [passObj, ...prev]);
          if (!currentUser) {
            setCurrentUser({
              name: passObj.guestName,
              email: passObj.email,
              phone: passObj.phone,
              level: 'Explorador Confirmado',
              motoExp: 'Todo Terreno 4x4',
              temazcalPref: '4 Puertas Tradicional'
            });
          }
          showToast(`🎉 Reserva #${passObj.folio} confirmada con éxito`);
        }}
      />

      {/* My Confirmed Trips & QR Passes Modal */}
      <MyTripsModal
        isOpen={isMyTripsOpen}
        onClose={() => setIsMyTripsOpen(false)}
        bookings={confirmedBookings}
      />

      {/* Micro-Interaction Floating Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            className="fixed bottom-20 lg:bottom-6 left-4 right-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 z-50 px-4 sm:px-5 py-3 rounded-full bg-[#1C1B19] dark:bg-[#D15B2E] text-white text-xs font-semibold shadow-2xl border border-white/15 flex items-center justify-center gap-2.5 text-center"
          >
            <Sparkles className="w-4 h-4 text-[#E9A789] shrink-0" />
            <span className="truncate">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
