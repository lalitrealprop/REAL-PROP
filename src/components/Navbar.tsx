
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  LayoutDashboard,
  ChevronDown,
  Phone,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { trackCallClicked } from '../lib/analytics';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Navbar({ isAdmin }: { isAdmin: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLocations, setShowLocations] = useState(false);
  const [showProjects, setShowProjects] = useState(false);

  // FIX: Use actual document viewport width instead of the
  // potentially wider fixed-position layout viewport.
  const [navbarWidth, setNavbarWidth] = useState<number | null>(null);

  const location = useLocation();

  const isSVGProject =
    location.pathname === '/projects/svg-central-square';

  // Existing scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // FIX: Keep navbar aligned with the actual document viewport.
  useEffect(() => {
    const updateNavbarWidth = () => {
      setNavbarWidth(
        document.documentElement.clientWidth
      );
    };

    updateNavbarWidth();

    window.addEventListener('resize', updateNavbarWidth);

    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(updateNavbarWidth)
        : null;

    if (resizeObserver) {
      resizeObserver.observe(document.documentElement);
    }

    return () => {
      window.removeEventListener(
        'resize',
        updateNavbarWidth
      );

      resizeObserver?.disconnect();
    };
  }, []);

  // Close mobile navigation after changing pages.
  useEffect(() => {
    setIsOpen(false);
    setShowLocations(false);
    setShowProjects(false);
  }, [location.pathname]);

  const projects = [
    {
      name: 'Corbett County',
      href: '/projects/corbett-county-jim-corbett',
    },
    {
      name: 'SVG Central Square',
      href: '/projects/svg-central-square',
    },
    {
      name: 'CRC The Peridona',
      href: '/projects/crc-the-peridona',
    },
    {
      name: 'ACE ARTE',
      href: '/projects/ace-arte-sector-150-noida',
    },
    {
      name: 'Hero Homes Leafsong Retreat',
      href: '/projects/hero-homes-sector-mu-greater-noida',
    },
  ];

  const locations = [
    { name: 'Greater Noida', href: '/greater-noida' },
    { name: 'Noida', href: '/noida' },
    { name: 'Noida Extension', href: '/noida-extension' },
    { name: 'Ghaziabad', href: '/ghaziabad' },
    { name: 'Delhi', href: '/delhi' },
  ];

  const projectLinks = [
    ['Project', 'project'],
    ['Retail Spaces', 'retail-spaces'],
    ['Studio Apartments', 'studio-apartments'],
    ['Floor Plans', 'floor-plans'],
    ['Pricing', 'pricing'],
    ['Gallery', 'gallery'],
    ['Location', 'location'],
    ['Contact', 'contact'],
  ];

  const closeMenus = () => {
    setIsOpen(false);
    setShowLocations(false);
    setShowProjects(false);
  };

  const handleLinkClick = (
    href: string,
    e: React.MouseEvent
  ) => {
    closeMenus();

    if (href.startsWith('/#')) {
      const id = href.substring(2);
      const element = document.getElementById(id);

      if (element) {
        e.preventDefault();
        element.scrollIntoView({
          behavior: 'smooth',
        });
      }
    }
  };

  const handleProjectClick = () => {
    closeMenus();
  };

  const scrollProject = (id: string) => {
    closeMenus();

    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const toggleMobileMenu = () => {
    setIsOpen((previous) => !previous);
  };

  const navbarStyle: React.CSSProperties =
    navbarWidth !== null
      ? {
          width: `${navbarWidth}px`,
          left: 0,
          right: 'auto',
          maxWidth: 'none',
          boxSizing: 'border-box',
        }
      : {
          left: 0,
          right: 0,
          boxSizing: 'border-box',
        };

  return (
    <>
      {/* SVG CENTRAL SQUARE TOP INFORMATION BAR */}
      {isSVGProject && (
        <div className="hidden sm:block fixed top-0 left-0 right-0 z-[70] h-9 bg-black text-white/75 text-[10px] border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-full">
            <span className="tracking-[.14em] font-bold">
              SVG CENTRAL SQUARE | CHAI PHAI, GREATER NOIDA
            </span>

            <div className="flex items-center gap-4">
              <a
                href="tel:9999882898"
                onClick={trackCallClicked}
                className="flex items-center gap-1 hover:text-[#d7ad5a]"
              >
                <Phone size={12} />
                Call Now: 9999882898
              </a>

              <a
                href="https://wa.me/919999882898"
                target="_blank"
                rel="noreferrer"
                className="text-[#d7ad5a]"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      {/* MAIN NAVBAR */}
      <nav
        style={navbarStyle}
        className={cn(
          'fixed z-50 transition-all duration-300 flex items-center',
          isSVGProject
            ? 'top-0 sm:top-9 h-16'
            : 'top-0 h-16',
          scrolled
            ? 'bg-white shadow-md'
            : isSVGProject
              ? 'bg-[#08090c]/80 backdrop-blur-md'
              : 'bg-transparent'
        )}
      >
        <div className="container mx-auto px-4 flex justify-between items-center min-w-0">
          {/* REAL PROP LOGO */}
          <Link
            to={
              isSVGProject
                ? '/projects/svg-central-square'
                : '/'
            }
            onClick={closeMenus}
            className="flex items-center shrink-0 relative z-[80]"
            aria-label="REAL PROP"
          >
            <img
              src="https://instasize.com/api/image/87e2fdb8828fd9cdfa4566774e9ba73c587ea743872310c777de048c2b9dd4b1.jpeg"
              alt="REAL PROP Logo"
              className="h-11 w-11 sm:h-12 sm:w-12 rounded-full object-contain border-2 border-red-600 shadow-sm block opacity-100"
            />
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-7">
            {isSVGProject ? (
              <>
                <Link
                  to="/"
                  onClick={closeMenus}
                  className={cn(
                    'px-4 py-2 rounded-full border text-xs font-black whitespace-nowrap transition-colors',
                    scrolled
                      ? 'border-[#d7ad5a] text-[#9b762e] hover:bg-[#d7ad5a] hover:text-black'
                      : 'border-[#d7ad5a]/70 text-[#d7ad5a] hover:bg-[#d7ad5a] hover:text-black'
                  )}
                >
                  ← REAL PROP HOME
                </Link>

                {projectLinks.map(([name, id]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => scrollProject(id)}
                    className={cn(
                      'text-sm font-medium hover:text-[#d7ad5a] whitespace-nowrap',
                      scrolled
                        ? 'text-gray-700'
                        : 'text-white'
                    )}
                  >
                    {name}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => scrollProject('contact')}
                  className="px-4 py-2 rounded-full bg-[#d7ad5a] text-black text-xs font-black whitespace-nowrap hover:bg-[#e3c477]"
                >
                  GET PRICE LIST
                </button>

                {isAdmin && (
                  <Link
                    to="/admin"
                    className="flex items-center gap-1 text-sm font-medium text-red-600"
                  >
                    <LayoutDashboard size={16} />
                    Admin
                  </Link>
                )}
              </>
            ) : (
              <>
                <a
                  href="/"
                  className={cn(
                    'text-sm font-medium hover:text-red-600',
                    scrolled
                      ? 'text-gray-700'
                      : 'text-white'
                  )}
                >
                  Home
                </a>

                {/* DESKTOP PROJECTS DROPDOWN */}
                <div className="relative group">
                  <button
                    type="button"
                    className={cn(
                      'flex items-center gap-1 text-sm font-medium hover:text-red-600',
                      scrolled
                        ? 'text-gray-700'
                        : 'text-white'
                    )}
                  >
                    Projects
                    <ChevronDown size={14} />
                  </button>

                  <div className="absolute top-full left-0 w-56 bg-white shadow-xl rounded-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all border border-gray-100">
                    {projects.map((project) => (
                      <Link
                        key={project.name}
                        to={project.href}
                        onClick={handleProjectClick}
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600"
                      >
                        {project.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <a
                  href="/#about"
                  className={cn(
                    'text-sm font-medium hover:text-red-600',
                    scrolled
                      ? 'text-gray-700'
                      : 'text-white'
                  )}
                >
                  About
                </a>

                <a
                  href="/#contact"
                  className={cn(
                    'text-sm font-medium hover:text-red-600',
                    scrolled
                      ? 'text-gray-700'
                      : 'text-white'
                  )}
                >
                  Contact
                </a>

                {/* DESKTOP LOCATIONS DROPDOWN */}
                <div className="relative group">
                  <button
                    type="button"
                    className={cn(
                      'flex items-center gap-1 text-sm font-medium hover:text-red-600',
                      scrolled
                        ? 'text-gray-700'
                        : 'text-white'
                    )}
                  >
                    Locations
                    <ChevronDown size={14} />
                  </button>

                  <div className="absolute top-full left-0 w-48 bg-white shadow-xl rounded-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all border border-gray-100">
                    {locations.map((loc) => (
                      <Link
                        key={loc.name}
                        to={loc.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600"
                      >
                        {loc.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {isAdmin && (
                  <Link
                    to="/admin"
                    className="flex items-center gap-1 text-sm font-medium text-red-600"
                  >
                    <LayoutDashboard size={16} />
                    <span>Admin</span>
                  </Link>
                )}
              </>
            )}
          </div>

          {/* MOBILE NAVIGATION CONTROLS */}
          {isSVGProject ? (
            <div className="md:hidden flex items-center gap-2 shrink-0">
              <a
                href="tel:9999882898"
                onClick={trackCallClicked}
                className="p-2 text-[#d7ad5a]"
                aria-label="Call now"
              >
                <Phone size={21} />
              </a>

              <button
                className={cn(
                  'p-2 shrink-0',
                  scrolled ? 'text-gray-900' : 'text-white'
                )}
                onClick={toggleMobileMenu}
                type="button"
                aria-label={
                  isOpen ? 'Close menu' : 'Open menu'
                }
                aria-expanded={isOpen}
                aria-controls="realprop-mobile-menu"
              >
                {isOpen ? (
                  <X size={24} />
                ) : (
                  <Menu size={24} />
                )}
              </button>
            </div>
          ) : (
            <button
              className={cn(
                'md:hidden p-2 shrink-0',
                scrolled
                  ? 'text-gray-900'
                  : 'text-white'
              )}
              onClick={toggleMobileMenu}
              type="button"
              aria-label={
                isOpen ? 'Close menu' : 'Open menu'
              }
              aria-expanded={isOpen}
              aria-controls="realprop-mobile-menu"
            >
              {isOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          )}
        </div>

        {/* MOBILE DROPDOWN MENU */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="realprop-mobile-menu"
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="absolute left-0 right-0 top-16 bg-white shadow-xl md:hidden py-4 px-4 flex flex-col space-y-3 overflow-y-auto max-h-[80vh]"
            >
              {isSVGProject ? (
                <>
                  <Link
                    to="/"
                    onClick={closeMenus}
                    className="text-left text-lg font-black text-[#9b762e]"
                  >
                    ← REAL PROP HOME
                  </Link>

                  {projectLinks.map(([name, id]) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => scrollProject(id)}
                      className="text-left text-lg font-medium text-gray-700"
                    >
                      {name}
                    </button>
                  ))}

                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={closeMenus}
                      className="text-lg font-medium text-red-600"
                    >
                      Admin
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <a
                    href="/"
                    onClick={(e) =>
                      handleLinkClick('/', e)
                    }
                    className="text-lg font-medium text-gray-700"
                  >
                    Home
                  </a>

                  {/* MOBILE PROJECTS DROPDOWN */}
                  <div>
                    <button
                      onClick={() =>
                        setShowProjects(!showProjects)
                      }
                      className="flex items-center justify-between w-full text-lg font-medium text-gray-700"
                      type="button"
                      aria-expanded={showProjects}
                    >
                      <span>Projects</span>

                      <ChevronDown
                        className={cn(
                          'transition-transform',
                          showProjects && 'rotate-180'
                        )}
                        size={20}
                      />
                    </button>

                    {showProjects && (
                      <div className="pl-4 pt-2 flex flex-col space-y-2">
                        {projects.map((project) => (
                          <Link
                            key={project.name}
                            to={project.href}
                            onClick={handleProjectClick}
                            className="text-base text-gray-600"
                          >
                            {project.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  <a
                    href="/#about"
                    onClick={(e) =>
                      handleLinkClick('/#about', e)
                    }
                    className="text-lg font-medium text-gray-700"
                  >
                    About
                  </a>

                  <a
                    href="/#contact"
                    onClick={(e) =>
                      handleLinkClick('/#contact', e)
                    }
                    className="text-lg font-medium text-gray-700"
                  >
                    Contact
                  </a>

                  {/* MOBILE LOCATIONS DROPDOWN */}
                  <div>
                    <button
                      onClick={() =>
                        setShowLocations(!showLocations)
                      }
                      className="flex items-center justify-between w-full text-lg font-medium text-gray-700"
                      type="button"
                      aria-expanded={showLocations}
                    >
                      <span>Locations</span>

                      <ChevronDown
                        className={cn(
                          'transition-transform',
                          showLocations && 'rotate-180'
                        )}
                        size={20}
                      />
                    </button>

                    {showLocations && (
                      <div className="pl-4 pt-2 flex flex-col space-y-2">
                        {locations.map((loc) => (
                          <Link
                            key={loc.name}
                            to={loc.href}
                            onClick={closeMenus}
                            className="text-base text-gray-600"
                          >
                            {loc.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={closeMenus}
                      className="text-lg font-medium text-red-600"
                    >
                      Admin
                    </Link>
                  )}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
