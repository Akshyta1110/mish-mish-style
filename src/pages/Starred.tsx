import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TwinklingStars from '@/components/TwinklingStars';

const Starred = () => {
  const navigate = useNavigate();

  // Mock starred outfits data
  const starredOutfits = [
    { id: 1, name: 'Casual Summer', image: '/assets/casual-summer.png', starred: true },
    { id: 2, name: 'Business Formal', image: '/assets/business.png', starred: true },
    { id: 3, name: 'Date Night', image: '/assets/date-night.png', starred: true },
    { id: 4, name: 'Weekend Chill', image: '/assets/weekend.png', starred: true },
  ];

  const handleAddBoard = () => {
    // In a real app, this would open a modal or navigate to add board page
    console.log('Add new board');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gradient-start to-gradient-end relative">
      <TwinklingStars count={8} />
      
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
          <h1 className="text-2xl font-bold text-foreground">Starred Outfits</h1>
        </header>

        {/* Starred Outfits Grid */}
        <div className="px-6">
          {starredOutfits.length === 0 ? (
            <div className="text-center py-16">
              <Star className="mx-auto text-muted-foreground mb-4" size={48} />
              <h3 className="text-lg font-semibold text-foreground mb-2">No starred outfits yet</h3>
              <p className="text-muted-foreground mb-6">Star outfits from Randomise or Chat to see them here</p>
              <Button
                onClick={() => navigate('/randomise')}
                className="bg-primary hover:bg-primary/90"
              >
                Discover Outfits
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 sm:gap-1">
              {starredOutfits.map((outfit) => (
                <div
                  key={outfit.id}
                  className="bg-white/80 rounded-lg p-2 sm:p-1 hover:bg-white/90 transition-colors cursor-pointer"
                >
                  <div className="aspect-square bg-gray-50 rounded-md flex flex-col items-center justify-center mb-1 sm:mb-0.5 relative">
                    <img 
                      src={outfit.image} 
                      alt={outfit.name}
                      className="w-44 h-44 sm:w-72 sm:h-72 object-contain mb-1 sm:mb-0.5"
                    />
                    <Star className="text-yellow-500 fill-current absolute top-1 right-1 sm:top-0 sm:right-0" size={16} />
                  </div>
                  
                  <div className="text-center">
                    <h3 className="font-semibold text-foreground text-sm">{outfit.name}</h3>
                  </div>
                </div>
              ))}
              
              {/* Add Board Button */}
              <div
                onClick={handleAddBoard}
                className="bg-white/80 rounded-lg p-2 sm:p-1 hover:bg-white/90 transition-colors cursor-pointer border-2 border-dashed border-gray-300 hover:border-gray-400"
              >
                <div className="aspect-square bg-gray-50 rounded-md flex flex-col items-center justify-center mb-1 sm:mb-0.5">
                  <Plus className="text-gray-400 w-16 h-16 sm:w-24 sm:h-24" />
                </div>
                
                <div className="text-center">
                  <h3 className="font-semibold text-foreground text-sm">Add Board</h3>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Starred;