import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface SearchBoxProps {
  onSearch: (query: string) => void;
  onLocationSearch: () => void;
  loading: boolean;
}

const SearchBox = ({ onSearch, onLocationSearch, loading }: SearchBoxProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <motion.div 
      className="w-full max-w-lg mx-auto"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <form onSubmit={handleSubmit} className="relative">
        <div className="glass-card rounded-2xl p-4 backdrop-blur-md">
          <div className="flex gap-3 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 h-5 w-5" />
              <Input
                type="text"
                placeholder="도시명을 입력하세요 (예: Seoul, Tokyo, New York)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-12 pr-4 py-3 bg-white/10 border-white/20 text-white placeholder:text-white/60 rounded-xl focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all"
                disabled={loading}
              />
            </div>
            
            <Button
              type="submit"
              disabled={loading || !query.trim()}
              className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white border-white/30 rounded-xl transition-all duration-300 disabled:opacity-50"
              variant="outline"
            >
              {loading ? (
                <motion.div
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              ) : (
                "검색"
              )}
            </Button>
            
            <Button
              type="button"
              onClick={onLocationSearch}
              disabled={loading}
              className="p-3 bg-white/20 hover:bg-white/30 text-white border-white/30 rounded-xl transition-all duration-300 disabled:opacity-50"
              variant="outline"
            >
              <MapPin className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default SearchBox;