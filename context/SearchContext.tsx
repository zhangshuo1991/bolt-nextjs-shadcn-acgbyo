"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Vulnerability } from '@/lib/mockData';

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

interface SearchContextType {
  searchResults: Vulnerability[];
  pagination: Pagination;
  setSearchQuery: (query: string) => void;
  setCurrentPage: (page: number) => void;
  isLoading: boolean;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchResults, setSearchResults] = useState<Vulnerability[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchVulnerabilities = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/vulnerabilities?query=${searchQuery}&page=${pagination.currentPage}&limit=${pagination.itemsPerPage}`);
      const data = await response.json();
      setSearchResults(data.vulnerabilities);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching vulnerabilities:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchVulnerabilities();
  }, [searchQuery, pagination.currentPage]);

  const setCurrentPage = (page: number) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
  };

  return (
    <SearchContext.Provider value={{ searchResults, pagination, setSearchQuery, setCurrentPage, isLoading }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearchContext must be used within a SearchProvider');
  }
  return context;
};