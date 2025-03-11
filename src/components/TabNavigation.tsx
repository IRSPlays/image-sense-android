
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Fish, Camera as CameraIcon, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const TabNavigation = () => {
  const location = useLocation();
  
  const tabs = [
    { icon: Home, path: '/', label: 'Home' },
    { icon: Fish, path: '/fish-list', label: 'Fish Data' },
    { icon: CameraIcon, path: '/camera', label: 'Scan' },
    { icon: Settings, path: '/settings', label: 'Settings' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border flex justify-around items-center h-16 px-2 z-10">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        
        return (
          <Link 
            key={tab.path}
            to={tab.path} 
            className={cn(
              "flex flex-col items-center justify-center py-1 px-3 rounded-md transition-colors",
              isActive 
                ? "text-primary" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <tab.icon size={20} className={cn(isActive ? "text-primary" : "text-muted-foreground")} />
            <span className="text-xs mt-1">{tab.label}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default TabNavigation;
