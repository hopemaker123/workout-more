import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OpportunityInsightsWidget = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('recommendations');

  const recommendations = [
    {
      id: 1,
      type: 'job',
      title: 'Senior Full Stack Developer',
      company: 'TechVision Inc.',
      location: 'San Francisco, CA',
      salary: '$120K - $150K',
      match: 95,
      description: 'Perfect match for your React and Node.js expertise',
      tags: ['React', 'Node.js', 'TypeScript', 'Remote'],
      urgent: true
    },
    {
      id: 2,
      type: 'marketing',
      title: 'Digital Marketing Campaign',
      company: 'GreenTech Solutions',
      location: 'Remote',
      budget: '$15K - $25K',
      match: 88,
      description: 'Eco-friendly startup needs comprehensive digital strategy',
      tags: ['SEO', 'Social Media', 'Content Marketing', 'Analytics'],
      urgent: false
    },
    {
      id: 3,
      type: 'realestate',
      title: 'Investment Property Opportunity',
      company: 'Prime Realty Group',
      location: 'Austin, TX',
      value: '$450K - $500K',
      match: 82,
      description: 'High-growth area with 12% annual appreciation potential',
      tags: ['Investment', 'Rental Income', 'Growth Area', 'Tax Benefits'],
      urgent: false
    }
  ];

  const crossVerticalOpportunities = [
    {
      id: 1,
      title: 'Marketing Client Needs Developer',
      description: 'Your current marketing client GreenTech Solutions is looking for a React developer for their internal team.',
      potential: '$8K referral bonus',
      action: 'Introduce yourself',
      icon: 'ArrowRightLeft',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      title: 'Real Estate Contact Needs Marketing',
      description: 'Prime Realty Group could benefit from your digital marketing services for their new property launches.',
      potential: '$12K project value',
      action: 'Send proposal',
      icon: 'Zap',
      color: 'bg-green-500'
    },
    {
      id: 3,
      title: 'Job Network Expansion',
      description: 'TechVision Inc. employees are active in Austin real estate market - networking opportunity.',
      potential: 'Network growth',
      action: 'Connect on LinkedIn',
      icon: 'Users',
      color: 'bg-purple-500'
    }
  ];

  const marketTrends = [
    {
      vertical: 'Jobs',
      trend: 'up',
      change: '+15%',
      insight: 'React developer demand increased significantly this month',
      icon: 'TrendingUp',
      color: 'text-green-600'
    },
    {
      vertical: 'Marketing',
      trend: 'up',
      change: '+8%',
      insight: 'Small business digital marketing budgets growing',
      icon: 'TrendingUp',
      color: 'text-green-600'
    },
    {
      vertical: 'Real Estate',
      trend: 'down',
      change: '-3%',
      insight: 'Seasonal slowdown expected, but investment opportunities remain',
      icon: 'TrendingDown',
      color: 'text-orange-600'
    }
  ];

  const tabs = [
    { id: 'recommendations', label: 'AI Recommendations', icon: 'Target' },
    { id: 'cross-vertical', label: 'Cross-Vertical', icon: 'ArrowRightLeft' },
    { id: 'trends', label: 'Market Trends', icon: 'TrendingUp' }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'job': return 'Briefcase';
      case 'marketing': return 'Megaphone';
      case 'realestate': return 'Home';
      default: return 'Circle';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'job': return 'text-blue-600';
      case 'marketing': return 'text-green-600';
      case 'realestate': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const handleOpportunityClick = (opportunity) => {
    if (opportunity?.type === 'job') {
      navigate('/opportunity-explorer?type=jobs');
    } else if (opportunity?.type === 'marketing') {
      navigate('/services-marketplace?category=marketing');
    } else if (opportunity?.type === 'realestate') {
      navigate('/services-marketplace?category=realestate');
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">
          Opportunity Insights
        </h2>
        <Button
          variant="ghost"
          size="sm"
          iconName="Settings"
          className="text-text-secondary"
        />
      </div>
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-base ${
              activeTab === tab?.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-text-secondary hover:bg-muted/80 hover:text-text-primary'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span>{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="space-y-4">
        {activeTab === 'recommendations' && (
          <div className="space-y-4">
            {recommendations?.map((opportunity) => (
              <div
                key={opportunity?.id}
                className="p-4 rounded-lg border border-border hover:border-primary/20 hover:bg-muted/30 transition-all duration-base cursor-pointer"
                onClick={() => handleOpportunityClick(opportunity)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${getTypeColor(opportunity?.type)}`}>
                      <Icon name={getTypeIcon(opportunity?.type)} size={20} />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium text-text-primary">
                          {opportunity?.title}
                        </h3>
                        {opportunity?.urgent && (
                          <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                            Urgent
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-text-secondary">
                        {opportunity?.company} • {opportunity?.location}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium text-primary">
                        {opportunity?.match}% match
                      </span>
                      <div className="w-12 h-2 bg-muted rounded-full">
                        <div 
                          className="h-2 bg-primary rounded-full"
                          style={{ width: `${opportunity?.match}%` }}
                        ></div>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-text-primary">
                      {opportunity?.salary || opportunity?.budget || opportunity?.value}
                    </p>
                  </div>
                </div>
                
                <p className="text-sm text-text-secondary mb-3">
                  {opportunity?.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {opportunity?.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-muted text-text-secondary rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'cross-vertical' && (
          <div className="space-y-4">
            {crossVerticalOpportunities?.map((opportunity) => (
              <div
                key={opportunity?.id}
                className="p-4 rounded-lg border border-border hover:border-primary/20 hover:bg-muted/30 transition-all duration-base"
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-10 h-10 ${opportunity?.color} rounded-lg flex items-center justify-center`}>
                    <Icon name={opportunity?.icon} size={20} color="white" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-text-primary mb-2">
                      {opportunity?.title}
                    </h3>
                    <p className="text-sm text-text-secondary mb-3">
                      {opportunity?.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-accent">
                        {opportunity?.potential}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="ArrowRight"
                        iconPosition="right"
                      >
                        {opportunity?.action}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'trends' && (
          <div className="space-y-4">
            {marketTrends?.map((trend, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border border-border"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Icon name={trend?.icon} size={20} className={trend?.color} />
                    <h3 className="font-medium text-text-primary">
                      {trend?.vertical}
                    </h3>
                  </div>
                  <span className={`text-lg font-bold ${trend?.color}`}>
                    {trend?.change}
                  </span>
                </div>
                <p className="text-sm text-text-secondary">
                  {trend?.insight}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <Button
          variant="default"
          size="sm"
          iconName="Search"
          iconPosition="left"
          fullWidth
          onClick={() => navigate('/opportunity-explorer')}
        >
          Explore All Opportunities
        </Button>
      </div>
    </div>
  );
};

export default OpportunityInsightsWidget;