import { motion } from 'motion/react';
import { Phone, MessageCircle, ArrowRight } from 'lucide-react';

export default function CTASection() {
  const handleWhatsApp = () => {
    window.open(`https://wa.me/919999882898`, '_blank');
  };

  const handleCall = () => {
    window.location.href = 'tel:9999882898';
  };

  const scrollToLeadForm = () => {
    document.getElementById('lead-form-hero')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-600 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-black text-white mb-8 leading-[1.1] uppercase tracking-tighter"
          >
            Looking to Invest in <br />
            <span className="text-red-600 drop-shadow-[0_0_20px_rgba(220,38,38,0.5)]">High-Return</span> Property?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-2xl text-gray-400 mb-12 font-bold max-w-3xl mx-auto"
          >
            Get exclusive access to the best retail shops and office spaces in Delhi NCR. Our experts are ready to help you find the perfect investment.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-4 md:gap-8"
          >
            <button 
              onClick={scrollToLeadForm}
              className="bg-red-600 text-white hover:bg-red-700 px-8 md:px-12 py-4 md:py-6 rounded-xl md:rounded-2xl font-black text-lg md:text-xl flex items-center justify-center space-x-3 md:space-x-4 transition-all shadow-2xl shadow-red-600/30 hover:scale-105"
            >
              <ArrowRight size={24} className="md:w-7 md:h-7" />
              <span>GET DETAILS</span>
            </button>
            <button 
              onClick={handleCall}
              className="bg-white text-gray-900 hover:bg-gray-100 px-8 md:px-12 py-4 md:py-6 rounded-xl md:rounded-2xl font-black text-lg md:text-xl flex items-center justify-center space-x-3 md:space-x-4 transition-all shadow-2xl hover:scale-105"
            >
              <Phone size={24} className="md:w-7 md:h-7" />
              <span>BOOK VISIT</span>
            </button>
            <button 
              onClick={handleWhatsApp}
              className="bg-green-600 text-white hover:bg-green-700 px-8 md:px-12 py-4 md:py-6 rounded-xl md:rounded-2xl font-black text-lg md:text-xl flex items-center justify-center space-x-3 md:space-x-4 transition-all shadow-2xl shadow-green-600/30 hover:scale-105"
            >
              <MessageCircle size={24} className="md:w-7 md:h-7" />
              <span>WHATSAPP NOW</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
