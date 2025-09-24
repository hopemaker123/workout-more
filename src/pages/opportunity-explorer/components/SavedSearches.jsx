import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SavedSearches = ({ onLoadSearch, onDeleteSearch, onCreateAlert }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Mock saved searches data
  const savedSearches = [
    {
      id: 1,
      name: 'Remote React Developer',
      query: 'React Developer',
      filters: {
        vertical: 'jobs',
        location: 'Remote',
        salaryRange: '100k-150k',
        experienceLevel: 'mid'
      },
      alertEnabled: true,
      lastRun: '2 hours ago',
      newResults: 5,
      createdAt: '2025-01-15'
    },
    {
      id: 2,
      name: 'Digital Marketing Services',
      query: 'Digital Marketing',
      filters: {
        vertical: 'marketing',
        serviceCategory: 'digital-marketing',
        budget: '5k-25k'
      },
      alertEnabled: false,
      lastRun: '1 day ago',
      newResults: 12,
      createdAt: '2025-01-10'
    },
    {
      id: 3,
      name: 'NYC Investment Properties',
      query: 'Investment Properties',
      filters: {
        vertical: 'real-estate',
        location: 'New York, NY',
        propertyType: 'investment',
        budget: '500k-1m'
      },
      alertEnabled: true,
      lastRun: '6 hours ago',
      newResults: 3,
      createdAt: '2025-01-08'
    },
    {
      id: 4,
      name: 'SEO Consultant Opportunities',
      query: 'SEO Consultant',
      filters: {
        vertical: 'marketing',
        serviceCategory: 'seo',
        remote: true
      },
      alertEnabled: true,
      lastRun: '4 hours ago',
      newResults: 8,
      createdAt: '2025-01-05'
    }
  ];

  const handleLoadSearch = (search) => {
    onLoadSearch(search);
  };

  const handleDeleteSearch = (searchId) => {
    onDeleteSearch(searchId);
  };

  const handleToggleAlert = (searchId, enabled) => {
    // Toggle alert functionality
    console.log(`Toggle alert for search ${searchId}: ${enabled}`);
  };

  const getVerticalIcon = (vertical) => {
    switch (vertical) {
      case 'jobs': return 'Briefcase';
      case 'marketing': return 'Megaphone';
      case 'real-estate': return 'Home';
      default: return 'Search';
    }
  };

  const getVerticalColor = (vertical) => {
    switch (vertical) {
      case 'jobs': return 'text-blue-600 bg-blue-50';
      case 'marketing': return 'text-green-600 bg-green-50';
      case 'real-estate': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  if (!isExpanded) {
    return (
      <div className="bg-card border border-border rounded-lg shadow-professional">
        <button
          onClick={() => setIsExpanded(true)}
          className="flex items-center justify-between w-full p-4 hover:bg-muted transition-colors duration-base"
        >
          <div className="flex items-center space-x-3">
            <Icon name="Bookmark" size={20} className="text-primary" />
            <span className="font-semibold text-text-primary">Saved Searches</span>
            <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
              {savedSearches?.length}
            </span>
          </div>
          <Icon name="ChevronDown" size={20} className="text-text-secondary" />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg shadow-professional">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Bookmark" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">Saved Searches</h3>
          <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
            {savedSearches?.length}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCreateModal(true)}
            iconName="Plus"
            iconPosition="left"
          >
            Save Current
          </Button>
          
          <button
            onClick={() => setIsExpanded(false)}
            className="p-1 rounded-lg hover:bg-muted transition-colors duration-base"
          >
            <Icon name="ChevronUp" size={20} className="text-text-secondary" />
          </button>
        </div>
      </div>
      {/* Saved Searches List */}
      <div className="p-4 space-y-3">
        {savedSearches?.map((search) => (
          <div
            key={search?.id}
            className="p-4 border border-border rounded-lg hover:shadow-professional transition-all duration-base"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${getVerticalColor(search?.filters?.vertical)}`}>
                  <Icon name={getVerticalIcon(search?.filters?.vertical)} size={16} />
                </div>
                
                <div className="flex-1">
                  <h4 className="font-semibold text-text-primary mb-1">{search?.name}</h4>
                  <p className="text-sm text-text-secondary mb-2">"{search?.query}"</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {search?.filters?.location && (
                      <span className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-full">
                        📍 {search?.filters?.location}
                      </span>
                    )}
                    {search?.filters?.salaryRange && (
                      <span className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-full">
                        💰 ${search?.filters?.salaryRange}
                      </span>
                    )}
                    {search?.filters?.experienceLevel && (
                      <span className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-full">
                        📊 {search?.filters?.experienceLevel}
                      </span>
                    )}
                    {search?.filters?.serviceCategory && (
                      <span className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-full">
                        🎯 {search?.filters?.serviceCategory}
                      </span>
                    )}
                    {search?.filters?.propertyType && (
                      <span className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-full">
                        🏠 {search?.filters?.propertyType}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleToggleAlert(search?.id, !search?.alertEnabled)}
                  className={`p-2 rounded-lg transition-colors duration-base ${
                    search?.alertEnabled 
                      ? 'bg-accent text-accent-foreground' 
                      : 'bg-muted text-text-secondary hover:bg-accent hover:text-accent-foreground'
                  }`}
                  title={search?.alertEnabled ? 'Disable alerts' : 'Enable alerts'}
                >
                  <Icon name="Bell" size={16} />
                </button>
                
                <button
                  onClick={() => handleDeleteSearch(search?.id)}
                  className="p-2 rounded-lg text-text-secondary hover:bg-red-50 hover:text-red-600 transition-colors duration-base"
                  title="Delete saved search"
                >
                  <Icon name="Trash2" size={16} />
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-xs text-text-secondary">
                <span>Last run: {search?.lastRun}</span>
                {search?.newResults > 0 && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full">
                    {search?.newResults} new results
                  </span>
                )}
                {search?.alertEnabled && (
                  <div className="flex items-center space-x-1">
                    <Icon name="Bell" size={12} className="text-accent" />
                    <span className="text-accent">Alerts ON</span>
                  </div>
                )}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleLoadSearch(search)}
                iconName="Play"
                iconPosition="left"
              >
                Run Search
              </Button>
            </div>
          </div>
        ))}
        
        {savedSearches?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Bookmark" size={48} className="text-text-secondary mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-text-primary mb-2">No Saved Searches</h4>
            <p className="text-text-secondary mb-4">
              Save your searches to quickly access them later and get alerts for new opportunities.
            </p>
            <Button
              variant="default"
              onClick={() => setShowCreateModal(true)}
              iconName="Plus"
              iconPosition="left"
            >
              Save Your First Search
            </Button>
          </div>
        )}
      </div>
      {/* Quick Actions */}
      <div className="border-t border-border p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">
            Manage your saved searches and alerts
          </span>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="Settings"
              iconPosition="left"
            >
              Settings
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              iconName="Download"
              iconPosition="left"
            >
              Export
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedSearches;