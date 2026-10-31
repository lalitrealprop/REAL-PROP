import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth, logout } from './firebase';
import { motion } from 'motion/react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LeadForm from './components/LeadForm';
import ProjectsSection from './components/ProjectsSection';
import YouTubeSection from './components/YouTubeSection';
import About from './components/About';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import AdminDashboard from './components/AdminDashboard';
import InvestorBuyerSections from './components/InvestorBuyerSections';
import CTASection from './components/CTASection';

import GreaterNoida from './pages/GreaterNoida';
import Noida from './pages/Noida';
import NoidaExtension from './pages/NoidaExtension';
import Ghaziabad from './pages/Ghaziabad';
import Delhi from './pages/Delhi';
import SVGCentralSquare from './pages/SVGCentralSquare';
import CRCThePeridona from './pages/CRCThePeridona';
import AceArteSector150Noida from './pages/AceArteSector150Noida';
import './styles-ace-arte.css';
import HeroHomesSectorMU from './pages/HeroHomesSectorMU';
import './styles-hero-homes.css';
import ProjectsListing from './pages/ProjectsListing';
import CorbettCounty from './pages/CorbettCounty';

const ADMIN_EMAIL = 'realprop201301@gmail.com';

function HomePage() {
  return (
    <div className="bg-white">
      <Hero />
      <InvestorBuyerSections />
      <div id="lead-form" className="py-16 bg-gray-50"><LeadForm /></div>
      <div id="projects" className="py-16"><ProjectsSection /></div>
      <div id="youtube" className="py-16 bg-gray-50"><YouTubeSection /></div>
      <div id="about" className="py-16"><About /></div>
      <div id="why-choose-us" className="py-16 bg-gray-50"><WhyChooseUs /></div>
      <div id="testimonials" className="py-16"><Testimonials /></div>
      <CTASection />
      <div id="contact" className="py-16 bg-gray-50"><Contact /></div>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthReady(true);
    });
    return unsubscribe;
  }, []);

  const isAdmin = Boolean(
    user &&
    user.emailVerified &&
    user.email?.toLowerCase() === ADMIN_EMAIL
  );

  const handleLogout = () => {
    void logout().catch((error) => console.error('Admin sign-out failed:', error));
  };

  if (!isAuthReady) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-white">
        <div className="w-32 h-32 mb-8 animate-pulse">
          <img
            src="https://instasize.com/api/image/87e2fdb8828fd9cdfa4566774e9ba73c587ea743872310c777de048c2b9dd4b1.jpeg"
            alt="REAL PROP"
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex flex-col items-center space-y-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full"
          />
          <p className="text-gray-500 font-bold tracking-widest uppercase text-xs">Loading REAL PROP</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <AppShell isAdmin={isAdmin} user={user} onLogout={handleLogout} />
    </Router>
  );
}

function AppShell({
  isAdmin,
  user,
  onLogout,
}: {
  isAdmin: boolean;
  user: User | null;
  onLogout: () => void;
}) {
  const location = useLocation();

  if (location.pathname === '/projects/corbett-county-jim-corbett') {
    return <CorbettCounty />;
  }
  if (location.pathname === '/projects/crc-the-peridona') {
    return <CRCThePeridona />;
  }
  if (location.pathname === '/projects/ace-arte-sector-150-noida') {
    return <AceArteSector150Noida />;
  }
  if (location.pathname === '/projects/hero-homes-sector-mu-greater-noida') {
    return <HeroHomesSectorMU />;
  }

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900">
      <Navbar isAdmin={isAdmin} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/greater-noida" element={<GreaterNoida />} />
          <Route path="/noida" element={<Noida />} />
          <Route path="/noida-extension" element={<NoidaExtension />} />
          <Route path="/ghaziabad" element={<Ghaziabad />} />
          <Route path="/delhi" element={<Delhi />} />
          <Route path="/projects/svg-central-square" element={<SVGCentralSquare />} />
          <Route path="/projects/crc-the-peridona" element={<CRCThePeridona />} />
          <Route path="/projects/ace-arte-sector-150-noida" element={<AceArteSector150Noida />} />
          <Route path="/projects/hero-homes-sector-mu-greater-noida" element={<HeroHomesSectorMU />} />
          <Route path="/projects" element={<ProjectsListing />} />
          <Route
            path="/admin/*"
            element={
              <AdminDashboard
                user={user}
                isAdmin={isAdmin}
                onLogin={() => { /* Legacy prop retained for compatibility; never grants access. */ }}
                onLogout={onLogout}
              />
            }
          />
        </Routes>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}

