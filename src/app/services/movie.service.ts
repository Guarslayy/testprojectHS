import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class MovieService {
  private apiKey = '19192b7631ec7efe11ecb30283dadb97'
  private apiUrl = 'https://api.themoviedb.org/3';

  movies = signal<any[]>([]);

  constructor(private http: HttpClient) { }

  getPopularMovies() {
    this.http.get(`${this.apiUrl}/movie/popular?api_key=${this.apiKey}&language=ru-RU`)
      .subscribe((data: any) => this.movies.set(data.results));
  }

  searchMovies(query: string) {
    this.http.get(`${this.apiUrl}/search/movie?api_key=${this.apiKey}&language=ru-RU&query=${query}`)
      .subscribe((data: any) => this.movies.set(data.results));
  }

  getMovieDetails(id: number) {
    return this.http.get(`${this.apiUrl}/movie/${id}?api_key=${this.apiKey}&language=ru-RU`);
  }
}
