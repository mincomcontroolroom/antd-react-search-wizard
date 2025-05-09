
import React from 'react';
import { Plus, Image, Bookmark, Smile } from 'lucide-react';

const QuickActions: React.FC = () => {
  const actions = [
    { icon: <Plus className="h-5 w-5" />, label: 'Add' },
    { icon: <Image className="h-5 w-5" />, label: 'Images' },
    { icon: <Bookmark className="h-5 w-5" />, label: 'Bookmarks' },
    { icon: <Smile className="h-5 w-5" />, label: 'Emoji' },
  ];

  return (
    <div className="flex justify-center mt-8 space-x-6">
      {actions.map((action, index) => (
        <div
          key={index}
          className="flex flex-col items-center p-4 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors cursor-pointer w-12 h-12 flex items-center justify-center"
        >
          <div className="text-gray-600">{action.icon}</div>
        </div>
      ))}
    </div>
  );
};

export default QuickActions;
