import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sun, Cloud, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TwinklingStars from '@/components/TwinklingStars';

const Planner = () => {
  const navigate = useNavigate();

  const upcomingEvents = [
    {
      id: 1,
      title: 'Work Meeting',
      date: '15/01/2024 at 9:00 AM',
      weather: 'Sunny, 22°C',
      outfit: 'Business Casual',
      icon: Sun,
    },
    {
      id: 2,
      title: 'Dinner Date',
      date: '16/01/2024 at 7:00 PM',
      weather: 'Cloudy, 18°C',
      outfit: 'Elegant Dress',
      icon: Cloud,
    },
    {
      id: 3,
      title: 'Gym Session',
      date: '17/01/2024 at 2:00 PM',
      weather: 'Rainy, 15°C',
      outfit: 'Not planned',
      icon: Cloud,
    },
  ];

  const quickSuggestions = [
    { name: 'Rainy Day', description: 'Jacket + Boots', icon: '🌧️' },
    { name: 'Sunny Day', description: 'Light & Airy', icon: '☀️' },
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
          <h1 className="text-2xl font-bold text-foreground">Outfit Planner</h1>
        </header>

        {/* Today's Weather */}
        <div className="px-6 mb-6">
          <div className="bg-white/80 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-3">Today's Weather</h2>
            <div className="flex items-center space-x-4">
              <Sun className="text-yellow-500" size={40} />
              <div>
                <p className="text-2xl font-bold text-foreground">22°C</p>
                <p className="text-muted-foreground">Sunny and clear</p>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="px-6 mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Upcoming Events</h2>
          <div className="space-y-4">
            {upcomingEvents.map((event) => {
              const WeatherIcon = event.icon;
              return (
                <div key={event.id} className="bg-white/80 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-foreground">{event.title}</h3>
                    <span className="text-sm text-muted-foreground">{event.weather}</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">{event.date}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="text-lg">👔</div>
                      <span className="text-sm font-medium text-foreground">
                        Outfit: {event.outfit}
                      </span>
                    </div>
                    
                    {event.outfit === 'Not planned' && (
                      <Button
                        size="sm"
                        className="text-xs bg-primary hover:bg-primary/90"
                      >
                        + Plan outfit
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Suggestions */}
        <div className="px-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Quick Suggestions</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickSuggestions.map((suggestion, index) => (
              <div key={index} className="bg-white/60 rounded-2xl p-4 text-center">
                <div className="text-3xl mb-2">{suggestion.icon}</div>
                <h3 className="font-semibold text-foreground text-sm mb-1">{suggestion.name}</h3>
                <p className="text-xs text-muted-foreground">{suggestion.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Add Button */}
        <Button
          className="fixed bottom-8 right-8 w-14 h-14 bg-primary hover:bg-primary/90 rounded-full shadow-lg"
        >
          <Plus size={24} />
        </Button>
      </div>
    </div>
  );
};

export default Planner;