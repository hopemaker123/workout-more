import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProfileHeader = ({ profile, isOwnProfile = true, onEditProfile, onConnectRequest }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };

  const getVerificationBadge = (level) => {
    const badges = {
      'verified': { icon: 'CheckCircle', color: 'text-success', bg: 'bg-success/10' },
      'premium': { icon: 'Crown', color: 'text-accent', bg: 'bg-accent/10' },
      'expert': { icon: 'Award', color: 'text-primary', bg: 'bg-primary/10' }
    };
    return badges?.[level] || badges?.verified;
  };

  return (
    <div className="bg-card rounded-xl shadow-professional border border-border overflow-hidden">
      {/* Cover Image */}
      <div className="h-48 bg-gradient-to-r from-primary via-secondary to-accent relative">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-4 right-4">
          {isOwnProfile && (
            <Button
              variant="outline"
              size="sm"
              iconName="Camera"
              className="bg-white/90 hover:bg-white"
            >
              Edit Cover
            </Button>
          )}
        </div>
      </div>
      {/* Profile Content */}
      <div className="px-6 pb-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between -mt-16 relative z-10">
          {/* Profile Image & Basic Info */}
          <div className="flex flex-col sm:flex-row sm:items-end space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-xl border-4 border-white shadow-elevated overflow-hidden bg-muted">
                <Image
                  src={profile?.avatar}
                  alt={profile?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {isOwnProfile && (
                <button className="absolute bottom-2 right-2 w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-professional hover:bg-primary/90 transition-colors">
                  <Icon name="Camera" size={16} color="white" />
                </button>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-2xl font-bold text-text-primary">{profile?.name}</h1>
                <div className="flex items-center space-x-2">
                  {profile?.verifications?.map((verification) => {
                    const badge = getVerificationBadge(verification);
                    return (
                      <div
                        key={verification}
                        className={`flex items-center space-x-1 px-2 py-1 rounded-lg ${badge?.bg}`}
                        title={`${verification} verified`}
                      >
                        <Icon name={badge?.icon} size={14} className={badge?.color} />
                        <span className={`text-xs font-medium capitalize ${badge?.color}`}>
                          {verification}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <p className="text-lg text-primary font-medium mb-1">{profile?.title}</p>
              <p className="text-text-secondary mb-3">{profile?.location}</p>

              <div className="flex items-center space-x-6 text-sm text-text-secondary">
                <div className="flex items-center space-x-1">
                  <Icon name="Users" size={16} />
                  <span>{profile?.connections} connections</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={16} />
                  <span>{profile?.rating} ({profile?.reviews} reviews)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="MapPin" size={16} />
                  <span>{profile?.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3 mt-6 lg:mt-0">
            {isOwnProfile ? (
              <>
                <Button
                  variant="outline"
                  iconName="Edit"
                  iconPosition="left"
                  onClick={onEditProfile}
                >
                  Edit Profile
                </Button>
                <Button
                  variant="default"
                  iconName="Share"
                  iconPosition="left"
                >
                  Share Profile
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  iconName={isFollowing ? "UserCheck" : "UserPlus"}
                  iconPosition="left"
                  onClick={handleFollowToggle}
                >
                  {isFollowing ? "Following" : "Follow"}
                </Button>
                <Button
                  variant="default"
                  iconName="MessageCircle"
                  iconPosition="left"
                  onClick={onConnectRequest}
                >
                  Connect
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{profile?.stats?.profileViews}</div>
            <div className="text-sm text-text-secondary">Profile Views</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary">{profile?.stats?.projectsCompleted}</div>
            <div className="text-sm text-text-secondary">Projects Done</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">{profile?.stats?.successRate}%</div>
            <div className="text-sm text-text-secondary">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">{profile?.stats?.responseTime}h</div>
            <div className="text-sm text-text-secondary">Response Time</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;