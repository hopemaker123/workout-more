import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InteractiveToolsSection = ({ tools, onUseTool, className = '' }) => {
  const getToolIcon = (toolType) => {
    switch (toolType) {
      case 'salary-calculator': return 'Calculator';
      case 'roi-analyzer': return 'TrendingUp';
      case 'market-comparison': return 'BarChart3';
      case 'career-path-simulator': return 'Route';
      case 'skill-assessment': return 'CheckCircle';
      case 'resume-builder': return 'FileText';
      case 'interview-prep': return 'MessageCircle';
      case 'portfolio-builder': return 'Briefcase';
      default: return 'Tool';
    }
  };

  const getToolColor = (toolType) => {
    switch (toolType) {
      case 'salary-calculator': return 'text-green-600 bg-green-50 border-green-200';
      case 'roi-analyzer': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'market-comparison': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'career-path-simulator': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'skill-assessment': return 'text-indigo-600 bg-indigo-50 border-indigo-200';
      case 'resume-builder': return 'text-red-600 bg-red-50 border-red-200';
      case 'interview-prep': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'portfolio-builder': return 'text-pink-600 bg-pink-50 border-pink-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Interactive Tools</h2>
          <p className="text-text-secondary mt-1">Professional calculators and analyzers for immediate insights</p>
        </div>
        <Button variant="outline" size="sm" iconName="ArrowRight" iconPosition="right">
          View All Tools
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tools?.map((tool) => (
          <div 
            key={tool?.id}
            className="bg-card border border-border rounded-lg p-6 shadow-professional hover:shadow-elevated transition-all duration-base group cursor-pointer"
            onClick={() => onUseTool(tool)}
          >
            {/* Tool Icon */}
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 border ${getToolColor(tool?.type)}`}>
              <Icon 
                name={getToolIcon(tool?.type)} 
                size={24} 
                className={getToolColor(tool?.type)?.split(' ')?.[0]}
              />
            </div>

            {/* Tool Info */}
            <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors duration-base">
              {tool?.name}
            </h3>
            
            <p className="text-sm text-text-secondary mb-4 line-clamp-3">
              {tool?.description}
            </p>

            {/* Tool Stats */}
            <div className="flex items-center justify-between text-xs text-text-secondary mb-4">
              <div className="flex items-center space-x-3">
                <div className="flex items-center">
                  <Icon name="Users" size={12} className="mr-1" />
                  {tool?.usageCount}
                </div>
                
                {tool?.rating && (
                  <div className="flex items-center">
                    <Icon name="Star" size={12} className="mr-1 text-yellow-500" />
                    {tool?.rating}
                  </div>
                )}
              </div>
              
              {tool?.isPremium && (
                <span className="px-2 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium">
                  Premium
                </span>
              )}
            </div>

            {/* Features */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {tool?.features?.slice(0, 2)?.map((feature, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-full"
                  >
                    {feature}
                  </span>
                ))}
                {tool?.features?.length > 2 && (
                  <span className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-full">
                    +{tool?.features?.length - 2}
                  </span>
                )}
              </div>
            </div>

            {/* Action Button */}
            <Button
              variant={tool?.isPremium ? "default" : "outline"}
              size="sm"
              iconName="Play"
              iconPosition="left"
              fullWidth
              onClick={(e) => {
                e?.stopPropagation();
                onUseTool(tool);
              }}
            >
              Use Tool
            </Button>
          </div>
        ))}
      </div>
      {/* Quick Access Tools */}
      <div className="bg-muted rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Access Tools</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Salary Calculator', icon: 'Calculator', type: 'salary-calculator' },
            { name: 'ROI Analyzer', icon: 'TrendingUp', type: 'roi-analyzer' },
            { name: 'Market Comparison', icon: 'BarChart3', type: 'market-comparison' },
            { name: 'Career Simulator', icon: 'Route', type: 'career-path-simulator' }
          ]?.map((quickTool, index) => (
            <button
              key={index}
              onClick={() => onUseTool({ type: quickTool?.type, name: quickTool?.name })}
              className="flex flex-col items-center p-4 bg-card border border-border rounded-lg hover:shadow-professional transition-all duration-base focus-professional group"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-2 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-base">
                <Icon name={quickTool?.icon} size={20} className="text-primary group-hover:text-primary-foreground" />
              </div>
              <span className="text-sm font-medium text-text-primary text-center">
                {quickTool?.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InteractiveToolsSection;