'use client';

import { useState, useEffect } from 'react';
import PokemonCard, { Pokemon } from './PokemonCard'; 

export default function PokemonGrid() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Pokemon[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Fetch paginated Pokemon list
  useEffect(() => {
    async function fetchPokemons() {
      try {
        const response = await fetch(`http://localhost:8000/api/pokemons?limit=20&page=${page}`);
        const data = await response.json();
        
        if (page === 1) {
          setPokemons(data); 
        } else {
          setPokemons((prev) => [...prev, ...data]); 
        }
      } catch (error) {
        console.error("Failed to fetch from Laravel:", error);
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    }
    
    fetchPokemons();
  }, [page]); 

  // Debounced server-side search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    const timer = setTimeout(async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/pokemons/search?q=${encodeURIComponent(searchQuery.trim())}`
        );
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error("Search failed:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Show search results when searching, otherwise show paginated list
  const displayedPokemons = searchQuery.trim() ? searchResults : pokemons;

  return (
    <div className="flex flex-col">
      
      <div className="sticky top-0 bg-white p-4 z-20 border-b flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm rounded-t-xl">
        <h2 className="text-xl font-bold text-gray-700">Pokemon List</h2>
        <input 
          type="text" 
          placeholder="Search any Pokemon..." 
          className="w-full sm:w-64 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400 transition"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="p-4 bg-gray-50 relative rounded-b-xl overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center h-64 text-gray-500 font-semibold">
            Loading Pokemon data...
          </div>
        ) : isSearching ? (
          <div className="flex justify-center items-center h-64 text-gray-500 font-semibold">
            Searching...
          </div>
        ) : (
          <>
            {displayedPokemons.length === 0 && searchQuery.trim() ? (
              <div className="flex justify-center items-center h-64 text-gray-400 font-semibold">
                No Pokemon found for &ldquo;{searchQuery}&rdquo;
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayedPokemons.map((pokemon, idx) => (
                  <PokemonCard key={`${pokemon.name}-${idx}`} pokemon={pokemon} />
                ))}
              </div>
            )}

            {searchQuery === '' && (
              <div className="mt-8 flex justify-center pb-4">
                <button 
                  onClick={() => {
                    setIsLoadingMore(true);
                    setPage((prev) => prev + 1);
                  }}
                  disabled={isLoadingMore}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full shadow-md transition disabled:bg-gray-400"
                >
                  {isLoadingMore ? 'Loading...' : 'Load More Pokemon'}
                </button>
              </div>
            )}
          </>
        )}
      </div>

    </div>
  );
}
