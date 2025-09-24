import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const SearchFilters = ({ 
  searchQuery, 
  onSearchChange, 
  filters, 
  onFilterChange, 
  onClearFilters,
  className = '' 
}) => {
  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'course', label: 'Courses' },
    { value: 'tool', label: 'Tools' },
    { value: 'template', label: 'Templates' },
    { value: 'report', label: 'Reports' },
    { value: 'video', label: 'Videos' },
    { value: 'article', label: 'Articles' }
  ];

  const difficultyOptions = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'title', label: 'Alphabetical' }
  ];

  const verticalOptions = [
    { value: 'all', label: 'All Verticals' },
    { value: 'job-marketplace', label: 'Job Marketplace' },
    { value: 'marketing-services', label: 'Marketing Services' },
    { value: 'real-estate', label: 'Real Estate' },
    { value: 'cross-vertical', label: 'Cross-Vertical' }
  ];

  const hasActiveFilters = filters?.type !== 'all' || 
                          filters?.difficulty !== 'all' || 
                          filters?.vertical !== 'all' || 
                          filters?.isPremium !== 'all';

  return (
    <div className={`bg-card border border-border rounded-lg p-4 space-y-4 ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <Input
          type="search"
          placeholder="Search resources, courses, tools..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e?.target?.value)}
          className="pl-10"
        />
        <Icon 
          name="Search" 
          size={18} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
        />
      </div>
      {/* Filter Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Select
          placeholder="Resource Type"
          options={typeOptions}
          value={filters?.type}
          onChange={(value) => onFilterChange('type', value)}
        />

        <Select
          placeholder="Difficulty Level"
          options={difficultyOptions}
          value={filters?.difficulty}
          onChange={(value) => onFilterChange('difficulty', value)}
        />

        <Select
          placeholder="Vertical Focus"
          options={verticalOptions}
          value={filters?.vertical}
          onChange={(value) => onFilterChange('vertical', value)}
        />

        <Select
          placeholder="Sort By"
          options={sortOptions}
          value={filters?.sortBy}
          onChange={(value) => onFilterChange('sortBy', value)}
        />
      </div>
      {/* Additional Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="premium-only"
            checked={filters?.isPremium === 'premium'}
            onChange={(e) => onFilterChange('isPremium', e?.target?.checked ? 'premium' : 'all')}
            className="rounded border-border text-primary focus:ring-primary"
          />
          <label htmlFor="premium-only" className="text-sm text-text-primary">
            Premium Only
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="free-only"
            checked={filters?.isPremium === 'free'}
            onChange={(e) => onFilterChange('isPremium', e?.target?.checked ? 'free' : 'all')}
            className="rounded border-border text-primary focus:ring-primary"
          />
          <label htmlFor="free-only" className="text-sm text-text-primary">
            Free Only
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="bookmarked-only"
            checked={filters?.bookmarkedOnly}
            onChange={(e) => onFilterChange('bookmarkedOnly', e?.target?.checked)}
            className="rounded border-border text-primary focus:ring-primary"
          />
          <label htmlFor="bookmarked-only" className="text-sm text-text-primary">
            Bookmarked Only
          </label>
        </div>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            iconPosition="left"
            onClick={onClearFilters}
          >
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default SearchFilters;