import { Component, inject, signal } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { MovieDetailsComponent } from "./movie-details/movie-details.component";

@Component({
  selector: 'app-display-list',
  imports: [MovieDetailsComponent],
  templateUrl: './display-list.component.html',
  styleUrl: './display-list.component.css'
})
export class DisplayListComponent {
  moviesService = inject(MovieService)
  movies = this.moviesService.movies
  listTitle = this.moviesService.listTitle
  favsArray = this.moviesService.favorites
  inFavorites = false
  isComponentVisible = false;
  movie = this.moviesService.movie;

  ngOnInit(): void{
    this.moviesService.getPopularMovies()
  }

  cardClickHandler(data: {}){
    this.movie.set(data)    
    this.isComponentVisible = true
  }

  addFavoriteBtnHandler(data: {}){
    this.moviesService.addToFavorites(data)
    console.log(this.favsArray());    
  }

  removeFavoriteBtnHandler(data: {}){

  }
}
