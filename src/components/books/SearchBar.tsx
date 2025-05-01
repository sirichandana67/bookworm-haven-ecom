
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories } from "@/utils/bookData";

const SearchBar: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "All");
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
    setCategory(searchParams.get("category") || "All");
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    if (query) params.append("q", query);
    if (category !== "All") params.append("category", category);
    
    navigate(`/search?${params.toString()}`);
  };

  const clearSearch = () => {
    setQuery("");
    setCategory("All");
    navigate("/search");
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSearch} className="flex flex-col space-y-4">
        <div className="flex items-center relative">
          <Input
            type="search"
            placeholder="Search books by title, author, or keyword..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pr-12"
          />
          
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-12 text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 h-full"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className={`w-4 h-4 ${category !== "All" ? "text-book-primary" : ""}`} />
          </Button>
        </div>
        
        {showFilters && (
          <div className="bg-white p-4 rounded-md shadow-sm border animate-slide-up">
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Category</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${
                      category === cat
                        ? "bg-book-primary text-white"
                        : "bg-secondary text-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        
        <div className="flex space-x-2">
          <Button type="submit" className="flex items-center gap-2">
            <Search className="w-4 h-4" />
            Search
          </Button>
          
          {(query || category !== "All") && (
            <Button type="button" variant="outline" onClick={clearSearch}>
              Clear
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
