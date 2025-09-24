import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [userType, setUserType] = useState('job-seeker');
  const navigate = useNavigate();

  const heroContent = {
    'job-seeker': {
      title: "Your Next Career Move Starts Here",
      subtitle: "Discover opportunities that match your ambitions across industries and skill levels",
      cta: "Explore Jobs",
      ctaAction: () => navigate('/opportunity-explorer?type=jobs'),
      stats: { label: "Active Job Listings", value: "12,847" },
      bgGradient: "from-primary via-secondary to-accent"
    },
    'employer': {
      title: "Find Top Talent, Build Great Teams",
      subtitle: "Connect with verified professionals and streamline your hiring process",
      cta: "Post a Job",
      ctaAction: () => navigate('/services-marketplace?action=post-job'),
      stats: { label: "Qualified Candidates", value: "45,230" },
      bgGradient: "from-secondary via-accent to-primary"
    },
    'marketer': {
      title: "Grow Your Marketing Business",
      subtitle: "Access premium clients and showcase your expertise to businesses that need results",
      cta: "Join Marketers",
      ctaAction: () => navigate('/services-marketplace?vertical=marketing'),
      stats: { label: "Marketing Projects", value: "8,945" },
      bgGradient: "from-accent via-primary to-secondary"
    },
    'real-estate': {
      title: "Real Estate Success Simplified",
      subtitle: "Whether buying, selling, or investing, access tools and opportunities that deliver results",
      cta: "Explore Properties",
      ctaAction: () => navigate('/services-marketplace?vertical=real-estate'),
      stats: { label: "Property Listings", value: "23,156" },
      bgGradient: "from-primary via-accent to-secondary"
    }
  };

  const userTypes = Object.keys(heroContent);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % userTypes?.length);
      setUserType(userTypes?.[(currentSlide + 1) % userTypes?.length]);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide, userTypes]);

  const currentContent = heroContent?.[userType];

  const handleUserTypeSelect = (type) => {
    setUserType(type);
    setCurrentSlide(userTypes?.indexOf(type));
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted to-background">
      {/* Animated Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${currentContent?.bgGradient} opacity-5 transition-all duration-slow`}></div>
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-opportunity-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-secondary/10 rounded-full animate-opportunity-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-accent/10 rounded-full animate-opportunity-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-10 w-12 h-12 bg-primary/10 rounded-full animate-opportunity-pulse" style={{ animationDelay: '3s' }}></div>
      </div>
      <div className="container-professional relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* User Type Selector */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-2 p-2 bg-card/80 backdrop-blur-sm rounded-xl border border-border shadow-professional">
              {userTypes?.map((type) => (
                <button
                  key={type}
                  onClick={() => handleUserTypeSelect(type)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-base ${
                    userType === type
                      ? 'bg-primary text-primary-foreground shadow-professional'
                      : 'text-text-secondary hover:text-primary hover:bg-muted'
                  }`}
                >
                  {type?.split('-')?.map(word => word?.charAt(0)?.toUpperCase() + word?.slice(1))?.join(' ')}
                </button>
              ))}
            </div>
          </div>

          <div className="text-center space-y-8">
            {/* Main Content */}
            <div className="space-y-6 animate-professional-slide">
              <h1 className="text-hero text-primary font-bold leading-tight">
                {currentContent?.title}
              </h1>
              
              <p className="text-body-large text-text-secondary max-w-3xl mx-auto leading-relaxed">
                {currentContent?.subtitle}
              </p>

              {/* Stats */}
              <div className="flex justify-center">
                <div className="bg-card/80 backdrop-blur-sm rounded-xl px-6 py-4 border border-border shadow-professional">
                  <div className="text-2xl font-bold text-primary">{currentContent?.stats?.value}</div>
                  <div className="text-sm text-text-secondary">{currentContent?.stats?.label}</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                variant="default"
                size="lg"
                iconName="ArrowRight"
                iconPosition="right"
                onClick={currentContent?.ctaAction}
                className="professional-button"
              >
                {currentContent?.cta}
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

            {/* Trust Indicators */}
            <div className="pt-12">
              <p className="text-caption text-text-secondary mb-6">Trusted by professionals worldwide</p>
              <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={20} className="text-success" />
                  <span className="text-sm font-medium">SSL Secured</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Award" size={20} className="text-accent" />
                  <span className="text-sm font-medium">Industry Certified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Users" size={20} className="text-secondary" />
                  <span className="text-sm font-medium">500K+ Professionals</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Star" size={20} className="text-warning" />
                  <span className="text-sm font-medium">4.9/5 Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-opportunity-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;