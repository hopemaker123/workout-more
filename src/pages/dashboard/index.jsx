import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import DashboardHeader from './components/DashboardHeader';
import QuickActionsWidget from './components/QuickActionsWidget';
import ActivityFeedWidget from './components/ActivityFeedWidget';
import PerformanceChartsWidget from './components/PerformanceChartsWidget';
import OpportunityInsightsWidget from './components/OpportunityInsightsWidget';
import NotificationsWidget from './components/NotificationsWidget';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [dashboardLayout, setDashboardLayout] = useState('default');
  const [isCustomizing, setIsCustomizing] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check for language preference and view parameter
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }

    // Check for view parameter in URL
    const urlParams = new URLSearchParams(location.search);
    const view = urlParams?.get('view');
    if (view === 'analytics') {
      setDashboardLayout('analytics-focused');
    }
  }, [location]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleCustomization = () => {
    setIsCustomizing(!isCustomizing);
  };

  const layoutOptions = [
    { id: 'default', name: 'Default Layout', icon: 'LayoutGrid' },
    { id: 'analytics-focused', name: 'Analytics Focus', icon: 'BarChart3' },
    { id: 'activity-focused', name: 'Activity Focus', icon: 'Activity' },
    { id: 'opportunities-focused', name: 'Opportunities Focus', icon: 'Target' }
  ];

  const renderDashboardContent = () => {
    switch (dashboardLayout) {
      case 'analytics-focused':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <PerformanceChartsWidget />
              </div>
              <div className="space-y-6">
                <QuickActionsWidget />
                <NotificationsWidget />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <OpportunityInsightsWidget />
              <ActivityFeedWidget />
            </div>
          </div>
        );

      case 'activity-focused':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <ActivityFeedWidget />
              </div>
              <div className="space-y-6">
                <NotificationsWidget />
                <QuickActionsWidget />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PerformanceChartsWidget />
              <OpportunityInsightsWidget />
            </div>
          </div>
        );

      case 'opportunities-focused':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <OpportunityInsightsWidget />
              </div>
              <div className="space-y-6">
                <QuickActionsWidget />
                <NotificationsWidget />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ActivityFeedWidget />
              <PerformanceChartsWidget />
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            {/* Top Row - Quick Actions */}
            <QuickActionsWidget />
            
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Left Column - Main Widgets */}
              <div className="xl:col-span-2 space-y-6">
                <PerformanceChartsWidget />
                <ActivityFeedWidget />
              </div>
              
              {/* Right Column - Secondary Widgets */}
              <div className="space-y-6">
                <OpportunityInsightsWidget />
                <NotificationsWidget />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggleCollapse={toggleSidebar}
      />
      <main className={`transition-all duration-base ${
        sidebarCollapsed ? 'ml-16' : 'ml-64'
      } pt-16`}>
        <div className="container-professional section-spacing">
          {/* Dashboard Header */}
          <DashboardHeader />
          
          {/* Customization Panel */}
          {isCustomizing && (
            <div className="bg-card rounded-xl border border-border p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-text-primary">
                  Customize Dashboard
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={toggleCustomization}
                />
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {layoutOptions?.map((layout) => (
                  <button
                    key={layout?.id}
                    onClick={() => setDashboardLayout(layout?.id)}
                    className={`p-4 rounded-lg border transition-all duration-base ${
                      dashboardLayout === layout?.id
                        ? 'border-primary bg-primary/5' :'border-border hover:border-primary/20 hover:bg-muted/50'
                    }`}
                  >
                    <Icon 
                      name={layout?.icon} 
                      size={24} 
                      className={`mx-auto mb-2 ${
                        dashboardLayout === layout?.id ? 'text-primary' : 'text-text-secondary'
                      }`}
                    />
                    <p className={`text-sm font-medium ${
                      dashboardLayout === layout?.id ? 'text-primary' : 'text-text-primary'
                    }`}>
                      {layout?.name}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Floating Customization Button */}
          <button
            onClick={toggleCustomization}
            className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-floating hover:shadow-xl hover:scale-110 transition-all duration-base focus-professional z-50"
            title="Customize Dashboard"
          >
            <Icon name="Settings" size={24} className="mx-auto" />
          </button>
          
          {/* Dashboard Content */}
          {renderDashboardContent()}
          
          {/* Cross-Vertical Quick Links */}
          <div className="mt-12 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Cross-Vertical Navigation
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              <Button
                variant="outline"
                size="sm"
                iconName="Search"
                iconPosition="left"
                onClick={() => navigate('/opportunity-explorer')}
                className="justify-start"
              >
                Explore Opportunities
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="User"
                iconPosition="left"
                onClick={() => navigate('/professional-profile')}
                className="justify-start"
              >
                Professional Profile
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Store"
                iconPosition="left"
                onClick={() => navigate('/services-marketplace')}
                className="justify-start"
              >
                Services Marketplace
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="BookOpen"
                iconPosition="left"
                onClick={() => navigate('/resource-library')}
                className="justify-start"
              >
                Resource Library
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Globe"
                iconPosition="left"
                onClick={() => navigate('/homepage')}
                className="justify-start"
              >
                Homepage
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;