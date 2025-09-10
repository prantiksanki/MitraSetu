import { Link, useLocation } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

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

  return (
    <nav className="fixed top-0 left-0 z-50 flex items-center justify-between w-full px-6 py-4 shadow-lg bg-gradient-to-r from-purple-100 via-blue-100 to-purple-50 rounded-b-3xl">
      <div className="flex items-center space-x-3">
        <span className="text-3xl font-bold tracking-tight text-purple-700 drop-shadow-sm">MitraSetu</span>
      </div>
      <ul className="flex space-x-8">
        {navItems.map(item => (
          <li key={item.name}>
            <Link
              to={item.path}
              className={`text-lg font-medium px-4 py-2 rounded-xl transition-all duration-200 
                ${location.pathname === item.path
                  ? 'bg-purple-300/40 text-purple-900 shadow-md'
                  : 'text-purple-700 hover:bg-purple-200/40 hover:text-purple-900'}
              `}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex items-center space-x-2">
        <button className="px-5 py-2 font-semibold text-white transition-all duration-200 bg-purple-700 shadow-md rounded-xl hover:bg-purple-800"
         onClick={handleLogout}
        >Sign Out</button>
      </div>
    </nav>
  );
}

export default Nav;
