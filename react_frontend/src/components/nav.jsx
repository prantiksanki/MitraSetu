import { Link, useLocation } from 'react-router-dom';

function Nav() {
  const location = useLocation();
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Journey', path: '/journey' },
    { name: 'Resources', path: '/resources' },
    { name: 'Profile', path: '/profile' }
  ];

  return (
    <nav className="w-full px-6 py-4 bg-gradient-to-r from-purple-100 via-blue-100 to-purple-50 shadow-lg rounded-b-3xl flex items-center justify-between fixed top-0 left-0 z-50">
      <div className="flex items-center space-x-3">
        <span className="text-3xl font-bold text-purple-700 tracking-tight drop-shadow-sm">MitraSetu</span>
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
        <button className="bg-purple-700 text-white px-5 py-2 rounded-xl font-semibold shadow-md hover:bg-purple-800 transition-all duration-200">Sign Out</button>
      </div>
    </nav>
  );
}

export default Nav;
