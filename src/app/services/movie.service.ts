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

  movies = signal<any>([]);

  searchMovies(query: string) {
    const url = `${this.baseUrl}/search/movie?api_key=${this.key}&query=${query}`;
    return this.http.get(url);
  }

  getPopularMovies() {
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

  // Obserable.subscribe((data) => {},(error) => {}, () => {complete (mostly used for observables that end, like from files or timers)})
}