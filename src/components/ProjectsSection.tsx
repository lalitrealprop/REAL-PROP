import { useState, useEffect } from 'react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { Project } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Building, Home, TrendingUp, LandPlot, ChevronRight, Loader2 } from 'lucide-react';
import { getDirectImageUrl } from '../lib/imageUtils';
import { Link } from 'react-router-dom';

const CATEGORIES = [
  { id: 'All', icon: Building },
  { id: 'Residential', icon: Home },
  { id: 'Commercial', icon: Building },
  { id: 'Investment', icon: TrendingUp },
  { id: 'Plots', icon: LandPlot },
];

export default function ProjectsSection({ title }: { title?: string }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
      setProjects(data);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'projects');
    });
    return () => unsubscribe();
  }, []);

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center space-x-2 bg-red-50 border border-red-100 px-4 py-2 rounded-full text-red-600 font-black text-xs uppercase tracking-[0.2em] mb-6"
        >
          <TrendingUp size={14} />
          <span>High Demand Locations</span>
        </motion.div>
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">{title || 'Our Projects'}</h2>
        <p className="text-gray-600 max-w-2xl mx-auto font-medium">Explore our wide range of premium properties in Noida, Greater Noida, and Delhi NCR.</p>
      </div>

      {/* Category Filter */}
      <div className="flex overflow-x-auto md:flex-wrap md:justify-center gap-3 md:gap-4 mb-12 pb-4 md:pb-0 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center space-x-2 px-5 md:px-6 py-2.5 md:py-3 rounded-full font-medium transition-all whitespace-nowrap ${
              activeCategory === cat.id 
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/30' 
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <cat.icon size={16} className="md:w-[18px] md:h-[18px]" />
            <span className="text-sm md:text-base">{cat.id}</span>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-red-600" size={40} />
        </div>
      ) : (
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-100 group will-change-transform"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={getDirectImageUrl(project.image)}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {project.type}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-red-600 text-sm font-semibold mb-2">
                    <MapPin size={14} className="mr-1" />
                    <span>{project.location}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                    {project.description}
                  </p>
                  {project.title.toLowerCase().includes('svg central square') ? (
                    <Link
                      to="/projects/svg-central-square"
                      className="w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-black transition-all shadow-lg shadow-red-600/20 hover:shadow-red-600/40"
                    >
                      <span>VIEW PROJECT</span>
                      <ChevronRight size={20} />
                    </Link>
                  ) : (
                    <button 
                      onClick={() => {
                        const heroForm = document.getElementById('lead-form-hero');
                        if (heroForm) heroForm.scrollIntoView({ behavior: 'smooth' });
                        else document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-black transition-all shadow-lg shadow-red-600/20 hover:shadow-red-600/40"
                    >
                      <span>GET DETAILS</span>
                      <ChevronRight size={20} />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Empty State */}
      {!loading && filteredProjects.length === 0 && (
        <div className="text-center py-20">
          <Building className="mx-auto text-gray-300 mb-4" size={64} />
          <h3 className="text-xl font-semibold text-gray-500">No projects found in this category.</h3>
        </div>
      )}
    </div>
  );
}
