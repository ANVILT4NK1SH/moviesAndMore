import { Component, inject } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MovieService } from '../services/movie.service';



@Component({
  selector: 'app-header',
  imports: [SharedModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  movieService = inject(MovieService)
  searchInput = ''

  search(){
    if(this.searchInput.trim()) {
      this.movieService.searchMovies(this.searchInput)
    }
  }
}
