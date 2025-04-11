import React from 'react';
import { useTaskContext, PREDEFINED_CATEGORIES } from '../context/TaskContext';

const SearchBar = () => {
  const { 
    searchTerm, 
    setSearchTerm, 
    categoryFilter, 
    setCategoryFilter
  } = useTaskContext();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('');
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-3 md:space-y-0">
        <div className="flex-1">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Search Tasks
          </label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by title or description"
            className="input w-full"
          />
        </div>
        
        <div className="w-full md:w-1/3">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Category
          </label>
          <select
            id="category"
            value={categoryFilter}
            onChange={handleCategoryChange}
            className="input w-full"
          >
            <option value="">All Categories</option>
            {PREDEFINED_CATEGORIES.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {(searchTerm || categoryFilter) && (
        <div className="mt-4 text-right">
          <button
            onClick={clearFilters}
            className="text-sm text-primary hover:text-primary-dark"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar; 