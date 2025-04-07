import { Component, inject, input } from '@angular/core';
import { MovieService } from '../../../services/movie.service';

@Component({
  selector: 'app-movie-details',
  imports: [],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent {
  movieService = inject(MovieService)
  movie = this.movieService.movie()

}
