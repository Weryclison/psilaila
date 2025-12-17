import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Instagram, Mail, MessageCircle, Heart, Star, ArrowDown, Sparkles, Menu, X } from 'lucide-react';

/* --- DECORATIVE ELEMENTS --- */

// WhatsApp Icon
const WhatsAppIcon = ({ size = 24, className = '' }) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// Torn paper SVG shapes
const TornEdge = ({ position = 'bottom', color = '#F0EBE3' }) => {
  const isTop = position === 'top';
  return (
    <svg 
      className={`absolute left-0 right-0 ${isTop ? 'top-0 rotate-180' : 'bottom-0'} w-full h-8 md:h-12`}
      preserveAspectRatio="none" 
      viewBox="0 0 100 10"
    >
      <path 
        d="M0,10 C5,8 8,10 12,9 C16,8 20,10 25,8 C30,6 35,10 40,7 C45,4 50,9 55,6 C60,3 65,8 70,5 C75,2 80,7 85,4 C90,1 95,6 100,3 L100,10 L0,10 Z" 
        fill={color}
      />
    </svg>
  );
};

// Flower decorations SVG
const FloralDecor = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="8" fill="#D4A84B" opacity="0.7"/>
    <ellipse cx="50" cy="35" rx="6" ry="12" fill="#E8C87A" opacity="0.8"/>
    <ellipse cx="50" cy="65" rx="6" ry="12" fill="#E8C87A" opacity="0.8"/>
    <ellipse cx="35" cy="50" rx="12" ry="6" fill="#E8C87A" opacity="0.8"/>
    <ellipse cx="65" cy="50" rx="12" ry="6" fill="#E8C87A" opacity="0.8"/>
    <ellipse cx="38" cy="38" rx="5" ry="10" fill="#F5E0A8" opacity="0.9" transform="rotate(-45 38 38)"/>
    <ellipse cx="62" cy="38" rx="5" ry="10" fill="#F5E0A8" opacity="0.9" transform="rotate(45 62 38)"/>
    <ellipse cx="38" cy="62" rx="5" ry="10" fill="#F5E0A8" opacity="0.9" transform="rotate(45 38 62)"/>
    <ellipse cx="62" cy="62" rx="5" ry="10" fill="#F5E0A8" opacity="0.9" transform="rotate(-45 62 62)"/>
  </svg>
);

// Rose decoration
const RoseDecor = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 60 60" fill="none">
    <path d="M30 25 Q25 20 30 15 Q35 20 30 25" fill="#5B7A8A" opacity="0.9"/>
    <path d="M30 25 Q20 22 22 30 Q20 38 30 35" fill="#6B8FAD" opacity="0.85"/>
    <path d="M30 25 Q40 22 38 30 Q40 38 30 35" fill="#8BA8C0" opacity="0.8"/>
    <path d="M30 35 Q25 42 22 38 Q18 45 25 48" fill="#D4A84B" opacity="0.7"/>
    <path d="M30 35 Q35 42 38 38 Q42 45 35 48" fill="#E8C87A" opacity="0.65"/>
  </svg>
);

// Leaf decoration
const LeafDecor = ({ className = '', rotate = 0 }) => (
  <svg className={className} viewBox="0 0 40 60" fill="none" style={{ transform: `rotate(${rotate}deg)` }}>
    <path d="M20 5 Q35 25 20 55 Q5 25 20 5" fill="#6B8FAD" opacity="0.6"/>
    <path d="M20 10 L20 50" stroke="#5B7A8A" strokeWidth="1" opacity="0.5"/>
  </svg>
);

// Paper texture overlay
const PaperTexture = () => (
  <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.04] mix-blend-multiply">
    <svg className='w-full h-full'>
      <filter id='paperTexture'>
        <feTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='4' stitchTiles='stitch' />
        <feColorMatrix type="saturate" values="0.1"/>
      </filter>
      <rect width='100%' height='100%' filter='url(#paperTexture)' />
    </svg>
  </div>
);

// Handwritten style text
const HandwrittenText = ({ children, className = '' }) => (
  <span 
    className={`font-serif italic ${className}`}
    style={{ 
      fontFamily: "'Playfair Display', serif",
      fontStyle: 'italic',
      letterSpacing: '-0.02em'
    }}
  >
    {children}
  </span>
);

// Washi tape effect
const WashiTape = ({ color = 'bg-amber-100/70', rotate = '-2deg', className = '' }) => (
  <div 
    className={`absolute w-16 h-6 ${color} backdrop-blur-sm shadow-sm ${className}`}
    style={{ 
      transform: `rotate(${rotate})`,
      backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.3) 2px, rgba(255,255,255,0.3) 4px)'
    }}
  />
);

