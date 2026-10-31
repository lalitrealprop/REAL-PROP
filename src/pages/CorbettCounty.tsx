import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Download,
  MapPin,
  Phone,
  MessageCircle,
  CalendarDays,
  Trees,
  Building2,
  Store,
  Home,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  X,
} from 'lucide-react';
import CorbettCountyLeadForm from '../components/CorbettCountyLeadForm';
import '../styles-corbett-county.css';
import CorbettPlotCalculator from '../components/CorbettPlotCalculator';
import CorbettPricingCards from '../components/CorbettPricingCards';

type PropertyType = 'Plot' | 'Studio Apartment' | 'Retail Shop';

const BASE = '/corbett-county';
const PHONE = '9999882898';
const WHATSAPP = '919999882898';

const products: {
  name: PropertyType;
  description: string;
  price: string;
  detail: string;
  icon: typeof Home;
  image: string;
  imageAlt: string;
}[] = [
  {
    name: 'Plot',
    description: 'Residential plotted opportunities within a nature-inspired township.',
    price: '₹35,000 / sq. yd.',
    detail: 'Base rate; PLC and other charges extra',
    icon: Trees,
    image: "residential-master-plan.webp",
    imageAlt: "Corbett County residential plotted master plan - developer illustration",
  },
  {
    name: 'Studio Apartment',
    description: 'Contemporary studio spaces within a resort-inspired community.',
    price: '₹50.05 L BSP',
    detail: '650 sq. ft. × ₹7,700; additional charges and taxes extra',
    icon: Building2,
    image: "commercial-studio-apartment.webp",
    imageAlt: "Corbett County studio apartment concept rendering",
  },
  {
    name: 'Retail Shop',
    description: 'Boutique retail opportunities planned for the commercial boulevard.',
    price: '₹60 L BSP',
    detail: '500 sq. ft. × ₹12,000; additional charges and taxes extra',
    icon: Store,
    image: "commercial-retail-boulevard.webp",
    imageAlt: "Corbett County retail boulevard architectural rendering",
  },
];

