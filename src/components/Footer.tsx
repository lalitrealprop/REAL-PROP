import { Link, useLocation } from 'react-router-dom';
import { Youtube, Phone, Mail, MapPin, MessageCircle, ChevronRight, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  const location = useLocation();
  const isSVGProject = location.pathname === '/projects/svg-central-square';
  if (isSVGProject) {
    const links = [['Home','home'],['Project','project'],['Retail','retail-spaces'],['Studio','studio-apartments'],['Floor Plans','floor-plans'],['Pricing','pricing'],['Gallery','gallery'],['Contact','contact']];
    return (
      <footer className="bg-[#07080b] text-white border-t border-white/10 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12">
            <div><div className="text-[#d7ad5a] text-xs font-black tracking-[.3em]">SVG CENTRAL SQUARE</div><h3 className="text-2xl font-black mt-3">Premium Retail Spaces & Studio Apartments</h3><p className="text-white/50 mt-4 text-sm">Chai Phai, Greater Noida</p></div>
            <div><h4 className="font-black text-lg">Navigation</h4><div className="grid grid-cols-2 gap-3 mt-5">{links.map(([name,id])=><button key={id} onClick={()=>document.getElementById(id)?.scrollIntoView({behavior:'smooth'})} className="text-left text-sm text-white/55 hover:text-[#d7ad5a] flex items-center gap-1"><ChevronRight size={13}/>{name}</button>)}</div></div>
            <div><h4 className="font-black text-lg">Contact</h4><div className="space-y-4 mt-5 text-sm text-white/60"><a href="tel:9999882898" className="flex items-center gap-3 hover:text-white"><Phone size={17} className="text-[#d7ad5a]"/>9999882898</a><a href="https://wa.me/919999882898" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-white"><MessageCircle size={17} className="text-[#d7ad5a]"/>WhatsApp</a><a href="mailto:realprop201301@gmail.com" className="flex items-center gap-3 hover:text-white"><Mail size={17} className="text-[#d7ad5a]"/>realprop201301@gmail.com</a></div></div>
            <div><h4 className="font-black text-lg">Branding</h4><p className="mt-5 text-white/60 text-sm">SVG Central Square</p><p className="mt-2 text-white/40 text-sm">SVG Realty</p><div className="flex gap-2 mt-5"><a href="https://www.youtube.com/@RealProp6603" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center"><Youtube size={17}/></a><a href="https://www.facebook.com/share/1AoMWkiiLz/" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center"><Facebook size={17}/></a><a href="https://www.instagram.com/real_prop123" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center"><Instagram size={17}/></a></div></div>
          </div>
          <div className="pt-7 border-t border-white/10 text-center text-xs text-white/35">© {new Date().getFullYear()} REAL PROP. SVG Central Square. All rights reserved.</div>
        </div>
      </footer>
    );
  }
  const handleLinkClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300 pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <img 
                src="https://instasize.com/api/image/87e2fdb8828fd9cdfa4566774e9ba73c587ea743872310c777de048c2b9dd4b1.jpeg" 
                alt="REAL PROP Logo" 
                className="h-16 w-16 rounded-full object-cover border-2 border-red-600 shadow-lg mb-2"
                referrerPolicy="no-referrer"
              />
            </Link>
            <p className="text-gray-400 leading-relaxed">
              Turning Dreams Into Reality. Your trusted property investment partner in Noida, Greater Noida, Ghaziabad & Delhi NCR.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.youtube.com/@RealProp6603" 
                target="_blank" 
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"
              >
                <Youtube size={20} />
              </a>
              <a 
                href="https://www.facebook.com/share/1AoMWkiiLz/" 
                target="_blank" 
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://www.instagram.com/real_prop123" 
                target="_blank" 
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://wa.me/919999882898" 
                target="_blank" 
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 hover:text-white transition-all"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-8">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'Projects', 'About', 'Contact'].map((link) => (
                <li key={link}>
                  <button 
                    onClick={() => handleLinkClick(link.toLowerCase())}
                    className="flex items-center space-x-2 hover:text-red-500 transition-colors"
                  >
                    <ChevronRight size={14} />
                    <span>{link}</span>
                  </button>
                </li>
              ))}
              <li>
                <Link to="/admin" className="flex items-center space-x-2 hover:text-red-500 transition-colors">
                  <ChevronRight size={14} />
                  <span>Admin Login</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-white font-bold text-lg mb-8">Our Locations</h4>
            <ul className="space-y-4">
              {[
                { name: 'Greater Noida', href: '/greater-noida' },
                { name: 'Noida', href: '/noida' },
                { name: 'Noida Extension', href: '/noida-extension' },
                { name: 'Ghaziabad', href: '/ghaziabad' },
                { name: 'Delhi', href: '/delhi' },
              ].map((loc) => (
                <li key={loc.name}>
                  <Link to={loc.href} className="flex items-center space-x-2 hover:text-red-500 transition-colors">
                    <ChevronRight size={14} />
                    <span>{loc.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-lg mb-8">Contact Info</h4>
            <ul className="space-y-6">
              <li className="flex items-start space-x-4">
                <Phone className="text-red-600 shrink-0" size={20} />
                <span>+91 99998 82898</span>
              </li>
              <li className="flex items-start space-x-4">
                <MapPin className="text-red-600 shrink-0" size={20} />
                <span>FF 12-A, 1st Floor, Suntwilight Market, Delta 1, Greater Noida, U.P. 201310</span>
              </li>
              <li className="flex items-start space-x-4">
                <Mail className="text-red-600 shrink-0" size={20} />
                <span>info@realprop.online</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h4 className="text-white font-bold text-lg mb-8">Best Investment Deals</h4>
            <p className="text-gray-400 mb-6 text-sm">Get the latest property updates and investment opportunities directly in your inbox.</p>
            <div className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-gray-800 border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-red-600 outline-none"
              />
              <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg text-sm transition-all">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} REAL PROP. All rights reserved. Designed for excellence.</p>
        </div>
      </div>
    </footer>
  );
}
