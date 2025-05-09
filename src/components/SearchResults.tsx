
import React from 'react';
import { Card, List, Typography } from 'antd';
import { Clock } from 'lucide-react';

const { Title, Text, Paragraph } = Typography;

type SearchResult = {
  title: string;
  url: string;
  description: string;
};

type SearchResultsProps = {
  results: SearchResult[];
  loading: boolean;
  searchQuery: string;
};

const SearchResults: React.FC<SearchResultsProps> = ({ results, loading, searchQuery }) => {
  if (!searchQuery) return null;

  return (
    <div className="mt-6 w-full">
      <Title level={4} className="mb-4">Search Results for "{searchQuery}"</Title>
      <List
        loading={loading}
        dataSource={results}
        renderItem={(item) => (
          <List.Item>
            <Card className="w-full hover:shadow-md transition-shadow">
              <Text type="secondary" className="text-xs">{item.url}</Text>
              <Title level={5} className="mb-1 mt-1">
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {item.title}
                </a>
              </Title>
              <Paragraph ellipsis={{ rows: 2 }}>{item.description}</Paragraph>
            </Card>
          </List.Item>
        )}
        locale={{ emptyText: "No results found" }}
      />
    </div>
  );
};

export default SearchResults;
