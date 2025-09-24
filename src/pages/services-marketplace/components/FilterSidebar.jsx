import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterSidebar = ({ filters, onFiltersChange, onClearFilters, isCollapsed, onToggleCollapse }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const categories = [
    { id: 'job-placement', label: 'Job Placement', count: 234 },
    { id: 'marketing', label: 'Marketing Services', count: 189 },
    { id: 'real-estate', label: 'Real Estate', count: 156 },
    { id: 'consulting', label: 'Business Consulting', count: 98 },
    { id: 'design', label: 'Design & Creative', count: 145 }
  ];

  const priceRanges = [
    { id: 'under-100', label: 'Under $100', min: 0, max: 100 },
    { id: '100-500', label: '$100 - $500', min: 100, max: 500 },
    { id: '500-1000', label: '$500 - $1,000', min: 500, max: 1000 },
    { id: '1000-5000', label: '$1,000 - $5,000', min: 1000, max: 5000 },
    { id: 'over-5000', label: 'Over $5,000', min: 5000, max: null }
  ];

  const deliveryTimes = [
    { id: '24h', label: '24 Hours', value: '24h' },
    { id: '3days', label: '3 Days', value: '3days' },
    { id: '1week', label: '1 Week', value: '1week' },
    { id: '2weeks', label: '2 Weeks', value: '2weeks' },
    { id: '1month', label: '1 Month+', value: '1month' }
  ];

  const ratings = [
    { id: '5star', label: '5 Stars', value: 5, count: 89 },
    { id: '4star', label: '4+ Stars', value: 4, count: 156 },
    { id: '3star', label: '3+ Stars', value: 3, count: 234 },
    { id: '2star', label: '2+ Stars', value: 2, count: 298 }
  ];

  const handleFilterChange = (filterType, value, checked) => {
    const updatedFilters = { ...localFilters };
    
    if (!updatedFilters?.[filterType]) {
      updatedFilters[filterType] = [];
    }

    if (checked) {
      updatedFilters[filterType] = [...updatedFilters?.[filterType], value];
    } else {
      updatedFilters[filterType] = updatedFilters?.[filterType]?.filter(item => item !== value);
    }

    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handlePriceRangeChange = (field, value) => {
    const updatedFilters = {
      ...localFilters,
      priceRange: {
        ...localFilters?.priceRange,
        [field]: value
      }
    };
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      categories: [],
      priceRange: { min: '', max: '' },
      deliveryTime: [],
      rating: [],
      verified: false,
      featured: false
    };
    setLocalFilters(clearedFilters);
    onClearFilters();
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (localFilters?.categories?.length) count += localFilters?.categories?.length;
    if (localFilters?.deliveryTime?.length) count += localFilters?.deliveryTime?.length;
    if (localFilters?.rating?.length) count += localFilters?.rating?.length;
    if (localFilters?.priceRange?.min || localFilters?.priceRange?.max) count += 1;
    if (localFilters?.verified) count += 1;
    if (localFilters?.featured) count += 1;
    return count;
  };

  return (
    <div className={`bg-card border border-border rounded-lg shadow-professional transition-all duration-base ${
      isCollapsed ? 'w-16' : 'w-80'
    }`}>
      {/* Filter Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <Icon name="Filter" size={20} className="text-primary" />
              <h3 className="text-lg font-semibold text-text-primary">Filters</h3>
              {getActiveFiltersCount() > 0 && (
                <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
                  {getActiveFiltersCount()}
                </span>
              )}
            </div>
          )}
          <button
            onClick={onToggleCollapse}
            className="p-2 hover:bg-muted rounded-lg transition-colors duration-base"
          >
            <Icon 
              name={isCollapsed ? "ChevronRight" : "ChevronLeft"} 
              size={16} 
              className="text-text-secondary"
            />
          </button>
        </div>
        
        {!isCollapsed && getActiveFiltersCount() > 0 && (
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            iconPosition="left"
            onClick={clearAllFilters}
            className="mt-2 w-full"
          >
            Clear All Filters
          </Button>
        )}
      </div>
      {!isCollapsed && (
        <div className="p-4 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-professional">
          {/* Categories */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3">Categories</h4>
            <div className="space-y-2">
              {categories?.map((category) => (
                <div key={category?.id} className="flex items-center justify-between">
                  <Checkbox
                    label={category?.label}
                    checked={localFilters?.categories?.includes(category?.id) || false}
                    onChange={(e) => handleFilterChange('categories', category?.id, e?.target?.checked)}
                  />
                  <span className="text-xs text-text-secondary">({category?.count})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3">Price Range</h4>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={localFilters?.priceRange?.min || ''}
                  onChange={(e) => handlePriceRangeChange('min', e?.target?.value)}
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={localFilters?.priceRange?.max || ''}
                  onChange={(e) => handlePriceRangeChange('max', e?.target?.value)}
                />
              </div>
              <div className="space-y-2">
                {priceRanges?.map((range) => (
                  <Checkbox
                    key={range?.id}
                    label={range?.label}
                   
                    onChange={() => {
                      handlePriceRangeChange('min', range?.min);
                      handlePriceRangeChange('max', range?.max);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Delivery Time */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3">Delivery Time</h4>
            <div className="space-y-2">
              {deliveryTimes?.map((time) => (
                <Checkbox
                  key={time?.id}
                  label={time?.label}
                  checked={localFilters?.deliveryTime?.includes(time?.value) || false}
                  onChange={(e) => handleFilterChange('deliveryTime', time?.value, e?.target?.checked)}
                />
              ))}
            </div>
          </div>

          {/* Rating */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3">Rating</h4>
            <div className="space-y-2">
              {ratings?.map((rating) => (
                <div key={rating?.id} className="flex items-center justify-between">
                  <Checkbox
                    label={
                      <div className="flex items-center space-x-1">
                        <div className="flex items-center">
                          {[...Array(5)]?.map((_, i) => (
                            <Icon
                              key={i}
                              name="Star"
                              size={12}
                              className={i < rating?.value ? "text-yellow-400 fill-current" : "text-gray-300"}
                            />
                          ))}
                        </div>
                        <span className="text-sm">{rating?.label}</span>
                      </div>
                    }
                    checked={localFilters?.rating?.includes(rating?.value) || false}
                    onChange={(e) => handleFilterChange('rating', rating?.value, e?.target?.checked)}
                  />
                  <span className="text-xs text-text-secondary">({rating?.count})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Special Filters */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3">Special</h4>
            <div className="space-y-2">
              <Checkbox
                label="Verified Providers Only"
                checked={localFilters?.verified || false}
                onChange={(e) => {
                  const updatedFilters = { ...localFilters, verified: e?.target?.checked };
                  setLocalFilters(updatedFilters);
                  onFiltersChange(updatedFilters);
                }}
              />
              <Checkbox
                label="Featured Services"
                checked={localFilters?.featured || false}
                onChange={(e) => {
                  const updatedFilters = { ...localFilters, featured: e?.target?.checked };
                  setLocalFilters(updatedFilters);
                  onFiltersChange(updatedFilters);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSidebar;