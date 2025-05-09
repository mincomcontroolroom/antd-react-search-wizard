
import React, { useState } from 'react';
import { Input } from 'antd';
import { Microphone, Search } from 'lucide-react';
import GoogleLogo from './GoogleLogo';

type SearchBarProps = {
  onSearch?: (value: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [value, setValue] = useState('');

  const handleSearch = () => {
    if (onSearch && value.trim()) {
      onSearch(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative w-full max-w-2xl">
      <div className="flex items-center bg-white rounded-full shadow-lg px-5 py-3 hover:shadow-xl transition-shadow">
        <div className="flex-shrink-0 mr-3">
          <GoogleLogo />
        </div>
        <Input
          className="flex-1 border-none shadow-none text-lg focus:outline-none"
          placeholder="Search Google or type a URL"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          suffix={
            <div className="flex items-center">
              <div 
                className="cursor-pointer text-blue-500 hover:text-blue-700 p-1"
                onClick={() => {
                  console.log('Voice search activated');
                  // Implement voice search functionality here
                }}
              >
                <Microphone className="h-5 w-5 text-blue-500" />
              </div>
              <div 
                className="cursor-pointer ml-2 text-gray-400 hover:text-gray-600 p-1"
                onClick={handleSearch}
              >
                <Search className="h-5 w-5" />
              </div>
            </div>
          }
          bordered={false}
        />
      </div>
    </div>
  );
};

export default SearchBar;
