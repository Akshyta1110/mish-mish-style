import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, User, Plus, Camera, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TwinklingStars from '@/components/TwinklingStars';
import Sidebar from '@/components/Sidebar';

const Home = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showCameraOptions, setShowCameraOptions] = useState(false);

  const categories = [
    { 
      name: 'Catalogue', 
      icon: '🪞', 
      path: '/catalogue',
      description: 'Browse your wardrobe'
    },
    { 
      name: 'Starred', 
      icon: '⭐', 
      path: '/starred',
      description: 'Your favorite outfits'
    },
    { 
      name: 'Planner', 
      icon: '📋', 
      path: '/planner',
      description: 'Plan your outfits'
    },
    { 
      name: 'Randomise', 
      icon: '🎲', 
      path: '/randomise',
      description: 'Discover new looks'
    },
  ];

  const handleChatClick = () => {
    navigate('/chat');
  };

  const handleCameraOption = (option: 'camera' | 'gallery') => {
    console.log(`Opening ${option}`);
    setShowCameraOptions(false);
    // In a real app, this would open camera/gallery
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gradient-start to-gradient-end relative">
      <TwinklingStars count={12} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="flex items-center justify-between p-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
            className="h-10 w-10"
          >
            <Menu size={24} />
          </Button>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/notifications')}
              className="h-10 w-10"
            >
              <Bell size={24} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/profile')}
              className="h-10 w-10"
            >
              <User size={24} />
            </Button>
          </div>
        </header>

        {/* Welcome Message */}
        <div className="px-6 mb-8">
          <p className="text-lg text-foreground">
            Greetings, <span className="font-semibold">Username</span>
          </p>
        </div>

        {/* AI Chat Section */}
        <div className="px-6 mb-8">
          <div className="bg-white/80 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center space-x-3 mb-3">
              <div className="text-2xl">🐱</div>
              <div className="bg-black text-white px-3 py-1 rounded-lg text-sm">
                Let's style you up!!
              </div>
            </div>
            
            <button
              onClick={handleChatClick}
              className="w-full bg-white border-2 border-maroon rounded-xl p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <span className="text-muted-foreground">Ask Mish Mish</span>
              <div className="w-8 h-8 bg-maroon rounded-full flex items-center justify-center">
                <span className="text-white text-sm">▶</span>
              </div>
            </button>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="px-6 mb-8">
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => navigate(category.path)}
                className="bg-white/80 rounded-2xl p-6 text-center hover:bg-white/90 transition-colors shadow-sm"
              >
                <div className="text-4xl mb-2">{category.icon}</div>
                <h3 className="font-semibold text-foreground mb-1">{category.name}</h3>
                <p className="text-xs text-muted-foreground">{category.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Floating Plus Button */}
        <div className="fixed bottom-8 right-8">
          <div className="relative">
            <TwinklingStars count={5} className="w-20 h-20" />
            <Button
              onClick={() => setShowCameraOptions(!showCameraOptions)}
              className="w-14 h-14 bg-black hover:bg-black/90 rounded-full shadow-lg"
            >
              <Plus size={24} className="text-white" />
            </Button>
            
            {/* Camera Options */}
            {showCameraOptions && (
              <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg p-2 space-y-2 min-w-32">
                <button
                  onClick={() => handleCameraOption('camera')}
                  className="w-full flex items-center space-x-2 p-2 hover:bg-gray-100 rounded text-sm"
                >
                  <Camera size={16} />
                  <span>Camera</span>
                </button>
                <button
                  onClick={() => handleCameraOption('gallery')}
                  className="w-full flex items-center space-x-2 p-2 hover:bg-gray-100 rounded text-sm"
                >
                  <Image size={16} />
                  <span>Gallery</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;