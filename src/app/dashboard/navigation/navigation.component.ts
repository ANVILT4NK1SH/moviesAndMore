import { Component, inject, signal } from '@angular/core';
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

  toggleSidebar() {
    this.isCollapsed.set(!this.isCollapsed());
  }

  popularClickHandler() {
    
    console.log(this.movieService.getPopularMovies());
  }
}
