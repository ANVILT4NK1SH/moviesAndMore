import { Component, computed, inject, input } from '@angular/core';
import { WatchlistService } from '../../../shared/services/watchlist.service';
import { Movie } from '../../../shared/models/movie.model';

@Component({
  selector: 'app-watchlist-btn',
  imports: [],
  templateUrl: './watchlist-btn.component.html',
  styleUrl: './watchlist-btn.component.css',
})
export class WatchlistBtnComponent {
  watchlistService = inject(WatchlistService);

  movie = input.required<Movie>();

  isInWatchlist = computed(() =>
    this.watchlistService.isInWatchlist(this.movie().id)()
  );

  toggleWatchlist() {
    const movie = this.movie();
    if (this.isInWatchlist()) {
      // Remove the movie from watchlist if it’s currently in watchlist
      this.watchlistService.removeFromWatchlist(movie.id);
    } else {
      // Add the movie to watchlis if it’s not in watchlist
      this.watchlistService.addToWatchlist(movie);
    }
  }
}

