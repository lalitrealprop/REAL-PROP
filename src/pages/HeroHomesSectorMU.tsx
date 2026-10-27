
import { useEffect, useState } from 'react';
import HeroHomesLeadForm from '../components/HeroHomesLeadForm';
import '../styles-hero-homes.css';
import {
  trackWhatsAppClicked,
  trackCallClicked,
} from '../lib/analytics';

const PHONE = '9999882898';
const PHONE_LINK = `tel:+91${PHONE}`;

const WHATSAPP_LINK =
  `https://wa.me/91${PHONE}?text=${encodeURIComponent(
    'Hello REAL PROP, I am interested in Hero Homes Leafsong Retreat, Sector MU, Greater Noida. Please share the latest price, availability and site visit details.'
  )}`;

const ASSET = '/hero-homes-sector-mu/';

const PRICE_PURPOSE = 'Get updated price list';
const SITE_VISIT_PURPOSE = 'Schedule site visit';

const residences = [
  {
    id: '1656',
    name: '3 BHK + 2T (A)',
    area: '1,656 sq.ft.',
    carpet: '903.96 sq.ft.',
    image: 'plan3.png',
    title: 'The Essential Retreat',
    historicalPrice: '₹1.82–1.95 Cr*',
    launchPrice: '₹2.15–2.28 Cr',
  },
  {
    id: '1674',
    name: '3 BHK + 2T',
    area: '1,674 sq.ft.',
    carpet: '903.96 sq.ft.',
    image: 'plan0.png',
    title: 'The Contemporary Retreat',
    historicalPrice: '₹1.84–1.96 Cr*',
    launchPrice: '₹2.18–2.29 Cr',
  },
  {
    id: '1937',
    name: '3 BHK + 3T',
    area: '1,937.52 sq.ft.',
    carpet: '1,046.26 sq.ft.',
    image: 'plan1.png',
    title: 'Room to Flourish',
    historicalPrice: '₹2.13–2.28 Cr*',
    launchPrice: '₹2.52–2.65 Cr',
  },
  {
    id: '2289',
    name: '3 BHK + 3T + SR',
    area: '2,289.34 sq.ft.',
    carpet: '1,236.25 sq.ft.',
    image: 'plan2.png',
    title: 'The Signature Residence',
    historicalPrice: '₹2.52–2.70 Cr*',
    launchPrice: '₹2.98–3.10 Cr',
  },
];

const amenities = [
  ['club.webp', 'Clubhouse'],
  ['garden.webp', 'Landscaped Garden'],
  ['sports.webp', 'Sports Facilities'],
  ['restaurant.webp', 'Dining Spaces'],
  ['gym.webp', 'Fitness Centre'],
  ['courtyard.webp', 'Celebration Courtyard'],
];

const features = [
  {
    title: 'AQI-controlled homes & club',
    description:
      'Energy recovery ventilation system, as described in the promotional material.',
  },
  {
    title: 'Modular kitchen',
    description:
      'Hob, chimney, RO and geyser indicated in the offer.',
  },
  {
    title: 'Engineered marble flooring',
    description:
      'Refined flooring specification as presented in the promotional material.',
  },
  {
    title: 'All-weather split ACs',
    description:
      'Daikin or equivalent, subject to final specifications.',
  },
  {
    title: 'False ceiling & lights',
    description:
      'Living room finishing as per approved design.',
  },
  {
    title: 'Master bathroom details',
    description:
      'Vanity, shower cubicle, mirror and geyser as indicated.',
  },
  {
    title: 'Promotional transfer benefit',
    description:
      'Free transfer post 25% payment, subject to offer terms and developer confirmation.',
  },
];

