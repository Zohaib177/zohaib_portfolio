import { motion, useReducedMotion } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'
import { personalData } from '../../data/personalData.js'

const defaultMessage = 'Assalam-o-Alaikum Zohaib, I visited your portfolio and would like to talk.'

function FloatingWhatsApp() {
  const shouldReduceMotion = useReducedMotion()
  const phoneNumber = personalData.whatsappNumber?.replace(/\D/g, '')

  if (!phoneNumber) return null

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`

  return (
    <aside className="fixed right-4 bottom-4 z-[100] sm:right-6 sm:bottom-6" aria-label="WhatsApp contact">
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={shouldReduceMotion ? false : { opacity: 0, x: 48 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.45, delay: shouldReduceMotion ? 0 : 0.45 }}
        whileHover={shouldReduceMotion ? undefined : { x: -5, scale: 1.025 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
        className="focus-ring group inline-flex min-h-14 items-center gap-3 rounded-full border border-accent/35 bg-[#080a0b] py-2.5 pr-5 pl-3 text-sm font-bold tracking-[0.12em] text-white uppercase shadow-[0_12px_32px_rgb(0_0_0/0.48),0_0_28px_rgb(212_173_104/0.16)] transition-[border-color,box-shadow] hover:border-accent/70 hover:shadow-[0_14px_38px_rgb(0_0_0/0.52),0_0_34px_rgb(212_173_104/0.24)]"
        aria-label="Talk to Zohaib on WhatsApp"
      >
        <span className="relative flex size-9 items-center justify-center rounded-full bg-[#25d366] text-2xl text-white shadow-[0_0_0_4px_rgb(37_211_102/0.12)]">
          <FaWhatsapp aria-hidden="true" />
          <span
            aria-hidden="true"
            className="absolute inset-0 -z-10 rounded-full bg-[#25d366]/35 motion-safe:animate-ping"
          />
        </span>
        <span>Talk to Us</span>
      </motion.a>
    </aside>
  )
}

export default FloatingWhatsApp
