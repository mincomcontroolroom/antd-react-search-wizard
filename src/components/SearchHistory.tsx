
import React from 'react';
import { List, Typography } from 'antd';
import { Clock } from 'lucide-react';

const { Text } = Typography;

type SearchHistoryProps = {
  searchHistory: string[];
  onHistoryItemClick: (query: string) => void;
};

const SearchHistory: React.FC<SearchHistoryProps> = ({ searchHistory, onHistoryItemClick }) => {
  if (!searchHistory.length) return null;

  return (
    <div className="mt-6 w-full max-w-2xl">
      <Text strong className="text-lg mb-2 block">Recent Searches</Text>
      <List
        size="small"
        bordered
        dataSource={searchHistory.slice(0, 5)}
        renderItem={(item) => (
          <List.Item 
            className="cursor-pointer hover:bg-gray-100"
            onClick={() => onHistoryItemClick(item)}
          >
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-gray-500" />
              <Text>{item}</Text>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default SearchHistory;
