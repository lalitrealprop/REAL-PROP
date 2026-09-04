import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { User } from 'firebase/auth';
import { db, auth, signInWithGoogle, logout, handleFirestoreError, OperationType } from '../firebase';
import { collection, query, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, getCountFromServer } from 'firebase/firestore';
import { Project, Lead } from '../types';
import { useForm, useWatch } from 'react-hook-form';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutDashboard, Plus, Trash2, Edit, LogOut, ChevronRight, Loader2, Building, Users, CheckCircle2, X, Image as ImageIcon, MapPin, Tag, FileText, Database, Copy, Check, Lock, LogIn } from 'lucide-react';
import { getDirectImageUrl } from '../lib/imageUtils';

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

const SEED_PROJECTS: Partial<Project>[] = [
  {
    title: "Premium Office Space Noida 62",
    location: "Sector 62, Noida",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
    category: "Commercial",
    type: "Office Space",
    description: "Modern glass-facade office building with 100% power backup and high-speed elevators. Prime location near Metro station."
  },
  {
    title: "Luxury Retail Shops Greater Noida",
    location: "Delta 1, Greater Noida",
    image: "https://images.unsplash.com/photo-1555633514-abcee6ad93e1?q=80&w=2080&auto=format&fit=crop",
    category: "Commercial",
    type: "Retail Shop",
    description: "High-footfall retail complex with premium brands. Excellent visibility and ample parking space."
  },
  {
    title: "Pre-Leased Bank Asset Delhi",
    location: "Connaught Place, Delhi",
    image: "https://images.unsplash.com/photo-1582408921715-18e7806365c1?q=80&w=2070&auto=format&fit=crop",
    category: "Investment",
    type: "Pre-Leased",
    description: "Secure investment with a nationalized bank as tenant. Guaranteed monthly rental income with long-term lease."
  },
  {
    title: "Modern 3BHK Apartment Noida",
    location: "Sector 150, Noida",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1935&auto=format&fit=crop",
    category: "Residential",
    type: "3 BHK Flat",
    description: "Spacious 3BHK apartment with modern amenities, swimming pool, and club house. Greenest sector of Noida."
  },
  {
    title: "Commercial Land Ghaziabad",
    location: "NH-24, Ghaziabad",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2064&auto=format&fit=crop",
    category: "Plots",
    type: "Commercial Plot",
    description: "Prime commercial land on NH-24 highway. Ideal for warehouses, showrooms, or corporate offices."
  }
];

function ConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = "Confirm", 
  type = 'danger' 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  onConfirm: () => void, 
  title: string, 
  message: string, 
  confirmText?: string,
  type?: 'danger' | 'success' | 'info'
}) {
  if (!isOpen) return null;

  const colors = {
    danger: { bg: 'bg-red-50', text: 'text-red-600', button: 'bg-red-600 hover:bg-red-700 shadow-red-200' },
    success: { bg: 'bg-green-50', text: 'text-green-600', button: 'bg-green-600 hover:bg-green-700 shadow-green-200' },
    info: { bg: 'bg-blue-50', text: 'text-blue-600', button: 'bg-blue-600 hover:bg-blue-700 shadow-blue-200' }
  };

  const color = colors[type];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white max-w-sm w-full p-8 rounded-3xl shadow-2xl text-center"
      >
        <div className={cn("w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6", color.bg, color.text)}>
          {type === 'danger' ? <Trash2 size={32} /> : type === 'success' ? <CheckCircle2 size={32} /> : <Database size={32} />}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-500 mb-8">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-all"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={cn("flex-1 px-6 py-3 text-white font-bold rounded-xl shadow-lg transition-all", color.button)}
          >
            {confirmText}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminDashboard({ user, isAdmin, onLogin, onLogout }: { user: User | null, isAdmin: boolean, onLogin: (success: boolean) => void, onLogout: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'lalit.official2898' && password === 'Newindia@1234') {
      onLogin(true);
      setError('');
    } else {
      setError('Invalid username or password');
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 bg-gray-50">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white p-10 rounded-3xl shadow-2xl border border-gray-100"
        >
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock size={40} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Admin Login</h2>
            <p className="text-gray-500 mt-2">Enter your credentials to access the panel</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all"
                placeholder="Enter username"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all"
                placeholder="Enter password"
                required
              />
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-red-600 text-sm font-bold bg-red-50 p-4 rounded-xl flex items-center space-x-2"
              >
                <X size={16} />
                <span>{error}</span>
              </motion.div>
            )}

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-200 flex items-center justify-center space-x-3 transition-all"
            >
              <LogIn size={20} />
              <span>Login to Dashboard</span>
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">Authorized Access Only</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-100 px-4 py-3 sticky top-16 z-40 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 min-w-0">
            <div className="w-9 h-9 rounded-full bg-red-600 flex-shrink-0 flex items-center justify-center text-white font-bold text-sm">
              L
            </div>
            <div className="min-w-0">
              <h4 className="font-bold text-gray-900 text-xs truncate">LALIT KUMAR</h4>
              <p className="text-[9px] text-gray-500 uppercase tracking-widest">Admin</p>
            </div>
          </div>
          <button onClick={onLogout} className="p-2 text-gray-400 hover:text-red-600 flex-shrink-0">
            <LogOut size={18} />
          </button>
        </div>
        
        <nav className="flex space-x-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
          <Link to="/admin" className={cn(
            "flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all",
            location.pathname === '/admin' ? "bg-red-600 text-white shadow-lg shadow-red-200" : "bg-gray-100 text-gray-600"
          )}>
            <LayoutDashboard size={14} />
            <span>Dashboard</span>
          </Link>
          <Link to="/admin/projects" className={cn(
            "flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all",
            location.pathname === '/admin/projects' ? "bg-red-600 text-white shadow-lg shadow-red-200" : "bg-gray-100 text-gray-600"
          )}>
            <Building size={14} />
            <span>Projects</span>
          </Link>
          <Link to="/admin/leads" className={cn(
            "flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all",
            location.pathname === '/admin/leads' ? "bg-red-600 text-white shadow-lg shadow-red-200" : "bg-gray-100 text-gray-600"
          )}>
            <Users size={14} />
            <span>Leads</span>
          </Link>
        </nav>
      </div>

      <div className="container mx-auto px-4 py-6 sm:py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block lg:w-1/4 space-y-4">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 sticky top-28">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-xl">
                  L
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">LALIT KUMAR</h4>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
              </div>

              <nav className="space-y-2">
                <Link to="/admin" className={cn(
                  "flex items-center space-x-3 p-3 rounded-xl transition-all font-bold",
                  location.pathname === '/admin' ? "bg-red-50 text-red-600" : "text-gray-600 hover:bg-gray-50"
                )}>
                  <LayoutDashboard size={20} />
                  <span>Dashboard</span>
                </Link>
                <Link to="/admin/projects" className={cn(
                  "flex items-center space-x-3 p-3 rounded-xl transition-all font-bold",
                  location.pathname === '/admin/projects' ? "bg-red-50 text-red-600" : "text-gray-600 hover:bg-gray-50"
                )}>
                  <Building size={20} />
                  <span>Projects</span>
                </Link>
                <Link to="/admin/leads" className={cn(
                  "flex items-center space-x-3 p-3 rounded-xl transition-all font-bold",
                  location.pathname === '/admin/leads' ? "bg-red-50 text-red-600" : "text-gray-600 hover:bg-gray-50"
                )}>
                  <Users size={20} />
                  <span>Leads</span>
                </Link>
                <button
                  onClick={onLogout}
                  className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-100 text-gray-700 transition-all font-medium mt-8"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:w-3/4">
            <AnimatePresence mode="wait">
              <Routes location={location}>
                <Route path="/" element={
                  <motion.div key="dashboard" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <DashboardStats />
                  </motion.div>
                } />
                <Route path="/projects" element={
                  <motion.div key="projects" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <ProjectManagement />
                  </motion.div>
                } />
                <Route path="/leads" element={
                  <motion.div key="leads" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <LeadManagement />
                  </motion.div>
                } />
              </Routes>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}

