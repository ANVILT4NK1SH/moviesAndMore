import {
  Component,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { MovieService } from '../../../../shared/services/movie.service';
import { Movie } from '../../../../shared/models/movie.model';

@Component({
  selector: 'app-movie-details',
  imports: [],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css',
})
export class MovieDetailsComponent {
  movieService = inject(MovieService);
  isComponentVisible = signal(false);
  movie = input<Movie>();
  close = output<void>();

  closeBtnHandler() {
    this.close.emit();
  }

  whereToViewBtnHandler() {
    const query = `where to view ${this.movie()?.title || ''} `;
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
      query
    )}`;

    window.open(searchUrl, '_blank');
  }
}
