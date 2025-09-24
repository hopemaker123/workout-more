import React from 'react';
import Icon from '../../../components/AppIcon';

const VerticalTabs = ({ activeTab, onTabChange, tabs }) => {
  return (
    <div className="bg-card rounded-xl shadow-professional border border-border p-6">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Profile Sections</h3>
      <div className="space-y-2">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => onTabChange(tab?.id)}
            className={`flex items-center space-x-3 w-full p-3 rounded-lg text-left transition-all duration-base ${
              activeTab === tab?.id
                ? 'bg-primary text-primary-foreground shadow-professional'
                : 'text-text-primary hover:bg-muted hover:text-primary'
            }`}
          >
            <Icon 
              name={tab?.icon} 
              size={20} 
              className={activeTab === tab?.id ? 'text-primary-foreground' : 'text-text-secondary'}
            />
            <div className="flex-1">
              <div className="font-medium">{tab?.name}</div>
              {tab?.description && (
                <div className={`text-xs ${
                  activeTab === tab?.id ? 'text-primary-foreground/80' : 'text-text-secondary'
                }`}>
                  {tab?.description}
                </div>
              )}
            </div>
            {tab?.badge && (
              <span className={`px-2 py-1 text-xs rounded-full ${
                tab?.badge === 'New' ?'bg-accent text-accent-foreground' :'bg-secondary text-secondary-foreground'
              }`}>
                {tab?.badge}
              </span>
            )}
          </button>
        ))}
      </div>
      {/* Profile Completion */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-text-primary font-medium">Profile Completion</span>
          <span className="text-primary font-semibold">85%</span>
        </div>
        
        <div className="w-full bg-muted rounded-full h-2 mb-3">
          <div 
            className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-slow"
            style={{ width: '85%' }}
          ></div>
        </div>
        
        <p className="text-xs text-text-secondary">
          Complete your profile to increase visibility and opportunities
        </p>
      </div>
    </div>
  );
};

export default VerticalTabs;