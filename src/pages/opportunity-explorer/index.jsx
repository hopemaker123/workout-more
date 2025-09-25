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
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(true);

  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'newest', label: 'Newest First' },
    { value: 'salary-high', label: 'Highest Salary' },
    { value: 'match-score', label: 'Best Match' },
    { value: 'location', label: 'Location' }
  ];

  useEffect(() => {
    const fetchOpportunities = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({
          q: searchQuery,
          ...filters,
          sortBy,
          page: currentPage,
        });
        const response = await fetch(`http://localhost:3001/api/opportunities?${params.toString()}`);
        if (!response.ok) {
          throw new Error('Failed to fetch opportunities');
        }
        const data = await response.json();
        setOpportunities(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOpportunities();
  }, [searchQuery, filters, sortBy, currentPage]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
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

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };
  
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
                  onFiltersChange={handleFiltersChange}
                  activeFilters={filters}
                />
              )}
              
              {/* AI Insights */}
              <AIInsights
                opportunities={opportunities}
              />
              
              {/* Saved Searches */}
              <SavedSearches/>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Stats */}
              <OpportunityStats
                totalResults={opportunities.length}
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
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-1 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      {sortOptions?.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
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
                      <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
                      <div className="h-3 bg-muted rounded w-1/2 mb-2"></div>
                      <div className="h-3 bg-muted rounded w-full"></div>
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="text-center py-12 bg-card border border-border rounded-lg">
                  <Icon name="AlertCircle" size={64} className="text-red-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-text-primary mb-2">Error Fetching Opportunities</h3>
                  <p className="text-text-secondary mb-6">{error}</p>
                </div>
              ) : opportunities.length > 0 ? (
                <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1' : 'grid-cols-1'}`}>
                  {opportunities.map((opportunity) => (
                    <OpportunityCard
                      key={opportunity.id}
                      opportunity={opportunity}
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
                </div>
              )}

              {/* Pagination */}
              {opportunities.length > 0 && (
                <div className="flex items-center justify-center space-x-4 py-8">
                  <Button
                    variant="outline"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                    iconName="ChevronLeft"
                    iconPosition="left"
                  >
                    Previous
                  </Button>
                  
                  <span className="text-sm text-text-secondary">
                    Page {currentPage}
                  </span>
                  
                  <Button
                    variant="outline"
                    // This will be disabled if we are on the last page. I will assume a fixed number of pages for now.
                    // disabled={currentPage === 5} 
                    onClick={() => setCurrentPage(prev => prev + 1)}
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
