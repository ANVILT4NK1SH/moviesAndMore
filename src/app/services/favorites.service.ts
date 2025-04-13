import { computed, Injectable, signal } from "@angular/core";
import { Movie } from "../shared/models/movie.model";

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favorites = signal<Movie[]>([]);
  constructor() {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) this.favorites.set(JSON.parse(storedFavorites));
  }

  getFavorites() {
    return this.favorites.asReadonly();
  }

  isFavorite(movieID: number) {
    return computed(() => this.favorites().some((m) => m.id === movieID));
  }

  addFavorite(movie: Movie) {
    if (!this.isFavorite) {
      this.favorites.update((f) => [...f, movie]);
      //save to local storage
      this.saveFavorites();
    }
  }

  removeFavorite(movieId: number) {
    // Filter out the movie and update the signal
    this.favorites.update((favorites) =>
      favorites.filter((movie) => movie.id !== movieId)
    );
    // Persist the updated list to localStorage
    this.saveFavorites();
  }

  // Save the current favorites list to localStorage
  private saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(this.favorites()));
  }
}