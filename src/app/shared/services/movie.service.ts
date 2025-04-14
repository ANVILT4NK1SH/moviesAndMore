import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  // api key
  private key = 'ef0a9ba85f9d5adbaf4b8524896455bd';

  //URL to movie database
  private baseUrl = 'https://api.themoviedb.org/3';

  private http = inject(HttpClient);

  listTitle = signal<string>('');

  movies = signal<any[]>([]);

  // Signal to track the current view (e.g., 'popular', 'favorites')
  currentView = signal<'popular' | 'favorites' | 'watchlist'>('popular');

  watchlist = signal<any[]>([]);

  addToWatchlist(data: {}) {
    this.watchlist.update((current) => [...current, data]);
  }

  searchMovies(query: string) {
    this.listTitle.set(`Search: ${query}`);

    const url = `${this.baseUrl}/search/movie?api_key=${this.key}&query=${query}`;
    this.http.get(url).subscribe(
      (data: any) => {
        this.movies.set(data.results);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getPopularMovies() {
    this.listTitle.set('Popular Movies');
    const url = `${this.baseUrl}/movie/popular?api_key=${this.key}&language=en-US&page=1`;

    this.http.get(url).subscribe(
      (data: any) => {
        this.movies.set(data.results);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
