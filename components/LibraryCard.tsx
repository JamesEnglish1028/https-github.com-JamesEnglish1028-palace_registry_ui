import React from 'react';
import { LibraryDisplay } from '../types';

interface LibraryCardProps {
  library: LibraryDisplay;
}

export const LibraryCard: React.FC<LibraryCardProps> = ({ library }) => {
  return (
    <div className="bg-white dark:bg-darkSurface rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4 border border-gray-100 dark:border-gray-700 flex flex-col h-full">
      <div className="flex items-start gap-4">
        {library.logoUrl && (
          <div className="flex-shrink-0">
            <img 
              src={library.logoUrl} 
              alt={`${library.name} Logo`} 
              aria-label={`${library.name} Logo`}
              loading="lazy"
              className="w-16 h-16 object-contain bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700"
              onError={(e) => {
                // Hide image on error
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 leading-tight">
            {library.name}
          </h3>
          {library.description ? (
             <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
             {library.description}
           </p>
          ) : (
            <p className="text-sm text-gray-400 italic">No description available</p>
          )}
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-end">
        {library.catalogUrl ? (
          <a 
            href={library.catalogUrl}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            aria-label={`Add ${library.name}`}
          >
            Add Library
          </a>
        ) : (
          <span className="text-sm text-gray-400 italic">Catalog unavailable</span>
        )}
      </div>
    </div>
  );
};