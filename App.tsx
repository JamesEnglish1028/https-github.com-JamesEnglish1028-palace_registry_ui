import React, { useEffect, useState, useMemo } from 'react';
import { fetchLibraries } from './services/libraryService';
import { LibraryDisplay } from './types';
import { SearchInput } from './components/SearchInput';
import { LibraryCard } from './components/LibraryCard';

const App: React.FC = () => {
  const [libraries, setLibraries] = useState<LibraryDisplay[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('');
  
  // Initialize theme state from URL parameter. 
  // We use lazy initialization to set the correct class before the first render
  // to prevent a flash of incorrect theme.
  const [isDarkMode] = useState<boolean>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('theme') === 'dark';
  });

  // Fetch data
  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchLibraries();
        if (mounted) {
          setLibraries(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, []);

  // Compute available states from the data
  const availableStates = useMemo(() => {
    const states = new Set(libraries.map(lib => lib.state).filter((s): s is string => !!s));
    return Array.from(states).sort();
  }, [libraries]);

  // Filter libraries based on search and selected state
  const filteredLibraries = useMemo(() => {
    return libraries.filter((lib) => {
      const matchesSearch = 
        !searchQuery ||
        lib.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) || 
        lib.description.toLowerCase().includes(searchQuery.toLowerCase().trim());

      const matchesState = 
        !selectedState || 
        lib.state === selectedState;

      return matchesSearch && matchesState;
    });
  }, [libraries, searchQuery, selectedState]);

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-dark text-gray-900 dark:text-gray-100 transition-colors duration-300">
        
        {/* Sticky Header */}
        <header className="sticky top-0 z-10 bg-white/90 dark:bg-darkSurface/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="max-w-3xl mx-auto px-4 py-4">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img 
                    src="https://thepalaceproject.org/wp-content/uploads/2022/05/cropped-Palace_Favicon_512x512-192x192.png" 
                    alt="Palace Project Logo" 
                    className="w-10 h-10 object-contain"
                  />
                  <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Find Your Library
                  </h1>
                </div>
                {/* Visual Indicator of mode - only show for Dark Mode */}
                {isDarkMode && (
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 font-medium">
                    Dark Mode
                  </span>
                )}
              </div>
              
              <div className="flex gap-3">
                <div className="flex-1">
                  <SearchInput 
                    value={searchQuery} 
                    onChange={setSearchQuery} 
                    placeholder="Search by library name..." 
                  />
                </div>
                
                {availableStates.length > 0 && (
                  <div className="w-32 flex-shrink-0">
                    <select
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                      className="block w-full h-[46px] pl-3 pr-8 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-darkSurface dark:border-gray-600 dark:text-white"
                      aria-label="Filter results by state"
                    >
                      <option value="">All States</option>
                      {availableStates.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-3xl mx-auto px-4 py-6">
          
          {loading && (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-500 dark:text-gray-400 animate-pulse">Loading libraries...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-center">
              <p className="text-red-600 dark:text-red-400 font-medium">Unable to load libraries</p>
              <p className="text-sm text-red-500 dark:text-red-300 mt-1">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-100 text-sm font-medium rounded hover:bg-red-200 dark:hover:bg-red-700 transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {!loading && !error && (
            <>
              <div className="flex justify-between items-end mb-4">
                 <p className="text-sm text-gray-500 dark:text-gray-400">
                  Showing {filteredLibraries.length} {filteredLibraries.length === 1 ? 'library' : 'libraries'}
                  {selectedState && ` in ${selectedState}`}
                </p>
              </div>

              {filteredLibraries.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-darkSurface rounded-lg border border-gray-100 dark:border-gray-700">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No libraries found</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filters.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {filteredLibraries.map((lib) => (
                    <LibraryCard key={lib.id} library={lib} />
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;