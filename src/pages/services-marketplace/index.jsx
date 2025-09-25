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
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          search: searchQuery,
          category: activeCategory,
          sortBy,
          ...filters,
        });

        const response = await fetch(`http://localhost:3001/api/services?${params.toString()}`);
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        const data = await response.json();
        setServices(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [searchQuery, activeCategory, sortBy, filters]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        const allCategories = { id: 'all', name: 'All Categories', service_count: data.reduce((acc, cat) => acc + Number(cat.service_count), 0) };
        setCategories([allCategories, ...data]);
      } catch (err) {
        console.error(err);
        // Handle error silently for categories, or set an error state
      }
    };

    fetchCategories();
  }, []);

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
            services={services.filter(s => s.featured)} // Assuming featured services are flagged
            onViewService={handleViewService}
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
            totalResults={services.length}
          />

          {/* Main Content */}
          <div className="flex gap-6">
            {/* Filter Sidebar */}
            <FilterSidebar
              filters={filters}
              onFiltersChange={setFilters}
              isCollapsed={isFilterCollapsed}
              onToggleCollapse={() => setIsFilterCollapsed(!isFilterCollapsed)}
            />

            {/* Services Grid/List */}
            <div className="flex-1">
              {loading ? (
                <div>Loading...</div>
              ) : error ? (
                <div>Error: {error}</div>
              ) : services.length === 0 ? (
                <div className="text-center py-12">
                   <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                     <Icon name="Search" size={24} className="text-text-secondary" />
                   </div>
                   <h3 className="text-lg font-semibold text-text-primary mb-2">No services found</h3>
                   <p className="text-text-secondary mb-4">
                     Try adjusting your search criteria or browse different categories
                   </p>
                 </div>
              ) : (
                <div className={`grid gap-6 ${
                  viewMode === 'grid' ?'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' :'grid-cols-1'
                }`}>
                  {services.map((service) => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      onViewDetails={handleViewService}
                      onAddToWishlist={handleAddToWishlist} // This needs to be implemented
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      {/* Service Detail Modal */}
      <ServiceModal
        service={selectedService}
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
      />
    </div>
  );
};

export default ServicesMarketplace;
