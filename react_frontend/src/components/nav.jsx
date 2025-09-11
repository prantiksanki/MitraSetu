import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { Home as HomeIcon, BookOpen, Users, User, PlusSquare, Video, Shield, ShoppingBag, Trophy, MessageCircleMore, Ellipsis } from 'lucide-react';




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
    <nav className="fixed top-0 left-0 z-50 flex items-center justify-between w-full px-6 py-4 bg-white border-b border-gray-200 shadow-lg">
      <div className="flex items-center gap-4">
        <img src="/colored-logo.png" alt="MitraSetu" className="w-auto h-8" />
        {/* Icon nav (horizontal) */}
        <div className="items-center hidden gap-2 md:flex">
          <HorizontalItem active={location.pathname === '/home'} to="/home" color="bg-[#2B3442]" Icon={HomeIcon} label="Home" />
          <HorizontalItem asAnchor href="/home#post-tip" color="bg-[#7C3AED]" Icon={PlusSquare} label="Post" />
          <HorizontalItem active={location.pathname === '/live'} to="/live" color="bg-[#16A34A]" Icon={Video} label="Live" />
          <HorizontalItem active={location.pathname === '/journey'} to="/journey" color="bg-[#FB923C]" Icon={BookOpen} label="Chat" />
          <HorizontalItem active={location.pathname === '/resources'} to="/resources" color="bg-[#F59E0B]" Icon={Shield} label="Circle" />
          <HorizontalItem active={location.pathname === '/profile'} to="/profile" color="bg-[#3B82F6]" Icon={User} label="Profile" />
        </div>
      </div>
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
      <div className="flex items-center justify-between px-2 mb-6">
        <img src="/colored-logo.png" alt="MitraSetu" className="w-auto h-10" />
        <button onClick={()=>setCollapsed(c=>!c)} className="px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200">{collapsed? '>' : '<'}</button>
      </div>
      <div className="space-y-2">
        <SidebarItem active={pathname === '/home'} collapsed={collapsed} color="bg-[#2B3442]" Icon={HomeIcon} label="Home" to="/home" />
        <SidebarItem asAnchor href="#post-tip" collapsed={collapsed} color="bg-[#7C3AED]" Icon={PlusSquare} label="Post Health Tip" />
        <SidebarItem active={pathname === '/live'} collapsed={collapsed} color="bg-[#16A34A]" Icon={Video} label="Live with Mitra" to="/live" />
        <SidebarItem active={pathname === '/journey'} collapsed={collapsed} color="bg-[#FB923C]" Icon={BookOpen} label="Chat with Mitra" to="/journey" />
        <SidebarItem active={pathname === '/resources'} collapsed={collapsed} color="bg-[#F59E0B]" Icon={Shield} label="Mitra Circle" to="/resources" />
        {/* <SidebarItem active={pathname === '/shop'} collapsed={collapsed} color="bg-[#EF4444]" Icon={ShoppingBag} label="Shop" to="/shop" /> */}
        <SidebarItem active={pathname === '/profile'} collapsed={collapsed} color="bg-[#3B82F6]" Icon={User} label="Profile" to="/profile" />
        {/* <SidebarItem asAnchor href="#more" collapsed={collapsed} color="bg-[#A855F7]" Icon={Ellipsis} label="More" /> */}
      </div>
    </div>
  )
}

function SidebarItem({ asAnchor=false, href, to, active=false, collapsed, color='bg-gray-200', Icon, label }) {
  const common = `flex items-center gap-3 px-4 py-3 rounded-xl ${active ? 'bg-gray-100' : 'hover:bg-gray-50'}`
  const iconWrap = `flex items-center justify-center w-9 h-9 rounded-lg text-white ${color}`
  const content = (
    <div className={common}>
      <div className={iconWrap}><Icon size={18} /></div>
      {!collapsed && <span className="font-semibold">{label}</span>}
    </div>
  )
  if (asAnchor) {
    return <a href={href}>{content}</a>
  }
  return <Link to={to}>{content}</Link>
}

function HorizontalItem({ asAnchor=false, href, to, active=false, color='bg-gray-200', Icon, label }) {
  const base = `flex items-center gap-2 px-3 py-2 rounded-xl ${active ? 'bg-gray-100' : 'hover:bg-gray-50'}`
  const iconWrap = `flex items-center justify-center w-8 h-8 rounded-lg text-white ${color}`
  const content = (
    <div className={base}>
      <div className={iconWrap}><Icon size={16} /></div>
      <span className="hidden text-sm font-semibold lg:inline">{label}</span>
    </div>
  )
  if (asAnchor) return <a href={href}>{content}</a>
  return <Link to={to}>{content}</Link>
}
