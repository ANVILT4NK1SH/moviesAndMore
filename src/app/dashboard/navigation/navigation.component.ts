import { Component, effect, inject, signal } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DisplayListComponent } from '../display-list/display-list.component';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-navigation',
  imports: [SharedModule, DisplayListComponent],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent {
  isCollapsed = signal(true);
  movieService = inject(MovieService);
  popularUrl: any;
  movies = this.movieService.movies

  constructor() {
    effect(() => {
      let movieList = this.movies()
      console.log('Movies updated: ', movieList);
    })
  }

  toggleSidebar() {
    this.isCollapsed.set(!this.isCollapsed());
  }

  popularClickHandler() {
    this.movieService.getPopularMovies(); //starts the request
    console.log('First log from NAV request on click', this.movies());
    
    
  }
}
