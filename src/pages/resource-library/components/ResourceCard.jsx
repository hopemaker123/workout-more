import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ResourceCard = ({ 
  resource, 
  onBookmark, 
  onView, 
  isBookmarked = false,
  className = '' 
}) => {
  const getTypeIcon = (type) => {
    switch (type) {
      case 'course': return 'BookOpen';
      case 'tool': return 'Calculator';
      case 'template': return 'FileText';
      case 'report': return 'BarChart3';
      case 'video': return 'Play';
      case 'article': return 'Newspaper';
      default: return 'File';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'course': return 'text-blue-600 bg-blue-50';
      case 'tool': return 'text-green-600 bg-green-50';
      case 'template': return 'text-purple-600 bg-purple-50';
      case 'report': return 'text-orange-600 bg-orange-50';
      case 'video': return 'text-red-600 bg-red-50';
      case 'article': return 'text-indigo-600 bg-indigo-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getDifficultyColor = (level) => {
    switch (level) {
      case 'beginner': return 'text-green-700 bg-green-100';
      case 'intermediate': return 'text-yellow-700 bg-yellow-100';
      case 'advanced': return 'text-red-700 bg-red-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg shadow-professional hover:shadow-elevated transition-all duration-base group ${className}`}>
      {/* Resource Image */}
      <div className="relative overflow-hidden rounded-t-lg h-48">
        <Image
          src={resource?.thumbnail}
          alt={resource?.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-base"
        />
        
        {/* Type Badge */}
        <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(resource?.type)}`}>
          <Icon name={getTypeIcon(resource?.type)} size={12} className="inline mr-1" />
          {resource?.type?.charAt(0)?.toUpperCase() + resource?.type?.slice(1)}
        </div>

        {/* Bookmark Button */}
        <button
          onClick={() => onBookmark(resource?.id)}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-base focus-professional"
        >
          <Icon 
            name={isBookmarked ? "Bookmark" : "BookmarkPlus"} 
            size={16} 
            className={isBookmarked ? "text-accent" : "text-text-secondary"}
          />
        </button>

        {/* Premium Badge */}
        {resource?.isPremium && (
          <div className="absolute bottom-3 left-3 px-2 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium">
            <Icon name="Crown" size={12} className="inline mr-1" />
            Premium
          </div>
        )}
      </div>
      {/* Content */}
      <div className="p-4">
        {/* Title and Description */}
        <h3 className="text-lg font-semibold text-text-primary mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-base">
          {resource?.title}
        </h3>
        
        <p className="text-sm text-text-secondary mb-3 line-clamp-2">
          {resource?.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {resource?.tags?.slice(0, 3)?.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
          {resource?.tags?.length > 3 && (
            <span className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-full">
              +{resource?.tags?.length - 3}
            </span>
          )}
        </div>

        {/* Metadata */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-xs text-text-secondary">
            {resource?.duration && (
              <div className="flex items-center">
                <Icon name="Clock" size={12} className="mr-1" />
                {resource?.duration}
              </div>
            )}
            
            {resource?.difficulty && (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(resource?.difficulty)}`}>
                {resource?.difficulty}
              </span>
            )}
            
            <div className="flex items-center">
              <Icon name="Users" size={12} className="mr-1" />
              {resource?.enrolledCount || resource?.viewCount}
            </div>
          </div>

          {resource?.rating && (
            <div className="flex items-center">
              <Icon name="Star" size={12} className="text-yellow-500 mr-1" />
              <span className="text-xs font-medium text-text-primary">{resource?.rating}</span>
            </div>
          )}
        </div>

        {/* Progress Bar (for courses) */}
        {resource?.type === 'course' && resource?.progress !== undefined && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-text-secondary mb-1">
              <span>Progress</span>
              <span>{resource?.progress}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-base"
                style={{ width: `${resource?.progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <Button
          variant={resource?.isPremium ? "default" : "outline"}
          size="sm"
          iconName={resource?.type === 'course' ? "Play" : "Eye"}
          iconPosition="left"
          fullWidth
          onClick={() => onView(resource)}
        >
          {resource?.type === 'course' 
            ? (resource?.progress > 0 ? 'Continue' : 'Start Course')
            : resource?.type === 'tool' ?'Use Tool' :'View Resource'
          }
        </Button>
      </div>
    </div>
  );
};

export default ResourceCard;