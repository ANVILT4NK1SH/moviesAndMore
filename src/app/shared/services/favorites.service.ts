// src/app/services/favorites.service.ts
import { Injectable, signal, computed } from '@angular/core';
import { Movie } from '../models/movie.model';

// Mark the service as injectable and provide it at the root level for singleton access
@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  // Private signal to store the list of favorite movies
  private favorites = signal<Movie[]>([]);

  // Constructor to initialize the favorites list from localStorage
  constructor() {
    // Check if favorites exist in localStorage and load them
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      try {
        const parsed = JSON.parse(storedFavorites);
        this.favorites.set(parsed);
      } catch (error) {
        console.error('FavoritesService: Error parsing localStorage:', error);
      }
    }
  }

  // Return a read-only signal of the favorites list for external access
  getFavorites() {
    return this.favorites.asReadonly();
  }

  // Compute whether a movie is in the favorites list based on its ID
  isFavorite(movieId: number) {
    return computed(() =>
      this.favorites().some((movie) => movie.id === movieId)
    );
  }

  // Add a movie to the favorites list if it’s not already present
  addFavorite(movie: Movie) {
    // Check if the movie is not already favorited
    if (!this.isFavorite(movie.id)()) {
      // Update the signal with a new array including the movie
      this.favorites.update((favorites) => [...favorites, movie]);
      // Persist the updated list to localStorage
      this.saveFavorites();
    }
  }

  // Remove a movie from the favorites list by its ID
  removeFavorite(movieId: number) {
    // Filter out the movie and update the signal
    this.favorites.update((favorites) => {
      const newFavorites = favorites.filter((movie) => movie.id !== movieId);
      console.log(
        'FavoritesService: Removed movie',
        movieId,
        'New favorites:',
        newFavorites
      );
      return newFavorites;
    });
    // Persist the updated list to localStorage
    this.saveFavorites();
  }

  // Save the current favorites list to localStorage
  private saveFavorites() {
    try {
      const favorites = this.favorites();
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('FavoritesService: Error saving to localStorage:', error);
    }
  }
}
