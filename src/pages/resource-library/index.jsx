import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ResourceCard from './components/ResourceCard';
import CategoryFilter from './components/CategoryFilter';
import SearchFilters from './components/SearchFilters';
import FeaturedSection from './components/FeaturedSection';
import LearningPathCard from './components/LearningPathCard';
import InteractiveToolsSection from './components/InteractiveToolsSection';

const ResourceLibrary = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [bookmarkedResources, setBookmarkedResources] = useState(new Set(['1', '3', '7']));
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState({
    type: 'all',
    difficulty: 'all',
    vertical: 'all',
    sortBy: 'newest',
    isPremium: 'all',
    bookmarkedOnly: false
  });

  // Mock data for categories
  const categories = [
    { id: 'all', name: 'All Resources', count: 247 },
    { id: 'courses', name: 'Courses', count: 89 },
    { id: 'tools', name: 'Tools', count: 34 },
    { id: 'templates', name: 'Templates', count: 56 },
    { id: 'reports', name: 'Reports', count: 28 },
    { id: 'videos', name: 'Videos', count: 23 },
    { id: 'articles', name: 'Articles', count: 17 },
    { id: 'job-marketplace', name: 'Job Marketplace', count: 78 },
    { id: 'marketing-services', name: 'Marketing Services', count: 65 },
    { id: 'real-estate', name: 'Real Estate', count: 43 }
  ];

  // Mock data for resources
  const mockResources = [
    {
      id: '1',
      title: 'Complete Digital Marketing Mastery Course',
      description: 'Master digital marketing across all channels with hands-on projects and real-world case studies. Learn SEO, PPC, social media, email marketing, and analytics.',
      type: 'course',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
      tags: ['Digital Marketing', 'SEO', 'PPC', 'Social Media'],
      duration: '12 hours',
      difficulty: 'intermediate',
      rating: 4.8,
      enrolledCount: '2,340',
      isPremium: true,
      progress: 65,
      vertical: 'marketing-services'
    },
    {
      id: '2',
      title: 'Real Estate Investment ROI Calculator',
      description: 'Calculate potential returns on real estate investments with comprehensive analysis including cash flow, appreciation, and tax benefits.',
      type: 'tool',
      thumbnail: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop',
      tags: ['Real Estate', 'Investment', 'ROI', 'Calculator'],
      viewCount: '15,670',
      rating: 4.6,
      isPremium: false,
      vertical: 'real-estate'
    },
    {
      id: '3',
      title: 'Professional Resume Templates Collection',
      description: 'Premium collection of ATS-friendly resume templates for various industries and career levels. Includes cover letter templates and LinkedIn optimization guides.',
      type: 'template',
      thumbnail: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=250&fit=crop',
      tags: ['Resume', 'Templates', 'Career', 'ATS'],
      viewCount: '8,920',
      rating: 4.9,
      isPremium: true,
      vertical: 'job-marketplace'
    },
    {
      id: '4',
      title: '2024 Salary Survey Report: Tech Industry',
      description: 'Comprehensive salary analysis across technology roles, locations, and experience levels. Includes market trends and negotiation strategies.',
      type: 'report',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
      tags: ['Salary', 'Tech', 'Survey', 'Market Analysis'],
      viewCount: '12,450',
      rating: 4.7,
      isPremium: false,
      vertical: 'job-marketplace'
    },
    {
      id: '5',
      title: 'Property Market Analysis Masterclass',
      description: 'Learn to analyze real estate markets like a pro. Understand market cycles, valuation methods, and investment timing strategies.',
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop',
      tags: ['Real Estate', 'Market Analysis', 'Investment', 'Strategy'],
      duration: '3.5 hours',
      difficulty: 'advanced',
      rating: 4.8,
      enrolledCount: '1,890',
      isPremium: true,
      vertical: 'real-estate'
    },
    {
      id: '6',
      title: 'Cross-Platform Marketing Strategy Guide',
      description: 'Integrate your marketing efforts across job platforms, real estate networks, and service marketplaces for maximum professional visibility.',
      type: 'article',
      thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=250&fit=crop',
      tags: ['Marketing', 'Strategy', 'Cross-Platform', 'Professional'],
      viewCount: '5,670',
      rating: 4.5,
      isPremium: false,
      vertical: 'cross-vertical'
    }
  ];

  // Mock data for featured resources
  const featuredResources = [
    {
      id: 'featured-1',
      title: 'Professional Convergence Masterclass: Multi-Vertical Success',
      description: 'Learn how to leverage opportunities across job marketplace, marketing services, and real estate for exponential career growth.',
      type: 'course',
      thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
      duration: '8 hours',
      rating: 4.9,
      enrolledCount: '3,240',
      isPremium: true,
      vertical: 'cross-vertical'
    },
    {
      id: 'featured-2',
      title: 'AI-Powered Job Search Optimization',
      description: 'Master modern job search techniques using AI tools and data-driven strategies.',
      type: 'course',
      thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&h=200&fit=crop',
      duration: '4 hours',
      rating: 4.7,
      enrolledCount: '1,890',
      isPremium: false,
      vertical: 'job-marketplace'
    },
    {
      id: 'featured-3',
      title: 'Real Estate Market Trends 2024',
      description: 'Comprehensive analysis of current market conditions and future predictions.',
      type: 'report',
      thumbnail: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=300&h=200&fit=crop',
      rating: 4.8,
      viewCount: '8,450',
      isPremium: true,
      vertical: 'real-estate'
    }
  ];

  // Mock data for learning paths
  const learningPaths = [
    {
      id: 'path-1',
      title: 'Digital Marketing Professional Certification',
      description: 'Complete certification program covering all aspects of digital marketing from beginner to advanced level.',
      vertical: 'marketing-services',
      verticalName: 'Marketing Services',
      difficulty: 'intermediate',
      courseCount: 8,
      totalDuration: '32 hours',
      enrolledCount: '1,240',
      rating: 4.8,
      certificate: true,
      progress: 25,
      courses: [
        { title: 'Marketing Fundamentals', duration: '4 hours', completed: true },
        { title: 'SEO Mastery', duration: '6 hours', completed: true, progress: 100 },
        { title: 'PPC Advertising', duration: '5 hours', inProgress: true, progress: 60 },
        { title: 'Social Media Marketing', duration: '4 hours', completed: false },
        { title: 'Email Marketing', duration: '3 hours', completed: false },
        { title: 'Analytics & Reporting', duration: '5 hours', completed: false },
        { title: 'Content Marketing', duration: '3 hours', completed: false },
        { title: 'Marketing Strategy', duration: '2 hours', completed: false }
      ]
    },
    {
      id: 'path-2',
      title: 'Real Estate Investment Mastery',
      description: 'Comprehensive program for aspiring real estate investors covering analysis, financing, and portfolio management.',
      vertical: 'real-estate',
      verticalName: 'Real Estate',
      difficulty: 'advanced',
      courseCount: 6,
      totalDuration: '24 hours',
      enrolledCount: '890',
      rating: 4.9,
      certificate: true,
      progress: 0,
      courses: [
        { title: 'Real Estate Fundamentals', duration: '4 hours', completed: false },
        { title: 'Market Analysis', duration: '5 hours', completed: false },
        { title: 'Property Valuation', duration: '4 hours', completed: false },
        { title: 'Financing Strategies', duration: '4 hours', completed: false },
        { title: 'Risk Management', duration: '3 hours', completed: false },
        { title: 'Portfolio Optimization', duration: '4 hours', completed: false }
      ]
    }
  ];

  // Mock data for interactive tools
  const interactiveTools = [
    {
      id: 'tool-1',
      name: 'Salary Calculator Pro',
      description: 'Calculate competitive salaries based on role, location, experience, and market data.',
      type: 'salary-calculator',
      usageCount: '25,340',
      rating: 4.8,
      isPremium: false,
      features: ['Market Data', 'Location Adjustment', 'Experience Factors', 'Industry Comparison']
    },
    {
      id: 'tool-2',
      name: 'Marketing ROI Analyzer',
      description: 'Analyze return on investment for marketing campaigns across different channels and strategies.',
      type: 'roi-analyzer',
      usageCount: '18,670',
      rating: 4.7,
      isPremium: true,
      features: ['Multi-Channel Analysis', 'Attribution Modeling', 'Predictive Analytics', 'Custom Reports']
    },
    {
      id: 'tool-3',
      name: 'Property Comparison Tool',
      description: 'Compare properties side-by-side with detailed metrics, market analysis, and investment potential.',
      type: 'market-comparison',
      usageCount: '12,890',
      rating: 4.6,
      isPremium: false,
      features: ['Side-by-Side Comparison', 'Market Metrics', 'Investment Analysis', 'Neighborhood Data']
    },
    {
      id: 'tool-4',
      name: 'Career Path Simulator',
      description: 'Visualize potential career trajectories with salary projections and skill requirements.',
      type: 'career-path-simulator',
      usageCount: '31,450',
      rating: 4.9,
      isPremium: true,
      features: ['Career Mapping', 'Salary Projections', 'Skill Gap Analysis', 'Timeline Planning']
    }
  ];

  const tabs = [
    { id: 'all', name: 'All Resources', icon: 'Grid3x3' },
    { id: 'courses', name: 'Courses', icon: 'BookOpen' },
    { id: 'tools', name: 'Tools', icon: 'Calculator' },
    { id: 'learning-paths', name: 'Learning Paths', icon: 'Route' },
    { id: 'bookmarks', name: 'Bookmarks', icon: 'Bookmark' }
  ];

  useEffect(() => {
    const tab = searchParams?.get('tab');
    if (tab && tabs?.find(t => t?.id === tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
  };

  const handleBookmark = (resourceId) => {
    setBookmarkedResources(prev => {
      const newSet = new Set(prev);
      if (newSet?.has(resourceId)) {
        newSet?.delete(resourceId);
      } else {
        newSet?.add(resourceId);
      }
      return newSet;
    });
  };

  const handleViewResource = (resource) => {
    console.log('Viewing resource:', resource);
    // Navigate to resource detail or open modal
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      type: 'all',
      difficulty: 'all',
      vertical: 'all',
      sortBy: 'newest',
      isPremium: 'all',
      bookmarkedOnly: false
    });
    setSearchQuery('');
    setSelectedCategory('all');
  };

  const handleStartLearningPath = (path) => {
    console.log('Starting learning path:', path);
    // Navigate to learning path or first course
  };

  const handleViewPathDetails = (path) => {
    console.log('Viewing path details:', path);
    // Navigate to learning path details
  };

  const handleUseTool = (tool) => {
    console.log('Using tool:', tool);
    // Navigate to tool or open tool modal
  };

  const filteredResources = mockResources?.filter(resource => {
    if (searchQuery && !resource?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) && 
        !resource?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) &&
        !resource?.tags?.some(tag => tag?.toLowerCase()?.includes(searchQuery?.toLowerCase()))) {
      return false;
    }
    
    if (selectedCategory !== 'all' && resource?.type !== selectedCategory && resource?.vertical !== selectedCategory) {
      return false;
    }
    
    if (filters?.type !== 'all' && resource?.type !== filters?.type) {
      return false;
    }
    
    if (filters?.difficulty !== 'all' && resource?.difficulty !== filters?.difficulty) {
      return false;
    }
    
    if (filters?.vertical !== 'all' && resource?.vertical !== filters?.vertical) {
      return false;
    }
    
    if (filters?.isPremium === 'premium' && !resource?.isPremium) {
      return false;
    }
    
    if (filters?.isPremium === 'free' && resource?.isPremium) {
      return false;
    }
    
    if (filters?.bookmarkedOnly && !bookmarkedResources?.has(resource?.id)) {
      return false;
    }
    
    return true;
  });

  const renderContent = () => {
    switch (activeTab) {
      case 'courses':
        return (
          <div className="space-y-8">
            <FeaturedSection 
              featuredResources={featuredResources}
              onViewResource={handleViewResource}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources?.filter(resource => resource?.type === 'course')?.map(resource => (
                  <ResourceCard
                    key={resource?.id}
                    resource={resource}
                    onBookmark={handleBookmark}
                    onView={handleViewResource}
                    isBookmarked={bookmarkedResources?.has(resource?.id)}
                  />
                ))}
            </div>
          </div>
        );
        
      case 'tools':
        return (
          <InteractiveToolsSection 
            tools={interactiveTools}
            onUseTool={handleUseTool}
          />
        );
        
      case 'learning-paths':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-text-primary mb-2">Learning Paths</h2>
              <p className="text-text-secondary">Structured learning journeys for professional growth</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {learningPaths?.map(path => (
                <LearningPathCard
                  key={path?.id}
                  learningPath={path}
                  onStartPath={handleStartLearningPath}
                  onViewDetails={handleViewPathDetails}
                />
              ))}
            </div>
          </div>
        );
        
      case 'bookmarks':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-text-primary mb-2">Bookmarked Resources</h2>
              <p className="text-text-secondary">Your saved resources for quick access</p>
            </div>
            {filteredResources?.filter(resource => bookmarkedResources?.has(resource?.id))?.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="Bookmark" size={48} className="text-text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-medium text-text-primary mb-2">No bookmarks yet</h3>
                <p className="text-text-secondary mb-4">Start bookmarking resources to access them quickly</p>
                <Button
                  variant="default"
                  iconName="Search"
                  iconPosition="left"
                  onClick={() => handleTabChange('all')}
                >
                  Browse Resources
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources?.filter(resource => bookmarkedResources?.has(resource?.id))?.map(resource => (
                    <ResourceCard
                      key={resource?.id}
                      resource={resource}
                      onBookmark={handleBookmark}
                      onView={handleViewResource}
                      isBookmarked={true}
                    />
                  ))}
              </div>
            )}
          </div>
        );
        
      default:
        return (
          <div className="space-y-8">
            <FeaturedSection 
              featuredResources={featuredResources}
              onViewResource={handleViewResource}
            />
            <InteractiveToolsSection 
              tools={interactiveTools?.slice(0, 4)}
              onUseTool={handleUseTool}
            />
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-text-primary">All Resources</h2>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    iconName="Grid3x3"
                    onClick={() => setViewMode('grid')}
                  />
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    iconName="List"
                    onClick={() => setViewMode('list')}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources?.map(resource => (
                  <ResourceCard
                    key={resource?.id}
                    resource={resource}
                    onBookmark={handleBookmark}
                    onView={handleViewResource}
                    isBookmarked={bookmarkedResources?.has(resource?.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-secondary to-accent text-white py-16">
          <div className="container-professional">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-hero mb-6">
                Professional Resource Library
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Tools, templates, and educational content for professional growth across all verticals
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <Icon name="BookOpen" size={16} className="mr-2" />
                  89 Courses
                </div>
                <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <Icon name="Calculator" size={16} className="mr-2" />
                  34 Tools
                </div>
                <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <Icon name="FileText" size={16} className="mr-2" />
                  56 Templates
                </div>
                <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <Icon name="BarChart3" size={16} className="mr-2" />
                  28 Reports
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="bg-card border-b border-border sticky top-16 z-10">
          <div className="container-professional">
            <div className="flex items-center justify-between py-4">
              <div className="flex space-x-1 overflow-x-auto">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => handleTabChange(tab?.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-base whitespace-nowrap ${
                      activeTab === tab?.id
                        ? 'bg-primary text-primary-foreground shadow-professional'
                        : 'text-text-primary hover:bg-muted hover:text-primary'
                    }`}
                  >
                    <Icon 
                      name={tab?.icon} 
                      size={16} 
                      className={activeTab === tab?.id ? 'text-primary-foreground' : 'text-text-secondary'}
                    />
                    <span>{tab?.name}</span>
                    {tab?.id === 'bookmarks' && bookmarkedResources?.size > 0 && (
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        activeTab === tab?.id
                          ? 'bg-primary-foreground/20 text-primary-foreground'
                          : 'bg-accent text-accent-foreground'
                      }`}>
                        {bookmarkedResources?.size}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Content Area */}
        <section className="section-spacing">
          <div className="container-professional">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                <CategoryFilter
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                />
                
                <SearchFilters
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={handleClearFilters}
                />
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3">
                {renderContent()}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ResourceLibrary;