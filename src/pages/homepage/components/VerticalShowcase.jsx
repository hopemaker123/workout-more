import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VerticalShowcase = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  const verticals = [
    {
      id: 'jobs',
      title: 'Job Marketplace',
      subtitle: 'Find Your Dream Career',
      description: 'Connect with top employers, discover opportunities that match your skills, and accelerate your career growth with AI-powered job matching.',
      icon: 'Briefcase',
      color: 'primary',
      stats: [
        { label: 'Active Jobs', value: '12,847' },
        { label: 'Companies', value: '3,240' },
        { label: 'Success Rate', value: '94%' }
      ],
      features: [
        'AI-Powered Job Matching',
        'Salary Insights & Negotiation',
        'Interview Preparation Tools',
        'Career Path Visualization'
      ],
      cta: 'Explore Jobs',
      ctaAction: () => navigate('/opportunity-explorer?type=jobs'),
      bgImage: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=600&fit=crop'
    },
    {
      id: 'marketing',
      title: 'Marketing Services',
      subtitle: 'Grow Your Business',
      description: 'Access premium marketing professionals, manage campaigns effectively, and scale your business with data-driven marketing solutions.',
      icon: 'TrendingUp',
      color: 'secondary',
      stats: [
        { label: 'Marketing Experts', value: '8,945' },
        { label: 'Campaigns Managed', value: '25,670' },
        { label: 'ROI Average', value: '340%' }
      ],
      features: [
        'Campaign Management Dashboard',
        'Performance Analytics',
        'Client Acquisition Tools',
        'Portfolio Showcase'
      ],
      cta: 'Find Marketers',
      ctaAction: () => navigate('/services-marketplace?vertical=marketing'),
      bgImage: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?w=800&h=600&fit=crop'
    },
    {
      id: 'real-estate',
      title: 'Real Estate Platform',
      subtitle: 'Smart Property Solutions',
      description: 'Whether buying, selling, or investing, access comprehensive real estate tools, market insights, and professional networks.',
      icon: 'Home',
      color: 'accent',
      stats: [
        { label: 'Properties Listed', value: '23,156' },
        { label: 'Agents Network', value: '5,890' },
        { label: 'Transactions', value: '$2.4B' }
      ],
      features: [
        'Virtual Property Tours',
        'Market Analytics & Insights',
        'Investment Calculators',
        'Agent Networking Tools'
      ],
      cta: 'View Properties',
      ctaAction: () => navigate('/services-marketplace?vertical=real-estate'),
      bgImage: 'https://images.pixabay.com/photo/2016/11/29/03/53/house-1867187_1280.jpg?w=800&h=600&fit=crop'
    }
  ];

  return (
    <section className="section-spacing bg-background">
      <div className="container-professional">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-value-prop text-primary mb-4">
            Three Verticals, Infinite Possibilities
          </h2>
          <p className="text-body-large text-text-secondary max-w-3xl mx-auto">
            WorkHub Pro breaks traditional silos by integrating job opportunities, marketing services, and real estate solutions into one powerful platform.
          </p>
        </div>

        {/* Vertical Cards */}
        <div className="grid-convergence">
          {verticals?.map((vertical, index) => (
            <div
              key={vertical?.id}
              className={`group relative bg-card rounded-xl border border-border shadow-professional hover:shadow-floating transition-all duration-base cursor-pointer overflow-hidden ${
                hoveredCard === vertical?.id ? 'scale-105' : ''
              }`}
              onMouseEnter={() => setHoveredCard(vertical?.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={vertical?.ctaAction}
            >
              {/* Background Image */}
              <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-base">
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${vertical?.bgImage})` }}
                ></div>
              </div>

              {/* Content */}
              <div className="relative p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-14 h-14 bg-${vertical?.color} rounded-xl flex items-center justify-center shadow-professional group-hover:scale-110 transition-transform duration-base`}>
                    <Icon 
                      name={vertical?.icon} 
                      size={28} 
                      color="white"
                    />
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-text-secondary">{vertical?.subtitle}</div>
                  </div>
                </div>

                {/* Title & Description */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors duration-base">
                    {vertical?.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {vertical?.description}
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {vertical?.stats?.map((stat, statIndex) => (
                    <div key={statIndex} className="text-center">
                      <div className={`text-lg font-bold text-${vertical?.color}`}>
                        {stat?.value}
                      </div>
                      <div className="text-xs text-text-secondary">
                        {stat?.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-primary mb-3">Key Features:</h4>
                  <div className="space-y-2">
                    {vertical?.features?.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <Icon 
                          name="Check" 
                          size={16} 
                          className={`text-${vertical?.color}`}
                        />
                        <span className="text-sm text-text-secondary">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Button
                  variant="outline"
                  size="sm"
                  iconName="ArrowRight"
                  iconPosition="right"
                  fullWidth
                  className="group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-base"
                >
                  {vertical?.cta}
                </Button>
              </div>

              {/* Hover Indicator */}
              <div className={`absolute top-4 right-4 w-3 h-3 bg-${vertical?.color} rounded-full opacity-0 group-hover:opacity-100 animate-opportunity-pulse transition-opacity duration-base`}></div>
            </div>
          ))}
        </div>

        {/* Cross-Vertical Benefits */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-2xl p-8 border border-border">
            <h3 className="text-xl font-bold text-primary mb-4">
              The Power of Integration
            </h3>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              Discover synergies between job opportunities, marketing clients, and real estate investments. Our platform intelligence identifies cross-vertical opportunities that maximize your professional potential.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center space-x-2">
                <Icon name="Zap" size={20} className="text-accent" />
                <span className="text-sm font-medium">Smart Recommendations</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Target" size={20} className="text-secondary" />
                <span className="text-sm font-medium">Opportunity Matching</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="TrendingUp" size={20} className="text-primary" />
                <span className="text-sm font-medium">Revenue Synergies</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerticalShowcase;