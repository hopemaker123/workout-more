import React from 'react';
import Icon from '../../../components/AppIcon';

const CategoryTabs = ({ activeCategory, onCategoryChange, categories }) => {
  const defaultCategories = [
    { id: 'all', name: 'All Services', icon: 'Grid3X3', count: 1247 },
    { id: 'job-placement', name: 'Job Placement', icon: 'Briefcase', count: 234 },
    { id: 'marketing', name: 'Marketing', icon: 'TrendingUp', count: 189 },
    { id: 'real-estate', name: 'Real Estate', icon: 'Home', count: 156 },
    { id: 'consulting', name: 'Consulting', icon: 'Users', count: 98 },
    { id: 'design', name: 'Design & Creative', icon: 'Palette', count: 145 },
    { id: 'development', name: 'Development', icon: 'Code', count: 167 },
    { id: 'writing', name: 'Writing & Content', icon: 'PenTool', count: 123 },
    { id: 'finance', name: 'Finance & Accounting', icon: 'Calculator', count: 89 },
    { id: 'legal', name: 'Legal Services', icon: 'Scale', count: 67 }
  ];

  const categoryList = categories || defaultCategories;

  return (
    <div className="bg-card border border-border rounded-lg shadow-professional p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Browse by Category</h3>
        <div className="text-sm text-text-secondary">
          {categoryList?.find(cat => cat?.id === activeCategory)?.count || 0} services
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {categoryList?.map((category) => (
          <button
            key={category?.id}
            onClick={() => onCategoryChange(category?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-base ${
              activeCategory === category?.id
                ? 'bg-primary text-primary-foreground shadow-professional'
                : 'bg-muted text-text-primary hover:bg-primary/10 hover:text-primary'
            }`}
          >
            <Icon 
              name={category?.icon} 
              size={16} 
              className={activeCategory === category?.id ? 'text-primary-foreground' : 'text-text-secondary'}
            />
            <span>{category?.name}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              activeCategory === category?.id
                ? 'bg-primary-foreground/20 text-primary-foreground'
                : 'bg-text-secondary/10 text-text-secondary'
            }`}>
              {category?.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;