import { Component, computed, effect, inject, signal } from '@angular/core';
import { SharedModule } from '../../shared/modules/shared.module';
import { MovieService } from '../../shared/services/movie.service';
import { FavoritesService } from '../../shared/services/favorites.service';
import { WatchlistService } from '../../shared/services/watchlist.service';

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
  private watchlistService = inject(WatchlistService);

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
      }if(view === 'watchlist'){
        const watchlist = this.watchlistService.getWatchlist()();
        this.movieService.movies.set(watchlist);
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
  }

  // Handler for clicking the Favorites button
  favoriteClickHandler() {
    this.currentView.set('favorites');
    this.movieService.listTitle.set('Favorites');
  }

  // Handler for Watchlist button
  watchlistClickHandler() {
    this.currentView.set('watchlist');
    this.movieService.listTitle.set('Watchlist');
  }
}
