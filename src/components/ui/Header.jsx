
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ className = '' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { name: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { name: 'Opportunities', path: '/opportunity-explorer', icon: 'Search' },
    { name: 'Profile', path: '/professional-profile', icon: 'User' },
    { name: 'Services', path: '/services-marketplace', icon: 'Store' },
    { name: 'Resources', path: '/resource-library', icon: 'BookOpen' },
    { name: 'Real Estate', path: '/real-estate', icon: 'Home' },
    { name: 'Marketing', path: '/marketing', icon: 'Target' },
    { name: 'Job Placement', path: '/job-placement', icon: 'Briefcase' },
  ];

  const moreMenuItems = [
    { name: 'Settings', path: '/settings', icon: 'Settings' },
    { name: 'Help Center', path: '/help', icon: 'HelpCircle' },
    { name: 'Support', path: '/support', icon: 'MessageCircle' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(authStatus === 'true');
  }, [location]);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    navigate('/homepage');
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-header transition-all duration-base ${isScrolled ? 'bg-background/95 backdrop-blur-professional shadow-professional border-b border-border' : 'bg-background/80 backdrop-blur-sm'} ${className}`}>
      <div className="w-full">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          {/* Logo Section */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavigation('/homepage')}
              className="flex items-center space-x-3 focus-professional group"
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-primary via-secondary to-accent rounded-lg flex items-center justify-center shadow-professional group-hover:shadow-elevated transition-all duration-base">
                  <Icon 
                    name="Zap" 
                    size={24} 
                    color="white" 
                    className="group-hover:scale-110 transition-transform duration-base"
                  />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-opportunity-pulse"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-primary group-hover:text-secondary transition-colors duration-base">
                  WorkHub Pro
                </h1>
                <p className="text-xs text-text-secondary -mt-1">
                  Professional Convergence
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-base focus-professional ${isActivePath(item?.path) ? 'bg-primary text-primary-foreground shadow-professional' : 'text-text-primary hover:bg-muted hover:text-primary'}`}>
                <Icon 
                  name={item?.icon} 
                  size={18} 
                  className={isActivePath(item?.path) ? 'text-primary-foreground' : 'text-text-secondary'}
                />
                <span>{item?.name}</span>
              </button>
            ))}
            
            {/* More Menu */}
            <div className="relative group">
              <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-text-primary hover:bg-muted hover:text-primary transition-all duration-base focus-professional">
                <Icon name="MoreHorizontal" size={18} className="text-text-secondary" />
                <span>More</span>
              </button>
              
              <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-lg shadow-floating opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-base">
                <div className="py-2">
                  {moreMenuItems?.map((item) => (
                    <button
                      key={item?.path}
                      onClick={() => handleNavigation(item?.path)}
                      className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-text-primary hover:bg-muted transition-colors duration-base"
                    >
                      <Icon name={item?.icon} size={16} className="text-text-secondary" />
                      <span>{item?.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated ? (
                 <Button
                 variant="outline"
                 size="sm"
                 onClick={handleLogout}
               >
                 Logout
               </Button>
            ) : (
                <Button
                variant="default"
                size="sm"
                onClick={() => handleNavigation('/login')}
              >
                Login
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg text-text-primary hover:bg-muted transition-colors duration-base focus-professional"
            >
              <Icon 
                name={isMobileMenuOpen ? "X" : "Menu"} 
                size={24} 
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-card border-t border-border shadow-floating">
            <div className="px-4 py-4 space-y-2">
              {navigationItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-all duration-base ${isActivePath(item?.path) ? 'bg-primary text-primary-foreground' : 'text-text-primary hover:bg-muted'}`}>
                  <Icon 
                    name={item?.icon} 
                    size={20} 
                    className={isActivePath(item?.path) ? 'text-primary-foreground' : 'text-text-secondary'}
                  />
                  <span>{item?.name}</span>
                </button>
              ))}
              
              <div className="border-t border-border pt-2 mt-4">
                {moreMenuItems?.map((item) => (
                  <button
                    key={item?.path}
                    onClick={() => handleNavigation(item?.path)}
                    className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-sm text-text-primary hover:bg-muted transition-colors duration-base"
                  >
                    <Icon name={item?.icon} size={20} className="text-text-secondary" />
                    <span>{item?.name}</span>
                  </button>
                ))}
              </div>
              
              <div className="border-t border-border pt-4 mt-4 space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Bell"
                  iconPosition="left"
                  fullWidth
                  className="relative"
                >
                  Notifications
                  <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full"></span>
                </Button>
                
                <Button
                  variant="default"
                  size="sm"
                  iconName="Plus"
                  iconPosition="left"
                  fullWidth
                  onClick={() => handleNavigation('/opportunity-explorer')}
                >
                  Explore Opportunities
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
