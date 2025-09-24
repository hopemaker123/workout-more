import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Marketing Director & Real Estate Investor",
      company: "TechFlow Solutions",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      content: "WorkHub Pro transformed my professional life. I found my dream marketing role, built a client base, and even discovered my first investment property—all through one platform. The cross-vertical insights are game-changing.",
      rating: 5,
      metrics: {
        label: "Career Growth",
        value: "300% salary increase"
      },
      vertical: "multi"
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "Software Engineer & Freelance Consultant",
      company: "InnovateTech",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      content: "The AI job matching is incredibly accurate. I landed three interviews in my first week, and the platform helped me negotiate a 40% salary increase. Now I also run consulting projects on the side.",
      rating: 5,
      metrics: {
        label: "Success Rate",
        value: "94% interview rate"
      },
      vertical: "jobs"
    },
    {
      id: 3,
      name: "Emily Thompson",
      role: "Digital Marketing Agency Owner",
      company: "Growth Catalyst",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      content: "I\'ve grown my agency from solo freelancer to 15-person team using WorkHub Pro\'s client acquisition tools. The platform\'s quality clients and project management features are unmatched.",
      rating: 5,
      metrics: {
        label: "Business Growth",
        value: "1500% revenue increase"
      },
      vertical: "marketing"
    },
    {
      id: 4,
      name: "David Park",
      role: "Real Estate Agent & Property Investor",
      company: "Park Properties",
      avatar: "https://randomuser.me/api/portraits/men/38.jpg",
      content: "The real estate analytics and networking tools helped me close $2.3M in transactions last quarter. The investment calculators are spot-on, and I've built valuable connections with other professionals.",
      rating: 5,
      metrics: {
        label: "Transactions",
        value: "$2.3M quarterly"
      },
      vertical: "real-estate"
    },
    {
      id: 5,
      name: "Lisa Wang",
      role: "Career Transition Specialist",
      company: "Previously Corporate Finance",
      avatar: "https://randomuser.me/api/portraits/women/35.jpg",
      content: "Transitioning from finance to marketing seemed impossible until I found WorkHub Pro. The learning resources, mentorship matching, and gradual skill building helped me land my dream role in 6 months.",
      rating: 5,
      metrics: {
        label: "Career Change",
        value: "6 months transition"
      },
      vertical: "transition"
    }
  ];

  const industryStats = [
    { label: "Success Stories", value: "50,000+", icon: "Trophy" },
    { label: "Average Salary Increase", value: "45%", icon: "TrendingUp" },
    { label: "Client Satisfaction", value: "4.9/5", icon: "Star" },
    { label: "Platform Growth", value: "300%", icon: "BarChart3" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [testimonials?.length]);

  const getVerticalColor = (vertical) => {
    switch (vertical) {
      case 'jobs': return 'text-primary';
      case 'marketing': return 'text-secondary';
      case 'real-estate': return 'text-accent';
      case 'multi': return 'text-primary';
      case 'transition': return 'text-secondary';
      default: return 'text-primary';
    }
  };

  const getVerticalBg = (vertical) => {
    switch (vertical) {
      case 'jobs': return 'bg-primary/10';
      case 'marketing': return 'bg-secondary/10';
      case 'real-estate': return 'bg-accent/10';
      case 'multi': return 'bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10';
      case 'transition': return 'bg-secondary/10';
      default: return 'bg-primary/10';
    }
  };

  return (
    <section className="section-spacing bg-muted/30">
      <div className="container-professional">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-value-prop text-primary mb-4">
            Success Stories That Inspire
          </h2>
          <p className="text-body-large text-text-secondary max-w-3xl mx-auto">
            Real professionals, real results. Discover how WorkHub Pro has transformed careers, businesses, and investment portfolios across all verticals.
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className={`relative bg-card rounded-2xl p-8 md:p-12 shadow-floating border border-border ${getVerticalBg(testimonials?.[currentTestimonial]?.vertical)}`}>
            {/* Quote Icon */}
            <div className="absolute top-6 left-6 opacity-20">
              <Icon name="Quote" size={48} className={getVerticalColor(testimonials?.[currentTestimonial]?.vertical)} />
            </div>

            <div className="relative">
              {/* Testimonial Content */}
              <div className="mb-8">
                <p className="text-lg leading-relaxed text-text-primary mb-6">
                  "{testimonials?.[currentTestimonial]?.content}"
                </p>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-6">
                  {[...Array(testimonials?.[currentTestimonial]?.rating)]?.map((_, i) => (
                    <Icon key={i} name="Star" size={20} className="text-warning fill-current" />
                  ))}
                </div>

                {/* Metrics */}
                <div className={`inline-flex items-center space-x-3 px-4 py-2 rounded-lg ${getVerticalBg(testimonials?.[currentTestimonial]?.vertical)} border border-border`}>
                  <Icon name="TrendingUp" size={16} className={getVerticalColor(testimonials?.[currentTestimonial]?.vertical)} />
                  <span className="text-sm font-medium text-text-primary">
                    {testimonials?.[currentTestimonial]?.metrics?.label}: 
                    <span className={`ml-1 font-bold ${getVerticalColor(testimonials?.[currentTestimonial]?.vertical)}`}>
                      {testimonials?.[currentTestimonial]?.metrics?.value}
                    </span>
                  </span>
                </div>
              </div>

              {/* Author Info */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Image
                    src={testimonials?.[currentTestimonial]?.avatar}
                    alt={testimonials?.[currentTestimonial]?.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-border"
                  />
                  <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center border-2 border-card ${getVerticalBg(testimonials?.[currentTestimonial]?.vertical)}`}>
                    <Icon name="Check" size={12} className={getVerticalColor(testimonials?.[currentTestimonial]?.vertical)} />
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold text-primary">{testimonials?.[currentTestimonial]?.name}</h4>
                  <p className="text-text-secondary text-sm">{testimonials?.[currentTestimonial]?.role}</p>
                  <p className="text-text-secondary text-xs">{testimonials?.[currentTestimonial]?.company}</p>
                </div>
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-base ${
                    index === currentTestimonial 
                      ? `${getVerticalBg(testimonials?.[currentTestimonial]?.vertical)} border-2 ${getVerticalColor(testimonials?.[currentTestimonial]?.vertical)?.replace('text-', 'border-')}` 
                      : 'bg-border hover:bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Industry Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {industryStats?.map((stat, index) => (
            <div key={index} className="text-center bg-card rounded-xl p-6 border border-border shadow-professional hover:shadow-elevated transition-all duration-base">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mx-auto mb-4">
                <Icon name={stat?.icon} size={24} color="white" />
              </div>
              <div className="text-2xl font-bold text-primary mb-1">{stat?.value}</div>
              <div className="text-sm text-text-secondary">{stat?.label}</div>
            </div>
          ))}
        </div>

        {/* Media Recognition */}
        <div className="mt-16 text-center">
          <p className="text-caption text-text-secondary mb-8">Featured in leading publications</p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
            <div className="flex items-center space-x-2">
              <Icon name="Award" size={20} className="text-accent" />
              <span className="text-sm font-medium">TechCrunch Featured</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Star" size={20} className="text-warning" />
              <span className="text-sm font-medium">Forbes Recognition</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Trophy" size={20} className="text-primary" />
              <span className="text-sm font-medium">Industry Leader 2024</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Zap" size={20} className="text-secondary" />
              <span className="text-sm font-medium">Innovation Award</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;