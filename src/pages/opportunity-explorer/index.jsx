import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SearchBar from './components/SearchBar';
import SearchFilters from './components/SearchFilters';
import OpportunityCard from './components/OpportunityCard';
import AIInsights from './components/AIInsights';
import SavedSearches from './components/SavedSearches';
import OpportunityStats from './components/OpportunityStats';

const OpportunityExplorer = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState(searchParams?.get('q') || '');
  const [filters, setFilters] = useState({
    vertical: searchParams?.get('type') || 'all',
    location: '',
    salaryRange: '',
    experienceLevel: '',
    jobType: '',
    propertyType: '',
    budget: '',
    serviceCategory: '',
    remote: false,
    urgent: false,
    verified: false
  });
  
  const [opportunities, setOpportunities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(true);

  // Mock opportunities data
  const mockOpportunities = [
    {
      id: 1,
      vertical: 'jobs',
      title: 'Senior React Developer - Remote',
      company: 'TechFlow Solutions',
      companyLogo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop',
      location: 'Remote (US)',
      salaryMin: 120000,
      salaryMax: 150000,
      salaryType: 'yearly',
      jobType: 'Full-time',
      experienceLevel: 'Senior',
      remote: true,
      urgent: false,
      featured: true,
      verified: true,
      matchScore: 95,
      description: `We're looking for a Senior React Developer to join our growing team. You'll be working on cutting-edge web applications using React, TypeScript, and modern development practices. This is a fully remote position with flexible hours and excellent benefits.\n\nKey responsibilities include developing user interfaces, collaborating with design teams, and mentoring junior developers.`,
      skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS'],
      postedTime: '2 hours ago',
      applicants: 23,
      isSaved: false
    },
    {
      id: 2,
      vertical: 'marketing',
      title: 'Digital Marketing Campaign for SaaS Startup',
      clientName: 'CloudSync Technologies',
      clientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      budgetMin: 15000,
      budgetMax: 25000,
      duration: '3 months',
      category: 'Digital Marketing',
      clientRating: 4.8,
      verified: true,
      urgent: true,
      featured: false,
      matchScore: 88,
      description: `Looking for an experienced digital marketing professional to launch our new SaaS product. The campaign will focus on lead generation, content marketing, and paid advertising across multiple channels.\n\nWe need someone who can develop and execute a comprehensive marketing strategy that drives qualified leads and increases brand awareness in the B2B space.`,
      skills: ['Google Ads', 'Facebook Ads', 'Content Marketing', 'SEO', 'Analytics'],
      postedTime: '4 hours ago',
      applicants: 15,
      isSaved: true
    },
    {
      id: 3,
      vertical: 'real-estate',
      title: 'Prime Commercial Investment Property - Downtown',
      location: 'New York, NY',
      price: 2500000,
      propertyType: 'Commercial',
      size: 8500,
      roi: 12.5,
      investment: true,
      verified: true,
      urgent: false,
      featured: true,
      matchScore: 82,
      propertyImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=100&fit=crop',
      description: `Exceptional commercial investment opportunity in the heart of downtown. This fully leased office building offers stable rental income with high-quality tenants and long-term leases.\n\nThe property features modern amenities, excellent location with public transportation access, and strong potential for appreciation in this rapidly developing area.`,
      skills: ['Investment Analysis', 'Commercial Real Estate', 'Property Management'],
      postedTime: '1 day ago',
      applicants: 8,
      isSaved: false
    },
    {
      id: 4,
      vertical: 'jobs',
      title: 'Marketing Manager - Growth Stage Startup',
      company: 'InnovateLab',
      companyLogo: 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=100&h=100&fit=crop',
      location: 'San Francisco, CA',
      salaryMin: 90000,
      salaryMax: 120000,
      salaryType: 'yearly',
      jobType: 'Full-time',
      experienceLevel: 'Mid',
      remote: false,
      urgent: true,
      featured: false,
      verified: true,
      matchScore: 78,
      description: `Join our fast-growing startup as a Marketing Manager and help scale our user acquisition efforts. You'll lead marketing campaigns, analyze performance metrics, and work closely with the product team to drive growth.\n\nThis role offers significant growth opportunities and the chance to make a real impact in a dynamic startup environment.`,
      skills: ['Growth Marketing', 'Analytics', 'A/B Testing', 'Content Strategy'],
      postedTime: '6 hours ago',
      applicants: 31,
      isSaved: false
    },
    {
      id: 5,
      vertical: 'marketing',
      title: 'SEO Optimization for E-commerce Store',
      clientName: 'Fashion Forward Boutique',
      clientAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop',
      budgetMin: 5000,
      budgetMax: 8000,
      duration: '2 months',
      category: 'SEO',
      clientRating: 4.6,
      verified: false,
      urgent: false,
      featured: false,
      matchScore: 85,
      description: `We need an SEO expert to improve our e-commerce store's search rankings and organic traffic. The project includes keyword research, on-page optimization, and technical SEO improvements.\n\nOur goal is to increase organic traffic by 50% and improve conversion rates through better search visibility.`,
      skills: ['SEO', 'Keyword Research', 'Technical SEO', 'E-commerce'],
      postedTime: '8 hours ago',
      applicants: 19,
      isSaved: false
    },
    {
      id: 6,
      vertical: 'real-estate',
      title: 'Luxury Residential Development Opportunity',
      location: 'Miami, FL',
      price: 1800000,
      propertyType: 'Residential',
      size: 12000,
      roi: 15.2,
      investment: true,
      verified: true,
      urgent: true,
      featured: false,
      matchScore: 91,
      propertyImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=100&h=100&fit=crop',
      description: `Exclusive opportunity to invest in a luxury residential development in prime Miami location. This pre-construction project offers excellent returns with projected completion in 18 months.\n\nThe development features high-end amenities, ocean views, and is located in one of Miami's most desirable neighborhoods with strong rental demand.`,
      skills: ['Real Estate Development', 'Investment Analysis', 'Market Research'],
      postedTime: '12 hours ago',
      applicants: 12,
      isSaved: true
    }
  ];

  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'newest', label: 'Newest First' },
    { value: 'salary-high', label: 'Highest Salary' },
    { value: 'match-score', label: 'Best Match' },
    { value: 'location', label: 'Location' }
  ];

  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      setOpportunities(mockOpportunities);
      setIsLoading(false);
    }, 1000);
  }, [searchQuery, filters, sortBy]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      if (query) {
        newParams?.set('q', query);
      } else {
        newParams?.delete('q');
      }
      return newParams;
    });
  };

  const handleSuggestionSelect = (suggestion) => {
    setSearchQuery(suggestion?.text);
    if (suggestion?.vertical && suggestion?.vertical !== 'all') {
      setFilters(prev => ({ ...prev, vertical: suggestion?.vertical }));
    }
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSaveOpportunity = (opportunityId, saved) => {
    setOpportunities(prev => 
      prev?.map(opp => 
        opp?.id === opportunityId ? { ...opp, isSaved: saved } : opp
      )
    );
  };

  const handleApplyToOpportunity = (opportunityId) => {
    const opportunity = opportunities?.find(opp => opp?.id === opportunityId);
    if (opportunity) {
      // Navigate to appropriate application flow
      if (opportunity?.vertical === 'jobs') {
        navigate(`/opportunity-explorer/job/${opportunityId}/apply`);
      } else if (opportunity?.vertical === 'marketing') {
        navigate(`/opportunity-explorer/project/${opportunityId}/propose`);
      } else {
        navigate(`/opportunity-explorer/property/${opportunityId}/inquire`);
      }
    }
  };

  const handleViewDetails = (opportunityId) => {
    const opportunity = opportunities?.find(opp => opp?.id === opportunityId);
    if (opportunity) {
      navigate(`/opportunity-explorer/${opportunity?.vertical}/${opportunityId}`);
    }
  };

  const handleLoadSavedSearch = (search) => {
    setSearchQuery(search?.query);
    setFilters(search?.filters);
  };

  const handleDeleteSavedSearch = (searchId) => {
    console.log('Delete saved search:', searchId);
  };

  const filteredOpportunities = opportunities?.filter(opp => {
    if (filters?.vertical !== 'all' && opp?.vertical !== filters?.vertical) return false;
    if (filters?.remote && !opp?.remote) return false;
    if (filters?.urgent && !opp?.urgent) return false;
    if (filters?.verified && !opp?.verified) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 border-b border-border">
          <div className="container-professional section-spacing">
            <div className="max-w-4xl mx-auto text-center mb-8">
              <h1 className="text-hero text-text-primary mb-4">
                Discover Your Next 
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"> Opportunity</span>
              </h1>
              <p className="text-body-large text-text-secondary mb-8">
                AI-powered discovery across jobs, marketing services, and real estate investments. 
                Find opportunities that match your skills and amplify your professional growth.
              </p>
              
              <SearchBar
                onSearch={handleSearch}
                onSuggestionSelect={handleSuggestionSelect}
                placeholder="Search across jobs, marketing projects, and real estate opportunities..."
              />
            </div>
          </div>
        </div>

        <div className="container-professional py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Search Filters */}
              {showFilters && (
                <SearchFilters
                  searchQuery={searchQuery}
                  onSearchChange={handleSearch}
                  onFiltersChange={handleFiltersChange}
                  onFilterChange={handleFiltersChange}
                  onClearFilters={() => setFilters({
                    vertical: 'all',
                    location: '',
                    salaryRange: '',
                    experienceLevel: '',
                    jobType: '',
                    propertyType: '',
                    budget: '',
                    serviceCategory: '',
                    remote: false,
                    urgent: false,
                    verified: false
                  })}
                  activeFilters={filters}
                />
              )}
              
              {/* AI Insights */}
              <AIInsights
                userProfile={{}}
                searchQuery={searchQuery}
                opportunities={opportunities}
              />
              
              {/* Saved Searches */}
              <SavedSearches
                onLoadSearch={handleLoadSavedSearch}
                onDeleteSearch={handleDeleteSavedSearch}
                onCreateAlert={() => console.log('Create alert')}
              />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Stats */}
              <OpportunityStats
                totalResults={filteredOpportunities?.length}
                searchQuery={searchQuery}
                filters={filters}
                isLoading={isLoading}
              />

              {/* Controls */}
              <div className="flex items-center justify-between bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center space-x-2 px-3 py-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors duration-base"
                  >
                    <Icon name="Filter" size={16} />
                    <span className="text-sm">Filters</span>
                  </button>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-text-secondary">Sort by:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e?.target?.value)}
                      className="px-3 py-1 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      {sortOptions?.map(option => (
                        <option key={option?.value} value={option?.value}>
                          {option?.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors duration-base ${
                      viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'bg-muted text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    <Icon name="Grid3X3" size={16} />
                  </button>
                  
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors duration-base ${
                      viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'bg-muted text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    <Icon name="List" size={16} />
                  </button>
                </div>
              </div>

              {/* Opportunities Grid */}
              {isLoading ? (
                <div className="grid grid-cols-1 gap-6">
                  {[...Array(6)]?.map((_, i) => (
                    <div key={i} className="bg-card border border-border rounded-lg p-6 animate-pulse">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-muted rounded-lg"></div>
                        <div className="flex-1 space-y-3">
                          <div className="h-4 bg-muted rounded w-3/4"></div>
                          <div className="h-3 bg-muted rounded w-1/2"></div>
                          <div className="h-3 bg-muted rounded w-full"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredOpportunities?.length > 0 ? (
                <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1' : 'grid-cols-1'}`}>
                  {filteredOpportunities?.map((opportunity) => (
                    <OpportunityCard
                      key={opportunity?.id}
                      opportunity={opportunity}
                      onSave={handleSaveOpportunity}
                      onApply={handleApplyToOpportunity}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-card border border-border rounded-lg">
                  <Icon name="Search" size={64} className="text-text-secondary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-text-primary mb-2">No Opportunities Found</h3>
                  <p className="text-text-secondary mb-6">
                    Try adjusting your search criteria or filters to find more opportunities.
                  </p>
                  <div className="flex items-center justify-center space-x-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchQuery('');
                        setFilters({
                          vertical: 'all',
                          location: '',
                          salaryRange: '',
                          experienceLevel: '',
                          jobType: '',
                          propertyType: '',
                          budget: '',
                          serviceCategory: '',
                          remote: false,
                          urgent: false,
                          verified: false
                        });
                      }}
                    >
                      Clear All Filters
                    </Button>
                    <Button
                      variant="default"
                      onClick={() => navigate('/services-marketplace')}
                      iconName="Plus"
                      iconPosition="left"
                    >
                      Post Opportunity
                    </Button>
                  </div>
                </div>
              )}

              {/* Pagination */}
              {filteredOpportunities?.length > 0 && (
                <div className="flex items-center justify-center space-x-4 py-8">
                  <Button
                    variant="outline"
                    disabled={currentPage === 1}
                    iconName="ChevronLeft"
                    iconPosition="left"
                  >
                    Previous
                  </Button>
                  
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5]?.map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-lg transition-colors duration-base ${
                          currentPage === page
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-text-secondary hover:bg-muted/80'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  
                  <Button
                    variant="outline"
                    disabled={currentPage === 5}
                    iconName="ChevronRight"
                    iconPosition="right"
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OpportunityExplorer; 