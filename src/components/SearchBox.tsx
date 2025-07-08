import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { cities, searchCities, City } from '../data/cities';

interface SearchBoxProps {
  onSearch: (query: string) => void;
  onLocationSearch: () => void;
  loading: boolean;
}

const SearchBox = ({ onSearch, onLocationSearch, loading }: SearchBoxProps) => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
    setQuery(city.name);
    setOpen(false);
    onSearch(city.name);
  };

  const filteredCities = searchCities(query);

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
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 h-5 w-5 z-10" />
                    <input
                      type="text"
                      placeholder="도시명을 입력하세요 (예: Seoul, Tokyo, New York)"
                      value={query}
                      onChange={(e) => {
                        setQuery(e.target.value);
                        setOpen(true);
                      }}
                      onFocus={() => setOpen(true)}
                      className="flex h-12 w-full rounded-xl border border-white/20 bg-white/10 px-12 py-3 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={loading}
                    />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-0 bg-black/80 backdrop-blur-md border-white/20">
                  <Command>
                    <CommandList>
                      <CommandEmpty className="text-white/70 py-6 text-center">
                        검색 결과가 없습니다.
                      </CommandEmpty>
                      <CommandGroup>
                        {filteredCities.map((city) => (
                          <CommandItem
                            key={`${city.name}-${city.country}`}
                            value={city.name}
                            onSelect={() => handleCitySelect(city)}
                            className="flex items-center justify-between text-white hover:bg-white/10 cursor-pointer"
                          >
                            <div className="flex flex-col">
                              <span className="font-medium">{city.displayName}</span>
                              <span className="text-sm text-white/60">{city.name}, {city.country}</span>
                            </div>
                            {selectedCity?.name === city.name && (
                              <Check className="h-4 w-4 text-white" />
                            )}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
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