"use client";

import { useState, useEffect } from 'react';
import { useSearchContext } from '@/context/SearchContext';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const { setSearchQuery } = useSearchContext();

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setSearchQuery(query);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query, setSearchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <Input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleSearch}
        className="pl-10 pr-4 py-2 w-full"
      />
    </div>
  );
}