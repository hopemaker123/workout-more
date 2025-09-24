import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import all components
import ServiceCard from './components/ServiceCard';
import FilterSidebar from './components/FilterSidebar';
import SearchHeader from './components/SearchHeader';
import ServiceModal from './components/ServiceModal';
import CategoryTabs from './components/CategoryTabs';
import FeaturedServices from './components/FeaturedServices';

const ServicesMarketplace = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // State management
  const [searchQuery, setSearchQuery] = useState(searchParams?.get('search') || '');
  const [activeCategory, setActiveCategory] = useState(searchParams?.get('category') || 'all');
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: { min: '', max: '' },
    deliveryTime: [],
    rating: [],
    verified: false,
    featured: false
  });

  // Mock services data
  const mockServices = [
    {
      id: 1,
      title: "Professional Resume Writing & LinkedIn Optimization",
      description: "Transform your career prospects with expertly crafted resumes and LinkedIn profiles that get noticed by recruiters and hiring managers.",
      category: "Job Placement",
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop",
      startingPrice: 149,
      originalPrice: 199,
      deliveryTime: "3 days",
      revisions: 3,
      featured: true,
      tags: ["Resume Writing", "LinkedIn", "Career Coaching", "ATS Optimization"],
      provider: {
        id: 101,
        name: "Sarah Mitchell",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        rating: 4.9,
        completedJobs: 847,
        verified: true,
        title: "Senior Career Consultant"
      },
      deliverables: [
        "ATS-optimized resume",
        "LinkedIn profile optimization",
        "Cover letter template",
        "Interview preparation guide"
      ],
      isWishlisted: false
    },
    {
      id: 2,
      title: "Complete Digital Marketing Campaign Setup",
      description: "Launch your business with comprehensive digital marketing campaigns across Google Ads, Facebook, and Instagram with proven ROI strategies.",
      category: "Marketing",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      startingPrice: 299,
      deliveryTime: "5 days",
      revisions: 5,
      featured: true,
      tags: ["Google Ads", "Facebook Marketing", "Instagram Ads", "ROI Optimization"],
      provider: {
        id: 102,
        name: "Marcus Rodriguez",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        rating: 4.8,
        completedJobs: 623,
        verified: true,
        title: "Digital Marketing Strategist"
      },
      isWishlisted: false
    },
    {
      id: 3,
      title: "Real Estate Market Analysis & Investment Strategy",
      description: "Get detailed market analysis and investment recommendations for residential and commercial properties in your target areas.",
      category: "Real Estate",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop",
      startingPrice: 199,
      deliveryTime: "7 days",
      revisions: 2,
      featured: false,
      tags: ["Market Analysis", "Investment Strategy", "Property Valuation", "ROI Calculation"],
      provider: {
        id: 103,
        name: "Jennifer Chen",
        avatar: "https://randomuser.me/api/portraits/women/3.jpg",
        rating: 4.7,
        completedJobs: 412,
        verified: true,
        title: "Real Estate Investment Advisor"
      },
      isWishlisted: false
    },
    {
      id: 4,
      title: "Executive Recruitment & Headhunting Services",
      description: "Find top-tier executive talent for your organization with our comprehensive recruitment and headhunting services.",
      category: "Job Placement",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=300&fit=crop",
      startingPrice: 899,
      deliveryTime: "14 days",
      revisions: "Unlimited",
      featured: false,
      tags: ["Executive Search", "Headhunting", "Talent Acquisition", "Leadership Hiring"],
      provider: {
        id: 104,
        name: "David Thompson",
        avatar: "https://randomuser.me/api/portraits/men/4.jpg",
        rating: 4.9,
        completedJobs: 298,
        verified: true,
        title: "Executive Recruiter"
      },
      isWishlisted: false
    },
    {
      id: 5,
      title: "Social Media Content Creation & Management",
      description: "Boost your brand presence with engaging social media content and professional management across all major platforms.",
      category: "Marketing",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
      startingPrice: 399,
      deliveryTime: "5 days",
      revisions: 3,
      featured: true,
      tags: ["Content Creation", "Social Media", "Brand Management", "Engagement Strategy"],
      provider: {
        id: 105,
        name: "Emma Wilson",
        avatar: "https://randomuser.me/api/portraits/women/5.jpg",
        rating: 4.8,
        completedJobs: 567,
        verified: true,
        title: "Social Media Strategist"
      },
      isWishlisted: false
    },
    {
      id: 6,
      title: "Property Management & Rental Optimization",
      description: "Maximize your rental property income with professional management services and optimization strategies.",
      category: "Real Estate",
      image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&h=300&fit=crop",
      startingPrice: 249,
      deliveryTime: "3 days",
      revisions: 2,
      featured: false,
      tags: ["Property Management", "Rental Optimization", "Tenant Screening", "Income Maximization"],
      provider: {
        id: 106,
        name: "Robert Kim",
        avatar: "https://randomuser.me/api/portraits/men/6.jpg",
        rating: 4.6,
        completedJobs: 389,
        verified: true,
        title: "Property Management Specialist"
      },
      isWishlisted: false
    },
    {
      id: 7,
      title: "Career Transition Coaching & Job Search Strategy",
      description: "Navigate career changes successfully with personalized coaching and strategic job search planning.",
      category: "Job Placement",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      startingPrice: 179,
      deliveryTime: "7 days",
      revisions: 5,
      featured: false,
      tags: ["Career Coaching", "Job Search", "Career Transition", "Professional Development"],
      provider: {
        id: 107,
        name: "Lisa Anderson",
        avatar: "https://randomuser.me/api/portraits/women/7.jpg",
        rating: 4.9,
        completedJobs: 445,
        verified: true,
        title: "Career Transition Coach"
      },
      isWishlisted: false
    },
    {
      id: 8,
      title: "E-commerce Marketing & Conversion Optimization",
      description: "Increase your online sales with proven e-commerce marketing strategies and conversion rate optimization.",
      category: "Marketing",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
      startingPrice: 349,
      deliveryTime: "10 days",
      revisions: 4,
      featured: false,
      tags: ["E-commerce", "Conversion Optimization", "Online Sales", "Marketing Automation"],
      provider: {
        id: 108,
        name: "Alex Johnson",
        avatar: "https://randomuser.me/api/portraits/men/8.jpg",
        rating: 4.7,
        completedJobs: 334,
        verified: true,
        title: "E-commerce Marketing Specialist"
      },
      isWishlisted: false
    }
  ];

  // Mock categories data
  const categories = [
    { id: 'all', name: 'All Categories', count: mockServices.length },
    { id: 'job-placement', name: 'Job Placement', count: mockServices.filter(s => s.category === 'Job Placement').length },
    { id: 'marketing', name: 'Marketing', count: mockServices.filter(s => s.category === 'Marketing').length },
    { id: 'real-estate', name: 'Real Estate', count: mockServices.filter(s => s.category === 'Real Estate').length }
  ];

  // Filter and sort services
  const getFilteredServices = () => {
    let filtered = [...mockServices];

    // Search filter
    if (searchQuery) {
      filtered = filtered?.filter(service =>
        service?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        service?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        service?.tags?.some(tag => tag?.toLowerCase()?.includes(searchQuery?.toLowerCase()))
      );
    }

    // Category filter
    if (activeCategory !== 'all') {
      filtered = filtered?.filter(service =>
        service?.category?.toLowerCase()?.replace(' ', '-') === activeCategory
      );
    }

    // Apply additional filters
    if (filters?.verified) {
      filtered = filtered?.filter(service => service?.provider?.verified);
    }

    if (filters?.featured) {
      filtered = filtered?.filter(service => service?.featured);
    }

    if (filters?.priceRange?.min || filters?.priceRange?.max) {
      filtered = filtered?.filter(service => {
        const price = service?.startingPrice;
        const min = filters?.priceRange?.min ? parseInt(filters?.priceRange?.min) : 0;
        const max = filters?.priceRange?.max ? parseInt(filters?.priceRange?.max) : Infinity;
        return price >= min && price <= max;
      });
    }

    // Sort services
    switch (sortBy) {
      case 'price-low':
        filtered?.sort((a, b) => a?.startingPrice - b?.startingPrice);
        break;
      case 'price-high':
        filtered?.sort((a, b) => b?.startingPrice - a?.startingPrice);
        break;
      case 'rating':
        filtered?.sort((a, b) => b?.provider?.rating - a?.provider?.rating);
        break;
      case 'newest':
        filtered?.sort((a, b) => b?.id - a?.id);
        break;
      case 'popular':
        filtered?.sort((a, b) => b?.provider?.completedJobs - a?.provider?.completedJobs);
        break;
      default:
        // Keep original order for relevance
        break;
    }

    return filtered;
  };

  const filteredServices = getFilteredServices();

  // Event handlers
  const handleSearchChange = (query) => {
    setSearchQuery(query);
    const params = new URLSearchParams(searchParams);
    if (query) {
      params?.set('search', query);
    } else {
      params?.delete('search');
    }
    setSearchParams(params);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    const params = new URLSearchParams(searchParams);
    if (category !== 'all') {
      params?.set('category', category);
    } else {
      params?.delete('category');
    }
    setSearchParams(params);
  };

  const handleViewService = (service) => {
    setSelectedService(service);
    setIsServiceModalOpen(true);
  };

  const handleContactProvider = (service) => {
    // Mock contact functionality
    alert(`Contacting ${service?.provider?.name} about "${service?.title}"`);
  };

  const handleHireService = (service, packageInfo, message) => {
    // Mock hire functionality
    alert(`Hiring ${service?.provider?.name} for "${service?.title}" - ${packageInfo?.name} package ($${packageInfo?.price})`);
    setIsServiceModalOpen(false);
  };

  const handleAddToWishlist = (serviceId, isWishlisted) => {
    if (isWishlisted) {
      setWishlist([...wishlist, serviceId]);
    } else {
      setWishlist(wishlist?.filter(id => id !== serviceId));
    }
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      categories: [],
      priceRange: { min: '', max: '' },
      deliveryTime: [],
      rating: [],
      verified: false,
      featured: false
    });
  };

  // Check for action parameter
  useEffect(() => {
    const action = searchParams?.get('action');
    if (action === 'create') {
      // Mock create listing functionality
      alert('Create listing functionality would be implemented here');
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="container-professional section-spacing">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-hero text-text-primary mb-4">
              Services Marketplace
            </h1>
            <p className="text-body-large text-text-secondary max-w-3xl mx-auto">
              Browse and offer services across job placement, marketing, and real estate. 
              Connect with verified professionals and grow your business with trusted service providers.
            </p>
          </div>

          {/* Featured Services */}
          <FeaturedServices
            services={mockServices}
            onViewService={handleViewService}
            onContactProvider={handleContactProvider}
          />

          {/* Category Tabs */}
          <CategoryTabs
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />

          {/* Search Header */}
          <SearchHeader
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            sortBy={sortBy}
            onSortChange={setSortBy}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            totalResults={filteredServices?.length}
          />

          {/* Main Content */}
          <div className="flex gap-6">
            {/* Filter Sidebar */}
            <FilterSidebar
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
              isCollapsed={isFilterCollapsed}
              onToggleCollapse={() => setIsFilterCollapsed(!isFilterCollapsed)}
            />

            {/* Services Grid/List */}
            <div className="flex-1">
              {filteredServices?.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Search" size={24} className="text-text-secondary" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">No services found</h3>
                  <p className="text-text-secondary mb-4">
                    Try adjusting your search criteria or browse different categories
                  </p>
                  <Button
                    variant="outline"
                    iconName="RotateCcw"
                    iconPosition="left"
                    onClick={handleClearFilters}
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div className={`grid gap-6 ${
                  viewMode === 'grid' ?'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' :'grid-cols-1'
                }`}>
                  {filteredServices?.map((service) => (
                    <ServiceCard
                      key={service?.id}
                      service={service}
                      onViewDetails={handleViewService}
                      onAddToWishlist={handleAddToWishlist}
                      onContact={handleContactProvider}
                    />
                  ))}
                </div>
              )}

              {/* Load More Button */}
              {filteredServices?.length > 0 && (
                <div className="text-center mt-8">
                  <Button
                    variant="outline"
                    size="lg"
                    iconName="ChevronDown"
                    iconPosition="right"
                  >
                    Load More Services
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Success Stories Section */}
          <div className="mt-16 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-2">Success Stories</h2>
              <p className="text-text-secondary">See how our marketplace has helped professionals succeed</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card rounded-lg p-6 shadow-professional">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Icon name="TrendingUp" size={20} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">250% ROI Increase</h3>
                    <p className="text-sm text-text-secondary">Marketing Campaign</p>
                  </div>
                </div>
                <p className="text-sm text-text-secondary">
                  "The digital marketing service helped us achieve a 250% increase in ROI within 3 months."
                </p>
              </div>
              
              <div className="bg-card rounded-lg p-6 shadow-professional">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Icon name="Briefcase" size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">Executive Placement</h3>
                    <p className="text-sm text-text-secondary">Within 2 Weeks</p>
                  </div>
                </div>
                <p className="text-sm text-text-secondary">
                  "Found the perfect C-level executive for our startup in just 2 weeks through their recruitment service."
                </p>
              </div>
              
              <div className="bg-card rounded-lg p-6 shadow-professional">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Icon name="Home" size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">$2M Property Deal</h3>
                    <p className="text-sm text-text-secondary">Investment Success</p>
                  </div>
                </div>
                <p className="text-sm text-text-secondary">
                  "The market analysis service helped us close a $2M commercial property investment."
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Service Detail Modal */}
      <ServiceModal
        service={selectedService}
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        onContact={handleContactProvider}
        onHire={handleHireService}
      />
    </div>
  );
};

export default ServicesMarketplace;