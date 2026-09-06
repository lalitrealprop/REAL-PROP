import { motion } from 'motion/react';
import { Phone, MessageCircle, ChevronRight, MapPin, Building, TrendingUp, ShieldCheck } from 'lucide-react';
import LeadForm from './LeadForm';

interface LocationLayoutProps {
  location: string;
  title: string;
  description: string;
  keywords: string[];
}

export default function LocationLayout({ location, title, description, keywords }: LocationLayoutProps) {
  const handleWhatsApp = () => {
    window.open(`https://wa.me/919999882898`, '_blank');
  };

  const handleCall = () => {
    window.location.href = 'tel:9999882898';
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
            alt={location}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {title}
            </h1>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              {description}
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={handleCall} className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold flex items-center space-x-2 transition-all">
                <Phone size={20} />
                <span>Call Expert</span>
              </button>
              <button onClick={handleWhatsApp} className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold flex items-center space-x-2 transition-all">
                <MessageCircle size={20} />
                <span>WhatsApp Now</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Why Choose REAL PROP in {location}?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center shrink-0">
                    <Building size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2">Premium Commercial Property</h4>
                    <p className="text-gray-600">We offer the best commercial property for sale in {location}, including high-yield office spaces and retail shops.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2">High Rental Yields</h4>
                    <p className="text-gray-600">Our investment consultants focus on properties with maximum ROI and stable rental income in {location}.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center shrink-0">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2">Trusted Property Investment Consultant</h4>
                    <p className="text-gray-600">REAL PROP is your dedicated property investment consultant in {location}, ensuring transparent and secure deals.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Enquire About {location} Projects</h3>
              <LeadForm noContainer={true} />
            </div>
          </div>
        </div>
      </section>

      {/* Keywords Cloud */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {keywords.map((kw, i) => (
              <span key={i} className="px-4 py-2 bg-white rounded-full text-sm text-gray-500 border border-gray-200 shadow-sm">
                {kw}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