// Polaroid frame
const PolaroidFrame = ({ children, className = '', rotate = '2deg' }) => (
  <div 
    className={`bg-white p-3 pb-12 shadow-xl ${className}`}
    style={{ transform: `rotate(${rotate})` }}
  >
    {children}
    <WashiTape className="-top-3 left-1/2 -translate-x-1/2" rotate="3deg" />
  </div>
);

// Collage card with torn edge effect
const CollageCard = ({ children, bgColor = 'bg-[#F8F4EF]', className = '', hasShadow = true }) => (
  <div 
    className={`relative overflow-hidden ${bgColor} ${hasShadow ? 'shadow-lg' : ''} ${className}`}
    style={{
      clipPath: 'polygon(0% 3%, 5% 0%, 15% 4%, 25% 1%, 35% 3%, 45% 0%, 55% 2%, 65% 0%, 75% 4%, 85% 1%, 95% 3%, 100% 0%, 100% 97%, 95% 100%, 85% 96%, 75% 99%, 65% 97%, 55% 100%, 45% 98%, 35% 100%, 25% 97%, 15% 99%, 5% 96%, 0% 100%)'
    }}
  >
    {children}
  </div>
);

// Artistic Button - subtle organic shape
const CTAButton = ({ children, href = '#', variant = 'primary', className = '', icon: Icon = null }) => {
  const colors = {
    primary: { bg: '#6B8FAD', hover: '#5B7A8A', text: 'white' },
    secondary: { bg: 'transparent', hover: '#F0EBE3', text: '#44403c', border: '#6B8FAD' },
    whatsapp: { bg: '#25D366', hover: '#1da851', text: 'white' }
  };
  const color = colors[variant];

  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`relative inline-flex items-center justify-center gap-2 font-serif text-sm md:text-base transition-all duration-300 px-7 py-3.5 md:px-9 md:py-4 group shadow-md hover:shadow-lg ${className}`}
      style={{ 
        color: color.text,
        background: color.bg,
        borderRadius: '4px 16px 4px 16px',
        border: variant === 'secondary' ? `2px solid ${color.border}` : 'none'
      }}
    >
      {Icon && <Icon size={18} />}
      <span className="italic">{children}</span>
    </motion.a>
  );
};

// Floating WhatsApp Button
const FloatingWhatsApp = () => (
  <motion.a
    href="https://wa.me/558394144192"
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, scale: 0, y: 100 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-shadow"
    style={{
      boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)'
    }}
  >
    <WhatsAppIcon size={28} />
    <span className="absolute -top-2 -right-2 bg-[#6B8FAD] text-white text-xs px-2 py-1 rounded-full animate-pulse">
      1
    </span>
  </motion.a>
);

