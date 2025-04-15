// src/app/services/movie.service.ts
import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/movie.model';

// Mark the service as injectable and provide it at the root level
@Injectable({
  providedIn: 'root',
})
export class MovieService {
  // API key for TMDb
  private key = 'ef0a9ba85f9d5adbaf4b8524896455bd';

  // Base URL for TMDb API
  private baseUrl = 'https://api.themoviedb.org/3';

  // Inject HttpClient for API requests
  private http = inject(HttpClient);

  // Signal for the current list title
  listTitle = signal<string>('');

  // Signal for the list of movies
  movies = signal<Movie[]>([]);

  // Signal for the current page
  currentPage = signal<number>(1);

  // Signal for search state
  isSearching = signal<boolean>(false);

  // Signal to track search query
  searchQuery = signal<string>('');

  // Signal to track the current view
  currentView = signal<'popular' | 'favorites' | 'watchlist'>('popular');

  //Signal for total pages from API
  totalPages = signal<number>(1);

  // Fetch movies based on current view and page
  getMoviesByPage(page: number) {
    if (page < 1 || page > 500) {
      return;
    }
    this.currentPage.set(page);
    const view = this.currentView();
    if (view === 'favorites') {
      console.log('MovieService: Favorites view, skipping fetch');
    } else if (view === 'watchlist') {
      console.log('MovieService: Watchlist view, skipping fetch');
    } else if (this.isSearching()) {
      this.searchMovies(this.searchQuery(), page);
    } else {
      this.getPopularMovies(page);
    }
  }

  // Search for movies by query and page
  searchMovies(query: string, page: number = 1) {
    if (page < 1 || page > 500) return;
    this.isSearching.set(true);
    this.searchQuery.set(query);
    this.listTitle.set(`Search: ${query}`);
    this.currentPage.set(page);
    const url = `${this.baseUrl}/search/movie?api_key=${this.key}&query=${query}&page=${page}`;
    this.http.get<{ results: Movie[]; total_pages: number }>(url).subscribe({
      next: (data) => {
        this.movies.set(data.results);
        this.totalPages.set(Math.min(data.total_pages, 500));
        console.log(
          'MovieService: Search movies, query:',
          query,
          'page:',
          page,
          'total_pages',
          data.total_pages,
          'Results:',
          data.results
        );
      },
      error: (error) => {
        console.error('MovieService: Search error:', error);
      },
    });
  }

  // Fetch popular movies by page
  getPopularMovies(page: number = 1) {
    if (page < 1 || page > 500) return;
    this.isSearching.set(false);
    this.searchQuery.set('');
    this.listTitle.set('Popular Movies');
    this.currentPage.set(page);
    const url = `${this.baseUrl}/movie/popular?api_key=${this.key}&language=en-US&page=${page}`;
    this.http.get<{ results: Movie[]; total_pages: number }>(url).subscribe({
      next: (data) => {
        this.movies.set(data.results);
        this.totalPages.set(Math.min(data.total_pages, 500));
        console.log(
          'MovieService: Popular movies, page:',
          page,
          'total_pages:',
          data.total_pages,
          'Results:',
          data.results
        );
      },
      error: (error) => {
        console.error('MovieService: Popular movies error:', error);
      },
    });
  }
}
