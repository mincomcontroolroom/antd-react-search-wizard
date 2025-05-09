
import React, { useState, useEffect } from 'react';
import { ConfigProvider } from 'antd';
import SearchBar from '@/components/SearchBar';
import QuickActions from '@/components/QuickActions';
import SearchResults from '@/components/SearchResults';
import SearchHistory from '@/components/SearchHistory';

// Mock search results data (in a real app, this would come from an API)
const mockSearchResults = (query: string) => [
  {
    title: `${query} - Search Result 1`,
    url: 'https://example.com/result1',
    description: `This is a detailed description about ${query} and why this result might be relevant to your search.`,
  },
  {
    title: `${query} - A Comprehensive Guide`,
    url: 'https://example.com/result2',
    description: `Learn everything you need to know about ${query} with this comprehensive guide that covers all aspects.`,
  },
  {
    title: `How ${query} Changed the World`,
    url: 'https://example.com/result3',
    description: `An in-depth analysis of how ${query} has influenced our society and changed the way we think about technology.`,
  },
];

const Index: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // Load search history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save search history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setLoading(true);
    
    // Add to search history (avoid duplicates)
    if (!searchHistory.includes(value)) {
      setSearchHistory(prev => [value, ...prev].slice(0, 10));
    } else {
      // Move the search term to the top if it already exists
      setSearchHistory(prev => [value, ...prev.filter(item => item !== value)].slice(0, 10));
    }

    // Simulate API call with setTimeout
    setTimeout(() => {
      setResults(mockSearchResults(value));
      setLoading(false);
    }, 800);

    // For demonstration, we'll still open Google search in a new tab
    window.open(`https://www.google.com/search?q=${encodeURIComponent(value)}`, '_blank');
  };

  const handleHistoryItemClick = (query: string) => {
    setSearchQuery(query);
    handleSearch(query);
  };

  const hasSearched = searchQuery !== '';

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#4285F4',
          borderRadius: 20,
          fontFamily: 'Roboto, sans-serif',
        },
      }}
    >
      <div className="min-h-screen flex flex-col items-center bg-gray-50 px-4 pt-10">
        <div className="w-full max-w-2xl">
          <div className={`${hasSearched ? 'mb-4' : 'mb-8'} flex justify-center`}>
            <SearchBar onSearch={handleSearch} />
          </div>
          
          {!hasSearched && (
            <>
              <QuickActions />
              <div className="mt-8">
                <SearchHistory 
                  searchHistory={searchHistory} 
                  onHistoryItemClick={handleHistoryItemClick} 
                />
              </div>
            </>
          )}
          
          {hasSearched && (
            <div className="mt-4">
              <SearchResults 
                results={results}
                loading={loading}
                searchQuery={searchQuery}
              />
              <div className="mt-8">
                <SearchHistory 
                  searchHistory={searchHistory} 
                  onHistoryItemClick={handleHistoryItemClick} 
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </ConfigProvider>
  );
};

export default Index;
