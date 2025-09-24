import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import VerticalShowcase from './components/VerticalShowcase';
import TestimonialSection from './components/TestimonialSection';
import ActivityFeed from './components/ActivityFeed';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

const Homepage = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>WorkHub Pro - Where Professional Opportunities Converge</title>
        <meta 
          name="description" 
          content="Transform your career with WorkHub Pro's integrated platform. Discover jobs, marketing services, and real estate opportunities. Join 500K+ professionals achieving success across multiple verticals." 
        />
        <meta name="keywords" content="jobs, marketing services, real estate, professional platform, career opportunities, business growth" />
        <meta property="og:title" content="WorkHub Pro - Professional Convergence Platform" />
        <meta property="og:description" content="Where careers, businesses, and investments intersect. Your professional potential has no boundaries." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="WorkHub Pro - Professional Opportunities" />
        <meta name="twitter:description" content="Smart professionals choose integrated solutions. Discover your next opportunity today." />
        <link rel="canonical" href="https://workhubpro.com/homepage" />
      </Helmet>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <HeroSection />

        {/* Vertical Showcase */}
        <VerticalShowcase />

        {/* Testimonials */}
        <TestimonialSection />

        {/* Live Activity Feed */}
        <ActivityFeed />

        {/* Call to Action */}
        <CTASection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Homepage;