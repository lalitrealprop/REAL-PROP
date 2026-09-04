import { useState, useEffect } from 'react';
import { Phone, MessageCircle, ChevronUp, ClipboardList } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation } from 'react-router-dom';
import { trackCallClicked, trackWhatsAppClicked } from '../lib/analytics';

export default function FloatingButtons() {
  const [showScroll, setShowScroll] = useState(false);
  const location = useLocation();
  const isSVGProject = location.pathname === '/projects/svg-central-square';

  useEffect(() => {
    const checkScroll = () => setShowScroll(window.scrollY > 400);
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const handleWhatsApp = () => { trackWhatsAppClicked(); window.open('https://wa.me/919999882898', '_blank'); };
  const handleCall = () => { trackCallClicked(); window.location.href = 'tel:9999882898'; };
  const handlePrice = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (isSVGProject) {
    return <>
      <div className="hidden md:flex fixed bottom-8 right-8 z-50 flex-col space-y-3">
        <AnimatePresence>{showScroll && <motion.button initial={{opacity:0,scale:.5}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:.5}} onClick={scrollToTop} className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center shadow-2xl"><ChevronUp size={24}/></motion.button>}</AnimatePresence>
        <button onClick={handlePrice} className="w-14 h-14 bg-[#d7ad5a] text-black rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform" title="Get Price"><ClipboardList size={25}/></button>
        <button onClick={handleWhatsApp} className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform" title="WhatsApp"><MessageCircle size={28}/></button>
        <button onClick={handleCall} className="w-14 h-14 bg-black text-white border border-white/20 rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform" title="Call"><Phone size={25}/></button>
      </div>
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[90] grid grid-cols-3 bg-black/95 backdrop-blur-md border-t border-white/10 pb-[env(safe-area-inset-bottom)]">
        <button onClick={handleCall} className="py-3.5 text-white text-xs font-black flex flex-col items-center gap-1"><Phone size={18}/><span>CALL NOW</span></button>
        <button onClick={handleWhatsApp} className="py-3.5 text-[#d7ad5a] text-xs font-black flex flex-col items-center gap-1 border-x border-white/10"><MessageCircle size={18}/><span>WHATSAPP</span></button>
        <button onClick={handlePrice} className="py-3.5 text-white text-xs font-black flex flex-col items-center gap-1"><ClipboardList size={18}/><span>GET PRICE</span></button>
      </div>
    </>;
  }

  return <div className="fixed bottom-8 right-8 z-50 flex flex-col space-y-4">
    <AnimatePresence>{showScroll && <motion.button initial={{opacity:0,scale:.5,y:20}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:.5,y:20}} onClick={scrollToTop} className="w-14 h-14 bg-white text-gray-900 rounded-full flex items-center justify-center shadow-2xl border border-gray-100"><ChevronUp size={28}/></motion.button>}</AnimatePresence>
    <motion.button whileHover={{scale:1.1,x:-5}} whileTap={{scale:.9}} onClick={handleWhatsApp} className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl shadow-green-500/40"><MessageCircle size={32}/></motion.button>
    <motion.button whileHover={{scale:1.1,x:-5}} whileTap={{scale:.9}} onClick={handleCall} className="w-14 h-14 bg-red-600 text-white rounded-full flex items-center justify-center shadow-2xl shadow-red-600/40"><Phone size={28}/></motion.button>
  </div>;
}