function DashboardStats() {
  const [stats, setStats] = useState({ projects: 0, leads: 0 });
  const [isSeeding, setIsSeeding] = useState(false);
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    type: 'danger' | 'success' | 'info';
    confirmText?: string;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
    type: 'info'
  });

  useEffect(() => {
    const fetchStats = async () => {
      const projectsCount = await getCountFromServer(collection(db, 'projects'));
      const leadsCount = await getCountFromServer(collection(db, 'leads'));
      setStats({
        projects: projectsCount.data().count,
        leads: leadsCount.data().count
      });
    };
    fetchStats();
  }, []);

  const handleSeedData = async () => {
    setIsSeeding(true);
    try {
      for (const project of SEED_PROJECTS) {
        await addDoc(collection(db, 'projects'), {
          ...project,
          createdAt: serverTimestamp()
        });
      }
      setModalConfig({
        isOpen: true,
        title: 'Success!',
        message: 'Sample projects added successfully!',
        onConfirm: () => window.location.reload(),
        type: 'success',
        confirmText: 'Reload Page'
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'projects');
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="space-y-8">
      <ConfirmationModal 
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
        onConfirm={modalConfig.onConfirm}
        title={modalConfig.title}
        message={modalConfig.message}
        type={modalConfig.type}
        confirmText={modalConfig.confirmText}
      />
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Dashboard Overview</h2>
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <button
            onClick={() => setModalConfig({
              isOpen: true,
              title: 'Seed Sample Data?',
              message: 'This will add sample projects to your database. Continue?',
              onConfirm: handleSeedData,
              type: 'info',
              confirmText: 'Yes, Seed Data'
            })}
            disabled={isSeeding}
            className="flex items-center space-x-2 text-xs sm:text-sm font-bold text-gray-500 hover:text-red-600 transition-colors disabled:opacity-50"
          >
            {isSeeding ? <Loader2 size={14} className="animate-spin" /> : <Database size={14} />}
            <span>Seed Data</span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-gray-500 font-medium uppercase tracking-wider text-sm mb-2">Total Projects</p>
            <h3 className="text-5xl font-bold text-gray-900">{stats.projects}</h3>
          </div>
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center">
            <Building size={32} />
          </div>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-gray-500 font-medium uppercase tracking-wider text-sm mb-2">Total Leads</p>
            <h3 className="text-5xl font-bold text-gray-900">{stats.leads}</h3>
          </div>
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center">
            <Users size={32} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectManagement() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project)));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'projects', id));
      setDeleteConfirmId(null);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, 'projects');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Project Management</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl font-bold flex items-center justify-center space-x-2 shadow-lg shadow-red-600/20 text-sm"
        >
          <Plus size={18} />
          <span>Add Project</span>
        </button>
      </div>

      <AnimatePresence>
        {(isAdding || editingProject) && (
          <ProjectForm
            project={editingProject}
            onClose={() => {
              setIsAdding(false);
              setEditingProject(null);
            }}
          />
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 gap-4 lg:hidden">
        {projects.map((project) => (
          <div key={project.id} className="bg-white p-4 rounded-2xl shadow-md border border-gray-100 flex items-center justify-between gap-4">
            <div className="flex items-center space-x-3 min-w-0">
              <img src={getDirectImageUrl(project.image)} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" alt="" referrerPolicy="no-referrer" />
              <div className="min-w-0">
                <p className="font-bold text-gray-900 text-sm truncate">{project.title}</p>
                <p className="text-[10px] text-gray-500 truncate">{project.location}</p>
              </div>
            </div>
            <div className="flex space-x-1 flex-shrink-0">
              <button onClick={() => setEditingProject(project)} className="p-2 text-gray-400 hover:text-blue-600">
                <Edit size={16} />
              </button>
              <button onClick={() => setDeleteConfirmId(project.id)} className="p-2 text-gray-400 hover:text-red-600">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden lg:block bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Project</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Type</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-4">
                    <img src={getDirectImageUrl(project.image)} className="w-12 h-12 rounded-lg object-cover" alt="" referrerPolicy="no-referrer" />
                    <div>
                      <p className="font-bold text-gray-900">{project.title}</p>
                      <p className="text-xs text-gray-500">{project.location}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-gray-100 text-gray-600 uppercase tracking-wider">
                    {project.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-50 text-red-600 uppercase tracking-wider">
                    {project.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setEditingProject(project)}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(project.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading && (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-red-600" size={32} />
          </div>
        )}
      </div>

      <AnimatePresence>
        {deleteConfirmId && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white max-w-sm w-full p-8 rounded-3xl shadow-2xl text-center"
            >
              <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trash2 size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Project?</h3>
              <p className="text-gray-500 mb-8">Are you sure you want to delete this project? This action cannot be undone.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirmId)}
                  className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-200 transition-all"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProjectForm({ project, onClose }: { project: Project | null, onClose: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, control, formState: { errors } } = useForm<Partial<Project>>({
    defaultValues: project || {
      category: 'Residential',
      type: 'Flat'
    }
  });

  const onSubmit = async (data: Partial<Project>) => {
    setIsSubmitting(true);
    try {
      if (project) {
        await updateDoc(doc(db, 'projects', project.id), {
          ...data,
          updatedAt: serverTimestamp()
        });
      } else {
        await addDoc(collection(db, 'projects'), {
          ...data,
          createdAt: serverTimestamp()
        });
      }
      onClose();
    } catch (error) {
      handleFirestoreError(error, project ? OperationType.UPDATE : OperationType.CREATE, 'projects');
    } finally {
      setIsSubmitting(false);
    }
  };

  const imageUrl = useWatch({
    control,
    name: 'image',
    defaultValue: project?.image || ''
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white w-full max-w-2xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="p-5 sm:p-8 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{project ? 'Edit Project' : 'Add New Project'}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>
 
        <form onSubmit={handleSubmit(onSubmit)} className="p-5 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto scrollbar-hide">
          {imageUrl && (
            <div className="w-full h-40 sm:h-48 rounded-xl sm:rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 mb-6">
              <img 
                src={getDirectImageUrl(imageUrl)} 
                alt="Preview" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1000';
                }}
              />
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-2">
                <Tag size={12} /> Title *
              </label>
              <input
                {...register('title', { required: 'Title is required' })}
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-2">
                <MapPin size={12} /> Location *
              </label>
              <input
                {...register('location', { required: 'Location is required' })}
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-2">
                <ImageIcon size={12} /> Image URL *
              </label>
              <input
                {...register('image', { required: 'Image URL is required' })}
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-2">
                <Building size={12} /> Category *
              </label>
              <select
                {...register('category', { required: 'Category is required' })}
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none bg-white text-sm"
              >
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Investment">Investment</option>
                <option value="Plots">Plots</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-2">
                <Tag size={12} /> Property Type *
              </label>
              <input
                {...register('type', { required: 'Type is required' })}
                placeholder="e.g. 3 BHK Flat, Shop, Office"
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none text-sm"
              />
            </div>
          </div>
 
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-2">
              <FileText size={12} /> Description *
            </label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              rows={3}
              className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none resize-none text-sm"
            />
          </div>
 
          <div className="pt-2 flex gap-3 sm:gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 sm:py-4 rounded-xl transition-all text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 sm:py-4 rounded-xl shadow-lg shadow-red-600/20 flex items-center justify-center space-x-2 disabled:opacity-70 text-sm"
            >
              {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <span>{project ? 'Update' : 'Add'}</span>}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

function LeadManagement() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setLeads(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Lead)));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDeleteLead = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'leads', id));
      setDeleteConfirmId(null);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, 'leads');
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Lead Management</h2>

      <div className="grid grid-cols-1 gap-4 lg:hidden">
        {leads.map((lead) => (
          <div key={lead.id} className="bg-white p-4 rounded-2xl shadow-md border border-gray-100 space-y-4">
            <div className="flex justify-between items-start gap-4">
              <div className="min-w-0">
                <p className="font-bold text-gray-900 truncate">{lead.name}</p>
                <div className="flex items-center space-x-2">
                  <p className="text-xs text-red-600 font-medium">{lead.phone}</p>
                  <button onClick={() => copyToClipboard(lead.phone, lead.id)} className="text-gray-400 flex-shrink-0">
                    {copiedId === lead.id ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
                  </button>
                </div>
              </div>
              <button onClick={() => setDeleteConfirmId(lead.id)} className="text-gray-300 hover:text-red-600 flex-shrink-0">
                <Trash2 size={16} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-50 text-red-600 uppercase">
                {lead.propertyType || 'General'}
              </span>
              {lead.budget && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 uppercase">
                {lead.budget}
              </span>}
            </div>
            <p className="text-[10px] text-gray-400">Received: {lead.createdAt?.toDate ? lead.createdAt.toDate().toLocaleDateString() : 'N/A'}</p>
          </div>
        ))}
      </div>

      <div className="hidden lg:block bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Interest</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Details</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center justify-between group">
                    <div>
                      <p className="font-bold text-gray-900">{lead.name}</p>
                      <p className="text-xs text-red-600 font-medium">{lead.phone}</p>
                    </div>
                    <button 
                      onClick={() => copyToClipboard(lead.phone, lead.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-all opacity-0 group-hover:opacity-100"
                    >
                      {copiedId === lead.id ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-50 text-red-600 uppercase tracking-wider">
                    {lead.propertyType || 'General'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-xs space-y-1">
                    {lead.budget && <p><span className="text-gray-400">Budget:</span> {lead.budget}</p>}
                    {lead.location && <p><span className="text-gray-400">Loc:</span> {lead.location}</p>}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-xs text-gray-500">
                    {lead.createdAt?.toDate ? lead.createdAt.toDate().toLocaleDateString() : 'N/A'}
                  </p>
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => setDeleteConfirmId(lead.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading && (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-red-600" size={32} />
          </div>
        )}
        {!loading && leads.length === 0 && (
          <div className="text-center py-20">
            <Users className="mx-auto text-gray-300 mb-4" size={64} />
            <p className="text-gray-500 font-medium">No leads collected yet.</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {deleteConfirmId && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white max-w-sm w-full p-8 rounded-3xl shadow-2xl text-center"
            >
              <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trash2 size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Lead?</h3>
              <p className="text-gray-500 mb-8">Are you sure you want to delete this lead? This action cannot be undone.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteLead(deleteConfirmId)}
                  className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-200 transition-all"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
