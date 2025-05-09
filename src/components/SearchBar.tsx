
import React, { useState } from 'react';
import { Input } from 'antd';
import { Mic, Search } from 'lucide-react';

type SearchBarProps = {
  onSearch?: (value: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [value, setValue] = useState('');
  const [isListening, setIsListening] = useState(false);

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

  const toggleVoiceRecognition = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.log('Speech recognition not supported');
      alert('Speech recognition is not supported in your browser. Please try Chrome or Edge.');
      return;
    }

    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const startListening = () => {
    setIsListening(true);
    
    // Use the appropriate constructor based on browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setValue(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
    
    // Store the recognition instance to reference later for stopping
    window.recognitionInstance = recognition;
  };

  const stopListening = () => {
    if (window.recognitionInstance) {
      window.recognitionInstance.stop();
      window.recognitionInstance = null;
    }
    setIsListening(false);
  };

  return (
    <div className="relative w-full max-w-2xl">
      <div className="flex items-center bg-white rounded-full shadow-lg px-5 py-3 hover:shadow-xl transition-shadow">
        <div className="flex-shrink-0 mr-3">
          <span className="text-blue-600 text-2xl font-medium">Search</span>
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
                className={`cursor-pointer p-1 ${isListening ? 'text-red-500 animate-pulse' : 'text-blue-500 hover:text-blue-700'}`}
                onClick={toggleVoiceRecognition}
              >
                <Mic className={`h-5 w-5 ${isListening ? 'text-red-500' : 'text-blue-500'}`} />
              </div>
              <div 
                className="cursor-pointer ml-2 text-gray-400 hover:text-gray-600 p-1"
                onClick={handleSearch}
              >
                <Search className="h-5 w-5" />
              </div>
            </div>
          }
          variant="borderless"
        />
      </div>
    </div>
  );
};

// Extend the Window interface to include our recognition instance
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
    recognitionInstance: any;
  }
}

export default SearchBar;
