import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationsWidget = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'job_application',
      title: 'Application Status Update',
      message: 'Your application for Senior React Developer at TechCorp has been reviewed',
      timestamp: '2025-09-24T16:45:00Z',
      read: false,
      priority: 'high',
      icon: 'Briefcase',
      color: 'text-blue-600'
    },
    {
      id: 2,
      type: 'marketing_inquiry',
      title: 'New Client Inquiry',
      message: 'Local Restaurant Chain is interested in your digital marketing services',
      timestamp: '2025-09-24T15:30:00Z',
      read: false,
      priority: 'medium',
      icon: 'MessageSquare',
      color: 'text-green-600'
    },
    {
      id: 3,
      type: 'realestate_alert',
      title: 'Property Price Alert',
      message: 'Downtown Condo prices dropped 5% - Investment opportunity detected',
      timestamp: '2025-09-24T14:20:00Z',
      read: true,
      priority: 'medium',
      icon: 'Home',
      color: 'text-orange-600'
    },
    {
      id: 4,
      type: 'system',
      title: 'Profile Completion',
      message: 'Complete your professional profile to increase visibility by 40%',
      timestamp: '2025-09-24T13:15:00Z',
      read: true,
      priority: 'low',
      icon: 'User',
      color: 'text-purple-600'
    },
    {
      id: 5,
      type: 'network',
      title: 'New Connection Request',
      message: 'Sarah Johnson (Marketing Director at StartupXYZ) wants to connect',
      timestamp: '2025-09-24T12:45:00Z',
      read: false,
      priority: 'medium',
      icon: 'Users',
      color: 'text-indigo-600'
    }
  ]);

  const [filter, setFilter] = useState('all');

  const filterOptions = [
    { value: 'all', label: 'All', count: notifications?.length },
    { value: 'unread', label: 'Unread', count: notifications?.filter(n => !n?.read)?.length },
    { value: 'high', label: 'Priority', count: notifications?.filter(n => n?.priority === 'high')?.length }
  ];

  const filteredNotifications = notifications?.filter(notification => {
    if (filter === 'unread') return !notification?.read;
    if (filter === 'high') return notification?.priority === 'high';
    return true;
  });

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev?.map(notification => 
        notification?.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev?.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev?.filter(notification => notification?.id !== id));
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      high: { color: 'bg-red-100 text-red-800', text: 'High' },
      medium: { color: 'bg-yellow-100 text-yellow-800', text: 'Medium' },
      low: { color: 'bg-gray-100 text-gray-800', text: 'Low' }
    };

    const config = priorityConfig?.[priority] || priorityConfig?.low;
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config?.color}`}>
        {config?.text}
      </span>
    );
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <h2 className="text-xl font-semibold text-text-primary">
            Notifications
          </h2>
          {notifications?.filter(n => !n?.read)?.length > 0 && (
            <span className="px-2 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full">
              {notifications?.filter(n => !n?.read)?.length}
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="CheckCheck"
            onClick={markAllAsRead}
            className="text-text-secondary"
          />
          <Button
            variant="ghost"
            size="sm"
            iconName="Settings"
            className="text-text-secondary"
          />
        </div>
      </div>
      {/* Filter Tabs */}
      <div className="flex space-x-1 mb-6">
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
            <span>{option?.label}</span>
            {option?.count > 0 && (
              <span className={`px-1.5 py-0.5 text-xs rounded-full ${
                filter === option?.value
                  ? 'bg-primary-foreground/20 text-primary-foreground'
                  : 'bg-text-secondary/20 text-text-secondary'
              }`}>
                {option?.count}
              </span>
            )}
          </button>
        ))}
      </div>
      {/* Notifications List */}
      <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-professional">
        {filteredNotifications?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Bell" size={48} className="text-text-secondary mx-auto mb-3" />
            <p className="text-text-secondary">No notifications to show</p>
          </div>
        ) : (
          filteredNotifications?.map((notification) => (
            <div
              key={notification?.id}
              className={`p-4 rounded-lg border transition-all duration-base hover:border-primary/20 ${
                notification?.read 
                  ? 'border-border bg-card' :'border-primary/20 bg-primary/5'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${notification?.color}`}>
                  <Icon name={notification?.icon} size={20} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className={`font-medium text-sm ${
                          notification?.read ? 'text-text-secondary' : 'text-text-primary'
                        }`}>
                          {notification?.title}
                        </h3>
                        {!notification?.read && (
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                        )}
                      </div>
                      <p className={`text-sm leading-relaxed ${
                        notification?.read ? 'text-text-secondary' : 'text-text-primary'
                      }`}>
                        {notification?.message}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      {getPriorityBadge(notification?.priority)}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-secondary">
                      {formatTimestamp(notification?.timestamp)}
                    </span>
                    
                    <div className="flex items-center space-x-1">
                      {!notification?.read && (
                        <button
                          onClick={() => markAsRead(notification?.id)}
                          className="p-1 rounded-lg hover:bg-muted transition-colors duration-base"
                          title="Mark as read"
                        >
                          <Icon name="Check" size={14} className="text-text-secondary" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification?.id)}
                        className="p-1 rounded-lg hover:bg-muted transition-colors duration-base"
                        title="Delete notification"
                      >
                        <Icon name="X" size={14} className="text-text-secondary" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {filteredNotifications?.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            iconName="ArrowRight"
            iconPosition="right"
            fullWidth
          >
            View All Notifications
          </Button>
        </div>
      )}
    </div>
  );
};

export default NotificationsWidget;