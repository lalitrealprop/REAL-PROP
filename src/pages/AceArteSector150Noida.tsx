import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight, BadgeCheck, Building2, CheckCircle2, ChevronDown,
  Download, ExternalLink, Home, MapPin, MessageCircle, Phone, Play,
  ShieldCheck, Sparkles, Trophy, Waves, X, Dumbbell, Trees, Users, Utensils,
} from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { trackEvent } from '../lib/analytics';

const SITE_URL = 'https://realprop.online';
const PAGE_URL = `${SITE_URL}/projects/ace-arte-sector-150-noida`;
const PHONE = '9999882898';
const WHATSAPP = '919999882898';

const residences = [
  { id: '3 BHK', size: 1927, rate: 16995, launchRate: 21995, benefit: 9635000, eoi: 1000000 },
  { id: '4 BHK', size: 2614, rate: 16995, launchRate: 21995, benefit: 13070000, eoi: 1500000 },
  { id: '4 BHK + S', size: 4370, rate: 16995, launchRate: 21995, benefit: 21850000, eoi: 2000000 },
] as const;

const amenities = [
  { title: 'Clubhouse', text: 'A dedicated social and lifestyle environment for everyday leisure.', icon: Building2 },
  { title: 'Fitness & Gym', text: 'Fitness-focused spaces designed for an active residential routine.', icon: Dumbbell },
  { title: 'Water Experience', text: 'Pool and water-led leisure experiences within the lifestyle ecosystem.', icon: Waves },
  { title: 'Sports', text: 'Tennis, badminton, basketball and other active recreation options.', icon: Trophy },
  { title: 'Kids & Family', text: 'Dedicated recreation for children and family time.', icon: Users },
  { title: 'Landscaped Living', text: 'Green open spaces and outdoor areas for slower, quieter moments.', icon: Trees },
  { title: 'Dining & Social', text: 'Restaurant, banquet and party-oriented spaces for gatherings.', icon: Utensils },
  { title: 'Concierge', text: 'A service-oriented residential experience with concierge support.', icon: BadgeCheck },
];

const specs = [
  ['Living / Dining', 'Imported / Italian marble flooring; false ceiling with lights; putty/oil-bound distemper; premium internal doors; aluminium frames with clear toughened glass external doors; AC/fan provision.'],
  ['Bedrooms', 'Laminated wooden flooring; false ceiling with lights; oil-bound distemper; aluminium/toughened-glass external doors; wood-frame flush/skin internal doors; AC/fan provision.'],
  ['Bathrooms', 'Anti-skid flooring; grid false ceiling; wall tiles up to 7 ft; flush/skin doors; standard bath fittings with hot/cold water; exhaust.'],
  ['Kitchen', 'Imported / Italian marble flooring; dado above counter; stone counter with SS sink; modular kitchen cabinets; exhaust.'],
  ['Balconies', 'Anti-skid tiles and external paint.'],
];

const paymentPlan = [
  ['10%', 'At booking'],
  ['10%', 'Within 30 days of booking'],
  ['20%', 'After slab casting of ground floor'],
  ['20%', 'After slab casting of 10th floor'],
  ['20%', 'On completion of super structure'],
  ['20% + other charges', 'On offer of possession'],
];

const galleryItems = [
  { src: '/ace-arte/ace-arte-hero.jpeg', alt: 'ACE ARTE Sector 150 Noida architectural render', label: 'Architecture' },
  { src: '/ace-arte/ace-arte-overview.jpeg', alt: 'ACE ARTE expansive residences visual', label: 'Residences' },
  { src: '/ace-arte/ace-arte-price-list.jpeg', alt: 'ACE ARTE official price list dated 21 August 2026', label: 'Price Sheet' },
];

