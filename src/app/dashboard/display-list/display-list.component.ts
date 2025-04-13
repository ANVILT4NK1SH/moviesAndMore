import { Component, inject, } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../shared/models/movie.model';
import { MovieCardComponent } from "./movie-card/movie-card.component";
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-display-list',
  imports: [MovieCardComponent],
  templateUrl: './display-list.component.html',
  styleUrl: './display-list.component.css'
})
export class DisplayListComponent {
  moviesService = inject(MovieService)
  movies = this.moviesService.movies

  listTitle = this.moviesService.listTitle
  


  ngOnInit(): void{
    this.moviesService.getPopularMovies()
  }
}
