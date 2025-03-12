
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Search, Camera, Settings, MessageCircle } from 'lucide-react';

const TabNavigation = () => {
  const location = useLocation();

  // Don't show navigation on the splash screen
  if (location.pathname === '/splash') {
    return null;
  }

  const tabs = [
    {
      to: '/',
      icon: <Home className="h-5 w-5" />,
      label: 'Home',
    },
    {
      to: '/fish-list',
      icon: <Search className="h-5 w-5" />,
      label: 'Search',
    },
    {
      to: '/camera',
      icon: <Camera className="h-5 w-5" />,
      label: 'Camera',
    },
    {
      to: '/fish-chat',
      icon: <MessageCircle className="h-5 w-5" />,
      label: 'Chat',
    },
    {
      to: '/settings',
      icon: <Settings className="h-5 w-5" />,
      label: 'Settings',
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t bg-background z-50">
      <div className="flex justify-around items-center p-2">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) =>
              `flex flex-col items-center px-3 py-1 rounded-md ${
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`
            }
          >
            {tab.icon}
            <span className="text-xs mt-1">{tab.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default TabNavigation;
