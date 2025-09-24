import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CTASection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [selectedPath, setSelectedPath] = useState('explore');
  const navigate = useNavigate();

  const pathOptions = [
    {
      id: 'explore',
      title: 'Explore Opportunities',
      description: 'Discover jobs, projects, and investments',
      icon: 'Search',
      color: 'primary',
      action: () => navigate('/opportunity-explorer')
    },
    {
      id: 'profile',
      title: 'Build Your Profile',
      description: 'Create your professional presence',
      icon: 'User',
      color: 'secondary',
      action: () => navigate('/professional-profile')
    },
    {
      id: 'services',
      title: 'Browse Services',
      description: 'Find or offer professional services',
      icon: 'Store',
      color: 'accent',
      action: () => navigate('/services-marketplace')
    }
  ];

  const handleEmailSubmit = (e) => {
    e?.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  const handleGetStarted = () => {
    const selectedOption = pathOptions?.find(option => option?.id === selectedPath);
    selectedOption?.action();
  };

  return (
    <section className="section-spacing bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <div className="container-professional">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main CTA Content */}
          <div className="mb-12">
            <h2 className="text-hero text-primary mb-6 leading-tight">
              Ready to Unlock Your
              <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Professional Potential?
              </span>
            </h2>
            
            <p className="text-body-large text-text-secondary max-w-2xl mx-auto mb-8">
              Join thousands of professionals who have transformed their careers, businesses, and investments through WorkHub Pro's integrated platform.
            </p>

            {/* Path Selection */}
            <div className="mb-8">
              <p className="text-sm font-medium text-text-primary mb-4">Choose your starting point:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                {pathOptions?.map((option) => (
                  <button
                    key={option?.id}
                    onClick={() => setSelectedPath(option?.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-base text-left ${
                      selectedPath === option?.id
                        ? `border-${option?.color} bg-${option?.color}/10 shadow-professional`
                        : 'border-border bg-card hover:border-muted hover:shadow-professional'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        selectedPath === option?.id 
                          ? `bg-${option?.color} text-white` 
                          : 'bg-muted text-text-secondary'
                      }`}>
                        <Icon name={option?.icon} size={16} />
                      </div>
                      <h3 className={`font-semibold ${
                        selectedPath === option?.id 
                          ? `text-${option?.color}` 
                          : 'text-text-primary'
                      }`}>
                        {option?.title}
                      </h3>
                    </div>
                    <p className="text-sm text-text-secondary">
                      {option?.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Primary CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button
                variant="default"
                size="lg"
                iconName="ArrowRight"
                iconPosition="right"
                onClick={handleGetStarted}
                className="professional-button bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
              >
                Get Started Free
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                iconName="Play"
                iconPosition="left"
                onClick={() => navigate('/resource-library')}
              >
                Watch Demo
              </Button>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-card rounded-xl p-6 border border-border shadow-professional max-w-md mx-auto">
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Mail" size={20} className="text-primary" />
                <h3 className="font-semibold text-primary">Stay Updated</h3>
              </div>
              
              {!isSubscribed ? (
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e?.target?.value)}
                    required
                    className="text-center"
                  />
                  <Button
                    type="submit"
                    variant="outline"
                    size="sm"
                    fullWidth
                    iconName="Send"
                    iconPosition="right"
                  >
                    Get Weekly Insights
                  </Button>
                </form>
              ) : (
                <div className="text-center py-4">
                  <Icon name="CheckCircle" size={32} className="text-success mx-auto mb-2" />
                  <p className="text-sm text-success font-medium">
                    Thanks! You're subscribed to our weekly insights.
                  </p>
                </div>
              )}
              
              <p className="text-xs text-text-secondary mt-3 text-center">
                Join 50,000+ professionals getting weekly career tips
              </p>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="border-t border-border pt-8">
            <p className="text-caption text-text-secondary mb-6">
              Trusted by professionals at leading companies
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-60 mb-8">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-success" />
                <span className="text-sm">Bank-Level Security</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Award" size={16} className="text-accent" />
                <span className="text-sm">Industry Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={16} className="text-secondary" />
                <span className="text-sm">500K+ Members</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Star" size={16} className="text-warning" />
                <span className="text-sm">4.9/5 Rating</span>
              </div>
            </div>

            {/* Final Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-xl font-bold text-primary mb-1">50K+</div>
                <div className="text-xs text-text-secondary">Success Stories</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-secondary mb-1">$2.4B</div>
                <div className="text-xs text-text-secondary">Deals Facilitated</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-accent mb-1">94%</div>
                <div className="text-xs text-text-secondary">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-success mb-1">24/7</div>
                <div className="text-xs text-text-secondary">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;