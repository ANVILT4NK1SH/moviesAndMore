// src/app/components/navigation/navigation.component.ts
import { Component, computed, effect, inject, signal } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MovieService } from '../../shared/services/movie.service';
import { FavoritesService } from '../../shared/services/favorites.service';

// Define the component as standalone with imports and references to template/styles
@Component({
  selector: 'app-navigation',
  imports: [SharedModule],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  // Signal to control sidebar collapse state
  isCollapsed = signal(true);

  // Inject services for movie data and favorites
  private movieService = inject(MovieService);
  private favService = inject(FavoritesService);

  currentView = this.movieService.currentView;

  // Reference to movieService signals
  movies = this.movieService.movies;
  listTitle = this.movieService.listTitle;

  constructor() {
    // Effect to update movies signal based on current view
    effect(() => {
      const view = this.currentView();
      if (view === 'favorites') {
        const favorites = this.favService.getFavorites()();
        this.movieService.movies.set(favorites);
      }
    });
  }

  // Toggle the sidebar collapse state
  toggleSidebar() {
    this.isCollapsed.set(!this.isCollapsed());
  }

  // Handler for clicking the Popular button
  popularClickHandler() {
    this.currentView.set('popular');
    this.movieService.getPopularMovies();
    this.movieService.listTitle.set('Popular Movies');
    console.log('NavigationComponent: Popular clicked');
  }

  // Handler for clicking the Favorites button
  favoriteClickHandler() {
    this.currentView.set('favorites');
    this.movieService.listTitle.set('Favorites');
    // Movies updated via effect
    console.log('NavigationComponent: Favorites clicked');
  }

  // Placeholder for watchlist handler
  watchlistClickHandler() {
    this.currentView.set('watchlist');
    this.movieService.listTitle.set('Watchlist');
    console.log('NavigationComponent: Watchlist clicked');
  }
}
