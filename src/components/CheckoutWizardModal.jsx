import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  User,
  Mail,
  Phone,
  CreditCard,
  Building2,
  Smartphone,
  ShieldCheck,
  Lock,
  CheckCircle2,
  Sparkles,
  Calendar,
  Clock,
  KeyRound,
  QrCode,
  ArrowRight,
  ArrowLeft,
  Check,
  Trees,
  Flame,
  Bike,
  Loader2
} from 'lucide-react';

export default function CheckoutWizardModal({
  isOpen,
  onClose,
  items,
  searchFilters,
  currentUser,
  discountApplied,
  onCompleteBooking
}) {
  const [step, setStep] = useState(1); // 1: Registro/Datos, 2: Plan de Pago, 3: Pasarela Pago, 4: Pase Confirmado
  const [isProcessing, setIsProcessing] = useState(false);

  // Step 1: Guest & Arrival State
  const [fullName, setFullName] = useState(
    currentUser?.name || 'Jonathan Emir López'
  );
  const [email, setEmail] = useState(
    currentUser?.email || 'jonathan.kaab@bosque.mx'
  );
  const [phone, setPhone] = useState(
    currentUser?.phone || '+52 55 4829 1042'
  );
  const [city, setCity] = useState('Ciudad de México');
  const [arrivalWindow, setArrivalWindow] = useState(
    '15:00 - 17:00 hrs (Luz de tarde)'
  );
  const [fireplaceReady, setFireplaceReady] = useState(true);
  const [motoWaiverAccepted, setMotoWaiverAccepted] = useState(true);

  // Step 2: Payment Plan State ('full' | 'half' | 'msi3' | 'msi6')
  const [paymentPlan, setPaymentPlan] = useState('half');

  // Step 3: Payment Method State ('card' | 'spei' | 'wallet')
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('4532 8910 4421 8894');
  const [cardHolder, setCardHolder] = useState('JONATHAN EMIR LOPEZ');
  const [cardExpiry, setCardExpiry] = useState('09/29');
  const [cardCvv, setCardCvv] = useState('842');
  const [isCvvFocused, setIsCvvFocused] = useState(false);

  // Confirmed Pass Data
  const [confirmedPass, setConfirmedPass] = useState(null);

  if (!isOpen) return null;

  const hasCabin = items.some((i) => i.type === 'cabin');
  const hasTemazcal = items.some((i) => i.type === 'temazcal');
  const hasMoto = items.some((i) => i.type === 'moto');
  const isFullCombo = hasCabin && hasTemazcal && hasMoto;

  const subtotal = items.reduce((acc, item) => acc + item.price, 0);
  const hasDiscount = discountApplied || isFullCombo;
  const discountAmount = hasDiscount ? Math.round(subtotal * 0.15) : 0;
  const grandTotal = subtotal - discountAmount;

  const amountDueToday =
    paymentPlan === 'half'
      ? Math.round(grandTotal * 0.5)
      : paymentPlan === 'msi3'
      ? Math.round(grandTotal / 3)
      : paymentPlan === 'msi6'
      ? Math.round(grandTotal / 6)
      : grandTotal;

  const amountRemaining =
    paymentPlan === 'half' ? grandTotal - amountDueToday : 0;

  const formatCardNumber = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const handleFillTestCard = () => {
    setCardNumber('5412 7534 9012 3488');
    setCardHolder((fullName || 'JONATHAN EMIR LOPEZ').toUpperCase());
    setCardExpiry('11/30');
    setCardCvv('917');
  };

  const handleSimulatePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const generatedPass = {
        folio: `HG-ZAC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        lockPin: `*${Math.floor(1000 + Math.random() * 8999)}#`,
        guestName: fullName,
        email,
        phone,
        checkIn: searchFilters?.checkIn || 'Vie 13 Nov',
        checkOut: searchFilters?.checkOut || 'Dom 15 Nov',
        nights: searchFilters?.nights || 2,
        arrivalWindow,
        paymentPlan,
        paymentMethod,
        grandTotal,
        amountDueToday,
        amountRemaining,
        items: [...items],
        createdAt: new Date().toLocaleTimeString('es-MX', {
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      setIsProcessing(false);
      setConfirmedPass(generatedPass);
      setStep(4);
      if (onCompleteBooking) {
        onCompleteBooking(generatedPass);
      }
    }, 1700);
  };

  const STEPS = [
    { num: 1, label: '1. Registro y Huéspedes' },
    { num: 2, label: '2. Plan de Pago' },
    { num: 3, label: '3. Método de Pago' },
    { num: 4, label: '4. Pase QR Confirmado' }
  ];

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
          className="relative w-full max-w-5xl rounded-3xl bg-[#F7F4EF] dark:bg-[#121B17] text-[#1C1B19] dark:text-white border border-black/10 dark:border-white/15 shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col"
        >
          {/* Top Wizard Header & Stepper */}
          <div className="px-6 py-4 bg-white dark:bg-[#16221D] border-b border-black/8 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#D15B2E] flex items-center gap-1.5">
                <Lock className="w-3 h-3" />
                HOTEL GUERRERO ZACATLÁN · CHECKOUT SEGURO SIMULADO
              </span>
              <h2 className="font-serif text-2xl font-bold">
                Confirmación y Pago · Hotel Guerrero, Zacatlán
              </h2>
            </div>

            {/* Step Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {STEPS.map((s) => {
                const isActive = step === s.num;
                const isDone = step > s.num;
                return (
                  <button
                    key={s.num}
                    disabled={step === 4 || s.num > step}
                    onClick={() => s.num < step && setStep(s.num)}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-mono font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#D15B2E] text-white shadow'
                        : isDone
                        ? 'bg-[#2E4F42] text-white cursor-pointer'
                        : 'bg-black/5 dark:bg-white/10 text-neutral-400'
                    }`}
                  >
                    {isDone && <Check className="w-3 h-3" />}
                    <span>{s.label}</span>
                  </button>
                );
              })}

              <button
                onClick={onClose}
                className="ml-2 w-8 h-8 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center hover:bg-[#D15B2E] hover:text-white transition-colors shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Wizard Body */}
          <div className="overflow-y-auto p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left 7 Cols: Active Step Form */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                {/* STEP 1: GUEST REGISTRATION & CHECK-IN PREFERENCES */}
                {step === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 18 }}
                    className="space-y-5"
                  >
                    <div>
                      <span className="text-xs font-mono uppercase text-[#D15B2E]">
                        PASO 1 DE 3 · DATOS DEL TITULAR Y REGISTRO
                      </span>
                      <h3 className="font-serif text-3xl font-bold mt-1">
                        ¿A nombre de quién emitimos el pase y PIN de cabaña?
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="text-[11px] font-mono uppercase text-neutral-500 block mb-1">
                          Nombre Completo
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-white dark:bg-[#18241F] border border-black/10 dark:border-white/15 text-xs font-semibold focus:outline-none focus:border-[#D15B2E]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-mono uppercase text-neutral-500 block mb-1">
                          Correo Electrónico (Recibo y Mapa)
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-white dark:bg-[#18241F] border border-black/10 dark:border-white/15 text-xs font-semibold focus:outline-none focus:border-[#D15B2E]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-mono uppercase text-neutral-500 block mb-1">
                          WhatsApp (Para clave de cerradura)
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-white dark:bg-[#18241F] border border-black/10 dark:border-white/15 text-xs font-semibold focus:outline-none focus:border-[#D15B2E]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-mono uppercase text-neutral-500 block mb-1">
                          Ciudad desde donde nos visitas
                        </label>
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#18241F] border border-black/10 dark:border-white/15 text-xs font-semibold focus:outline-none focus:border-[#D15B2E]"
                        />
                      </div>
                    </div>

                    {/* Arrival Window & Cabin Preparation */}
                    <div className="p-4 rounded-2xl bg-white dark:bg-[#18241F] border border-black/8 dark:border-white/10 space-y-3">
                      <label className="text-xs font-bold flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-[#D15B2E]" />
                        Horario estimado de llegada al bosque ({searchFilters?.checkIn}):
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {[
                          '15:00 - 17:00 hrs (Luz de tarde)',
                          '17:00 - 19:00 hrs (Crepúsculo)',
                          'Después de 19:00 hrs (Autónomo)'
                        ].map((win) => (
                          <button
                            key={win}
                            type="button"
                            onClick={() => setArrivalWindow(win)}
                            className={`p-2.5 rounded-xl text-left text-[11px] font-medium border transition-all ${
                              arrivalWindow === win
                                ? 'bg-[#D15B2E]/15 border-[#D15B2E] font-bold'
                                : 'border-black/10 dark:border-white/10 opacity-75'
                            }`}
                          >
                            {win}
                          </button>
                        ))}
                      </div>

                      {/* Checkboxes for Fireplace & Moto Waiver */}
                      <div className="pt-2 space-y-2 border-t border-black/5 dark:border-white/10">
                        <label
                          onClick={() => setFireplaceReady(!fireplaceReady)}
                          className="flex items-center gap-2.5 text-xs cursor-pointer"
                        >
                          <span
                            className={`w-5 h-5 rounded-md flex items-center justify-center ${
                              fireplaceReady
                                ? 'bg-[#2E4F42] text-white'
                                : 'border border-neutral-400'
                            }`}
                          >
                            {fireplaceReady && <Check className="w-3.5 h-3.5" />}
                          </span>
                          <span>
                            Encender chimenea de leña y calentar tina a 39°C dos horas antes de mi llegada (Sin costo)
                          </span>
                        </label>

                        <label
                          onClick={() =>
                            setMotoWaiverAccepted(!motoWaiverAccepted)
                          }
                          className="flex items-center gap-2.5 text-xs cursor-pointer"
                        >
                          <span
                            className={`w-5 h-5 rounded-md flex items-center justify-center ${
                              motoWaiverAccepted
                                ? 'bg-[#2E4F42] text-white'
                                : 'border border-neutral-400'
                            }`}
                          >
                            {motoWaiverAccepted && (
                              <Check className="w-3.5 h-3.5" />
                            )}
                          </span>
                          <span>
                            Acepto reglamento de senderos off-road y uso de casco certificado incluido
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => setStep(2)}
                        className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#D15B2E] to-[#B84620] text-white text-xs font-semibold shadow-lg shadow-[#D15B2E]/30 flex items-center gap-2"
                      >
                        <span>Continuar al Plan de Pago</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: AIRBNB-STYLE PAYMENT PLAN */}
                {step === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 18 }}
                    className="space-y-5"
                  >
                    <div>
                      <span className="text-xs font-mono uppercase text-[#D15B2E]">
                        PASO 2 DE 3 · MODALIDAD DE PAGO ESTILO AIRBNB
                      </span>
                      <h3 className="font-serif text-3xl font-bold mt-1">
                        Elige cómo prefieres dividir tu pago
                      </h3>
                    </div>

                    <div className="space-y-3">
                      {/* Option 1: Pay 50% Now, 50% Later */}
                      <div
                        onClick={() => setPaymentPlan('half')}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start justify-between gap-4 ${
                          paymentPlan === 'half'
                            ? 'bg-[#D15B2E]/10 border-[#D15B2E]'
                            : 'bg-white dark:bg-[#18241F] border-black/10 dark:border-white/10'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold">
                              Paga 50% hoy y el resto al llegar
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-[#D15B2E] text-white text-[10px] font-mono">
                              Favorito Airbnb
                            </span>
                          </div>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                            Aparta tu cabaña, temazcal y motos pagando hoy{' '}
                            <strong>
                              ${Math.round(grandTotal * 0.5).toLocaleString('es-MX')} MXN
                            </strong>
                            . El otro 50% se cubre al hacer check-in sin intereses.
                          </p>
                        </div>
                        <span className="font-mono text-base font-bold text-[#D15B2E] shrink-0">
                          ${Math.round(grandTotal * 0.5).toLocaleString('es-MX')} hoy
                        </span>
                      </div>

                      {/* Option 2: Pay 100% Full */}
                      <div
                        onClick={() => setPaymentPlan('full')}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start justify-between gap-4 ${
                          paymentPlan === 'full'
                            ? 'bg-[#D15B2E]/10 border-[#D15B2E]'
                            : 'bg-white dark:bg-[#18241F] border-black/10 dark:border-white/10'
                        }`}
                      >
                        <div>
                          <div className="text-sm font-bold">
                            Liquidar el 100% de la estancia hoy
                          </div>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                            Un solo pago total sin saldos pendientes para entrar directo con tu código autónomo.
                          </p>
                        </div>
                        <span className="font-mono text-base font-bold shrink-0">
                          ${grandTotal.toLocaleString('es-MX')} hoy
                        </span>
                      </div>

                      {/* Option 3: 3 MSI */}
                      <div
                        onClick={() => setPaymentPlan('msi3')}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start justify-between gap-4 ${
                          paymentPlan === 'msi3'
                            ? 'bg-[#D15B2E]/10 border-[#D15B2E]'
                            : 'bg-white dark:bg-[#18241F] border-black/10 dark:border-white/10'
                        }`}
                      >
                        <div>
                          <div className="text-sm font-bold">
                            3 Meses Sin Intereses con Tarjetas Participantes
                          </div>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                            3 pagos mensuales fijos de{' '}
                            <strong>
                              ${Math.round(grandTotal / 3).toLocaleString('es-MX')} MXN
                            </strong>{' '}
                            (0% CAT informativo).
                          </p>
                        </div>
                        <span className="font-mono text-base font-bold shrink-0">
                          3x ${Math.round(grandTotal / 3).toLocaleString('es-MX')}
                        </span>
                      </div>

                      {/* Option 4: 6 MSI */}
                      <div
                        onClick={() => setPaymentPlan('msi6')}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start justify-between gap-4 ${
                          paymentPlan === 'msi6'
                            ? 'bg-[#D15B2E]/10 border-[#D15B2E]'
                            : 'bg-white dark:bg-[#18241F] border-black/10 dark:border-white/10'
                        }`}
                      >
                        <div>
                          <div className="text-sm font-bold">
                            6 Meses Sin Intereses
                          </div>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                            6 pagos mensuales de{' '}
                            <strong>
                              ${Math.round(grandTotal / 6).toLocaleString('es-MX')} MXN
                            </strong>
                            .
                          </p>
                        </div>
                        <span className="font-mono text-base font-bold shrink-0">
                          6x ${Math.round(grandTotal / 6).toLocaleString('es-MX')}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-4 py-3 rounded-2xl border border-black/15 dark:border-white/15 text-xs font-semibold flex items-center gap-1.5"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Volver a Datos</span>
                      </button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => setStep(3)}
                        className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#D15B2E] to-[#B84620] text-white text-xs font-semibold shadow-lg shadow-[#D15B2E]/30 flex items-center gap-2"
                      >
                        <span>Ir a Método de Pago</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: INTERACTIVE 3D CREDIT CARD / SPEI / WALLET */}
                {step === 3 && (
                  <motion.form
                    key="step-3"
                    onSubmit={handleSimulatePayment}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 18 }}
                    className="space-y-5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <span className="text-xs font-mono uppercase text-[#D15B2E]">
                          PASO 3 DE 3 · PASARELA DE PAGO (BOCETO INTERACTIVO)
                        </span>
                        <h3 className="font-serif text-3xl font-bold mt-0.5">
                          Selecciona tu método de pago
                        </h3>
                      </div>

                      <button
                        type="button"
                        onClick={handleFillTestCard}
                        className="px-3 py-1.5 rounded-xl bg-[#D15B2E]/15 text-[#D15B2E] text-[11px] font-mono font-bold hover:bg-[#D15B2E]/25 transition-colors"
                      >
                        ⚡ Usar otra Tarjeta Demo
                      </button>
                    </div>

                    {/* Method Switcher Tabs */}
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        {
                          id: 'card',
                          label: 'Tarjeta Crédito / Débito',
                          icon: CreditCard
                        },
                        {
                          id: 'spei',
                          label: 'Transferencia SPEI',
                          icon: Building2
                        },
                        {
                          id: 'wallet',
                          label: 'Apple Pay / MercadoPago',
                          icon: Smartphone
                        }
                      ].map((m) => {
                        const Icon = m.icon;
                        const active = paymentMethod === m.id;
                        return (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => setPaymentMethod(m.id)}
                            className={`p-3 rounded-2xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                              active
                                ? 'bg-[#1C1B19] dark:bg-[#D15B2E] text-white border-transparent shadow-md'
                                : 'bg-white dark:bg-[#18241F] border-black/10 dark:border-white/10 text-neutral-600 dark:text-neutral-300'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                            <span className="text-center text-[11px]">
                              {m.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* IF CARD SELECTED: Interactive 3D Card Visual + Inputs */}
                    {paymentMethod === 'card' && (
                      <div className="space-y-4">
                        {/* Interactive Visual Credit Card */}
                        <motion.div
                          animate={{ rotateY: isCvvFocused ? 180 : 0 }}
                          transition={{ duration: 0.55 }}
                          className="relative h-40 sm:h-44 w-full max-w-md mx-auto rounded-3xl p-4 sm:p-6 text-white shadow-2xl overflow-hidden bg-gradient-to-br from-[#1B2A23] via-[#0F1714] to-[#D15B2E]/85 border border-white/20 flex flex-col justify-between"
                        >
                          {!isCvvFocused ? (
                            <>
                              <div className="flex items-center justify-between gap-2">
                                <span className="font-serif text-sm sm:text-lg tracking-wider font-bold truncate">
                                  HOTEL GUERRERO · VIP PASS
                                </span>
                                <span className="font-mono text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 rounded-full bg-white/15 border border-white/20 shrink-0">
                                  VISA / MC
                                </span>
                              </div>

                              <div className="font-mono text-base sm:text-2xl tracking-[0.12em] sm:tracking-[0.18em] font-bold my-auto truncate">
                                {cardNumber || '•••• •••• •••• ••••'}
                              </div>

                              <div className="flex items-end justify-between text-xs font-mono">
                                <div>
                                  <span className="text-[9px] text-white/60 block">
                                    TITULAR DE LA TARJETA
                                  </span>
                                  <span className="uppercase font-semibold">
                                    {cardHolder || 'NOMBRE DEL TITULAR'}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-[9px] text-white/60 block">
                                    VENCE
                                  </span>
                                  <span className="font-semibold">
                                    {cardExpiry || 'MM/AA'}
                                  </span>
                                </div>
                              </div>
                            </>
                          ) : (
                            <div
                              style={{ transform: 'scaleX(-1)' }}
                              className="h-full flex flex-col justify-between"
                            >
                              <div className="w-full h-9 bg-black/80 -mx-6 mt-2" />
                              <div className="flex items-center justify-end gap-3 bg-white/20 p-2.5 rounded-xl">
                                <span className="text-[10px] font-mono uppercase">
                                  Código CVV de Seguridad:
                                </span>
                                <span className="px-3 py-1 rounded bg-white text-black font-mono font-bold text-sm">
                                  {cardCvv || '•••'}
                                </span>
                              </div>
                              <span className="text-[10px] font-mono text-white/60">
                                Transacción cifrada 256-bit (Modo Boceto Sin Cargo)
                              </span>
                            </div>
                          )}
                        </motion.div>

                        {/* Card Inputs */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="sm:col-span-2">
                            <label className="text-[11px] font-mono uppercase text-neutral-500 block mb-1">
                              Número de Tarjeta (16 dígitos)
                            </label>
                            <input
                              type="text"
                              required
                              value={cardNumber}
                              onChange={(e) =>
                                setCardNumber(formatCardNumber(e.target.value))
                              }
                              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#18241F] border border-black/10 dark:border-white/15 font-mono text-xs font-bold focus:outline-none focus:border-[#D15B2E]"
                            />
                          </div>

                          <div>
                            <label className="text-[11px] font-mono uppercase text-neutral-500 block mb-1">
                              Nombre en la Tarjeta
                            </label>
                            <input
                              type="text"
                              required
                              value={cardHolder}
                              onChange={(e) =>
                                setCardHolder(e.target.value.toUpperCase())
                              }
                              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#18241F] border border-black/10 dark:border-white/15 font-mono text-xs uppercase focus:outline-none focus:border-[#D15B2E]"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[11px] font-mono uppercase text-neutral-500 block mb-1">
                                Expiración
                              </label>
                              <input
                                type="text"
                                required
                                placeholder="MM/AA"
                                maxLength={5}
                                value={cardExpiry}
                                onChange={(e) => setCardExpiry(e.target.value)}
                                className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-[#18241F] border border-black/10 dark:border-white/15 font-mono text-xs text-center focus:outline-none focus:border-[#D15B2E]"
                              />
                            </div>
                            <div>
                              <label className="text-[11px] font-mono uppercase text-neutral-500 block mb-1">
                                CVV (Gira tarjeta)
                              </label>
                              <input
                                type="text"
                                required
                                maxLength={4}
                                value={cardCvv}
                                onFocus={() => setIsCvvFocused(true)}
                                onBlur={() => setIsCvvFocused(false)}
                                onChange={(e) => setCardCvv(e.target.value)}
                                className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-[#18241F] border border-black/10 dark:border-white/15 font-mono text-xs text-center focus:outline-none focus:border-[#D15B2E]"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* IF SPEI SELECTED */}
                    {paymentMethod === 'spei' && (
                      <div className="p-5 rounded-2xl bg-white dark:bg-[#18241F] border border-black/10 dark:border-white/10 space-y-3 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-mono uppercase text-[#2E4F42] dark:text-[#97BAAA] font-bold">
                            CLABE INTERBANCARIA ÚNICA (STP / KÁAB)
                          </span>
                          <span className="px-2 py-0.5 rounded bg-[#2E4F42]/20 text-[#2E4F42] dark:text-[#97BAAA] font-mono text-[10px]">
                            Confirmación inmediata
                          </span>
                        </div>
                        <div className="p-3 rounded-xl bg-[#F7F4EF] dark:bg-black/30 font-mono text-base font-bold tracking-wider text-center select-all">
                          6461 8015 7042 8910 42
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-neutral-500">
                          <div>
                            Beneficiario:{' '}
                            <strong className="text-[#1C1B19] dark:text-white">
                              Káab Refugios S.A.
                            </strong>
                          </div>
                          <div>
                            Concepto:{' '}
                            <strong className="text-[#1C1B19] dark:text-white font-mono">
                              RESERVA-{Math.floor(100 + Math.random() * 899)}
                            </strong>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* IF WALLET SELECTED */}
                    {paymentMethod === 'wallet' && (
                      <div className="p-6 rounded-2xl bg-white dark:bg-[#18241F] border border-black/10 dark:border-white/10 text-center space-y-3">
                        <Smartphone className="w-10 h-10 text-[#D15B2E] mx-auto" />
                        <h4 className="font-serif text-2xl font-bold">
                          Pago Rápido 1-Clic con Biometría Simulada
                        </h4>
                        <p className="text-xs text-neutral-500 max-w-md mx-auto">
                          Al presionar el botón de abajo se simulará la autorización instantánea con Apple Pay / Mercado Pago sin realizar ningún cobro real.
                        </p>
                      </div>
                    )}

                    {/* Submit Payment CTA */}
                    <div className="flex items-center justify-between pt-3">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="px-4 py-3 rounded-2xl border border-black/15 dark:border-white/15 text-xs font-semibold flex items-center gap-1.5"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Atrás</span>
                      </button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.96 }}
                        disabled={isProcessing}
                        type="submit"
                        className="px-7 py-4 rounded-2xl bg-gradient-to-r from-[#2E4F42] to-[#1E3A2F] hover:from-[#D15B2E] hover:to-[#B84620] text-white text-xs sm:text-sm font-bold shadow-xl flex items-center gap-2.5 transition-all"
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Autorizando y Generando Pase QR...</span>
                          </>
                        ) : (
                          <>
                            <ShieldCheck className="w-4 h-4" />
                            <span>
                              Simular Pago de $
                              {amountDueToday.toLocaleString('es-MX')} MXN y
                              Confirmar
                            </span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </motion.form>
                )}

                {/* STEP 4: DIGITAL BOARDING PASS & SMART LOCK PIN */}
                {step === 4 && confirmedPass && (
                  <motion.div
                    key="step-4"
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-5"
                  >
                    <div className="p-6 rounded-3xl bg-gradient-to-br from-[#16231D] to-[#0D1512] text-white border border-[#2E4F42] shadow-2xl space-y-5">
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/15">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-[#2E4F42] text-[#97BAAA] flex items-center justify-center">
                            <CheckCircle2 className="w-7 h-7" />
                          </div>
                          <div>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-[#E9A789]">
                              RESERVA CONFIRMADA · PASE DIGITAL DE MONTAÑA
                            </span>
                            <h3 className="font-serif text-3xl font-bold">
                              ¡Nos vemos en el bosque, {confirmedPass.guestName}!
                            </h3>
                          </div>
                        </div>

                        <span className="px-3 py-1.5 rounded-xl bg-white/10 font-mono text-xs font-bold text-[#E9A789] border border-white/15">
                          FOLIO #{confirmedPass.folio}
                        </span>
                      </div>

                      {/* Smart Lock PIN + Simulated QR Code */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                        <div className="sm:col-span-7 space-y-3">
                          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between">
                            <div>
                              <span className="text-[10px] font-mono uppercase text-white/60 flex items-center gap-1">
                                <KeyRound className="w-3.5 h-3.5 text-[#D15B2E]" />
                                PIN DE CERRADURA INTELIGENTE CABAÑA
                              </span>
                              <span className="font-mono text-2xl font-bold text-[#E9A789] tracking-widest mt-1 block">
                                {confirmedPass.lockPin}
                              </span>
                            </div>
                            <span className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-[#2E4F42] text-white">
                              Activo desde {confirmedPass.checkIn}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-2.5 text-xs font-mono">
                            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                              <span className="text-[10px] text-white/50 block">
                                CHECK-IN / CHECK-OUT
                              </span>
                              <span className="font-bold">
                                {confirmedPass.checkIn} → {confirmedPass.checkOut}
                              </span>
                            </div>
                            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                              <span className="text-[10px] text-white/50 block">
                                PAGADO HOY (SIMULADO)
                              </span>
                              <span className="font-bold text-[#97BAAA]">
                                ${confirmedPass.amountDueToday.toLocaleString('es-MX')}{' '}
                                MXN
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Simulated QR Boarding Pass Box */}
                        <div className="sm:col-span-5 p-4 rounded-2xl bg-white text-[#1C1B19] flex flex-col items-center justify-center text-center">
                          <QrCode className="w-24 h-24 text-[#1C1B19]" />
                          <span className="font-mono text-[10px] font-bold uppercase tracking-wider mt-2">
                            PASE BASECAMP MOTO & TEMAZCAL
                          </span>
                          <span className="text-[10px] text-neutral-500">
                            Muestra este código al guía
                          </span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-white/15 flex flex-wrap items-center justify-between gap-3">
                        <span className="text-xs text-white/70">
                          Tu pase quedó guardado en la sección{' '}
                          <strong>"Mis Viajes"</strong> de la barra superior.
                        </span>
                        <button
                          type="button"
                          onClick={onClose}
                          className="px-6 py-3 rounded-xl bg-[#D15B2E] text-white text-xs font-semibold hover:bg-[#B84620] transition-colors"
                        >
                          Finalizar y Volver a la Página
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right 5 Cols: Persistent Order Summary & Breakdown */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-white dark:bg-[#18241F] border border-black/10 dark:border-white/10 p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-black/10 dark:border-white/10">
                  <h4 className="font-serif text-xl font-bold">
                    Resumen de tu Expedición
                  </h4>
                  <span className="text-xs font-mono text-[#D15B2E] font-semibold">
                    {searchFilters?.checkIn} → {searchFilters?.checkOut}
                  </span>
                </div>

                {/* Items List */}
                <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div
                      key={item.uid}
                      className="flex items-center gap-3 p-2.5 rounded-2xl bg-[#F7F4EF] dark:bg-black/25"
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-12 h-12 rounded-xl object-cover shrink-0"
                        />
                      )}
                      <div className="min-w-0 flex-1">
                        <span className="text-[9px] font-mono uppercase text-[#D15B2E] block">
                          {item.categoryLabel}
                        </span>
                        <div className="text-xs font-bold truncate">
                          {item.title}
                        </div>
                      </div>
                      <span className="font-mono text-xs font-bold shrink-0">
                        ${item.price.toLocaleString('es-MX')}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price Math */}
                <div className="pt-3 border-t border-black/10 dark:border-white/10 space-y-2 text-xs">
                  <div className="flex justify-between text-neutral-500">
                    <span>Subtotal Experiencias</span>
                    <span className="font-mono">
                      ${subtotal.toLocaleString('es-MX')} MXN
                    </span>
                  </div>

                  {hasDiscount && (
                    <div className="flex justify-between text-[#2E4F42] dark:text-[#97BAAA] font-semibold">
                      <span>Descuento Trilogía / BOSQUE15 (-15%)</span>
                      <span className="font-mono">
                        -${discountAmount.toLocaleString('es-MX')} MXN
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between text-neutral-500">
                    <span>Impuestos y leña de encino</span>
                    <span className="font-mono text-[#2E4F42] dark:text-[#97BAAA]">
                      INCLUIDO
                    </span>
                  </div>

                  <div className="pt-2 border-t border-black/10 dark:border-white/10 flex justify-between items-baseline font-bold text-sm">
                    <span>Total de la Reserva</span>
                    <span className="font-mono text-base">
                      ${grandTotal.toLocaleString('es-MX')} MXN
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#D15B2E]/10 border border-[#D15B2E]/30 flex justify-between items-center mt-2">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-[#D15B2E] block font-bold">
                        MONTO A PAGAR HOY ({paymentPlan.toUpperCase()})
                      </span>
                      {amountRemaining > 0 && (
                        <span className="text-[10px] text-neutral-500">
                          Restan ${amountRemaining.toLocaleString('es-MX')} al llegar
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-xl font-bold text-[#D15B2E]">
                      ${amountDueToday.toLocaleString('es-MX')} MXN
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
