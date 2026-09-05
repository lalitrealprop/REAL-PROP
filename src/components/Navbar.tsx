import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LayoutDashboard, ChevronDown, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { trackCallClicked } from '../lib/analytics';

function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

export default function Navbar({ isAdmin }: { isAdmin: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLocations, setShowLocations] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const location = useLocation();
  const isSVGProject = location.pathname === '/projects/svg-central-square';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#about' },
    { name: 'Contact', href: '/#contact' },
  ];
  const projects = [
    { name: 'SVG Central Square', href: '/projects/svg-central-square' },
    { name: 'CRC The Peridona', href: '/projects/crc-the-peridona' },
  ];
  const locations = [
    { name: 'Greater Noida', href: '/greater-noida' }, { name: 'Noida', href: '/noida' },
    { name: 'Noida Extension', href: '/noida-extension' }, { name: 'Ghaziabad', href: '/ghaziabad' }, { name: 'Delhi', href: '/delhi' },
  ];
  const projectLinks = [
    ['Project', 'project'], ['Retail Spaces', 'retail-spaces'], ['Studio Apartments', 'studio-apartments'],
    ['Floor Plans', 'floor-plans'], ['Pricing', 'pricing'], ['Gallery', 'gallery'], ['Location', 'location'], ['Contact', 'contact'],
  ];

  const handleLinkClick = (href: string, e: React.MouseEvent) => {
    setIsOpen(false); setShowLocations(false); setShowProjects(false);
    if (href.startsWith('/#')) {
      const id = href.substring(2); const element = document.getElementById(id);
      if (element) { e.preventDefault(); element.scrollIntoView({ behavior: 'smooth' }); }
    }
  };
  const handleProjectClick = () => { setIsOpen(false); setShowProjects(false); setShowLocations(false); };
  const scrollProject = (id: string) => { setIsOpen(false); setShowProjects(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };

  return <>
    {isSVGProject && <div className="hidden sm:block fixed top-0 left-0 right-0 z-[70] h-9 bg-black text-white/75 text-[10px] border-b border-white/10"><div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-full"><span className="tracking-[.14em] font-bold">SVG CENTRAL SQUARE | CHAI PHAI, GREATER NOIDA</span><div className="flex items-center gap-4"><a href="tel:9999882898" onClick={trackCallClicked} className="flex items-center gap-1 hover:text-[#d7ad5a]"><Phone size={12}/> Call Now: 9999882898</a><a href="https://wa.me/919999882898" target="_blank" rel="noreferrer" className="text-[#d7ad5a]">WhatsApp</a></div></div></div>}
    <nav className={cn('fixed left-0 right-0 z-50 transition-all duration-300 flex items-center', isSVGProject ? 'top-9 h-16' : 'top-0 h-16', scrolled ? 'bg-white shadow-md' : isSVGProject ? 'bg-[#08090c]/80 backdrop-blur-md' : 'bg-transparent')}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to={isSVGProject ? '/projects/svg-central-square' : '/'} className="flex items-center"><img src="https://instasize.com/api/image/87e2fdb8828fd9cdfa4566774e9ba73c587ea743872310c777de048c2b9dd4b1.jpeg" alt="REAL PROP Logo" className="h-11 w-11 rounded-full object-cover border-2 border-red-600 shadow-sm" referrerPolicy="no-referrer" /></Link>
        <div className="hidden md:flex items-center space-x-6 lg:space-x-7">
          {isSVGProject ? <>
            <button onClick={()=>scrollProject('home')} className={cn('text-sm font-bold hover:text-[#d7ad5a]', scrolled?'text-gray-700':'text-white')}>Home</button>
            {projectLinks.map(([name,id])=><button key={id} onClick={()=>scrollProject(id)} className={cn('text-sm font-medium hover:text-[#d7ad5a] whitespace-nowrap', scrolled?'text-gray-700':'text-white')}>{name}</button>)}
            <button onClick={()=>scrollProject('contact')} className="px-4 py-2 rounded-full bg-[#d7ad5a] text-black text-xs font-black whitespace-nowrap hover:bg-[#e3c477]">GET PRICE LIST</button>
            {isAdmin && <Link to="/admin" className="flex items-center gap-1 text-sm font-medium text-red-600"><LayoutDashboard size={16}/> Admin</Link>}
          </> : <>
            <a href="/" className={cn('text-sm font-medium hover:text-red-600', scrolled?'text-gray-700':'text-white')}>Home</a>
            <div className="relative group"><button type="button" className={cn('flex items-center gap-1 text-sm font-medium hover:text-red-600',scrolled?'text-gray-700':'text-white')}>Projects <ChevronDown size={14}/></button><div className="absolute top-full left-0 w-56 bg-white shadow-xl rounded-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all border border-gray-100">{projects.map((p)=><Link key={p.name} to={p.href} onClick={handleProjectClick} className="block px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600">{p.name}</Link>)}</div></div>
            <a href="/#about" className={cn('text-sm font-medium hover:text-red-600',scrolled?'text-gray-700':'text-white')}>About</a><a href="/#contact" className={cn('text-sm font-medium hover:text-red-600',scrolled?'text-gray-700':'text-white')}>Contact</a>
            <div className="relative group"><button type="button" className={cn('flex items-center gap-1 text-sm font-medium hover:text-red-600',scrolled?'text-gray-700':'text-white')}>Locations <ChevronDown size={14}/></button><div className="absolute top-full left-0 w-48 bg-white shadow-xl rounded-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all border border-gray-100">{locations.map((loc)=><Link key={loc.name} to={loc.href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600">{loc.name}</Link>)}</div></div>
            {isAdmin && <Link to="/admin" className="flex items-center gap-1 text-sm font-medium text-red-600"><LayoutDashboard size={16}/><span>Admin</span></Link>}
          </>}
        </div>
        {isSVGProject ? <div className="md:hidden flex items-center gap-2"><a href="tel:9999882898" onClick={trackCallClicked} className="p-2 text-[#d7ad5a]" aria-label="Call now"><Phone size={21}/></a><button className="p-2 text-white" onClick={()=>setIsOpen(!isOpen)} type="button" aria-label={isOpen?'Close menu':'Open menu'}>{isOpen?<X size={24}/>:<Menu size={24}/>}</button></div> : <button className="md:hidden p-2 text-gray-700" onClick={()=>setIsOpen(!isOpen)} type="button" aria-label={isOpen?'Close menu':'Open menu'}>{isOpen?<X size={24}/>:<Menu size={24}/>}</button>}
      </div>
      <AnimatePresence>{isOpen && <motion.div initial={{opacity:0,y:-15}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-15}} className={cn('absolute left-0 right-0 bg-white shadow-xl md:hidden py-4 px-4 flex flex-col space-y-3 overflow-y-auto max-h-[80vh]', isSVGProject ? 'top-16' : 'top-16')}>
        {isSVGProject ? <>
          <button onClick={()=>scrollProject('home')} className="text-left text-lg font-bold text-gray-700">Home</button>
          {projectLinks.map(([name,id])=><button key={id} onClick={()=>scrollProject(id)} className="text-left text-lg font-medium text-gray-700">{name}</button>)}
          {isAdmin && <Link to="/admin" onClick={()=>setIsOpen(false)} className="text-lg font-medium text-red-600">Admin</Link>}
        </> : <>
          <a href="/" onClick={(e)=>handleLinkClick('/',e)} className="text-lg font-medium text-gray-700">Home</a>
          <div><button onClick={()=>setShowProjects(!showProjects)} className="flex items-center justify-between w-full text-lg font-medium text-gray-700" type="button"><span>Projects</span><ChevronDown className={cn(showProjects&&'rotate-180')} size={20}/></button>{showProjects&&<div className="pl-4 pt-2 flex flex-col space-y-2">{projects.map((p)=><Link key={p.name} to={p.href} onClick={handleProjectClick} className="text-base text-gray-600">{p.name}</Link>)}</div>}</div>
          <a href="/#about" onClick={(e)=>handleLinkClick('/#about',e)} className="text-lg font-medium text-gray-700">About</a><a href="/#contact" onClick={(e)=>handleLinkClick('/#contact',e)} className="text-lg font-medium text-gray-700">Contact</a>
          <div><button onClick={()=>setShowLocations(!showLocations)} className="flex items-center justify-between w-full text-lg font-medium text-gray-700" type="button"><span>Locations</span><ChevronDown className={cn(showLocations&&'rotate-180')} size={20}/></button>{showLocations&&<div className="pl-4 pt-2 flex flex-col space-y-2">{locations.map((loc)=><Link key={loc.name} to={loc.href} onClick={()=>setIsOpen(false)} className="text-base text-gray-600">{loc.name}</Link>)}</div>}</div>
        </>}
      </motion.div>}</AnimatePresence>
    </nav>
  </>;
}
