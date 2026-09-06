import { motion } from 'motion/react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Building, Home as HomeIcon, Phone, MessageCircle, ChevronRight, Star, TrendingUp, Briefcase } from 'lucide-react';
import LeadForm from '../components/LeadForm';
import ProjectsSection from '../components/ProjectsSection';

const locationData: Record<string, {
  title: string;
  description: string;
  keywords: string[];
  highlights: string[];
}> = {
  'greater-noida': {
    title: 'Real Estate in Greater Noida',
    description: 'Find premium commercial and residential properties in Greater Noida. REAL PROP is your trusted property investment consultant for the best investment deals in Greater Noida.',
    keywords: ['Commercial property in Greater Noida', 'Residential property in Greater Noida', 'REAL PROP Greater Noida'],
    highlights: ['Upcoming Jewar Airport connectivity', 'Planned infrastructure', 'High ROI potential']
  },
  'noida': {
    title: 'Real Estate in Noida',
    description: 'Explore the best commercial property investment in Noida. As a leading property investment consultant in Noida, we offer exclusive deals on office spaces and luxury flats.',
    keywords: ['Commercial property in Noida', 'Office space for sale in Noida', 'Property investment consultant Noida'],
    highlights: ['Established IT hubs', 'Excellent metro connectivity', 'Premium lifestyle']
  },
  'noida-extension': {
    title: 'Real Estate in Noida Extension (Greater Noida West)',
    description: 'Noida Extension is the hub for affordable luxury. Get the best residential property deals and commercial property for sale in Noida Extension with REAL PROP.',
    keywords: ['Residential property in Noida Extension', 'Commercial property in Noida Extension', 'REAL PROP Noida Extension'],
    highlights: ['Affordable luxury', 'Rapidly developing', 'Great for first-time buyers']
  },
  'ghaziabad': {
    title: 'Real Estate in Ghaziabad',
    description: 'Invest in the heart of NCR. Ghaziabad offers excellent commercial property for sale and residential options. Consult REAL PROP for the best property investment in Ghaziabad.',
    keywords: ['Commercial property in Ghaziabad', 'Residential property in Ghaziabad', 'Property investment consultant Ghaziabad'],
    highlights: ['Excellent road connectivity', 'Established residential areas', 'Growing commercial sector']
  },
  'delhi': {
    title: 'Real Estate in Delhi',
    description: 'Premium commercial property in Delhi NCR. From high-end office spaces to luxury residences, REAL PROP provides expert real estate consultancy in Delhi.',
    keywords: ['Commercial property in Delhi', 'Luxury property in Delhi', 'Property investment consultant Delhi'],
    highlights: ['Capital city advantage', 'Premium business addresses', 'Unmatched connectivity']
  }
};

export default function LocationPage() {
  const { locationId } = useParams<{ locationId: string }>();
  const data = locationId ? locationData[locationId] : null;

  const handleWhatsApp = () => {
    window.open(`https://wa.me/919999882898`, '_blank');
  };

  const handleCall = () => {
    window.location.href = 'tel:9999882898';
  };

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Location Not Found</h2>
          <Link to="/" className="text-red-600 hover:underline">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
            alt="Cityscape" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="flex items-center space-x-2 text-red-500 mb-4">
              <MapPin size={20} />
              <span className="font-bold uppercase tracking-widest text-sm">{locationId?.replace('-', ' ')}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {data.title}
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {data.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={handleCall} className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center space-x-2">
                <Phone size={20} />
                <span>Call Expert</span>
              </button>
              <button onClick={handleWhatsApp} className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center space-x-2">
                <MessageCircle size={20} />
                <span>WhatsApp Now</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-6">
                  {index === 0 ? <TrendingUp size={32} /> : index === 1 ? <Building size={32} /> : <Star size={32} />}
                </div>
                <h3 className="text-xl font-bold mb-2">{highlight}</h3>
                <p className="text-gray-500">Expertly curated opportunities in {data.title}.</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <div className="py-20">
        <ProjectsSection title={`Featured Projects in ${locationId?.replace('-', ' ')}`} />
      </div>

      {/* Lead Form */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Interested in {locationId?.replace('-', ' ')}?</h2>
            <p className="text-gray-400 text-lg">Fill out the form below and our property investment consultant will get back to you with the best deals.</p>
          </div>
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
            <LeadForm />
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="prose prose-lg max-w-none text-gray-600">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Choose REAL PROP for {data.title}?</h2>
            <p>
              As a premier <strong>property investment consultant in Delhi NCR</strong>, REAL PROP specializes in identifying high-growth opportunities. 
              Whether you are looking for <strong>commercial property in {locationId?.replace('-', ' ')}</strong> or a luxury residence, 
              our team of experts provides end-to-end support.
            </p>
            <p>
              We focus on <strong>commercial property investment in Delhi NCR</strong> that offers high rental yields and long-term capital appreciation. 
              Our deep local knowledge in {data.title} ensures that you get the best market prices and transparent dealings.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="bg-red-50 p-8 rounded-3xl">
                <h4 className="text-xl font-bold text-red-600 mb-4 flex items-center">
                  <Briefcase className="mr-2" /> Commercial Focus
                </h4>
                <p>Best <strong>office space for sale</strong> and retail shops with high footfall in {locationId?.replace('-', ' ')}.</p>
              </div>
              <div className="bg-gray-50 p-8 rounded-3xl">
                <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <HomeIcon className="mr-2" /> Residential Expertise
                </h4>
                <p>Luxury apartments, independent floors, and villas in the most sought-after sectors of {locationId?.replace('-', ' ')}.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
