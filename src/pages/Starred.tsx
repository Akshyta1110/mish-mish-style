import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Star, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TwinklingStars from '@/components/TwinklingStars';

const Starred = () => {
  const navigate = useNavigate();

  // Boards state (initial mock starred outfits)
  const defaultBoards = [
    { id: 1, name: 'Casual Summer', image: '/assets/casual-summer.png' },
    { id: 2, name: 'Business Formal', image: '/assets/business.png' },
    { id: 3, name: 'Date Night', image: '/assets/date-night.png' },
    { id: 4, name: 'Weekend Chill', image: '/assets/weekend.png' },
  ];

  const [boards, setBoards] = useState(() => {
    try {
      const raw = localStorage.getItem('starredBoards');
      return raw ? JSON.parse(raw) : defaultBoards;
    } catch (e) {
      return defaultBoards;
    }
  });

  const [creating, setCreating] = useState(false);
  const [newBoardName, setNewBoardName] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (creating && inputRef.current) inputRef.current.focus();
  }, [creating]);

  const handleAddBoardClick = () => {
    setCreating(true);
    setNewBoardName('');
  };

  const handleCreate = () => {
    if (!newBoardName.trim()) return;
    // Use most recently starred outfit as image when available
    let image = '/assets/placeholder.svg';
    try {
      const last = localStorage.getItem('lastStarred');
      if (last) {
        const parsed = JSON.parse(last);
        if (parsed && parsed.image) image = parsed.image;
      }
    } catch (e) {
      // ignore
    }

    const newBoard = {
      id: Date.now(),
      name: newBoardName.trim(),
      image,
    };
    setBoards((prev) => [newBoard, ...prev]);
    setCreating(false);
    setNewBoardName('');
  };

  // Persist boards to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('starredBoards', JSON.stringify(boards));
    } catch (e) {
      // ignore
    }
  }, [boards]);

  const handleDelete = (id: number) => {
    setBoards((prev) => prev.filter((b) => b.id !== id));
  };

  const handleUpdateFromLastStarred = (id: number) => {
    try {
      const last = localStorage.getItem('lastStarred');
      if (!last) return;
      const parsed = JSON.parse(last);
      if (!parsed || !parsed.image) return;
      setBoards((prev) => prev.map((b) => (b.id === id ? { ...b, image: parsed.image } : b)));
    } catch (e) {
      // ignore
    }
  };

  const handleCancel = () => {
    setCreating(false);
    setNewBoardName('');
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
          {boards.length === 0 ? (
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
              {boards.map((outfit) => (
                <div key={outfit.id} className="bg-white/80 rounded-lg p-2 sm:p-1 hover:bg-white/90 transition-colors relative">
                  <Link to={`/boards/${outfit.id}`} className="block">
                    <div className="aspect-square bg-gray-50 rounded-md flex flex-col items-center justify-center mb-1 sm:mb-0.5">
                      <img
                        src={outfit.image}
                        alt={outfit.name}
                        className="w-44 h-44 sm:w-72 sm:h-72 object-contain mb-1 sm:mb-0.5"
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold text-foreground text-sm">{outfit.name}</h3>
                    </div>
                  </Link>

                  <div className="absolute top-2 left-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleUpdateFromLastStarred(outfit.id); }}
                      className="bg-white/90 rounded-full p-1 hover:bg-white text-foreground shadow"
                      aria-label={`Update ${outfit.name} from last starred`}
                    >
                      <Plus size={12} className="transform rotate-45" />
                    </button>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDelete(outfit.id); }}
                      className="pointer-events-auto bg-white/90 rounded-full p-2 hover:bg-white text-foreground shadow opacity-0 hover:opacity-100 transition"
                      aria-label={`Delete ${outfit.name}`}
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
              ))}

              {/* Add Board Card / Input */}
              <div className="bg-white/80 rounded-lg p-2 sm:p-1 transition-colors cursor-pointer border-2 border-dashed border-gray-300 hover:border-gray-400">
                {creating ? (
                  <div className="p-2">
                    <input
                      ref={inputRef}
                      value={newBoardName}
                      onChange={(e) => setNewBoardName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleCreate();
                        if (e.key === 'Escape') handleCancel();
                      }}
                      placeholder="New board name"
                      className="w-full px-3 py-2 rounded-md border"
                    />
                    <div className="flex justify-end items-center mt-2 space-x-2">
                      <Button onClick={handleCancel} variant="ghost">Cancel</Button>
                      <Button onClick={handleCreate}>Create</Button>
                    </div>
                  </div>
                ) : (
                  <div onClick={handleAddBoardClick} className="p-2">
                    <div className="aspect-square bg-gray-50 rounded-md flex flex-col items-center justify-center mb-1 sm:mb-0.5">
                      <Plus className="text-gray-400 w-16 h-16 sm:w-24 sm:h-24" />
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold text-foreground text-sm">Add Board</h3>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Starred;