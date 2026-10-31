import { ArrowRight, Building2, Store, Trees } from 'lucide-react';

type PropertyType = 'Plot' | 'Studio Apartment' | 'Retail Shop';

type PricingCard = {
  name: PropertyType;
  label: string;
  icon: typeof Trees;
  area: string;
  rate: string;
  bsp: string;
  extras: { label: string; value: string }[];
  subtotal: string;
  milestone: string;
  note: string;
};

const cards: PricingCard[] = [
  {
    name: 'Plot',
    label: 'RESIDENTIAL PLOTS · FEATURED',
    icon: Trees,
    area: '100 sq. yd. minimum example',
    rate: '₹35,000 / sq. yd.',
    bsp: '₹35.00 L',
    extras: [
      { label: 'EDC · ₹1,000/sq. yd.', value: '₹1.00 L' },
      { label: 'EEC / Water · ₹500/sq. yd.', value: '₹0.50 L' },
      { label: 'IFMS · ₹500/sq. yd.', value: '₹0.50 L' },
      { label: 'Club membership', value: '₹1.50 L' },
    ],
    subtotal: '₹38.50 L',
    milestone: 'Road Completion',
    note: 'Illustrative 100 sq. yd. minimum-size plot without corner or park-facing PLC. Actual amount depends on selected plot, PLC and applicable charges.',
  },
  {
    name: 'Studio Apartment',
    label: 'STUDIO LIVING',
    icon: Building2,
    area: '650 sq. ft.',
    rate: '₹7,700 / sq. ft.',
    bsp: '₹50.05 L',
    extras: [{ label: 'Other charges (per supplied sheet)', value: '₹1.50 L' }],
    subtotal: '₹51.55 L',
    milestone: '1st Slab Completion',
    note: 'Calculated subtotal corrects the arithmetic inconsistency in the developer-supplied studio sheet; confirm the final quotation.',
  },
  {
    name: 'Retail Shop',
    label: 'BOUTIQUE RETAIL',
    icon: Store,
    area: '500 sq. ft.',
    rate: '₹12,000 / sq. ft.',
    bsp: '₹60.00 L',
    extras: [{ label: 'Other charges (per supplied sheet)', value: '₹1.50 L' }],
    subtotal: '₹61.50 L',
    milestone: '1st Slab Completion',
    note: 'Indicative subtotal based on supplied pricing; confirm shop availability, specifications and final charges.',
  },
];

export default function CorbettPricingCards({
  onEnquire,
}: {
  onEnquire: (property: PropertyType) => void;
}) {
  return (
    <section id="cc-pricing" className="cc-section" style={{ background: '#f6f5ef' }}>
      <div className="cc-container">
        <span className="cc-section-label">REAL PROP · TRANSPARENT PRICING</span>
        <h2>Property Pricing &amp; Payment Plans.</h2>
        <p className="cc-price-intro">
          Compare indicative pricing for plots, studio apartments and retail shops.
          For plots, use the calculator above to estimate your preferred area and PLC.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8 items-stretch">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <article key={card.name} className="rounded-3xl overflow-hidden border border-[#d8d3bf] bg-white shadow-lg flex flex-col">
                <div className="bg-[#102e25] text-white p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="p-2 rounded-xl bg-white/10 text-[#d5b477]"><Icon size={23} /></span>
                    <span className="text-[10px] sm:text-xs font-bold tracking-[0.16em] text-[#d5b477]">{card.label}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">{card.name}</h3>
                  <p className="text-white/75 mt-1 text-sm">{card.area} · {card.rate}</p>
                  <p className="text-xs uppercase tracking-widest text-[#d5b477] mt-5">Indicative subtotal</p>
                  <p className="text-4xl font-bold text-white mt-1">{card.subtotal}</p>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="space-y-3 text-sm text-[#294039]">
                    <div className="flex justify-between gap-3"><span>Basic Sale Price (BSP)</span><strong>{card.bsp}</strong></div>
                    {card.extras.map((extra) => (
                      <div key={extra.label} className="flex justify-between gap-3">
                        <span>{extra.label}</span><strong className="shrink-0">{extra.value}</strong>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-[#e4dfd1] mt-5 pt-5">
                    <h4 className="font-bold text-[#102e25] mb-3">Payment milestones</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        ['10%', 'On Booking'],
                        ['40%', 'Within 30 Days'],
                        ['25%', card.milestone],
                        ['25%', 'On Possession'],
                      ].map(([percentage, milestone]) => (
                        <div key={milestone} className="bg-[#f3f3ed] rounded-xl p-3">
                          <strong className="block text-[#102e25] text-lg">{percentage}</strong>
                          <span className="text-xs text-[#58655e]">{milestone}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed text-[#657069] mt-5 mb-5">{card.note}</p>
                  <button type="button" onClick={() => onEnquire(card.name)}
                    className="mt-auto w-full flex items-center justify-center gap-2 rounded-xl bg-[#c9a565] hover:bg-[#b9924f] text-[#102e25] px-4 py-4 font-bold transition-colors">
                    Get Latest Price <ArrowRight size={18} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
        <p className="cc-disclaimer mt-6">
          All figures are indicative and subject to developer confirmation, availability and revision.
          Subtotals exclude applicable taxes, stamp duty, registration and any additional charges not
          expressly included above. Payment percentages are based on the supplied plan; the 30-day
          milestone has been confirmed by REAL PROP. Payment bases, collection timing and final
          contractual terms must be checked against the developer's current written quotation.
          No rental return or lease guarantee is represented here.
        </p>
      </div>
    </section>
  );
}
