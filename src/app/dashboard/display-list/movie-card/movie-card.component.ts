// src/app/components/movie-card/movie-card.component.ts
import { Component, computed, inject, input, signal } from '@angular/core';
import { Movie } from '../../../shared/models/movie.model';
import { FavoritesService } from '../../../shared/services/favorites.service';
import { MovieDetailsComponent } from './movie-details/movie-details.component';

// Define the component as standalone with imports and references to template/styles
@Component({
  selector: 'app-movie-card',
  imports: [MovieDetailsComponent],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
})
export class MovieCardComponent {
  // Define the movie input as required to ensure it’s always provided
  movie = input.required<Movie>();

  // Inject the FavoritesService
  private favsService = inject(FavoritesService);

  // Compute whether the current movie is favorited
  // What computed() Does:
  // It defines a read-only signal whose value is computed based on other signals or values.
  // The computation is reactive: if any signal used in the computation changes, the computed signal automatically recalculates and updates.
  isFav = computed(() => this.favsService.isFavorite(this.movie().id)());

  // Signal to control visibility of the MovieDetailsComponent
  isComponentVisible = signal(false);

  // Handler to show the movie details component on card click
  movieDetailsHandler() {
    this.isComponentVisible.set(true);
  }

  // Handler to hide the movie details component
  hideComponent() {
    this.isComponentVisible.set(false);
  }

  // Toggle the favorite status of the movie
  toggleFavorite() {
    const movie = this.movie();
    if (this.isFav()) {
      // Remove the movie from favorites if it’s currently favorited
      this.favsService.removeFavorite(movie.id);
    } else {
      // Add the movie to favorites if it’s not favorited
      this.favsService.addFavorite(movie);
    }
  }
}
