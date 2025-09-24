import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedSection = ({ featuredResources, onViewResource, className = '' }) => {
  const mainFeatured = featuredResources?.[0];
  const secondaryFeatured = featuredResources?.slice(1, 3);

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-text-primary">Featured Resources</h2>
        <Button variant="outline" size="sm" iconName="ArrowRight" iconPosition="right">
          View All Featured
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Featured Resource */}
        <div className="lg:col-span-2">
          <div className="relative bg-card border border-border rounded-lg overflow-hidden shadow-professional hover:shadow-elevated transition-all duration-base group">
            <div className="relative h-64 lg:h-80 overflow-hidden">
              <Image
                src={mainFeatured?.thumbnail}
                alt={mainFeatured?.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-base"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              
              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm font-medium">
                    Featured
                  </span>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                    {mainFeatured?.type?.charAt(0)?.toUpperCase() + mainFeatured?.type?.slice(1)}
                  </span>
                </div>
                
                <h3 className="text-xl lg:text-2xl font-bold mb-2 line-clamp-2">
                  {mainFeatured?.title}
                </h3>
                
                <p className="text-white/90 mb-4 line-clamp-2">
                  {mainFeatured?.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-white/80">
                    {mainFeatured?.duration && (
                      <div className="flex items-center">
                        <Icon name="Clock" size={14} className="mr-1" />
                        {mainFeatured?.duration}
                      </div>
                    )}
                    
                    <div className="flex items-center">
                      <Icon name="Users" size={14} className="mr-1" />
                      {mainFeatured?.enrolledCount || mainFeatured?.viewCount}
                    </div>
                    
                    {mainFeatured?.rating && (
                      <div className="flex items-center">
                        <Icon name="Star" size={14} className="mr-1 text-yellow-400" />
                        {mainFeatured?.rating}
                      </div>
                    )}
                  </div>
                  
                  <Button
                    variant="default"
                    size="sm"
                    iconName="Play"
                    iconPosition="left"
                    onClick={() => onViewResource(mainFeatured)}
                  >
                    {mainFeatured?.type === 'course' ? 'Start Course' : 'View Resource'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Featured Resources */}
        <div className="space-y-6">
          {secondaryFeatured?.map((resource, index) => (
            <div 
              key={resource?.id}
              className="bg-card border border-border rounded-lg p-4 shadow-professional hover:shadow-elevated transition-all duration-base group cursor-pointer"
              onClick={() => onViewResource(resource)}
            >
              <div className="flex space-x-4">
                <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={resource?.thumbnail}
                    alt={resource?.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-base"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-full">
                      {resource?.type?.charAt(0)?.toUpperCase() + resource?.type?.slice(1)}
                    </span>
                    {resource?.isPremium && (
                      <span className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded-full">
                        Premium
                      </span>
                    )}
                  </div>
                  
                  <h4 className="text-sm font-semibold text-text-primary mb-1 line-clamp-2 group-hover:text-primary transition-colors duration-base">
                    {resource?.title}
                  </h4>
                  
                  <p className="text-xs text-text-secondary mb-2 line-clamp-2">
                    {resource?.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-text-secondary">
                    <div className="flex items-center space-x-2">
                      {resource?.duration && (
                        <div className="flex items-center">
                          <Icon name="Clock" size={10} className="mr-1" />
                          {resource?.duration}
                        </div>
                      )}
                      
                      {resource?.rating && (
                        <div className="flex items-center">
                          <Icon name="Star" size={10} className="mr-1 text-yellow-500" />
                          {resource?.rating}
                        </div>
                      )}
                    </div>
                    
                    <Icon name="ArrowRight" size={12} className="text-text-secondary group-hover:text-primary transition-colors duration-base" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedSection;