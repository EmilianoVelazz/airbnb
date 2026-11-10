import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  User,
  Mail,
  Phone,
  Lock,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Trees,
  Flame,
  Bike,
  ArrowRight
} from 'lucide-react';

export default function AuthModal({
  isOpen,
  onClose,
  currentUser,
  onSuccessAuth,
  onLogout
}) {
  const [mode, setMode] = useState('register'); // 'register' | 'login'
  const [step, setStep] = useState(1); // 1: Form, 2: Verification & Preferences
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('4829');
  const [motoExp, setMotoExp] = useState('Intermedio · Cuatrimoto 4x4');
  const [temazcalPref, setTemazcalPref] = useState('Vapor Medio (45°C) · Copal y Romero');

  if (!isOpen) return null;

  const fillDemoUser = () => {
    setName('Jonathan Emir López');
    setEmail('jonathan.guerrero@zacatlan.mx');
    setPhone('+52 55 4829 1042');
    setPassword('••••••••••');
  };

  const handleStep1Submit = (e) => {
    e.preventDefault();
    if (mode === 'login') {
      onSuccessAuth({
        name: name || 'Jonathan Emir',
        email: email || 'viajero@kaab.mx',
        phone: phone || '+52 55 4829 1042',
        level: 'Explorador Cuarzo',
        motoExp,
        temazcalPref
      });
      onClose();
    } else {
      setStep(2);
    }
  };

  const handleCompleteRegistration = (e) => {
    e.preventDefault();
    onSuccessAuth({
      name: name || 'Jonathan Emir',
      email: email || 'viajero@kaab.mx',
      phone: phone || '+52 55 4829 1042',
      level: 'Miembro Fundador Káab',
      motoExp,
      temazcalPref
    });
    setStep(1);
    onClose();
  };

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
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', stiffness: 340, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-lg rounded-3xl bg-[#F7F4EF] dark:bg-[#131C18] text-[#1C1B19] dark:text-white border border-black/10 dark:border-white/15 shadow-2xl overflow-hidden p-6 sm:p-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center hover:bg-[#D15B2E] hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {currentUser ? (
            /* Logged-In User Profile View */
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D15B2E] to-[#98371C] text-white font-serif text-3xl font-bold flex items-center justify-center shadow-lg">
                  {currentUser.name[0]}
                </div>
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#2E4F42] text-[#97BAAA] text-[10px] font-mono uppercase">
                    ✓ {currentUser.level || 'Cuenta Verificada'}
                  </span>
                  <h3 className="font-serif text-2xl font-bold mt-1">
                    {currentUser.name}
                  </h3>
                  <p className="text-xs text-neutral-500 font-mono">
                    {currentUser.email} · {currentUser.phone}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-[#192520] border border-black/5 dark:border-white/10 space-y-2.5 text-xs">
                <div className="font-mono text-[10px] uppercase tracking-wider text-[#D15B2E]">
                  Preferencias Guardadas para tus Estancias:
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500 flex items-center gap-1.5">
                    <Bike className="w-3.5 h-3.5 text-[#2E4F42]" />
                    Perfil Off-Road:
                  </span>
                  <span className="font-semibold">{currentUser.motoExp}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500 flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-[#D15B2E]" />
                    Ritual Temazcal:
                  </span>
                  <span className="font-semibold">
                    {currentUser.temazcalPref}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 rounded-2xl bg-[#1C1B19] dark:bg-[#D15B2E] text-white text-xs font-semibold"
                >
                  Continuar Explorando
                </button>
                <button
                  onClick={() => {
                    onLogout();
                    onClose();
                  }}
                  className="px-4 py-3 rounded-2xl border border-red-500/30 text-red-500 text-xs font-semibold hover:bg-red-500/10"
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          ) : step === 1 ? (
            /* Step 1: Register or Login Form */
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-xl bg-[#D15B2E] text-white flex items-center justify-center">
                  <Trees className="w-4 h-4" />
                </div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#D15B2E]">
                  PASAPORTE HOTEL GUERRERO · ZACATLÁN, PUEBLA
                </span>
              </div>

              <h3 className="font-serif text-3xl font-bold">
                {mode === 'register'
                  ? 'Crea tu cuenta de viajero'
                  : 'Bienvenido de vuelta al bosque'}
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                Regístrate para recibir tu PIN de acceso a cabaña, responsiva digital de motos y beneficios de miembro.
              </p>

              {/* Mode Switch Tabs */}
              <div className="mt-4 p-1 rounded-2xl bg-black/5 dark:bg-white/5 grid grid-cols-2 gap-1">
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className={`py-2 rounded-xl text-xs font-semibold transition-all ${
                    mode === 'register'
                      ? 'bg-white dark:bg-[#192520] shadow text-[#1C1B19] dark:text-white'
                      : 'text-neutral-500'
                  }`}
                >
                  Crear Cuenta Nueva
                </button>
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className={`py-2 rounded-xl text-xs font-semibold transition-all ${
                    mode === 'login'
                      ? 'bg-white dark:bg-[#192520] shadow text-[#1C1B19] dark:text-white'
                      : 'text-neutral-500'
                  }`}
                >
                  Iniciar Sesión
                </button>
              </div>

              {/* 1-Click Auto-Fill Demo Button */}
              <button
                type="button"
                onClick={fillDemoUser}
                className="mt-4 w-full py-2 px-3 rounded-xl border border-dashed border-[#D15B2E]/60 bg-[#D15B2E]/10 text-[#D15B2E] text-xs font-mono font-semibold flex items-center justify-center gap-2 hover:bg-[#D15B2E]/20 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>⚡ Autocompletar Datos Demo en 1 Clic</span>
              </button>

              <form onSubmit={handleStep1Submit} className="mt-4 space-y-3">
                {mode === 'register' && (
                  <div>
                    <label className="text-[11px] font-mono uppercase text-neutral-500 block mb-1">
                      Nombre Completo (Titular de Reserva)
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="Ej. Jonathan Emir López"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#192520] border border-black/10 dark:border-white/15 text-xs focus:outline-none focus:border-[#D15B2E]"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-[11px] font-mono uppercase text-neutral-500 block mb-1">
                    Correo Electrónico
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="tu@correo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#192520] border border-black/10 dark:border-white/15 text-xs focus:outline-none focus:border-[#D15B2E]"
                    />
                  </div>
                </div>

                {mode === 'register' && (
                  <div>
                    <label className="text-[11px] font-mono uppercase text-neutral-500 block mb-1">
                      Teléfono WhatsApp (Para enviar PIN de cerradura y GPS)
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        placeholder="+52 55 1234 5678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#192520] border border-black/10 dark:border-white/15 text-xs focus:outline-none focus:border-[#D15B2E]"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-[11px] font-mono uppercase text-neutral-500 block mb-1">
                    Contraseña
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#192520] border border-black/10 dark:border-white/15 text-xs focus:outline-none focus:border-[#D15B2E]"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#D15B2E] to-[#B84620] text-white font-semibold text-xs shadow-lg shadow-[#D15B2E]/30 flex items-center justify-center gap-2 mt-2"
                >
                  <span>
                    {mode === 'register'
                      ? 'Continuar a Preferencias de Montaña'
                      : 'Ingresar a Mi Cuenta'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </form>
            </div>
          ) : (
            /* Step 2: SMS Verification & Mountain Preferences */
            <form onSubmit={handleCompleteRegistration} className="space-y-4">
              <div className="text-xs font-mono uppercase text-[#2E4F42] dark:text-[#97BAAA]">
                PASO 2 DE 2 · PERSONALIZACIÓN DE ESTANCIA
              </div>
              <h3 className="font-serif text-3xl font-bold">
                Configura tu experiencia en el bosque
              </h3>

              <div className="p-3.5 rounded-2xl bg-white dark:bg-[#192520] border border-black/10 dark:border-white/10">
                <label className="text-[11px] font-mono uppercase text-neutral-500 block mb-1">
                  Código de verificación enviado a {phone || 'tu WhatsApp'} (Simulado)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    className="w-32 px-3 py-2 rounded-xl bg-[#F7F4EF] dark:bg-black/30 font-mono text-sm font-bold tracking-widest text-center border border-[#2E4F42]"
                  />
                  <span className="text-xs text-[#2E4F42] dark:text-[#97BAAA] flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-4 h-4" />
                    Código pre-validado
                  </span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold block mb-1.5">
                  ¿Qué nivel de experiencia tienes para Renta de Motos?
                </label>
                <select
                  value={motoExp}
                  onChange={(e) => setMotoExp(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#192520] border border-black/10 dark:border-white/15 text-xs font-medium"
                >
                  <option value="Principiante · Cuatrimoto Automática 4x4">
                    Principiante · Prefiero Cuatrimoto Automática 4x4
                  </option>
                  <option value="Intermedio · Cuatrimoto o E-Moto Sur-Ron">
                    Intermedio · Cuatrimoto 4x4 o E-Moto Eléctrica
                  </option>
                  <option value="Avanzado · Scrambler Enduro 450cc con Clutch">
                    Avanzado · Scrambler Enduro 450cc con Clutch
                  </option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold block mb-1.5">
                  ¿Cómo prefieres tu ceremonia de Temazcal?
                </label>
                <select
                  value={temazcalPref}
                  onChange={(e) => setTemazcalPref(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#192520] border border-black/10 dark:border-white/15 text-xs font-medium"
                >
                  <option value="Vapor Suave (40°C) · Lavanda y Manzanilla">
                    Vapor Suave (40°C) · Relajación con Lavanda y Tila
                  </option>
                  <option value="Vapor Medio (45°C) · Copal y Romero">
                    Vapor Tradicional (45°C) · Copal Blanco, Pirul y Romero
                  </option>
                  <option value="Vapor Intenso (51°C) · 4 Puertas Completas">
                    Vapor Intenso (51°C) · 4 Puertas + Poza Fría de Manantial
                  </option>
                </select>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-3 rounded-2xl border border-black/15 dark:border-white/15 text-xs font-semibold"
                >
                  Atrás
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-[#D15B2E] to-[#B84620] text-white text-xs font-semibold shadow-lg shadow-[#D15B2E]/30"
                >
                  Completar Registro y Guardar Perfil
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
