import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const SearchFilters = ({ onFiltersChange, activeFilters = {} }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    vertical: activeFilters?.vertical || 'all',
    location: activeFilters?.location || '',
    salaryRange: activeFilters?.salaryRange || '',
    experienceLevel: activeFilters?.experienceLevel || '',
    jobType: activeFilters?.jobType || '',
    propertyType: activeFilters?.propertyType || '',
    budget: activeFilters?.budget || '',
    serviceCategory: activeFilters?.serviceCategory || '',
    remote: activeFilters?.remote || false,
    urgent: activeFilters?.urgent || false,
    verified: activeFilters?.verified || false
  });

  const verticalOptions = [
    { value: 'all', label: 'All Opportunities' },
    { value: 'jobs', label: 'Job Opportunities' },
    { value: 'marketing', label: 'Marketing Services' },
    { value: 'real-estate', label: 'Real Estate' }
  ];

  const salaryRangeOptions = [
    { value: '', label: 'Any Salary' },
    { value: '0-50k', label: '$0 - $50,000' },
    { value: '50k-100k', label: '$50,000 - $100,000' },
    { value: '100k-150k', label: '$100,000 - $150,000' },
    { value: '150k+', label: '$150,000+' }
  ];

  const experienceLevelOptions = [
    { value: '', label: 'Any Experience' },
    { value: 'entry', label: 'Entry Level (0-2 years)' },
    { value: 'mid', label: 'Mid Level (3-5 years)' },
    { value: 'senior', label: 'Senior Level (6-10 years)' },
    { value: 'executive', label: 'Executive (10+ years)' }
  ];

  const jobTypeOptions = [
    { value: '', label: 'Any Job Type' },
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'freelance', label: 'Freelance' }
  ];

  const propertyTypeOptions = [
    { value: '', label: 'Any Property Type' },
    { value: 'residential', label: 'Residential' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'investment', label: 'Investment Property' },
    { value: 'land', label: 'Land' }
  ];

  const budgetOptions = [
    { value: '', label: 'Any Budget' },
    { value: '0-100k', label: '$0 - $100,000' },
    { value: '100k-500k', label: '$100,000 - $500,000' },
    { value: '500k-1m', label: '$500,000 - $1,000,000' },
    { value: '1m+', label: '$1,000,000+' }
  ];

  const serviceCategoryOptions = [
    { value: '', label: 'Any Service' },
    { value: 'digital-marketing', label: 'Digital Marketing' },
    { value: 'content-creation', label: 'Content Creation' },
    { value: 'seo', label: 'SEO Services' },
    { value: 'social-media', label: 'Social Media Management' },
    { value: 'advertising', label: 'Paid Advertising' }
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      vertical: 'all',
      location: '',
      salaryRange: '',
      experienceLevel: '',
      jobType: '',
      propertyType: '',
      budget: '',
      serviceCategory: '',
      remote: false,
      urgent: false,
      verified: false
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const getActiveFilterCount = () => {
    return Object.values(filters)?.filter(value => 
      value !== '' && value !== 'all' && value !== false
    )?.length;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-professional">
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">Search Filters</h3>
          {getActiveFilterCount() > 0 && (
            <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
              {getActiveFilterCount()}
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {getActiveFilterCount() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              iconName="X"
              iconPosition="left"
            >
              Clear All
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {isExpanded ? 'Less' : 'More'} Filters
          </Button>
        </div>
      </div>
      {/* Basic Filters */}
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Select
            label="Opportunity Type"
            options={verticalOptions}
            value={filters?.vertical}
            onChange={(value) => handleFilterChange('vertical', value)}
          />
          
          <Input
            label="Location"
            type="text"
            placeholder="City, State, or Remote"
            value={filters?.location}
            onChange={(e) => handleFilterChange('location', e?.target?.value)}
          />
          
          {filters?.vertical === 'all' || filters?.vertical === 'jobs' ? (
            <Select
              label="Salary Range"
              options={salaryRangeOptions}
              value={filters?.salaryRange}
              onChange={(value) => handleFilterChange('salaryRange', value)}
            />
          ) : filters?.vertical === 'real-estate' ? (
            <Select
              label="Budget Range"
              options={budgetOptions}
              value={filters?.budget}
              onChange={(value) => handleFilterChange('budget', value)}
            />
          ) : (
            <Select
              label="Service Category"
              options={serviceCategoryOptions}
              value={filters?.serviceCategory}
              onChange={(value) => handleFilterChange('serviceCategory', value)}
            />
          )}
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-3">
          <Checkbox
            label="Remote Opportunities"
            checked={filters?.remote}
            onChange={(e) => handleFilterChange('remote', e?.target?.checked)}
          />
          
          <Checkbox
            label="Urgent/Hot Opportunities"
            checked={filters?.urgent}
            onChange={(e) => handleFilterChange('urgent', e?.target?.checked)}
          />
          
          <Checkbox
            label="Verified Only"
            checked={filters?.verified}
            onChange={(e) => handleFilterChange('verified', e?.target?.checked)}
          />
        </div>
      </div>
      {/* Advanced Filters */}
      {isExpanded && (
        <div className="border-t border-border p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(filters?.vertical === 'all' || filters?.vertical === 'jobs') && (
              <>
                <Select
                  label="Experience Level"
                  options={experienceLevelOptions}
                  value={filters?.experienceLevel}
                  onChange={(value) => handleFilterChange('experienceLevel', value)}
                />
                
                <Select
                  label="Job Type"
                  options={jobTypeOptions}
                  value={filters?.jobType}
                  onChange={(value) => handleFilterChange('jobType', value)}
                />
              </>
            )}
            
            {(filters?.vertical === 'all' || filters?.vertical === 'real-estate') && (
              <Select
                label="Property Type"
                options={propertyTypeOptions}
                value={filters?.propertyType}
                onChange={(value) => handleFilterChange('propertyType', value)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;