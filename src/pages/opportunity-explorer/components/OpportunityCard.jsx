import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const OpportunityCard = ({ opportunity, onSave, onApply, onViewDetails }) => {
  const [isSaved, setIsSaved] = useState(opportunity?.isSaved || false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave(opportunity?.id, !isSaved);
  };

  const getVerticalIcon = (vertical) => {
    switch (vertical) {
      case 'jobs': return 'Briefcase';
      case 'marketing': return 'Megaphone';
      case 'real-estate': return 'Home';
      default: return 'Star';
    }
  };

  const getVerticalColor = (vertical) => {
    switch (vertical) {
      case 'jobs': return 'text-blue-600 bg-blue-50';
      case 'marketing': return 'text-green-600 bg-green-50';
      case 'real-estate': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatSalary = (min, max, type = 'yearly') => {
    if (!min && !max) return 'Salary not disclosed';
    const formatNumber = (num) => {
      if (num >= 1000000) return `$${(num / 1000000)?.toFixed(1)}M`;
      if (num >= 1000) return `$${(num / 1000)?.toFixed(0)}K`;
      return `$${num?.toLocaleString()}`;
    };
    
    if (min && max) {
      return `${formatNumber(min)} - ${formatNumber(max)}${type === 'yearly' ? '/year' : type === 'hourly' ? '/hr' : ''}`;
    }
    return `${formatNumber(min || max)}${type === 'yearly' ? '/year' : type === 'hourly' ? '/hr' : ''}`;
  };

  const renderJobDetails = () => (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold text-primary">
          {formatSalary(opportunity?.salaryMin, opportunity?.salaryMax, opportunity?.salaryType)}
        </span>
        <div className="flex items-center space-x-2">
          {opportunity?.remote && (
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
              Remote
            </span>
          )}
          {opportunity?.urgent && (
            <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
              Urgent
            </span>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-4 text-sm text-text-secondary">
        <div className="flex items-center space-x-1">
          <Icon name="MapPin" size={16} />
          <span>{opportunity?.location}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Clock" size={16} />
          <span>{opportunity?.jobType}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Users" size={16} />
          <span>{opportunity?.experienceLevel}</span>
        </div>
      </div>
    </div>
  );

  const renderMarketingDetails = () => (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold text-primary">
          {formatSalary(opportunity?.budgetMin, opportunity?.budgetMax, 'project')}
        </span>
        <div className="flex items-center space-x-2">
          {opportunity?.verified && (
            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
              Verified Client
            </span>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-4 text-sm text-text-secondary">
        <div className="flex items-center space-x-1">
          <Icon name="Calendar" size={16} />
          <span>{opportunity?.duration}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Target" size={16} />
          <span>{opportunity?.category}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Star" size={16} />
          <span>{opportunity?.clientRating}/5</span>
        </div>
      </div>
    </div>
  );

  const renderRealEstateDetails = () => (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold text-primary">
          {formatSalary(opportunity?.price, null, '')}
        </span>
        <div className="flex items-center space-x-2">
          {opportunity?.investment && (
            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
              Investment
            </span>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-4 text-sm text-text-secondary">
        <div className="flex items-center space-x-1">
          <Icon name="Home" size={16} />
          <span>{opportunity?.propertyType}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Maximize" size={16} />
          <span>{opportunity?.size} sq ft</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="TrendingUp" size={16} />
          <span>{opportunity?.roi}% ROI</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-card border border-border rounded-lg shadow-professional hover:shadow-elevated transition-all duration-base interactive-card">
      {/* Card Header */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
              <Image
                src={opportunity?.companyLogo || opportunity?.clientAvatar || opportunity?.propertyImage}
                alt={opportunity?.company || opportunity?.clientName || opportunity?.propertyTitle}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getVerticalColor(opportunity?.vertical)}`}>
                  <Icon name={getVerticalIcon(opportunity?.vertical)} size={12} className="mr-1" />
                  {opportunity?.vertical === 'jobs' ? 'Job' : opportunity?.vertical === 'marketing' ? 'Marketing' : 'Real Estate'}
                </span>
                
                {opportunity?.featured && (
                  <span className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded-full">
                    Featured
                  </span>
                )}
              </div>
              
              <h3 className="text-lg font-semibold text-text-primary mb-1 line-clamp-2">
                {opportunity?.title}
              </h3>
              
              <p className="text-sm text-text-secondary">
                {opportunity?.company || opportunity?.clientName || opportunity?.location}
              </p>
            </div>
          </div>
          
          <button
            onClick={handleSave}
            className="p-2 rounded-lg hover:bg-muted transition-colors duration-base focus-professional"
          >
            <Icon 
              name={isSaved ? "Heart" : "Heart"} 
              size={20} 
              className={isSaved ? "text-red-500 fill-current" : "text-text-secondary"}
            />
          </button>
        </div>

        {/* Opportunity Details */}
        {opportunity?.vertical === 'jobs' && renderJobDetails()}
        {opportunity?.vertical === 'marketing' && renderMarketingDetails()}
        {opportunity?.vertical === 'real-estate' && renderRealEstateDetails()}

        {/* Description */}
        <div className="mt-4">
          <p className={`text-sm text-text-secondary ${isExpanded ? '' : 'line-clamp-3'}`}>
            {opportunity?.description}
          </p>
          
          {opportunity?.description?.length > 150 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-primary text-sm font-medium mt-2 hover:text-secondary transition-colors duration-base"
            >
              {isExpanded ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>

        {/* Skills/Tags */}
        {opportunity?.skills && opportunity?.skills?.length > 0 && (
          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              {opportunity?.skills?.slice(0, 4)?.map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-full"
                >
                  {skill}
                </span>
              ))}
              {opportunity?.skills?.length > 4 && (
                <span className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-full">
                  +{opportunity?.skills?.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Match Score */}
        {opportunity?.matchScore && (
          <div className="mt-4 p-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-text-primary">AI Match Score</span>
              <span className="text-lg font-bold text-primary">{opportunity?.matchScore}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 mt-2">
              <div 
                className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-slow"
                style={{ width: `${opportunity?.matchScore}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
      {/* Card Footer */}
      <div className="px-6 py-4 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-xs text-text-secondary">
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} />
              <span>Posted {opportunity?.postedTime}</span>
            </div>
            
            {opportunity?.applicants && (
              <div className="flex items-center space-x-1">
                <Icon name="Users" size={14} />
                <span>{opportunity?.applicants} applicants</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails(opportunity?.id)}
            >
              View Details
            </Button>
            
            <Button
              variant="default"
              size="sm"
              onClick={() => onApply(opportunity?.id)}
              iconName={opportunity?.vertical === 'jobs' ? 'Send' : opportunity?.vertical === 'marketing' ? 'MessageCircle' : 'Eye'}
              iconPosition="left"
            >
              {opportunity?.vertical === 'jobs' ? 'Apply' : opportunity?.vertical === 'marketing' ? 'Propose' : 'Inquire'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunityCard;