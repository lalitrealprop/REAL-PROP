import { Youtube, Play, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

const VIDEOS = [
  { id: '1', title: 'Luxury Penthouse in Noida', thumbnail: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop' },
  { id: '2', title: 'Commercial Shop Investment', thumbnail: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop' },
  { id: '3', title: 'Modern Office Space Tour', thumbnail: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop' },
];

export default function YouTubeSection() {
  const handleChannelClick = () => {
    window.open('https://www.youtube.com/@RealProp6603', '_blank');
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between mb-12">
        <div className="text-left mb-6 md:mb-0">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
            <Youtube className="text-red-600" size={40} />
            Explore Properties on Video
          </h2>
          <p className="text-gray-600 max-w-xl">
            Get a virtual tour of our premium listings. Subscribe to our channel for the latest property updates and investment tips.
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleChannelClick}
          className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-red-600/30"
        >
          <span>Visit YouTube Channel</span>
          <ChevronRight size={20} />
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {VIDEOS.map((video) => (
          <motion.div
            key={video.id}
            whileHover={{ y: -10 }}
            className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-lg"
            onClick={handleChannelClick}
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center">
              <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                <Play fill="white" size={24} className="ml-1" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="text-white font-bold text-lg">{video.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
