import { Component, inject } from '@angular/core';
import { MovieService } from '../../shared/services/movie.service';
import { MovieCardComponent } from './movie-card/movie-card.component';


@Component({
  selector: 'app-display-list',
  imports: [MovieCardComponent],
  templateUrl: './display-list.component.html',
  styleUrl: './display-list.component.css',
})
export class DisplayListComponent {
  moviesService = inject(MovieService);
  movies = this.moviesService.movies;

  listTitle = this.moviesService.listTitle;

  ngOnInit(): void {
    this.moviesService.getPopularMovies();
  }
}
