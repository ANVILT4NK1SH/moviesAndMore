// src/app/components/movie-card/movie-card.component.ts
import { Component, computed, inject, input, signal } from '@angular/core';
import { Movie } from '../../../shared/models/movie.model';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { FavBtnComponent } from "../../buttons/fav-btn/fav-btn.component";
import { WatchlistBtnComponent } from "../../buttons/watchlist-btn/watchlist-btn.component";

// Define the component as standalone with imports and references to template/styles
@Component({
  selector: 'app-movie-card',
  imports: [MovieDetailsComponent, FavBtnComponent, WatchlistBtnComponent],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
})
export class MovieCardComponent {
  // Define the movie input as required to ensure it’s always provided
  movie = input.required<Movie>();  

  // Signal to control visibility of the MovieDetailsComponent
  isComponentVisible = signal(false);

  // Handler to show the movie details component on card click
  movieDetailsHandler() {
    this.isComponentVisible.set(true);
  }

  // Handler to hide the movie details component
  hideComponent() {
    this.isComponentVisible.set(false);
  }
}