export default function HeroHomesSectorMU() {
  const [selectedUnit, setSelectedUnit] = useState('');
  const [selectedPurpose, setSelectedPurpose] =
    useState(PRICE_PURPOSE);

  const [zoom, setZoom] = useState<string | null>(null);

  const offerExpired =
    Date.now() >=
    new Date('2026-10-26T00:00:00+05:30').getTime();

  useEffect(() => {
    const oldTitle = document.title;

    document.title =
      'Hero Homes Leafsong Retreat Sector MU Greater Noida | REAL PROP';

    let meta = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]'
    );

    const existed = Boolean(meta);
    const oldDescription = meta?.content ?? '';

    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }

    meta.content =
      'Explore Hero Homes Leafsong Retreat, Sector MU, Greater Noida. Luxury 3 BHK apartments, floor plans, amenities, latest pricing and site visits with REAL PROP.';

    return () => {
      document.title = oldTitle;

      if (meta) {
        if (existed) {
          meta.content = oldDescription;
        } else {
          meta.remove();
        }
      }
    };
  }, []);

  useEffect(() => {
    if (!zoom) return;

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setZoom(null);
      }
    };

    window.addEventListener('keydown', onEscape);

    return () => {
      window.removeEventListener('keydown', onEscape);
    };
  }, [zoom]);

  const selectPriceEnquiry = () => {
    setSelectedPurpose(PRICE_PURPOSE);
  };

  const selectSiteVisit = () => {
    setSelectedPurpose(SITE_VISIT_PURPOSE);
  };

  const selectResidence = (unit: string) => {
    setSelectedUnit(unit);
    setSelectedPurpose(PRICE_PURPOSE);
  };

  return (
    <div className="hh-page hh-refined">
      {/* HEADER */}
      <header className="top hh-top-refined">
        <a
          className="brand hh-brand-refined"
          href="https://realprop.online"
          aria-label="REAL PROP homepage"
        >
          <span className="hh-logo-frame">
            <img
              className="hh-logo"
              src="/real-prop-original-logo.png"
              alt="REAL PROP original logo"
            />
          </span>

          <span className="hh-brand-text">
            <strong>REAL PROP</strong>
            <small>Independent Property Advisory</small>
          </span>
        </a>

        <nav aria-label="Project navigation">
          <a href="#overview">The Retreat</a>
          <a href="#residences">Residences</a>
          <a href="#price">Pricing</a>
          <a href="#experience">Lifestyle</a>
          <a href="#floorplans">Floor Plans</a>
        </nav>

        <div className="hh-header-actions">
          <a
            className="hh-header-phone"
            href={PHONE_LINK}
            aria-label="Call REAL PROP"
          >
            ☎ {PHONE}
          </a>

          <a
            className="btn"
            href="#enquire"
            onClick={selectPriceEnquiry}
          >
            Enquire Now
          </a>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="hero hh-hero-refined">
          <div className="hero-inner hh-hero-content">
            <div className="eyebrow">
              HERO HOMES · SECTOR MU · GREATER NOIDA
            </div>

            <h1 className="hh-project-title">
              Hero Homes
              <br />
              <em>Leafsong Retreat</em>
            </h1>

            <p className="hh-hero-tagline">
              Where life finds its rhythm.
            </p>

            <p className="hh-hero-description">
              Discover thoughtfully designed luxury 3 BHK
              residences surrounded by nature-inspired
              experiences in Sector MU, Greater Noida.
            </p>

            <div className="actions hh-primary-actions">
              <a
                className="btn"
                href="#enquire"
                onClick={selectPriceEnquiry}
              >
                Get Latest Price ↗
              </a>

              <a
                className="btn ghost"
                href="#enquire"
                onClick={selectSiteVisit}
              >
                Book Site Visit
              </a>
            </div>

            <div className="hh-contact-actions">
  <a
    className="hh-contact-call"
    href={PHONE_LINK}
    onClick={() => trackCallClicked()}
  >
    ☎ Call Now
  </a>

  <a
    className="hh-contact-whatsapp"
    href={WHATSAPP_LINK}
    target="_blank"
    rel="noopener noreferrer"
    onClick={() => trackWhatsAppClicked()}
  >
    WhatsApp Enquiry ↗
  </a>
</div>

            <div className="hero-bottom hh-hero-bottom">
              3 BHK RESIDENCES
              <span> / </span>
              1,656–2,289.34 SQ.FT.
              <span> / </span>
              SECTOR MU, GREATER NOIDA
            </div>
          </div>
        </section>

        {/* PROJECT HIGHLIGHTS */}
        <div className="stats">
          <div className="stat">
            <strong>Sector MU</strong>
            <span>Greater Noida Address</span>
          </div>

          <div className="stat">
            <strong>3 BHK</strong>
            <span>Four Configurations</span>
          </div>

          <div className="stat">
            <strong>Price on Request</strong>
            <span>Latest Written Quotation</span>
          </div>

          <div className="stat">
            <strong>RERA</strong>
            <span>UPRERAPRJ414014/10/2026</span>
          </div>
        </div>

        <div className="banner">
          {offerExpired
            ? 'Historical promotional pricing shown for reference only. Offer period ended 25 October 2026. Request a current written developer quotation.'
            : 'Developer promotional prices indicated as valid through 25 October 2026. Request a current written quotation before booking.'}
        </div>

        {/* OVERVIEW */}
        <section className="section" id="overview">
          <div className="container intro">
            <div>
              <div className="eyebrow">
                The Philosophy
              </div>

              <h2>
                Not simply a home.
                <br />
                A softer way to live.
              </h2>

              <p className="muted">
                Leafsong Retreat takes inspiration from the
                calm of nature, blending distinctive towers
                with curated gardens, wellness-led spaces
                and a connected community.
              </p>

              <p className="muted">
                The project brochure describes its vision
                as <i>“Live Slow. Live Well. Live Here.”</i>
              </p>

              <a
                href="#enquire"
                className="btn"
                onClick={selectPriceEnquiry}
              >
                Arrange a Private Presentation
              </a>
            </div>

            <img
              src={`${ASSET}arrival.webp`}
              alt="Leafsong Retreat landscaped arrival artist impression"
              loading="lazy"
            />
          </div>
        </section>

        {/* RESIDENCES */}
        <section
          className="section soft"
          id="residences"
        >
          <div className="container">
            <div className="center">
              <div className="eyebrow">
                Thoughtful Residences
              </div>

              <h2>
                Find the space that fits your life.
              </h2>

              <p className="muted">
                Explore four residential configurations
                from the supplied unit plans.
              </p>
            </div>

            <div className="cards">
              {residences.map((unit) => (
                <article
                  className="card"
                  key={unit.id}
                >
                  <button
                    type="button"
                    className="hh-plan-zoom"
                    onClick={() =>
                      setZoom(
                        `${ASSET}${unit.image}`
                      )
                    }
                    aria-label={`View ${unit.name} floor plan`}
                    title="Tap to enlarge floor plan"
                  >
                    <img
                      src={`${ASSET}${unit.image}`}
                      alt={`${unit.name} ${unit.area} floor plan`}
                      loading="lazy"
                    />
                  </button>

                  <div className="card-body">
                    <div className="tag">
                      {unit.title}
                    </div>

                    <h3>{unit.name}</h3>

                    <p>
                      {unit.area} saleable ·{' '}
                      {unit.carpet} carpet
                    </p>

                    <b>
                      {offerExpired
                        ? 'Latest Price on Request'
                        : unit.historicalPrice}
                    </b>

                    <p
                      style={{
                        fontSize: '12px',
                        opacity: 0.7,
                        marginTop: '8px',
                      }}
                    >
                      Tap floor plan to enlarge
                    </p>

                    <a
                      className="btn"
                      href="#enquire"
                      onClick={() =>
                        selectResidence(unit.id)
                      }
                    >
                      Request Cost Sheet
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section className="section" id="price">
          <div className="container">
            <div className="eyebrow">
              Historical Pricing Reference ·
              Request Current Quote
            </div>

            <h2>
              Clarity is the real luxury.
            </h2>

            <p className="muted">
              Promotional price references from the
              supplied material. These figures are not
              a current price offer. Request a written
              developer quotation before making a
              decision.
            </p>

            <div className="compare">
              <div>
                <b>₹10,999 / sq.ft.*</b>
                Pre-launch BSP · through 25 Oct 2026
              </div>

              <div>
                <b>₹11,499 / sq.ft.*</b>
                Announced from 26 Oct 2026
              </div>

              <div>
                <b>₹13,000 / sq.ft.*</b>
                Announced launch-price reference
              </div>
            </div>

            {/* MOBILE PRICING SWIPE HINT */}
            <div
              className="hh-pricing-swipe-hint"
              aria-hidden="true"
            >
              Swipe horizontally to view all prices →
            </div>

            <div
              className="pricing"
              role="region"
              aria-label="Historical residential pricing table"
              tabIndex={0}
            >
              <table>
                <thead>
                  <tr>
                    <th>Residence</th>
                    <th>Saleable Area</th>
                    <th>Pre-launch Range*</th>
                    <th>Launch Range*</th>
                  </tr>
                </thead>

                <tbody>
                  {residences.map((unit) => (
                    <tr key={unit.id}>
                      <td>{unit.name}</td>
                      <td>{unit.area}</td>
                      <td>
                        {unit.historicalPrice.replace(
                          '*',
                          ''
                        )}
                      </td>
                      <td>
                        {unit.launchPrice}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="notice">
              *Historical promotional references from
              supplied material. GST, lease rent, AMC,
              IFMS, PLC where applicable and other
              charges extra. Prices, availability and
              benefits require current written developer
              confirmation. The effective date of the
              ₹13,000 reference was not stated.
            </p>

            <a
              href="#enquire"
              className="btn"
              onClick={selectPriceEnquiry}
            >
              Get Updated Price & Availability
            </a>
          </div>
        </section>

        {/* LIFESTYLE */}
        <section
          className="section dark"
          id="experience"
        >
          <div className="container center">
            <div className="eyebrow">
              Urban Resort Living
            </div>

            <h2>
              Every day deserves a little wonder.
            </h2>

            <p className="muted">
              Wellness, celebration and active living
              inspired by the project brochure.
            </p>

            <div className="gallery">
              {amenities.map(([image, label]) => (
                <img
                  key={image}
                  src={`${ASSET}${image}`}
                  alt={`${label} artist impression`}
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="section">
          <div className="container">
            <div className="eyebrow">
              Seven Considered Advantages
            </div>

            <h2>
              Thoughtful details.
              <br />
              Everyday indulgences.
            </h2>

            <div className="feature-grid">
              {features.map((feature, index) => (
                <div
                  className="feature"
                  key={feature.title}
                >
                  <b>
                    {String(index + 1).padStart(
                      2,
                      '0'
                    )}
                    {' — '}
                    {feature.title}
                  </b>

                  <p className="muted">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FLOOR PLANS */}
        <section
          className="section soft"
          id="floorplans"
        >
          <div className="container center">
            <div className="eyebrow">
              Explore Every Detail
            </div>

            <h2>
              Four layouts. One exceptional address.
            </h2>

            <p className="muted">
              Explore the supplied residential floor
              plans. Tap a layout to view it in detail.
            </p>

            <div className="plans">
              {residences.map((unit) => (
                <div
                  className="plan"
                  key={unit.id}
                >
                  <button
                    type="button"
                    className="hh-plan-zoom"
                    onClick={() =>
                      setZoom(
                        `${ASSET}${unit.image}`
                      )
                    }
                    aria-label={`Expand ${unit.name} plan`}
                    title="Tap to enlarge"
                  >
                    <img
                      src={`${ASSET}${unit.image}`}
                      alt={`${unit.name} ${unit.area} plan`}
                      loading="lazy"
                    />
                  </button>

                  <strong>
                    {unit.area} · {unit.name}
                  </strong>

                  <small
                    style={{
                      display: 'block',
                      marginTop: '8px',
                    }}
                  >
                    Tap to enlarge floor plan
                  </small>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LOCATION */}
        <section className="section dark">
          <div className="container intro">
            <div>
              <div className="eyebrow">
                The Address
              </div>

              <h2>
                Sector MU.
                <br />
                Greater Noida.
              </h2>

              <p className="muted">
                Located amid Greater Noida's established
                residential sectors, Leafsong Retreat's
                brochure places the project near
                Omicron II and Omicron III.
              </p>

              <p className="muted">
                Exact commute times and routes should
                be verified independently.
              </p>

              <a
                className="btn"
                href="https://www.google.com/maps/search/?api=1&query=Sector+MU+Greater+Noida"
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore Area on Map ↗
              </a>
            </div>

            <img
              src={`${ASSET}towers.webp`}
              alt="Leafsong Retreat towers artist impression"
              loading="lazy"
            />
          </div>
        </section>

        {/* ENQUIRY */}
        <section
          className="section cta"
          id="enquire"
        >
          <div className="container">
            <div className="eyebrow">
              A Personal Invitation
            </div>

            <h2>
              Make room for
              <br />
              <em>extraordinary living.</em>
            </h2>

            <p>
              Request the latest availability, detailed
              cost sheet or a private site visit with
              REAL PROP.
            </p>

            <div className="hh-enquiry-contact">
              <a href={PHONE_LINK}>
                ☎ Call {PHONE}
              </a>

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp Our Team ↗
              </a>
            </div>

            <HeroHomesLeadForm
              selectedUnit={selectedUnit}
              selectedPurpose={selectedPurpose}
            />
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="hh-footer-brand">
          <img
            className="hh-logo"
            src="/real-prop-original-logo.png"
            alt="REAL PROP"
          />

          <div>
            <strong>REAL PROP</strong>
            <p>
              Independent Property Advisory
            </p>
          </div>
        </div>

        <p>
          Project: Hero Homes Leafsong Retreat ·
          Sector MU, Greater Noida · UP RERA:
          UPRERAPRJ414014/10/2026.{' '}
          Verify registration at{' '}
          <a
            href="https://www.up-rera.in/"
            target="_blank"
            rel="noopener noreferrer"
          >
            UP RERA
          </a>.
        </p>

        <p>
          REAL PROP is an independent real-estate
          advisory business and this is not the
          developer's official website. Visuals are
          artist impressions. Prices, specifications
          and availability require written confirmation.
        </p>
      </footer>

      {/* DESKTOP STICKY CTA */}
      <a
        href="#enquire"
        className="btn sticky hh-desktop-sticky"
        onClick={selectPriceEnquiry}
      >
        Get Latest Price ↗
      </a>

      {/* MOBILE CONTACT BAR */}
      <div
        className="hh-mobile-contact-bar"
        aria-label="Quick enquiry actions"
      >
        <a href={PHONE_LINK}>
          ☎ Call
        </a>

        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp
        </a>

        <a
          href="#enquire"
          onClick={selectSiteVisit}
        >
          Site Visit
        </a>
      </div>

      {/* FLOOR PLAN PREVIEW */}
      {zoom && (
        <div
          className="hh-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Floor plan preview"
          onClick={() => setZoom(null)}
        >
          <button
            type="button"
            onClick={() => setZoom(null)}
          >
            Close ✕
          </button>

          <img
            src={zoom}
            alt="Expanded floor plan"
            onClick={(event) =>
              event.stopPropagation()
            }
          />
        </div>
      )}
    </div>
  );
}
