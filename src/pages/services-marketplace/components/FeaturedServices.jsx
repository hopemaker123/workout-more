import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedServices = ({ services, onViewService, onContactProvider }) => {
  const featuredServices = services?.filter(service => service?.featured)?.slice(0, 3);

  if (featuredServices?.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-accent to-warning rounded-lg flex items-center justify-center">
            <Icon name="Star" size={16} color="white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-text-primary">Featured Services</h2>
            <p className="text-sm text-text-secondary">Hand-picked premium services from top providers</p>
          </div>
        </div>
        <Button variant="outline" size="sm" iconName="ArrowRight" iconPosition="right">
          View All Featured
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredServices?.map((service) => (
          <div
            key={service?.id}
            className="bg-card border border-border rounded-lg shadow-professional hover:shadow-elevated transition-all duration-base group cursor-pointer"
            onClick={() => onViewService(service)}
          >
            {/* Service Image */}
            <div className="relative overflow-hidden rounded-t-lg h-40">
              <Image
                src={service?.image}
                alt={service?.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-base"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium flex items-center">
                  <Icon name="Star" size={12} className="mr-1" />
                  Featured
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-base"></div>
            </div>

            {/* Service Content */}
            <div className="p-4">
              {/* Provider Info */}
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-6 h-6 rounded-full overflow-hidden">
                  <Image
                    src={service?.provider?.avatar}
                    alt={service?.provider?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm font-medium text-text-primary">{service?.provider?.name}</span>
                {service?.provider?.verified && (
                  <Icon name="BadgeCheck" size={14} className="text-blue-500" />
                )}
                <div className="flex items-center ml-auto">
                  <Icon name="Star" size={12} className="text-yellow-400 fill-current" />
                  <span className="text-xs text-text-secondary ml-1">{service?.provider?.rating}</span>
                </div>
              </div>

              {/* Service Title */}
              <h3 className="text-base font-semibold text-text-primary mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-base">
                {service?.title}
              </h3>

              {/* Service Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {service?.tags?.slice(0, 2)?.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Service Stats */}
              <div className="flex items-center justify-between text-xs text-text-secondary mb-3">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center">
                    <Icon name="Clock" size={12} className="mr-1" />
                    <span>{service?.deliveryTime}</span>
                  </div>
                  <div className="flex items-center">
                    <Icon name="RotateCcw" size={12} className="mr-1" />
                    <span>{service?.revisions} rev</span>
                  </div>
                </div>
              </div>

              {/* Pricing & Action */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-text-secondary">Starting at</span>
                  <div className="text-lg font-bold text-primary">${service?.startingPrice}</div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="MessageCircle"
                  onClick={(e) => {
                    e?.stopPropagation();
                    onContactProvider(service);
                  }}
                >
                  Contact
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Featured Benefits */}
      <div className="mt-6 p-4 bg-card/50 rounded-lg border border-border/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <Icon name="Shield" size={16} className="text-green-600" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-text-primary">Verified Quality</h4>
              <p className="text-xs text-text-secondary">All featured services are quality-verified</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={16} className="text-blue-600" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-text-primary">Fast Delivery</h4>
              <p className="text-xs text-text-secondary">Priority processing for featured services</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <Icon name="Award" size={16} className="text-purple-600" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-text-primary">Top Rated</h4>
              <p className="text-xs text-text-secondary">Highest customer satisfaction scores</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedServices;