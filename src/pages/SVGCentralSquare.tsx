import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  Building2,
  Calculator,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';
import {
  trackCalculatorUsed,
  trackEnquiryFormOpened,
  trackEnquiryFormStarted,
  trackFloorPlanViewed,
  trackFloorSelected,
  trackLeadSubmitted,
  trackCallClicked,
  trackPaymentPlanViewed,
  trackProjectView,
  trackWhatsAppClicked,
  trackGalleryOpened,
} from '../lib/analytics';

const PHONE = '9999882898';
const WHATSAPP = '919999882898';
const MAP_QUERY = 'Chai Phai, Greater Noida';

const floors = [
  { id: 'LGF', label: 'Lower Ground', short: 'LGF', rate: 20000, rent: 100, plan: 'floor-1.jpg' },
  { id: 'GF', label: 'Ground Floor', short: 'GF', rate: 31000, rent: 150, plan: 'floor-2.jpg' },
  { id: 'FF', label: 'First Floor', short: '1F', rate: 20000, rent: 100, plan: 'floor-3.jpg' },
  { id: 'SF', label: 'Second Floor', short: '2F', rate: 15000, rent: 75, plan: 'floor-4.jpg' },
  { id: '3F', label: 'Third Floor', short: '3F', rate: null, rent: null, plan: 'floor-5.jpg' },
  { id: '4F', label: 'Fourth Floor', short: '4F', rate: null, rent: null, plan: 'floor-6.jpg' },
  { id: '5F', label: 'Fifth Floor', short: '5F', rate: null, rent: null, plan: 'floor-7.jpg' },
];

const plcOptions = [
  ['None', 0],
  ['24 Meter Road', 5],
  ['24 Meter Road Corner', 7.5],
  ['Lake Facing — GF', 3],
  ['Lake Corner — GF', 5],
  ['18 Meter Road', 3],
  ['18 Meter Road Corner', 5],
] as const;

const paymentPlans = {
  'Construction Link': [
    ['10%', 'At the time of booking'],
    ['30%', 'Within 45 days of booking'],
    ['10%', 'On completion of lower basement'],
    ['10%', 'On casting of ground floor'],
    ['7.5%', 'On casting of 1st floor'],
    ['7.5%', 'On casting of 3rd floor'],
    ['10%', 'On completion of super structure'],
    ['10%', 'On start of finishing'],
    ['5% + other charges', 'On offer of possession'],
  ],
  Flexi: [
    ['10%', 'At the time of booking'],
    ['40%', 'Within 45 days of booking'],
    ['25%', 'On casting of 3rd floor'],
    ['20%', 'On completion of finishing work'],
    ['5% + other charges', 'On offer of possession'],
  ],
  'Down Payment': [
    ['10%', 'At the time of booking'],
    ['85%', 'Within 45 days of booking'],
    ['5% + other charges', 'On offer of possession + possession charges'],
  ],
};

const galleryItems = [
  { src: '/svg-central-square/svg-02.jpeg', title: 'Exterior View', category: 'Exterior' },
  { src: '/svg-central-square/svg-03.jpeg', title: 'Night Exterior', category: 'Night View' },
  { src: '/svg-central-square/svg-04.jpeg', title: 'Studio Interior', category: 'Studio' },
  { src: '/svg-central-square/svg-05.jpeg', title: 'Atrium & Retail Experience', category: 'Retail Experience' },
  { src: '/svg-central-square/svg-06.jpeg', title: 'Night View', category: 'Night View' },
  { src: '/svg-central-square/svg-07.jpeg', title: 'Main Exterior', category: 'Exterior' },
  { src: '/svg-central-square/svg-08.jpeg', title: 'Street-facing Retail', category: 'Exterior' },
  { src: '/svg-central-square/svg-09.jpeg', title: 'Project Exterior', category: 'Exterior' },
  { src: '/svg-central-square/svg-01.jpeg', title: 'Grand Atrium', category: 'Interior' },
  { src: '/svg-central-square/svg-10.jpeg', title: 'Studio Interior', category: 'Studio' },
];

const floorGallery = floors.map((item) => ({
  src: `/svg-central-square/floorplans/${item.plan}`,
  title: `${item.label} Floor Plan`,
  category: 'Floor Plans',
}));

const allGalleryItems = [...galleryItems, ...floorGallery];
const galleryCategories = ['All', 'Exterior', 'Interior', 'Retail Experience', 'Night View', 'Studio', 'Floor Plans'];

