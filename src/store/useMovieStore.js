import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useMovieStore = create(
  persist(
    (set) => ({
      favorites: [],
      
      toggleFavorite: (movie) => set((state) => {
        const isFavorite = state.favorites.some(fav => fav.imdbID === movie.imdbID);
        const updated = isFavorite
          ? state.favorites.filter(fav => fav.imdbID !== movie.imdbID)
          : [...state.favorites, movie];
        return { favorites: updated };
      }),

      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: 'cinema-favorites', 
    }
  )
);