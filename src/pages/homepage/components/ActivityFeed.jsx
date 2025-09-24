import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = () => {
  const [activities, setActivities] = useState([]);
  const [isVisible, setIsVisible] = useState(true);

  const activityTypes = [
    {
      type: 'job_application',
      icon: 'Briefcase',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      templates: [
        'Someone just applied to a Senior Developer position at TechCorp',
        'A Marketing Manager role received 5 new applications',
        'Someone landed a Product Manager position with 40% salary increase',
        'A UX Designer just got hired at a Fortune 500 company'
      ]
    },
    {
      type: 'marketing_project',
      icon: 'TrendingUp',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      templates: [
        'A marketing campaign just achieved 300% ROI',
        'Someone completed a $50K digital marketing project',
        'A new marketing agency joined with 5-star rating',
        'A social media campaign reached 1M impressions'
      ]
    },
    {
      type: 'real_estate',
      icon: 'Home',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      templates: [
        'A property just sold for $150K above asking price',
        'Someone found their dream home in under 2 weeks',
        'A real estate investment generated 25% annual return',
        'A new luxury listing just went live in downtown'
      ]
    },
    {
      type: 'profile_completion',
      icon: 'User',
      color: 'text-success',
      bgColor: 'bg-success/10',
      templates: [
        'Someone just completed their professional profile',
        'A user earned a new skill verification badge',
        'Someone updated their portfolio with 3 new projects',
        'A professional just received 10+ profile views'
      ]
    },
    {
      type: 'networking',
      icon: 'Users',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      templates: [
        'Two professionals just connected for a collaboration',
        'Someone joined a new industry networking group',
        'A mentorship match was successfully made',
        'Someone attended a virtual networking event'
      ]
    }
  ];

  const generateRandomActivity = () => {
    const randomType = activityTypes?.[Math.floor(Math.random() * activityTypes?.length)];
    const randomTemplate = randomType?.templates?.[Math.floor(Math.random() * randomType?.templates?.length)];
    
    return {
      id: Date.now() + Math.random(),
      type: randomType?.type,
      icon: randomType?.icon,
      color: randomType?.color,
      bgColor: randomType?.bgColor,
      message: randomTemplate,
      timestamp: new Date(),
      location: getRandomLocation()
    };
  };

  const getRandomLocation = () => {
    const locations = [
      'New York, NY', 'San Francisco, CA', 'Austin, TX', 'Seattle, WA',
      'Chicago, IL', 'Boston, MA', 'Denver, CO', 'Atlanta, GA',
      'Los Angeles, CA', 'Miami, FL', 'Portland, OR', 'Nashville, TN'
    ];
    return locations?.[Math.floor(Math.random() * locations?.length)];
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - timestamp) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  useEffect(() => {
    // Initialize with some activities
    const initialActivities = Array.from({ length: 5 }, () => {
      const activity = generateRandomActivity();
      activity.timestamp = new Date(Date.now() - Math.random() * 3600000); // Random time within last hour
      return activity;
    });
    setActivities(initialActivities);

    // Add new activities periodically
    const interval = setInterval(() => {
      const newActivity = generateRandomActivity();
      setActivities(prev => [newActivity, ...prev?.slice(0, 9)]); // Keep only 10 most recent
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <section className="section-spacing bg-background">
      <div className="container-professional">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-value-prop text-primary mb-2">
              Live Platform Activity
            </h2>
            <p className="text-text-secondary">
              Real-time success stories from our professional community
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-opportunity-pulse"></div>
              <span className="text-sm text-text-secondary">Live</span>
            </div>
            
            <button
              onClick={() => setIsVisible(false)}
              className="p-2 rounded-lg hover:bg-muted transition-colors duration-base focus-professional"
            >
              <Icon name="X" size={16} className="text-text-secondary" />
            </button>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-xl border border-border shadow-professional overflow-hidden">
            <div className="p-6 border-b border-border">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Icon name="Activity" size={16} color="white" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary">Platform Pulse</h3>
                  <p className="text-sm text-text-secondary">Latest professional achievements</p>
                </div>
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto scrollbar-professional">
              {activities?.map((activity, index) => (
                <div
                  key={activity?.id}
                  className={`p-4 border-b border-border last:border-b-0 hover:bg-muted/30 transition-all duration-base ${
                    index === 0 ? 'animate-professional-slide' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${activity?.bgColor} flex-shrink-0`}>
                      <Icon 
                        name={activity?.icon} 
                        size={18} 
                        className={activity?.color}
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-text-primary leading-relaxed">
                        {activity?.message}
                      </p>
                      
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-1">
                          <Icon name="MapPin" size={12} className="text-text-secondary" />
                          <span className="text-xs text-text-secondary">{activity?.location}</span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <Icon name="Clock" size={12} className="text-text-secondary" />
                          <span className="text-xs text-text-secondary">{getTimeAgo(activity?.timestamp)}</span>
                        </div>
                      </div>
                    </div>

                    {index === 0 && (
                      <div className="flex-shrink-0">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                          New
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-muted/30 border-t border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name="Users" size={16} className="text-text-secondary" />
                  <span className="text-sm text-text-secondary">
                    {Math.floor(Math.random() * 500) + 1200} professionals active now
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 text-xs text-text-secondary">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Jobs</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span>Marketing</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>Real Estate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {(Math.floor(Math.random() * 50) + 150)?.toLocaleString()}
            </div>
            <div className="text-sm text-text-secondary">Daily Connections</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary mb-1">
              {(Math.floor(Math.random() * 20) + 80)?.toLocaleString()}
            </div>
            <div className="text-sm text-text-secondary">Projects Started</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-accent mb-1">
              ${(Math.floor(Math.random() * 500) + 2000)?.toLocaleString()}K
            </div>
            <div className="text-sm text-text-secondary">Deals Closed</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-success mb-1">
              {Math.floor(Math.random() * 10) + 95}%
            </div>
            <div className="text-sm text-text-secondary">Success Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActivityFeed;