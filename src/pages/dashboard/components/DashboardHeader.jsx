import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DashboardHeader = ({ userName = "John Doe", lastLogin = "2025-09-24 16:45:32" }) => {
  const currentTime = new Date()?.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });

  const getGreeting = () => {
    const hour = new Date()?.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="bg-gradient-to-r from-primary via-secondary to-accent p-6 rounded-xl text-white mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="mb-4 lg:mb-0">
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">
            {getGreeting()}, {userName}!
          </h1>
          <p className="text-white/80 text-sm lg:text-base">
            Welcome to your professional command center • {currentTime}
          </p>
          <p className="text-white/60 text-xs mt-1">
            Last login: {new Date(lastLogin)?.toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            size="sm"
            iconName="Plus"
            iconPosition="left"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            Quick Action
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Settings"
            iconPosition="left"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            Customize
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <div className="bg-white/10 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <Icon name="Briefcase" size={20} className="text-white/80" />
            <span className="text-sm font-medium">Active Jobs</span>
          </div>
          <p className="text-xl font-bold mt-1">12</p>
        </div>
        
        <div className="bg-white/10 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={20} className="text-white/80" />
            <span className="text-sm font-medium">Campaigns</span>
          </div>
          <p className="text-xl font-bold mt-1">8</p>
        </div>
        
        <div className="bg-white/10 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <Icon name="Home" size={20} className="text-white/80" />
            <span className="text-sm font-medium">Properties</span>
          </div>
          <p className="text-xl font-bold mt-1">5</p>
        </div>
        
        <div className="bg-white/10 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <Icon name="DollarSign" size={20} className="text-white/80" />
            <span className="text-sm font-medium">Revenue</span>
          </div>
          <p className="text-xl font-bold mt-1">$24.5K</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;