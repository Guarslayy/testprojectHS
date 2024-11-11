import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  standalone: true,
  selector: 'app-movie',
  template: `
    <div class="rounded-lg overflow-hidden bg-gray-800 shadow-md hover:shadow-xl transition duration-300">
      <img 
      [src]="getImageUrl(movie.poster_path)" 
      alt="{{ movie.title }}" 
      class="w-full h-64 object-cover"
      />
      <div class="p-4">
        <h3 class="text-xl font-semibold truncate">{{ movie.title }}</h3>
        <p class="text-sm text-gray-400 mt-2">{{ movie.overview | slice:0:100 }}...</p>
      </div>
    </div>
  `,
  styles: [],
  imports: [CommonModule]
})
export class MovieComponent {
  @Input() movie: any;

  getImageUrl(path: string) {
    return `https://image.tmdb.org/t/p/w500${path}`;
  }
}
