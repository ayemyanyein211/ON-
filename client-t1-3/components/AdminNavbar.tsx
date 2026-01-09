import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Settings, LogOut, FileText, Users, Briefcase, Package, Database, LayoutDashboard, ShieldAlert } from 'lucide-react';
import { useData } from '../services/dataContext';

export const AdminNavbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { auth } = useData();
  
  const links = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'General Pages', path: '/admin/pages', icon: FileText },
    { name: 'Services', path: '/admin/services', icon: Briefcase },
    { name: 'Packages', path: '/admin/packages', icon: Package },
    { name: 'Team', path: '/admin/team', icon: Users },
    { name: 'Database', path: '/admin/database', icon: Database }, // Universities/Scholarships
    { name: 'Blog', path: '/admin/blog', icon: FileText },
    { name: 'Security', path: '/admin/security', icon: ShieldAlert },
  ];

  const handleLogout = () => {
    auth.logout();
    navigate('/');
  };

  return (
    <div className="bg-stone-900 text-stone-200 w-64 min-h-screen fixed left-0 top-0 flex flex-col shadow-xl z-50">
      <div className="h-20 flex items-center justify-center border-b border-stone-700">
        <div className="flex items-center space-x-2">
          <Settings className="h-6 w-6 text-brand-red" />
          <span className="font-bold text-xl">Admin Panel</span>
        </div>
      </div>
      <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === link.path 
                  ? 'bg-brand-red text-white' 
                  : 'hover:bg-stone-800'
              }`}
            >
              <Icon size={18} />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-stone-700">
        <button 
          onClick={handleLogout}
          className="flex items-center space-x-2 text-stone-400 hover:text-white transition-colors w-full text-left"
        >
          <LogOut className="h-5 w-5" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};