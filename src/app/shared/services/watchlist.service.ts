// src/app/services/watchlist.service.ts
import { Injectable, signal, computed } from '@angular/core';
import { Movie } from '../models/movie.model';

// Mark the service as injectable and provide it at the root level for singleton access
@Injectable({
  providedIn: 'root',
})
export class WatchlistService {
  // Private signal to store the list of watchlist movies
  private watchlist = signal<Movie[]>([]);

  // Constructor to initialize the watchlist list from localStorage
  constructor() {
    // Check if watchlist exist in localStorage and load them
    const storedWatchlist = localStorage.getItem('watchlist');
    if (storedWatchlist) {
      try {
        const parsed = JSON.parse(storedWatchlist);
        this.watchlist.set(parsed);
      } catch (error) {
        console.error('WatchlistService: Error parsing localStorage:', error);
      }
    }
  }

  // Return a read-only signal of the watchlist list for external access
  getWatchlist() {
    return this.watchlist.asReadonly();
  }

  // Compute whether a movie is in the watchlist list based on its ID
  isInWatchlist(movieId: number) {
    return computed(() =>
      this.watchlist().some((movie) => movie.id === movieId)
    );
  }

  // Add a movie to the watchlist list if it’s not already present
  addToWatchlist(movie: Movie) {
    // Check if the movie is not already watchlistd
    if (!this.isInWatchlist(movie.id)()) {
      // Update the signal with a new array including the movie
      this.watchlist.update((watchlist) => [...watchlist, movie]);
      // Persist the updated list to localStorage
      this.saveWatchlist();
    }
  }

  // Remove a movie from the watchlist list by its ID
  removeFromWatchlist(movieId: number) {
    // Filter out the movie and update the signal
    this.watchlist.update((watchlist) => {
      const newWatchlist = watchlist.filter((movie) => movie.id !== movieId);
      console.log(
        'WatchlistService: Removed movie',
        movieId,
        'New watchlist:',
        newWatchlist
      );
      return newWatchlist;
    });
    // Persist the updated list to localStorage
    this.saveWatchlist();
  }

  // Save the current watchlist list to localStorage
  private saveWatchlist() {
    try {
      const watchlist = this.watchlist();
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
    } catch (error) {
      console.error('WatchlistService: Error saving to localStorage:', error);
    }
  }
}