function money(value: number) {
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(value);
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function SVGCentralSquare() {
  const [floorId, setFloorId] = useState('GF');
  const [area, setArea] = useState('500');
  const [plc, setPlc] = useState(0);
  const [roadFacing, setRoadFacing] = useState('No');
  const [corner, setCorner] = useState('No');
  const [plan, setPlan] = useState<keyof typeof paymentPlans>('Construction Link');
  const [showLead, setShowLead] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [galleryFilter, setGalleryFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const calculatorTracked = useRef(false);
  const enquiryStartedTracked = useRef(false);

  const floor = floors.find((item) => item.id === floorId)!;
  const numericArea = Math.max(0, Number(area) || 0);
  const bsp = floor.rate ? numericArea * floor.rate : 0;
  const plcAmount = bsp * (plc / 100);
  const estimate = bsp + plcAmount;
  const monthlyRent = floor.rent ? numericArea * floor.rent : 0;
  const heroImage = '/svg-central-square/svg-01.jpeg';

  const whatsappUrl = useMemo(() => {
    const text = `Hi, I am interested in SVG Central Square, Greater Noida. Please share latest price, availability and payment plan. Floor: ${floor.label}. Area: ${numericArea} sq.ft.`;
    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
  }, [floor.label, numericArea]);

  const filteredGallery = galleryFilter === 'All'
    ? allGalleryItems
    : allGalleryItems.filter((item) => item.category === galleryFilter);

  useEffect(() => {
    trackProjectView();
    const paymentPlan = document.getElementById('payment-plan');
    if (!paymentPlan || typeof IntersectionObserver === 'undefined') return;
    let fired = false;
    const observer = new IntersectionObserver((entries) => {
      if (!fired && entries.some((entry) => entry.isIntersecting)) {
        fired = true;
        trackPaymentPlanViewed();
        observer.disconnect();
      }
    }, { threshold: 0.25 });
    observer.observe(paymentPlan);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (event.key === 'Escape') setLightboxIndex(null);
      if (event.key === 'ArrowRight') setLightboxIndex((value) => value === null ? null : (value + 1) % filteredGallery.length);
      if (event.key === 'ArrowLeft') setLightboxIndex((value) => value === null ? null : (value - 1 + filteredGallery.length) % filteredGallery.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex, filteredGallery.length]);

  const openLead = () => {
    setSubmitted(false);
    setShowLead(true);
    trackEnquiryFormOpened();
  };

  const trackCalculatorInteraction = (nextFloor: string, nextArea: number) => {
    if (!calculatorTracked.current) {
      calculatorTracked.current = true;
      trackCalculatorUsed(nextFloor, nextArea);
    }
  };

  const submitLead = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'leads'), {
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        propertyInterest: 'SVG Central Square',
        propertyType: form.message || 'General',
        budget: estimate ? `Estimated ₹${money(estimate)}` : 'Price enquiry',
        location: 'Chai Phai, Greater Noida',
        message: `${form.message || 'Price & availability enquiry'} | Floor: ${floor.label} | Area: ${numericArea} sq.ft. | PLC: ${plc}%`,
        project: 'SVG Central Square',
        floor: floor.label,
        area: numericArea,
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
      trackLeadSubmitted();
    } catch (error) {
      console.error(error);
      window.location.href = whatsappUrl;
    }
  };

  const changeFloor = (value: string) => {
    const selected = floors.find((item) => item.id === value);
    setFloorId(value);
    trackFloorSelected(selected?.label || value);
    trackFloorPlanViewed(selected?.label || value);
    trackCalculatorInteraction(selected?.label || value, numericArea);
  };

  return (
    <>
      <SEO />
      <StructuredData />
      <div className="bg-[#08090c] text-white overflow-hidden svg-project-mobile-space">
        {/* 03 — HERO */}
        <section id="home" className="relative min-h-[700px] lg:min-h-[710px] flex items-center overflow-hidden">
          <img src={heroImage} alt="SVG Central Square Greater Noida" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#05070b] via-[#05070b]/90 to-[#05070b]/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08090c] via-transparent to-[#08090c]/10" />
          <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-10 pt-24 pb-10 lg:pt-28 lg:pb-14">
            <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_.92fr] gap-7 lg:gap-10 items-center">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 sm:gap-4 mb-4">
                  <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-white p-2 shadow-2xl shrink-0">
                    <img src="/svg-central-square/svg-central-square-logo.jpg" alt="SVG Central Square Logo" className="w-full h-full rounded-xl object-contain" />
                  </div>
                  <div>
                    <div className="uppercase tracking-[0.24em] text-[#d7ad5a] text-[9px] sm:text-xs font-black">REAL PROP PRESENTS</div>
                    <div className="mt-1 text-white/65 text-[11px] sm:text-sm">Chai Phai, Greater Noida • Premium Commercial Investment</div>
                  </div>
                </div>
                <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-[#d7ad5a]/40 bg-black/30 backdrop-blur-sm text-[#d7ad5a] text-[9px] sm:text-xs font-black tracking-[0.14em] sm:tracking-[0.20em] mb-4">PREMIUM RETAIL & MODERN LIVING</div>
                <h1 className="text-[39px] sm:text-5xl md:text-7xl lg:text-[68px] font-black tracking-tight leading-[0.94]">A New Address<br /><span className="text-[#d7ad5a]">for Premium Retail & Modern Living</span></h1>
                <div className="mt-3 text-lg sm:text-2xl font-bold tracking-wide text-white/90">SVG CENTRAL SQUARE</div>
                <p className="mt-3 text-[13px] sm:text-base md:text-lg text-white/75 max-w-2xl leading-relaxed">SVG Central Square — a thoughtfully designed commercial destination at Chai Phai, Greater Noida, bringing together premium retail spaces and studio-apartment planning.</p>
                <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['PREMIUM RETAIL SPACES', 'STUDIO APARTMENTS', 'MULTI-LEVEL COMMERCIAL DESTINATION', 'GREATER NOIDA'].map((item) => <div key={item} className="rounded-xl border border-white/15 bg-black/35 backdrop-blur-sm px-3 py-3 text-[9px] sm:text-[10px] font-black tracking-wider text-white/80">{item}</div>)}
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button type="button" onClick={() => scrollToId('investment-calculator')} className="px-6 py-3.5 bg-[#d7ad5a] text-black font-black rounded-full flex items-center gap-2 hover:bg-[#e3c477] transition-colors shadow-lg"><Calculator size={18} /> GET PRICE & AVAILABILITY</button>
                  <a href={whatsappUrl} target="_blank" rel="noreferrer" onClick={trackWhatsAppClicked} className="px-6 py-3.5 border border-white/30 bg-black/25 backdrop-blur-sm rounded-full font-bold flex items-center gap-2 hover:bg-white/10 transition-colors"><MessageCircle size={18} /> WHATSAPP NOW</a>
                </div>
                <div className="mt-4 text-[10px] sm:text-xs text-white/55">₹15,000 / Sq.Ft. onwards* &nbsp;|&nbsp; Pre-Leased Retail Shops &nbsp;|&nbsp; Multiple Payment Plans</div>
                <p className="mt-1 text-[9px] text-white/40">*Lowest listed BSP in the supplied price list is ₹15,000/sq.ft. for Second Floor. Latest availability and applicable charges are subject to confirmation.</p>
              </div>

              <div className="w-full max-w-[390px] lg:ml-auto">
                <div className="bg-white text-black rounded-[1.5rem] sm:rounded-[2rem] shadow-2xl border border-white/20 overflow-hidden">
                  <div className="bg-[#11151c] text-white px-5 py-4 sm:px-6 sm:py-5">
                    <div className="text-[#d7ad5a] text-[9px] sm:text-[10px] font-black tracking-[0.24em]">PRIVATE PROJECT PREVIEW</div>
                    <h2 className="text-[22px] sm:text-[28px] leading-tight font-black mt-1.5">Get Latest Price & Availability</h2>
                    <p className="text-white/55 text-xs sm:text-sm mt-1.5 leading-relaxed">Share your details and our REAL PROP team can connect with you.</p>
                  </div>
                  {submitted ? (
                    <div className="p-5 sm:p-6 text-center"><CheckCircle2 className="mx-auto text-green-600" size={46} /><h3 className="text-xl sm:text-2xl font-black mt-3">Enquiry Received</h3><p className="text-black/60 mt-2 text-sm">Our REAL PROP team can share the latest availability and cost details.</p><a href={whatsappUrl} target="_blank" rel="noreferrer" onClick={trackWhatsAppClicked} className="inline-flex items-center gap-2 mt-4 px-5 py-3 rounded-full bg-black text-white font-bold text-sm"><MessageCircle size={17} /> Continue on WhatsApp</a></div>
                  ) : (
                    <form onSubmit={submitLead} onFocus={() => { if (!enquiryStartedTracked.current) { enquiryStartedTracked.current = true; trackEnquiryFormStarted(); } }} className="p-5 sm:p-6 space-y-3">
                      <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full Name" className="w-full rounded-xl border border-black/10 p-3.5 text-sm outline-none focus:border-[#d7ad5a]" />
                      <input required pattern="[0-9]{10}" inputMode="numeric" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })} placeholder="10-digit Mobile Number" className="w-full rounded-xl border border-black/10 p-3.5 text-sm outline-none focus:border-[#d7ad5a]" />
                      <select required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full rounded-xl border border-black/10 p-3.5 text-sm bg-white outline-none focus:border-[#d7ad5a]">
                        <option value="">Interested In</option><option value="Retail Shop">Retail Shop</option><option value="Pre-Leased Shop">Pre-Leased Shop</option><option value="Studio Apartment">Studio Apartment</option><option value="Investment">Investment</option><option value="Site Visit">Site Visit</option>
                      </select>
                      <div className="rounded-xl bg-[#f7f4ed] border border-[#d7ad5a]/30 p-3 text-xs text-black/55"><b className="text-black/70">Current selection:</b> {floor.label} · {numericArea} sq.ft. · PLC {plc}%</div>
                      <button type="submit" className="w-full rounded-xl bg-black text-white py-3.5 font-black flex items-center justify-center gap-2 hover:bg-[#d7ad5a] hover:text-black transition-colors">GET PROJECT DETAILS <ArrowRight size={18} /></button>
                      <p className="text-[9px] text-center text-black/40">Your enquiry is for SVG Central Square via REAL PROP.</p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 04 — PROJECT INTRODUCTION */}
        <section id="project" className="py-20 sm:py-24 bg-[#0d0f14]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-[2rem] overflow-hidden border border-white/10"><img src="/svg-central-square/svg-02.jpeg" alt="SVG Central Square exterior" className="w-full h-[340px] md:h-[500px] object-cover" /></motion.div>
              <div><div className="text-[#d7ad5a] text-xs font-black tracking-[.3em]">PROJECT INTRODUCTION</div><h2 className="text-4xl md:text-6xl font-black mt-3 leading-tight">Where Business Meets Lifestyle</h2><p className="mt-5 text-white/65 leading-relaxed">SVG Central Square brings together premium retail spaces and studio apartments in a contemporary commercial destination designed for visibility, convenience and modern urban experiences.</p>
                <div className="grid sm:grid-cols-3 gap-4 mt-8">
                  {[
                    ['Premium Retail', 'Curated commercial spaces for retail and business opportunities.', Building2],
                    ['Studio Apartments', 'Dedicated upper-level spaces shown in the project design.', Building2],
                    ['Designed for Experience', 'Contemporary architecture with landscaped areas, atriums and distinctive common spaces.', Sparkles],
                  ].map(([title, text, Icon]) => <div key={String(title)} className="rounded-2xl border border-white/10 bg-white/[.035] p-5"><Icon size={20} className="text-[#d7ad5a]" /><h3 className="font-black mt-3">{String(title)}</h3><p className="text-sm text-white/55 mt-2 leading-relaxed">{String(text)}</p></div>)}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 05 — PROJECT HIGHLIGHTS */}
        <section className="py-20 bg-black" id="highlights">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10"><div className="text-center max-w-3xl mx-auto mb-12"><div className="text-[#d7ad5a] text-xs font-black tracking-[.3em]">PROJECT HIGHLIGHTS</div><h2 className="text-4xl md:text-6xl font-black mt-3">Everything Designed Around Opportunity</h2></div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {['Premium Retail Spaces', 'Studio Apartments', 'Multiple Commercial Floors', 'Contemporary Architecture', 'Atrium & Common Spaces', 'Strategic Road Connectivity'].map((title, i) => <motion.div key={title} whileHover={{ y: -4 }} className="rounded-3xl border border-white/10 bg-[#0e1015] p-7 min-h-[170px]"><div className="text-[#d7ad5a] text-sm font-black">0{i + 1}</div><h3 className="text-xl font-black mt-5">{title}</h3><p className="text-white/50 text-sm mt-2">{i < 3 ? 'A project planning element shown in the supplied project information.' : 'A design and planning element reflected in the supplied project visuals and blueprint.'}</p></motion.div>)}
            </div>
          </div>
        </section>

        {/* 06 — RETAIL SPACES */}
        <section id="retail-spaces" className="py-20 sm:py-24 bg-[#f4f1ea] text-[#111]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10"><div className="grid lg:grid-cols-[.9fr_1.1fr] gap-10 items-center"><div><div className="text-[#9b762e] text-xs font-black tracking-[.3em]">RETAIL SPACES</div><h2 className="text-4xl md:text-6xl font-black mt-3 leading-tight">Own a Premium Retail Space</h2><p className="mt-5 text-black/60 leading-relaxed">Explore the listed floor-wise BSP for premium retail spaces. Prices below are based on super-area pricing in the supplied price list.</p><button onClick={openLead} className="mt-7 px-6 py-3.5 rounded-full bg-black text-white font-black inline-flex items-center gap-2">CHECK AVAILABLE UNITS <ArrowRight size={18} /></button></div>
            <div className="grid sm:grid-cols-2 gap-4">{floors.slice(0, 4).map((item) => <button key={item.id} onClick={() => { changeFloor(item.id); scrollToId('investment-calculator'); }} className="text-left rounded-3xl bg-white border border-black/5 p-6 shadow-sm hover:shadow-xl transition-all"><div className="text-xs font-black tracking-widest text-black/40">{item.label.toUpperCase()}</div><div className="text-3xl font-black mt-3">₹{money(item.rate || 0)}<span className="text-sm font-bold text-black/40"> / Sq.Ft.*</span></div><div className="mt-4 text-sm text-black/50">Listed BSP · Super Area basis</div></button>)}</div></div></div>
        </section>

        {/* 07 — WHY INVEST */}
        <section id="why-invest" className="py-20 sm:py-24 bg-[#11151c]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10"><div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"><div><div className="text-[#d7ad5a] text-xs font-black tracking-[.3em]">WHY INVEST</div><h2 className="text-4xl md:text-6xl font-black mt-3">Why Consider SVG Central Square?</h2></div><button onClick={openLead} className="shrink-0 px-6 py-3.5 rounded-full bg-[#d7ad5a] text-black font-black">TALK TO AN INVESTMENT ADVISOR</button></div>
            <div className="grid md:grid-cols-2 gap-4">{[['01','Pre-Leased Retail Opportunity','Price list identifies retail pre-leased shops.'],['02','Rent Guarantee Structure','First two years have floor-wise listed rent terms in the supplied price list.'],['03','Multiple Payment Options','Construction Link, Flexi and Down Payment plans are available.'],['04','Multiple Floor Options','Choose among the listed commercial floor categories.']].map(([n,t,d]) => <div key={n} className="rounded-3xl border border-white/10 bg-white/[.03] p-7"><span className="text-[#d7ad5a] font-black">{n}</span><h3 className="text-2xl font-black mt-4">{t}</h3><p className="text-white/55 mt-2 leading-relaxed">{d}</p></div>)}</div>
          </div>
        </section>

        {/* 08 — RENT / LEASE */}
        <section id="rent-lease" className="py-20 sm:py-24 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10"><div className="text-center max-w-3xl mx-auto mb-12"><div className="text-[#d7ad5a] text-xs font-black tracking-[.3em]">RENT / LEASE</div><h2 className="text-4xl md:text-6xl font-black mt-3">Pre-Leased Retail Shops with Rental Assurance</h2><p className="mt-4 text-white/55">Listed rent figures for the first 2 years from possession, as stated in the supplied price list.</p></div>
            <div className="overflow-x-auto rounded-[2rem] border border-white/10"><table className="w-full min-w-[620px] text-left"><thead className="bg-white/10"><tr><th className="px-6 py-5 text-xs tracking-widest">FLOOR</th><th className="px-6 py-5 text-xs tracking-widest">LISTED RENT — FIRST 2 YEARS</th></tr></thead><tbody>{floors.slice(0,4).map((item) => <tr key={item.id} className="border-t border-white/10"><td className="px-6 py-5 font-bold">{item.label}</td><td className="px-6 py-5 text-[#d7ad5a] text-xl font-black">₹{item.rent}/sq.ft.</td></tr>)}</tbody></table></div>
            <p className="text-center text-white/55 mt-6 text-sm">Minimum 9 years and maximum 15 years leasing with a 2-year locking period from the brand, as stated in the price list.</p><div className="text-center"><button onClick={openLead} className="mt-7 px-6 py-3.5 rounded-full bg-[#d7ad5a] text-black font-black">GET COMPLETE RENT & LEASE DETAILS</button></div>
          </div>
        </section>

        {/* 09 — STUDIO APARTMENTS */}
        <section id="studio-apartments" className="py-20 sm:py-24 bg-[#f4f1ea] text-[#111]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10"><div className="grid lg:grid-cols-[1.15fr_.85fr] gap-10 items-center"><div className="grid grid-cols-2 gap-4"><img src="/svg-central-square/svg-04.jpeg" alt="SVG Central Square studio interior" className="rounded-[2rem] w-full h-[300px] md:h-[460px] object-cover" /><img src="/svg-central-square/svg-10.jpeg" alt="SVG Central Square studio interior" className="rounded-[2rem] w-full h-[300px] md:h-[460px] object-cover mt-12" /></div><div><div className="text-[#9b762e] text-xs font-black tracking-[.3em]">STUDIO APARTMENTS</div><h2 className="text-4xl md:text-6xl font-black mt-3">Designed for Modern Studio Living</h2><p className="mt-5 text-black/60 leading-relaxed">Contemporary studio spaces designed as part of the project's upper-floor planning.</p><p className="mt-4 text-sm text-black/45">Exact studio size, price and configuration are not stated here because the verified project information available for this page does not provide those figures.</p><button onClick={openLead} className="mt-7 px-6 py-3.5 rounded-full bg-black text-white font-black inline-flex items-center gap-2">GET STUDIO DETAILS <ArrowRight size={18} /></button></div></div></div>
        </section>

        {/* 10 — ARCHITECTURE / EXPERIENCE */}
        <section id="architecture" className="relative min-h-[560px] flex items-center overflow-hidden"><img src="/svg-central-square/svg-05.jpeg" alt="SVG Central Square atrium and common space" className="absolute inset-0 w-full h-full object-cover" /><div className="absolute inset-0 bg-black/65" /><div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-28"><div className="text-[#d7ad5a] text-xs font-black tracking-[.3em]">ARCHITECTURE / EXPERIENCE</div><h2 className="text-4xl md:text-7xl font-black mt-3">Designed to Make an Impression</h2><p className="mt-5 text-white/70 text-base md:text-lg leading-relaxed">A distinctive commercial environment shaped around expansive common spaces, contemporary interiors and an experience-led architectural concept.</p></div></section>

        {/* CALCULATOR */}
        <section id="investment-calculator" className="py-20 sm:py-24 bg-white text-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10"><div className="max-w-2xl mb-12"><div className="text-[#9b762e] text-xs font-black tracking-[.3em]">CALCULATE YOUR INVESTMENT</div><h2 className="text-4xl md:text-6xl font-black mt-3">Estimate Your Investment</h2><p className="mt-4 text-black/60">Indicative calculation based on the supplied retail price list. Applicable GST, CAM, electricity meter, power backup and other charges are not included.</p></div>
            <div className="grid lg:grid-cols-[1.05fr_.95fr] gap-8"><div className="bg-white rounded-[2rem] p-6 md:p-9 shadow-xl border border-black/5"><div className="grid md:grid-cols-2 gap-5"><label className="font-bold">Floor<select value={floorId} onChange={(e) => changeFloor(e.target.value)} className="mt-2 w-full rounded-xl border p-3 bg-white">{floors.map((item) => <option key={item.id} value={item.id}>{item.label}{item.rate ? ` — ₹${money(item.rate)}/sq.ft.` : ' — Price not supplied'}</option>)}</select></label><label className="font-bold">Area (Sq.Ft.)<input type="number" min="0" value={area} onChange={(e) => { const value=e.target.value; setArea(value); trackCalculatorInteraction(floor.label, Math.max(0, Number(value)||0)); }} className="mt-2 w-full rounded-xl border p-3" /></label></div>
              <label className="font-bold block mt-5">Road Facing<select value={roadFacing} onChange={(e)=>setRoadFacing(e.target.value)} className="mt-2 w-full rounded-xl border p-3 bg-white"><option>Yes</option><option>No</option></select></label>
              <label className="font-bold block mt-5">Corner<select value={corner} onChange={(e)=>setCorner(e.target.value)} className="mt-2 w-full rounded-xl border p-3 bg-white"><option>Yes</option><option>No</option></select></label>
              <label className="font-bold block mt-5">PLC<select value={plc} onChange={(e) => { const value=Number(e.target.value); setPlc(value); trackCalculatorInteraction(floor.label,numericArea); }} className="mt-2 w-full rounded-xl border p-3 bg-white">{plcOptions.map(([label,value]) => <option key={label} value={value}>{label}{value ? ` — ${value}%` : ''}</option>)}</select></label>
              <div className="mt-8 grid sm:grid-cols-3 gap-4"><div className="rounded-2xl bg-black text-white p-5"><span className="text-xs text-white/50">BSP</span><div className="text-xl font-black mt-1">₹{money(bsp)}</div></div><div className="rounded-2xl bg-[#efe7d5] p-5"><span className="text-xs text-black/50">PLC</span><div className="text-xl font-black mt-1">₹{money(plcAmount)}</div></div><div className="rounded-2xl bg-[#d7ad5a] p-5"><span className="text-xs text-black/60">EST. TOTAL</span><div className="text-xl font-black mt-1">₹{money(estimate)}</div></div></div>
              {floor.rent && <div className="mt-5 rounded-2xl border border-[#d7ad5a]/50 bg-[#fffaf0] p-5"><div className="text-xs uppercase tracking-widest font-black text-[#9b762e]">Illustrative monthly rent</div><div className="text-3xl font-black mt-1">₹{money(monthlyRent)}</div><div className="text-xs text-black/50 mt-1">At ₹{floor.rent}/sq.ft. for the first 2 years, as stated in the supplied price list.</div></div>}
              <button onClick={openLead} className="mt-7 w-full rounded-xl bg-black text-white py-4 font-black flex items-center justify-center gap-2">GET EXACT COST SHEET <ArrowRight size={18} /></button>
            </div><div className="rounded-[2rem] overflow-hidden min-h-[520px] bg-black border border-black/10"><img src={`/svg-central-square/floorplans/${floor.plan}`} alt={`${floor.label} floor plan`} className="w-full h-full object-contain" /></div></div>
          </div>
        </section>

        {/* 11 — FLOOR PLANS */}
        <section id="floor-plans" className="py-20 sm:py-24 bg-[#0d0f14]"><div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10"><div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10"><div><div className="text-[#d7ad5a] text-xs font-black tracking-[.3em]">FLOOR PLANS</div><h2 className="text-4xl md:text-6xl font-black mt-3">Explore Every Level</h2></div><a href="/svg-central-square/SVG-Central-Square-Retail-Price-List.pdf" target="_blank" rel="noreferrer" className="text-sm font-bold flex items-center gap-2 text-[#d7ad5a]"><ExternalLink size={16} /> View Full Price List</a></div><div className="flex gap-2 overflow-x-auto pb-4">{floors.map((item) => <button key={item.id} onClick={() => changeFloor(item.id)} className={`shrink-0 px-5 py-3 rounded-full font-bold border ${floorId === item.id ? 'bg-[#d7ad5a] text-black border-[#d7ad5a]' : 'border-white/15 text-white/70'}`}>{item.short}</button>)}</div><div className="rounded-[2rem] bg-white mt-5 p-3"><img src={`/svg-central-square/floorplans/${floor.plan}`} alt={`${floor.label} floor plan`} className="w-full max-h-[850px] object-contain rounded-[1.5rem]" /></div><div className="text-center mt-7"><button onClick={openLead} className="px-6 py-3.5 rounded-full bg-[#d7ad5a] text-black font-black">CHECK UNIT AVAILABILITY</button></div></div></section>

        {/* 12 — PAYMENT PLANS */}
        <section id="payment-plan" className="py-20 sm:py-24 bg-black"><div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10"><div className="text-center mb-10"><div className="text-[#d7ad5a] text-xs font-black tracking-[.3em]">PRICE & PAYMENT PLAN</div><h2 className="text-4xl md:text-6xl font-black mt-3">Flexible Plans. Smarter Planning.</h2></div><div className="flex justify-center gap-2 mb-8 flex-wrap">{(Object.keys(paymentPlans) as Array<keyof typeof paymentPlans>).map((key) => <button key={key} onClick={() => setPlan(key)} className={`px-5 py-3 rounded-full font-bold border ${plan === key ? 'bg-[#d7ad5a] text-black border-[#d7ad5a]' : 'border-white/15 text-white/70'}`}>{key === 'Construction Link' ? 'Construction Link Plan' : `${key} Payment Plan`}</button>)}</div><div className="max-w-4xl mx-auto rounded-[2rem] overflow-hidden border border-white/10"><div className="grid grid-cols-[.65fr_1.35fr] bg-white/10 px-4 sm:px-6 py-4 font-black text-sm"><span>Payment</span><span>Particulars</span></div>{paymentPlans[plan].map(([percentage,detail],index)=><div key={index} className="grid grid-cols-[.65fr_1.35fr] px-4 sm:px-6 py-4 border-t border-white/10 text-sm sm:text-base"><span className="font-black text-[#d7ad5a]">{percentage}</span><span className="text-white/75">{detail}</span></div>)}</div><div className="text-center mt-8"><button onClick={openLead} className="px-6 py-3.5 rounded-full bg-[#d7ad5a] text-black font-black">GET PAYMENT PLAN</button></div></div></section>

        {/* 13 — PLC */}
        <section id="pricing" className="py-20 sm:py-24 bg-[#f4f1ea] text-[#111]"><div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-10"><div className="text-center mb-10"><div className="text-[#9b762e] text-xs font-black tracking-[.3em]">PLC</div><h2 className="text-4xl md:text-6xl font-black mt-3">Preferred Locations. Additional PLC Applies.</h2></div><div className="overflow-x-auto rounded-[2rem] bg-white border border-black/5"><table className="w-full min-w-[520px]"><thead className="bg-black text-white"><tr><th className="text-left px-6 py-5">Preference</th><th className="text-left px-6 py-5">PLC</th></tr></thead><tbody>{plcOptions.slice(1).map(([label,value])=><tr key={label} className="border-t border-black/5"><td className="px-6 py-4 font-bold">{label}</td><td className="px-6 py-4 font-black text-[#9b762e]">{value}%</td></tr>)}</tbody></table></div><p className="text-xs text-black/45 mt-4 text-center">PLC details as provided in the supplied official price-list inputs.</p></div></section>

        {/* 14 — GALLERY */}
        <section id="gallery" className="py-20 sm:py-24 bg-[#0d0f14]"><div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10"><div className="text-center max-w-3xl mx-auto mb-10"><div className="text-[#d7ad5a] text-xs font-black tracking-[.3em]">PROJECT GALLERY</div><h2 className="text-4xl md:text-6xl font-black mt-3">Designed to Stand Out</h2><p className="mt-4 text-white/55">Explore exterior, interior, retail, night, studio and floor-plan visuals.</p></div><div className="flex gap-2 overflow-x-auto pb-5 justify-start md:justify-center">{galleryCategories.map((category)=><button key={category} onClick={()=>{setGalleryFilter(category);setLightboxIndex(null);}} className={`shrink-0 px-4 py-2.5 rounded-full text-sm font-bold border ${galleryFilter===category?'bg-[#d7ad5a] text-black border-[#d7ad5a]':'border-white/15 text-white/70'}`}>{category}</button>)}</div><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{filteredGallery.map((item,index)=><motion.button key={`${item.src}-${item.category}`} whileHover={{scale:1.01}} onClick={()=>{setLightboxIndex(index);trackGalleryOpened(item.src);}} className="group relative overflow-hidden rounded-3xl bg-black text-left min-h-[230px]"> <img src={item.src} alt={item.title} className="w-full h-[260px] object-cover group-hover:scale-105 transition-transform duration-500" /> <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent"><div className="text-xs text-[#d7ad5a] font-black">{item.category}</div><div className="font-bold mt-1">{item.title}</div></div></motion.button>)}</div></div></section>

        {/* 15 — LOCATION */}
        <section id="location" className="py-20 sm:py-24 bg-white text-black"><div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10"><div className="grid lg:grid-cols-[.8fr_1.2fr] gap-8 items-stretch"><div className="rounded-[2rem] bg-[#11151c] text-white p-8 md:p-10"><MapPin className="text-[#d7ad5a]" size={34}/><div className="text-[#d7ad5a] text-xs font-black tracking-[.3em] mt-6">LOCATION</div><h2 className="text-4xl md:text-6xl font-black mt-3">Strategically Positioned in Greater Noida</h2><p className="mt-5 text-white/60">Chai Phai, Greater Noida</p><p className="mt-3 text-sm text-white/45">Nearby landmark and distance claims are intentionally not listed without verified project information.</p><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`} target="_blank" rel="noreferrer" className="inline-flex mt-7 px-6 py-3.5 rounded-full bg-[#d7ad5a] text-black font-black items-center gap-2">GET DIRECTIONS <ExternalLink size={17}/></a></div><div className="rounded-[2rem] overflow-hidden border border-black/10 min-h-[430px]"><iframe title="SVG Central Square location map" src={`https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`} className="w-full h-full min-h-[430px] border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div></div></div></section>

        {/* 16 — LEAD GENERATION */}
        <section id="contact" className="py-20 sm:py-24 relative overflow-hidden"><img src="/svg-central-square/svg-03.jpeg" alt="SVG Central Square night view" className="absolute inset-0 w-full h-full object-cover"/><div className="absolute inset-0 bg-black/75"/><div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-10"><div className="grid lg:grid-cols-2 gap-10 items-center"><div><div className="text-[#d7ad5a] text-xs font-black tracking-[.3em]">GET PROJECT DETAILS</div><h2 className="text-4xl md:text-6xl font-black mt-3">Interested in SVG Central Square?</h2><p className="mt-5 text-white/65 text-lg">Get the latest price list, available units and payment plan.</p><div className="mt-8 flex flex-wrap gap-3"><a href={`tel:${PHONE}`} onClick={trackCallClicked} className="px-5 py-3 rounded-full bg-white text-black font-black flex items-center gap-2"><Phone size={17}/> CALL {PHONE}</a><a href={whatsappUrl} target="_blank" rel="noreferrer" onClick={trackWhatsAppClicked} className="px-5 py-3 rounded-full bg-[#d7ad5a] text-black font-black flex items-center gap-2"><MessageCircle size={17}/> WHATSAPP</a></div></div><form onSubmit={submitLead} onFocus={() => { if (!enquiryStartedTracked.current) { enquiryStartedTracked.current = true; trackEnquiryFormStarted(); } }} className="bg-white text-black rounded-[2rem] p-6 sm:p-8 shadow-2xl"><div className="grid sm:grid-cols-2 gap-4"><label className="text-sm font-bold">Name*<input required value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} className="mt-1.5 w-full rounded-xl border p-3.5" placeholder="Full Name"/></label><label className="text-sm font-bold">Mobile Number*<input required pattern="[0-9]{10}" inputMode="numeric" value={form.phone} onChange={(e)=>setForm({...form,phone:e.target.value.replace(/\D/g,'').slice(0,10)})} className="mt-1.5 w-full rounded-xl border p-3.5" placeholder="10-digit mobile"/></label><label className="text-sm font-bold">Email<input type="email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} className="mt-1.5 w-full rounded-xl border p-3.5" placeholder="Email address"/></label><label className="text-sm font-bold">Interested In<select required value={form.message} onChange={(e)=>setForm({...form,message:e.target.value})} className="mt-1.5 w-full rounded-xl border p-3.5 bg-white"><option value="">Select requirement</option><option value="Retail Shop">Retail Shop</option><option value="Pre-Leased Shop">Pre-Leased Shop</option><option value="Studio Apartment">Studio Apartment</option><option value="Investment">Investment</option><option value="Site Visit">Site Visit</option></select></label></div><button type="submit" className="mt-5 w-full rounded-xl bg-black text-white py-4 font-black hover:bg-[#d7ad5a] hover:text-black transition-colors">GET PROJECT DETAILS</button><p className="text-[10px] text-black/40 mt-3 text-center">Latest pricing, availability and applicable charges are subject to confirmation.</p></form></div></div></section>

        {/* 17 — WHATSAPP CTA */}
        <section className="py-14 bg-[#d7ad5a] text-black"><div className="max-w-5xl mx-auto px-4 text-center"><MessageCircle className="mx-auto" size={34}/><h2 className="text-3xl md:text-5xl font-black mt-4">Prefer WhatsApp?</h2><p className="mt-3 font-medium">Get price, availability & project details directly on WhatsApp.</p><a href={whatsappUrl} target="_blank" rel="noreferrer" onClick={trackWhatsAppClicked} className="inline-flex mt-6 px-7 py-4 rounded-full bg-black text-white font-black items-center gap-2"><MessageCircle size={18}/> CHAT ON WHATSAPP · {PHONE}</a></div></section>

        {/* 18 — FAQ */}
        <section id="faq" className="py-20 sm:py-24 bg-[#f4f1ea] text-black"><div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10"><div className="text-center mb-10"><div className="text-[#9b762e] text-xs font-black tracking-[.3em]">FAQ</div><h2 className="text-4xl md:text-6xl font-black mt-3">Frequently Asked Questions</h2></div><div className="space-y-3">{[
          ['What is SVG Central Square?','SVG Central Square is positioned as a premium commercial destination at Chai Phai, Greater Noida, with premium retail spaces and studio-apartment planning.'],
          ['Where is SVG Central Square located?','Chai Phai, Greater Noida.'],
          ['What are the retail shop prices?','Listed BSP figures are ₹20,000/sq.ft. Lower Ground, ₹31,000/sq.ft. Ground Floor, ₹20,000/sq.ft. First Floor and ₹15,000/sq.ft. Second Floor, on super-area basis.'],
          ['What is the price of Ground Floor retail space?','The listed Ground Floor BSP is ₹31,000 per sq.ft. on super-area basis.'],
          ['Are the shops pre-leased?','The supplied price list identifies the retail shops as pre-leased.'],
          ['What is the rent structure?','The supplied price list lists ₹100/sq.ft. LGF, ₹150/sq.ft. GF, ₹100/sq.ft. FF and ₹75/sq.ft. SF for the first two years from possession.'],
          ['What payment plans are available?','Construction Link, Flexi and Down Payment plans are listed in the supplied payment-plan inputs.'],
          ['What PLC charges apply?','PLC options listed are 24M Road 5%, 24M Road Corner 7.5%, Lake Facing—GF 3%, Lake Corner—GF 5%, 18M Road 3% and 18M Road Corner 5%.'],
          ['How can I check availability?','Submit the project enquiry form or connect through WhatsApp/call for the latest availability.'],
          ['How can I schedule a site visit?','Select Site Visit in the enquiry form or contact REAL PROP by phone/WhatsApp.'],
        ].map(([q,a],i)=><div key={q} className="bg-white rounded-2xl border border-black/5 overflow-hidden"><button onClick={()=>setFaqOpen(faqOpen===i?null:i)} className="w-full px-5 py-5 flex items-center justify-between text-left font-black"><span>{q}</span><ChevronDown size={20} className={`shrink-0 transition-transform ${faqOpen===i?'rotate-180':''}`}/></button><AnimatePresence initial={false}>{faqOpen===i&&<motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} className="px-5 pb-5 text-black/60 text-sm leading-relaxed">{a}</motion.div>}</AnimatePresence></div>)}</div></div></section>

        {/* 19 — FINAL CTA */}
        <section className="relative min-h-[560px] flex items-center justify-center overflow-hidden"><img src="/svg-central-square/svg-03.jpeg" alt="SVG Central Square night render" className="absolute inset-0 w-full h-full object-cover"/><div className="absolute inset-0 bg-black/75"/><div className="relative z-10 text-center px-4 py-24"><div className="text-[#d7ad5a] text-xs font-black tracking-[.3em]">SVG CENTRAL SQUARE</div><h2 className="text-4xl md:text-7xl font-black mt-4">Your Next Investment Could Start Here.</h2><p className="mt-4 text-white/65">Chai Phai, Greater Noida</p><div className="mt-8 flex flex-wrap justify-center gap-3"><button onClick={()=>{setForm({...form,message:'Site Visit'});openLead();}} className="px-6 py-3.5 rounded-full bg-[#d7ad5a] text-black font-black">BOOK A SITE VISIT</button><button onClick={openLead} className="px-6 py-3.5 rounded-full bg-white text-black font-black">GET PRICE LIST</button><a href={`tel:${PHONE}`} onClick={trackCallClicked} className="px-6 py-3.5 rounded-full border border-white/30 text-white font-black flex items-center gap-2"><Phone size={18}/> CALL {PHONE}</a></div></div></section>
      </div>

      {/* Gallery lightbox */}
      <AnimatePresence>{lightboxIndex !== null && filteredGallery[lightboxIndex] && <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[120] bg-black/95 flex items-center justify-center p-4" onClick={()=>setLightboxIndex(null)}><button aria-label="Close gallery" onClick={()=>setLightboxIndex(null)} className="absolute top-4 right-4 text-white bg-white/10 rounded-full p-3"><X/></button><button aria-label="Previous image" onClick={(e)=>{e.stopPropagation();setLightboxIndex((lightboxIndex-1+filteredGallery.length)%filteredGallery.length)}} className="absolute left-3 md:left-8 text-white text-4xl px-3">‹</button><img src={filteredGallery[lightboxIndex].src} alt={filteredGallery[lightboxIndex].title} className="max-w-[94vw] max-h-[86vh] object-contain rounded-xl" onClick={(e)=>e.stopPropagation()}/><button aria-label="Next image" onClick={(e)=>{e.stopPropagation();setLightboxIndex((lightboxIndex+1)%filteredGallery.length)}} className="absolute right-3 md:right-8 text-white text-4xl px-3">›</button><div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white text-center"><div className="text-[#d7ad5a] text-xs font-black">{filteredGallery[lightboxIndex].category}</div><div className="font-bold mt-1">{filteredGallery[lightboxIndex].title}</div></div></motion.div>}</AnimatePresence>

      {/* Lead modal */}
      {showLead && <div className="fixed inset-0 z-[110] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4" onClick={()=>setShowLead(false)}><div className="bg-white text-black rounded-3xl max-w-md w-full p-6 sm:p-7 relative max-h-[90vh] overflow-y-auto" onClick={(e)=>e.stopPropagation()}><button onClick={()=>setShowLead(false)} className="absolute top-4 right-4 p-2"><X/></button>{submitted?<div className="py-8 text-center"><CheckCircle2 className="mx-auto text-green-600" size={54}/><h3 className="text-2xl font-black mt-4">Enquiry Received</h3><p className="text-black/60 mt-2">Our REAL PROP team can share the latest availability and cost details.</p><a href={whatsappUrl} target="_blank" rel="noreferrer" onClick={trackWhatsAppClicked} className="inline-flex mt-6 px-6 py-3 rounded-full bg-black text-white font-bold">Continue on WhatsApp</a></div>:<><div className="text-xs font-black tracking-widest text-[#9b762e]">GET EXACT COST SHEET</div><h3 className="text-3xl font-black mt-2">Tell us what you're looking for.</h3><p className="text-sm text-black/60 mt-2">{floor.label} · {numericArea} sq.ft. · PLC {plc}%</p><form onSubmit={submitLead} onFocus={()=>{if(!enquiryStartedTracked.current){enquiryStartedTracked.current=true;trackEnquiryFormStarted();}}} className="mt-6 space-y-4"><input required value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} placeholder="Full Name" className="w-full rounded-xl border p-3.5"/><input required pattern="[0-9]{10}" inputMode="numeric" value={form.phone} onChange={(e)=>setForm({...form,phone:e.target.value.replace(/\D/g,'').slice(0,10)})} placeholder="10-digit Mobile Number" className="w-full rounded-xl border p-3.5"/><input type="email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} placeholder="Email (optional)" className="w-full rounded-xl border p-3.5"/><select required value={form.message} onChange={(e)=>setForm({...form,message:e.target.value})} className="w-full rounded-xl border p-3.5 bg-white"><option value="">Interested In</option><option value="Retail Shop">Retail Shop</option><option value="Pre-Leased Shop">Pre-Leased Shop</option><option value="Studio Apartment">Studio Apartment</option><option value="Investment">Investment</option><option value="Site Visit">Site Visit</option></select><button className="w-full rounded-xl bg-black text-white py-4 font-black">GET PROJECT DETAILS</button></form></>}</div></div>}
    </>
  );
}
