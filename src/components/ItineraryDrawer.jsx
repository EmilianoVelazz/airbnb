import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Trash2,
  Trees,
  Flame,
  Bike,
  Tag,
  ArrowRight,
  Sparkles,
  CreditCard,
  ShieldCheck
} from 'lucide-react';

export default function ItineraryDrawer({
  isOpen,
  onClose,
  items,
  searchFilters,
  onRemoveItem,
  onQuickAddSuggested,
  onProceedToCheckout
}) {
  const [promoInput, setPromoInput] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  const hasCabin = items.some((i) => i.type === 'cabin');
  const hasTemazcal = items.some((i) => i.type === 'temazcal');
  const hasMoto = items.some((i) => i.type === 'moto');
  const isFullCombo = hasCabin && hasTemazcal && hasMoto;

  const subtotal = items.reduce((acc, item) => acc + item.price, 0);
  const effectiveDiscount = discountApplied || isFullCombo;
  const discountAmount = effectiveDiscount ? Math.round(subtotal * 0.15) : 0;
  const finalTotal = subtotal - discountAmount;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoInput.trim().toUpperCase() === 'BOSQUE15') {
      setDiscountApplied(true);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex justify-end"
        >
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md h-full bg-[#F7F4EF] dark:bg-[#131C18] text-[#1C1B19] dark:text-white border-l border-black/10 dark:border-white/10 shadow-2xl flex flex-col justify-between p-6 overflow-y-auto"
          >
            {/* Top Header */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/10">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#D15B2E]">
                    HOTEL GUERRERO ZACATLÁN · {searchFilters?.checkIn} AL{' '}
                    {searchFilters?.checkOut}
                  </span>
                  <h3 className="font-serif text-2xl font-bold">
                    Mi Estancia en Zacatlán, Puebla
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center hover:bg-[#D15B2E] hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Combo 3x Progress Tracker */}
              <div className="mt-4 p-3.5 rounded-2xl bg-white dark:bg-[#192520] border border-black/8 dark:border-white/10">
                <div className="flex items-center justify-between text-[11px] font-semibold mb-2">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#D15B2E]" />
                    {isFullCombo
                      ? '¡Combo Trilogía Hotel Guerrero Activo! (-15%)'
                      : 'Arma la Trilogía Zacatlán y obtén 15% OFF automático:'}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-[10px] font-mono">
                  <div
                    className={`p-2 rounded-xl flex items-center gap-1.5 border ${
                      hasCabin
                        ? 'bg-[#2E4F42] text-white border-[#2E4F42]'
                        : 'bg-black/5 dark:bg-white/5 text-neutral-400 border-transparent'
                    }`}
                  >
                    <Trees className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">1. Cabaña</span>
                  </div>
                  <div
                    className={`p-2 rounded-xl flex items-center gap-1.5 border ${
                      hasTemazcal
                        ? 'bg-[#D15B2E] text-white border-[#D15B2E]'
                        : 'bg-black/5 dark:bg-white/5 text-neutral-400 border-transparent'
                    }`}
                  >
                    <Flame className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">2. Temazcal</span>
                  </div>
                  <div
                    className={`p-2 rounded-xl flex items-center gap-1.5 border ${
                      hasMoto
                        ? 'bg-[#1C1B19] dark:bg-white text-white dark:text-[#1C1B19] border-transparent'
                        : 'bg-black/5 dark:bg-white/5 text-neutral-400 border-transparent'
                    }`}
                  >
                    <Bike className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">3. Moto</span>
                  </div>
                </div>
              </div>

              {items.length === 0 ? (
                <div className="py-14 text-center space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-[#D15B2E]/15 text-[#D15B2E] flex items-center justify-center mx-auto">
                    <Trees className="w-7 h-7" />
                  </div>
                  <h4 className="font-serif text-2xl font-semibold">
                    Tu expedición aún está vacía
                  </h4>
                  <p className="text-xs text-neutral-500 max-w-xs mx-auto leading-relaxed">
                    Elige primero una cabaña base y complementa tu fin de semana con temazcal y motos todo-terreno.
                  </p>
                </div>
              ) : (
                <div className="mt-4 space-y-2.5">
                  <AnimatePresence>
                    {items.map((item) => {
                      const TypeIcon =
                        item.type === 'cabin'
                          ? Trees
                          : item.type === 'temazcal'
                          ? Flame
                          : Bike;

                      return (
                        <motion.div
                          key={item.uid}
                          layout
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: 40 }}
                          className="p-3.5 rounded-2xl bg-white dark:bg-[#192520] border border-black/8 dark:border-white/10 flex items-center gap-3.5 shadow-sm"
                        >
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-16 h-16 rounded-xl object-cover shrink-0"
                            />
                          ) : (
                            <div className="w-16 h-16 rounded-xl bg-[#D15B2E]/15 text-[#D15B2E] flex items-center justify-center shrink-0">
                              <TypeIcon className="w-6 h-6" />
                            </div>
                          )}

                          <div className="flex-1 min-w-0">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-[#D15B2E] block">
                              {item.categoryLabel}
                            </span>
                            <h5 className="font-serif text-base font-bold truncate">
                              {item.title}
                            </h5>
                            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
                              {item.meta}
                            </p>
                            <span className="font-mono text-xs font-bold text-[#1C1B19] dark:text-white mt-0.5 block">
                              ${item.price.toLocaleString('es-MX')} MXN
                            </span>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.uid)}
                            className="p-2 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                            aria-label="Eliminar experiencia"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>

                  {/* 1-Click Missing Experience Upsells */}
                  {(!hasTemazcal || !hasMoto) && onQuickAddSuggested && (
                    <div className="pt-2 space-y-1.5">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block">
                        Completa tu Trilogía con 1 clic:
                      </span>
                      {!hasTemazcal && (
                        <button
                          type="button"
                          onClick={() => onQuickAddSuggested('temazcal')}
                          className="w-full p-2.5 rounded-xl border border-dashed border-[#D15B2E]/50 bg-[#D15B2E]/5 hover:bg-[#D15B2E]/15 text-xs flex items-center justify-between transition-colors"
                        >
                          <span className="flex items-center gap-2 font-medium">
                            <Flame className="w-3.5 h-3.5 text-[#D15B2E]" />
                            + Sumar Temazcal Privado (Día 1 · 18:00)
                          </span>
                          <span className="font-mono font-bold text-[#D15B2E]">
                            +$1,850
                          </span>
                        </button>
                      )}
                      {!hasMoto && (
                        <button
                          type="button"
                          onClick={() => onQuickAddSuggested('moto')}
                          className="w-full p-2.5 rounded-xl border border-dashed border-[#2E4F42]/50 bg-[#2E4F42]/5 hover:bg-[#2E4F42]/15 text-xs flex items-center justify-between transition-colors"
                        >
                          <span className="flex items-center gap-2 font-medium">
                            <Bike className="w-3.5 h-3.5 text-[#2E4F42] dark:text-[#97BAAA]" />
                            + Sumar Cuatrimoto 4x4 en Cabaña (Día 2)
                          </span>
                          <span className="font-mono font-bold text-[#2E4F42] dark:text-[#97BAAA]">
                            +$1,850
                          </span>
                        </button>
                      )}
                    </div>
                  )}

                  {/* Promo Code Box */}
                  {!effectiveDiscount && (
                    <form onSubmit={handleApplyPromo} className="pt-2">
                      <div className="flex items-center gap-2">
                        <div className="relative flex-1">
                          <Tag className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            placeholder="Código (Usa: BOSQUE15)"
                            value={promoInput}
                            onChange={(e) => setPromoInput(e.target.value)}
                            className="w-full pl-8 pr-3 py-2 rounded-xl bg-white dark:bg-[#192520] border border-black/10 dark:border-white/10 text-xs font-mono uppercase focus:outline-none focus:border-[#D15B2E]"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setPromoInput('BOSQUE15');
                            setDiscountApplied(true);
                          }}
                          className="px-3 py-2 rounded-xl bg-[#1C1B19] dark:bg-white/15 text-white text-xs font-semibold hover:bg-[#D15B2E] transition-colors whitespace-nowrap"
                        >
                          Aplicar -15%
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Summary & Launch 4-Step Checkout Wizard Button */}
            {items.length > 0 && (
              <div className="mt-6 pt-4 border-t border-black/10 dark:border-white/10 space-y-3">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-neutral-500">
                    <span>Subtotal ({items.length} experiencias)</span>
                    <span className="font-mono">
                      ${subtotal.toLocaleString('es-MX')} MXN
                    </span>
                  </div>
                  {effectiveDiscount && (
                    <div className="flex justify-between text-[#2E4F42] dark:text-[#97BAAA] font-semibold">
                      <span>
                        {isFullCombo
                          ? 'Beneficio Trilogía Káab (-15%)'
                          : 'Descuento BOSQUE15 (-15%)'}
                      </span>
                      <span className="font-mono">
                        -${discountAmount.toLocaleString('es-MX')} MXN
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-baseline text-base font-bold pt-1">
                    <span>Total a Pagar</span>
                    <span className="font-mono text-xl text-[#D15B2E]">
                      ${finalTotal.toLocaleString('es-MX')} MXN
                    </span>
                  </div>
                  <span className="block text-[11px] text-[#2E4F42] dark:text-[#97BAAA] font-mono">
                    Opción de apartar hoy con 50% ($
                    {Math.round(finalTotal * 0.5).toLocaleString('es-MX')} MXN)
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => onProceedToCheckout(effectiveDiscount)}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#D15B2E] to-[#B84620] text-white font-semibold text-sm shadow-lg shadow-[#D15B2E]/30 flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Ir a Registro y Pasarela de Pago</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>

                <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-neutral-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2E4F42]" />
                  <span>Simulador interactivo en 4 pasos · Sin cobro real</span>
                </div>
              </div>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
