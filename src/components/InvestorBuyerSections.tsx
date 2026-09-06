import { motion } from 'motion/react';
import { TrendingUp, Building, Briefcase, Wallet, ShieldCheck, BarChart3 } from 'lucide-react';

export default function InvestorBuyerSections() {
  return (
    <div className="space-y-24 py-20">
      {/* Investment Opportunities Section */}
      <section className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Investment <span className="text-red-600">Opportunities</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Strategic commercial property investment options in Delhi NCR designed for maximum returns and security.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "High Rental Yield",
              desc: "Earn consistent monthly rental income with pre-leased commercial properties in prime business hubs.",
              icon: TrendingUp,
              color: "bg-red-50 text-red-600"
            },
            {
              title: "Early Stage Projects",
              desc: "Invest early in upcoming commercial developments for maximum capital appreciation and better entry prices.",
              icon: Wallet,
              color: "bg-blue-50 text-blue-600"
            },
            {
              title: "Growth Locations",
              desc: "Prime areas with high future demand and infrastructure development in Noida, Greater Noida & Delhi NCR.",
              icon: BarChart3,
              color: "bg-green-50 text-green-600"
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="p-8 bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 text-center will-change-transform"
            >
              <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mb-6 mx-auto`}>
                <item.icon size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Buyer Intent Section */}
      <section className="bg-gray-900 py-24 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-red-600/10 skew-x-12 translate-x-1/4" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-8">
                Ready to <span className="text-red-500">Buy Property</span> or Office Space?
              </h2>
              <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                Whether you're looking for a premium office space for sale or a retail shop in a high-footfall area, REAL PROP provides end-to-end assistance in finding your perfect commercial space.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: "Office Space for Sale", icon: Briefcase },
                  { title: "Retail Shops", icon: Building },
                  { title: "Commercial Land", icon: ShieldCheck },
                  { title: "Pre-Leased Assets", icon: TrendingUp }
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-3 text-white">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-red-500">
                      <item.icon size={20} />
                    </div>
                    <span className="font-medium">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
                alt="Modern Office" 
                className="rounded-3xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-red-600 text-white p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-xl">
                <p className="text-2xl md:text-3xl font-bold mb-1">1000+</p>
                <p className="text-[10px] md:text-sm uppercase tracking-wider font-medium opacity-80">Premium Spaces Sold</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
