import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsWidget = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 'find-jobs',
      title: 'Find Jobs',
      description: 'Explore new opportunities',
      icon: 'Search',
      color: 'bg-blue-500',
      action: () => navigate('/opportunity-explorer?type=jobs')
    },
    {
      id: 'create-campaign',
      title: 'New Campaign',
      description: 'Launch marketing project',
      icon: 'Megaphone',
      color: 'bg-green-500',
      action: () => navigate('/services-marketplace?action=create-campaign')
    },
    {
      id: 'list-property',
      title: 'List Property',
      description: 'Add real estate listing',
      icon: 'Home',
      color: 'bg-orange-500',
      action: () => navigate('/services-marketplace?action=list-property')
    },
    {
      id: 'update-profile',
      title: 'Update Profile',
      description: 'Enhance your presence',
      icon: 'User',
      color: 'bg-purple-500',
      action: () => navigate('/professional-profile')
    },
    {
      id: 'view-analytics',
      title: 'View Analytics',
      description: 'Check performance',
      icon: 'BarChart3',
      color: 'bg-indigo-500',
      action: () => navigate('/dashboard?view=analytics')
    },
    {
      id: 'network',
      title: 'Network',
      description: 'Connect with professionals',
      icon: 'Users',
      color: 'bg-pink-500',
      action: () => navigate('/professional-profile?tab=network')
    }
  ];

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Quick Actions</h2>
        <Button
          variant="ghost"
          size="sm"
          iconName="MoreHorizontal"
          className="text-text-secondary"
        />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActions?.map((action) => (
          <button
            key={action?.id}
            onClick={action?.action}
            className="group p-4 rounded-lg border border-border hover:border-primary/20 hover:bg-muted/50 transition-all duration-base focus-professional"
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div className={`w-12 h-12 ${action?.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-base`}>
                <Icon name={action?.icon} size={24} color="white" />
              </div>
              <div>
                <h3 className="font-medium text-text-primary text-sm group-hover:text-primary transition-colors duration-base">
                  {action?.title}
                </h3>
                <p className="text-xs text-text-secondary mt-1">
                  {action?.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsWidget;