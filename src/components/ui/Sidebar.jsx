import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggleCollapse, className = '' }) => {
  const [activeSection, setActiveSection] = useState('main');
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const mainNavigation = [
    { name: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard', badge: null },
    { name: 'Opportunity Explorer', path: '/opportunity-explorer', icon: 'Search', badge: '12' },
    { name: 'Professional Profile', path: '/professional-profile', icon: 'User', badge: null },
    { name: 'Services Marketplace', path: '/services-marketplace', icon: 'Store', badge: 'New' },
    { name: 'Resource Library', path: '/resource-library', icon: 'BookOpen', badge: null }
  ];

  const quickActions = [
    { name: 'Create Listing', icon: 'Plus', action: 'create-listing' },
    { name: 'Find Jobs', icon: 'Briefcase', action: 'find-jobs' },
    { name: 'Network', icon: 'Users', action: 'network' },
    { name: 'Analytics', icon: 'BarChart3', action: 'analytics' }
  ];

  const bottomNavigation = [
    { name: 'Settings', path: '/settings', icon: 'Settings' },
    { name: 'Help & Support', path: '/support', icon: 'HelpCircle' },
    { name: 'Feedback', path: '/feedback', icon: 'MessageSquare' }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case 'create-listing': navigate('/services-marketplace?action=create');
        break;
      case 'find-jobs': navigate('/opportunity-explorer?type=jobs');
        break;
      case 'network': navigate('/professional-profile?tab=network');
        break;
      case 'analytics': navigate('/dashboard?view=analytics');
        break;
      default:
        break;
    }
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const shouldShowExpanded = isCollapsed ? isHovered : true;

  return (
    <aside 
      className={`fixed left-0 top-16 bottom-0 z-sidebar bg-card border-r border-border transition-all duration-base ${
        isCollapsed ? 'w-16 hover:w-64' : 'w-64'
      } ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            {shouldShowExpanded && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Icon name="Zap" size={16} color="white" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-primary">WorkHub Pro</h2>
                  <p className="text-xs text-text-secondary">Professional Hub</p>
                </div>
              </div>
            )}
            
            {onToggleCollapse && (
              <button
                onClick={onToggleCollapse}
                className="p-1.5 rounded-lg hover:bg-muted transition-colors duration-base focus-professional"
              >
                <Icon 
                  name={isCollapsed ? "ChevronRight" : "ChevronLeft"} 
                  size={16} 
                  className="text-text-secondary"
                />
              </button>
            )}
          </div>
        </div>

        {/* Main Navigation */}
        <div className="flex-1 overflow-y-auto scrollbar-professional">
          <div className="p-4 space-y-2">
            {shouldShowExpanded && (
              <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">
                Main Navigation
              </h3>
            )}
            
            {mainNavigation?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`flex items-center w-full p-3 rounded-lg text-sm font-medium transition-all duration-base focus-professional group ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground shadow-professional'
                    : 'text-text-primary hover:bg-muted hover:text-primary'
                }`}
                title={!shouldShowExpanded ? item?.name : undefined}
              >
                <Icon 
                  name={item?.icon} 
                  size={20} 
                  className={`${
                    isActivePath(item?.path) 
                      ? 'text-primary-foreground' 
                      : 'text-text-secondary group-hover:text-primary'
                  } ${shouldShowExpanded ? 'mr-3' : ''}`}
                />
                
                {shouldShowExpanded && (
                  <>
                    <span className="flex-1 text-left">{item?.name}</span>
                    {item?.badge && (
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        item?.badge === 'New' ?'bg-accent text-accent-foreground' :'bg-secondary text-secondary-foreground'
                      }`}>
                        {item?.badge}
                      </span>
                    )}
                  </>
                )}
              </button>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="p-4 border-t border-border">
            {shouldShowExpanded && (
              <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">
                Quick Actions
              </h3>
            )}
            
            <div className={`grid gap-2 ${shouldShowExpanded ? 'grid-cols-2' : 'grid-cols-1'}`}>
              {quickActions?.map((action) => (
                <button
                  key={action?.action}
                  onClick={() => handleQuickAction(action?.action)}
                  className="flex items-center justify-center p-3 rounded-lg bg-muted hover:bg-secondary hover:text-secondary-foreground transition-all duration-base focus-professional group"
                  title={!shouldShowExpanded ? action?.name : undefined}
                >
                  <Icon 
                    name={action?.icon} 
                    size={18} 
                    className="text-text-secondary group-hover:text-secondary-foreground"
                  />
                  {shouldShowExpanded && (
                    <span className="ml-2 text-xs font-medium">{action?.name}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Progress Section */}
          {shouldShowExpanded && (
            <div className="p-4 border-t border-border">
              <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">
                Profile Completion
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-primary">Profile Strength</span>
                  <span className="text-primary font-medium">85%</span>
                </div>
                
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-slow"
                    style={{ width: '85%' }}
                  ></div>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  iconName="ArrowRight"
                  iconPosition="right"
                  fullWidth
                  onClick={() => handleNavigation('/professional-profile')}
                >
                  Complete Profile
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="p-4 border-t border-border">
          <div className="space-y-1">
            {bottomNavigation?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className="flex items-center w-full p-2 rounded-lg text-sm text-text-secondary hover:bg-muted hover:text-primary transition-all duration-base focus-professional"
                title={!shouldShowExpanded ? item?.name : undefined}
              >
                <Icon 
                  name={item?.icon} 
                  size={18} 
                  className={shouldShowExpanded ? 'mr-3' : ''}
                />
                {shouldShowExpanded && <span>{item?.name}</span>}
              </button>
            ))}
          </div>
          
          {shouldShowExpanded && (
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-accent to-warning rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">John Doe</p>
                  <p className="text-xs text-text-secondary truncate">Professional Member</p>
                </div>
                <button className="p-1 rounded-lg hover:bg-muted transition-colors duration-base focus-professional">
                  <Icon name="MoreVertical" size={16} className="text-text-secondary" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;