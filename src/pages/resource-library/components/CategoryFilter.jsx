import React from 'react';
import Icon from '../../../components/AppIcon';

const CategoryFilter = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  className = '' 
}) => {
  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case 'all': return 'Grid3x3';
      case 'courses': return 'BookOpen';
      case 'tools': return 'Calculator';
      case 'templates': return 'FileText';
      case 'reports': return 'BarChart3';
      case 'videos': return 'Play';
      case 'articles': return 'Newspaper';
      case 'job marketplace': return 'Briefcase';
      case 'marketing services': return 'Megaphone';
      case 'real estate': return 'Home';
      default: return 'Folder';
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-4 ${className}`}>
      <h3 className="text-lg font-semibold text-text-primary mb-4">Categories</h3>
      <div className="space-y-2">
        {categories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => onCategoryChange(category?.id)}
            className={`flex items-center justify-between w-full p-3 rounded-lg text-sm font-medium transition-all duration-base focus-professional ${
              selectedCategory === category?.id
                ? 'bg-primary text-primary-foreground shadow-professional'
                : 'text-text-primary hover:bg-muted hover:text-primary'
            }`}
          >
            <div className="flex items-center">
              <Icon 
                name={getCategoryIcon(category?.name)} 
                size={18} 
                className={`mr-3 ${
                  selectedCategory === category?.id 
                    ? 'text-primary-foreground' 
                    : 'text-text-secondary'
                }`}
              />
              <span>{category?.name}</span>
            </div>
            
            <span className={`px-2 py-1 text-xs rounded-full ${
              selectedCategory === category?.id
                ? 'bg-primary-foreground/20 text-primary-foreground'
                : 'bg-muted text-text-secondary'
            }`}>
              {category?.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;