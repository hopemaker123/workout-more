import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { fetchActivityFeed } from '../../../utils/api';

const ActivityFeedWidget = () => {
  const [filter, setFilter] = useState('all');
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const getActivities = async () => {
      try {
        const activityData = await fetchActivityFeed();
        setActivities(activityData);
      } catch (error) {
        console.error("Error fetching activity feed:", error);
      }
    };

    getActivities();
  }, []);

  const filterOptions = [
    { value: 'all', label: 'All Activities', icon: 'Activity' },
    { value: 'job', label: 'Jobs', icon: 'Briefcase' },
    { value: 'marketing', label: 'Marketing', icon: 'Megaphone' },
    { value: 'realestate', label: 'Real Estate', icon: 'Home' }
  ];

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities?.filter(activity => activity?.type === filter);

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', text: 'Pending' },
      success: { color: 'bg-green-100 text-green-800', text: 'Success' },
      new: { color: 'bg-blue-100 text-blue-800', text: 'New' },
      scheduled: { color: 'bg-purple-100 text-purple-800', text: 'Scheduled' },
      sent: { color: 'bg-indigo-100 text-indigo-800', text: 'Sent' },
      completed: { color: 'bg-teal-100 text-teal-800', text: 'Completed' }
    };

    const config = statusConfig?.[status] || statusConfig?.pending;
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config?.color}`}>
        {config?.text}
      </span>
    );
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Recent Activity</h2>
        <Button
          variant="ghost"
          size="sm"
          iconName="RefreshCw"
          className="text-text-secondary"
        />
      </div>
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filterOptions?.map((option) => (
          <button
            key={option?.value}
            onClick={() => setFilter(option?.value)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-base ${
              filter === option?.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-text-secondary hover:bg-muted/80 hover:text-text-primary'
            }`}
          >
            <Icon name={option?.icon} size={16} />
            <span>{option?.label}</span>
          </button>
        ))}
      </div>
      {/* Activity List */}
      <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-professional">
        {filteredActivities.length > 0 ? filteredActivities?.map((activity) => (
          <div
            key={activity?.id}
            className="flex items-start space-x-4 p-4 rounded-lg border border-border hover:border-primary/20 hover:bg-muted/30 transition-all duration-base"
          >
            <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${activity?.color}`}>
              <Icon name={activity?.icon} size={20} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-text-primary text-sm mb-1">
                    {activity?.title}
                  </h3>
                  <p className="text-text-secondary text-xs leading-relaxed">
                    {activity?.description}
                  </p>
                </div>
                <div className="flex flex-col items-end space-y-2 ml-4">
                  {getStatusBadge(activity?.status)}
                  <span className="text-xs text-text-secondary">
                    {formatTimestamp(activity?.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )) : <p>No activities to display. Please make sure the database is running and accessible.</p>}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          iconName="ArrowRight"
          iconPosition="right"
          fullWidth
        >
          View All Activities
        </Button>
      </div>
    </div>
  );
};

export default ActivityFeedWidget;