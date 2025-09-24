import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIInsights = ({ userProfile, searchQuery, opportunities }) => {
  const [activeTab, setActiveTab] = useState('recommendations');
  const [isExpanded, setIsExpanded] = useState(true);

  // Mock AI insights data
  const insights = {
    recommendations: [
      {
        id: 1,
        type: 'cross-vertical',
        title: 'Marketing Skills + Real Estate = High ROI',
        description: `Based on your marketing background, consider real estate marketing services. Properties in your area show 40% higher engagement with professional marketing.`,
        confidence: 92,
        action: 'Explore real estate marketing opportunities',
        icon: 'TrendingUp',
        color: 'text-green-600 bg-green-50'
      },
      {
        id: 2,
        type: 'skill-gap',
        title: 'React + Node.js = 35% Salary Boost',
        description: `Adding Node.js to your React skills could increase your salary potential by $25,000-$35,000 based on current market data.`,
        confidence: 88,
        action: 'View Node.js learning resources',
        icon: 'BookOpen',
        color: 'text-blue-600 bg-blue-50'
      },
      {
        id: 3,
        type: 'market-timing',
        title: 'Remote Work Demand Peak',
        description: `Remote opportunities in your field increased 150% this month. Your profile matches 23 high-priority remote positions.`,
        confidence: 95,
        action: 'Filter for remote opportunities',
        icon: 'Wifi',
        color: 'text-purple-600 bg-purple-50'
      }
    ],
    marketTrends: [
      {
        trend: 'React Developer Demand',
        change: '+23%',
        period: 'Last 30 days',
        impact: 'High',
        description: 'Companies are actively hiring React developers with 3+ years experience'
      },
      {
        trend: 'Digital Marketing ROI',
        change: '+18%',
        period: 'This quarter',
        impact: 'Medium',
        description: 'Small businesses increasing digital marketing budgets by average 40%'
      },
      {
        trend: 'Real Estate Investment',
        change: '+12%',
        period: 'This month',
        impact: 'High',
        description: 'Commercial properties showing strong returns in tech hubs'
      }
    ],
    careerPath: {
      current: 'Mid-Level Developer',
      next: 'Senior Full-Stack Developer',
      timeline: '12-18 months',
      requirements: [
        'Node.js proficiency',
        'System design knowledge',
        'Team leadership experience'
      ],
      salaryIncrease: '$15,000 - $25,000'
    },
    opportunityScore: {
      jobs: { score: 85, trend: 'up', count: 47 },
      marketing: { score: 72, trend: 'up', count: 23 },
      realEstate: { score: 68, trend: 'stable', count: 15 }
    }
  };

  const tabs = [
    { id: 'recommendations', label: 'AI Recommendations', icon: 'Brain' },
    { id: 'trends', label: 'Market Trends', icon: 'TrendingUp' },
    { id: 'career', label: 'Career Path', icon: 'Route' },
    { id: 'scores', label: 'Opportunity Scores', icon: 'Target' }
  ];

  const renderRecommendations = () => (
    <div className="space-y-4">
      {insights?.recommendations?.map((rec) => (
        <div key={rec?.id} className="p-4 border border-border rounded-lg hover:shadow-professional transition-all duration-base">
          <div className="flex items-start space-x-3">
            <div className={`p-2 rounded-lg ${rec?.color}`}>
              <Icon name={rec?.icon} size={20} />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-text-primary">{rec?.title}</h4>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-text-secondary">Confidence</span>
                  <span className="text-sm font-medium text-primary">{rec?.confidence}%</span>
                </div>
              </div>
              
              <p className="text-sm text-text-secondary mb-3">{rec?.description}</p>
              
              <Button variant="outline" size="sm" iconName="ArrowRight" iconPosition="right">
                {rec?.action}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTrends = () => (
    <div className="space-y-4">
      {insights?.marketTrends?.map((trend, index) => (
        <div key={index} className="p-4 border border-border rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-text-primary">{trend?.trend}</h4>
            <div className="flex items-center space-x-2">
              <span className={`text-lg font-bold ${trend?.change?.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {trend?.change}
              </span>
              <Icon 
                name={trend?.change?.startsWith('+') ? 'TrendingUp' : 'TrendingDown'} 
                size={16} 
                className={trend?.change?.startsWith('+') ? 'text-green-600' : 'text-red-600'}
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-text-secondary mb-2">
            <span>{trend?.period}</span>
            <span className={`px-2 py-1 rounded-full text-xs ${
              trend?.impact === 'High' ? 'bg-red-100 text-red-700' :
              trend?.impact === 'Medium'? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
            }`}>
              {trend?.impact} Impact
            </span>
          </div>
          
          <p className="text-sm text-text-secondary">{trend?.description}</p>
        </div>
      ))}
    </div>
  );

  const renderCareerPath = () => (
    <div className="space-y-6">
      <div className="p-4 border border-border rounded-lg bg-gradient-to-r from-primary/5 to-secondary/5">
        <h4 className="font-semibold text-text-primary mb-4">Your Career Progression</h4>
        
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-sm font-medium text-text-primary">{insights?.careerPath?.current}</span>
          </div>
          
          <div className="flex-1 h-px bg-border relative">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background px-2">
              <Icon name="ArrowRight" size={16} className="text-text-secondary" />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-secondary rounded-full"></div>
            <span className="text-sm font-medium text-text-primary">{insights?.careerPath?.next}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h5 className="text-sm font-medium text-text-primary mb-2">Timeline</h5>
            <p className="text-sm text-text-secondary">{insights?.careerPath?.timeline}</p>
          </div>
          
          <div>
            <h5 className="text-sm font-medium text-text-primary mb-2">Salary Increase</h5>
            <p className="text-sm font-semibold text-green-600">{insights?.careerPath?.salaryIncrease}</p>
          </div>
        </div>
      </div>
      
      <div className="p-4 border border-border rounded-lg">
        <h5 className="font-medium text-text-primary mb-3">Required Skills & Experience</h5>
        <div className="space-y-2">
          {insights?.careerPath?.requirements?.map((req, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-green-600" />
              <span className="text-sm text-text-secondary">{req}</span>
            </div>
          ))}
        </div>
        
        <Button variant="default" size="sm" className="mt-4" iconName="BookOpen" iconPosition="left">
          View Learning Path
        </Button>
      </div>
    </div>
  );

  const renderScores = () => (
    <div className="space-y-4">
      {Object.entries(insights?.opportunityScore)?.map(([vertical, data]) => (
        <div key={vertical} className="p-4 border border-border rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <Icon 
                name={vertical === 'jobs' ? 'Briefcase' : vertical === 'marketing' ? 'Megaphone' : 'Home'} 
                size={20} 
                className="text-primary"
              />
              <h4 className="font-semibold text-text-primary capitalize">
                {vertical === 'realEstate' ? 'Real Estate' : vertical}
              </h4>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-primary">{data?.score}</span>
              <Icon 
                name={data?.trend === 'up' ? 'TrendingUp' : data?.trend === 'down' ? 'TrendingDown' : 'Minus'} 
                size={16} 
                className={
                  data?.trend === 'up' ? 'text-green-600' : 
                  data?.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                }
              />
            </div>
          </div>
          
          <div className="w-full bg-muted rounded-full h-2 mb-2">
            <div 
              className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-slow"
              style={{ width: `${data?.score}%` }}
            ></div>
          </div>
          
          <p className="text-sm text-text-secondary">
            {data?.count} matching opportunities found
          </p>
        </div>
      ))}
    </div>
  );

  if (!isExpanded) {
    return (
      <div className="bg-card border border-border rounded-lg shadow-professional">
        <button
          onClick={() => setIsExpanded(true)}
          className="flex items-center justify-between w-full p-4 hover:bg-muted transition-colors duration-base"
        >
          <div className="flex items-center space-x-3">
            <Icon name="Brain" size={20} className="text-primary" />
            <span className="font-semibold text-text-primary">AI Insights</span>
            <span className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded-full">
              3 new insights
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
          <Icon name="Brain" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">AI Insights</h3>
          <span className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded-full">
            Powered by ML
          </span>
        </div>
        
        <button
          onClick={() => setIsExpanded(false)}
          className="p-1 rounded-lg hover:bg-muted transition-colors duration-base"
        >
          <Icon name="ChevronUp" size={20} className="text-text-secondary" />
        </button>
      </div>
      {/* Tabs */}
      <div className="flex border-b border-border">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-colors duration-base ${
              activeTab === tab?.id
                ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-text-secondary hover:text-text-primary hover:bg-muted'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span className="hidden sm:inline">{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Content */}
      <div className="p-4">
        {activeTab === 'recommendations' && renderRecommendations()}
        {activeTab === 'trends' && renderTrends()}
        {activeTab === 'career' && renderCareerPath()}
        {activeTab === 'scores' && renderScores()}
      </div>
    </div>
  );
};

export default AIInsights;