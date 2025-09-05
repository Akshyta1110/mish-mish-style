import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Camera, Settings, Heart, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import TwinklingStars from '@/components/TwinklingStars';

const Profile = () => {
  const navigate = useNavigate();

  const stats = [
    { label: 'Outfits', value: '24', icon: Heart },
    { label: 'Starred', value: '8', icon: Heart },
    { label: 'Events', value: '12', icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gradient-start to-gradient-end relative">
      <TwinklingStars count={8} />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="flex items-center justify-between p-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/home')}
          >
            <ArrowLeft size={24} />
          </Button>
          <h1 className="text-xl font-bold text-foreground">Profile</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/settings')}
          >
            <Settings size={24} />
          </Button>
        </header>

        {/* Profile Info */}
        <div className="px-6 mb-8">
          <div className="bg-white/80 rounded-2xl p-6 text-center">
            <div className="relative inline-block mb-4">
              <Avatar className="w-24 h-24 mx-auto">
                <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                  <User size={32} />
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                className="absolute bottom-0 right-0 w-8 h-8 bg-primary hover:bg-primary/90 rounded-full"
              >
                <Camera size={16} />
              </Button>
            </div>
            
            <h2 className="text-2xl font-bold text-foreground mb-1">Username</h2>
            <p className="text-muted-foreground mb-4">Style enthusiast</p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="px-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { action: 'Starred outfit', time: '2 hours ago', icon: '⭐' },
              { action: 'Added new item', time: '1 day ago', icon: '👔' },
              { action: 'Planned outfit', time: '2 days ago', icon: '📅' },
            ].map((activity, index) => (
              <div key={index} className="bg-white/60 rounded-xl p-4 flex items-center space-x-3">
                <div className="text-2xl">{activity.icon}</div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;