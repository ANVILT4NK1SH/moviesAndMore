import { Component, inject, input, signal } from '@angular/core';
import { Movie } from '../../../shared/models/movie.model';
import { MovieService } from '../../../services/movie.service';
import { MovieDetailsComponent } from "../movie-details/movie-details.component";

@Component({
  selector: 'app-movie-card',
  imports: [MovieDetailsComponent],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css',
})
export class MovieCardComponent {
  movie = input<Movie>();
  movieService = inject(MovieService)
  
  movies = this.movieService.movies
  isComponentVisible = signal(false);

  cardClickHandler() {
    this.isComponentVisible.set(true);
  }
  hideComponent() {
    this.isComponentVisible.set(false)
  }
}