export default function CorbettCounty() {
  const [selectedProperty, setSelectedProperty] =
    useState<PropertyType | undefined>(undefined);
  const [selectedPurpose, setSelectedPurpose] = useState(
    'Get latest price list'
  );
  const [masterPlanOpen, setMasterPlanOpen] = useState(false);
  const [masterPlanZoom, setMasterPlanZoom] = useState(1);

  useEffect(() => {
    if (!masterPlanOpen) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMasterPlanOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [masterPlanOpen]);

  function openMasterPlan() {
    setMasterPlanZoom(1);
    setMasterPlanOpen(true);
  }


  function enquire(
    property?: PropertyType,
    purpose = 'Get latest price list'
  ) {
    setSelectedProperty(property);
    setSelectedPurpose(purpose);
    document.getElementById('cc-enquiry')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  return (
    <div className="cc-page">
      <header className="cc-header">
        <Link to="/" className="cc-brand" aria-label="REAL PROP — Home">
          <span className="cc-brand-logo"><img src="https://instasize.com/api/image/87e2fdb8828fd9cdfa4566774e9ba73c587ea743872310c777de048c2b9dd4b1.jpeg" alt="REAL PROP logo" loading="eager" /></span>
          <span className="cc-brand-text"><strong>REAL PROP</strong><small>Independent Property Advisory</small></span>
        </Link>
        <nav aria-label="Corbett County navigation">
          <a href="#cc-properties">Properties</a>
          <a href="#cc-overview">Overview</a>
          <a href="#cc-amenities">Amenities</a>
          <a href="#cc-gallery">Gallery</a>
          <a href="#cc-location">Location</a>
          <a href="#cc-enquiry">Enquire</a>
        </nav>
        
<button
  type="button"
  className="cc-header-call"
  onClick={() => enquire()}
>
  ENQUIRE NOW
</button>

      </header>

      <section className="cc-hero">
        <video
          className="cc-hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source
            src={`${BASE}/videos/corbett-county-hero-hq.mp4`}
            type="video/mp4"
          />
        </video>
        <div className="cc-hero-shade" />
        <div className="cc-hero-content">
          <span className="cc-eyebrow">
            RAMNAGAR · UTTARAKHAND
          </span>
          <h1>
            Corbett County
            <em>Where Wilderness Meets Luxury</em>
          </h1>
          <p>
            Discover plotted residences, studio apartments and boutique
            retail opportunities in a nature-inspired destination near
            Jim Corbett.
          </p>
          <div className="cc-hero-actions">
            <button
              type="button"
              className="cc-btn cc-btn-gold"
              onClick={() => enquire()}
            >
              Enquire Now <ArrowRight size={18} />
            </button>
            <a className="cc-btn cc-btn-outline" href={`tel:${PHONE}`}>
              <Phone size={17} /> Call Now
            </a>
          </div>
          <div className="cc-hero-facts">
            <span><Trees size={17} /> 18-acre proposed community</span>
            <span><MapPin size={17} /> Bail Parao, Ramnagar</span>
          </div>
        </div>
      </section>

      <section id="cc-properties" className="cc-section cc-properties">
        <div className="cc-container">
          <span className="cc-section-label">PROPERTY COLLECTION</span>
          <h2>Three ways to explore Corbett County.</h2>
          <div className="cc-property-grid">
            {products.map((product) => {
              const Icon = product.icon;
              return (
                <article className="cc-property-card" key={product.name}>
                  <div className="cc-property-photo">
                    <img src={`${BASE}/images/${product.image}`} alt={product.imageAlt} loading="lazy" />
                    <span>Developer brochure visual · Artist's impression</span>
                  </div>
                  <div className="cc-property-icon"><Icon size={30} /></div>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <div className="cc-property-price">
                    {product.price}
                  </div>
                  <small>{product.detail}</small>
                  <button
                    type="button"
                    className="cc-property-link"
                    onClick={() => enquire(product.name)}
                  >
                    Request Details <ArrowRight size={17} />
                  </button>
                </article>
              );
            })}
          </div>
          <p className="cc-disclaimer">
            Prices are based on supplied developer sheets, subject to
            confirmation, availability and revision. BSP is not the
            final payable amount. Taxes, statutory charges and other
            applicable costs are additional.
          </p>
        </div>
      </section>
      
      <section id="cc-overview" className="cc-section cc-intro">
        <div className="cc-container">
          <span className="cc-section-label">A DESTINATION TO DISCOVER</span>
          <h2>Nature, leisure and considered investment.</h2>
          <p>
            Corbett County is presented by its developer as a
            master-planned destination combining residential plots,
            hospitality-inspired living and a commercial boulevard.
            Explore the available product options, project plans and
            current developer pricing through REAL PROP.
          </p>
          <p className="cc-source-note">Developer: Umesh Kumar c/o Belvoir Realty Private Limited · Proposed 18-acre master-planned community · Site: Bail Parao, Ramnagar. All plans and specifications are subject to developer confirmation.</p>
        </div>
      </section>
      
      <section id="cc-amenities" className="cc-section cc-showcase">
        <div className="cc-container">
          <span className="cc-section-label">NATURE-INSPIRED LIVING</span>
          <h2>Project Overview &amp; Lifestyle Amenities.</h2>
          <p className="cc-showcase-lead">The developer brochure presents a master-planned community with an orchard, landscaped parks, clubhouse and proposed resort-style leisure facilities.</p>
          <div className="cc-showcase-grid">
            {[
              {image:'residential-entrance.webp',title:'Grand Entrance',text:'A landscaped, gated arrival experience.'},
              {image:'residential-clubhouse.webp',title:'Premium Clubhouse',text:'Proposed clubhouse with social and leisure facilities.'},
              {image:'residential-wellness.webp',title:'Wellness & Recreation',text:'Brochure-listed spa, pool, gym and yoga facilities.'},
              {image:'residential-family.webp',title:'Family-Friendly Spaces',text:'Proposed kids’ play area, gaming and senior-friendly spaces.'},
            ].map(item => <article className="cc-showcase-card" key={item.image}>
              <img src={`${BASE}/images/${item.image}`} alt={`${item.title} - Corbett County brochure illustration`} loading="lazy" />
              <div><h3>{item.title}</h3><p>{item.text}</p></div>
            </article>)}
          </div>
          <p className="cc-disclaimer">Brochure visuals include architectural impressions and representative images. Amenities, timelines and hospitality associations are proposed and subject to change; verify before booking.</p>
        </div>
      </section>

      <section id="cc-master-plan" className="cc-section cc-master-plan">
        <div className="cc-container">
          <span className="cc-section-label">EXPLORE THE LAYOUT</span>
          <h2>Residential Master Site Plan.</h2>
          <p className="cc-master-plan-intro">
            Explore the developer-supplied plotted layout, internal roads and
            proposed community spaces. Zoom in to inspect plot numbers;
            confirm current plot availability with REAL PROP.
          </p>
          <div className="cc-master-plan-grid">
            <button
              type="button"
              className="cc-master-plan-preview"
              onClick={openMasterPlan}
              aria-label="Open zoomable residential master site plan"
            >
              <img
                src={`${BASE}/images/residential-master-plan.webp`}
                alt="Corbett County proposed residential plotted layout showing numbered plots, internal roads and proposed community areas"
                loading="lazy"
              />
              <span><Maximize2 size={18} /> Click to explore full plan</span>
            </button>
            <div className="cc-master-plan-details">
              <h3>Find the right plot for you.</h3>
              <p>
                Review the proposed layout and ask us about available plot
                sizes, corner and park-facing options, and applicable charges.
              </p>
              <button
                type="button"
                className="cc-btn cc-btn-gold"
                onClick={() => enquire('Plot', 'Check plot availability')}
              >
                Check Plot Availability <ArrowRight size={17} />
              </button>
              <a
                className="cc-master-plan-pdf"
                href={`${BASE}/floor-plans/master-site-plan.pdf`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download size={17} /> View Original Site Plan (PDF)
              </a>
              <p className="cc-disclaimer">
                Developer-supplied proposed layout, not a live inventory map.
                Plot availability, dimensions, amenities and final approvals
                must be confirmed independently before booking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {masterPlanOpen && (
        <div
          className="cc-master-plan-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Residential master plan enlarged viewer"
          onClick={() => setMasterPlanOpen(false)}
        >
          <div className="cc-master-plan-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="cc-master-plan-toolbar">
              <strong>Residential Master Plan</strong>
              <div className="cc-master-plan-controls">
                <button type="button" aria-label="Zoom out" disabled={masterPlanZoom <= 1}
                  onClick={() => setMasterPlanZoom((z) => Math.max(1, +(z - 0.5).toFixed(1)))}>
                  <ZoomOut size={19} />
                </button>
                <span aria-live="polite">{Math.round(masterPlanZoom * 100)}%</span>
                <button type="button" aria-label="Zoom in" disabled={masterPlanZoom >= 4}
                  onClick={() => setMasterPlanZoom((z) => Math.min(4, +(z + 0.5).toFixed(1)))}>
                  <ZoomIn size={19} />
                </button>
                <button type="button" aria-label="Reset zoom" onClick={() => setMasterPlanZoom(1)}>
                  <RotateCcw size={18} />
                </button>
                <button type="button" aria-label="Close master plan" onClick={() => setMasterPlanOpen(false)}>
                  <X size={22} />
                </button>
              </div>
            </div>
            <div className="cc-master-plan-scroll">
              <img
                src={`${BASE}/images/residential-master-plan.webp`}
                alt="Enlarged Corbett County residential master site plan"
                style={{ width: `${masterPlanZoom * 100}%` }}
              />
            </div>
            <p className="cc-master-plan-hint">Zoom and scroll to explore. Press Esc to close. Proposed layout; availability subject to confirmation.</p>
          </div>
        </div>
      )}

      <section id="cc-gallery" className="cc-section cc-showcase cc-gallery-section">
        <div className="cc-container">
          <span className="cc-section-label">THE CORBETT COUNTY VISION</span>
          <h2>Official Brochure Gallery &amp; Virtual Tour.</h2>
          <p className="cc-showcase-lead">Explore developer-supplied architectural concepts for the residential community, villas, studios and commercial boulevard.</p>
          <div className="cc-gallery-grid">
            {[
              {image:'residential-community.webp',title:'Master-planned Community'},
              {image:'residential-sylvian-villas.webp',title:'Sylvian Villas · Concept'},
              {image:'residential-elysian-villas.webp',title:'Elysian Villas · Concept'},
              {image:'residential-terrace.webp',title:'Villa Terrace · Concept'},
              {image:'commercial-studio-interiors.webp',title:'Studio Interiors · Concept'},
              {image:'commercial-retail-overview.webp',title:'Commercial Boulevard · Concept'},
              {image:'commercial-retail-lifestyle.webp',title:'Retail Lifestyle · Concept'},
              {image:'commercial-commercial-floorplan.webp',title:'Commercial Floor Plans'},
            ].map(item => <figure className="cc-gallery-tile" key={item.image}>
              <img src={`${BASE}/images/${item.image}`} alt={`Corbett County ${item.title} developer brochure visual`} loading="lazy" />
              <figcaption>{item.title}<small>Developer brochure · Illustrative</small></figcaption>
            </figure>)}
          </div>
          <div className="cc-tour-panel">
            <div><h3>Explore the Project Film</h3><p>Developer-supplied promotional video. Images and renders are illustrative.</p></div>
            <video controls playsInline preload="none" poster={`${BASE}/images/residential-entrance.webp`}>
              <source src={`${BASE}/videos/corbett-county-hero-optimized.mp4`} type="video/mp4" />
              Your browser does not support video playback.
            </video>
          </div>
        </div>
      </section>

      <section id="cc-resources" className="cc-section cc-resources">
        <div className="cc-container">
          <span className="cc-section-label">PROJECT DOCUMENTS</span>
          <h2>Explore the vision in detail.</h2>
          <div className="cc-resource-grid">
            <a
              href={`${BASE}/brochures/Corbett_County_Residential_REAL_PROP_Safe.pdf`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download size={24} />
              Residential Brochure
            </a>
            <a
              href={`${BASE}/brochures/Corbett_County_Commercial_REAL_PROP_Safe.pdf`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download size={24} />
              Commercial Brochure
            </a>
            <a
              href={`${BASE}/floor-plans/master-site-plan.pdf`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download size={24} />
              Master Site Plan
            </a>
          </div>
        </div>
      </section>

<CorbettPricingCards onEnquire={(property) => enquire(property, 'Get latest price list')} />

<section id="cc-residential-plots" className="cc-section cc-plot-focus">
  <div className="cc-container">
    <span className="cc-section-label">
      FEATURED INVESTMENT OPPORTUNITY
    </span>

    <h2>Residential Plots at Corbett County.</h2>

    <p className="cc-plot-intro">
      Explore residential plots in the proposed nature-inspired
      Corbett County development near Ramnagar. Residential plots
      are our primary inventory focus, with developer-supplied
      pricing and a construction-linked payment plan.
    </p>

    <div className="cc-plot-highlights">
      <div className="cc-plot-highlight">
        <span>Base Selling Price</span>
        <strong>₹35,000 / Sq. Yard</strong>
      </div>

      <div className="cc-plot-highlight">
        <span>Booking Amount</span>
        <strong>10% of BSP</strong>
      </div>

      <div className="cc-plot-highlight">
        <span>Within 30 Days</span>
        <strong>40% of BSP</strong>
      </div>
    </div>

    <CorbettPlotCalculator
      onEnquire={() =>
        enquire('Plot', 'Get latest price list')
      }
    />

    <div className="cc-plot-payment">
      <h3>Residential Plot Payment Plan</h3>

      <div className="cc-payment-grid">
        {[
          ['On Booking', '10%'],
          ['Within 30 Days', '40%'],
          ['On Road Completion', '25%'],
          ['On Possession', '25%'],
        ].map(([milestone, percentage]) => (
          <div className="cc-payment-item" key={milestone}>
            <strong>{percentage}</strong>
            <span>{milestone}</span>
          </div>
        ))}
      </div>

      <p className="cc-disclaimer">
        Percentages shown are indicative payment milestones
        based on supplied terms. PLC, club charges and other
        applicable charges may be collected at different stages.
        Confirm the final payment schedule with the developer.
      </p>
    </div>
  </div>
</section>


      <section id="cc-location" className="cc-section cc-showcase cc-location-section">
        <div className="cc-container">
          <span className="cc-section-label">LOCATION &amp; CONNECTIVITY</span>
          <h2>In the Heart of Jim Corbett.</h2>
          <p className="cc-showcase-lead">Project site: Bail Parao, Ramnagar, Nainital district, Uttarakhand. The following travel times are indicative figures from the developer brochure.</p>
          <div className="cc-location-layout">
            <img src={`${BASE}/images/residential-location-map.webp`} alt="Corbett County location and connectivity map from developer residential brochure" loading="lazy" />
            <div className="cc-location-facts">
              {[
                ['State Highway','5 min'],['Ramnagar Railway Station','15 min'],
                ['Corbett Waterfall','15 min'],['Shri Hanuman Dham','10 min'],
                ['Haldwani','60 min'],['Pantnagar Airport','1 hr 30 min'],
                ['Garjiya Devi Temple','45 min'],['Nainital','1 hr 30 min']
              ].map(([name,time]) => <div key={name}><span>{name}</span><strong>{time}</strong></div>)}
              <button type="button" className="cc-btn cc-btn-gold" onClick={() => enquire(undefined,'Arrange site visit')}>
                Plan a Site Visit <ArrowRight size={17} />
              </button>
            </div>
          </div>
          <p className="cc-disclaimer">Travel times are brochure estimates, not live navigation data. Confirm routes, access and location independently.</p>
        </div>
      </section>

      <section id="cc-enquiry" className="cc-section cc-contact">
        <div className="cc-container cc-contact-grid">
          <div>
            <span className="cc-section-label">PRIVATE CONSULTATION</span>
            <h2>Find your place at Corbett County.</h2>
            <p>
              Request the latest availability, applicable charges,
              payment milestones or a guided site visit.
            </p>
            <a
              className="cc-whatsapp"
              href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
                'Hello REAL PROP, I would like details about Corbett County.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Enquire on WhatsApp <ArrowRight size={18} />
            </a>
          </div>
          <CorbettCountyLeadForm
            selectedProperty={selectedProperty}
            selectedPurpose={selectedPurpose}
          />
        </div>
      </section>

      <nav className="cc-mobile-action-bar" aria-label="Quick contact actions">
        <a href={`tel:${PHONE}`} className="cc-mobile-action cc-mobile-call">
          <Phone size={19} aria-hidden="true" /> <span>Call Now</span>
        </a>
        <a
          href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Hello REAL PROP, I would like details about Corbett County.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="cc-mobile-action cc-mobile-whatsapp"
        >
          <MessageCircle size={19} aria-hidden="true" /> <span>WhatsApp</span>
        </a>
        <button
          type="button"
          className="cc-mobile-action cc-mobile-visit"
          onClick={() => enquire(undefined, 'Arrange site visit')}
        >
          <CalendarDays size={19} aria-hidden="true" /> <span>Site Visit</span>
        </button>
      </nav>

      <footer className="cc-footer">
        <div className="cc-footer-inner">
          <div className="cc-footer-top">
            <Link to="/" className="cc-brand cc-footer-brand" aria-label="REAL PROP — Home">
              <span className="cc-brand-logo"><img src="https://instasize.com/api/image/87e2fdb8828fd9cdfa4566774e9ba73c587ea743872310c777de048c2b9dd4b1.jpeg" alt="REAL PROP logo" loading="eager" /></span>
          <span className="cc-brand-text"><strong>REAL PROP</strong><small>Independent Property Advisory</small></span>
            </Link>
            <span className="cc-footer-tagline">Turning Dreams into reality.</span>
          </div>
          <div className="cc-footer-rule" />
          <div className="cc-footer-details">
            <div>
              <h3>About REAL PROP</h3>
              <p>REAL PROP is an independent real estate consultancy. We assist buyers and investors with project information, property options and enquiries. We are not the project developer or its official website.</p>
            </div>
            <div>
              <h3>Important Disclaimer</h3>
              <p>Project details, pricing, availability, area, amenities, specifications, approvals and timelines are based on information supplied by the developer or other third parties and may change without notice. Images, videos, plans and renders may be illustrative and do not necessarily depict completed work. Nothing on this page is a guarantee of possession, rental income, appreciation or investment returns. Buyers should independently verify all claims, applicable RERA registration, approvals, title, charges and contractual terms before making a decision.</p>
            </div>
          </div>
          <div className="cc-footer-bottom">
            <span>© {new Date().getFullYear()} REAL PROP. All rights reserved.</span>
            <span>Independent Property Advisory · Delhi NCR</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
