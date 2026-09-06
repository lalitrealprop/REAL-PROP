import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ChevronRight, Loader2 } from 'lucide-react';
import { useRef } from 'react';
import { trackEnquiryFormStarted, trackLeadSubmitted } from '../lib/analytics';

interface LeadFormData {
  name: string;
  phone: string;
  propertyType: string;
  budget: string;
  location: string;
}

export default function LeadForm({ noContainer = false }: { noContainer?: boolean }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const startedTracked = useRef(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<LeadFormData>();

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'leads'), {
        ...data,
        createdAt: serverTimestamp(),
      });
      setIsSubmitted(true);
      trackLeadSubmitted();
      reset();
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'leads');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formContent = (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
      {/* Left Side: Info */}
      <div className="md:w-1/3 bg-red-600 p-8 text-white flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-6">Invest in the Best Commercial Projects</h2>
        <p className="text-red-100 mb-8">Get exclusive access to pre-leased shops and premium office spaces.</p>
        
        <ul className="space-y-4">
          {['Instant Price List', 'Flexible Payment Plans', 'High ROI Projects'].map((item) => (
            <li key={item} className="flex items-center space-x-3">
              <CheckCircle2 className="text-white shrink-0" size={20} />
              <span className="font-medium">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Side: Form */}
      <div className="md:w-2/3 p-8">
        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="h-full flex flex-col items-center justify-center text-center py-12"
            >
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
              <p className="text-gray-600">Our consultant will contact you shortly with the best deals.</p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit(onSubmit)}
              onFocus={() => { if (!startedTracked.current) { startedTracked.current = true; trackEnquiryFormStarted(); } }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">Full Name *</label>
                <input
                  {...register('name', { required: 'Name is required' })}
                  placeholder="Lalit Kumar"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                />
                {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">Phone Number *</label>
                <input
                  {...register('phone', { required: 'Phone is required' })}
                  placeholder="9999882898"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                />
                {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">Property Type</label>
                <select
                  {...register('propertyType')}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all appearance-none bg-white"
                >
                  <option value="">Select Type</option>
                  <option value="Shop">Shop</option>
                  <option value="Office">Office</option>
                  <option value="Flat">Flat</option>
                  <option value="Investment">Investment</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">Budget Range</label>
                <input
                  {...register('budget')}
                  placeholder="e.g. 50L - 1Cr"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-sm font-semibold text-gray-700">Preferred Location</label>
                <input
                  {...register('location')}
                  placeholder="e.g. Noida Sector 62"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div className="sm:col-span-2 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-lg shadow-lg shadow-red-600/20 flex items-center justify-center space-x-2 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <>
                      <span>Get Details Instantly</span>
                      <ChevronRight size={20} />
                    </>
                  )}
                </motion.button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  if (noContainer) return formContent;

  return (
    <div className="container mx-auto px-4">
      {formContent}
    </div>
  );
}
