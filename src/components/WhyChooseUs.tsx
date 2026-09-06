import { ShieldCheck, TrendingUp, MapPin, Users, Briefcase, Handshake, SearchCheck } from 'lucide-react';
import { motion } from 'motion/react';

const FEATURES = [
  { title: 'Commercial Property Specialist', description: 'Deep expertise in retail shops, office spaces, and commercial land investments.', icon: Briefcase },
  { title: 'Verified & Trusted Projects', description: 'We only deal in RERA-approved and legally verified commercial developments.', icon: SearchCheck },
  { title: 'NCR Market Expertise', description: 'Strategic insights into Noida, Greater Noida, and Delhi NCR real estate trends.', icon: MapPin },
  { title: 'Investment Advisory Support', description: 'End-to-end guidance to help you build a high-return property portfolio.', icon: TrendingUp },
  { title: 'Transparent Deals', description: 'Clear communication and ethical practices for a secure investment experience.', icon: Handshake },
];

export default function WhyChooseUs() {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose REAL PROP?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">Your trusted partner for premium commercial real estate investments in Delhi NCR.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {FEATURES.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 group text-center"
          >
            <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-red-600 group-hover:text-white transition-all">
              <feature.icon size={28} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
