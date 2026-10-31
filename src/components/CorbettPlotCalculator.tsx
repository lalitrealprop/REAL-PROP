
import { useState } from 'react';
import { Calculator, ArrowRight, Info } from 'lucide-react';

type Props = {
  onEnquire: () => void;
};

const BASE_RATE = 35000;
const EDC_RATE = 1000;
const EEC_WATER_RATE = 500;
const IFMS_RATE = 500;
const CLUB_CHARGE = 150000;

const formatINR = (amount: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);

export default function CorbettPlotCalculator({ onEnquire }: Props) {
  const [areaInput, setAreaInput] = useState('100');
  const [corner, setCorner] = useState(false);
  const [parkFacing, setParkFacing] = useState(false);

  const area = Number(areaInput);
  const validArea =
    areaInput.trim() !== '' &&
    Number.isFinite(area) &&
    area > 0 &&
    area <= 100000;

  const bsp = validArea ? area * BASE_RATE : 0;
  const cornerPLC = corner ? bsp * 0.1 : 0;
  const parkPLC = parkFacing ? bsp * 0.1 : 0;
  const edc = validArea ? area * EDC_RATE : 0;
  const eecWater = validArea ? area * EEC_WATER_RATE : 0;
  const ifms = validArea ? area * IFMS_RATE : 0;

  const estimatedTotal = validArea
    ? bsp + cornerPLC + parkPLC + edc + eecWater + ifms + CLUB_CHARGE
    : 0;

  const charges = [
    { label: 'Basic Selling Price', amount: bsp },
    { label: 'Corner PLC (10%)', amount: cornerPLC },
    { label: 'Park-facing PLC (10%)', amount: parkPLC },
    { label: 'EDC', amount: edc },
    { label: 'EEC + Water', amount: eecWater },
    { label: 'IFMS', amount: ifms },
    { label: 'Club Membership', amount: validArea ? CLUB_CHARGE : 0 },
  ];

  return (
    <div className="cc-calculator">
      <div className="cc-calculator-heading">
        <Calculator size={25} />
        <div>
          <h3>Residential Plot Cost Calculator</h3>
          <p>Estimate your plot investment using supplied rates.</p>
        </div>
      </div>

      <div className="cc-calculator-grid">
        <div className="cc-calculator-inputs">
          <label htmlFor="cc-plot-area">Plot Area (Sq. Yards)</label>
          <input
            id="cc-plot-area"
            type="number"
            min="1"
            max="100000"
            step="1"
            value={areaInput}
            onChange={(event) => setAreaInput(event.target.value)}
            placeholder="Enter plot area"
          />

          {!validArea && (
            <p className="cc-input-error" role="alert">
              Enter a valid plot area greater than 0.
            </p>
          )}

          <div className="cc-calculator-options">
            <label>
              <input
                type="checkbox"
                checked={corner}
                onChange={(event) => setCorner(event.target.checked)}
              />
              Corner Plot (+10% PLC)
            </label>

            <label>
              <input
                type="checkbox"
                checked={parkFacing}
                onChange={(event) => setParkFacing(event.target.checked)}
              />
              Park-facing Plot (+10% PLC)
            </label>
          </div>

          <div className="cc-calculator-info">
            <Info size={18} />
            <p>
              Both PLCs are calculated independently on BSP when selected.
              Final PLC applicability must be confirmed with the developer.
            </p>
          </div>
        </div>

        <div className="cc-calculator-results">
          <span className="cc-section-label">ESTIMATED BREAKDOWN</span>

          {charges.map((charge) => (
            <div className="cc-cost-row" key={charge.label}>
              <span>{charge.label}</span>
              <strong>{formatINR(charge.amount)}</strong>
            </div>
          ))}

          <div className="cc-cost-total">
            <span>Estimated Subtotal</span>
            <strong>
              {validArea ? formatINR(estimatedTotal) : '—'}
            </strong>
          </div>

          <p className="cc-calculator-disclaimer">
            Indicative calculation only. GST/taxes, stamp duty,
            registration, other statutory charges and any additional
            applicable fees are excluded. This is not a final quotation.
          </p>

          <button
            type="button"
            className="cc-btn cc-btn-gold cc-calculator-cta"
            onClick={onEnquire}
            disabled={!validArea}
          >
            Get Plot Availability <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
