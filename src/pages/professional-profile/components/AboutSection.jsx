import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AboutSection = ({ profile, isOwnProfile = true }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="space-y-6">
      {/* About Me */}
      <div className="bg-card rounded-xl shadow-professional border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">About Me</h3>
          {isOwnProfile && (
            <Button variant="ghost" size="sm" iconName="Edit">
              Edit
            </Button>
          )}
        </div>
        
        <div className="prose prose-sm max-w-none">
          <p className="text-text-primary leading-relaxed">
            {isExpanded ? profile?.about?.full : profile?.about?.summary}
          </p>
          
          {profile?.about?.full?.length > profile?.about?.summary?.length && (
            <button
              onClick={toggleExpanded}
              className="text-primary hover:text-secondary font-medium text-sm mt-2 transition-colors"
            >
              {isExpanded ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>
      </div>
      {/* Key Highlights */}
      <div className="bg-card rounded-xl shadow-professional border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Key Highlights</h3>
          {isOwnProfile && (
            <Button variant="ghost" size="sm" iconName="Plus">
              Add
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profile?.highlights?.map((highlight, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={highlight?.icon} size={16} color="white" />
              </div>
              <div>
                <h4 className="font-medium text-text-primary">{highlight?.title}</h4>
                <p className="text-sm text-text-secondary">{highlight?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Languages */}
      <div className="bg-card rounded-xl shadow-professional border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Languages</h3>
          {isOwnProfile && (
            <Button variant="ghost" size="sm" iconName="Plus">
              Add
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {profile?.languages?.map((language, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <div className="font-medium text-text-primary">{language?.name}</div>
                <div className="text-sm text-text-secondary">{language?.level}</div>
              </div>
              <div className="flex items-center space-x-1">
                {[...Array(5)]?.map((_, i) => (
                  <Icon
                    key={i}
                    name="Star"
                    size={14}
                    className={i < language?.proficiency ? 'text-accent fill-current' : 'text-muted-foreground'}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Availability */}
      <div className="bg-card rounded-xl shadow-professional border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Availability</h3>
          {isOwnProfile && (
            <Button variant="ghost" size="sm" iconName="Edit">
              Edit
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-muted rounded-lg">
            <Icon name="Clock" size={24} className="text-primary mx-auto mb-2" />
            <div className="font-medium text-text-primary">{profile?.availability?.hoursPerWeek}h/week</div>
            <div className="text-sm text-text-secondary">Available Hours</div>
          </div>
          
          <div className="text-center p-4 bg-muted rounded-lg">
            <Icon name="Calendar" size={24} className="text-secondary mx-auto mb-2" />
            <div className="font-medium text-text-primary">{profile?.availability?.startDate}</div>
            <div className="text-sm text-text-secondary">Available From</div>
          </div>
          
          <div className="text-center p-4 bg-muted rounded-lg">
            <Icon name="DollarSign" size={24} className="text-accent mx-auto mb-2" />
            <div className="font-medium text-text-primary">${profile?.availability?.hourlyRate}/hr</div>
            <div className="text-sm text-text-secondary">Hourly Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;