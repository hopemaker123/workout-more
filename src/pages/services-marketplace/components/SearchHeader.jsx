import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SearchHeader = ({ searchQuery, onSearchChange, sortBy, onSortChange, viewMode, onViewModeChange, totalResults }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant', icon: 'Target' },
    { value: 'rating', label: 'Highest Rated', icon: 'Star' },
    { value: 'price-low', label: 'Price: Low to High', icon: 'ArrowUp' },
    { value: 'price-high', label: 'Price: High to Low', icon: 'ArrowDown' },
    { value: 'newest', label: 'Newest First', icon: 'Clock' },
    { value: 'popular', label: 'Most Popular', icon: 'TrendingUp' }
  ];

  const quickFilters = [
    { id: 'verified', label: 'Verified Only', icon: 'BadgeCheck' },
    { id: 'featured', label: 'Featured', icon: 'Star' },
    { id: 'fast-delivery', label: 'Fast Delivery', icon: 'Zap' },
    { id: 'top-rated', label: 'Top Rated', icon: 'Award' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg shadow-professional p-6 mb-6">
      {/* Main Search Bar */}
      <div className="relative mb-4">
        <div className={`relative transition-all duration-base ${
          isSearchFocused ? 'transform scale-[1.02]' : ''
        }`}>
          <Icon 
            name="Search" 
            size={20} 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary"
          />
          <Input
            type="search"
            placeholder="Search for services, skills, or providers..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e?.target?.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className="pl-12 pr-12 h-12 text-lg"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors duration-base"
            >
              <Icon name="X" size={16} className="text-text-secondary" />
            </button>
          )}
        </div>
      </div>
      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {quickFilters?.map((filter) => (
          <Button
            key={filter?.id}
            variant="outline"
            size="sm"
            iconName={filter?.icon}
            iconPosition="left"
            className="text-sm"
          >
            {filter?.label}
          </Button>
        ))}
      </div>
      {/* Results Info & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Results Count */}
        <div className="flex items-center space-x-2">
          <Icon name="Search" size={16} className="text-text-secondary" />
          <span className="text-sm text-text-secondary">
            {totalResults?.toLocaleString()} services found
            {searchQuery && (
              <span className="font-medium text-text-primary"> for "{searchQuery}"</span>
            )}
          </span>
        </div>

        {/* Sort & View Controls */}
        <div className="flex items-center space-x-4">
          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e?.target?.value)}
              className="appearance-none bg-background border border-border rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {sortOptions?.map((option) => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </select>
            <Icon 
              name="ChevronDown" 
              size={16} 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-text-secondary pointer-events-none"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-muted rounded-lg p-1">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-2 rounded-md transition-all duration-base ${
                viewMode === 'grid' ?'bg-primary text-primary-foreground shadow-sm' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name="Grid3X3" size={16} />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-2 rounded-md transition-all duration-base ${
                viewMode === 'list' ?'bg-primary text-primary-foreground shadow-sm' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name="List" size={16} />
            </button>
          </div>
        </div>
      </div>
      {/* Active Search Indicator */}
      {searchQuery && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Search" size={16} className="text-blue-600" />
              <span className="text-sm text-blue-800">
                Active search: <span className="font-medium">"{searchQuery}"</span>
              </span>
            </div>
            <button
              onClick={() => onSearchChange('')}
              className="text-blue-600 hover:text-blue-800 transition-colors duration-base"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchHeader;