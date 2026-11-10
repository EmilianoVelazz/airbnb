import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  QrCode,
  KeyRound,
  Calendar,
  CheckCircle2,
  Trees,
  Sparkles
} from 'lucide-react';

export default function MyTripsModal({ isOpen, onClose, bookings }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl rounded-3xl bg-[#F7F4EF] dark:bg-[#131C18] text-[#1C1B19] dark:text-white border border-black/10 dark:border-white/15 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/10">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#D15B2E]">
                HISTORIAL DE RESERVAS Y PASES QR
              </span>
              <h3 className="font-serif text-3xl font-bold">
                Mis Viajes Confirmados ({bookings.length})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center hover:bg-[#D15B2E] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {bookings.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <Trees className="w-10 h-10 text-[#D15B2E] mx-auto" />
              <h4 className="font-serif text-2xl font-bold">
                Aún no tienes reservas confirmadas
              </h4>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                Abre el botón "Mi Expedición" y sigue los pasos del simulador de registro y pago para generar tu primer pase digital con código QR.
              </p>
            </div>
          ) : (
            <div className="mt-5 space-y-4">
              {bookings.map((b) => (
                <div
                  key={b.folio}
                  className="p-5 rounded-3xl bg-white dark:bg-[#18241F] border border-[#2E4F42] shadow-lg space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-black/10 dark:border-white/10">
                    <div>
                      <span className="text-[10px] font-mono text-[#2E4F42] dark:text-[#97BAAA] font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        CONFIRMADO · FOLIO #{b.folio}
                      </span>
                      <h4 className="font-serif text-2xl font-bold mt-0.5">
                        Titular: {b.guestName}
                      </h4>
                    </div>
                    <div className="text-right font-mono text-xs">
                      <span className="text-neutral-500 block">
                        {b.checkIn} → {b.checkOut}
                      </span>
                      <span className="font-bold text-[#D15B2E]">
                        Pagado: ${b.amountDueToday.toLocaleString('es-MX')} MXN
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                    <div className="sm:col-span-8 space-y-2 text-xs">
                      <div className="p-3 rounded-2xl bg-[#F7F4EF] dark:bg-black/30 flex items-center justify-between">
                        <span className="font-mono text-neutral-500 flex items-center gap-1.5">
                          <KeyRound className="w-4 h-4 text-[#D15B2E]" />
                          PIN Cerradura Cabaña:
                        </span>
                        <span className="font-mono text-lg font-bold text-[#D15B2E] tracking-widest">
                          {b.lockPin}
                        </span>
                      </div>

                      <div className="space-y-1">
                        {b.items.map((it) => (
                          <div
                            key={it.uid}
                            className="flex justify-between text-[11px]"
                          >
                            <span className="font-semibold truncate">
                              • {it.title}
                            </span>
                            <span className="font-mono text-neutral-500">
                              ${it.price.toLocaleString('es-MX')}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="sm:col-span-4 p-3 rounded-2xl bg-[#F7F4EF] dark:bg-white text-[#1C1B19] flex flex-col items-center justify-center">
                      <QrCode className="w-16 h-16" />
                      <span className="text-[9px] font-mono font-bold mt-1">
                        PASE QR ACTIVO
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
