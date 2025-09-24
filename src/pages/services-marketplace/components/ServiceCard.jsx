import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ServiceCard = ({ service, onViewDetails, onAddToWishlist, onContact }) => {
  const [isWishlisted, setIsWishlisted] = useState(service?.isWishlisted || false);

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    onAddToWishlist(service?.id, !isWishlisted);
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Job Placement': return 'Briefcase';
      case 'Marketing': return 'TrendingUp';
      case 'Real Estate': return 'Home';
      default: return 'Star';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Job Placement': return 'text-blue-600 bg-blue-50';
      case 'Marketing': return 'text-green-600 bg-green-50';
      case 'Real Estate': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-professional hover:shadow-elevated transition-all duration-base group">
      {/* Service Image */}
      <div className="relative overflow-hidden rounded-t-lg h-48">
        <Image
          src={service?.image}
          alt={service?.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-base"
        />
        <div className="absolute top-3 left-3">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(service?.category)}`}>
            <Icon name={getCategoryIcon(service?.category)} size={12} className="mr-1" />
            {service?.category}
          </span>
        </div>
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-base"
        >
          <Icon 
            name={isWishlisted ? "Heart" : "Heart"} 
            size={16} 
            className={isWishlisted ? "text-red-500 fill-current" : "text-gray-600"}
          />
        </button>
        {service?.featured && (
          <div className="absolute top-3 left-1/2 transform -translate-x-1/2">
            <span className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
              Featured
            </span>
          </div>
        )}
      </div>
      {/* Service Content */}
      <div className="p-4">
        {/* Provider Info */}
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <Image
              src={service?.provider?.avatar}
              alt={service?.provider?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-text-primary truncate">{service?.provider?.name}</p>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <Icon name="Star" size={12} className="text-yellow-400 fill-current" />
                <span className="text-xs text-text-secondary ml-1">{service?.provider?.rating}</span>
              </div>
              <span className="text-xs text-text-secondary">•</span>
              <span className="text-xs text-text-secondary">{service?.provider?.completedJobs} jobs</span>
            </div>
          </div>
          {service?.provider?.verified && (
            <Icon name="BadgeCheck" size={16} className="text-blue-500" />
          )}
        </div>

        {/* Service Title & Description */}
        <h3 className="text-lg font-semibold text-text-primary mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-base">
          {service?.title}
        </h3>
        <p className="text-sm text-text-secondary mb-4 line-clamp-2">
          {service?.description}
        </p>

        {/* Service Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {service?.tags?.slice(0, 3)?.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
          {service?.tags?.length > 3 && (
            <span className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-full">
              +{service?.tags?.length - 3} more
            </span>
          )}
        </div>

        {/* Service Stats */}
        <div className="flex items-center justify-between mb-4 text-sm text-text-secondary">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Icon name="Clock" size={14} className="mr-1" />
              <span>{service?.deliveryTime}</span>
            </div>
            <div className="flex items-center">
              <Icon name="RotateCcw" size={14} className="mr-1" />
              <span>{service?.revisions} revisions</span>
            </div>
          </div>
        </div>

        {/* Pricing & Actions */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-text-secondary">Starting at</span>
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-bold text-primary">${service?.startingPrice}</span>
              {service?.originalPrice && (
                <span className="text-sm text-text-secondary line-through">${service?.originalPrice}</span>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="MessageCircle"
              onClick={() => onContact(service)}
            >
              Contact
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => onViewDetails(service)}
            >
              View Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;