// src/app/components/footer/footer.component.ts
import { Component, inject, effect, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../shared/services/movie.service';

// Define the component as standalone with imports and references to template/styles
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  // Inject MovieService to access pagination and movies
  private movieService = inject(MovieService);

  // Reference to MovieService signals
  currentPage = this.movieService.currentPage;
  currentView = this.movieService.currentView;
  totalPages = this.movieService.totalPages;

  pageRange = computed(() => {
    const current = this.currentPage();
    const maxPages = this.totalPages();
    const range = 4; // Show x pages before and after
    const start = Math.max(1, current - range);
    const end = Math.min(maxPages, current + range);
    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  });

  constructor() {
    // Effect to fetch movies when currentPage changes, unless in favorites/watchlist
    effect(() => {
      const page = this.currentPage();
      const view = this.currentView();
      if (view !== 'favorites' && view !== 'watchlist') {
        console.log('FooterComponent: currentPage changed:', page);
        this.movieService.getMoviesByPage(page);
      }
    });
  }

  // Set the current page, bounds checked in MovieService
  setCurrentPage(page: number) {
    console.log('FooterComponent: setCurrentPage:', page);
    this.movieService.getMoviesByPage(page);
  }
}
