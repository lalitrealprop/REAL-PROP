
import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import {
  trackEnquiryFormStarted,
  trackLeadSubmitted,
} from '../lib/analytics';

type Fields = {
  name: string;
  phone: string;
  unit: string;
  interest: string;
  consent: boolean;
};

type HeroHomesLeadFormProps = {
  selectedUnit?: string;
  selectedPurpose?: string;
};

const DEFAULT_PURPOSE = 'Get updated price list';
const SITE_VISIT_PURPOSE = 'Schedule site visit';

const createInitialFields = (): Fields => ({
  name: '',
  phone: '',
  unit: '',
  interest: DEFAULT_PURPOSE,
  consent: false,
});

const VALID_PURPOSES = [
  DEFAULT_PURPOSE,
  'Request floor plan',
  SITE_VISIT_PURPOSE,
  'Request callback',
];

export default function HeroHomesLeadForm({
  selectedUnit = '',
  selectedPurpose = DEFAULT_PURPOSE,
}: HeroHomesLeadFormProps) {
  const [fields, setFields] = useState<Fields>(
    createInitialFields
  );

  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const started = useRef(false);

  const set = <K extends keyof Fields>(
    key: K,
    value: Fields[K]
  ) => {
    setFields((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  // Sync selected residence from landing-page cards.
  useEffect(() => {
    if (selectedUnit) {
      setFields((previous) => ({
        ...previous,
        unit: selectedUnit,
      }));
    }
  }, [selectedUnit]);

  // Sync enquiry purpose from landing-page CTA.
  useEffect(() => {
    if (VALID_PURPOSES.includes(selectedPurpose)) {
      setFields((previous) => ({
        ...previous,
        interest: selectedPurpose,
      }));
    }
  }, [selectedPurpose]);

  async function submit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (sending) return;

    const cleanName = fields.name.trim();
    const cleanPhone = fields.phone.trim();

    if (
      !cleanName ||
      !/^[6-9]\d{9}$/.test(cleanPhone) ||
      !fields.consent
    ) {
      setError(
        'Please enter your name, a valid Indian mobile number and consent.'
      );
      return;
    }

    setSending(true);
    setError('');

    try {
      await addDoc(collection(db, 'leads'), {
        name: cleanName,
        phone: cleanPhone,

        // Existing centralized CRM compatibility.
        propertyType: 'Flat',
        budget: '',
        location: 'Sector MU, Greater Noida',

        // Hero Homes project information.
        project: 'Hero Homes Leafsong Retreat',
        projectId: 'hero-homes-sector-mu',
        configuration:
          fields.unit || selectedUnit || 'Not selected',

        enquiryPurpose: fields.interest,
        source:
          'realprop.online Hero Homes landing page',

        consentToContact: true,
        createdAt: serverTimestamp(),
      });

      setDone(true);
      setFields(createInitialFields());

      try {
        trackLeadSubmitted();
      } catch {
        // Analytics must not block successful submission.
      }
    } catch (err) {
      console.error(
        'Hero Homes enquiry submission failed:',
        err
      );

      setError(
        'Your enquiry could not be saved. Please try again.'
      );
    } finally {
      setSending(false);
    }
  }

  if (done) {
    return (
      <div
        className="hh-form-success"
        role="status"
      >
        <h3>Thank you for your enquiry.</h3>

        <p>
          REAL PROP will contact you shortly.
        </p>

        <button
          className="hh-btn"
          type="button"
          onClick={() => {
            setDone(false);
            setError('');
            setFields(createInitialFields());
            started.current = false;
          }}
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      className="hh-form"
      onSubmit={submit}
      onFocus={() => {
        if (!started.current) {
          started.current = true;

          try {
            trackEnquiryFormStarted();
          } catch {
            // Optional analytics.
          }
        }
      }}
    >
      <input
        aria-label="Full name"
        required
        maxLength={80}
        autoComplete="name"
        placeholder="Your full name *"
        value={fields.name}
        onChange={(event) =>
          set('name', event.target.value)
        }
      />

      <input
        aria-label="Mobile number"
        required
        type="tel"
        inputMode="numeric"
        pattern="[6-9][0-9]{9}"
        maxLength={10}
        autoComplete="tel-national"
        placeholder="10-digit mobile number *"
        value={fields.phone}
        onChange={(event) =>
          set(
            'phone',
            event.target.value
              .replace(/\D/g, '')
              .slice(0, 10)
          )
        }
      />

      <select
        aria-label="Preferred residence"
        value={fields.unit}
        onChange={(event) =>
          set('unit', event.target.value)
        }
      >
        <option value="">
          Preferred residence
        </option>

        <option value="1656">
          3 BHK + 2T (A) · 1,656 sq.ft.
        </option>

        <option value="1674">
          3 BHK + 2T · 1,674 sq.ft.
        </option>

        <option value="1937">
          3 BHK + 3T · 1,937.52 sq.ft.
        </option>

        <option value="2289">
          3 BHK + 3T + SR · 2,289.34 sq.ft.
        </option>
      </select>

      <select
        aria-label="Enquiry purpose"
        value={fields.interest}
        onChange={(event) =>
          set('interest', event.target.value)
        }
      >
        {VALID_PURPOSES.map((purpose) => (
          <option
            key={purpose}
            value={purpose}
          >
            {purpose}
          </option>
        ))}
      </select>

      <label className="hh-consent">
        <input
          type="checkbox"
          checked={fields.consent}
          onChange={(event) =>
            set('consent', event.target.checked)
          }
          required
        />

        I consent to REAL PROP contacting me
        about this property by phone or WhatsApp.
      </label>

      {error && (
        <p
          className="hh-error"
          role="alert"
        >
          {error}
        </p>
      )}

      <button
        className="hh-btn"
        type="submit"
        disabled={sending}
      >
        {sending
          ? 'Submitting…'
          : 'Request Private Enquiry ↗'}
      </button>

      <small>
        Details are used only to respond to
        your property enquiry.
      </small>
    </form>
  );
}
