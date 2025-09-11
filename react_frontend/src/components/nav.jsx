import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { Home as HomeIcon, BookOpen, Users, User, PlusSquare, Video } from 'lucide-react';

export function Nav() {
  const location = useLocation();
  const navItems = [
    { name: 'Home', path: '/home' },
    { name: 'Journey', path: '/journey' },
    { name: 'Resources', path: '/resources' },
    { name: 'Profile', path: '/profile' }
  ];
    const { logout } = useAuth0();
const origin = window.location.origin;

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: `${origin}/`
      }
    });
  };

  // On /home, hide the top bar and only render sidebar
  if (location.pathname === '/home') {
    return (
      <nav className="fixed top-0 left-0 z-50 w-full">
        <SidebarHome pathname={location.pathname} />
      </nav>
    );
  }

  return (
    <nav className="fixed top-0 left-0 z-50 flex items-center justify-between w-full px-6 py-4 shadow-lg bg-white border-b border-gray-200">
      <div className="flex items-center space-x-3">
        <img src="/colored-logo.png" alt="MitraSetu" className="h-8 w-auto" />
      </div>
      <ul className="flex space-x-6">
        {navItems.map(item => (
          <li key={item.name}>
            <Link
              to={item.path}
              className={`text-sm font-medium px-3 py-2 rounded-md transition 
                ${location.pathname === item.path
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
              `}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex items-center space-x-2">
        <button className="px-4 py-2 text-sm font-semibold text-white transition bg-indigo-600 rounded-md hover:bg-indigo-700"
         onClick={handleLogout}
        >Sign Out</button>
      </div>
    </nav>
  );
}

export default Nav;

function SidebarHome({ pathname }) {
  const [collapsed, setCollapsed] = React.useState(false)
  return (
    <div className={`fixed left-0 top-0 h-full ${collapsed ? 'w-16' : 'w-64'} px-4 py-6 bg-white text-gray-900 border-r border-gray-200 hidden md:block transition-all`}>
      <div className="mb-6 px-2 flex items-center justify-between">
        <img src="/colored-logo.png" alt="MitraSetu" className="h-10 w-auto" />
        <button onClick={()=>setCollapsed(c=>!c)} className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200">{collapsed? '>' : '<'}</button>
      </div>
      <div className="space-y-2">
        <Link to="/home" className={`flex items-center gap-3 px-4 py-3 rounded-xl ${pathname === '/home' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}>
          <HomeIcon size={18} /> {!collapsed && <span className="font-semibold">Home</span>}
        </Link>
        <a href="#post-tip" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50">
          <PlusSquare size={18} /> {!collapsed && <span className="font-semibold">Post Health Tip</span>}
        </a>
        <Link to="/live" className={`flex items-center gap-3 px-4 py-3 rounded-xl ${pathname === '/live' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}>
          <Video size={18} /> {!collapsed && <span className="font-semibold">Live with Mitra</span>}
        </Link>
        <Link to="/journey" className={`flex items-center gap-3 px-4 py-3 rounded-xl ${pathname === '/journey' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}>
          <BookOpen size={18} /> {!collapsed && <span className="font-semibold">Journey</span>}
        </Link>
        <Link to="/resources" className={`flex items-center gap-3 px-4 py-3 rounded-xl ${pathname === '/resources' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}>
          <Users size={18} /> {!collapsed && <span className="font-semibold">Resources</span>}
        </Link>
        <Link to="/profile" className={`flex items-center gap-3 px-4 py-3 rounded-xl ${pathname === '/profile' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}>
          <User size={18} /> {!collapsed && <span className="font-semibold">Profile</span>}
        </Link>
      </div>
    </div>
  )
}
