
import { useEffect } from 'react';
import ProjectsSection from '../components/ProjectsSection';

export default function ProjectsListing() {
  useEffect(() => {
    const previousTitle = document.title;
    const title = 'Explore Properties in Noida & Greater Noida | REAL PROP';
    const description =
      'Explore residential and commercial real estate projects in Noida and Greater Noida, including Hero Homes, ACE ARTE, CRC The Peridona and SVG Central Square.';

    document.title = title;

    let meta = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]'
    );

    const existingMeta = meta;
    const previousDescription = meta?.getAttribute('content');

    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }

    meta.setAttribute('content', description);

    return () => {
      document.title = previousTitle;

      if (!existingMeta) {
        meta?.remove();
      } else if (previousDescription !== null && previousDescription !== undefined) {
        existingMeta.setAttribute('content', previousDescription);
      } else {
        existingMeta.removeAttribute('content');
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-white border-b border-gray-100 py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-600 text-xs font-black uppercase tracking-widest mb-4">
            REAL PROP PROPERTY PORTFOLIO
          </p>

          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-5">
            Explore Our Projects
          </h1>

          <p className="text-gray-600 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
            Discover residential and commercial real estate opportunities
            across Noida, Greater Noida and Delhi NCR. Explore project
            details and connect with REAL PROP for personalized assistance.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <ProjectsSection title="Featured & Available Projects" />
      </section>
    </div>
  );
}
