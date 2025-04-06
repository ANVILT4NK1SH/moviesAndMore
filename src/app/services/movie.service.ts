import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class MovieService {
  // api key
  private key =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyN2YzYjU4ZTg0ZDIxZmJiYTFiZDVkOGZjOWQ4Zjg5NyIsIm5iZiI6MTc0MzM4Mzc0Mi44ODgsInN1YiI6IjY3ZTllY2JlMmNjYTZmYzhmYmM2ZDI3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Bu6PD0eimQclezJh5WcCzIxFoAa_bEe12kn8gDOKVAQ';

  //URL to movie database
  private baseUrl = 'https://api.themoviedb.org/3';

  private http = inject(HttpClient);

  movies: any;

  searchMovies(query: string) {
    const url = `${this.baseUrl}/search/movie?api_key=${this.key}&query=${query}`;
    return this.http.get(url);
  }

  getPopularMovies() {
    const url = `${this.baseUrl}/movie/popular?api_key=${this.key}&language=en-US&page=1`;
    this.movies = this.http.get(url).subscribe;
    return this.movies
  }
}
