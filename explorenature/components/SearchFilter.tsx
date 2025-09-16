import React, { useState, useEffect } from 'react';
import { SearchFilters, Category } from '@/types';

interface SearchFilterProps {
  onFiltersChange: (filters: SearchFilters) => void;
  categories: Category[];
  initialFilters?: SearchFilters;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ onFiltersChange, categories, initialFilters }) => {
  const [keyword, setKeyword] = useState<string>(initialFilters?.keyword || '');
  const [category, setCategory] = useState<string | undefined>(initialFilters?.category);
  const [minPrice, setMinPrice] = useState<number | undefined>(initialFilters?.minPrice);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(initialFilters?.maxPrice);
  const [duration, setDuration] = useState<string | undefined>(initialFilters?.duration);
  const [difficulty, setDifficulty] = useState<string | undefined>(initialFilters?.difficulty);

  // Update local state when initialFilters change
  useEffect(() => {
    if (initialFilters) {
      setKeyword(initialFilters.keyword || '');
      setCategory(initialFilters.category);
      setMinPrice(initialFilters.minPrice);
      setMaxPrice(initialFilters.maxPrice);
      setDuration(initialFilters.duration);
      setDifficulty(initialFilters.difficulty);
    }
  }, [initialFilters]);

  // Auto-apply filters when they change (but not on initial load)
  useEffect(() => {
    if (initialFilters) {
      emit();
    }
  }, []);

  const emit = () => {
    const newFilters = { keyword, category, minPrice, maxPrice, duration, difficulty };
    onFiltersChange(newFilters);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
      <input
        type="text"
        placeholder="Search tour names"
        className="input md:col-span-2"
        value={keyword}
        onChange={(e) => { 
          const newKeyword = e.target.value;
          setKeyword(newKeyword);
          // Immediately emit the change
          onFiltersChange({ keyword: newKeyword, category, minPrice, maxPrice, duration, difficulty });
        }}
      />
      <select
        className="input"
        value={category ?? ''}
        onChange={(e) => { 
          const newCategory = e.target.value || undefined;
          setCategory(newCategory);
          // Immediately emit the change
          onFiltersChange({ keyword, category: newCategory, minPrice, maxPrice, duration, difficulty });
        }}
      >
        <option value="">All categories</option>
        {categories.map((c) => (
          <option key={c.slug} value={c.slug}>{c.name}</option>
        ))}
      </select>
      <input
        type="number"
        className="input"
        placeholder="Min price"
        value={minPrice ?? ''}
        onChange={(e) => { 
          const v = e.target.value;
          const newMinPrice = v ? Number(v) : undefined;
          setMinPrice(newMinPrice);
          // Immediately emit the change
          onFiltersChange({ keyword, category, minPrice: newMinPrice, maxPrice, duration, difficulty });
        }}
      />
      <input
        type="number"
        className="input"
        placeholder="Max price"
        value={maxPrice ?? ''}
        onChange={(e) => { 
          const v = e.target.value;
          const newMaxPrice = v ? Number(v) : undefined;
          setMaxPrice(newMaxPrice);
          // Immediately emit the change
          onFiltersChange({ keyword, category, minPrice, maxPrice: newMaxPrice, duration, difficulty });
        }}
      />
      <input
        type="text"
        className="input"
        placeholder="Duration (e.g. 3 days)"
        value={duration ?? ''}
        onChange={(e) => { 
          const newDuration = e.target.value || undefined;
          setDuration(newDuration);
          // Immediately emit the change
          onFiltersChange({ keyword, category, minPrice, maxPrice, duration: newDuration, difficulty });
        }}
      />
      <select
        className="input"
        value={difficulty ?? ''}
        onChange={(e) => { 
          const newDifficulty = e.target.value || undefined;
          setDifficulty(newDifficulty);
          // Immediately emit the change
          onFiltersChange({ keyword, category, minPrice, maxPrice, duration, difficulty: newDifficulty });
        }}
      >
        <option value="">Any difficulty</option>
        <option value="easy">Easy</option>
        <option value="moderate">Moderate</option>
        <option value="challenging">Challenging</option>
      </select>
      <div className="md:col-span-6 flex gap-2">
        <button className="btn-primary" onClick={emit}>Apply</button>
        <button
          className="btn-outline"
          onClick={() => {
            setKeyword('');
            setCategory(undefined);
            setMinPrice(undefined);
            setMaxPrice(undefined);
            setDuration(undefined);
            setDifficulty(undefined);
            onFiltersChange({});
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default SearchFilter;


