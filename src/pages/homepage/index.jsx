import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import VerticalShowcase from './components/VerticalShowcase';
import TestimonialSection from './components/TestimonialSection';
import ActivityFeed from './components/ActivityFeed';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import { fetchUsers } from '../../utils/api';

const Homepage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);

    const getUsers = async () => {
      try {
        const usersData = await fetchUsers();
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    getUsers();
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

        {/* Users Section */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-8">Users from our Database</h2>
          {users.length > 0 ? (
            <ul>
              {users.map(user => (
                <li key={user.id}>{user.name} - {user.email}</li>
              ))}
            </ul>
          ) : (
            <p className="text-center">Could not fetch users. Please make sure the database is running and the credentials are correct.</p>
          )}
        </div>

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