const faqs = [
  ['What is ACE ARTE Sector 150 Noida?', 'ACE ARTE is a new luxury residential project at Plot No. SC-02/G, Sector-150, Noida, offering expansive 3 and 4 bedroom residence formats.'],
  ['Is ACE ARTE RERA registered?', 'Yes. The project is registered with UP-RERA under registration number UPRERAPRJ528653/07/2026.'],
  ['What configurations are available?', 'The supplied price list covers 1927 sq.ft. 3 BHK, 2614 sq.ft. 4 BHK and 4370 sq.ft. 4 BHK + S.'],
  ['What is the ACE ARTE price per sq.ft.?', 'The supplied price list dated 21 August 2026 shows a launch BSP of ₹21,995/sq.ft. and a pre-launch BSP of ₹16,995/sq.ft. after the stated ₹5,000/sq.ft. discount.'],
  ['What is the ACE ARTE 3 BHK price?', 'At ₹16,995/sq.ft., the 1927 sq.ft. residence works out to approximately ₹3.27 crore BSP, before PLC, GST and other applicable charges.'],
  ['What is the ACE ARTE 4 BHK price?', 'At ₹16,995/sq.ft., the 2614 sq.ft. residence works out to approximately ₹4.44 crore BSP, before PLC, GST and other applicable charges.'],
  ['What is the 4370 sq.ft. configuration?', 'The official supplied price sheet identifies the 4370 sq.ft. residence as 4 BHK + S.'],
  ['What is the ACE ARTE payment plan?', 'The supplied plan is 20×5: 10% booking, 10% within 30 days, followed by construction-linked 20% milestones and 20% plus other charges at offer of possession.'],
  ['What is the ACE ARTE EOI amount?', 'The supplied EOI amounts are ₹10 lakh for 1927 sq.ft., ₹15 lakh for 2614 sq.ft. and ₹20 lakh for 4370 sq.ft., subject to the stated terms.'],
  ['What is the ACE ARTE possession date?', 'The UP-RERA record declares completion on 15 February 2031.'],
  ['Are detailed floor plans available?', 'Detailed official floor plans were not included in the project material supplied for this website build. REAL PROP therefore does not publish an unverified floor plan.'],
  ['How can I get the latest price and availability?', 'Submit the enquiry form, call REAL PROP or WhatsApp the team. Availability and commercial terms should always be reconfirmed before booking.'],
];

function money(value: number) {
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(value);
}

function crore(value: number) {
  return `₹${(value / 10000000).toFixed(2)} Cr`;
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function setMeta(name: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) { el = document.createElement('meta'); el.name = name; document.head.appendChild(el); }
  el.content = content;
}

function setProperty(property: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!el) { el = document.createElement('meta'); el.setAttribute('property', property); document.head.appendChild(el); }
  el.content = content;
}

function trackMetaPixel(event: string, data: Record<string, unknown> = {}) {
  if (typeof window !== 'undefined' && typeof (window as any).fbq === 'function') {
    (window as any).fbq('track', event, data);
  }
}

function AceArteSEO() {
  useEffect(() => {
    const title = 'ACE ARTE Sector 150 Noida | 3 & 4 BHK | Price, Floor Plan & Payment Plan';
    const description = 'Explore ACE ARTE Sector 150 Noida — expansive 3 & 4 BHK residences with 1927, 2614 & 4370 sq.ft. options. Check price, payment plan, RERA details and site visit.';
    document.title = title;
    setMeta('description', description);
    setMeta('robots', 'index, follow');
    setMeta('theme-color', '#0a0908');
    setProperty('og:title', title); setProperty('og:description', description); setProperty('og:url', PAGE_URL); setProperty('og:type', 'website'); setProperty('og:site_name', 'REAL PROP'); setProperty('og:image', `${SITE_URL}/ace-arte/ace-arte-hero.jpeg`); setProperty('og:image:alt', 'ACE ARTE Sector 150 Noida');
    setMeta('twitter:card', 'summary_large_image'); setMeta('twitter:title', title); setMeta('twitter:description', description); setMeta('twitter:image', `${SITE_URL}/ace-arte/ace-arte-hero.jpeg`);
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
    canonical.href = PAGE_URL;
    const schemaId = 'real-prop-ace-arte-schema';
    let schema = document.getElementById(schemaId) as HTMLScriptElement | null;
    if (!schema) { schema = document.createElement('script'); schema.id = schemaId; schema.type = 'application/ld+json'; document.head.appendChild(schema); }
    schema.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': [
      { '@type': 'Organization', name: 'REAL PROP', url: SITE_URL },
      { '@type': 'WebPage', name: title, url: PAGE_URL, description, about: { '@type': 'Residence', name: 'ACE ARTE', address: { '@type': 'PostalAddress', streetAddress: 'Plot No. SC-02/G, Sector-150', addressLocality: 'Noida', addressRegion: 'Uttar Pradesh', postalCode: '201310', addressCountry: 'IN' } } },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` }, { '@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE_URL}/projects` }, { '@type': 'ListItem', position: 3, name: 'ACE ARTE Sector 150 Noida', item: PAGE_URL }] },
      { '@type': 'FAQPage', mainEntity: faqs.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) },
    ] });
    return () => document.getElementById(schemaId)?.remove();
  }, []);
  return null;
}

