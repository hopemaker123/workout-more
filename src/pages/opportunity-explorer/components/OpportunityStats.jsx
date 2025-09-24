import React from 'react';
import Icon from '../../../components/AppIcon';

const OpportunityStats = ({ totalResults, searchQuery, filters, isLoading }) => {
  // Mock statistics data
  const stats = {
    total: totalResults || 1247,
    jobs: 523,
    marketing: 389,
    realEstate: 335,
    newToday: 47,
    trending: 156,
    remote: 234,
    urgent: 89
  };

  const verticalStats = [
    {
      vertical: 'jobs',
      count: stats?.jobs,
      percentage: Math.round((stats?.jobs / stats?.total) * 100),
      icon: 'Briefcase',
      color: 'text-blue-600 bg-blue-50',
      trend: '+12%',
      avgSalary: '$85,000'
    },
    {
      vertical: 'marketing',
      count: stats?.marketing,
      percentage: Math.round((stats?.marketing / stats?.total) * 100),
      icon: 'Megaphone',
      color: 'text-green-600 bg-green-50',
      trend: '+8%',
      avgBudget: '$15,000'
    },
    {
      vertical: 'real-estate',
      count: stats?.realEstate,
      percentage: Math.round((stats?.realEstate / stats?.total) * 100),
      icon: 'Home',
      color: 'text-purple-600 bg-purple-50',
      trend: '+5%',
      avgPrice: '$450,000'
    }
  ];

  const quickStats = [
    {
      label: 'New Today',
      value: stats?.newToday,
      icon: 'Plus',
      color: 'text-green-600',
      description: 'Fresh opportunities'
    },
    {
      label: 'Trending',
      value: stats?.trending,
      icon: 'TrendingUp',
      color: 'text-orange-600',
      description: 'High demand'
    },
    {
      label: 'Remote',
      value: stats?.remote,
      icon: 'Wifi',
      color: 'text-blue-600',
      description: 'Work from anywhere'
    },
    {
      label: 'Urgent',
      value: stats?.urgent,
      icon: 'Clock',
      color: 'text-red-600',
      description: 'Quick hiring'
    }
  ];

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-lg shadow-professional p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-muted rounded w-1/3"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)]?.map((_, i) => (
              <div key={i} className="h-20 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg shadow-professional">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-text-primary">
              {stats?.total?.toLocaleString()} Opportunities Found
            </h3>
            {searchQuery && (
              <p className="text-sm text-text-secondary mt-1">
                Results for "<span className="font-medium">{searchQuery}</span>"
              </p>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="BarChart3" size={20} className="text-primary" />
            <span className="text-sm text-text-secondary">Live Data</span>
          </div>
        </div>
      </div>
      {/* Quick Stats */}
      <div className="p-6 border-b border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickStats?.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center mb-2">
                <div className={`p-2 rounded-lg bg-muted ${stat?.color}`}>
                  <Icon name={stat?.icon} size={20} />
                </div>
              </div>
              <div className="text-2xl font-bold text-text-primary">{stat?.value}</div>
              <div className="text-sm font-medium text-text-primary">{stat?.label}</div>
              <div className="text-xs text-text-secondary">{stat?.description}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Vertical Breakdown */}
      <div className="p-6">
        <h4 className="text-lg font-semibold text-text-primary mb-4">Opportunities by Category</h4>
        
        <div className="space-y-4">
          {verticalStats?.map((vertical) => (
            <div key={vertical?.vertical} className="flex items-center space-x-4">
              <div className={`p-2 rounded-lg ${vertical?.color}`}>
                <Icon name={vertical?.icon} size={20} />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-text-primary capitalize">
                    {vertical?.vertical === 'real-estate' ? 'Real Estate' : vertical?.vertical}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-text-primary">
                      {vertical?.count?.toLocaleString()}
                    </span>
                    <span className="text-xs text-green-600 font-medium">
                      {vertical?.trend}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-slow"
                      style={{ width: `${vertical?.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-text-secondary w-8">
                    {vertical?.percentage}%
                  </span>
                </div>
                
                <div className="mt-1 text-xs text-text-secondary">
                  Avg: {vertical?.avgSalary || vertical?.avgBudget || vertical?.avgPrice}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Market Insights */}
      <div className="border-t border-border p-6 bg-muted/30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-primary">23%</div>
            <div className="text-sm text-text-secondary">More opportunities than last month</div>
          </div>
          
          <div>
            <div className="text-lg font-bold text-primary">4.2/5</div>
            <div className="text-sm text-text-secondary">Average opportunity rating</div>
          </div>
          
          <div>
            <div className="text-lg font-bold text-primary">72h</div>
            <div className="text-sm text-text-secondary">Average response time</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunityStats;