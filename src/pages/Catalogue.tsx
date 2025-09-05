import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TwinklingStars from '@/components/TwinklingStars';

const Catalogue = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { name: 'Shirts', icon: '👔', color: 'bg-blue-100' },
    { name: 'Trousers', icon: '👖', color: 'bg-green-100' },
    { name: 'Accessories', icon: '👜', color: 'bg-purple-100' },
    { name: 'Shoes', icon: '👟', color: 'bg-orange-100' },
  ];

  const suggestedEvents = [
    'Winter Outfits',
    'Beach Outfits', 
    'Date Outfits',
    'Work Outfits',
    'Party Outfits',
  ];

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    // In a real app, this would filter items by category
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gradient-start to-gradient-end relative">
      <TwinklingStars count={10} />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="flex items-center p-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/home')}
            className="mr-4"
          >
            <ArrowLeft size={24} />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Catalogue</h1>
        </header>

        {/* Categories Grid */}
        <div className="px-6 mb-8">
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => handleCategoryClick(category.name)}
                className={`p-6 rounded-2xl text-center hover:scale-105 transition-all duration-200 shadow-sm ${
                  selectedCategory === category.name 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-white/80 hover:bg-white/90'
                }`}
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold">{category.name}</h3>
              </button>
            ))}
          </div>
        </div>

        {/* Suggested Events */}
        <div className="px-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Suggested Events</h2>
          <div className="space-y-3">
            {suggestedEvents.map((event, index) => (
              <button
                key={event}
                className="w-full p-4 bg-gradient-to-r from-white/60 to-white/40 rounded-xl text-left hover:from-white/70 hover:to-white/50 transition-all duration-200 shadow-sm"
              >
                <h3 className="font-medium text-foreground">{event}</h3>
              </button>
            ))}
          </div>
        </div>

        {/* Items Grid (placeholder) */}
        {selectedCategory && (
          <div className="px-6 mt-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">{selectedCategory}</h2>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="bg-white/80 rounded-xl p-4 aspect-square flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <div className="text-3xl mb-2">📷</div>
                    <p className="text-sm">Item {item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalogue;