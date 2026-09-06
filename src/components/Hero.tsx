import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MessageCircle, ChevronRight, CheckCircle2, Loader2, Store, Briefcase, Building2, Home, Check, Utensils } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { cn } from '../lib/utils';

interface HeroLeadFormData {
  name: string;
  phone: string;
}

export default function Hero() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<HeroLeadFormData>();

  const onSubmit = async (data: HeroLeadFormData) => {
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'leads'), {
        ...data,
        source: 'Hero Banner Form',
        createdAt: serverTimestamp(),
      });
      setIsSubmitted(true);
      reset();
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'leads');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/919999882898`, '_blank');
  };

  const handleCall = () => {
    window.location.href = 'tel:9999882898';
  };

  const scrollToLeadForm = () => {
    const leadSection = document.getElementById('lead-form');
    if (leadSection) {
      leadSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[850px] lg:h-[900px] flex items-center pt-20 pb-12 overflow-hidden bg-[#0a1128] font-sans">
      {/* Background: Premium Commercial Building at Sunset */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=2000"
          alt="Premium Commercial Building"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        {/* Dark Overlays for Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1128] via-[#0a1128]/80 to-transparent lg:w-2/3" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1128] via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT SIDE: BOLD MARKETING CONTENT */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-2"
            >
              <p className="text-white text-lg font-bold tracking-[0.2em] uppercase">Premium</p>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none italic">
                <span className="text-[#FFD700] drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">COMMERCIAL</span>
                <br />
                <span className="text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">PROPERTY INVESTMENT</span>
              </h1>
              
              {/* Red Highlight Bar */}
              <div className="inline-block mt-4">
                <div className="bg-[#E31E24] text-white px-8 py-2 rounded-full font-black text-xl md:text-2xl italic tracking-wider shadow-lg">
                  IN DELHI NCR
                </div>
              </div>

              {/* Locations List */}
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-white/80 font-bold text-xs md:text-sm pt-4 uppercase tracking-widest">
                <span>Greater Noida</span>
                <span className="text-white/30">|</span>
                <span>Noida</span>
                <span className="text-white/30">|</span>
                <span>Noida Extension</span>
                <span className="text-white/30">|</span>
                <span>Ghaziabad</span>
                <span className="text-white/30">|</span>
                <span>Delhi</span>
              </div>
            </motion.div>

            {/* Feature Boxes */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-4"
            >
              {[
                { label: "Retail Shops", icon: Store },
                { label: "Office Space", icon: Briefcase },
                { label: "Studio Units", icon: Building2 },
                { label: "Food Court", icon: Utensils },
                { label: "Residential Flats", icon: Home }
              ].map((item, i) => (
                <div key={i} className="bg-black/40 backdrop-blur-sm border border-white/20 p-4 rounded-xl text-center group hover:border-[#FFD700] transition-colors">
                  <div className="w-12 h-12 bg-[#FFD700]/10 text-[#FFD700] rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-[#FFD700] group-hover:text-black transition-all">
                    <item.icon size={24} />
                  </div>
                  <p className="text-white font-bold text-xs uppercase tracking-tighter leading-tight">{item.label}</p>
                </div>
              ))}
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-black/40 backdrop-blur-sm border border-[#FFD700]/30 rounded-full px-6 py-3 inline-flex flex-wrap gap-x-8 gap-y-2"
            >
              {[
                "High Rental Income",
                "Prime Locations",
                "Verified Projects"
              ].map((text, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <div className="bg-[#FFD700] rounded-full p-0.5">
                    <Check size={12} className="text-black font-bold" />
                  </div>
                  <span className="text-white font-black text-[10px] md:text-xs uppercase tracking-wider">{text}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <button
                onClick={scrollToLeadForm}
                className="bg-[#E31E24] hover:bg-[#c41a1f] text-white px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest flex items-center space-x-2 shadow-lg transition-transform hover:scale-105 active:scale-95"
              >
                <span>Get Details</span>
                <ChevronRight size={18} />
              </button>
              
              <button
                onClick={handleCall}
                className="bg-[#FFD700] hover:bg-[#e6c200] text-black px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest flex items-center space-x-2 shadow-lg transition-transform hover:scale-105 active:scale-95"
              >
                <span>Book Site Visit</span>
                <ChevronRight size={18} />
              </button>

              <button
                onClick={handleWhatsApp}
                className="bg-[#25D366] hover:bg-[#1eb956] text-white px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest flex items-center space-x-2 shadow-lg transition-transform hover:scale-105 active:scale-95"
              >
                <MessageCircle size={20} />
                <span>WhatsApp Now</span>
              </button>
            </motion.div>
          </div>

          {/* RIGHT SIDE: LOGO & CONTACT */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center space-y-8 py-8">
            {/* Circular Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="w-48 h-48 md:w-56 md:h-56 bg-white rounded-full p-4 shadow-2xl border-4 border-[#FFD700] flex items-center justify-center overflow-hidden"
            >
              <img 
                src="https://instasize.com/api/image/87e2fdb8828fd9cdfa4566774e9ba73c587ea743872310c777de048c2b9dd4b1.jpeg" 
                alt="REAL PROP Logo" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-center lg:text-right space-y-3"
            >
              <div className="flex flex-col items-center lg:items-end space-y-2">
                <div className="flex items-center space-x-4">
                  <div className="bg-red-600 p-3 rounded-full text-white shadow-lg border-2 border-black">
                    <Phone size={32} fill="currentColor" />
                  </div>
                  <div className="text-red-600">
                    <p className="text-4xl md:text-6xl font-black tracking-tighter [text-shadow:3px_3px_0_#000,-3px_-3px_0_#000,3px_-3px_0_#000,-3px_3px_0_#000,3px_0_0_#000,-3px_0_0_#000,0_3px_0_#000,0_-3px_0_#000]">99998 82898</p>
                  </div>
                </div>
                <div className="text-white/90 font-bold text-sm md:text-base tracking-widest uppercase bg-black/20 px-4 py-1 rounded-full backdrop-blur-sm">
                  LALIT KUMAR <span className="text-[#FFD700] mx-2">|</span> PROPERTY INVESTMENT CONSULTANT
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
