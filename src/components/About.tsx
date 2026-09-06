import { motion } from 'motion/react';
import { Star, ShieldCheck, TrendingUp, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        {/* Left Side: Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:w-1/2 relative"
        >
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://instasize.com/api/image/5f2cbf5d91e3ce08f94780378c59e96ac4fd41256e0c1ee8172c86049b3539b5.jpeg"
              alt="Property Investment Consultant Lalit Kumar"
              className="w-full h-[350px] md:h-[500px] object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Decorative Elements */}
          <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 w-24 md:w-32 h-24 md:h-32 bg-red-600 rounded-2xl -z-0 opacity-20" />
          <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 w-24 md:w-32 h-24 md:h-32 bg-yellow-500 rounded-2xl -z-0 opacity-20" />
          
          <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-xl z-20 flex items-center space-x-3 md:space-x-4 border border-gray-100">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
              <Star size={20} className="md:w-6 md:h-6" fill="currentColor" />
            </div>
            <div>
              <p className="text-[10px] md:text-sm text-gray-500 font-medium uppercase tracking-wider">Experience</p>
              <p className="text-lg md:text-xl font-bold text-gray-900">10+ Years in NCR</p>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:w-1/2"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
            REAL PROP – <br />
            <span className="text-red-600">Property Investment Consultant in Delhi NCR</span>
          </h2>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            Meet <span className="font-bold text-gray-900">Lalit Kumar</span>, your dedicated <span className="font-bold text-red-600">Property Investment Consultant</span> specializing in the dynamic <span className="font-bold text-gray-900">Delhi NCR</span> market. With years of experience in <span className="font-bold text-gray-900">Noida, Greater Noida, Ghaziabad, and Delhi</span>, we bring unmatched expertise to your property journey.
          </p>
          <p className="text-gray-600 text-lg mb-10 leading-relaxed">
            At <span className="font-bold text-red-600">REAL PROP</span>, we focus on trust, transparency, and delivering the best deals for <span className="font-bold text-gray-900">commercial property investment in Delhi NCR</span>. Whether you're looking for a dream home, a strategic <span className="font-bold text-gray-900">office space for sale</span>, or high-yield investment opportunities, we provide expert guidance as your premier <span className="font-bold text-gray-900">property investment consultant</span>.
          </p>

          <div className="grid grid-cols-2 gap-8">
            <div className="flex items-start space-x-3">
              <ShieldCheck className="text-red-600 mt-1" size={24} />
              <div>
                <h4 className="font-bold text-gray-900">Trusted Advice</h4>
                <p className="text-sm text-gray-500">Honest and transparent consultancy.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <TrendingUp className="text-red-600 mt-1" size={24} />
              <div>
                <h4 className="font-bold text-gray-900">Best ROI</h4>
                <p className="text-sm text-gray-500">Strategic investment guidance.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
