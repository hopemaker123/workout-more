import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SearchBar = ({ onSearch, onSuggestionSelect, placeholder = "Search opportunities across jobs, marketing, and real estate..." }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Mock suggestions data
  const mockSuggestions = [
    { id: 1, text: 'React Developer', type: 'job', vertical: 'jobs', icon: 'Code' },
    { id: 2, text: 'Digital Marketing Manager', type: 'job', vertical: 'jobs', icon: 'Briefcase' },
    { id: 3, text: 'SEO Services', type: 'service', vertical: 'marketing', icon: 'TrendingUp' },
    { id: 4, text: 'Social Media Management', type: 'service', vertical: 'marketing', icon: 'Share2' },
    { id: 5, text: 'Investment Properties', type: 'property', vertical: 'real-estate', icon: 'Home' },
    { id: 6, text: 'Commercial Real Estate', type: 'property', vertical: 'real-estate', icon: 'Building' },
    { id: 7, text: 'Remote Work', type: 'keyword', vertical: 'jobs', icon: 'Wifi' },
    { id: 8, text: 'Content Creation', type: 'service', vertical: 'marketing', icon: 'Edit' },
    { id: 9, text: 'Residential Properties', type: 'property', vertical: 'real-estate', icon: 'Home' },
    { id: 10, text: 'Full Stack Developer', type: 'job', vertical: 'jobs', icon: 'Code' }
  ];

  const recentSearches = [
    'React Developer Remote',
    'Digital Marketing Services',
    'Investment Properties NYC',
    'SEO Consultant'
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef?.current && !suggestionsRef?.current?.contains(event?.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    setSearchQuery(value);
    
    if (value?.length > 0) {
      setIsLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        const filteredSuggestions = mockSuggestions?.filter(suggestion =>
          suggestion?.text?.toLowerCase()?.includes(value?.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
        setShowSuggestions(true);
        setIsLoading(false);
      }, 300);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchQuery?.trim()) {
      onSearch(searchQuery?.trim());
      setShowSuggestions(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion?.text);
    setShowSuggestions(false);
    onSuggestionSelect(suggestion);
  };

  const handleFocus = () => {
    if (searchQuery?.length === 0) {
      setShowSuggestions(true);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    searchRef?.current?.focus();
  };

  const getVerticalColor = (vertical) => {
    switch (vertical) {
      case 'jobs': return 'text-blue-600';
      case 'marketing': return 'text-green-600';
      case 'real-estate': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'job': return 'Job';
      case 'service': return 'Service';
      case 'property': return 'Property';
      case 'keyword': return 'Keyword';
      default: return 'Search';
    }
  };

  return (
    <div className="relative w-full" ref={suggestionsRef}>
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Icon name="Search" size={20} className="text-text-secondary" />
        </div>
        
        <input
          ref={searchRef}
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          onFocus={handleFocus}
          placeholder={placeholder}
          className="w-full pl-12 pr-24 py-4 text-lg bg-background border-2 border-border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-base outline-none"
        />
        
        <div className="absolute inset-y-0 right-0 flex items-center space-x-2 pr-4">
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="p-1 rounded-lg hover:bg-muted transition-colors duration-base"
            >
              <Icon name="X" size={16} className="text-text-secondary" />
            </button>
          )}
          
          <Button
            variant="default"
            size="sm"
            onClick={handleSearch}
            disabled={!searchQuery?.trim()}
            loading={isLoading}
            iconName="Search"
            iconPosition="left"
          >
            Search
          </Button>
        </div>
      </div>
      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-floating z-50 max-h-96 overflow-y-auto scrollbar-professional">
          {searchQuery?.length === 0 ? (
            /* Recent Searches */
            (<div className="p-4">
              <h4 className="text-sm font-semibold text-text-secondary mb-3 flex items-center">
                <Icon name="Clock" size={16} className="mr-2" />
                Recent Searches
              </h4>
              <div className="space-y-2">
                {recentSearches?.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick({ text: search, type: 'recent' })}
                    className="flex items-center w-full p-2 rounded-lg hover:bg-muted transition-colors duration-base text-left"
                  >
                    <Icon name="RotateCcw" size={16} className="text-text-secondary mr-3" />
                    <span className="text-sm text-text-primary">{search}</span>
                  </button>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <h4 className="text-sm font-semibold text-text-secondary mb-3 flex items-center">
                  <Icon name="TrendingUp" size={16} className="mr-2" />
                  Popular Searches
                </h4>
                
                <div className="grid grid-cols-2 gap-2">
                  {mockSuggestions?.slice(0, 6)?.map((suggestion) => (
                    <button
                      key={suggestion?.id}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="flex items-center p-2 rounded-lg hover:bg-muted transition-colors duration-base text-left"
                    >
                      <Icon 
                        name={suggestion?.icon} 
                        size={16} 
                        className={`mr-2 ${getVerticalColor(suggestion?.vertical)}`} 
                      />
                      <span className="text-sm text-text-primary truncate">{suggestion?.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>)
          ) : (
            /* Search Suggestions */
            (<div className="p-2">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  <span className="ml-3 text-sm text-text-secondary">Searching...</span>
                </div>
              ) : suggestions?.length > 0 ? (
                <div className="space-y-1">
                  {suggestions?.map((suggestion) => (
                    <button
                      key={suggestion?.id}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-muted transition-colors duration-base text-left"
                    >
                      <div className="flex items-center">
                        <Icon 
                          name={suggestion?.icon} 
                          size={18} 
                          className={`mr-3 ${getVerticalColor(suggestion?.vertical)}`} 
                        />
                        <div>
                          <span className="text-sm font-medium text-text-primary">{suggestion?.text}</span>
                          <div className="flex items-center mt-1">
                            <span className={`text-xs px-2 py-1 rounded-full bg-muted ${getVerticalColor(suggestion?.vertical)}`}>
                              {getTypeLabel(suggestion?.type)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <Icon name="ArrowUpRight" size={16} className="text-text-secondary" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <Icon name="Search" size={32} className="text-text-secondary mb-2" />
                  <p className="text-sm text-text-secondary">No suggestions found</p>
                  <p className="text-xs text-text-secondary mt-1">Try different keywords</p>
                </div>
              )}
            </div>)
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;