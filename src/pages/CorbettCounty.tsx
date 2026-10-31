import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Download,
  MapPin,
  Phone,
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
}[] = [
  {
    name: 'Plot',
    description: 'Residential plotted opportunities within a nature-inspired township.',
    price: '₹35,000 / sq. yd.',
    detail: 'Base rate; PLC and other charges extra',
    icon: Trees,
  },
  {
    name: 'Studio Apartment',
    description: 'Contemporary studio spaces within a resort-inspired community.',
    price: '₹50.05 L BSP',
    detail: '650 sq. ft. × ₹7,700; additional charges and taxes extra',
    icon: Building2,
  },
  {
    name: 'Retail Shop',
    description: 'Boutique retail opportunities planned for the commercial boulevard.',
    price: '₹60 L BSP',
    detail: '500 sq. ft. × ₹12,000; additional charges and taxes extra',
    icon: Store,
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
        <Link to="/" className="cc-brand">
          REAL PROP
        </Link>
        <nav aria-label="Corbett County navigation">
          <a href="#cc-properties">Properties</a>
          <a href="#cc-overview">Overview</a>
          <a href="#cc-resources">Brochures</a>
          <a href="#cc-enquiry">Enquire</a>
        </nav>
        <a className="cc-header-call" href={`tel:${PHONE}`}>
          <Phone size={16} /> Call Now
        </a>
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
              Explore Opportunities <ArrowRight size={18} />
            </button>
            <a
              className="cc-btn cc-btn-outline"
              href="#cc-properties"
            >
              View Properties
            </a>
          </div>
          <div className="cc-hero-facts">
            <span><Trees size={17} /> 18-acre proposed community</span>
            <span><MapPin size={17} /> Bail Parao, Ramnagar</span>
          </div>
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
        </div>
      </section>
      
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

      <section id="cc-properties" className="cc-section cc-properties">
        <div className="cc-container">
          <span className="cc-section-label">PROPERTY COLLECTION</span>
          <h2>Three ways to explore Corbett County.</h2>
          <div className="cc-property-grid">
            {products.map((product) => {
              const Icon = product.icon;
              return (
                <article className="cc-property-card" key={product.name}>
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
      
<CorbettPricingCards onEnquire={(property) => enquire(property, 'Get latest price list')} />

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

      <footer className="cc-footer">
        <p>© REAL PROP · Turning Dreams into reality.</p>
        <p>
          REAL PROP is a property consultancy. Project specifications,
          representations, pricing and timelines are subject to
          developer confirmation and applicable approvals.
        </p>
      </footer>
    </div>
  );
}
