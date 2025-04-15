import { Component, inject, input } from '@angular/core';
import { SharedModule } from '../shared/modules/shared.module';
import { MovieService } from '../shared/services/movie.service';
import { FavoritesService } from '../shared/services/favorites.service';

@Component({
  selector: 'app-header',
  imports: [SharedModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  movieService = inject(MovieService);
  favService = inject(FavoritesService);
  searchInput = '';
  currentView = this.movieService.currentView;
  isSearching = this.movieService.isSearching;

  search() {
    if (this.searchInput.trim()) {
      this.isSearching.set(true);
      this.movieService.searchMovies(this.searchInput);
    } else {
      this.isSearching.set(false);
      if (this.currentView() === 'popular') {
        this.movieService.getPopularMovies();
      } else if (this.currentView() === 'favorites') {
        //the second set of () after .getFavorites returns the value
        this.movieService.movies.set(this.favService.getFavorites()());
        this.movieService.listTitle.set('Favorites');
      } else {
        //watchlist functionality
      }
    }
  }

  clearBtnHandler(){
    this.searchInput = ''
    this.isSearching.set(false);
    if (this.currentView() === 'popular') {
      this.movieService.getPopularMovies();
    } else if (this.currentView() === 'favorites') {
      //the second set of () after .getFavorites returns the value
      this.movieService.movies.set(this.favService.getFavorites()());
      this.movieService.listTitle.set('Favorites');
    } else {
      //watchlist functionality
    }

  }
}
