import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { Movie } from '../../../shared/models/movie.model';
import { MovieService } from '../../../services/movie.service';
import { MovieDetailsComponent } from "../movie-details/movie-details.component";
import { FavoritesService } from '../../../services/favorites.service';

@Component({
  selector: 'app-movie-card',
  imports: [MovieDetailsComponent],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css',
})
export class MovieCardComponent {
  movie = input<Movie>();
  movieService = inject(MovieService);
  private favsService = inject(FavoritesService);

  isFav = computed(() => this.favsService.isFavorite(this.movie()!.id));

  isComponentVisible = signal(false);

  cardClickHandler() {
    this.isComponentVisible.set(true);
  }
  hideComponent() {
    this.isComponentVisible.set(false);
  }

  toggleFavorite() {
    const movie = this.movie();
    if (this.isFav()) {
      this.favsService.removeFavorite(movie!.id);
    }else{
      this.favsService.addFavorite(movie!)
    }
  }
}
