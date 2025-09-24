import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ReviewsSection = ({ profile, isOwnProfile = true }) => {
  const [selectedRating, setSelectedRating] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const ratingFilters = [
    { id: 'all', name: 'All Reviews', count: profile?.reviews?.length },
    { id: '5', name: '5 Stars', count: profile?.reviews?.filter(r => r?.rating === 5)?.length },
    { id: '4', name: '4 Stars', count: profile?.reviews?.filter(r => r?.rating === 4)?.length },
    { id: '3', name: '3 Stars', count: profile?.reviews?.filter(r => r?.rating === 3)?.length },
    { id: '2', name: '2 Stars', count: profile?.reviews?.filter(r => r?.rating === 2)?.length },
    { id: '1', name: '1 Star', count: profile?.reviews?.filter(r => r?.rating === 1)?.length }
  ];

  const sortOptions = [
    { id: 'recent', name: 'Most Recent' },
    { id: 'oldest', name: 'Oldest First' },
    { id: 'highest', name: 'Highest Rating' },
    { id: 'lowest', name: 'Lowest Rating' }
  ];

  const filteredReviews = selectedRating === 'all' 
    ? profile?.reviews 
    : profile?.reviews?.filter(review => review?.rating === parseInt(selectedRating));

  const sortedReviews = [...filteredReviews]?.sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.date) - new Date(a.date);
      case 'oldest':
        return new Date(a.date) - new Date(b.date);
      case 'highest':
        return b?.rating - a?.rating;
      case 'lowest':
        return a?.rating - b?.rating;
      default:
        return 0;
    }
  });

  const renderStars = (rating, size = 16) => {
    return [...Array(5)]?.map((_, index) => (
      <Icon
        key={index}
        name="Star"
        size={size}
        className={index < rating ? 'text-accent fill-current' : 'text-muted-foreground'}
      />
    ));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-6">
      {/* Reviews Overview */}
      <div className="bg-card rounded-xl shadow-professional border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-text-primary">Reviews & Testimonials</h3>
          {!isOwnProfile && (
            <Button variant="outline" size="sm" iconName="MessageSquare" iconPosition="left">
              Write Review
            </Button>
          )}
        </div>

        {/* Rating Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Overall Rating */}
          <div className="text-center p-6 bg-muted rounded-lg">
            <div className="text-4xl font-bold text-primary mb-2">{profile?.overallRating}</div>
            <div className="flex items-center justify-center space-x-1 mb-2">
              {renderStars(Math.round(profile?.overallRating), 20)}
            </div>
            <div className="text-sm text-text-secondary">
              Based on {profile?.reviews?.length} reviews
            </div>
          </div>

          {/* Rating Breakdown */}
          <div className="lg:col-span-2">
            <h4 className="font-semibold text-text-primary mb-4">Rating Breakdown</h4>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1]?.map((rating) => {
                const count = profile?.reviews?.filter(r => r?.rating === rating)?.length;
                const percentage = profile?.reviews?.length > 0 ? (count / profile?.reviews?.length) * 100 : 0;
                
                return (
                  <div key={rating} className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1 w-16">
                      <span className="text-sm font-medium">{rating}</span>
                      <Icon name="Star" size={14} className="text-accent fill-current" />
                    </div>
                    <div className="flex-1 bg-border rounded-full h-2">
                      <div 
                        className="bg-accent h-2 rounded-full transition-all duration-slow"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-text-secondary w-12 text-right">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          {/* Rating Filter */}
          <div className="flex flex-wrap gap-2">
            {ratingFilters?.map((filter) => (
              <button
                key={filter?.id}
                onClick={() => setSelectedRating(filter?.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-base ${
                  selectedRating === filter?.id
                    ? 'bg-primary text-primary-foreground shadow-professional'
                    : 'bg-muted text-text-primary hover:bg-secondary hover:text-secondary-foreground'
                }`}
              >
                {filter?.name} ({filter?.count})
              </button>
            ))}
          </div>

          {/* Sort Options */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-text-secondary">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e?.target?.value)}
              className="px-3 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {sortOptions?.map((option) => (
                <option key={option?.id} value={option?.id}>
                  {option?.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {sortedReviews?.map((review, index) => (
            <div key={index} className="p-4 bg-muted rounded-lg">
              <div className="flex items-start space-x-4">
                {/* Reviewer Avatar */}
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={review?.reviewer?.avatar}
                    alt={review?.reviewer?.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  {/* Review Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-text-primary">{review?.reviewer?.name}</h4>
                      <p className="text-sm text-text-secondary">{review?.reviewer?.title}</p>
                    </div>
                    <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                      <div className="flex items-center space-x-1">
                        {renderStars(review?.rating)}
                      </div>
                      <span className="text-sm text-text-secondary">{formatDate(review?.date)}</span>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="flex items-center space-x-4 mb-3 text-sm text-text-secondary">
                    <div className="flex items-center space-x-1">
                      <Icon name="Briefcase" size={14} />
                      <span>{review?.project}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="DollarSign" size={14} />
                      <span>${review?.projectValue}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Calendar" size={14} />
                      <span>{review?.duration}</span>
                    </div>
                  </div>

                  {/* Review Content */}
                  <p className="text-text-primary mb-4">{review?.content}</p>

                  {/* Review Categories */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    {Object.entries(review?.categories)?.map(([category, rating]) => (
                      <div key={category} className="text-center">
                        <div className="text-sm font-medium text-text-primary capitalize mb-1">
                          {category?.replace(/([A-Z])/g, ' $1')?.trim()}
                        </div>
                        <div className="flex items-center justify-center space-x-1">
                          {renderStars(rating, 14)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Review Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 text-sm text-text-secondary hover:text-primary transition-colors">
                        <Icon name="ThumbsUp" size={14} />
                        <span>Helpful ({review?.helpful})</span>
                      </button>
                      <button className="flex items-center space-x-1 text-sm text-text-secondary hover:text-primary transition-colors">
                        <Icon name="MessageCircle" size={14} />
                        <span>Reply</span>
                      </button>
                    </div>
                    
                    {review?.verified && (
                      <div className="flex items-center space-x-1 text-success">
                        <Icon name="CheckCircle" size={14} />
                        <span className="text-sm font-medium">Verified</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {sortedReviews?.length > 0 && (
          <div className="text-center mt-6">
            <Button variant="outline" iconName="ChevronDown" iconPosition="right">
              Load More Reviews
            </Button>
          </div>
        )}
      </div>
      {/* Testimonials */}
      <div className="bg-card rounded-xl shadow-professional border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Featured Testimonials</h3>
          {isOwnProfile && (
            <Button variant="ghost" size="sm" iconName="Settings">
              Manage
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {profile?.testimonials?.map((testimonial, index) => (
            <div key={index} className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg border border-primary/10">
              <div className="flex items-center space-x-1 mb-4">
                {renderStars(5, 18)}
              </div>
              
              <blockquote className="text-text-primary mb-4 italic">
                "{testimonial?.content}"
              </blockquote>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={testimonial?.author?.avatar}
                    alt={testimonial?.author?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold text-text-primary">{testimonial?.author?.name}</div>
                  <div className="text-sm text-text-secondary">{testimonial?.author?.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;