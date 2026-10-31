
import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import {
  trackEnquiryFormStarted,
  trackLeadSubmitted,
} from '../lib/analytics';

type PropertyType = 'Plot' | 'Studio Apartment' | 'Retail Shop';

type Props = {
  selectedProperty?: PropertyType;
  selectedPurpose?: string;
};

const purposes = [
  'Get latest price list',
  'Request brochure',
  'Schedule site visit',
  'Request callback',
];

export default function CorbettCountyLeadForm({
  selectedProperty,
  selectedPurpose,
}: Props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [propertyType, setPropertyType] =
    useState<PropertyType | ''>('');
  const [purpose, setPurpose] = useState(purposes[0]);
  const [consent, setConsent] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const started = useRef(false);

  const currentProperty = selectedProperty || propertyType;
  const currentPurpose = purposes.includes(selectedPurpose || '')
    ? selectedPurpose!
    : purpose;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;

    const cleanName = name.trim();
    const cleanPhone = phone.trim();

    if (
      !cleanName ||
      !/^[6-9]\d{9}$/.test(cleanPhone) ||
      !currentProperty ||
      !consent
    ) {
      setError('Please complete all required fields.');
      return;
    }

    setSending(true);
    setError('');

    try {
      await addDoc(collection(db, 'leads'), {
        name: cleanName,
        phone: cleanPhone,
        propertyType: currentProperty,
        budget: '',
        location: 'Bail Parao, Ramnagar, Uttarakhand',
        project: 'Corbett County',
        projectId: 'corbett-county-jim-corbett',
        configuration: currentProperty,
        enquiryPurpose: currentPurpose,
        source: 'realprop.online Corbett County landing page',
        consentToContact: true,
        createdAt: serverTimestamp(),
      });

      try {
        trackLeadSubmitted();
      } catch {
        // Analytics should not interrupt successful submission.
      }

      setSubmitted(true);
      setName('');
      setPhone('');
      setPropertyType('');
      setPurpose(purposes[0]);
      setConsent(false);
    } catch (err) {
      console.error('Corbett County enquiry failed:', err);
      setError('Unable to submit your enquiry. Please try again.');
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center text-gray-900">
        <h3 className="text-2xl font-bold text-emerald-900">
          Thank you for your enquiry!
        </h3>
        <p className="mt-3 text-gray-600">
          Our REAL PROP consultant will contact you shortly.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            started.current = false;
          }}
          className="mt-6 rounded-lg bg-emerald-900 px-6 py-3 font-semibold text-white"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
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
      className="space-y-4 rounded-2xl bg-white p-6 text-gray-900 shadow-xl md:p-8"
    >
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-amber-700">
          Private Property Enquiry
        </p>
        <h3 className="mt-2 text-2xl font-bold text-emerald-950">
          Explore Corbett County
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          Get pricing, availability and project details.
        </p>
      </div>

      <input
        required
        aria-label="Full name"
        maxLength={80}
        autoComplete="name"
        placeholder="Your full name *"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-4 py-3"
      />

      <input
        required
        type="tel"
        inputMode="numeric"
        pattern="[6-9][0-9]{9}"
        maxLength={10}
        autoComplete="tel-national"
        aria-label="Mobile number"
        placeholder="10-digit mobile number *"
        value={phone}
        onChange={(e) =>
          setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))
        }
        className="w-full rounded-lg border border-gray-300 px-4 py-3"
      />

      <select
        required
        aria-label="Property type"
        value={currentProperty}
        onChange={(e) =>
          setPropertyType(e.target.value as PropertyType)
        }
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3"
      >
        <option value="">Select property type *</option>
        <option value="Plot">Residential Plot</option>
        <option value="Studio Apartment">Studio Apartment</option>
        <option value="Retail Shop">Retail Shop</option>
      </select>

      <select
        aria-label="Enquiry purpose"
        value={currentPurpose}
        onChange={(e) => setPurpose(e.target.value)}
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3"
      >
        {purposes.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <label className="flex items-start gap-3 text-sm text-gray-600">
        <input
          required
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1"
        />
        <span>
          I consent to REAL PROP contacting me about Corbett County
          by phone or WhatsApp.
        </span>
      </label>

      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="w-full rounded-lg bg-emerald-900 px-6 py-4 font-bold text-white transition hover:bg-emerald-800 disabled:opacity-60"
      >
        {sending ? 'Submitting...' : 'Request Project Details'}
      </button>

      <p className="text-center text-xs text-gray-500">
        Your information will be used to respond to your enquiry.
      </p>
    </form>
  );
}
