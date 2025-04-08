import { Component, inject, } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { MovieDetailsComponent } from "./movie-details/movie-details.component";
import { Movie } from '../../shared/models/movie.model';
import { MovieCardComponent } from "./movie-card/movie-card.component";

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
  favsArray = this.moviesService.favorites
  inFavorites = false
  isInFav: boolean = false;


  ngOnInit(): void{
    this.moviesService.getPopularMovies()
  }

  
  addFavoriteBtnHandler(data: Movie){
    this.isInFav = this.favsArray().some((f) => f.id === data.id)
    if(!this.isInFav){
      this.moviesService.addToFavorites(data)
    }else{console.log('Movie already in favs');
    }
    
    console.log(this.favsArray());    
  }

  removeFavoriteBtnHandler(data: {}){

  }
}
