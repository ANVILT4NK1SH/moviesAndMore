import { Component, inject } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { FooterComponent } from "./footer/footer.component";
import { MovieService } from './shared/services/movie.service';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, DashboardComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'moviesAndMore';
  movieService = inject(MovieService)
  currentView = this.movieService.currentView
  isSearching = this.movieService.isSearching

}
