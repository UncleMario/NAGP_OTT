import { Component, OnInit } from '@angular/core';

import { Movie } from '../movie';
import { MovieUser } from '../movieUser';
import { MovieUserService } from '../movie-user.service';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {
  movies: Movie[] = [];
  movieUser: MovieUser[] = [];

  constructor(private movieService: MovieService,
    private movieUserService: MovieUserService) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.movieService.getMovies()
    .subscribe(movies => this.movies = movies);
  }

  add(name: string, title: string, description: string, rating: number, language: string, genre: string, prime: boolean): void {
    name = name.trim();
    title = title.trim();
    description = description.trim();
    language = language.trim();
    genre = genre.trim();
    if (!name || !title || !description || rating == undefined || !language || !genre ) { return; }
    this.movieService.addMovie({ name, title, description, rating, language, genre, prime } as Movie)
      .subscribe(movie => {
        this.movies.push(movie);
      });
    var lastElement = this.movies[this.movies.length - 1].id;
    this.movieUserService.addMovieUser({ movieId: lastElement, userName: "admin", watched: false, watchLater: false, favorite: false } as MovieUser)
    .subscribe(movieUser => {
      this.movieUser.push(movieUser);
    });
    this.movieUserService.addMovieUser({ movieId: lastElement, userName: "user", watched: false, watchLater: false, favorite: false } as MovieUser)
    .subscribe(movieUser => {
      this.movieUser.push(movieUser);
    });
  }

  delete(movie: Movie): void {
    this.movies = this.movies.filter(h => h !== movie);
    this.movieService.deleteMovie(movie.id).subscribe();
  }

}
