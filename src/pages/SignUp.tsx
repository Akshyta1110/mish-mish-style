import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import TwinklingStars from '@/components/TwinklingStars';

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });

  const handleSignUp = () => {
    // For demo purposes, directly navigate to home
    navigate('/home');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gradient-start to-gradient-end relative flex flex-col items-center justify-center p-6">
      <TwinklingStars count={15} />
      
      <div className="w-full max-w-sm space-y-8 animate-fade-in">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/login')}
          >
            <ArrowLeft size={24} />
          </Button>
          <h1 className="text-2xl font-bold text-foreground tracking-wider">
            Sign Up
          </h1>
          <div className="w-10"></div>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="h-12 bg-white/80 border-border rounded-lg"
            />
            
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="h-12 bg-white/80 border-border rounded-lg"
            />
            
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="h-12 bg-white/80 border-border rounded-lg pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className="h-12 bg-white/80 border-border rounded-lg pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <Button 
            onClick={handleSignUp}
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg"
          >
            Create Account
          </Button>

          <div className="text-center space-y-4">
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full h-12 bg-black text-white hover:bg-black/90 border-0 rounded-lg"
              >
                <span className="mr-2">G</span>
                Sign Up with Google
              </Button>
              
              <Button
                variant="outline"
                className="w-full h-12 bg-black text-white hover:bg-black/90 border-0 rounded-lg"
              >
                <span className="mr-2">🍎</span>
                Sign Up with Apple
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <button 
                onClick={() => navigate('/login')}
                className="text-primary hover:underline"
              >
                Log In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;