import { Component, computed, inject, input } from '@angular/core';
import { FavoritesService } from '../../../shared/services/favorites.service';
import { Movie } from '../../../shared/models/movie.model';

@Component({
  selector: 'app-fav-btn',
  imports: [],
  templateUrl: './fav-btn.component.html',
  styleUrl: './fav-btn.component.css',
})
export class FavBtnComponent {
  favsService = inject(FavoritesService);
  movie = input.required<Movie>();

  // Compute whether the current movie is favorited
  // What computed() Does:
  // It defines a read-only signal whose value is computed based on other signals or values.
  // The computation is reactive: if any signal used in the computation changes, the computed signal automatically recalculates and updates.
  isFav = computed(() => this.favsService.isFavorite(this.movie().id)());

  // Toggle the favorite status of the movie
  toggleFavorite() {
    if (this.isFav()) {
      // Remove the movie from favorites if it’s currently favorited
      this.favsService.removeFavorite(this.movie().id);
    } else {
      // Add the movie to favorites if it’s not favorited
      this.favsService.addFavorite(this.movie());
    }
  }
}
