import { Component, inject } from '@angular/core';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-display-list',
  imports: [],
  templateUrl: './display-list.component.html',
  styleUrl: './display-list.component.css'
})
export class DisplayListComponent {
  moviesService = inject(MovieService)
  movies = this.moviesService.movies
  
}
