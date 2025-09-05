import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TwinklingStars from '@/components/TwinklingStars';

const Starred = () => {
  const navigate = useNavigate();

  // Mock starred outfits data
  const starredOutfits = [
    { id: 1, name: 'Casual Summer', image: '👗', starred: true },
    { id: 2, name: 'Business Formal', image: '👔', starred: true },
    { id: 3, name: 'Date Night', image: '💃', starred: true },
    { id: 4, name: 'Weekend Chill', image: '👕', starred: true },
  ];

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
            <div className="grid grid-cols-2 gap-4">
              {starredOutfits.map((outfit) => (
                <div
                  key={outfit.id}
                  className="bg-white/80 rounded-2xl p-4 hover:bg-white/90 transition-colors cursor-pointer"
                >
                  <div className="aspect-square bg-gray-50 rounded-xl flex flex-col items-center justify-center mb-3">
                    <div className="text-4xl mb-2">{outfit.image}</div>
                    <Star className="text-yellow-500 fill-current" size={20} />
                  </div>
                  
                  <div className="text-center">
                    <h3 className="font-semibold text-foreground text-sm">{outfit.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Starred;