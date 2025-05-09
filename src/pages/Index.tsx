
import React from 'react';
import { ConfigProvider } from 'antd';
import SearchBar from '@/components/SearchBar';
import QuickActions from '@/components/QuickActions';

const Index: React.FC = () => {
  const handleSearch = (value: string) => {
    console.log('Search for:', value);
    // Implement search functionality here
    // For demonstration, we'll open Google search in a new tab
    window.open(`https://www.google.com/search?q=${encodeURIComponent(value)}`, '_blank');
  };

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
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-2xl">
          <div className="mb-8 flex justify-center">
            <SearchBar onSearch={handleSearch} />
          </div>
          <QuickActions />
        </div>
      </div>
    </ConfigProvider>
  );
};

export default Index;
