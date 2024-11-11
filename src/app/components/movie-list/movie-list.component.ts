import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieComponent } from '../movie/movie.component';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MovieComponent],
  template: `
     <div class="p-6 bg-gray-900 min-h-screen text-white">
      <h1 class="text-4xl font-bold text-center mb-6">Популярные фильмы</h1>
      <div class="flex justify-center mb-8">
        <input 
        [(ngModel)]="searchQuery" 
        (input)="onSearch()" 
        placeholder="Поиск фильмов..." 
        class="flex-grow md:flex-grow-0 w-full md:w-1/2 p-4 text-gray-900 border border-gray-600 rounded-lg outline-none" 
        />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
        <app-movie 
        *ngFor="let movie of movieService.movies()" 
        [movie]="movie" 
        (click)="openMovie(movie.id)"
        class="transform transition hover:scale-105 hover:shadow-xl cursor-pointer"
        ></app-movie>
      </div>
    </div>
  `,
  styles: []
})

export class MovieListComponent implements OnInit {
  searchQuery: string = '';

  constructor(public movieService: MovieService, private router: Router) {}

  ngOnInit() {
    this.movieService.getPopularMovies();
  }

  onSearch() {
    if (this.searchQuery) {
      this.movieService.searchMovies(this.searchQuery);
    } else {
      this.movieService.getPopularMovies();
    }
  }

  openMovie(id: number) {
    console.log('ID фильма:', id);
    this.router.navigate(['/movie', id]);
  }
}
