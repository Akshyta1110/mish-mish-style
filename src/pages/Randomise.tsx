import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TwinklingStars from '@/components/TwinklingStars';

const Randomise = () => {
  const navigate = useNavigate();
  const [currentOutfit, setCurrentOutfit] = useState(1);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  const handleSwipe = (direction: 'left' | 'right') => {
    setSwipeDirection(direction);
    
    setTimeout(() => {
      if (direction === 'right') {
        // Add to starred (simulate)
        console.log('Added to starred!');
      }
      
      // Show next outfit
      setCurrentOutfit(prev => prev + 1);
      setSwipeDirection(null);
    }, 300);
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
          <h1 className="text-2xl font-bold text-foreground">Randomise</h1>
        </header>

        {/* Card Stack */}
        <div className="flex flex-col items-center px-6">
          <div className="relative w-full max-w-md">
            {/* Main Card - slightly larger */}
            <div className={`bg-white rounded-3xl p-10 shadow-xl transition-all duration-300 ${
              swipeDirection === 'left' ? 'transform -translate-x-full rotate-12 opacity-0' :
              swipeDirection === 'right' ? 'transform translate-x-full rotate-12 opacity-0' :
              'transform translate-x-0 rotate-0 opacity-100'
            }`}>
              <div className="aspect-square md:aspect-[1/1] bg-gray-100 rounded-2xl flex flex-col items-center justify-center mb-6 md:mb-8 w-full max-w-[520px]">
                <div className="text-7xl md:text-8xl mb-4">👗</div>
                <p className="text-xl md:text-2xl font-semibold text-foreground">Outfit #{currentOutfit}</p>
                <p className="text-sm text-muted-foreground">Casual Summer Look</p>
              </div>
              
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• White Cotton T-shirt</p>
                <p>• Blue Denim Jeans</p>
                <p>• White Sneakers</p>
                <p>• Silver Watch</p>
              </div>
            </div>

            {/* Background Cards */}
            <div className="absolute inset-0 bg-white rounded-3xl shadow-lg -z-10 transform scale-96 translate-y-2"></div>
            <div className="absolute inset-0 bg-white rounded-3xl shadow-sm -z-20 transform scale-92 translate-y-4"></div>
          </div>

          {/* Action Buttons moved to screen edges */}
          <div className="relative w-full max-w-md mt-8">
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2">
              <Button
                onClick={() => handleSwipe('left')}
                className="w-16 h-16 bg-gray-200 hover:bg-gray-300 rounded-full text-gray-600 shadow-lg flex items-center justify-center"
              >
                <X size={24} />
              </Button>
            </div>

            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2">
              <Button
                onClick={() => handleSwipe('right')}
                className="w-16 h-16 bg-[#CDCBC7] hover:brightness-95 rounded-full text-white shadow-lg p-0 overflow-hidden flex items-center justify-center"
              >
                {/* Replace Star icon with PNG image */}
                <img src="/assets/liked.png" alt="star" className="w-[56px] h-[56px]" />
              </Button>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8 text-center text-muted-foreground">
            <p className="text-sm">Swipe left to pass, right to star</p>
            <p className="text-xs mt-1">Or use the buttons on either side</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Randomise;