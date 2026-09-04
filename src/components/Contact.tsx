import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MessageCircle, MapPin, Mail, Loader2, CheckCircle2, Youtube, Facebook, Instagram } from 'lucide-react';

interface ContactFormData {
  name: string;
  phone: string;
  message: string;
}

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'leads'), {
        ...data,
        propertyInterest: 'General Inquiry',
        createdAt: serverTimestamp(),
      });
      setIsSubmitted(true);
      reset();
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'leads');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/919999882898`, '_blank');
  };

  const socialLinks = [
    { icon: Youtube, href: 'https://www.youtube.com/@RealProp6603', color: 'hover:bg-red-600', label: 'YouTube' },
    { icon: Facebook, href: 'https://www.facebook.com/share/1AoMWkiiLz/', color: 'hover:bg-blue-600', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/real_prop123', color: 'hover:bg-pink-600', label: 'Instagram' },
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col lg:flex-row gap-16">
        {/* Left Side: Info */}
        <div className="lg:w-1/3">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Get in Touch</h2>
          <p className="text-gray-600 text-lg mb-12">
            Ready to find your perfect property? Contact us today for expert guidance and the best deals in NCR.
          </p>

          <div className="space-y-8">
            <div className="flex items-center space-x-6">
              <div className="w-14 h-14 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center shrink-0">
                <Phone size={28} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Call Us</p>
                <p className="text-xl font-bold text-gray-900">+91 99998 82898</p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center shrink-0">
                <MessageCircle size={28} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">WhatsApp</p>
                <p className="text-xl font-bold text-gray-900">+91 99998 82898</p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                <MapPin size={28} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Location</p>
                <p className="text-xl font-bold text-gray-900">FF 12-A, 1st Floor, Suntwilight Market, Delta 1, Greater Noida, U.P. 201310</p>
              </div>
            </div>
          </div>

          <div className="mt-12 space-y-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleWhatsApp}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-600/20 flex items-center justify-center space-x-2"
            >
              <MessageCircle size={24} />
              <span>Chat on WhatsApp</span>
            </motion.button>

            <div className="flex items-center justify-center space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-12 h-12 bg-gray-100 text-gray-600 rounded-xl flex items-center justify-center transition-all ${social.color} hover:text-white shadow-sm`}
                  title={social.label}
                >
                  <social.icon size={24} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:w-2/3">
          <div className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-100">
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
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600 text-lg">Thank you for reaching out. We will get back to you shortly.</p>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Full Name *</label>
                      <input
                        {...register('name', { required: 'Name is required' })}
                        placeholder="Lalit Kumar"
                        className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-gray-50"
                      />
                      {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Phone Number *</label>
                      <input
                        {...register('phone', { required: 'Phone is required' })}
                        placeholder="9999882898"
                        className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-gray-50"
                      />
                      {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Message</label>
                    <textarea
                      {...register('message')}
                      placeholder="How can we help you find your dream property?"
                      rows={5}
                      className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-gray-50 resize-none"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-5 rounded-xl shadow-xl shadow-red-600/30 flex items-center justify-center space-x-3 text-lg disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <Loader2 className="animate-spin" size={24} />
                    ) : (
                      <>
                        <span>Get Best Deal Now</span>
                        <CheckCircle2 size={24} />
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