export default function AceArteSector150Noida() {
  const [selected, setSelected] = useState(0);
  const [plc, setPlc] = useState(0);
  const [showLead, setShowLead] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [form, setForm] = useState({ name: '', phone: '', email: '', requirement: 'Price & Availability', message: '' });
  const [started, setStarted] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState<number | null>(null);
  const paymentRef = useRef<HTMLDivElement | null>(null);
  const priceRef = useRef<HTMLElement | null>(null);
  const residence = residences[selected];
  const bsp = residence.size * residence.rate;
  const plcAmount = bsp * plc / 100;
  const estimated = bsp + plcAmount;

  useEffect(() => {
    trackEvent('view_project', { project_name: 'ACE ARTE', project_slug: 'ace-arte-sector-150-noida' });
    trackMetaPixel('ViewContent', { content_name: 'ACE ARTE Sector 150 Noida', content_category: 'Real Estate Project' });
    let observer: IntersectionObserver | null = null;
    let paymentTracked = false;
    let priceTracked = false;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.target === paymentRef.current && !paymentTracked && entry.isIntersecting) {
            paymentTracked = true;
            trackEvent('payment_plan_viewed', { project_name: 'ACE ARTE' });
          }
          if (entry.target === priceRef.current && !priceTracked && entry.isIntersecting) {
            priceTracked = true;
            trackEvent('price_viewed', { project_name: 'ACE ARTE' });
          }
        });
      }, { threshold: 0.25 });
      if (paymentRef.current) observer.observe(paymentRef.current);
      if (priceRef.current) observer.observe(priceRef.current);
    }
    return () => observer?.disconnect();
  }, []);

  const openLead = (requirement = 'Price & Availability') => {
    setForm((current) => ({ ...current, requirement }));
    setShowLead(true);
    trackEvent('enquiry_form_opened', { project_name: 'ACE ARTE', requirement });
    if (requirement === 'Site Visit') trackEvent('site_visit_clicked', { project_name: 'ACE ARTE' });
    if (requirement.includes('Floor Plan')) trackEvent('floor_plan_requested', { project_name: 'ACE ARTE', configuration: residence.id });
    if (requirement.includes('Brochure')) trackEvent('price_list_requested', { project_name: 'ACE ARTE' });
  };

  const whatsappUrl = useMemo(() => {
    const text = `Hi, I am interested in ACE ARTE Sector 150 Noida. Please share latest price and availability. ${residence.id}, ${residence.size} sq.ft.`;
    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
  }, [residence]);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;
    try {
      await addDoc(collection(db, 'leads'), {
        project: 'ACE ARTE', propertyInterest: 'ACE ARTE Sector 150 Noida', propertyType: residence.id,
        name: form.name.trim(), phone: form.phone.trim(), email: form.email.trim(), budget: crore(estimated),
        location: 'Sector 150, Noida', requirement: form.requirement, configuration: residence.id,
        area: `${residence.size} sq.ft.`, message: form.message.trim() || 'ACE ARTE enquiry', createdAt: serverTimestamp(),
      });
      setSubmitted(true);
      trackEvent('lead_submitted', { project_name: 'ACE ARTE', configuration: residence.id });
      trackMetaPixel('Lead', { content_name: 'ACE ARTE', content_category: 'Real Estate Lead' });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'leads');
    }
  };

  return <>
    <AceArteSEO />
    <div className="ace-page">
      <header className="ace-nav">
        <div className="ace-nav-left"><a href="/" className="ace-brand">REAL <span>PROP</span></a><a href="/" className="ace-home-link">← REAL PROP HOME</a></div>
        <div className="ace-nav-links"><a href="#overview">Overview</a><a href="#residences">Residences</a><a href="#price">Price</a><a href="#amenities">Amenities</a><a href="#sports-wellness">Wellness</a><a href="#location">Location</a></div>
        <button className="ace-nav-cta" onClick={() => openLead()}>GET PRICE <ArrowRight size={16} /></button>
      </header>

      <section className="ace-hero">
        <img src="/ace-arte/ace-arte-hero.jpeg" alt="ACE ARTE Sector 150 Noida luxury residences" className="ace-hero-image" />
        <div className="ace-hero-overlay" />
        <div className="ace-hero-content">
          <p className="ace-kicker">SECTOR 150 · NOIDA</p>
          <h1>ACE ARTE</h1>
          <p className="ace-hero-sub">Art Meets Architecture</p>
          <p className="ace-hero-copy">Expansive 3 & 4 BHK residences created for refined living in one of Noida's most sought-after green sectors.</p>
          <div className="ace-hero-stats"><span>1927 SQ.FT.</span><span>2614 SQ.FT.</span><span>4370 SQ.FT.</span></div>
          <div className="ace-actions"><button className="ace-btn gold" onClick={() => openLead()}>GET PRICE & AVAILABILITY <ArrowRight size={18} /></button><button className="ace-btn ghost" onClick={() => openLead('Site Visit')}>BOOK SITE VISIT <MapPin size={17} /></button><button className="ace-btn ghost" onClick={() => scrollToId('video')}><Play size={17} /> WATCH VIDEO</button></div>
        </div>
        <div className="ace-hero-trust"><span><ShieldCheck size={17} /> RERA REGISTERED</span><span>UPRERAPRJ528653/07/2026</span><span>20×5 PAYMENT PLAN</span></div>
      </section>

      <section className="ace-rera-strip"><div><strong>RERA REGISTERED</strong><span>UPRERAPRJ528653/07/2026</span></div><div><strong>REGISTRATION</strong><span>28 JULY 2026</span></div><div><strong>DECLARED COMPLETION</strong><span>15 FEBRUARY 2031</span></div><a href="https://www.up-rera.in/" target="_blank" rel="noreferrer">VIEW RERA <ExternalLink size={15} /></a></section>

      <section id="overview" className="ace-section ace-intro"><div className="ace-eyebrow">01 · THE CONCEPT</div><h2>Where <em>Art</em> Meets Architecture</h2><p>ACE ARTE brings together expressive architecture, expansive residences and a lifestyle-led environment at Sector 150, Noida. The proposition is simple: more space, more openness and a more considered everyday experience.</p><div className="ace-intro-grid"><div><span>01</span><h3>Expansive Residences</h3><p>Thoughtfully positioned 3 & 4 BHK formats from 1927 sq.ft. to 4370 sq.ft.</p></div><div><span>02</span><h3>Green Sector Address</h3><p>A premium Sector 150 setting with an emphasis on open, landscaped surroundings.</p></div><div><span>03</span><h3>RERA Registered</h3><p>Project registration and legal information are presented transparently for informed decisions.</p></div></div></section>

      <section className="ace-image-band"><img src="/ace-arte/ace-arte-overview.jpeg" alt="ACE ARTE designed for the discerning" /><div><p className="ace-eyebrow">02 · THE ACE STORY</p><h2>An Established Presence.<br /><em>A New Residential Chapter.</em></h2><p>ACE has an established presence in Sector 150. ACE ARTE introduces a new residential offering with larger-format residences and a luxury lifestyle proposition.</p><button className="text-link" onClick={() => openLead('ACE ARTE Brochure & Project Details')}>GET PROJECT DETAILS <ArrowRight size={17} /></button></div></section>

      <section className="ace-section"><div className="ace-eyebrow">03 · AT A GLANCE</div><h2>Designed for the <em>Discerning</em></h2><div className="ace-glance-grid"><div><strong>14.83</strong><span>Acres*</span></div><div><strong>11</strong><span>Towers*</span></div><div><strong>G+23</strong><span>Structure*</span></div><div><strong>784</strong><span>Units*</span></div><div><strong>3 & 4</strong><span>BHK</span></div><div><strong>20×5</strong><span>Payment Plan</span></div></div><p className="ace-note">*Project figures marked with an asterisk are based on currently available public project information and remain subject to sanctioned plans, approvals and final documentation.</p></section>

      <section id="residences" className="ace-section ace-dark"><div className="ace-eyebrow">04 · RESIDENCES</div><h2>Space, Reimagined.</h2><div className="ace-residence-grid">{residences.map((r, i) => <button key={r.id} className={`ace-residence-card ${selected === i ? 'active' : ''}`} onClick={() => { setSelected(i); trackEvent('residence_selected', { project_name: 'ACE ARTE', configuration: r.id }); }}><span>{r.id}</span><strong>{r.size.toLocaleString('en-IN')}</strong><small>SQ.FT.</small><div>{crore(r.size * r.rate)} <small>BSP*</small></div><ArrowRight size={20} /></button>)}</div><p className="ace-note">*Indicative BSP calculation using the supplied price list dated 21 August 2026. PLC, GST, statutory registration charges and other applicable charges are extra.</p></section>

      <section id="price" ref={priceRef} className="ace-section ace-price"><div className="ace-eyebrow">05 · PRICE</div><div className="ace-price-head"><div><h2>ACE ARTE <em>Price List</em></h2><p>Supplied price list W.E.F. 21 August 2026.</p></div><a href="/ace-arte/ace-arte-price-list.jpeg" target="_blank" rel="noreferrer" className="ace-outline-btn"><Download size={17} /> VIEW PRICE SHEET</a></div><div className="ace-price-table"><div className="ace-price-row head"><span>Configuration</span><span>Size</span><span>Launch BSP</span><span>Pre-Launch BSP</span><span>Benefit*</span></div>{residences.map(r => <div className="ace-price-row" key={r.id}><strong>{r.id}</strong><span>{r.size.toLocaleString('en-IN')} sq.ft.</span><span>₹{money(r.launchRate)}/sq.ft.</span><span className="gold-text">₹{money(r.rate)}/sq.ft.</span><span>{crore(r.benefit)}</span></div>)}</div><div className="ace-price-highlight"><div><span>LAUNCH BSP</span><strong>₹21,995/sq.ft.</strong></div><div className="arrow">→</div><div><span>STATED PRE-LAUNCH BENEFIT</span><strong>₹5,000/sq.ft.</strong></div><div className="arrow">→</div><div><span>PRE-LAUNCH BSP</span><strong>₹16,995/sq.ft.</strong></div></div><p className="ace-note">*Benefits are as stated in the supplied price sheet. Offer code, PLC, GST, other charges and applicable terms govern the final transaction.</p></section>

      <section className="ace-section ace-calculator"><div className="ace-eyebrow">06 · CALCULATOR</div><div className="ace-calc-grid"><div><h2>Estimate Your <em>ACE ARTE</em> BSP</h2><p>Select a residence and PLC to get an indicative BSP estimate. This is not a booking quote.</p><div className="ace-selector">{residences.map((r, i) => <button key={r.id} className={selected === i ? 'selected' : ''} onClick={() => { setSelected(i); trackEvent('calculator_used', { project_name: 'ACE ARTE', configuration: r.id }); }}>{r.id}<small>{r.size.toLocaleString('en-IN')} sq.ft.</small></button>)}</div><label>PLC <select value={plc} onChange={(e) => setPlc(Number(e.target.value))}><option value={0}>None — 0%</option><option value={3}>3%</option><option value={5}>5%</option><option value={7.5}>7.5%</option></select></label></div><div className="ace-calc-result"><span>ESTIMATED BSP</span><strong>{crore(estimated)}</strong><div><span>Base BSP</span><b>{crore(bsp)}</b></div><div><span>PLC</span><b>{crore(plcAmount)}</b></div><button className="ace-btn gold" onClick={() => openLead('Exact Cost Sheet')}>GET EXACT COST SHEET <ArrowRight size={17} /></button></div></div></section>

      <section className="ace-benefit"><div><p className="ace-eyebrow">07 · LAUNCH ADVANTAGE</p><h2>More Space. More Value.</h2><p>The supplied price sheet shows a ₹5,000/sq.ft. difference between launch BSP and the stated pre-launch BSP.</p></div><div className="ace-benefit-numbers">{residences.map(r => <div key={r.id}><span>{r.id} · {r.size.toLocaleString('en-IN')} SQ.FT.</span><strong>{crore(r.benefit)}</strong><small>STATED BENEFIT*</small></div>)}</div></section>

      <section className="ace-section ace-eoi"><div className="ace-eyebrow">08 · EXPRESSION OF INTEREST</div><h2>Secure Your <em>Priority</em></h2><div className="ace-eoi-grid">{residences.map(r => <div key={r.id}><span>{r.id}</span><strong>{crore(r.eoi)}</strong><small>EOI</small><button onClick={() => openLead(`${r.id} EOI Enquiry`)}>ENQUIRE <ArrowRight size={16} /></button></div>)}</div><p className="ace-note">EOI amounts and first-come-first-serve terms are reproduced from the supplied price sheet and remain subject to project terms.</p></section>

      <section ref={paymentRef} className="ace-section ace-dark" id="payment-plan"><div className="ace-eyebrow">09 · PAYMENT PLAN</div><h2>The <em>20×5</em> Payment Plan</h2><div className="ace-timeline">{paymentPlan.map(([percent, label], i) => <div key={label}><span>0{i + 1}</span><strong>{percent}</strong><p>{label}</p></div>)}</div><button className="text-link light" onClick={() => openLead('Payment Plan Details')}>GET PAYMENT PLAN <ArrowRight size={17} /></button></section>

      <section id="amenities" className="ace-section"><div className="ace-eyebrow">10 · LIFESTYLE & AMENITIES</div><h2>Live Active. <em>Live Inspired.</em></h2><p className="ace-lead">A lifestyle ecosystem built around fitness, sport, social spaces, water experiences and family recreation.</p><div className="ace-amenity-grid">{amenities.map(({ title, text, icon: Icon }) => <div key={title}><Icon size={25} /><h3>{title}</h3><p>{text}</p></div>)}</div><p className="ace-note">Amenities and visuals are indicative and subject to sanctioned plans, approvals, Agreement for Sale and final project specifications.</p></section>

      <section id="sports-wellness" className="ace-section ace-dark"><div className="ace-eyebrow">11 · SPORTS & WELLNESS</div><h2>Move Well. <em>Live Well.</em></h2><div className="ace-sport-grid"><div><Trophy size={25} /><strong>Outdoor Sports</strong><p>Lawn tennis, badminton, basketball and other active recreation options presented in current ACE ARTE material.</p></div><div><Dumbbell size={25} /><strong>Fitness</strong><p>Gym and fitness-focused spaces designed around an active residential routine.</p></div><div><Waves size={25} /><strong>Water & Recreation</strong><p>Water-led leisure experiences and indoor recreation spaces form part of the available lifestyle information.</p></div><div><Sparkles size={25} /><strong>Yoga & Wellness</strong><p>Wellness-oriented spaces for calmer routines, recovery and everyday balance.</p></div></div><button className="text-link light" onClick={() => openLead('Amenities & Lifestyle Details')}>GET AMENITY DETAILS <ArrowRight size={17} /></button><p className="ace-note">Amenity names and availability are subject to sanctioned plans, approvals and final project specifications.</p></section>

      <section className="ace-lifestyle-band"><div><p className="ace-eyebrow">12 · ARCHITECTURE & LIFESTYLE</p><h2>Designed Around <em>Everyday Living</em></h2><p>From active mornings to relaxed evenings, ACE ARTE brings architecture, landscaped openness and lifestyle experiences together in one residential proposition.</p><div className="ace-mini-links"><span>ARCHITECTURE</span><span>CLUBHOUSE</span><span>WATER EXPERIENCE</span><span>LANDSCAPED OPENNESS</span></div></div><img src="/ace-arte/ace-arte-hero.jpeg" alt="ACE ARTE architecture and lifestyle visual" /></section>

      <section className="ace-section"><div className="ace-eyebrow">13 · TECHNICAL SPECIFICATIONS</div><h2>Crafted With <em>Intention</em></h2><div className="ace-specs">{specs.map(([title, text]) => <div key={title}><h3>{title}</h3><p>{text}</p></div>)}</div><a className="ace-outline-btn" href="/ace-arte/ace-arte-specifications.pdf" target="_blank" rel="noreferrer"><Download size={17} /> VIEW SPECIFICATIONS PDF</a></section>

      <section className="ace-section ace-dark"><div className="ace-eyebrow">14 · FLOOR PLANS</div><h2>Find Your <em>Perfect Layout</em></h2><div className="ace-coming-grid">{residences.map(r => <div key={r.id}><span>{r.id}</span><strong>{r.size.toLocaleString('en-IN')} SQ.FT.</strong><p>Detailed official floor plan will be shared when available.</p><button onClick={() => openLead(`${r.id} Floor Plan Request`)}>REQUEST FLOOR PLAN <ArrowRight size={16} /></button></div>)}</div><p className="ace-note">REAL PROP does not publish unverified or reconstructed floor plans.</p></section>

      <section id="video" className="ace-video-section"><div className="ace-video-copy"><p className="ace-eyebrow">15 · EXPERIENCE</p><h2>See ACE <em>ARTE</em></h2><p>Explore the supplied project video and get a feel for the architectural vision.</p><button className="ace-btn gold" onClick={() => { trackEvent('video_played', { project_name: 'ACE ARTE' }); document.getElementById('ace-video')?.scrollIntoView({ behavior: 'smooth' }); }}>WATCH PROJECT VIDEO <Play size={17} /></button></div><div id="ace-video" className="ace-video-wrap"><video controls preload="metadata" poster="/ace-arte/ace-arte-hero.jpeg" onPlay={() => trackEvent('video_played', { project_name: 'ACE ARTE' })}><source src="/ace-arte/ace-arte-video.mp4" type="video/mp4" />Your browser does not support the video tag.</video></div></section>

      <section className="ace-section ace-gallery"><div className="ace-eyebrow">16 · GALLERY</div><h2>A Visual <em>Language</em></h2><p className="ace-lead">Explore the available ACE ARTE project visuals supplied for the website. Tap any image to view it larger.</p><div className="ace-gallery-grid">{galleryItems.map((item, i) => <button key={item.src} className="ace-gallery-item" onClick={() => setGalleryOpen(i)} aria-label={`Open ${item.label} image`}><img src={item.src} alt={item.alt} /><span>{item.label}</span></button>)}</div><p className="ace-note">Only supplied project material is published here; no unverified or reconstructed visuals are used.</p></section>

      <section id="location" className="ace-location"><div className="ace-location-copy"><p className="ace-eyebrow">17 · LOCATION</p><h2>Sector 150, <em>Noida</em></h2><p>ACE ARTE is located at Plot No. SC-02/G, Sector-150, Noida, Uttar Pradesh — a premium green residential address with access to the wider Noida and NCR network.</p><div className="ace-location-cards"><div><MapPin size={20} /><strong>PROJECT ADDRESS</strong><span>Plot No. SC-02/G, Sector-150, Noida, U.P. 201310</span></div><div><Building2 size={20} /><strong>CONNECTIVITY</strong><span>Noida-Greater Noida Expressway, Yamuna Expressway and wider NCR access.</span></div><div><Home size={20} /><strong>GREEN SETTING</strong><span>Sector 150 is known for its open, landscaped residential environment.</span></div></div><a className="ace-outline-btn light" href="https://www.google.com/maps/search/?api=1&query=ACE+ARTE+Sector+150+Noida" target="_blank" rel="noreferrer"><MapPin size={17} /> OPEN MAP</a></div><div className="ace-map-card"><div className="map-pin"><MapPin size={30} /></div><strong>ACE ARTE</strong><span>Sector 150, Noida</span><a href="https://www.google.com/maps/search/?api=1&query=ACE+ARTE+Sector+150+Noida" target="_blank" rel="noreferrer">GET DIRECTIONS <ArrowRight size={15} /></a></div></section>

      <section id="developer" className="ace-section ace-developer"><div className="ace-eyebrow">18 · DEVELOPER</div><h2>ACE. <em>A New Residential Chapter.</em></h2><div className="ace-developer-grid"><div><Building2 size={28} /><span>PROMOTER</span><strong>ACE INFRACITY DEVELOPERS PRIVATE LIMITED</strong></div><div><MapPin size={28} /><span>PROJECT ADDRESS</span><strong>Plot No. SC-02/G, Sector-150, Noida, Uttar Pradesh</strong></div><div><ShieldCheck size={28} /><span>RERA</span><strong>UPRERAPRJ528653/07/2026</strong></div></div><p className="ace-developer-copy">ACE ARTE represents a new residential offering in ACE's established Sector 150 presence, bringing expansive residences and a luxury lifestyle proposition to the address.</p></section>

      <section className="ace-section ace-legal"><div className="ace-eyebrow">19 · TRUST & LEGAL</div><h2>Information You Can <em>Verify</em></h2><div className="ace-legal-grid"><div><ShieldCheck size={28} /><span>RERA NUMBER</span><strong>UPRERAPRJ528653/07/2026</strong></div><div><BadgeCheck size={28} /><span>REGISTRATION DATE</span><strong>28 JULY 2026</strong></div><div><Building2 size={28} /><span>PROMOTER</span><strong>ACE INFRACITY DEVELOPERS PRIVATE LIMITED</strong></div><div><Home size={28} /><span>DECLARED COMPLETION</span><strong>15 FEBRUARY 2031</strong></div></div><a className="ace-outline-btn" href="https://www.up-rera.in/" target="_blank" rel="noreferrer">VERIFY ON UP-RERA <ExternalLink size={16} /></a></section>

      <section className="ace-section ace-faq"><div className="ace-eyebrow">20 · FAQ</div><h2>ACE ARTE <em>FAQs</em></h2><div className="ace-faq-list">{faqs.map(([q, a], i) => <div key={q} className={`ace-faq-item ${faqOpen === i ? 'open' : ''}`}><button onClick={() => setFaqOpen(faqOpen === i ? null : i)}><span>{q}</span><ChevronDown size={18} /></button><AnimatePresence>{faqOpen === i && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}><p>{a}</p></motion.div>}</AnimatePresence></div>)}</div></section>

      <section className="ace-final"><p className="ace-eyebrow">21 · YOUR NEXT MOVE</p><h2>Your Address in <em>Sector 150</em> Awaits.</h2><p>Get the latest price, availability, payment plan and site visit assistance from REAL PROP.</p><div className="ace-actions"><button className="ace-btn gold" onClick={() => openLead()}>GET PRICE & AVAILABILITY <ArrowRight size={18} /></button><a className="ace-btn outline" href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Hi, I am interested in ACE ARTE Sector 150 Noida. Please share latest price, availability and payment plan.')}`} target="_blank" rel="noreferrer" onClick={() => { trackEvent('whatsapp_clicked', { project_name: 'ACE ARTE' }); trackMetaPixel('Contact', { content_name: 'ACE ARTE', contact_type: 'WhatsApp' }); }}><MessageCircle size={18} /> WHATSAPP</a><a className="ace-btn outline" href={`tel:+91${PHONE}`} onClick={() => { trackEvent('call_clicked', { project_name: 'ACE ARTE' }); trackMetaPixel('Contact', { content_name: 'ACE ARTE', contact_type: 'Call' }); }}><Phone size={18} /> CALL NOW</a></div></section>

      <footer className="ace-footer"><div><a href="/" className="ace-brand">REAL <span>PROP</span></a><p>Property advisory and project discovery for Delhi NCR.</p></div><div><strong>ACE ARTE</strong><a href="#price">Price</a><a href="#payment-plan">Payment Plan</a><a href="#amenities">Amenities</a><a href="#sports-wellness">Sports & Wellness</a><a href="#location">Location</a><a href="#developer">Developer</a></div><div><strong>PROJECT</strong><span>Sector 150, Noida</span><span>RERA: UPRERAPRJ528653/07/2026</span><span>Promoter: ACE INFRACITY DEVELOPERS PVT. LTD.</span></div></footer>

      <div className="ace-mobile-bar"><a href={`tel:+91${PHONE}`} onClick={() => { trackEvent('call_clicked', { project_name: 'ACE ARTE' }); trackMetaPixel('Contact', { content_name: 'ACE ARTE', contact_type: 'Call' }); }}><Phone size={18} /> CALL</a><a href={whatsappUrl} target="_blank" rel="noreferrer" onClick={() => { trackEvent('whatsapp_clicked', { project_name: 'ACE ARTE' }); trackMetaPixel('Contact', { content_name: 'ACE ARTE', contact_type: 'WhatsApp' }); }}><MessageCircle size={18} /> WHATSAPP</a><button onClick={() => openLead()}>GET PRICE</button></div>

      <AnimatePresence>{galleryOpen !== null && <motion.div className="ace-lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setGalleryOpen(null)}><button className="ace-lightbox-close" onClick={() => setGalleryOpen(null)} aria-label="Close gallery"><X /></button><motion.img initial={{ scale: 0.96 }} animate={{ scale: 1 }} exit={{ scale: 0.96 }} src={galleryItems[galleryOpen].src} alt={galleryItems[galleryOpen].alt} onClick={(e) => e.stopPropagation()} /><div className="ace-lightbox-caption">{galleryItems[galleryOpen].label}</div></motion.div>}</AnimatePresence>

      <AnimatePresence>{showLead && <motion.div className="ace-modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowLead(false)}><motion.div className="ace-modal" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} onClick={(e) => e.stopPropagation()}><button className="ace-modal-close" onClick={() => setShowLead(false)}><X /></button>{submitted ? <div className="ace-success"><CheckCircle2 size={58} /><h3>Thank You!</h3><p>Your ACE ARTE enquiry has been received. Our consultant will contact you shortly.</p><button className="ace-btn gold" onClick={() => { setSubmitted(false); setShowLead(false); }}>DONE</button></div> : <><p className="ace-eyebrow">ACE ARTE · SECTOR 150</p><h3>Get Price & Availability</h3><p className="ace-modal-copy">Tell us what you are looking for and we will share the latest available details.</p><form onSubmit={submit} onFocus={() => { if (!started) { setStarted(true); trackEvent('enquiry_form_started', { project_name: 'ACE ARTE' }); } }}><label>Name<input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" /></label><label>Phone<input required type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="10-digit mobile number" /></label><label>Email<input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Optional" /></label><label>Requirement<select value={form.requirement} onChange={e => setForm({ ...form, requirement: e.target.value })}><option>Price & Availability</option><option>Site Visit</option><option>Floor Plan</option><option>Payment Plan</option><option>Brochure</option><option>EOI</option></select></label><label>Message<textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Any preference or question?" rows={3} /></label><button className="ace-btn gold" type="submit">SUBMIT ENQUIRY <ArrowRight size={17} /></button></form></>}</motion.div></motion.div>}</AnimatePresence>
    </div>
  </>;
}