/* --- SECTIONS --- */

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Sobre', href: '#sobre' },
    { label: 'Reflexões', href: '#reflexao' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Contato', href: '#contato' },
  ];

  return (
    <>
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-40 px-6 py-4 md:py-6 md:px-12 transition-all duration-300 ${
          scrolled ? 'bg-[#F0EBE3]/95 backdrop-blur-md shadow-md' : 'bg-[#F0EBE3]'
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo with decorative elements */}
          <div className="relative">
            <FloralDecor className="absolute -left-6 -top-3 w-10 h-10 opacity-60 hidden md:block" />
            <div className="font-serif text-xl md:text-2xl tracking-tight text-stone-800">
              <HandwrittenText className="text-2xl md:text-3xl">Laila Santos</HandwrittenText>
              <span className="text-stone-500 text-xs md:text-sm ml-2 font-sans">Psicóloga</span>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <a 
                key={item.label}
                href={item.href} 
                className="relative group font-sans text-sm text-stone-600 hover:text-stone-900 transition-colors"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#6B8FAD] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <CTAButton href="#contato" variant="primary" icon={WhatsAppIcon}>
              Agendar Consulta
            </CTAButton>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative z-50 w-12 h-12 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-md"
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} className="text-stone-800" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} className="text-stone-800" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 md:hidden"
          >
            {/* Background */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#F0EBE3]"
            >
              {/* Decorative elements */}
              <FloralDecor className="absolute top-20 right-10 w-32 h-32 opacity-20" />
              <RoseDecor className="absolute bottom-40 left-10 w-24 h-24 opacity-30" />
              <LeafDecor className="absolute top-1/3 left-5 w-12 h-20 opacity-20" rotate={-15} />
              <LeafDecor className="absolute bottom-1/4 right-20 w-10 h-16 opacity-25" rotate={30} />
              
              {/* Watercolor blobs */}
              <div className="absolute top-1/4 right-0 w-64 h-64 bg-[#6B8FAD]/20 rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-[#D4A84B]/15 rounded-full blur-3xl" />
            </motion.div>

            {/* Menu Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-center mb-12"
              >
                <HandwrittenText className="text-4xl text-stone-800">Menu</HandwrittenText>
                <div className="w-20 h-0.5 bg-[#6B8FAD] mx-auto mt-2 opacity-50" />
              </motion.div>

              <nav className="flex flex-col items-center gap-6">
                {menuItems.map((item, i) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    onClick={() => setIsMenuOpen(false)}
                    className="relative group"
                  >
                    <span className="font-serif text-3xl text-stone-700 hover:text-[#6B8FAD] transition-colors">
                      {item.label}
                    </span>
                    <motion.div 
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#6B8FAD] origin-left"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-12"
              >
                <CTAButton 
                  href="https://wa.me/558394144192" 
                  variant="whatsapp" 
                  icon={WhatsAppIcon}
                  className="text-lg"
                >
                  Agendar pelo WhatsApp
                </CTAButton>
              </motion.div>

              {/* Social links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex gap-6 mt-12"
              >
                <a href="#" className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center text-stone-600 hover:text-[#6B8FAD] hover:bg-white transition-all shadow-md">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center text-stone-600 hover:text-[#6B8FAD] hover:bg-white transition-all shadow-md">
                  <Mail size={20} />
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer to push content below fixed navbar */}
      <div className="h-16 md:h-20" />
    </>
  );
};

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section ref={ref} className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#F0EBE3] via-[#F5F0E8] to-[#E8E2D8]">
      
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-5 w-48 md:w-64 h-48 md:h-64 bg-[#6B8FAD]/15 rounded-full blur-3xl" />
        <div className="absolute top-40 right-10 w-56 md:w-80 h-56 md:h-80 bg-[#D4A84B]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/3 w-52 md:w-72 h-52 md:h-72 bg-[#6B8FAD]/10 rounded-full blur-3xl" />
        <FloralDecor className="absolute top-32 right-1/4 w-16 h-16 opacity-30 hidden sm:block" />
        <RoseDecor className="absolute bottom-40 right-10 w-12 h-12 opacity-40 hidden sm:block" />
      </div>

      {/* MOBILE LAYOUT */}
      <div className="lg:hidden relative z-10 px-5 pt-6 pb-12 flex flex-col min-h-screen">
        
        {/* Top: Title centered */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6"
        >
          <h1 className="font-serif text-[2.2rem] sm:text-4xl text-stone-800 leading-[1.15]">
            O que a sua
            <br />
            <HandwrittenText className="text-[#6B8FAD] text-[2.6rem] sm:text-5xl">mente</HandwrittenText>
            <br />
            está tentando
            <br />
            te dizer?
          </h1>
        </motion.div>

        {/* Middle: Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-6"
        >
          <CollageCard className="p-4" bgColor="bg-[#F0EBE3]/90">
            <p className="font-sans text-stone-600 text-sm leading-relaxed">
              Um espaço seguro para traduzir o silêncio em palavras.
              <HandwrittenText className="text-[#6B8FAD] block mt-1">Psicologia clínica focada em autoconhecimento.</HandwrittenText>
            </p>
          </CollageCard>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col gap-3 mb-6"
        >
          <CTAButton href="https://wa.me/558394144192" variant="whatsapp" icon={WhatsAppIcon} className="w-full justify-center">
            Agendar pelo WhatsApp
          </CTAButton>
          <CTAButton href="#sobre" variant="secondary" className="w-full justify-center">
            Conhecer mais
          </CTAButton>
        </motion.div>

        {/* Image collage - BIGGER images to fill space */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="relative flex-1 min-h-[320px]"
        >
          {/* Main large image - left side */}
          <PolaroidFrame rotate="-4deg" className="absolute top-0 left-0 w-[55%] z-20">
            <div className="aspect-[3/4] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1515462277126-2dd0c162007a?q=80&w=800" 
                alt="Texture" 
                className="w-full h-full object-cover sepia-[0.2]"
              />
            </div>
          </PolaroidFrame>

          {/* Second large image - right side, overlapping */}
          <PolaroidFrame rotate="6deg" className="absolute top-8 right-0 w-[55%] z-30">
            <div className="aspect-[3/4] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=800" 
                alt="Portrait" 
                className="w-full h-full object-cover sepia-[0.15]"
              />
            </div>
          </PolaroidFrame>

          {/* Quote card - centered in the middle */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-[#F0EBE3] p-4 shadow-lg text-center" 
            style={{ transform: 'rotate(-2deg)', maxWidth: '220px' }}
          >
            <p className="font-serif italic text-stone-700 text-sm leading-snug">
              "Não é sobre curar o que está quebrado, mas compreender o que foi construído."
            </p>
            <Heart size={12} className="text-[#D4A84B] mt-2 mx-auto" fill="#D4A84B" />
          </div>
        </motion.div>
      </div>

      {/* DESKTOP LAYOUT */}
      <div className="hidden lg:flex items-center min-h-screen px-6 py-20">
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-12 gap-8 items-center">
            
            <div className="col-span-7 relative">
              <motion.div
                initial={{ opacity: 0, y: 40, rotate: -2 }}
                animate={{ opacity: 1, y: 0, rotate: -2 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <CollageCard className="p-12 mb-6" bgColor="bg-white/90">
                  <h1 className="font-serif text-5xl xl:text-7xl text-stone-800 leading-[1.1]">
                    O que a sua{' '}
                    <span className="relative inline-block">
                      <HandwrittenText className="text-[#6B8FAD]">mente</HandwrittenText>
                      <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 100 10">
                        <path d="M0,5 Q25,0 50,5 T100,5" stroke="#6B8FAD" strokeWidth="2" fill="none" opacity="0.5"/>
                      </svg>
                    </span>
                    <br />está tentando
                    <br />te dizer?
                  </h1>
                  <WashiTape className="-top-2 left-10" color="bg-[#6B8FAD]/20" rotate="-3deg" />
                  <WashiTape className="-bottom-2 right-10" color="bg-[#D4A84B]/30" rotate="2deg" />
                </CollageCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="ml-8"
              >
                <CollageCard className="p-6 max-w-md" bgColor="bg-white shadow-lg">
                  <p className="font-sans text-stone-700 text-lg leading-relaxed">
                    Um espaço seguro para traduzir o silêncio em palavras.
                    <HandwrittenText className="text-[#6B8FAD] block mt-2">Psicologia clínica focada em autoconhecimento.</HandwrittenText>
                  </p>
                  <RoseDecor className="absolute -right-4 -bottom-4 w-14 h-14 opacity-50" />
                </CollageCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="flex gap-4 mt-10"
              >
                <CTAButton href="https://wa.me/558394144192" variant="whatsapp" icon={WhatsAppIcon}>
                  Agendar pelo WhatsApp
                </CTAButton>
                <CTAButton href="#sobre" variant="secondary">
                  Conhecer mais
                </CTAButton>
              </motion.div>


            </div>

            <div className="col-span-5 relative h-[70vh]">
              <motion.div
                style={{ y }}
                initial={{ opacity: 0, rotate: 5 }}
                animate={{ opacity: 1, rotate: 5 }}
                transition={{ duration: 1 }}
                className="absolute top-0 right-4 z-20"
              >
                <PolaroidFrame rotate="5deg" className="w-64 xl:w-72">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=2070" 
                      alt="Portrait" 
                      className="w-full h-full object-cover sepia-[0.2]"
                    />
                  </div>
                </PolaroidFrame>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 0.4 }}
                className="absolute bottom-20 left-0 z-30"
              >
                <CollageCard className="w-48 xl:w-56 aspect-square overflow-hidden" bgColor="bg-transparent">
                  <img 
                    src="https://images.unsplash.com/photo-1515462277126-2dd0c162007a?q=80&w=1976" 
                    alt="Texture" 
                    className="w-full h-full object-cover sepia-[0.3]"
                  />
                </CollageCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute bottom-40 right-8 z-40 max-w-[200px]"
                style={{ transform: 'rotate(-3deg)' }}
              >
                <div className="bg-white/95 p-4 shadow-lg rounded-sm">
                  <p className="font-serif italic text-stone-700 text-sm leading-snug">
                    "Não é sobre curar o que está quebrado, mas compreender o que foi construído."
                  </p>
                  <Heart size={12} className="text-[#D4A84B] mt-2" fill="#D4A84B" />
                </div>
              </motion.div>

              <FloralDecor className="absolute top-1/4 left-1/4 w-16 h-16 opacity-30 z-10" />
            </div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 1.5, delay: 1.5, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-stone-400 hidden lg:block"
      >
        <ArrowDown size={24} />
      </motion.div>

      <TornEdge position="bottom" color="#6B8FAD" />
    </section>
  );
};

const TrustBar = () => (
  <div className="w-full py-8 md:py-10 bg-[#6B8FAD] relative">
    <div className="max-w-6xl mx-auto px-6">
      <div className="flex flex-wrap justify-center items-center gap-4 md:gap-12">
        {[
          { icon: Star, text: 'CRP 13/12991' },
          { icon: Heart, text: 'Online & Presencial' },
          { icon: Sparkles, text: 'Psicóloga Clínica' },
          { icon: Star, text: 'Adolescentes & Adultos' },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-2 font-sans text-xs md:text-sm tracking-widest uppercase text-white/90"
          >
            <item.icon size={14} className="text-[#F5E0A8]" />
            <span>{item.text}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

const Manifesto = () => (
  <section className="relative py-20 md:py-32 bg-gradient-to-b from-[#F8F4EF] to-[#F5EDE4] overflow-hidden" id="sobre">
    
    {/* Decorative background */}
    <FloralDecor className="absolute top-20 left-10 w-32 h-32 opacity-20 hidden md:block" />
    <RoseDecor className="absolute bottom-20 right-10 w-24 h-24 opacity-30 hidden md:block" />

    <div className="max-w-4xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        {/* Main quote card */}
        <CollageCard className="p-8 md:p-16 text-center" bgColor="bg-white/80">
          <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl text-stone-800 leading-snug mb-8">
            A terapia não precisa ser <HandwrittenText className="text-[#6B8FAD]">fria</HandwrittenText> para ser clínica.
          </h2>
          <p className="font-sans text-stone-600 text-base md:text-xl leading-relaxed max-w-2xl mx-auto">
            Vivemos tempos de respostas rápidas, mas a alma tem seu próprio ritmo. 
            Aqui, convido você a desacelerar. Meu trabalho não é te dar conselhos prontos, 
            mas caminhar ao seu lado enquanto você redescobre a sua própria voz.
          </p>
          
          <div className="mt-10 md:mt-12 relative inline-block">
            <HandwrittenText className="text-xl md:text-3xl text-stone-400">~ Processo de escuta ativa</HandwrittenText>
          </div>

          {/* CTA */}
          <div className="mt-10 md:mt-12">
            <CTAButton href="https://wa.me/558394144192" variant="primary" icon={WhatsAppIcon}>
              Quero iniciar minha jornada
            </CTAButton>
          </div>
          
          <WashiTape className="-top-3 left-1/4 hidden md:block" color="bg-blue-100/60" rotate="-2deg" />
          <WashiTape className="-top-3 right-1/4 hidden md:block" color="bg-rose-100/50" rotate="3deg" />
        </CollageCard>
      </motion.div>
    </div>
  </section>
);

const ReflectionCards = () => {
  const items = [
    { 
      title: "O que não é terapia", 
      text: "Não é um lugar para julgamentos, nem para receber um 'gabarito' sobre como viver sua vida. Não é apenas desabafo, é elaboração.",
      bgImage: null,
      accent: '#6B8FAD'
    },
    { 
      title: null, 
      bgImage: "https://images.unsplash.com/photo-1515462277126-2dd0c162007a?q=80&w=1976&auto=format&fit=crop",
      accent: null
    },
    { 
      title: null, 
      bgImage: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=2070&auto=format&fit=crop",
      accent: null
    },
    { 
      title: "O que acontece aqui", 
      text: "Investigamos padrões, acolhemos angústias e construímos novos significados para sua história. É um encontro de duas humanidades.",
      bgImage: null,
      accent: '#D4A84B'
    },
  ];

  return (
    <section className="py-20 md:py-24 px-6 bg-[#F5EDE4] relative overflow-hidden" id="reflexao">
      <FloralDecor className="absolute top-10 right-20 w-24 h-24 opacity-20 hidden md:block" />

      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-2xl md:text-4xl text-stone-800 text-center mb-12 md:mb-16"
        >
          <HandwrittenText>Reflexões</HandwrittenText> sobre o processo
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, rotate: i % 2 === 0 ? -1 : 1 }}
              whileInView={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? -1 : 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className={`relative ${i % 2 === 0 ? 'md:translate-y-12' : ''}`}
            >
              {item.bgImage ? (
                <PolaroidFrame rotate={i % 2 === 0 ? '-3deg' : '3deg'} className="aspect-[4/5]">
                  <div className="w-full h-full overflow-hidden">
                    <img 
                      src={item.bgImage} 
                      alt="Atmospheric"
                      className="w-full h-full object-cover sepia-[0.3] contrast-[0.9]"
                    />
                  </div>
                </PolaroidFrame>
              ) : (
                <CollageCard className="p-6 md:p-10 min-h-[280px] md:min-h-[300px]" bgColor="bg-white">
                  <div 
                    className="absolute top-0 left-0 w-1 h-full"
                    style={{ backgroundColor: item.accent }}
                  />
                  <h3 className="font-serif text-xl md:text-2xl mb-4 text-stone-800">{item.title}</h3>
                  <p className="font-sans text-stone-600 leading-relaxed text-sm md:text-base">{item.text}</p>
                  <RoseDecor className="absolute -bottom-4 -right-4 w-16 h-16 opacity-30 hidden md:block" />
                  <WashiTape className="-top-2 right-8 hidden md:block" color="bg-amber-100/60" rotate="2deg" />
                </CollageCard>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA after cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12 md:mt-16"
        >
          <CTAButton href="https://wa.me/558394144192" variant="whatsapp" icon={WhatsAppIcon}>
            Marcar conversa inicial
          </CTAButton>
        </motion.div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    { 
      title: "Psicoterapia Individual", 
      desc: "Sessões semanais para aprofundamento e autoconhecimento.",
      icon: Heart,
      color: 'bg-[#F0EBE3]',
      accent: '#6B8FAD'
    },
    { 
      title: "Plantão Psicológico", 
      desc: "Acolhimento pontual para momentos de crise aguda.",
      icon: Star,
      color: 'bg-[#F5F0E8]',
      accent: '#D4A84B'
    },
    { 
      title: "Supervisão Clínica", 
      desc: "Para estudantes e psicólogos recém-formados.",
      icon: Sparkles,
      color: 'bg-[#FDFBF8]',
      accent: '#8BA8C0'
    }
  ];

  return (
    <section className="py-20 md:py-24 bg-[#6B8FAD] px-6 relative overflow-hidden" id="servicos">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#5B7A8A]/50 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      <FloralDecor className="absolute bottom-10 left-20 w-20 h-20 opacity-25 hidden md:block" />

      <TornEdge position="top" color="#F5EDE4" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-2xl md:text-4xl mb-12 md:mb-16 text-white text-center"
        >
          Caminhos de <HandwrittenText className="text-[#D4A84B]">Atuação</HandwrittenText>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {services.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -8, rotate: 1 }}
              className="group"
            >
              <CollageCard className={`${s.color} p-6 md:p-8 relative cursor-default h-full`}>
                {/* Tape effect */}
                <WashiTape className="-top-3 left-1/2 -translate-x-1/2" color="bg-white/60" rotate="2deg" />
                
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-6"
                  style={{ backgroundColor: s.accent + '20' }}
                >
                  <s.icon size={20} style={{ color: s.accent }} />
                </div>
                
                <h3 className="font-serif text-lg md:text-xl mb-4 text-stone-900 group-hover:text-stone-700 transition-colors">
                  {s.title}
                </h3>
                <p className="font-sans text-sm text-stone-600 leading-relaxed">{s.desc}</p>
              </CollageCard>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12 md:mt-16"
        >
          <CTAButton href="https://wa.me/558394144192" variant="whatsapp" icon={WhatsAppIcon}>
            Agendar minha consulta
          </CTAButton>
        </motion.div>
      </div>

      <TornEdge position="bottom" color="#F8F4EF" />
    </section>
  );
};

const Testimonial = () => (
  <section className="py-20 md:py-24 bg-[#F8F4EF] px-6 relative overflow-hidden">
    <FloralDecor className="absolute top-10 left-10 w-20 h-20 opacity-20 hidden md:block" />
    <RoseDecor className="absolute bottom-10 right-20 w-16 h-16 opacity-30 hidden md:block" />

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-3xl mx-auto"
    >
      <CollageCard className="p-8 md:p-16 text-center" bgColor="bg-white/90">
        <div className="relative">
          <span className="absolute -top-6 md:-top-8 -left-2 md:-left-4 text-6xl md:text-8xl text-[#6B8FAD]/30 font-serif">"</span>
          <p className="font-serif italic text-lg md:text-2xl text-stone-700 leading-relaxed relative z-10">
            Comecei buscando respostas e acabei encontrando perguntas melhores. 
            O processo foi como organizar uma casa bagunçada: tiramos tudo do lugar, 
            mas agora cada coisa tem seu sentido.
          </p>
          <span className="absolute -bottom-12 md:-bottom-16 -right-2 md:-right-4 text-6xl md:text-8xl text-[#6B8FAD]/30 font-serif">"</span>
        </div>
        
        <div className="mt-8 md:mt-10 flex flex-col items-center gap-2">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className="text-amber-400" fill="#fbbf24" />
            ))}
          </div>
          <p className="font-sans text-xs tracking-widest text-stone-400 uppercase">
            — Paciente, 29 anos
          </p>
        </div>

        <WashiTape className="-top-2 left-12 md:left-20 hidden md:block" color="bg-rose-100/50" rotate="-2deg" />
        <WashiTape className="-bottom-2 right-12 md:right-20 hidden md:block" color="bg-amber-100/60" rotate="3deg" />
      </CollageCard>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-10 md:mt-12"
      >
        <CTAButton href="https://wa.me/558394144192" variant="whatsapp" icon={WhatsAppIcon}>
          Começar minha transformação
        </CTAButton>
      </motion.div>
    </motion.div>
  </section>
);

const Footer = () => (
  <footer className="relative overflow-hidden" id="contato">
    {/* Artistic gradient background */}
    <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900" />
    
    {/* Decorative floating elements */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-20 left-10 w-64 h-64 bg-[#6B8FAD]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#D4A84B]/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-[#B86858]/5 rounded-full blur-2xl" />
      
      {/* Artistic lines */}
      <svg className="absolute top-0 left-0 w-full h-full opacity-[0.03]" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M0,20 Q30,10 50,20 T100,20" stroke="#D4A59A" strokeWidth="0.3" fill="none" />
        <path d="M0,50 Q40,40 60,50 T100,45" stroke="#A8C5D4" strokeWidth="0.2" fill="none" />
        <path d="M0,80 Q25,70 50,80 T100,75" stroke="#D4A59A" strokeWidth="0.25" fill="none" />
      </svg>
    </div>

    <TornEdge position="top" color="#F8F4EF" />
    
    <div className="py-20 md:py-28 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">

        {/* Main CTA Section - Artistic Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mb-20"
        >
          <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm rounded-3xl p-10 md:p-16 text-center border border-white/10 shadow-2xl">
            {/* Decorative corner elements */}
            <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-[#D4A59A]/30 rounded-tl-lg" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-[#D4A59A]/30 rounded-br-lg" />
            
            <FloralDecor className="absolute -top-6 -right-6 w-20 h-20 opacity-20 hidden md:block" />
            <RoseDecor className="absolute -bottom-4 -left-4 w-16 h-16 opacity-15 hidden md:block" />
            
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring" }}
              className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-br from-[#D4A59A]/20 to-[#B86858]/10 flex items-center justify-center"
            >
              <Heart size={32} className="text-[#6B8FAD]" />
            </motion.div>
            
            <h3 className="font-serif text-3xl md:text-5xl text-stone-100 mb-6 leading-tight">
              Pronta para dar o{' '}
              <span className="relative inline-block">
                <HandwrittenText className="text-[#6B8FAD]">primeiro passo</HandwrittenText>
                <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 100 10">
                  <path d="M0,5 Q25,0 50,5 T100,5" stroke="#D4A59A" strokeWidth="2" fill="none" opacity="0.4"/>
                </svg>
              </span>
              ?
            </h3>
            <p className="font-sans text-stone-400 mb-10 max-w-lg mx-auto text-lg leading-relaxed">
              Entre em contato e agende sua primeira sessão. 
              <br className="hidden md:block" />
              Estou aqui para te acolher nessa jornada.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <CTAButton 
                href="https://api.whatsapp.com/send/?phone=558394144192" 
                variant="whatsapp" 
                icon={WhatsAppIcon}
                className="text-lg px-8"
              >
                Conversar pelo WhatsApp
              </CTAButton>
              <a 
                href="mailto:psi.lailasantos@gmail.com"
                className="flex items-center gap-2 text-stone-400 hover:text-[#6B8FAD] transition-colors font-sans group"
              >
                <Mail size={18} className="group-hover:scale-110 transition-transform" />
                <span className="text-sm">ou envie um email</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Content Grid with Artistic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative group"
          >
            <div className="relative p-8 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[#D4A59A]/20 transition-all duration-500 h-full">
              <FloralDecor className="absolute -top-4 -left-2 w-12 h-12 opacity-30 group-hover:opacity-50 transition-opacity" />
              
              <div className="mb-6">
                <HandwrittenText className="text-3xl text-stone-100">Laila Santos</HandwrittenText>
                <span className="text-[#6B8FAD] text-sm font-sans ml-2 tracking-wider">Psicóloga</span>
              </div>
              
              <p className="font-sans text-sm text-stone-400 leading-relaxed mb-6">
                Psicologia Clínica guiada pela ética, estética e afeto. 
                Um caminho de transformação através do autoconhecimento.
              </p>
              
              <div className="flex items-center gap-2 text-stone-500">
                <div className="w-8 h-[1px] bg-gradient-to-r from-[#D4A59A]/50 to-transparent" />
                <span className="text-xs tracking-widest">CRP 13/12991</span>
              </div>
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="relative group"
          >
            <div className="relative p-8 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[#D4A59A]/20 transition-all duration-500 h-full">
              <h5 className="font-serif text-xl text-stone-200 mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#6B8FAD]/10 flex items-center justify-center">
                  <Sparkles size={14} className="text-[#6B8FAD]" />
                </span>
                Contato
              </h5>
              
              <div className="space-y-4">
                <a 
                  href="https://api.whatsapp.com/send/?phone=558394144192" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all duration-300 group/link"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#25D366]/20 to-[#25D366]/5 flex items-center justify-center group-hover/link:from-[#25D366] group-hover/link:to-[#128C7E] transition-all duration-300">
                    <WhatsAppIcon size={20} className="text-[#25D366] group-hover/link:text-white transition-colors" />
                  </div>
                  <div>
                    <span className="text-stone-300 text-sm font-medium block group-hover/link:text-white transition-colors">WhatsApp</span>
                    <span className="text-stone-500 text-xs">(83) 9414-4192</span>
                  </div>
                </a>
                
                <a 
                  href="mailto:psi.lailasantos@gmail.com"
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all duration-300 group/link"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4A59A]/20 to-[#B86858]/5 flex items-center justify-center group-hover/link:from-[#D4A59A] group-hover/link:to-[#B86858] transition-all duration-300">
                    <Mail size={20} className="text-[#6B8FAD] group-hover/link:text-white transition-colors" />
                  </div>
                  <div>
                    <span className="text-stone-300 text-sm font-medium block group-hover/link:text-white transition-colors">Email</span>
                    <span className="text-stone-500 text-xs">psi.lailasantos@gmail.com</span>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="relative group"
          >
            <div className="relative p-8 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[#D4A59A]/20 transition-all duration-500 h-full flex flex-col justify-between">
              <div>
                <h5 className="font-serif text-xl text-stone-200 mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#D4A84B]/10 flex items-center justify-center">
                    <Heart size={14} className="text-[#D4A84B]" />
                  </span>
                  Importante
                </h5>
                
                <p className="font-sans text-xs text-stone-500 leading-relaxed">
                  A psicoterapia é um serviço de saúde. Em caso de emergência, procure o hospital mais próximo ou ligue 
                  <span className="text-[#6B8FAD] font-medium"> 188 (CVV)</span>.
                </p>
              </div>
              
              <div className="mt-8 pt-6 border-t border-white/5">
                <p className="font-sans text-xs text-stone-600 italic flex items-center gap-2">
                  <Heart size={10} className="text-[#6B8FAD]" fill="#D4A59A" />
                  Design artesanal com afeto
                </p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 pt-8 border-t border-white/5"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-sans text-xs text-stone-600 text-center md:text-left">
              © {new Date().getFullYear()} Laila Santos Psicologia. Todos os direitos reservados.
            </p>
            
            {/* Artistic signature */}
            <div className="flex items-center gap-3">
              <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#D4A59A]/30 to-transparent" />
              <HandwrittenText className="text-stone-600 text-sm">com carinho</HandwrittenText>
              <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#D4A59A]/30 to-transparent" />
            </div>
          </div>

          {/* Creator credits */}
          <div className="mt-6 flex justify-center">
            <a 
              href="https://www.instagram.com/codenandi/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-stone-600/60 hover:text-[#6B8FAD] transition-all duration-500"
            >
              <span className="text-[10px] tracking-[0.2em] uppercase font-sans">Criado por</span>
              <span className="relative">
                <HandwrittenText className="text-xs group-hover:text-[#D4A84B] transition-colors duration-500">@codenandi</HandwrittenText>
                <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-gradient-to-r from-[#D4A84B] to-[#6B8FAD] group-hover:w-full transition-all duration-500" />
              </span>
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  </footer>
);

/* --- MAIN LAYOUT --- */

const ClinicalPage = () => {
  return (
    <div className="bg-[#F0EBE3] min-h-screen w-full relative selection:bg-[#6B8FAD] selection:text-white">
      <PaperTexture />
      <Navbar />
      <Hero />
      <TrustBar />
      <Manifesto />
      <ReflectionCards />
      <Services />
      <Testimonial />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default ClinicalPage;