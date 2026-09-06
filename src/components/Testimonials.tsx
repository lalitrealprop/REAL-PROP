import { Star, Quote } from 'lucide-react';
import { motion } from 'motion/react';

const REVIEWS = [
  { name: 'Amit Sharma', role: 'Business Owner', text: 'Got the best deal for my shop in Noida. Highly recommended! Lalit Kumar is very professional and honest.', rating: 5 },
  { name: 'Priya Verma', role: 'Investor', text: 'Very professional and honest consultant. Helped me find a great investment property with high ROI potential.', rating: 5 },
  { name: 'Rahul Gupta', role: 'Home Buyer', text: 'Helped me find my dream home in Greater Noida. The process was smooth and transparent. Thank you REAL PROP!', rating: 5 },
];

export default function Testimonials() {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">Real stories from real clients who found their perfect property with REAL PROP.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {REVIEWS.map((review, index) => (
          <motion.div
            key={review.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative"
          >
            <div className="absolute top-6 right-8 text-red-100">
              <Quote size={48} fill="currentColor" />
            </div>
            
            <div className="flex items-center space-x-1 mb-6">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} size={18} fill="#ef4444" className="text-red-500" />
              ))}
            </div>

            <p className="text-gray-600 italic mb-8 leading-relaxed relative z-10">
              "{review.text}"
            </p>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold text-lg">
                {review.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{review.name}</h4>
                <p className="text-sm text-gray-500">{review.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
