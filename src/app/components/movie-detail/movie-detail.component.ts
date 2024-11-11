import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-movie-detail',
  template: `
    <div *ngIf="movie" class="p-6 bg-gray-900 min-h-screen text-white">
      <div class="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
        <img 
        [src]="getImageUrl(movie.poster_path)" 
        alt="{{ movie.title }}" 
        class="w-full md:w-1/3 rounded-lg shadow-lg"
        />
        <div class="md:ml-4">
          <h1 class="text-4xl font-bold mb-4">{{ movie.title }}</h1>
          <p class="mt-2">{{ movie.overview }}</p>
          <p class="mt-4 text-gray-700"><strong>Release Date:</strong> {{ movie.release_date }}</p>
          <p class="text-gray-700"><strong>Rating:</strong> {{ movie.vote_average }} / 10</p>
          <p class="text-gray-700"><strong>Genres:</strong> {{ getGenres() }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [],
  imports: [CommonModule]
})
export class MovieDetailComponent implements OnInit {
  movie: any;

  constructor(private route: ActivatedRoute, private movieService: MovieService) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.movieService.getMovieDetails(id).subscribe(data => this.movie = data);
  }

  getImageUrl(path: string) {
    return `https://image.tmdb.org/t/p/w500${path}`;
  }

  getGenres(): string {
    return this.movie?.genres?.map((g: any) => g.name).join(', ') || '';
  }
}

