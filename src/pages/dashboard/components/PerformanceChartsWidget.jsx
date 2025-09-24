import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PerformanceChartsWidget = () => {
  const [activeChart, setActiveChart] = useState('revenue');

  const revenueData = [
    { month: 'Jan', jobs: 2400, marketing: 1800, realestate: 3200 },
    { month: 'Feb', jobs: 2800, marketing: 2200, realestate: 2800 },
    { month: 'Mar', jobs: 3200, marketing: 2800, realestate: 3600 },
    { month: 'Apr', jobs: 2600, marketing: 2400, realestate: 3100 },
    { month: 'May', jobs: 3400, marketing: 3200, realestate: 4200 },
    { month: 'Jun', jobs: 3800, marketing: 3600, realestate: 3800 },
    { month: 'Jul', jobs: 4200, marketing: 4000, realestate: 4600 },
    { month: 'Aug', jobs: 3600, marketing: 3400, realestate: 4100 },
    { month: 'Sep', jobs: 4000, marketing: 3800, realestate: 4400 }
  ];

  const applicationData = [
    { week: 'Week 1', applications: 12, interviews: 3, offers: 1 },
    { week: 'Week 2', applications: 18, interviews: 5, offers: 2 },
    { week: 'Week 3', applications: 15, interviews: 4, offers: 1 },
    { week: 'Week 4', applications: 22, interviews: 7, offers: 3 }
  ];

  const verticalDistribution = [
    { name: 'Job Applications', value: 45, color: '#3B82F6' },
    { name: 'Marketing Projects', value: 32, color: '#10B981' },
    { name: 'Real Estate Deals', value: 23, color: '#F59E0B' }
  ];

  const chartOptions = [
    { 
      id: 'revenue', 
      label: 'Revenue Trends', 
      icon: 'DollarSign',
      description: 'Monthly revenue across all verticals'
    },
    { 
      id: 'applications', 
      label: 'Job Pipeline', 
      icon: 'Briefcase',
      description: 'Weekly job application funnel'
    },
    { 
      id: 'distribution', 
      label: 'Activity Split', 
      icon: 'PieChart',
      description: 'Time distribution across verticals'
    }
  ];

  const renderChart = () => {
    switch (activeChart) {
      case 'revenue':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="month" 
                stroke="#7F8C8D"
                fontSize={12}
              />
              <YAxis 
                stroke="#7F8C8D"
                fontSize={12}
                tickFormatter={(value) => `$${value/1000}K`}
              />
              <Tooltip 
                formatter={(value) => [`$${value?.toLocaleString()}`, '']}
                labelStyle={{ color: '#2C3E50' }}
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="jobs" fill="#3B82F6" name="Jobs" radius={[2, 2, 0, 0]} />
              <Bar dataKey="marketing" fill="#10B981" name="Marketing" radius={[2, 2, 0, 0]} />
              <Bar dataKey="realestate" fill="#F59E0B" name="Real Estate" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'applications':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={applicationData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="week" 
                stroke="#7F8C8D"
                fontSize={12}
              />
              <YAxis 
                stroke="#7F8C8D"
                fontSize={12}
              />
              <Tooltip 
                labelStyle={{ color: '#2C3E50' }}
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="applications" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                name="Applications"
              />
              <Line 
                type="monotone" 
                dataKey="interviews" 
                stroke="#10B981" 
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                name="Interviews"
              />
              <Line 
                type="monotone" 
                dataKey="offers" 
                stroke="#F59E0B" 
                strokeWidth={3}
                dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                name="Offers"
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'distribution':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={verticalDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {verticalDistribution?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value}%`, '']}
                labelStyle={{ color: '#2C3E50' }}
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  const getCurrentChartData = () => {
    const option = chartOptions?.find(opt => opt?.id === activeChart);
    return option || chartOptions?.[0];
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-text-primary mb-2">
            Performance Analytics
          </h2>
          <p className="text-sm text-text-secondary">
            {getCurrentChartData()?.description}
          </p>
        </div>
        
        <div className="flex items-center space-x-2 mt-4 lg:mt-0">
          <Button
            variant="ghost"
            size="sm"
            iconName="Download"
            className="text-text-secondary"
          />
          <Button
            variant="ghost"
            size="sm"
            iconName="Share"
            className="text-text-secondary"
          />
        </div>
      </div>
      {/* Chart Type Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {chartOptions?.map((option) => (
          <button
            key={option?.id}
            onClick={() => setActiveChart(option?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-base ${
              activeChart === option?.id
                ? 'bg-primary text-primary-foreground shadow-professional'
                : 'bg-muted text-text-secondary hover:bg-muted/80 hover:text-text-primary'
            }`}
          >
            <Icon name={option?.icon} size={16} />
            <span>{option?.label}</span>
          </button>
        ))}
      </div>
      {/* Chart Container */}
      <div className="bg-muted/30 rounded-lg p-4">
        {renderChart()}
      </div>
      {/* Chart Legend for Distribution */}
      {activeChart === 'distribution' && (
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {verticalDistribution?.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item?.color }}
              ></div>
              <span className="text-sm text-text-secondary">
                {item?.name} ({item?.value}%)
              </span>
            </div>
          ))}
        </div>
      )}
      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">$24.5K</p>
          <p className="text-xs text-text-secondary">Total Revenue</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-secondary">67</p>
          <p className="text-xs text-text-secondary">Active Projects</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-accent">89%</p>
          <p className="text-xs text-text-secondary">Success Rate</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-success">+12%</p>
          <p className="text-xs text-text-secondary">Growth Rate</p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChartsWidget;